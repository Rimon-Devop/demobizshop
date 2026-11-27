# Competitor Teardown: ghorerbazar.com (getCommerce 3.0.0)

**Date reviewed:** 28 Nov 2026 · **Method:** browsed as a guest in a new Chrome tab (desktop at 1536px wide, mobile at 390px). Did not log in, did not place an order, did not bypass any bot check. The two test items added to the cart were removed afterwards.
**Purpose:** list the features and flows our own platform for Bangladeshi sellers should match or improve on. **Do not copy** their brand name, logo, photos, product copy or exact visual design.

---

## 0. TL;DR: features worth building

| Area | What they do | Priority for us |
|---|---|---|
| Guest checkout on one page | Name, phone (+88 prefix), optional email, address, District → Thana dropdowns, live delivery charge | **Must** |
| District-based delivery charge | 70 TK for Dhaka/Chattogram city, 130 TK for outside Dhaka, 100 TK express (Dhaka only); calculated by AJAX when the district changes | **Must** |
| Payment methods | COD (default), Online Payment (cards), bKash; **partial advance payment plans** (50% / 75% / 100%) when paying online | **Must** |
| Incomplete-order capture | JS posts to `/incomplete-order/capture`, `/incomplete-order/heartbeat`, `/incomplete-order/placed`, so the call centre can phone people who abandon checkout | **Must** (with consent text; see §12) |
| Order channels besides web | "Order on WhatsApp" (wa.me deep link) and "Call for Order" (tel:) on every product page, plus a live chat widget (REVE Chat) | **Must** |
| Coupons / gift voucher, wallet balance | Coupon box on checkout; JS also has endpoints to apply and remove wallet balance and a partial-payment discount | Should |
| Cart sidebar with upsell carousel | Off-canvas cart with qty ± and remove, a "You may also like" carousel with one-tap Add, total, Checkout button | **Must** |
| Live search | AJAX POST `/product/live/search` returns thumbnail, name, price and brand in a dropdown; search queries are logged (`/track/search/query`) | **Must** |
| Product flags | Best Selling, New Arrival, Trending, Best Collection, Offered, Free Delivery, **Pre-Order**; auto "Save X%" / "Save ৳X" badge | Should |
| Pre-order products | Require prepayment; dedicated policy page | Should |
| Combo products | Separate combo cart endpoints (`/combo/update-cart-qty`, `/combo/remove-from-cart`); on the storefront, combos look like normal products whose contents are listed in the description | Should (do it better: show the items inside the combo as structured data) |
| Marketing pixels | GTM + GA4 (add_to_cart, InitiateCheckout, Purchase), Meta Pixel, Google Ads conversion, OpenAI ads SDK, reCAPTCHA | **Must**: a built-in pixel manager |
| Web popups | `/api/web-popups` with "seen" and "seen forever" frequency caps stored in localStorage | Should |
| Mobile app links | Play Store and App Store badges in the footer | Later |

---

## 1. Global elements (every page)

**Desktop header**
- Row 1: logo (left), large rounded search input (centre), then icon links: Track Order, Sign In, Wishlist, Cart (count badge), and a "More" dropdown with Wishlists, FAQs, About Us, Call Us and WhatsApp.
- Row 2: a dark sticky category bar with about 13 items (Offer Zone, Honey▾, Oil & Ghee, Gurr, Dates▾, Spices▾, Nuts & Seeds▾, Beverage▾, Rice, Flours & Lentils▾, Certified, Pickle, and an external sister-store link). The ▾ items open a simple hover dropdown of subcategories (no mega-menu, no images).
- The category bar stays fixed at the top while scrolling.

**Floating elements**
- **Floating cart pill** on the right edge, about 40% down the screen: bag icon, "N Items", running total in ৳. Clicking it opens the cart sidebar.
- Scroll-to-top button (bottom right).
- Live-chat bubble (REVE Chat iframe), bottom right.

