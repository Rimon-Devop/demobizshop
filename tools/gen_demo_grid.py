"""Rebuild the demo cards on the main page (index.html) from the list below, with category filter chips.
Run: python3 tools/gen_demo_grid.py   (thumbnails: assets/demos/<slug>.jpg)"""
import os, re, html

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
GROUPS = [("all", "সব ডিজাইন", "All"), ("food", "খাবার ও গ্রোসারি", "Food"), ("fashion", "ফ্যাশন", "Fashion"), ("beauty", "বিউটি", "Beauty"),
          ("gadget", "গ্যাজেট", "Gadgets"), ("books", "বই ও ইসলামিক", "Books"), ("luxury", "জুয়েলারি ও লাক্সারি", "Luxury"), ("landing", "ল্যান্ডিং পেজ", "Landing pages")]
# slug, group, Bangla title, English title, Bangla note, English note, featured
DEMOS = [
    ("bazar", "food", "বড় অনলাইন সুপারশপ (সম্পূর্ণ ফিচার)", "Full-featured online supershop", "ক্যাটাগরি ফিল্টার, লাইভ সার্চ, ফ্ল্যাশ সেল, জেলা অনুযায়ী ডেলিভারি চার্জ, অগ্রিম পেমেন্ট, অর্ডার ট্র্যাকিং", "Filters, live search, flash sale, district delivery charges, part-payment, tracking", True),
    ("t1-green-bazar", "food", "ফ্রেশ গ্রিন বাজার", "Fresh green bazaar", "সবুজ ক্যাটাগরি বার, মোস্ট সেলিং লিস্ট, ২×২ অর্ডার বাটন", "Green category bar, most-selling list, 2×2 buy buttons", False),
    ("t5-organic-editorial", "food", "অর্গানিক এডিটোরিয়াল", "Organic editorial", "সেরিফ হেডিং, গোলাকার কার্ড, \"কেন আমরা\" সেকশন", "Serif headings, rounded cards, why-us band", False),
    ("organic", "food", "অর্গানিক ফুড — ক্লাসিক", "Organic food — classic", "গুড়, মধু, ঘি, মসলা, তেল", "Gur, honey, ghee, spices, oil", False),
    ("t4-royal-boutique", "fashion", "রয়্যাল বুটিক", "Royal boutique", "মেরুন থিম, পোর্ট্রেট কার্ড, শাড়ি ও কুর্তি", "Maroon theme, portrait cards, saree & kurti", False),
    ("t7-atelier-blush", "fashion", "অ্যাটেলিয়ার ব্লাশ", "Atelier blush", "প্রিমিয়াম নারী ফ্যাশন, বিউটি ও জুয়েলারি", "Premium womenswear, beauty & jewellery", False),
    ("t7-atelier-mocha", "fashion", "অ্যাটেলিয়ার মোকা", "Atelier mocha", "প্রিমিয়াম মেনসওয়্যার, এডিট ব্যানার, নিউজলেটার", "Premium menswear, edit banners, newsletter", False),
    ("t6-menswear", "fashion", "ক্রিম এডিটোরিয়াল মেনসওয়্যার", "Cream editorial menswear", "ম্যাগাজিন স্টাইল হিরো, মাঝখানে লোগো", "Magazine-style hero, centred logo", False),
    ("fashion", "fashion", "ফ্যাশন ও শাড়ি — ক্লাসিক", "Fashion & saree — classic", "শাড়ি, থ্রি-পিস, কুর্তি, পাঞ্জাবি", "Saree, three-piece, kurti, panjabi", False),
    ("t3-mart-pink", "beauty", "মেগা মার্ট — পিংক", "Mega mart — pink", "কাউন্টডাউন বার, ফ্ল্যাশ সেল, ৬ কলাম গ্রিড", "Countdown bar, flash sale, 6-column grid", False),
    ("t2-herbal", "beauty", "হারবাল গ্রেডিয়েন্ট", "Herbal gradient", "গ্রেডিয়েন্ট সেকশন বার, গোল ক্যাটাগরি কার্ড", "Gradient section bars, round category cards", False),
    ("beauty", "beauty", "বিউটি — ক্লাসিক", "Beauty — classic", "স্কিনকেয়ার, মেকআপ, হেয়ারকেয়ার", "Skincare, makeup, haircare", False),
    ("t3-mart-orange", "gadget", "গ্যাজেট মার্ট — অরেঞ্জ", "Gadget mart — orange", "Browse Category বার, ফ্ল্যাশ সেল, স্টেপ চেকআউট", "Browse-category bar, flash sale, stepper checkout", False),
    ("t3-mart-blue", "gadget", "ইজি মার্ট — ব্লু", "Easy mart — blue", "মার্কেটপ্লেস স্টাইল, ঘন প্রোডাক্ট গ্রিড", "Marketplace style, dense product grid", False),
    ("t3b-library", "books", "লাইব্রেরি গ্রিন ও গোল্ড", "Library green & gold", "বই, ইসলামিক পণ্য ও স্টেশনারি; বাল্ক অর্ডার", "Books, Islamic items & stationery; bulk orders", False),
    ("t8-black-gold", "luxury", "ব্ল্যাক ও গোল্ড অ্যারাবিয়ান", "Black & gold Arabian", "আতর, মডেস্ট ফ্যাশন, উপহার; মারকি রিবন, FAQ", "Attar, modest wear, gifts; marquee, FAQ", False),
    ("jewelry", "luxury", "জুয়েলারি — ক্লাসিক", "Jewellery — classic", "আংটি, নেকলেস, কানের দুল, চুড়ি", "Rings, necklaces, earrings, bangles", False),
    ("landing", "landing", "সিঙ্গেল প্রোডাক্ট ল্যান্ডিং", "Single-product landing", "লম্বা সেলস পেজ, কাউন্টডাউন, প্যাকেজ বাছাই", "Long sales page, countdown, package picker", False),
    ("landing-offer", "landing", "অফার ল্যান্ডিং (গ্রেডিয়েন্ট ফর্ম)", "Offer landing (gradient form)", "ফেসবুক অ্যাড থেকে সরাসরি অর্ডার, পেজেই ফর্ম", "Facebook ad → order form on the page", False),
    ("maintenance", "landing", "মেইনটেন্যান্স পেজ", "Maintenance page", "সাইট আপডেটের সময়ও WhatsApp-এ অর্ডার", "Keeps taking WhatsApp orders during updates", False),
]


