#!/usr/bin/env python3
"""Scrape a Framer site and rewrite asset URLs for local serving."""
import os
import re
import sys
import hashlib
import urllib.request
import urllib.parse
from concurrent.futures import ThreadPoolExecutor, as_completed

START_URL = "https://closor.framer.website/"
OUT_DIR = os.path.dirname(os.path.abspath(__file__))
ASSETS_DIR = os.path.join(OUT_DIR, "assets")
os.makedirs(ASSETS_DIR, exist_ok=True)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36",
    "Accept": "*/*",
}

# Hosts whose assets we will fetch and inline-localize
ASSET_HOSTS = {
    "closor.framer.website",
    "framerusercontent.com",
    "app.framerstatic.com",
    "framer.com",
}

# Map remote URL -> local relative path
url_map = {}

def fetch(url, binary=True):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=30) as r:
        data = r.read()
    return data if binary else data.decode("utf-8", errors="replace")

_used_names = {}

def safe_local_name(url):
    """Use the original filename when possible. Framer URLs already contain
    content hashes, and .mjs files reference each other by basename — so
    munging names breaks their internal imports."""
    parsed = urllib.parse.urlparse(url)
    basename = os.path.basename(parsed.path) or "index.html"
    basename = re.sub(r"[^A-Za-z0-9._-]", "_", basename)

    # If different URLs resolve to the same basename, disambiguate by query.
    existing = _used_names.get(basename)
    if existing is None or existing == url:
        _used_names[basename] = url
        return basename
    # Collision: append a short hash derived from the query string
    h = hashlib.md5(url.encode()).hexdigest()[:8]
    name, _, ext = basename.rpartition(".")
    candidate = f"{name}-{h}.{ext}" if name else f"{basename}-{h}"
    _used_names[candidate] = url
    return candidate

def is_asset_url(url):
    try:
        host = urllib.parse.urlparse(url).hostname or ""
    except Exception:
        return False
    return host in ASSET_HOSTS

def download_asset(url):
    if url in url_map:
        return url_map[url]
    local_name = safe_local_name(url)
    local_path = os.path.join(ASSETS_DIR, local_name)
    rel_path = f"assets/{local_name}"
    try:
        data = fetch(url, binary=True)
        with open(local_path, "wb") as f:
            f.write(data)
        url_map[url] = rel_path
        # If it's a CSS file, recursively rewrite its url(...) references
        if local_name.endswith(".css"):
            css = data.decode("utf-8", errors="replace")
            css = rewrite_css(css, url)
            with open(local_path, "w", encoding="utf-8") as f:
                f.write(css)
        print(f"  ✓ {url[:80]}")
        return rel_path
    except Exception as e:
        print(f"  ✗ {url[:80]} -- {e}")
        url_map[url] = url  # fall back to remote
        return url

import html as html_lib

URL_RE = re.compile(r'(https?://[^\s"\'<>()\\]+)')

def clean_url(u):
    # Strip trailing punctuation that isn't URL-valid
    u = u.rstrip('\\,;')
    u = re.sub(r'[)"\'<>\]\}]+$', '', u)
    # Decode &amp; etc. - we want the real URL
    u = html_lib.unescape(u)
    return u

def find_asset_urls(text):
    urls = set()
    # Search both raw text and HTML-decoded text
    decoded = html_lib.unescape(text)
    for source in (text, decoded):
        for m in URL_RE.finditer(source):
            u = clean_url(m.group(1))
            if is_asset_url(u):
                urls.add(u)
    return urls

def rewrite_css(css, base_url):
    # Find url(...) refs and absolute https refs
    def repl_url(m):
        raw = m.group(1).strip(' "\'')
        if raw.startswith("data:"):
            return m.group(0)
        absolute = urllib.parse.urljoin(base_url, raw)
        if is_asset_url(absolute):
            local = download_asset(absolute)
            # CSS lives in /assets/, so refs to other assets are same-dir
            local_rel = os.path.basename(local) if local.startswith("assets/") else local
            return f"url({local_rel})"
        return m.group(0)
    css = re.sub(r'url\(([^)]+)\)', repl_url, css)
    return css

print(f"Fetching {START_URL} ...")
html = fetch(START_URL, binary=False)

print("Discovering asset URLs ...")
asset_urls = find_asset_urls(html)
print(f"Found {len(asset_urls)} unique asset URLs in HTML")

print("Downloading assets (parallel) ...")
with ThreadPoolExecutor(max_workers=12) as ex:
    futures = [ex.submit(download_asset, u) for u in asset_urls]
    for f in as_completed(futures):
        pass

# Framer's .mjs files import additional .mjs chunks by bare filename.
# Crawl them recursively: parse each downloaded .mjs for imports, fetch
# any missing ones from framerusercontent.com/sites/<siteid>/.
FRAMER_SITES_RE = re.compile(r'framerusercontent\.com/sites/([A-Za-z0-9]+)/')
site_ids = set(FRAMER_SITES_RE.findall("\n".join(url_map.keys())))
print(f"Framer site IDs: {site_ids}")

CHUNK_RE = re.compile(r'([A-Za-z0-9_\-]+\.[A-Za-z0-9_\-]{6,12}\.mjs)')

def scan_mjs_for_chunks():
    """Return set of chunk filenames referenced inside downloaded .mjs files."""
    chunks = set()
    for name in os.listdir(ASSETS_DIR):
        if not name.endswith(".mjs"):
            continue
        try:
            with open(os.path.join(ASSETS_DIR, name), "r", encoding="utf-8", errors="replace") as f:
                content = f.read()
            for m in CHUNK_RE.findall(content):
                chunks.add(m)
        except Exception:
            pass
    return chunks

# Iteratively pull in missing chunks
for round_n in range(5):
    chunks = scan_mjs_for_chunks()
    existing = set(os.listdir(ASSETS_DIR))
    missing = chunks - existing
    if not missing:
        print(f"Recursive crawl converged after {round_n} rounds")
        break
    print(f"Round {round_n+1}: {len(missing)} missing chunks to fetch")
    new_urls = []
    for chunk in missing:
        for sid in site_ids:
            new_urls.append(f"https://framerusercontent.com/sites/{sid}/{chunk}")
    with ThreadPoolExecutor(max_workers=12) as ex:
        futures = [ex.submit(download_asset, u) for u in new_urls]
        for f in as_completed(futures):
            pass

# Second pass: rewrite all URLs in HTML
print("Rewriting HTML ...")
def repl_in_html(m):
    u = m.group(1)
    # Trim trailing punctuation
    trim = re.match(r'^(.*?)([)"\'<>\]\}]?)$', u)
    if trim:
        u_clean = trim.group(1)
    else:
        u_clean = u
    if u_clean in url_map and url_map[u_clean] != u_clean:
        return url_map[u_clean]
    return u

# Replace every occurrence of each remote URL with its local path.
# Must replace both the raw (decoded) form and any HTML-encoded form (&amp;).
for remote, local in url_map.items():
    if local != remote:
        html = html.replace(remote, local)
        encoded = remote.replace("&", "&amp;")
        if encoded != remote:
            html = html.replace(encoded, local)

# Save
out_html = os.path.join(OUT_DIR, "index.html")
with open(out_html, "w", encoding="utf-8") as f:
    f.write(html)

print(f"\nDone. Wrote {out_html}")
print(f"Assets: {len(os.listdir(ASSETS_DIR))} files in {ASSETS_DIR}")