**Mobile (390px)**
- Header shrinks to hamburger, centred logo and cart icon with badge. The search bar is removed from the header.
- **Sticky bottom nav bar:** Home · Menu · Cart (badge) · Search · Account. It is hidden on checkout.
- Hamburger opens an off-canvas drawer: an orange "Hello there! Sign in" card, the category list with › expanders, then "Quick Links" (Wishlists…).
- Search opens as a top sheet with an input and an orange search button, over a dimmed page.

**Footer (4 columns plus a brand block)**
- Brand block: short mission line, address, phone, email, Facebook and Instagram icons, Google Play and App Store badges.
- Information: About, Contact, Company Information, Stories (blog), Terms, Privacy, Careers.
- Shop By: category shortcuts.
- Support: Support Center, How to Order, Order Tracking, Payment, Shipping, FAQ.
- Consumer Policy: Happy Return, Refund, Exchange, Cancellation, Pre-Order, Extra Discount.

**Notifications:** toastr-style toasts at the top right (for example a red "Item is Removed").

**Tracking stack seen:** Google Tag Manager, gtag/GA4 (fires an `add_to_cart` event), Meta Pixel (`fbevents.js`), Google Ads view-through conversion, OpenAI ads SDK (`oaiq`), Google reCAPTCHA, REVE Chat.

**Global UX problems**
- The floating cart pill and the chat bubble sit on top of the content on every page. On mobile they cover product cards, the "Call For Order" button and even the open hamburger drawer (a z-index bug).
- The external sister-store link in the nav has a broken href (`/https://…`, a relative path with the full URL glued on), so it resolves to a 404 on their own domain.
- The page title is just the brand name on most pages (home and shop at least): weak for SEO and for browser tabs.
- The header layout differs on /track/order (nav items wrap onto 3 lines), so that page uses a different template.

---

## 2. Homepage

Sections from top to bottom:
1. **Hero:** a large auto-rotating slider (left, about 2/3 width, with dot indicators) plus one static promo banner (right, about 1/3). Banners are Bengali-language offer creatives (for example "free gift with X", "৳200 off combo"). On mobile only the slider shows.
2. **Featured Categories:** a horizontal carousel of illustrated category tiles with left and right arrow buttons.
3. **Top Selling Products:** on desktop, a **vertical list of very large one-per-row cards** (image left; name, price, strike-through price, a "Save ৳X" pill, and **Add To Cart + Buy Now** buttons right). On mobile it becomes a 2-column grid.
4. **Our Brands:** a logo carousel with dots and a "See All →" link to /all-brands.
5. **Category rows** (All Natural Honey, Premium Dates, Cooking Essentials, Organic Certified): each has a title, a "View All Items →" link and a 5-column product carousel with dots. One full-width **brand banner** sits between rows.
6. **Just For You:** a 4-column grid that starts with 10 products, then an AJAX **"Load More"** button (this run went to 50 products in total).
7. **Testimonials:** a 3-up carousel of customer quotes (Bengali and English) with 5 stars, avatar, name and job title.
8. Footer.

**Product card (grid version):** image (lazy-loaded), corner flags ("Best Selling" in orange on the left, "Save X%" in green on the right, "New Arrival", "Offered Items"), name, price (with old price struck through), and an outline "Add To Cart" button. Some cards use a compact cart icon that expands into an inline − qty + stepper. Cards have **no rating stars, wishlist heart or quick view**.

**Popup:** there is a site popup system (`gc-popup-container`, `/api/web-popups`). This browser had already been marked as "seen", so it did not show. Frequency capping is done in localStorage (`gc_popup_seen_N`, `gc_popup_seen_N_forever`).

**UX problems**
- On desktop, "Top Selling" takes about 1,400px of scroll for only 5 products (huge cards, mostly empty white space), which pushes the real catalogue far down.
- Carousels lazy-load images, so gray placeholder boxes show while you scroll quickly.
- Product card heights are uneven (2-line names move the buttons out of line).
- There is no free-delivery threshold, countdown timer or flash-sale strip on the homepage, even though a flash sale route exists.

---

## 3. Category pages (`/collections/{slug}`)

