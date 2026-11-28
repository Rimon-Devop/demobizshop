# BizGrow BD demo sites: design teardown for building our own themes

**Reviewed:** 28 Nov 2026 in one Chrome tab as a normal visitor. The first tab was closed while the work was paused, so a single replacement tab was opened.
**Rules followed:**
- No login, and no personal details were typed anywhere.
- Nothing was submitted or ordered.
- On every live site one item was added to the cart and then removed. Every cart was confirmed empty afterwards.
- No security warnings or bot checks were bypassed.

**How it was measured:**
- **Desktop:** the browser window could not be resized to exactly 1440 px. Most pages were measured at a **1536 px CSS viewport**; a few (#10, #11) at 1150 px while the side panel was open. Pixel sizes below are CSS px at that width. Scale them by about 0.94 for 1440.
- **Mobile:** the window would not resize, so each homepage was loaded in a **390 px-wide frame inside the tab**. This uses the site's real mobile CSS.
- **Colours and fonts:** taken from computed styles (`getComputedStyle`). Values marked `~` were read from screenshots.

**Purpose:** a developer brief for building **our own original themes** in similar styles. It records layout, structure and tokens only. Do not reuse their logos, photos, brand names or copy.

**Screenshots** are saved next to this file as `NN-site-desktop.png`, `NN-site-mobile.png` and `NN-site-product.png`. Blocked or suspended sites only have what could be captured.

---

## 0. Executive summary

| | |
|---|---|
| Sites live | **14 of 17** |
| Not usable | #06 rpshopbd.com (SSL "Privacy error"), #09 chinazone.shop (maintenance page), #17 sasenterprise.com.bd (hosting account suspended) |
| Platform (all live sites) | **WordPress 7.1.x + WooCommerce + Elementor** (Elementor Pro or the free "Pro Elements" fork). Base theme **Hello Elementor** with one of three BizGrow child themes (`Guptochildtheme`, `tebionbdchildtheme`, `Bizgrowchildtheme`). #02 uses **Astra**. |
| Distinct designs | **8 theme families** (see §19). Many demos are the same template with a different colour. |
| Common BizGrow add-ons | FunnelKit side cart (`cart-for-woocommerce`), "Buy Now" button plugin, BizGrow category-showcase and live-search plugins, BizGrow mobile bottom-nav widget, Chaty floating contact, kb-discount-badge, PixelYourSite / Meta Pixel, `orderflow` and `incomplete-order-saver` (abandoned-order capture), `ecommerce-toolkit` (floating mini-cart, countdown, cart upsell) |
| Typical BD conversion kit | Buy Now next to Add to Cart, WhatsApp order button, call-to-order button, COD-only checkout with 3 fields (name, phone, address), Inside/Outside Dhaka delivery radios (60–80 ৳ / 110–130 ৳), floating cart, mobile bottom nav |
| Most premium | #14 zarvikbd (and its twin #16), #15 guptoshop, #13 biz7 |
| Most "conversion-bazaar" | #01/#04 green bazaar, #03/#05/#12 gadget mart, #07/#08 book store |

---

## 1. cityshopbd.shop (template T1 "Fresh green bazaar")

Screenshots: `01-cityshopbd-desktop.png`, `-mobile.png`, `-product.png`

**A. Status and platform**
- **Status:** live.
- **Stack:** WP 7.1.5, WooCommerce, Hello Elementor with child theme **Guptochildtheme**, Elementor plus Pro Elements.
- **Plugins:**
  - kb-discount-badge, bsbp best-selling badge
  - ttpixel-loop-filter (TikTok pixel)
  - chaty (floating contact)
  - cart-for-woocommerce (FunnelKit side cart)
  - skyboot custom icons
  - **orderflow** (BizGrow order-flow plugin, likely incomplete-order capture)
  - category-showcase-bizgrow-bd
  - Buy-Now-Add-to-Cart-Button-V3
- **Tracking:** Meta Pixel is active (`fbq`).
- **Language:** `en-US` on the page, Bangla in content and checkout.

**B. Design tokens**

| Token | Value |
|---|---|
| Primary | green **#097F00** (nav bar, buttons, prices) |
| Footer | #097F00, bottom strip #0C9200 |
| Page background | warm off-white **#F2F3EE** |
| Surfaces | white cards with radius about 10 px |
| Text | #333 body, #222831 titles, #111 H2 |
| Badges | black pill "Save-25%" (white 12/600), red "🔥 Best Selling" pill (#E00 range) |
| Fonts | body system stack (-apple-system) 16 px; H2 **Hind Siliguri 26/600**; card/section titles **Open Sans 20/600**; buttons Open Sans 15/600 |
| Radius | cards 10, images 10, buttons 5 |
| Shadow | none (thin borders) |
| Spacing | medium; each section is a white card with about 20 px of padding and 18 px gaps on an off-white page |
| Buttons | green filled (Buy Now) or green outline (Add to Cart) with cart icon; the Buy Now and Place Order buttons have a constant **wobble/tilt animation** |

**C. Desktop layout (top to bottom, 1536 viewport, about 1120 px container)**
1. **Header** (white, 101 px):
   - Logo left.
   - Wide search in the centre (about 500 px, green 1 px border, solid green square search button).
   - Right: icon-over-label links (Track Order, Sign in, Cart with a red count badge, More).
2. **Nav bar** (green, 58 px, sticky): 9 white category links in one row, no dropdowns.
3. **Hero:** full-container image carousel, about 485 px tall, rounded, with dots.
4. **Popular Categories:** white card holding a carousel of 8 square tiles (image and label) with round grey arrows.
5. **Most Selling products:** white card, 2-column list of horizontal cards. Each has a 281 px image on the left and on the right the title, old/new price, Save pill and a full-width green **Buy Now**. Shows 4 items.
6. **Category carousels** (Kitchen Items, Home Decoration, Premium Dates, …). Each is a white card with:
   - a title on the left with a short green underline, and "View All →" on the right
   - 5 cards per row, with dots
   - about 500 px tall
7. **Combo Deals** strip (icon box and button).
8. **Full-width image banner** (about 360 px).
9. **Just For You** grid: 5 columns × 3 rows.
10. **Trust 2×2 icon boxes:** Fast Delivery, 24/7 Support, Secure Payment, Quality Checked.
11. **Footer** (green, about 430 px): 4 columns (logo, about and contact | Our Information | Quick Links | Customer Care), then a copyright strip.

**D. Product card** (grid version, about 235×330)
- White card, light border, radius 10.
- Square image (radius 10).
- Black "-28%" pill top-left; red "Best Selling" pill top-right.
- Title on 1 line with ellipsis, Open Sans 15–16/600.
- Price: old price grey with strike, then the new price in green, bold and underlined.
- Full-width **outline green "🛒 Add to Cart"** button.
- No rating, no hover swap.

**E. Product page**
- Breadcrumb.
- White card in 2 columns:
  - **Gallery** (left, about 590 px): large image with a zoom icon. #04 adds a vertical thumbnail strip.
  - **Buy box** (right), in order:
    1. H1 about 26 px
    2. old price struck, new price green and underlined, black "Save-23%" pill
    3. divider
    4. qty stepper (grey squares, − 1 +)
    5. 2×2 button grid: **Add to Cart** (green), **Buy Now** (black, wobble), **"Whatsappp Order"** (red; this is a typo and the wrong colour), **Call For Order** (navy)
- Tabs as grey pills, sticky: Description | Customer Reviews (0).
- "Product Details" block (empty).
- Review block: 0.0 average, % recommended, 5-row star bars, submit form.
- **Related Products** carousel, 5 per row.

**F. Cart and checkout**
- **Side cart** (FunnelKit drawer, right, about 400 px):
  - title "Shopping Cart (1)"
  - item with qty stepper, struck and new price, "Save 23%"
  - "Have any Coupon?" accordion
  - Subtotal and a big green **Checkout** button
  - empty state: cart icon and "Shop Now"
- **Checkout** (`/checkout/`):
  - Header kept; title card "Checkout" with breadcrumb.
  - **Billing card:** Bangla labels, 3 fields with green borders: নাম* (name), মোবাইল নাম্বার* (mobile), ঠিকানা* (address).
  - **Shipping card:** radios **Inside Dhaka City 60৳ / Outside Dhaka City 120৳**.
  - **Right column "Your order":** thumbnail, subtotal, shipping, total; coupon input with green Apply.
  - **Payment:** Cash on Delivery only (Bangla note).
  - Big green **Place Order** (wobble).
  - No order bump.

**G. Mobile (390)**
- **Header:** white; hamburger left, logo centre, cart and badge right.
- **Sections:** stack inside white cards. Categories carousel shows 3. Products in 2 columns.
- **Bottom nav** (white, rounded top): Menu, Shop, **raised round green Home button** in the centre, Search, Profile.
- **Floating:** green square cart on the right edge (middle of the screen) and a Chaty "Contact us" bubble.

**H. Special features**
- Chaty multi-channel contact.
- Meta and TikTok pixels.
- orderflow (incomplete orders).
- Bangla checkout.
- Wobble animation on CTAs.
- No popups or countdowns seen.

**I. Strengths and weaknesses**
- **Strengths:**
  - very clear BD "bazaar" hierarchy
  - big, visible Buy Now
  - 3-field checkout
  - bottom nav with a raised Home button
  - white section cards on an off-white page look tidy
- **Weaknesses:**
  - The footer brand on the homepage is a different demo store, and the checkout footer shows a third brand with a **broken logo**.
  - The "Premium Dates" row shows kitchen products.
  - The Combo Deals carousel is empty.
  - The product description is empty.
  - The WhatsApp button is red and spelled "Whatsappp".

**J. Style name:** "Fresh green bazaar: white header, solid green nav, white rounded section cards on off-white." **Suits:** household, kitchen, gadgets, grocery, general stores.

---

## 2. qtbazar.bizgrowbd.com (template T2 "Herbal gradient bars")

Screenshots: `02-qtbazar-*.png`

**A. Status and platform**
- **Status:** live.
- **Stack:** WP 7.1.5, WooCommerce, **Astra** theme, Elementor and Elementor Pro, Header-Footer-Elementor.
- **Plugins:** easy-login-woocommerce (login popup), add-to-cart-buy-now, **PixelYourSite Pro** (Meta Pixel active).

**B. Design tokens**

| Token | Value |
|---|---|
| Primary | green **#009935** |
| Page | white #FFFFFF; text #334155 |
| Price | red **#FF0000** (Hind Siliguri 18/700); old price #2C2C2C struck |
| Section titles | Roboto 26/600 white on a **green → transparent gradient bar** |
| Card title | **Anek Bangla 18/600** black, centred |
| Radius | cards 10 (0.8 px green border), images 10, buttons 0–4 (rectangular) |
| Shadow | none |
| Spacing | airy, white |
| Nav | green text links (Poppins-like); active link black |

**C. Desktop layout**
1. **Header** (81 px, white, bottom border):
   - small square logo on the left
   - centred text menu (Home, Shop, Categories, Contact)
   - search with grey fill and green square button
   - green **"Track Order" pill**
   - cart icon with a red badge
2. **Hero:** single static banner, about 1200×620.
3. **Section header bars:** full-width bar with a green-to-white gradient, white title on the left, solid green button on the right ("View all Category" / "See more").
4. **Top Categories:** 6 cards per row. Each is a green-bordered rounded card with a **circular photo**, and a full-width green label bar at the bottom.
5. **Product grids:** "Skin care" and "Body Care" are 4-column grids (cards about 290×458). "All Products" is a 4-column grid plus a small green **Load More** button.
6. **Footer** (solid green):
   - logo, Bangla about text, "Follow Us" with round white social icons
   - Quick Links
   - Customer Support
   - Get In Touch, plus "Secure Gateway" payment logos (bKash, Nagad, Rocket, COD)
   - copyright row
7. No testimonials and no banners.

**D. Product card**
- White, green border, radius 10, 11 px padding.
- Square image.
- Centred bold title.
- Centred price: struck grey, then red bold.
- Button row: green **"🛍 Buy Now"** plus a small green square cart-icon button.
- On the category page the button is a full-width dark-green "কার্টে যোগ করুন" (add to cart).

**E. Product page**
- Left: bordered gallery card with zoom and a row of 4 thumbnails.
- Right, in order:
  1. breadcrumb (red links)
  2. H1 about 28 px
  3. old/new price (green, underlined)
  4. a short **multicolour Bangla description** between dotted lines
  5. buttons: pill qty stepper, **black pill "Add to Cart"**, **green pill "🛍 Buy Now"**
  6. second row: **green "হোয়াটসএপ-এ অর্ডার"** (order on WhatsApp) and **red "📞 ফোনে অর্ডার"** (order by phone)
  7. **mint trust box** with a truck icon: "অগ্রিম টাকা ছাড়াই অর্ডার করুন" (order with no advance payment, COD)
- Tabs (underline style): Description | Reviews. The description is only images. No related products.

**F. Cart and checkout**
- **Cart:** no drawer. Adding to cart shows a "View cart" link that squeezes the button. `/cart/` is the classic Woo table with default **blue** buttons (off-brand).
- **Checkout:** one card with a green border.
  - Left, headed "অর্ডার করতে নিচের তথ্যগুলো দিন" (enter these details to order): name, address (village/district/thana), phone. 3 fields, green outline.
  - Shipping: "Free shipping".
  - Right: Your order, the note "ডেলিভারি চার্জ ফ্রি" (free delivery), and a full-width green **"🔒 অর্ডার কনফার্ম করুন ৳ 890.00"** (confirm order, with the total inside the button).

**G. Mobile**
- Header: green hamburger, centred logo, cart.
- Full-width search below the header.
- Gradient section bars. Categories 3 per row. Products in 2 columns.
- **Bottom nav** with Bangla labels: কল (call), ক্যাটাগরি (category), raised green circle **হোম** (home), অর্ডার ট্রাক (order track), একাউন্ট (account).

**H. Special features:** Meta Pixel (PixelYourSite Pro), login popup, call button in the bottom nav, Bangla CTAs, total shown inside the order button.

**I. Strengths and weaknesses**
- **Strengths:** strong herbal identity, circular category cards, a COD trust box, a Bangla-first checkout, a call button in the nav.
- **Weaknesses:** the cart page is unstyled (blue Woo buttons), the "View cart" link breaks the button layout, and the description has no text.

**J. Style name:** "Herbal green: white page, gradient green section bars, green-bordered cards, red prices." **Suits:** herbal, cosmetics, health, Ayurvedic.

---

## 3. primetuch.com (template T3 "Gadget mart", orange)

Screenshots: `03-primetuch-*.png`

**A. Status and platform**
- **Status:** live.
- **Stack:** WP 7.1.5, WooCommerce, Hello Elementor with **Guptochildtheme**, Pro Elements, FunnelKit side cart.
- **Tracking:** no pixel detected.

**B. Design tokens**

| Token | Value |
|---|---|
| Primary | orange **#EF5B1C** (nav bar, outline buttons, old price) |
| Price | **#F48721** (Trebuchet 14–16/700) |
| Announcement bar | black #000 |
| Footer | near-black ~#111 with an orange copyright strip |
| Page | light grey **#F3F4F6** |
| Fonts | headings **"Trebuchet MS"** (H2 30/600 #000); card title Trebuchet 16/600; price Roboto/Trebuchet |
| Radius | cards 5 (0.8 px #DDD border), buttons 3 |
| Spacing | compact and dense |
| Buttons | outline orange uppercase "ADD TO CART"; Add to Cart (orange) and Buy Now (black) on the product page |

**C. Desktop layout**
1. **Announcement bar** (black, 68 px): centred white bold offer text ("50% OFF For …") and 3 dark rounded countdown boxes (HOUR / MIN / SEC). The timer is **evergreen** and resets.
2. **Header** (white, 79 px): logo left; wide rounded search (orange 1 px border, icon on the left); Track Order (orange car icon), Sign in, cart with a red badge.
3. **Orange nav bar** (58 px):
   - left: "BROWSE CATEGORY ▾" dropdown
   - centre: Home / All Product / New Arrival / Shop / Deal & Offer
   - right: white pill **"Whatsapp"** button
4. **Hero** (367 px), three panels: image carousel (about 45%) and two static promo banners.
5. **Featured Categories:** centred H2 and subtitle; **9 small category cards in one row** (white, radius 8, image and label).
6. **Flash Sale bar:** white card with an orange gift icon and "Flash Sale" on the left, and **orange countdown boxes** (Hours/Minutes/Seconds) on the right. Below it, a product carousel with 6 per row.
7. Full-width promo banner (about 440 px).
8. "Top Selling Product" bar with a black "View All →" pill, then a carousel with 6 per row.
9. Large grid: 6 columns × 3 rows.
10. **Testimonials carousel** (3 per row): white cards, orange stars, quote, a coloured initial avatar with name and city, dots.
11. **Footer** (dark): logo and about | Our Information | Quick Links | Follow Us (address, phone, email, round socials), then an orange copyright strip.

**D. Product card** (about 225×338)
- White, #DDD border, radius 5.
- Square image.
- Title on 2 lines, 16/600.
- Price: orange struck old price, then orange bold underlined new price.
- Full-width **outline orange "🛒 ADD TO CART"**.

**E. Product page**
- Breadcrumb.
- White card:
  - **Left:** main image, a thumbnail grid below, zoom.
  - **Right:** H1 about 24 px bold; red struck old price and red underlined new price; a bullet feature list; qty stepper; **orange "Add to Cart"** and **black "Buy Now"** side by side.
  - **Second row:** blue **"📞 CALL US 01…"** and green **"Whatsapp"**.
  - Categories meta.
- After adding: a green notice "Action completed successfully".
- Tabs as black boxed tabs (DESCRIPTION active | REVIEWS).
- A hidden sticky add-to-cart bar exists in the page code.

**F. Cart and checkout**
- **Side cart** (FunnelKit): "Review Your Cart (1)", struck price, and a dark-red **"🛒 Checkout 2,800.00৳"** button with the total inside.
- **`/cart/`** page: shipping radios and an orange Proceed button.
- **Checkout bug:** `/checkout/` first shows a **whole unrelated landing page for another brand** (orange: hero, "why us" cards, testimonials, an order-form card with a gradient header). Only below that is the real Woo checkout:
  - Billing: First name, Street address, Phone
  - Shipping: **OUTSIDE DHAKA 130৳ / INSIDE DHAKA 80৳**
  - Cash on delivery
  - red **"🔒 PLACE ORDER 2,930.00৳"**
- The landing page is still a useful pattern for us (see §19, P-L).

**G. Mobile**
- Black countdown bar on top.
- Header: hamburger, logo, search icon, cart.
- Hero carousel. Categories 3 per row. Flash-sale carousel 2 per row.
- No bottom nav and no floating buttons.

**H. Special features:** evergreen countdown bar, flash-sale countdown, WhatsApp pill in the nav, testimonials, a landing-page order form (misplaced).

**I. Strengths and weaknesses**
- **Strengths:** urgency (countdowns), a dense marketplace feel, a clean compact card.
- **Weaknesses:**
  - the wrong brand's landing page appears on checkout
  - the timer resets or shows 00:00:00
  - the nav label "Arrival" is misspelled
  - the catalogue mixes gadgets and handbags
  - the cart badge goes stale

**J. Style name:** "Bold orange & black gadget mart: countdown top bar, orange nav, compact outline cards." **Suits:** gadgets, electronics, accessories, bags.

---

## 4. organicfood.bizgrowbd.com (template T1, same theme as #01)

Screenshots: `04-organicfood-*.png`

**A. Status and platform:** live. WP 7.1.4, same stack and plugins as #01 (Guptochildtheme, Pro Elements, Chaty, FunnelKit cart, kb-discount-badge, TikTok pixel plugin, Buy-Now V3). Meta Pixel not active.

**B. Design tokens:** identical to #01 (green #097F00, page #F2F3EE, Open Sans 24/600 H2, card titles 20/600 #222831).

**C. Desktop layout:** as #01, with these differences:
- The nav has **dropdown carets** (Mango▾, Honey▾, Dates▾ …).
- The hero is 515 px.
- Popular Categories uses illustrated food icons.
- **Combo Deals is filled in:** a light-green section background and a carousel of 5 cards, each with a black "Save-14%" pill, a green "Combo Offer" tag and a green "View Details" button.
- Then Premium Dates and Cooking Essentials carousels, a banner, the Just For You grid (5 columns), trust boxes and the footer.

**D. Product card:** as #01.

**E. Product page:** as #01, plus a **vertical thumbnail strip** to the left of the main image (4 thumbnails).

**F. Cart and checkout:** same FunnelKit drawer and the same 3-field Bangla checkout. Inside Dhaka City 60৳ / Outside 120৳. COD only.

**G. Mobile:** same as #01 (bottom nav with a raised Home button, floating cart, Chaty).

**H. Special features:** as #01. "Combo Offer" tagging.

**I. Strengths and weaknesses**
- **Strength:** the best use of template T1 (food illustrations, combo row).
- **Weaknesses:** same template bugs as #01 (red "Whatsappp" button).

**J. Style name:** "Fresh green bazaar" (T1). **Suits:** organic food, mango, honey, dates, grocery.

---

## 5. easyshop.bizgrowbd.com (template T3 "Gadget mart", blue)

Screenshots: `05-easyshop-*.png`

**A. Status and platform:** live. WP 7.1.5, Hello Elementor with Guptochildtheme, Pro Elements. No pixel.

**B. Design tokens**

| Token | Value |
|---|---|
| Primary | royal blue **#0045DB** (nav, footer, buttons, price) |
| Page | #F8FAFC |
| Card | border #C4C7CC, radius 10, soft shadow |
| Titles | Trebuchet-style bold black |
| Category names | Roboto 16/600 |
| Category title band | near-black #0B0D12 |
| Buttons | solid blue "Order Now" (radius 4) plus an outline-blue square cart button; black Add to Cart on the product page |

**C. Desktop layout**
1. **Header** (73 px): logo; search with a 2 px blue border and a solid blue icon button (no labels); user and basket icons.
2. **Blue nav** (46 px): hamburger and "BROWSE CATEGORYS ▾" on the left; centred links; Track Order and Contact Us on the right.
3. **Hero** (430 px): slider (about 80%) and 2 stacked square promo banners.
4. **"Featured Category"** white title bar, then a carousel of 6 image cards (photo and label) with blue round arrows and dots.
5. **Section bars** (white card, title on the left, blue pill "View All →" on the right):
   - Featured Products: 6-column grid
   - Flash Sale: carousel 6 per row
   - All Product: 6 columns × 2
6. **Footer** (blue, 4 columns) with "Website Developed By" on the bottom row.

**D. Product card:** white, grey border, radius 10, square image (203 px), title on 2 lines, small struck old price, blue bold underlined new price, **blue "Order Now" plus an outline square cart icon**.

**E. Product page**
- Left: image card with zoom.
- Right, in order:
  1. red "100 in stock"
  2. H1 Roboto about 26/700
  3. blue price range (variable product)
  4. bullet list
  5. SKU / Category / Tag meta (red links)
  6. **SIZE swatch panel** (grey panel with pill buttons; the selected one is solid blue)
  7. qty stepper with a black full-width **"Add to Cart"**
  8. full-width blue **"Buy Now"** below
- Tabs (blue boxed): DESCRIPTION | ADDITIONAL INFORMATION | REVIEWS.
- Related products carousel (6).

**F. Cart and checkout**
- **Cart:** no drawer. `/cart/` uses the **Woo Cart block** (skeleton loading, coupon accordion, dark "Proceed to Checkout"); the empty state is a sad face with a "New in store" grid.
- **Checkout:** **distraction-free** (no header or footer) with a **progress stepper** Cart ○ — Information ◉ — Finish ○.
  - White card in 2 columns.
  - Billing: First name, Street address, Phone.
  - Shipping radios: **OUTSIDE DHAKA 130৳ / INSIDE DHAKA 80৳**.
  - Your order, Cash on delivery.
  - Salmon-red **"🔒 PLACE ORDER ৳ total"** (uppercase, letter-spaced).

**G. Mobile:** header (blue hamburger, logo, basket); hero; category carousel showing 3; 2-column cards. No bottom nav and no floating buttons.

**H. Special features:** size swatches (button style), stock count, distraction-free stepper checkout.

**I. Strengths and weaknesses**
- **Strengths:** a clean marketplace grid and a good swatch UI.
- **Weaknesses:**
  - product names don't match the images
  - the footer text names another store
  - typos "CATEGORYS" and "Arraival"
  - an empty bordered box under Buy Now

**J. Style name:** "Electric blue marketplace: white header, royal-blue nav and footer, bordered Order Now cards." **Suits:** general multi-category, electronics, fashion.

---

## 6. rpshopbd.com: blocked

Chrome shows **"Privacy error"** (invalid or expired SSL certificate) on both `rpshopbd.com` and `www.rpshopbd.com`. I did not click through the warning. No design data. *(Recheck later: if it is a BizGrow demo it probably uses one of the templates below.)*

---

## 7. bookshop.bizgrowbd.com (template T3b "Library green & gold")

Screenshots: `07-bookshop-*.png`

**A. Status and platform:** live. WP 7.1.4, Hello Elementor with Guptochildtheme, Pro Elements, **biz-product-header-search-v2** (BizGrow live search), category-showcase. No pixel.

**B. Design tokens**

| Token | Value |
|---|---|
| Primary | **deep forest green #173F35** (top bar, buttons, flash bar, footer) |
| Footer strip | #0A0D15 |
| Accent | **gold/mustard ~#D4A03A** (countdown boxes, icons) |
| Page | #F3F4F6 |
| H2 | **Anek Bangla 26/600** #111 |
| Card title | Anek Bangla 16/600 |
| Price | Trebuchet 16/700 #173F35, underlined |
| Button | Trebuchet 14/600 white on #173F35, radius 3, uppercase |

**C. Desktop layout**
1. **Top trust bar** (41 px, dark green): 3 trust items on the left with gold icons (fast nationwide delivery · secure payment · 100% original books); links on the right (Order Track | Help Center | FAQs).
2. **Header** (68 px, white): book-icon logo on the left; centred search (grey border, dark-green square button); Sign in and Cart on the right.
3. **Menu row** (64 px, white): Bangla category links aligned left; the active one is amber.
4. **Hero** (433 px): slider (about 70%) and one tall promo banner (dark green and cream with two buttons, filled and cream-outline).
5. **Popular Categories:** white card with a carousel of 8 tiles.
6. **Flash Sale bar** (dark green): gift icon, title, **3 gold countdown boxes**; then a grid of 4.
7. "Best Selling Book" dark-green bar with a white pill "View All →", then a carousel of 6.
8. "All Product" grid: 6 columns × 3, plus a **Load More**.
9. **Footer** (dark green, 4 columns) with a black copyright strip.

**D. Product card** (208×345): white, #DDD border, radius 5, square cover image, title on 2–3 lines, struck and new price, full-width dark-green uppercase **"🛒 ADD TO CART"**.

**E. Product page**
- Left: gallery (main image and 4 thumbnails).
- Right, in order:
  1. H1 Anek Bangla about 26/700
  2. struck and new price
  3. bold Bangla description lines
  4. qty stepper, **black "Add to Cart"**, **dark-green "Buy Now"**
  5. second row: **red "📞 Call US"** and **green "Whatsapp"** (misaligned)
  6. **SKU / Stock table** ("In stock" in green)
- Tabs (black boxed): DESCRIPTION | REVIEWS.

**F. Cart and checkout:** no drawer (notice plus a "View cart" link); classic Woo cart page. **Checkout is the distraction-free stepper** (as #05): First name / Street address / Phone, OUTSIDE 130৳ / INSIDE 80৳, COD, salmon PLACE ORDER showing the total.

**G. Mobile**
- Header: hamburger, logo, search and basket.
- Gold countdown on the flash bar.
- **Bottom nav** (5 items, white): Track Order, Categories, Home, Cart, **WhatsApp**.

**H. Special features:** trust top bar, flash-sale countdown, BizGrow live search, WhatsApp in the bottom nav.

**I. Strengths and weaknesses**
- **Strengths:** a premium, scholarly colour scheme, and Bangla typography that suits long titles.
- **Weaknesses:**
  - the footer about text belongs to site #08
  - English checkout labels on a Bangla site
  - the Call/WhatsApp row is misaligned

**J. Style name:** "Library green & gold: dark forest-green bars, gold accents, Bangla-first." **Suits:** books, publishers, Islamic products, stationery.

---

## 8. anuvutiprokashoni.com (T3b, the live publisher site on the same theme as #07)

Screenshots: `08-anuvutiprokashoni-*.png`

**A. Status and platform**
- **Status:** live.
- **Stack:** WP 7.1.5, Guptochildtheme, Pro Elements.
- **Plugins:** Buy-Now V3, biz-product-header-search-v2, **gtm-server-side**, category-showcase.
- **Tracking:** **Meta Pixel active.**

**B. Design tokens:** identical to #07.

**C. Desktop layout:** as #07, except:
- **One full-width hero slider, 600 px** (no side banner), with dark green and gold art and an "UP TO 60% DISCOUNT" seal.
- The menu adds comics and single books.
- Flash Sale is followed by a 6-column grid with Load More.
- Best Selling carousel, then the All Product grid.

**D. Product card:** as #07; the button label is "Add to Cart" (title case).

**E. Product page:** as #07.
- Long Bangla titles.
- The description uses an **H3 "why buy this combo?" followed by a bullet benefits list**. This is a good conversion copy pattern.
- A hidden sticky Add/Buy bar is in the page code.

**F. Cart and checkout:** distraction-free stepper. Shipping labels are in Bangla: **ঢাকার ভিতরে (inside Dhaka) 70৳ / ঢাকার বাহিরে (outside Dhaka) 110৳**. COD. Red PLACE ORDER with the total.

**G. Mobile:** bottom nav: Track Order, **Bulk Order**, Home, Cart, WhatsApp.

**H. Special features:** server-side GTM and Meta Pixel; "Bulk Order" in the mobile nav.

**I. Strengths and weaknesses:** the strongest real-world use of T3b. Weaknesses are the same as #07.

**J. Style name:** "Library green & gold" (T3b). **Suits:** publishers, book shops.

---

## 9. chinazone.shop: under maintenance

Every URL, including `/shop/`, shows a **custom maintenance page**. There is no store, product, cart or checkout to review.

The maintenance page itself is worth noting as a pattern (`09-chinazone-desktop.png`, `-mobile.png`):
- near-black background **#0B0B0B** with subtle stripes
- gold gradient logo
- gold pill badge with a dot reading "website update in progress"
- large **gold** headline in Anek Bangla
- a dark card with a gold 1 px border reading "seen a product in a video or photo? order on WhatsApp", with a big **WhatsApp-green (#25D366) CTA** and the phone number
- 4 social tiles (Facebook, Instagram, Telegram, YouTube)
- an "in-store special offer" card with a gold tag and a quote call-out
- a store address card with a gold "Google Map" button and an outline phone button

**Style:** "Black & gold luxury holding page." **Suits:** jewellery and wholesale. *Idea for us: a "store closed / coming soon" template that still captures WhatsApp orders.*

---

## 10. saree.bizgrowbd.com (template T4 "Royal maroon boutique")

Screenshots: `10-saree-*.png`

**A. Status and platform**
- **Status:** live.
- **Stack:** WP 7.1.5, Hello Elementor with child **tebionbdchildtheme**, Elementor Pro, ElementsKit Lite.
- **Plugins:** FunnelKit cart, checkout-field-editor, **incomplete-order-saver** (abandoned-order capture).
- **Tracking:** no pixel.

**B. Design tokens**

| Token | Value |
|---|---|
| Primary | **maroon #5C0308** (nav, buttons, footer, old price) |
| Section bars | **crimson-to-maroon gradient** (~#E0103E → #5C0308), white Bangla title, white box "See more" |
| Page | white |
| H2 | **Plus Jakarta Sans 25/800**, underlined, with thin grey lines either side |
| Card title | **Archivo Narrow 16/400** #050505, centred |
| Price | new Roboto 16/700 black; old price maroon, struck |
| Buttons | **ADLaM Display 15/500** white on maroon, radius 10 |
| Track Order | outline maroon rectangle |

**C. Desktop layout**
1. **Header** (about 53 px; no top bar): script logo on the left; wide grey search with a maroon square button; **outline "Track Order"** button; large cart icon with a badge.
2. **Maroon nav** (46 px): centred uppercase links (HOME in red when active, SHOP, NEW ARRIVALS, BEST SELLERS, POPULAR ITEMS).
3. **Hero** (515 px): boxed slider (1140 wide).
4. **"Top Categories"** (centred, lined), then **4 large circular images** (about 190 px, soft shadow) with labels.
5. **Repeating blocks:** a gradient title bar (saree / blouse / kurti) with See more, then a 4-column grid or a carousel with arrows and dots.
6. **Footer** (maroon, 3 columns): white logo, about and coloured round socials | Quick Links (large white text) | Contact (address, email, phone with hours); centred copyright.

**D. Product card** (275×555)
- White, #E9E9E9 border, radius 10.
- **Tall portrait image** 272×393 (about 2:3).
- Centred 2-line title.
- Centred price.
- Full-width maroon **"Buy Now"**, radius 10.

**E. Product page**
- No breadcrumb.
- Left: large image with zoom.
- Right, in order:
  1. "Category Saree" (orange link)
  2. H1 about 36 px bold
  3. grey struck old price and a **large maroon underlined price**
  4. qty stepper, **black "Add to Cart"**, **maroon "Buy Now"**
  5. full-width soft-green **"Order on WhatsApp."**
- Tabs in a maroon-bordered box (filled maroon tabs).
- Bangla description.

**F. Cart and checkout**
- **Cart:** FunnelKit drawer "Review Your Cart (1)", "Save 15%" in red, crimson Checkout. **`/cart/` renders empty** (bug).
- **Checkout:** no header. Card with an **orange 3 px border** (off-brand).
  - First name*, Street address*, **Phone (optional!)**.
  - Order notes (the field falls outside the card).
  - INSIDE DHAKA ৳70 / OUTSIDE DHAKA ৳130.
  - COD; **orange "🔒 Place Order ৳ total"**.

**G. Mobile**
- **Maroon header** (white hamburger, white centred logo, cart).
- Search bar below.
- Circular categories 3 per row; 2-column portrait cards.
- **Bottom nav:** Home, Shop, **raised maroon CALL button**, Track, Account.

**H. Special features:** incomplete-order saver, call button in the bottom nav, gradient section bars.

**I. Strengths and weaknesses**
- **Strengths:** an elegant ethnic colour scheme, portrait cards suited to clothing, circular categories.
- **Weaknesses:**
  - the footer about text comes from another (abaya) shop
  - phone is optional at checkout (bad for COD)
  - the orange checkout is off-brand
  - the cart page is empty
  - the notes field layout breaks

**J. Style name:** "Royal maroon boutique: maroon nav, crimson gradient section bars, circular categories, tall portrait cards." **Suits:** saree, kurti, three-piece, jewellery, ethnic wear.

---

## 11. organic2.bizgrowbd.com (template T5 "Organic editorial serif")

Screenshots: `11-organic2-*.png`

**A. Status and platform:** live. WP 7.1.5, Guptochildtheme, Pro Elements, checkout-field-editor. Uses the classic Woo product grid (`li.product`). No pixel.

**B. Design tokens**

| Token | Value |
|---|---|
| Primary | green **#159A4C** (prices, buttons, Call Now pill, search outline) |
| Mint band | **#E0F5EA** |
| Page | white |
| Headings | **Georgia serif** (H2 24/600 #2D2E2E; "Featured Products" centred green serif about 32) |
| Card title | **Inter 18/600** #222 |
| Price | Inter 21/700 green; the product page uses a **red** price |
| Nav | Roboto 16, grey #555 |
| Radius | **cards 16** (1 px #E1E1E1 and a soft shadow), banners 16, buttons 7, search and CTAs as pills |

**C. Desktop layout**
1. **Header** (112 px, white):
   - logo left
   - text menu (Home active in green, Shop, About, Contact Us)
   - **pill search** (green outline, icon on the left)
   - **green pill "📞 Call Now"**
   - **outlined circular cart** with a badge
2. **Second row** (52 px): centred category text links between thin borders.
3. **Hero** (425 px): rounded slider (about 66%) and 2 stacked rounded banners.
4. **"Shop by Category"** (serif, aligned left), then 7 small square cards in a row (radius 12, uppercase micro labels).
5. **"Featured Products"** (centred green serif), then a **4-column grid × 4 rows** (16 items).
6. **Why-us band** (mint, full width):
   - small green caps eyebrow ("ORGANIC • PURE • HEALTHY")
   - large serif headline and a paragraph
   - **3 feature items on the left and 3 on the right** (green round icons) around a **central product photo**
7. **CTA row:** green "📞 Call Now" and "WhatsApp Now".
8. **Footer** (white, 5 columns: logo and tagline with small socials | Quick link | Support | Contact | Office Location) with a **grey wave** shape at the bottom.

**D. Product card** (272×455): white, radius 16, soft shadow, 240 px square image, 2-line title, green price (no old price), full-width green "অর্ডার করুন" (order now).

**E. Product page**
- Left: image in a rounded bordered box.
- Right, in order:
  1. Bangla H1 about 32/700
  2. a **green short description**
  3. red price
  4. **green qty stepper with a black number cell**, green "Add to Cart" and green "Buy Now"
  5. second row (aligned right): red "📞 কলে অর্ডার করুন" (order by call) and bright-green "হোয়াটসঅ্যাপ এ অর্ডার করুন" (order on WhatsApp)
- No tabs.
- A **diagonal hatched divider**, then the serif "Related products" (4 columns).

**F. Cart and checkout**
- **Cart:** no drawer; `/cart/` is the Woo block.
- **Checkout:** the **default WooCommerce Checkout block**, about 12 fields:
  - email, country, first and last name, company, address, apartment, city, district, postcode, phone
  - "same address for billing"
  - INSIDE DHAKA 60৳ / OUTSIDE DHAKA 120৳
  - COD
  - summary card on the right with "Add coupons"
- Too long for BD COD buyers.

**G. Mobile**
- **Green circular hamburger**, centred logo, outlined circular cart.
- Full-width pill search.
- Hero, with the 2 small banners side by side.
- Categories carousel; 2-column products.
- No bottom nav.

**H. Special features:** call and WhatsApp CTAs throughout; mint why-us band.

**I. Strengths and weaknesses**
- **Strengths:** calm editorial look, rounded friendly cards, a strong why-us section.
- **Weaknesses:**
  - the checkout is far too long
  - "Contact Us" wraps at about 1150 px
  - a stray green dot on mobile
  - the shop page grid has an empty sidebar column

**J. Style name:** "Fresh organic editorial: white, serif headlines, rounded 16 px cards, mint feature band." **Suits:** organic and healthy food, honey, tea, natural products.

---

## 12. beautyglobar.shop (template T3 "Gadget mart", pink, same theme as #05)

Screenshots: `12-beautyglobar-*.png`

**A. Status and platform:** live. WP 7.1.5, Guptochildtheme, Pro Elements, **PixelYourSite** (Meta Pixel active), category-showcase.

**B. Design tokens**
- Primary **hot pink #ED005D** (nav, footer, Order Now, prices, Buy Now, search border).
- Black Add to Cart.
- **Leftover blue #0045DB** "View All" pills (not re-themed).
- Page #F8FAFC.

**C. Desktop layout:** exactly #05 in pink. The hero side banners are **cropped or half-empty** (bug). Categories carousel, Featured (4), Flash Sale carousel, All Product (4), pink footer.

**D. Product card:** as #05 (pink "Order Now" plus a cart icon).

**E. Product page:** as #05. The full-width pink Buy Now is followed by a bordered box containing a soft-green Whatsapp button.

**F. Cart and checkout:** Woo cart block; distraction-free stepper checkout (OUTSIDE 130৳ / INSIDE 80৳, COD).

**G. Mobile:** as #05 in pink. No bottom nav.

**H. Special features:** Meta Pixel.

**I. Strengths and weaknesses:** a strong beauty colour, but the **categories are from the electronics demo** (Electronics, Fitness, Grocery), blue buttons are left over and the side banners are broken.

**J. Style name:** "Hot-pink beauty mart" (T3). **Suits:** cosmetics, skincare, lingerie.

---

## 13. biz7.bizgrowbd.com (template T6 "Cream editorial menswear")

Screenshots: `13-biz7-*.png`

**A. Status and platform:** live. WP 7.1.5, Hello Elementor with child **Bizgrowchildtheme**, Pro Elements. No pixel.

**B. Design tokens**

| Token | Value |
|---|---|
| Header and page | cream **#FAF7F2** |
| Ink | **#000 / #1A1A1A** |
| Footer | pure black |
| Card | border #E9E8E5, radius 10 |
| Fonts | **Open Sans** throughout (H2 34/700; nav 15/400 uppercase; card title 14/600; price 16/500) |
| Hero type | **ultra-thin condensed sans, very large, letter-spaced** |
| Category tiles | condensed bold plus script overlay on dark photos |
| Buttons | **black radius 5** with a bag icon |

**C. Desktop layout**
1. **Header** (90 px, cream):
   - **menu on the left** (uppercase inline: HOME, NEW ARRIVALS, SOLID SHIRT, STRIPES, PANTS, PANJABI, SALE)
   - **centred wordmark logo**
   - pill outline search ("search here"), user icon and bag icon on the right
2. **Hero:** full-bleed photo slider about **835 px tall** with a huge thin headline.
3. **"CATEGORIES"** (centred, letter-spaced), then **6 tall portrait tiles** (about 240×320, radius 8) of dark photos with typographic labels.
4. **Product blocks:** uppercase title on the left and "See more →" on the right; carousel of 5 per row or a grid; cards **fade in** on scroll.
5. Two full-width 570 px image banners (one did not render).
6. "Experience centre" store banner with the address.
7. **"CUSTOMER FEEDBACK"**: carousel of 5 dark image cards (screenshot-style testimonials).
8. **Footer** (black, 4 columns): wordmark, tagline and coloured socials | INFORMATION | POLICY | CONTACT INFO; centred copyright.

**D. Product card** (288×555)
- Cream background, thin border, radius 10.
- **Portrait image 260×390** (2:3).
- Centred 1-line title and centred price.
- **Small centred black "🛍 Add to Cart" pill** (not full width).

**E. Product page**
- Cream card.
- Left: large portrait image.
- Right, in order:
  1. breadcrumb
  2. H1 about 28/600
  3. struck and new price
  4. **SIZE swatches** (outlined squares; the selected one is filled black)
  5. qty stepper with **black square − / +**
  6. **black "🛒 Add to Cart"**
  7. **outline "⚡ Buy Now"** (full width)
  8. **green "Order via WhatsApp"** (full width)
- Tabs as black pills: Description | Additional Information | Customer Reviews.
- After adding: a **black toast "Added to Cart"** at the top centre.

**F. Cart and checkout:** Woo cart block. Distraction-free stepper checkout (purple active dot): Full Name*, House number and street*, Phone*; coupon with a black Apply. **Bug: no shipping options and "no available payment methods"**, so an order cannot be placed.

**G. Mobile:** cream header (hamburger, centred logo, bag); cropped hero; categories in a 3×2 grid; no bottom nav and no floating buttons.

**H. Special features:** editorial typography, store "experience centre" banner, toast notification.

**I. Strengths and weaknesses**
- **Strengths:** the most fashion-magazine look; large imagery; restrained colour.
- **Weaknesses:** the **checkout is broken**, one banner is blank, the testimonials are identical images, and the fade-in leaves cards ghosted.

**J. Style name:** "Cream & black editorial menswear: centred logo, thin display type, portrait cards, black buttons." **Suits:** premium clothing brands, menswear, perfume, lifestyle.

---

## 14. zarvikbd.com (template T7 "Warm luxury atelier"), the most polished site

Screenshots: `14-zarvikbd-*.png`

**A. Status and platform**
- **Status:** live (a real brand).
- **Stack:** WP 7.1.5, Hello Elementor with **tebionbdchildtheme**, Elementor Pro.
- **Plugins:** **ecommerce-toolkit** (floating mini-cart, side cart, countdown, upsell), skyboot icons, plus custom **bottom-nav** and **search-overlay** widgets.
- **Tracking:** no pixel detected.

**B. Design tokens**

| Token | Value |
|---|---|
| Header | cream **#FEF6EB** |
| Page | **#FAFAF8** |
| Ink | **#0C0C0C** |
| Accent | **mocha #786044** (Order Now, Add to Cart, Subscribe) |
| Product titles | deep brown **#5A2A16** |
| Price | muted **#8D7D74** |
| Borders | **#E7DED5** |
| Newsletter band | **#0C0C0C** |
| Headings | **Cormorant Garamond** (section H2 32/600 uppercase; hero 60/600; product H1 about 40) |
| UI text | **Jost** (title 16/500, price 15/400, buttons 14/500) |
| Radius | **0 (square corners)** on cards and buttons |
| Badges | small brown squares "-23%" |
| Countdown | pink **#FF2D6F** digit boxes |

**C. Desktop layout**
1. **Header** (77 px, cream): logo on the left; centred Jost menu with ▾ dropdowns; rounded search; user and bag icons.
2. **Hero** (400 px): full-width carousel with a left gradient overlay, eyebrow, serif headline, **solid brown "SHOP NOW"** and **outline "▶ SEE BEST SELLER"**. On desktop slide 1 the text is almost invisible.
3. **6 category circles** (about 135 px, thin border) with labels.
4. **"EXPLORE OUR CATEGORIES"** (serif, with a divider and icon), then a **4×2 grid of tall image tiles** with a white caps label and "Shop Now →" at the bottom left.
5. **Product sections:** serif uppercase title on the left and an underlined "View More" on the right; **5-column grid**.
6. **"Edit" row:** 3 wide promo banners (dark gradient, title, subtitle, white "SHOP NOW" box).
7. **Trust strip** (cream box, 4 icon features).
8. **Newsletter band** (black): serif "BE THE FIRST TO KNOW", email input and a brown Subscribe.
9. **Footer** (cream, 5 columns): SHOP | CUSTOMER SERVICE (Track Order, Shipping, Returns, **Size Guide**, FAQ) | ABOUT | HELP (account, order history, phone, WhatsApp).
10. **Floating:** a right-edge **mini-cart pill** ("0 Items / 0৳") and a chat bubble.

**D. Product card** (278×482): white, square corners, 1 px beige border, edge-to-edge image 277×316, brown 1-line title, **gold star rating and count**, muted price, full-width **brown square "🛍 Order Now"**.

**E. Product page**
- Breadcrumb bar.
- Left: large image.
- Right: a bordered panel, in order:
  1. serif H1
  2. stars
  3. price
  4. **pink countdown box "⏱ Limited time offer ends 23h 59m 00s"** (an evergreen 24 h timer)
  5. spec text
  6. **Size** swatches (squares) and **Color** swatches (text boxes); the selected one is black
  7. qty stepper with **brown "Add to Cart"**
  8. **black "Buy Now"** (full width)
  9. **green "WhatsApp Order"** (full width)
  10. **4-cell trust grid:** Cash on delivery / 7-day return / 100% authentic / Fast delivery
- Tabs (underline style): Description | **Delivery & Returns** | Customer Reviews.
- "‹ YOU MAY ALSO LIKE ›" (serif, between lines), then a carousel.

**F. Cart and checkout**
- **Side drawer** "YOUR CART" with "Close →": item with its variant ("M, Black"), qty, ×; Subtotal; brown **View Cart** and black **Checkout**; the empty state is a bag icon with "Continue Shopping".
- **Checkout:**
  - an **info banner** ("Complete the information below and click Place Order, or call 01… for assistance")
  - **Your Name*, Phone Number*, Delivery Address* ("including district")**: grey filled inputs
  - Inside Dhaka 80৳ / Outside Dhaka 130৳
  - order table with a thumbnail and the variant
  - "Have a coupon?"
  - COD, brown **Place Order**
  - trust strip below

**G. Mobile**
- Cream header (hamburger, centred logo, user and bag).
- The hero shows its text correctly.
- Category circles 3 per row.
- Floating mini-cart and chat.
- **Bottom nav:** Home, Shop, Menu, Search.

**H. Special features:** countdown on the product page, trust grid, delivery and returns tab, size guide link, newsletter, floating mini-cart, call-for-help banner at checkout.

**I. Strengths and weaknesses**
- **Strengths:** a genuinely premium look, a complete product page conversion kit, a short checkout.
- **Weaknesses:** desktop hero text is invisible, typos ("PANJBAI", "Conatct"), and the countdown is fake.

**J. Style name:** "Warm luxury atelier: cream and mocha, Cormorant serif with Jost, square corners, circles and editorial tiles." **Suits:** premium fashion, panjabi, abaya, three-piece, leather, perfume, gifts.

---

## 15. guptoshop.bizgrowbd.com (template T8 "Black & gold Arabian luxury")

Screenshots: `15-guptoshop-*.png`

**A. Status and platform:** live. WP 7.1.5, **tebionbdchildtheme**, Elementor Pro. The mobile bottom nav reuses BizGrow's `kb-bottom-nav-widget`. No pixel.

**B. Design tokens**

| Token | Value |
|---|---|
| Header, footer, ribbons | **black #0D0D0D** |
| Accent | **gold/amber #E6A30C** (menu, prices, Add to Cart, icons, a thin gold rule under the header) |
| Warm cream areas | **#F7F3EC** |
| Card border | pale gold #E5D7AE, radius 5 |
| Headings | **Playfair Display** (H2 32/500) |
| Product names | **Cormorant Garamond 20/500 uppercase** |
| Body and prices | **Georgia** |
| Price | new gold 18/500 underlined; old grey #6D6565 struck |

**C. Desktop layout**
1. **Header** (black, 89 px): gold emblem and serif wordmark; centred gold serif menu (the active item is white and underlined); cream pill search with a gold icon; gold bag and user icons.
2. **Hero:** full-width 480 px image.
3. **"Shop by Collection"** (centred title and subtitle), then **4 tall portrait tiles** (about 300×390) with an **inset thin frame line**, a serif label and gold "Explore Collection".
4. **Intro box** with a **double thin gold border** (serif headline and paragraph).
5. "Our Latest Collection": 4 per row carousel.
6. **Black marquee ribbon** ("THE … TOUCH • PREMIUM BREATHABLE FABRIC • TAILORED FIT …").
7. **Collection carousels:** centred title and subtitle; gold "View more →" on the left; **square gold-outline ‹ › arrows** on the right; 4.5 cards visible.
8. All Products: 4 columns × 3.
9. A second ribbon.
10. **FAQ** section: image on the left, gold-bordered accordion on the right.
11. Trust row (4 gold line icons with serif titles).
12. **Footer** (black): address and phone with gold square icons | links | categories | email input with a gold Send button and gold-outlined square social icons; a gold rule, then copyright.

**D. Product card** (301×440): pale-gold border, radius 5, square image, serif uppercase title, struck and gold price, **outlined gold "Add To Cart"**.

**E. Product page**
- Cream page and white card.
- Gold breadcrumb.
- Right column, in order:
  1. tagline
  2. Playfair H1 about 32/400
  3. struck and gold price
  4. **cream box with 3 benefit lines**
  5. gold hairline
  6. **Size** swatches (cream squares; the selected one is filled gold)
  7. qty stepper with **gold "🛒 Add to Cart"**
  8. **black "Buy Now"**
  9. **green "Order On WhatsApp"**
- Tabs: black pill active and outlined pills.
- Rich "Key Details" description.

**F. Cart and checkout**
- **Mini-cart drawer:** white, gold × circle, "1 × 2,650৳" in gold, gold **View cart** and black **Checkout**; a toast "successfully add to cart."
- **Checkout:** header kept; cream title band; Full Name*, Phone Number*, Full Address* (cream inputs with a gold bottom border); **Free Home Delivery**; COD.

**G. Mobile:** black header (gold square-outlined hamburger, logo, gold square cart); collection tiles 2×2; **bottom nav:** Menu, Shop, **raised gold Home**, Search, Profile.

**H. Special features:** marquee ribbon, FAQ accordion, framed collection tiles, free delivery.

**I. Strengths and weaknesses**
- **Strengths:** a very distinctive luxury identity; serif type combinations; framed tiles.
- **Weaknesses:**
  - the FAQ repeats the same question 4 times, with a typo
  - "Quuick Links" and "Categorie's"
  - products named "(Copy)"
  - perfume shown under a clothing headline

**J. Style name:** "Black & gold Arabian luxury: serif type, framed portrait tiles, marquee ribbon." **Suits:** Islamic and modest wear, attar and perfume, jewellery, premium gifts.

---

## 16. fashion.bizgrowbd.com (template T7 "Atelier" in blush and espresso; twin of #14)

Screenshots: `16-fashion-*.png`

**A. Status and platform:** live. WP 7.1.5, tebionbdchildtheme, Elementor Pro, **ecommerce-toolkit**, skyboot icons. No pixel.

**B. Design tokens**
- Header, newsletter and footer: **dark espresso #1F1815**.
- Page: **blush #FDEDE5**.
- Accent: **copper ~#B87653** (Add to Cart, Subscribe, badges, floating cart, footer headings).
- Order Now buttons: espresso.
- "Save-23%": rose.
- Cormorant Garamond with Jost (as #14).

**C. Desktop layout:** the same section order as #14 (dark header with an uppercase menu and dropdowns, 400 px hero, 6 circles, category tiles, saree collection 5-column grid, 3 "edit" banners, kameez and kurti grid, best-selling beauty, trust strip, newsletter, 5-column dark footer).

**D. Product card:** white, copper "-23%" badge, stars, struck and underlined price, full-width **espresso "Order Now"**.

**E. Product page:** as #14, plus "Save-23%" and **"● In stock – ready to ship"** in green. Copper Add to Cart, espresso Buy Now, green WhatsApp, 4-cell trust grid.

**F. Cart and checkout:**
- The **side cart adds a "You May Also Like" upsell carousel** with ‹ › and "+ Add" pills (it suggested the same product, a bug); copper View Cart and espresso Checkout.
- The checkout matches #14 (info banner, 3 fields, **Free shipping**, COD).

**G. Mobile:** dark header; hero with text; circles; copper floating mini-cart; bottom nav (Home, Shop, Menu, Search).

**H. Special features:** cart upsell carousel, countdown, stock line.

**I. Strengths and weaknesses:** a lovely feminine take on T7. Weaknesses: the desktop hero text is invisible, the upsell shows the same item, and there are two different mini-cart UIs.

**J. Style name:** "Blush & espresso boutique (atelier)." **Suits:** women's fashion, saree, beauty and skincare.

---

## 17. sasenterprise.com.bd: suspended

The host's "**Account Suspended** – contact your hosting provider" page (`17-sasenterprise-desktop.png`). No design data.

---

## 18. Comparison table

| # | Site | Status | Style name | Primary colour | Fonts | Header type | Card style | Best for |
|---|---|---|---|---|---|---|---|---|
| 1 | cityshopbd.shop | Live | Fresh green bazaar (T1) | #097F00 green, page #F2F3EE | Hind Siliguri, Open Sans | White logo/search/icon-labels + solid green category bar | Square image, black discount pill, outline green button | Household, kitchen, general |
| 2 | qtbazar | Live | Herbal gradient bars (T2) | #009935 green, red prices | Roboto, Anek Bangla, Hind Siliguri | Single row: logo, centre menu, search, Track pill, cart | Green-bordered, centred, Buy Now + cart icon | Herbal, cosmetics, health |
| 3 | primetuch.com | Live | Orange gadget mart (T3) | #EF5B1C orange + black | Trebuchet MS, Roboto | Countdown bar, header, orange "Browse Category" bar | Compact, outline orange ADD TO CART | Gadgets, accessories, bags |
| 4 | organicfood | Live | Fresh green bazaar (T1) | #097F00 | Open Sans, Hind Siliguri | = #1 (with dropdowns) | = #1, plus combo tag | Organic food, mango, honey |
| 5 | easyshop | Live | Blue marketplace (T3) | #0045DB blue | Trebuchet, Roboto | Header + blue Browse Category bar | Bordered, blue Order Now + cart icon | General, electronics |
| 6 | rpshopbd.com | **Blocked (SSL)** | n/a | n/a | n/a | n/a | n/a | n/a |
| 7 | bookshop | Live | Library green & gold (T3b) | #173F35 forest green, gold | Anek Bangla, Trebuchet | Trust top bar, header, white menu row | Dark-green ADD TO CART | Books, Islamic, stationery |
| 8 | anuvutiprokashoni.com | Live | Library green & gold (T3b) | #173F35 | Anek Bangla | = #7 | = #7 | Publishers |
| 9 | chinazone.shop | **Maintenance** | (black & gold holding page) | #0B0B0B, gold | Anek Bangla | n/a | n/a | Jewellery, wholesale |
| 10 | saree | Live | Royal maroon boutique (T4) | #5C0308 maroon, crimson gradient | Plus Jakarta Sans, Archivo Narrow, ADLaM Display | Logo, search, outline Track, cart + maroon centred nav | Tall portrait, maroon Buy Now | Saree, ethnic, jewellery |
| 11 | organic2 | Live | Organic editorial serif (T5) | #159A4C green, mint #E0F5EA | Georgia, Inter, Roboto | 2 rows: logo, menu, pill search, Call Now pill + category row | Rounded 16, shadow, green order button | Organic, tea, honey |
| 12 | beautyglobar.shop | Live | Hot-pink mart (T3) | #ED005D pink | Trebuchet, Roboto | = #5 in pink | Pink Order Now + cart icon | Beauty, lingerie |
| 13 | biz7 | Live (checkout broken) | Cream editorial menswear (T6) | #FAF7F2 cream + #000 | Open Sans, thin condensed display | Menu left, logo centred, search and icons right | Portrait 2:3, small black pill | Premium apparel, lifestyle |
| 14 | zarvikbd.com | Live | Warm luxury atelier (T7) | #786044 mocha, #FEF6EB cream | Cormorant Garamond, Jost | Logo left, centred menu with dropdowns, search and icons | Square corners, stars, brown Order Now | Premium fashion, gifts |
| 15 | guptoshop | Live | Black & gold Arabian (T8) | #0D0D0D + #E6A30C gold | Playfair Display, Cormorant, Georgia | Black bar, gold serif menu, cream search | Gold border, outline gold button | Modest wear, perfume |
| 16 | fashion | Live | Blush & espresso atelier (T7) | #1F1815 espresso, #FDEDE5 blush, copper | Cormorant Garamond, Jost | Dark bar with uppercase menu and dropdowns | = #14, espresso Order Now | Women's fashion, beauty |
| 17 | sasenterprise.com.bd | **Suspended** | n/a | n/a | n/a | n/a | n/a | n/a |

---

## 19. Distinct design patterns (grouped)

### Theme families (8)

**T1 "Fresh green bazaar"** (Guptochildtheme): #01, #04
- Header: white, with logo, big search and icon-over-label links, then a solid colour category bar.
- White rounded section cards on an off-white page.
- A 2-column "Most Selling" list of horizontal cards.
- 5 cards per row carousels, each with "View All".
- 2×2 Buy Box: Cart, Buy, WhatsApp, Call.
- FunnelKit drawer.
- **Bangla 3-field checkout** with Inside/Outside Dhaka.
- Mobile bottom nav with a raised centre Home button, a floating cart and Chaty.

**T2 "Gradient section bars"** (Astra): #02
- Every section title sits in a full-width colour-to-transparent gradient bar with the button on the right.
- Circular images inside bordered category cards with a colour label bar.
- Centred cards with a primary button plus an icon-button.
- Single-card Bangla checkout with the total inside the CTA.
- *The same "gradient title bar" idea reappears in T4.*

**T3 "Gadget mart"** (Guptochildtheme): #03 orange, #05 blue, #12 pink
- Header plus a colour bar holding "BROWSE CATEGORY ▾", centred links and right-hand utility links.
- Hero is a slider plus 2 side banners.
- Category card carousel.
- Section header bars (title on the left, pill "View All" on the right).
- 6-column dense cards with "Order Now" and a cart icon.
- Flash Sale with countdown boxes.
- Testimonial cards.
- **Distraction-free stepper checkout.**
- **T3b variant "Library"** (#07, #08): adds a **trust top bar** and a white menu row, forest green and gold, gold countdown boxes, and a WhatsApp/Bulk Order bottom nav.

**T4 "Royal boutique"** (tebion): #10
- Centred uppercase nav on a colour bar.
- Circular category photos.
- Crimson gradient section bars.
- **Tall portrait cards** with a full-width Buy Now.
- Raised CALL button in the mobile nav.

**T5 "Organic editorial"** (Guptochildtheme): #11
- Serif (Georgia) headings with Inter UI.
- 16 px rounded shadowed cards and pill CTAs (Call Now in the header).
- Mint **"why us" band** with features around a central product.
- White footer with a wave.

**T6 "Cream editorial"** (Bizgrowchildtheme): #13
- Menu left, logo centred.
- Full-bleed, very tall hero with ultra-thin display type.
- Portrait typographic category tiles.
- Small centred black pill buttons.
- Experience-centre banner and image testimonials.

**T7 "Warm luxury atelier"** (tebion with ecommerce-toolkit): #14, #16
- Cormorant and Jost; square corners.
- Category circles plus editorial image tiles.
- 3 "edit" banners and a newsletter band.
- Product page with a **countdown, colour/size text swatches, trust grid and a Delivery & Returns tab**.
- Floating mini-cart; drawer with an upsell carousel.
- Checkout with an info banner and 3 fields.

**T8 "Black & gold"** (tebion): #15
- Black and gold with Playfair, Cormorant and Georgia.
- Framed portrait collection tiles.
- Double-border intro box.
- **Marquee ribbon.**
- FAQ accordion with an image.
- Raised gold Home in the mobile nav.

### Shared component patterns

- **Buy box CTA stacks** (used everywhere): (a) a 2×2 grid of Cart, Buy, WhatsApp and Call (T1, T2, T3b); (b) a vertical stack of Add to Cart (wide, beside qty), then full-width Buy Now, then full-width WhatsApp (T6, T7, T8, T3).
- **Checkout variants:**
  1. Bangla 3-field card with shipping radios (T1, T2)
  2. **Distraction-free stepper** Cart → Information → Finish, with 3 fields and the total in a red button (T3, T3b, T6)
  3. Info banner, 3 fields and a trust strip (T7, T8)
  4. Default long Woo Checkout block (T5, avoid)
- **Delivery charges seen:**
  - Inside Dhaka 60 / 70 / 80 ৳
  - Outside Dhaka 110 / 120 / 130 ৳
  - "Free Home Delivery" (#02, #15, #16)
- **Payments:** **Cash on Delivery only on every working checkout** (no bKash or card gateway was active; #13 showed no payment method at all).
- **Mobile bottom nav** (shared BizGrow widget): 4–5 items with a raised centre button. Different sites put Home, Call or Cart in the centre, and some add WhatsApp or Bulk Order.
- **Urgency:** evergreen countdowns (top bar, flash-sale bar, product page).
- **Abandoned orders:** `orderflow` (#01, #04) and `incomplete-order-saver` (#10).
- **Landing-page order template (P-L):** found by accident on the #03 checkout. It is a one-product page:
  - sticky header with an "order" pill
  - hero headline with a highlighted word and 2 CTAs
  - product card with a "HOT DEAL" badge
  - 3 "why us" cards with corner ribbons
  - testimonial cards
  - an **order-form card with a gradient header** (name, mobile, full address)
  - This is the classic BD Facebook-ads landing page and is worth building as its own template.
- **Holding page (P-H):** #09, a dark maintenance page with a WhatsApp order CTA, social tiles and a store address.

### Recurring quality problems (avoid in our themes)

- Demo content copied between sites (wrong brand in footers, wrong categories, wrong product names, "(Copy)" products).
- Text over hero images that cannot be read on desktop.
- Typos in core navigation ("Arraival", "CATEGORYS", "Whatsappp", "Quuick").
- Phone made optional at a COD checkout; a checkout with no payment method; a cart page that renders empty.
- Off-brand default WooCommerce blocks (blue buttons, orange checkout borders).
- Fake evergreen countdowns that reset or show 00:00:00.

---

## 20. Recommended designs to build our own versions of (8)

1. **T1 "Fresh green bazaar"** (from #01/#04). It is the best all-round BD conversion layout:
   - big search, category bar, Buy Now everywhere
   - 2×2 CTA grid
   - 3-field Bangla checkout
   - raised-Home bottom nav
   - Build it with a colour token so it can be re-skinned for grocery, household or gadget shops. Fix the footer and description issues.
2. **T3 "Gadget mart" with colour presets** (from #03/#05/#12):
   - dense 6-column marketplace with the Browse Category bar
   - flash sale with a **real** countdown
   - testimonials
   - stepper checkout
   - Ship orange, blue and pink presets from one codebase. It suits electronics, beauty and general stores.
3. **T3b "Library green & gold"** (from #07/#08):
   - trust top bar and Bangla typography for long titles
   - gold accents
   - WhatsApp and Bulk Order in the bottom nav
   - Ideal for books, Islamic products and stationery, a niche the other themes don't serve.
4. **T4 "Royal boutique"** (from #10):
   - portrait cards, circular categories, gradient section bars
   - a call button in the bottom nav
   - The best layout for saree, kurti and ethnic wear (fix the checkout).
5. **T5 "Organic editorial"** (from #11):
   - serif and Inter type, rounded cards
   - the mint why-us band
   - Call Now in the header
   - A calmer, more trustworthy alternative to T1 for organic and health brands. Pair it with the short checkout, not the long Woo block.
6. **T7 "Warm luxury atelier"** (from #14/#16):
   - the most premium and the most complete product page (countdown, swatches, trust grid, Delivery & Returns tab)
   - newsletter band, floating mini-cart, cart upsell
   - Ship two palettes (cream/mocha for menswear, blush/espresso for womenswear and beauty).
7. **T8 "Black & gold Arabian"** (from #15):
   - framed collection tiles, marquee ribbon, FAQ accordion
   - An instantly recognisable look for modest wear, attar and perfume, and gifts.
8. **T6 "Cream editorial menswear"** (from #13):
   - fashion-magazine hero typography and portrait cards
   - centred logo and small black buttons
   - A good minimalist alternative to T7 for apparel brands. It needs a working checkout and the T7 buy box.

**Also build as separate templates:**
- **P-L landing-page order form** (one-product Facebook-ad page with the order form inline).
- **P-H maintenance / coming-soon page with WhatsApp ordering**.

### Baseline every theme should share (learned from all 17)

- A short COD checkout: name, phone (required, 11-digit BD validation), address with district, Inside/Outside Dhaka (or zone) radios, and the total shown inside the CTA.
- A product-page CTA stack: Add to Cart, Buy Now, WhatsApp order (pre-filled with the product link), Call.
- A mobile bottom nav with a raised centre action, set per store (Home, Call or Cart).
- A floating mini-cart that never covers CTAs.
- Abandoned-order capture with consent text.
- Real countdowns only, with a start and an end.
- Meta Pixel and Conversions API, GA4 and TikTok events, configured in one place.
- Demo-content hygiene: no cross-brand footers, real category data, spell-checked navigation.
