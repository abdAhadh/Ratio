#!/usr/bin/env python3
"""Localize Unicorn Studio dependencies.

Steps:
1. Read scene IDs from .mjs files (projectId:`...`)
2. Fetch each scene JSON from storage.googleapis.com/unicornstudio-production/embeds/<id>
3. Walk each JSON for texture URLs, fetch them too
4. Fetch unicornstudio.umd.js
5. Inject a small <script> at the very top of <head> in index.html that
   redirects matching fetch/Image requests to local paths
"""
import os, re, json, urllib.request, urllib.parse, hashlib

ROOT = os.path.dirname(os.path.abspath(__file__))
ASSETS = os.path.join(ROOT, "assets")
SCENES = os.path.join(ASSETS, "us-scenes")
TEXTURES = os.path.join(ASSETS, "us-textures")
os.makedirs(SCENES, exist_ok=True)
os.makedirs(TEXTURES, exist_ok=True)

HEADERS = {"User-Agent": "Mozilla/5.0 Chrome/120.0"}

def fetch(url):
    req = urllib.request.Request(url, headers=HEADERS)
    with urllib.request.urlopen(req, timeout=30) as r:
        return r.read()

# 1. Scene IDs
scene_ids = set()
for f in os.listdir(ASSETS):
    if not f.endswith(".mjs"): continue
    with open(os.path.join(ASSETS, f), encoding="utf-8", errors="replace") as fh:
        content = fh.read()
    for m in re.finditer(r'projectId:`([A-Za-z0-9_-]+)`', content):
        scene_ids.add(m.group(1))
print(f"Scene IDs: {scene_ids}")

# 2. Fetch scenes
texture_urls = set()
for sid in scene_ids:
    url = f"https://storage.googleapis.com/unicornstudio-production/embeds/{sid}"
    out = os.path.join(SCENES, f"{sid}.json")
    if not os.path.exists(out):
        data = fetch(url)
        with open(out, "wb") as f:
            f.write(data)
        print(f"  scene: {sid}")
    # 3. Parse for textures
    with open(out) as f:
        text = f.read()
    for m in re.findall(r'https?://[^\s"\']+', text):
        if "unicorn" in m or "googleapis" in m:
            texture_urls.add(m.rstrip('\\,;)"\''))

print(f"\nTexture URLs: {len(texture_urls)}")

# 4. Fetch textures and build url->local map
texture_map = {}
for tu in texture_urls:
    parsed = urllib.parse.urlparse(tu)
    # Use URL-safe name preserving extension
    raw_name = urllib.parse.unquote(os.path.basename(parsed.path)) or "tex"
    name = re.sub(r"[^A-Za-z0-9._-]", "_", raw_name)
    h = hashlib.md5(tu.encode()).hexdigest()[:6]
    name, _, ext = name.rpartition(".")
    fname = f"{name}-{h}.{ext}" if ext else f"{name}-{h}"
    out = os.path.join(TEXTURES, fname)
    if not os.path.exists(out):
        try:
            data = fetch(tu)
            with open(out, "wb") as f:
                f.write(data)
            print(f"  tex: {tu[:80]}")
        except Exception as e:
            print(f"  ✗ {tu[:80]} -- {e}")
            continue
    texture_map[tu] = f"/assets/us-textures/{fname}"

# Rewrite scene JSONs to point at local textures
for sid in scene_ids:
    p = os.path.join(SCENES, f"{sid}.json")
    with open(p) as f:
        text = f.read()
    for remote, local in texture_map.items():
        text = text.replace(remote, local)
    with open(p, "w") as f:
        f.write(text)

# 5. Fetch unicornstudio.umd.js
LIB_URL = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.1.6/dist/unicornStudio.umd.js"
lib_path = os.path.join(ASSETS, "unicornStudio.umd.js")
if not os.path.exists(lib_path):
    data = fetch(LIB_URL)
    with open(lib_path, "wb") as f:
        f.write(data)
    print(f"\nFetched engine: {len(data)} bytes")

# 6. Inject fetch interceptor into HTML
HTML_PATH = os.path.join(ROOT, "index.html")
with open(HTML_PATH) as f:
    html = f.read()

# Build the runtime texture map injected into the page
texture_redirect_map = {}
for remote, local in texture_map.items():
    texture_redirect_map[remote] = local
    # Also map without query string in case engine strips it
    base = remote.split("?")[0]
    texture_redirect_map[base] = local

interceptor = f"""<script>
(function(){{
  var TEX_MAP = {json.dumps(texture_redirect_map)};
  function redirect(url) {{
    var u = String(url);
    // Scene JSON
    var m = u.match(/storage\\.googleapis\\.com\\/unicornstudio-production\\/embeds\\/([A-Za-z0-9_-]+)/);
    if (m) return '/assets/us-scenes/' + m[1] + '.json';
    // Textures (with or without ?v= cache busting)
    var base = u.split('?')[0];
    if (TEX_MAP[u]) return TEX_MAP[u];
    if (TEX_MAP[base]) return TEX_MAP[base];
    // Also redirect the jsDelivr library if requested at runtime
    if (u.indexOf('cdn.jsdelivr.net') !== -1 && u.indexOf('unicornstudio') !== -1) {{
      return '/assets/unicornStudio.umd.js';
    }}
    return null;
  }}
  var _fetch = window.fetch;
  window.fetch = function(input, init) {{
    var url = typeof input === 'string' ? input : (input && input.url) || '';
    var r = redirect(url);
    if (r) return _fetch(r, init);
    return _fetch(input, init);
  }};
  var _XHRopen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url) {{
    var r = redirect(url);
    if (r) arguments[1] = r;
    return _XHRopen.apply(this, arguments);
  }};
  var _ImageSrc = Object.getOwnPropertyDescriptor(HTMLImageElement.prototype, 'src');
  Object.defineProperty(HTMLImageElement.prototype, 'src', {{
    set: function(v) {{
      var r = redirect(v);
      _ImageSrc.set.call(this, r || v);
    }},
    get: function() {{ return _ImageSrc.get.call(this); }}
  }});
}})();
</script>
"""

# Inject right after <head> tag so it runs before any other script
if "<!-- us-localize -->" not in html:
    html = html.replace("<head>", "<head>\n<!-- us-localize -->" + interceptor, 1)

with open(HTML_PATH, "w") as f:
    f.write(html)

print(f"\nDone. Injected interceptor into {HTML_PATH}")
print(f"  Scenes: {len(scene_ids)}  Textures: {len(texture_map)}")