Checked: `/collections/honey-2` (≈20 products, 2 pages), `/collections/dates` (11, 1 page), `/collections/oil-ghee`, `/collections/offer-zone` (14).

**Layout:** page title and breadcrumb at the top, a **left sidebar of filters** and a 4-column product grid on the right.
- **Filter by Category:** subcategory checkboxes (for example the Honey types; Dates → Medjool, Sukkari, Ajwa, Mabroom, Safawi).
- **Price Range:** a dual-handle slider whose max is **set from the category** (Honey ৳2,500, Oil & Ghee ৳12,500).
- **Brands:** checkboxes showing only the brands present in that category.
- **Product Flag:** checkboxes (Best Selling, New Arrival…).
- Collapsible widget headers (− toggles).
- Toolbar: **Sort By** (Default, Latest, Oldest, Price Low→High, High→Low, Offered Products) and a **Per page** select (16/20/24/36).
- Numbered pagination (‹ 1 2 ›).
- **Mobile:** the sidebar becomes a "FILTERS" button (off-canvas), with Sort and Per-page selects next to it. 2-column grid.

**UX problems**
- Every filter click **reloads the whole page** (query-string GET), so there is no instant filtering and no "applied filters" chips.
- There is no category description or SEO text, and no product count in the header.
- On desktop the per-page select has a confusing "Default" label at the top right, far from Sort.
- "Offer Zone" is just a category of discounted items. It has no timer or urgency.

---

## 4. Shop page (`/shop`) and search results (`/search/product?keyword=`)

- **/shop:** the same template as a category page. It shows "Showing 1 - 16 of 172 results" and 11 pages of pagination. The sidebar has only Product Flag, Price (0–10,000) and Brands, with **no category filter**.
- **Search results** use the same template. Sort options differ slightly (Best Selling is added; Oldest and Offered are missing). Filters are added as query params (`flag`, `max_price`), and the page reloads.

**Live search (header):** typing triggers a POST to `/product/live/search` (debounced). The dropdown shows up to about 10 results with a thumbnail, name, price (with old price), and the **brand name** under it. It scrolls. Pressing Enter goes to the full results page.

**UX problems (search)**
- The results page **does not show what you searched for** (there is no "Results for 'honey'" heading), and the search box is **cleared** after submitting.
- There is no "no results" suggestion, typo tolerance or category suggestions in the dropdown (products only).
- Relevance is weak: the query "honey s" returned sachet boxes first.

---

## 5. Product pages (`/products/{slug}`)

Checked: Deshi Mustard Oil 5L, Masala Combo, Honey Special Combo Pack.

**Desktop layout (single column, stacked):**
1. Breadcrumb (it says "Home > Products" with no category, which is a missed SEO and navigation opportunity).
2. Gallery: vertical thumbnails on the left, a **very large main image** with ‹ › arrows.
3. Name, price, struck-through MRP and a green "Save 6%" pill.
4. Quantity stepper (− 1 +).
5. **Four big buttons in a 2×2 grid:** ADD TO CART (orange), BUY NOW (black), **Order on WhatsApp** (green, a `wa.me/` link) and **Call For Order** (blue, a `tel:` hotline link).
6. A brand chip (logo) that links to the brand page.
7. Tabs: **Description** | **Customer Reviews (N)**. Below them sit a rich-text "Product Details" section (features, benefits, usage) and a "Submit Your Review" form.
8. **Related Products** carousel.
9. An "EMI Options" modal exists in the markup but was empty for this product.

**Cart behaviour on the product page:** "Add to Cart" works **without opening the sidebar**. The button turns into "REMOVE FROM CART" (a toggle), and the floating cart pill updates its count and total. The cart is held client-side (`jStorage` in localStorage) and synced to the server through `/add/to/cart` and `/update/cart/qty`. The GA4 `add_to_cart` event fires.

**Combo products:** both "Masala Combo" and "Honey Special Combo" look exactly like normal products. The contents (4 × 250g or 4 × 500g) appear only in the description text. Price ৳1,600 vs ৳1,785 MRP ("Save 10%"). The theme JS has dedicated combo cart routes, so the backend models combos separately, but the storefront doesn't show it.

