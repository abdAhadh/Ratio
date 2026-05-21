#!/usr/bin/env python3
"""Find every framerusercontent.com URL still in the HTML (and current DOM)
and download them locally, then rewrite the HTML."""
import os, re, html as html_lib, hashlib, urllib.request, urllib.parse
from concurrent.futures import ThreadPoolExecutor, as_completed

ROOT = os.path.dirname(os.path.abspath(__file__))
ASSETS_DIR = os.path.join(ROOT, "assets")
HTML_PATH = os.path.join(ROOT, "index.html")

HEADERS = {"User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0 Safari/537.36"}

with open(HTML_PATH, "r", encoding="utf-8") as f:
    html = f.read()

# Decode entities so we get clean URLs to fetch, but remember to replace both
# encoded and decoded forms in the HTML afterwards.
decoded = html_lib.unescape(html)

URL_RE = re.compile(r'https://(?:framerusercontent\.com|app\.framerstatic\.com)/[^\s"\'<>()\\]+')
urls = set(URL_RE.findall(decoded))
print(f"Found {len(urls)} remote URLs to download")

existing = set(os.listdir(ASSETS_DIR))
used_names = {n: None for n in existing}

def safe_name(url):
    base = os.path.basename(urllib.parse.urlparse(url).path) or "asset"
    base = re.sub(r"[^A-Za-z0-9._-]", "_", base)
    if base in used_names and used_names[base] != url:
        h = hashlib.md5(url.encode()).hexdigest()[:8]
        name, _, ext = base.rpartition(".")
        base = f"{name}-{h}.{ext}" if name else f"{base}-{h}"
    used_names[base] = url
    return base

url_map = {}

def fetch(url):
    name = safe_name(url)
    path = os.path.join(ASSETS_DIR, name)
    if not os.path.exists(path):
        try:
            req = urllib.request.Request(url, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=30) as r:
                data = r.read()
            with open(path, "wb") as f:
                f.write(data)
            print(f"  ✓ {url[:90]}")
        except Exception as e:
            print(f"  ✗ {url[:90]} -- {e}")
            return None
    url_map[url] = f"assets/{name}"
    return f"assets/{name}"

with ThreadPoolExecutor(max_workers=12) as ex:
    list(ex.map(fetch, urls))

# Replace in HTML. Important: replace longest URLs first to avoid prefix collisions.
print("Rewriting HTML ...")
for remote in sorted(url_map.keys(), key=len, reverse=True):
    local = url_map[remote]
    html = html.replace(remote, local)
    encoded = remote.replace("&", "&amp;")
    if encoded != remote:
        html = html.replace(encoded, local)

with open(HTML_PATH, "w", encoding="utf-8") as f:
    f.write(html)

# Verify
remaining = URL_RE.findall(html_lib.unescape(html))
print(f"Done. Remaining remote URLs in HTML: {len(set(remaining))}")
if remaining:
    for u in sorted(set(remaining))[:5]:
        print(f"  - {u}")
