"""Generate demos/<slug>/index.html for every theme config below.
Run:  python3 tools/gen_demos.py
Each demo = one data set (demos/data/*.js) + one theme config rendered by demos/kit/kit.js."""
import json, os, html

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FONTS = {
    "hind": "Hind+Siliguri:wght@400;500;600;700",
    "anek": "Anek+Bangla:wght@400;500;600;700",
    "jakarta": "Plus+Jakarta+Sans:wght@400;600;700;800",
    "inter": "Inter:wght@400;500;600;700",
    "cormorant": "Cormorant+Garamond:wght@400;500;600;700",
    "jost": "Jost:wght@300;400;500;600",
    "playfair": "Playfair+Display:wght@400;600;700",
    "oswald": "Oswald:wght@200;300;400;600",
    "roboto": "Roboto:wght@400;500;700",
}

DEMOS = [
  # ---------------- T1 Fresh green bazaar ----------------
  dict(slug="t1-green-bazar", label="ফ্রেশ গ্রিন বাজার", group="food", data=["sets-a"], dataset="organic", fonts=["hind"],
       brand=dict(name="সবুজ বাজার", sub="ঘরের সব প্রয়োজন, এক জায়গায়", mark="স"),
       theme=dict(vars={"p": "#097f00", "p2": "#066300", "a": "#111111", "bg": "#f2f3ee", "r": "10px", "br": "6px", "font": "'Hind Siliguri', sans-serif", "off-bg": "#111"},
                  header="classic", catbar="solid", hero="banner", cats="card", title="plain", card="outline", cols=5,
                  home=["trust", "cats", "mostlist", "rows", "banner", "grid", "testi"], buybox="grid", checkout="card",
                  bnav=["menu", "shop", "home", "search", "track"], bnavCenter="home", miniCart=True),
       hero=dict(slides=[dict(kicker="আজকের অফার", title="খাঁটি খাবার, ঘরে বসেই", sub="মধু, ঘি, গুড়, মসলা — ১৫০০ টাকার উপরে ফ্রি ডেলিভারি", img="h1", bg="linear-gradient(110deg,#066300,#0d9b00)"),
                         dict(kicker="নতুন মৌসুম", title="খেজুরের পাটালি গুড়", sub="যশোরের গাছির হাতে তৈরি", img="g1", bg="linear-gradient(110deg,#4a2a0c,#9a5a1c)")]),
       banner=dict(kicker="রান্নায় খাঁটি স্বাদ", title="ঘানি ভাঙা সরিষার তেল ও গাওয়া ঘি", img="o1", link="#/c/ghee")),
  # ---------------- T2 Herbal gradient bars ----------------
  dict(slug="t2-herbal", label="হারবাল গ্রেডিয়েন্ট", group="beauty", data=["sets-a"], dataset="beauty", fonts=["anek", "roboto"],
       brand=dict(name="প্রাকৃতিক", sub="হারবাল স্কিন ও হেয়ার কেয়ার", mark="🌿"),
       theme=dict(vars={"p": "#009935", "p2": "#007a2b", "a": "#e53935", "bg": "#ffffff", "price": "#e53935", "r": "12px", "br": "8px", "font": "'Anek Bangla', 'Roboto', sans-serif"},
                  header="single", catbar="none", hero="banner", cats="label", title="gradient", card="bordered", cols=5,
                  home=["cats", "best", "rows", "testi"], buybox="grid", checkout="card", bnav=["call", "shop", "home", "track", "cart"], bnavCenter="home"),
       menu=[["হোম", "#/"], ["শপ", "#/shop"], ["ক্যাটাগরি", "#/c/serum"], ["যোগাযোগ", "#/page"]],
       hero=dict(slides=[dict(kicker="১০০% হারবাল", title="প্রকৃতির যত্নে আপনার ত্বক", sub="কেমিক্যাল ছাড়া স্কিন ও হেয়ার কেয়ার", img="k3", bg="linear-gradient(110deg,#00752a,#2bbf5c)")])),
  # ---------------- T3 Gadget mart — pink preset (beauty) ----------------
  dict(slug="t3-mart-pink", label="মেগা মার্ট — পিংক", group="beauty", data=["sets-a"], dataset="beauty", fonts=["hind", "roboto"],
       brand=dict(name="GlowMart", sub="বিউটি ও লাইফস্টাইল", mark="G"),
       theme=dict(vars={"p": "#ed005d", "p2": "#b80048", "a": "#111111", "bg": "#f3f4f6", "price": "#ed005d", "r": "6px", "br": "4px", "font": "'Hind Siliguri', 'Roboto', sans-serif", "head": "'Trebuchet MS', 'Hind Siliguri', sans-serif"},
                  topbar=dict(type="countdown", text="🔥 সব সিরামে ২৫% ছাড় — অফার শেষ হতে বাকি"), header="classic", catbar="browse", hero="slider-sides", cats="card", title="bar", card="dense", cols=6,
                  home=["cats", "flash", "banner", "best", "grid", "testi"], buybox="grid", checkout="stepper", bnav=["menu", "shop", "home", "search", "cart"], bnavCenter="home"),
       browseLabel="BROWSE CATEGORY",
       hero=dict(slides=[dict(kicker="নতুন অ্যারাইভাল", title="ভিটামিন সি গ্লো সিরাম", sub="লঞ্চ অফারে ২৫% ছাড়", img="s1", bg="linear-gradient(110deg,#b80048,#ff4f93)"),
                         dict(kicker="শীতের যত্ন", title="ডিপ ময়েশ্চারাইজিং ক্রিম", sub="শুষ্ক ত্বকে ২৪ ঘণ্টা আর্দ্রতা", img="k1", bg="linear-gradient(110deg,#6a1b9a,#c2185b)")], sides=["l1", "c1"], sideText=["লিপস্টিক কালেকশন", "ফেসওয়াশ অফার"]),
       banner=dict(kicker="কম্বো অফার", title="ক্লেনজার + সিরাম + সানস্ক্রিন একসাথে ৩০০ টাকা কমে", img="k2", link="#/c/cream"),
       labels=dict(buy="অর্ডার করুন", flash="ফ্ল্যাশ সেল", best="টপ সেলিং প্রোডাক্ট")),
  # ---------------- T4 Royal maroon boutique ----------------
  dict(slug="t4-royal-boutique", label="রয়্যাল বুটিক", group="fashion", data=["sets-a"], dataset="boutique", fonts=["jakarta", "hind"],
       brand=dict(name="রাজকন্যা", sub="BOUTIQUE", mark=""),
       theme=dict(vars={"p": "#5c0308", "p2": "#3f0205", "a": "#c8102e", "bg": "#fff", "cb": "#5c0308", "r": "6px", "br": "4px", "font": "'Hind Siliguri', 'Plus Jakarta Sans', sans-serif", "head": "'Plus Jakarta Sans', 'Hind Siliguri', sans-serif", "logo-ls": ".02em"},
                  header="boutique", catbar="center", hero="banner", cats="circle", title="gradient", card="portrait", cols=4,
                  home=["cats", "best", "rows", "banner", "testi"], buybox="stack", checkout="card", bnav=["menu", "shop", "call", "track", "cart"], bnavCenter="call", rowsAsGrid=True),
       hero=dict(slides=[dict(kicker="ঈদ কালেকশন", title="স্টাইলিশ শাড়ি ও কুর্তি কালেকশন", sub="নতুন ডিজাইন, সাশ্রয়ী দাম", img="fashion.sa1", bg="linear-gradient(110deg,#3f0205,#8c0f1a)")]),
       banner=dict(kicker="ব্রাইডাল সেট", title="শাড়ির সাথে মানানসই গয়না", img="jewelry.n1", link="#/c/jewel"), variantLabel="সাইজ"),
  # ---------------- T5 Organic editorial ----------------
  dict(slug="t5-organic-editorial", label="অর্গানিক এডিটোরিয়াল", group="food", data=["sets-a"], dataset="organic", fonts=["inter", "hind"],
       brand=dict(name="Ethica Organic", sub="প্রকৃতির খাঁটি স্বাদ", mark="E"),
       theme=dict(vars={"p": "#159a4c", "p2": "#0f7a3b", "a": "#159a4c", "bg": "#fbfdfb", "why-bg": "#e0f5ea", "r": "16px", "br": "99px", "font": "'Inter', 'Hind Siliguri', sans-serif", "head": "Georgia, 'Hind Siliguri', serif"},
                  header="single", catbar="white", hero="slider-sides", cats="card", title="serif", card="rounded", cols=5,
                  home=["cats", "best", "why", "rows", "testi"], buybox="stack", checkout="card", footer="light", bnav=["menu", "shop", "home", "cart", "search"], bnavCenter="home"),
       menu=[["Home", "#/"], ["Shop", "#/shop"], ["About", "#/page"], ["Contact", "#/page"]],
       hero=dict(slides=[dict(kicker="শাহী মসলা", title="স্বাদের রাজ্যে সবার সেরা", sub="ঘরে তৈরির মতো খাঁটি মসলা", img="m4", bg="linear-gradient(110deg,#5a3a12,#b8862f)")], sides=["h1", "d1"], sideText=["খাঁটি মধু", "প্রিমিয়াম খেজুর"]),
       why=["১০০% খাঁটি পণ্য", "ল্যাব টেস্টেড", "দ্রুত হোম ডেলিভারি", "সহজ রিটার্ন"], whyImg="h1"),
  # ---------------- T7 Atelier (blush & espresso) ----------------
  dict(slug="t7-atelier-blush", label="অ্যাটেলিয়ার ব্লাশ", group="fashion", data=["sets-a"], dataset="blush", fonts=["cormorant", "jost", "hind"],
       brand=dict(name="Valéria", sub="ATELIER", mark=""),
       theme=dict(vars={"p": "#1f1815", "p2": "#1f1815", "a": "#b87458", "bg": "#fdede5", "card": "#fff8f4", "hd": "#1f1815", "hdi": "#fdede5", "logo": "#fdede5", "r": "0px", "br": "0px", "font": "'Jost', 'Hind Siliguri', sans-serif", "head": "'Cormorant Garamond', 'Hind Siliguri', serif", "logo-ls": ".12em", "price": "#1f1815"},
                  header="luxe", catbar="none", hero="full", cats="circle", title="serif", card="luxe", cols=4, stars=True,
                  home=["cats", "edits", "best", "rows", "newsletter"], buybox="stack", checkout="banner", pdCountdown=True, bnav=["menu", "shop", "home", "search", "cart"], bnavCenter="home", miniCart=True),
       menu=[["Saree", "#/c/saree"], ["Three-piece", "#/c/three"], ["Skincare", "#/c/beauty"], ["Jewellery", "#/c/jewel"]],
       hero=dict(slides=[dict(kicker="THE BEAUTY EDIT", title="Glow That Lasts All Day", sub="প্রিমিয়াম পোশাক, স্কিনকেয়ার ও জুয়েলারি", img="fashion.sa3", cta="Shop Now")]),
       labels=dict(buy="Order Now", viewAll="View all", cats="Shop by Category", best="Best Sellers"), nlTitle="Join the Valéria list"),
]