**Mobile:** the image is smaller and the buy box sits above the fold, which is better than desktop. The 2×2 button grid stays.

**UX problems**
- **Desktop:** the main image takes about 600px, so price and Add to Cart are **below the fold**. A 2-column layout would be standard.
- There is no sticky add-to-cart bar on scroll (desktop or mobile).
- There is no stock status, delivery estimate, delivery-charge info or return badge near the buy box.
- "Add to cart" changing into "Remove from cart" is unusual and easy to mis-click. There is also no visual confirmation (toast or flying image) other than the small pill.
- The "Brand:" label was empty in the scraped text for some products while the logo loaded later (the layout shifts).
- Reviews are 0 on the products checked. The review form has no photo upload.
- There are no variants: each pack size (500g, 1kg, Large) is a separate product, which duplicates listings.
- There is no wishlist button or share buttons on the product page, even though a Wishlist exists in the header.

---

## 6. Cart sidebar (off-canvas)

Opened from the floating pill or the header cart icon.
- Header: "SHOPPING CART" and "Close →".
- Line items: thumbnail, truncated name, **− qty +**, "× ৳unit = ৳line total", and a remove ✕.
- **"You May Also Like"** carousel (‹ › arrows) of about 10 products, each with a small "+ Add" pill. Adding one inserts it into the cart immediately and removes it from the carousel.
- Footer: Total and a full-width CHECKOUT button.
- Empty state: "No items in your cart!"

**UX problems**
- There is no free-delivery progress bar, no delivery charge preview and no coupon field in the sidebar.
- The upsell items aren't contextual (coffee and quinoa next to mustard oil).
- After removing items on the checkout page, the floating pill **still showed the old count and total** (a stale-state bug).

---

## 7. Checkout (`/checkout`), looked at only, not submitted

Guest checkout on one page. Top banner: "Have any account? please login or register" with Login and Register buttons.

**Left column**
1. **Order review:** items with thumbnail, − qty +, line total and a red trash icon (removal triggers a toast "Item is Removed"; when the cart becomes empty the page redirects to the homepage).
2. **Shipping Address:**
   - Full Name * (text)
   - Phone * (tel, a fixed **"88" prefix chip** and placeholder `017********`)
   - Email (optional)
   - **"YOUR ADDRESS" live preview box** that echoes the composed address
   - Address * (placeholder "House no. / building / street / area")
   - **District *** select (all 64 districts)
   - **Thana** select (optional; loads by AJAX `/district/wise/thana`, 57 thanas for Dhaka)
3. **Billing Address:** collapsed behind a radio toggle. When opened: name, phone, email, **Country** select (→ `/country/wise/district`), district, thana and address.

**Right column**
1. **Payment method** (card-style radio tiles): **Cash On Delivery** (default, ✓), **Online Payment** (Visa/Master via a gateway; there is a "payNowModal" that shows "Securely fetching payment options…"), and **bKash**.
2. **Choose Payment Plan** (appears for online payment): "50% advance payment is required to confirm your order", "75% advance…", and "Full payment advance". JS routes exist for `/apply/partial/payment/discount`, which suggests a discount for paying more upfront.
3. **Coupon or gift voucher** (collapsible): input plus "Apply coupon" (`/apply/coupon`, `/remove/coupon`).
4. **Totals:** Sub total, Delivery cost, Total (in BDT). Delivery is 0 until a district is chosen, then 70 TK (Dhaka and Chattogram both showed 70; the policy says 130 outside Dhaka).
5. Special notes (textarea with a 0/90 character counter).
6. Terms checkbox (**pre-ticked**) and **PLACE ORDER**.