def card(slug, grp, bt, et, bn, en, feat):
    return f'''
      <a class="demo{" demo--featured" if feat else ""}" href="demos/{slug}/" target="_blank" rel="noopener" data-group="{grp}">
        <div class="demo__thumb"><img src="assets/demos/{slug}.jpg" alt="{html.escape(et)} demo" loading="lazy" width="640" height="400"></div>
        <div class="demo__body"><h3><span lang="bn">{bt}</span><span lang="en">{html.escape(et)}</span></h3><p><span lang="bn">{bn}</span><span lang="en">{html.escape(en)}</span></p>
          <span class="demo__tag demo__tag--live">● <span lang="bn">{"নতুন" if feat else "লাইভ"}</span><span lang="en">{"New" if feat else "Live"}</span></span>
          <span class="demo__open"><span lang="bn">ডেমো দেখুন ↗</span><span lang="en">Open demo ↗</span></span></div>
      </a>'''


def build():
    chips = '\n    <div class="demo-filter" role="tablist" aria-label="ডেমো ফিল্টার">' + "".join(
        f'<button class="{"on" if g == "all" else ""}" data-filter="{g}"><span lang="bn">{b}</span><span lang="en">{e}</span></button>' for g, b, e in GROUPS) + "</div>"
    cards = "".join(card(*d) for d in DEMOS)
    custom = '''
      <a class="demo demo--custom" href="#contact" data-demo="Custom design" data-group="all">
        <div class="demo__thumb t-custom"><span>✏️</span></div>
        <div class="demo__body"><h3><span lang="bn">আপনার পছন্দের ডিজাইন</span><span lang="en">Your own design</span></h3><p><span lang="bn">পছন্দের কোনো সাইটের লিংক দিন — সেভাবেই বানিয়ে দেব</span><span lang="en">Send a site you like — we'll build it your way</span></p>
          <span class="demo__open"><span lang="bn">যোগাযোগ করুন →</span><span lang="en">Contact us →</span></span></div>
      </a>'''
    return chips + '\n    <div class="demos" id="demoGrid">' + cards + custom + "\n    </div>"


if __name__ == "__main__":
    p = os.path.join(ROOT, "index.html"); s = open(p).read()
    start = s.index('<div class="demo-filter"') if '<div class="demo-filter"' in s else s.index('<div class="demos"')
    end = s.index("</section>", start)
    tail = s[start:end]; close = tail.rstrip()[-len("</div>"):]  # keep container closing
    # the block ends with: </div>\n  </div>\n  (demos div, then container div)
    s = s[:start] + build().lstrip() + "\n  </div>\n" + s[end:]
    open(p, "w").write(s)
    missing = [d[0] for d in DEMOS if not os.path.exists(os.path.join(ROOT, "assets", "demos", d[0] + ".jpg"))]
    print("cards:", len(DEMOS), "missing thumbs:", missing)