def page(d):
    fonts = "&".join("family=" + FONTS[f] for f in d["fonts"])
    conf = {k: v for k, v in d.items() if k not in ("slug", "data", "dataset", "fonts", "group")}
    conf.update(id=d["slug"], data=d["dataset"])
    scripts = "".join(f'<script src="../data/{s}.js"></script>' for s in d["data"])
    return f"""<!doctype html>
<html lang="bn">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>{html.escape(d['brand']['name'])} — {html.escape(d['label'])} | ডেমো</title>
<meta name="description" content="{html.escape(d['label'])} ডিজাইনের ই-কমার্স ডেমো — ShopShuru" />
<link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?{fonts}&display=swap" rel="stylesheet" />
<link rel="stylesheet" href="../kit/kit.css" />
</head>
<body>
{scripts}
<script>window.DEMO = {json.dumps(conf, ensure_ascii=False)};</script>
<script src="../kit/kit.js"></script>
</body>
</html>
"""


if __name__ == "__main__":
    import sys
    only = set(sys.argv[1:])
    for d in DEMOS:
        if only and d["slug"] not in only:
            continue
        out = os.path.join(ROOT, "demos", d["slug"], "index.html")
        os.makedirs(os.path.dirname(out), exist_ok=True)
        open(out, "w").write(page(d))
        print("wrote", out)
    json.dump([{k: d[k] for k in ("slug", "label", "group")} | {"brand": d["brand"]["name"]} for d in DEMOS],
              open(os.path.join(ROOT, "tools", "demos.json"), "w"), ensure_ascii=False, indent=1)