**Hidden and background logic (from the page's JS route list)**
- `/change/delivery/method`, `/change/fixed/shipping/option`, `/check/delivery/area`, `/api/check/express/delivery` are called when the district changes. Express delivery (100 TK, Dhaka only) exists in policy, but **no express option was shown** for the districts tested.
- `/check/guest/addresses` looks up saved addresses for a returning guest, probably by phone.
- `/apply/wallet/balance` and `/remove/wallet/balance` handle a customer wallet / store credit.
- **Incomplete-order capture:** `/incomplete-order/capture` (fires once the shopper has entered details), `/incomplete-order/heartbeat` (keeps the draft alive while they stay on the page) and `/incomplete-order/placed` (marks it converted). This feeds an abandoned-checkout list for the call team. *(I did not type a name or phone, so I did not trigger it.)*
- Pixel events: InitiateCheckout and Purchase.

**Mobile checkout:** single column, with a **sticky black "PLACE ORDER" bar** fixed to the bottom of the screen. The bottom nav is hidden.

**UX problems**
- The terms checkbox is pre-ticked (a consent problem).
- The privacy policy **doesn't mention** capturing details from unfinished checkouts or the ad pixels.
- The delivery cost shows "0 BDT" before a district is picked, which looks like free delivery and then jumps.
- The sticky Place Order bar on mobile doesn't show the total.
- Nagad is promised in the FAQ and policies but is not offered at checkout.
- There is no phone-number validation hint, OTP or "we'll call to confirm" messaging.
- The payment tiles change size and wrap when the selection changes (layout shift).
- On desktop the floating cart pill sits over the Total row.

---

## 8. Flash sale / offers (`/offered/product`)

- A product-list template with a Sort dropdown only.
- It was **empty** during this visit and showed the bug text **"Showing 1 - 25 of 0 results"**.
- There were no countdown timers anywhere (a `jquery.countdown` plugin is loaded but unused), no stock bars and no sale schedule.
- The nav "Offer Zone" goes to a normal collection instead (`/collections/offer-zone`).

**For us:** build real flash sales: a start and end time, a countdown on the homepage strip, the product card and the product page, a "sold X / Y" progress bar, per-customer limits, and an automatic return to normal price when the sale ends. Hide the page or show a "next sale" teaser when nothing is live.

---

## 9. Order tracking (`/track/order`)

- A hero block ("Live Order Tracking", "Track Your Order", subtitle) with **one input, "Enter order number…"**, and a Search button.
- **Before any search it already shows "📦 Order Not Found – We couldn't find an order…"** plus a "Back to Shopping" button. This is a bug: the empty state shouldn't be an error.
- There is no phone verification, even though the FAQ says tracking needs "Order ID and phone number". That leaves a privacy risk (order numbers can be guessed) and a content mismatch.
- There is no CAPTCHA or rate limiting visible.

**For us:** look up an order by order ID plus phone (or an OTP), show a status timeline (Placed → Confirmed → Packed → Handed to courier → Delivered) with courier name and consignment ID, and add an SMS link straight to the tracking page.

---

## 10. All brands (`/all-brands`) and brand pages

- A full-width banner image, then the heading **"Brand Title"** (an unedited placeholder) and a paragraph about the brands.
- "Popular Brands": a 6-column grid of 16 logo tiles linking to `/brand/{slug}` (brand product listing).
- There is no alphabetical index, search or product counts.

---

## 11. FAQ and content pages (`/page/{slug}`)

All use one CMS template: a gray title banner, breadcrumb, then rich text. The FAQ is **static text, not an accordion**, and has no search.

Key business rules found (useful as a checklist for our policy templates and settings):

| Topic | Their rule |
|---|---|
| Order channels | Website, WhatsApp, Facebook, phone hotline, live chat |
| Delivery charge | 70 TK inside Dhaka & Chattogram city; 130 TK outside Dhaka; express delivery 100 TK, Dhaka only; same charge for any order value |
| Delivery time | 72 h city / 4 working days outside |
| Payments | Visa, MasterCard, bKash, Nagad, COD; partial payment; prepayment required for pre-orders |
| Returns | Within **3 days** of delivery (damaged, defective or not as described; unused, original packaging, freebies included) |
| Exchange | Within **2 days** (conflicts with the 3-day return window) |
| Refund | To the original method; COD refunds go via bKash or Nagad; 1–3 working days for mobile banking, 7–15 for cards; partial refunds allowed |
| Cancellation | Free before dispatch; prepaid refunded in full; "repeated last-minute cancellations may affect COD eligibility" (that is, a COD blacklist / fraud score) |
| Pre-order | Prepayment mandatory, estimated arrival per product, cancel before the supplier confirms |
| Terms | Says "you may need to create an account to place orders", which contradicts guest checkout |
| Privacy | Mentions analytics and third parties in general terms; nothing about pixels or capturing unfinished checkouts |
| Extra Discount page | **Empty** (title only) |

**UX problems:** inconsistent policies (2 vs 3 days, Nagad, account requirement, tracking needs phone), an empty page linked from the footer, and some pages with a "-2" slug (duplicates).

---

## 12. Recommendations for our platform

### Must-have at launch (parity)
1. Guest checkout on one page with a BD phone field (+88, 11-digit 01X validation), District → Upazila/Thana cascade (pre-loaded data for all 64 districts), an address preview, and an optional note.
2. **Delivery-charge engine:** zones (city / suburb / outside Dhaka), express option by zone, free-delivery threshold, per-product overrides (heavy items), and the charge shown before the district is chosen ("from ৳70").
3. **Payments:** COD, bKash, Nagad, SSLCommerz/aamarPay cards; **partial advance** (fixed % or fixed ৳ such as "pay the delivery charge upfront"); COD disabled for pre-order items.
4. **Incomplete-order capture**, done properly: save a draft after a valid phone is entered (debounced), keep it alive with a heartbeat, and mark it converted on order. Give it an admin "Incomplete Orders" list with call status, one-click "convert to order", and an SMS/WhatsApp follow-up. Add clear consent text under the phone field and cover it in the privacy policy.
5. Cart sidebar with qty, remove, a **contextual** upsell (same category or frequently bought together), a free-delivery progress bar and a coupon field.
6. Live search with debounce, products **plus** categories and brands, Bangla and English matching, typo tolerance, and logged queries (for "zero result" reports).
7. Product page: 2-column on desktop; a sticky add-to-cart bar; WhatsApp-order and click-to-call buttons (with the product name and link pre-filled in the WhatsApp message); a stock badge; a delivery estimate; **real variants** (size or weight) instead of duplicate products.
8. Order tracking by order ID + phone, with a status timeline and courier consignment ID (integrate Pathao, Steadfast and RedX).
9. A pixel and analytics manager: Meta Pixel + Conversions API (server side, to cope with iOS and ad blockers), GA4, TikTok, Google Ads, all with standard ecommerce events.
10. A mobile bottom nav (Home / Categories / Cart / Search / Account) and sticky Place Order **with the total**.

### Do better than them
- **AJAX filters** with applied-filter chips and URL sync. Show the search term and the result count on the results page.
- **Real flash sales and combos:** timers, stock bars, and combos built from actual SKUs (stock deducted per component, the contents shown in a list).
- **COD fraud tools:** a courier success-rate check by phone (via a courier fraud-check API), OTP for high-value COD orders, and a blacklist. They hint at this in policy but show nothing in the UI.
- **Consistency checker for policy pages:** generate policy pages from the store's settings (return days, delivery fees, payment methods) so they can't contradict checkout.
- Don't pre-tick consent. Don't show error empty-states before the user acts. Keep floating widgets from covering CTAs (offset them above the bottom nav and hide them when a drawer is open).
- Popups with frequency caps, page targeting and exit intent; a newsletter or phone capture with an incentive.
- Reviews with photos, verified-buyer badges, and star ratings on product cards.
- Per-page SEO titles and meta, category descriptions, a breadcrumb that includes the category, and schema.org Product/Offer markup.

### Admin-side features implied by what we saw
Product flags (badges), brands, category banners, homepage section builder (carousels by category or flag, banners, testimonials), CMS pages, coupon and gift voucher, wallet / store credit, partial-payment rules and discounts, pre-order mode, popups manager, incomplete-order inbox, search-query log, delivery-zone pricing, express delivery zones, WhatsApp and hotline numbers, mobile app links.
