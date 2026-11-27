# Prompt: design review of BizGrow BD demo sites (run in a local session with Claude in Chrome)

Paste everything below the line into a Claude Code session on your own computer that has the Claude in Chrome extension.

---

Use Claude in Chrome. Open ONE new tab and review the e-commerce demo sites below like a normal visitor. Do not use my other tabs, do not log in, do not place or submit any order, do not fill personal details, and do not try to get around Cloudflare or any bot check. If a site is down, suspended or blocked, record that and move on.

Sites (BizGrow BD demos):
1. https://cityshopbd.shop/
2. https://qtbazar.bizgrowbd.com/
3. https://primetuch.com/
4. https://organicfood.bizgrowbd.com/
5. https://easyshop.bizgrowbd.com/
6. https://rpshopbd.com/
7. https://bookshop.bizgrowbd.com/
8. https://anuvutiprokashoni.com/
9. https://chinazone.shop/
10. https://saree.bizgrowbd.com/
11. https://organic2.bizgrowbd.com/
12. https://beautyglobar.shop/
13. https://biz7.bizgrowbd.com/
14. https://zarvikbd.com/
15. https://guptoshop.bizgrowbd.com/
16. https://fashion.bizgrowbd.com/
17. https://sasenterprise.com.bd/

GOAL: a DESIGN report detailed enough that a developer can build our own original theme in the same style for each site, for desktop (≈1440px) AND mobile (390px — if the window won't resize, load the page in a 390px-wide frame inside the tab).

For EACH site visit: homepage, one category/shop page, one product page, the cart (add 1 item, then remove it), and look at checkout without submitting. Then write:

A. Status: live / down / suspended / blocked; platform hints (WordPress/WooCommerce theme name, Elementor, plugins seen in page source).
B. Design tokens: primary/secondary/accent/background/text colours (hex, use DevTools computed styles), fonts (family, sizes for H1/H2/body/price/button, weights), border radius, shadows, spacing feel (tight/airy), button styles (filled/outline, shape, hover).
C. Desktop layout, top to bottom, section by section: announcement bar, header (logo position, search style, icons, menu style, sticky?), hero (slider/static, size, text position), category blocks (circles/cards/icons, how many per row), product rows (grid columns, carousel or grid), banners, testimonials, footer columns. Give approximate heights/widths and how many items per row.
D. Product card anatomy: image ratio, badges (where, colour, text), name lines, price/old price style, rating, buttons (text, colour, position), hover effects.
E. Product page layout: gallery type, buy box order (title, price, variants, qty, buttons — exact button labels and colours), trust badges, tabs, related products, sticky bars.
F. Cart & checkout: side cart or page, checkout fields in order, delivery charge options and amounts, payment methods, order summary placement, any upsell/order bump.
G. Mobile (390px): header, menu (drawer style), bottom nav (items), how sections stack, product grid columns, floating buttons (WhatsApp/call/messenger), sticky order bar.
H. Special features: one-page/landing-page order form, countdown, popups, incomplete-order capture, WhatsApp/Messenger buttons, Facebook Pixel, language.
I. Strengths (what looks premium / converts well) and weaknesses (broken things, dummy text like "My WordPress Blog" or "Hello world", slow load, layout bugs, ৳0 prices).
J. One-line "style name" for the theme (e.g. "Warm organic, orange header, rounded cards") and which business type it suits.

Also take screenshots (desktop home, mobile home, product page) for each live site if you can, and save them next to the report as <number>-<site>-desktop.png / -mobile.png / -product.png.

After all sites, add:
- A comparison table: site, status, style name, primary colour, fonts, header type, card style, best for.
- A list of DISTINCT design patterns (many demos reuse the same theme with different colours — group them).
- Which 6–8 designs are worth building our own versions of, and why.

Important: this is for building our OWN original themes in similar styles. Record layout, structure and design tokens; do NOT copy their logos, product photos, brand names or text.

Save everything as bizgrow-demos-report.md (+ screenshots) in this folder.
