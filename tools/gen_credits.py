"""Rebuild demos/credits.html from demos/assets/img/credits.json. Run: python3 tools/gen_credits.py"""
import json, html, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
c = json.load(open(os.path.join(ROOT, "demos/assets/img/credits.json")))
rows = "".join(f"<tr><td><img src='{x['file'][6:]}' alt='' width='64' height='64' loading='lazy'></td><td>{html.escape(x['title'] or '')}</td><td>{html.escape(x['creator'] or '—')}</td><td>{x['license']}</td><td><a href='{html.escape(x['link'])}' rel='noopener' target='_blank'>{x['source']}</a></td></tr>" for x in c)
page = f"""<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Photo credits — demos</title>
<style>body{{font-family:system-ui,sans-serif;margin:0;padding:24px 16px;background:#fff;color:#222}}main{{max-width:900px;margin:0 auto}}table{{border-collapse:collapse;width:100%;font-size:14px}}td,th{{border-bottom:1px solid #eee;padding:6px;text-align:left;vertical-align:middle}}img{{border-radius:6px;object-fit:cover;display:block}}a{{color:#0f5132}}.wrap{{overflow-x:auto}}</style></head>
<body><main><h1>Photo credits</h1><p>Demo store photos come from <a href="https://openverse.org">Openverse</a> (StockSnap, WordPress Photo Directory, rawpixel, Flickr). CC0 photos need no credit; CC BY photos are credited here as their licence requires. {len(c)} photos. <a href="../">← Back</a></p>
<div class="wrap"><table><tr><th></th><th>Title</th><th>Creator</th><th>Licence</th><th>Source</th></tr>{rows}</table></div></main></body></html>"""
open(os.path.join(ROOT, "demos/credits.html"), "w").write(page)
print("credits:", len(c))
