#!/usr/bin/env python3
"""Download Google Fonts woff2 files referenced in HTML and rewrite.

Google Fonts URLs appear in CSS `@font-face { src: url(...) }` rules. They
live inline in the Framer HTML."""
import os, re, urllib.request

ROOT = os.path.dirname(os.path.abspath(__file__))
ASSETS_DIR = os.path.join(ROOT, "assets")
HTML_PATH = os.path.join(ROOT, "index.html")

HEADERS = {"User-Agent": "Mozilla/5.0 Chrome/120.0"}

with open(HTML_PATH) as f:
    html = f.read()

urls = set(re.findall(r'https://fonts\.gstatic\.com/[^\s)"\']+', html))
print(f"Found {len(urls)} font URLs")

mapping = {}
for u in urls:
    name = os.path.basename(u)
    if not name:
        continue
    path = os.path.join(ASSETS_DIR, name)
    if not os.path.exists(path):
        try:
            req = urllib.request.Request(u, headers=HEADERS)
            with urllib.request.urlopen(req, timeout=20) as r:
                with open(path, "wb") as f:
                    f.write(r.read())
            print(f"  ✓ {u}")
        except Exception as e:
            print(f"  ✗ {u} -- {e}")
            continue
    mapping[u] = f"assets/{name}"

for remote, local in mapping.items():
    html = html.replace(remote, local)

with open(HTML_PATH, "w") as f:
    f.write(html)

print(f"Rewrote HTML. Mapped {len(mapping)} fonts.")
