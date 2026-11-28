# Competitor Teardown: getcommerce.xyz (the platform behind ghorerbazar.com)

**Date reviewed:** 28 Nov 2026 · **Method:** browsed as a guest in a new Chrome tab: the marketing site, the SaaS sign-up and login pages (looked at only, nothing submitted), and two public demo stores (`fashion1.getupdemo.xyz`, `gadget1.getupdemo.xyz`). I did not log in, register, book a demo, submit any form or place an order. The demo cart was emptied afterwards. Mobile layouts were checked in a 390px frame.
**Purpose:** decode the whole product (features, plans, architecture and flows) so we can build our own platform for Bangladeshi sellers. **Do not copy** their name, logo, screenshots, copy or exact design.

> Read together with `ghorerbazar-report.md`, which documents a live store on their newest version (3.0.0).

---

## 0. TL;DR

- **What it is:** a Bangladeshi **multi-tenant ecommerce SaaS** ("database-isolated": one database per store) from GetUp Limited, part of the Softifybd group. Internally it is also called **GetStore** (getstore.com.bd); both names appear all over the site.
- **Stack:** Laravel + MySQL. The storefront is Blade + jQuery + Bootstrap (Wolmart-style theme). One template ("Gadget 2") uses a Next.js storefront, so headless is in progress. The marketing site is Laravel + Vite.
- **Pricing:** ৳2,999 / ৳4,999 / ৳9,999 / ৳15,000 per month, plus a custom Enterprise plan. Limits are on orders/month, SKUs, staff, warehouses and shops, with **per-order overage (৳1–1.4)** and **৳250 per extra user**.
- **Their real moat** is not the storefront. It is the **BD operations stack**: incomplete-order capture, a fraud checker, duplicate-order blocking, 5 courier integrations, an Obiram call centre (AI auto-call and IVR), true ad-cost / campaign profitability, accounting, POS, HRM and payroll, and Shopify/WooCommerce sync.
- **Ecosystem upsells (sister products):** **CourierVerify** (delivery intelligence / fraud checks) and **Obiram** (business communication / call centre).
- **Weak spots we can beat:**
  - The site is half-finished: no blog posts, no customer showcase, "coming soon" Unified Inbox, a Super-Admin note left in the public copy, and GetCommerce/GetStore naming confusion.
  - Plan numbers contradict each other between the cards and the comparison table.
  - The "save 2 months" yearly claim is wrong as displayed.
  - Templates have no live previews except one.
  - Demo stores are full of lorem ipsum and junk data, and use a famous fashion brand's logo.
  - Platform-wide bugs repeat across demos and real stores ("Order Not Found" before searching, "Showing 1–25 of 0 results", fake flash sales with no timer).

---

## 1. Marketing site map (getcommerce.xyz)

| URL | What's there |
|---|---|
| `/` | Hero, feature tiles, templates, how-it-works, ecosystem, pricing, FAQ, CTA |
| `/features` | Tabbed feature explorer with a fake "Live preview" dashboard |
| `/templates`, `/templates/{slug}` | 6 industry templates (each detail page is just one screenshot plus "Get a demo") |
| `/plans` | Pricing cards, Monthly/Yearly toggle, feature-filter chips, full comparison table, demo booking form, FAQ |
| `/demo` | Demo booking form |
| `/contact` | Contact info, topic chips, message form, FAQ |
| `/about`, `/our-company` | Story, mission, vision, values, group ecosystem, offices |
| `/tools` (labelled "Integrations" in the footer!) | Free SEO tools: meta tag generator, CNAME/DNS lookup, JSON-LD schema builder |
| `/portfolio` ("Customers") | **Empty**: "No showcase portfolio items added yet." |
| `/blog` | **Empty**: "No blog posts found." |
| `/status` | Status page: domain registry, SaaS portal, storefront, channel sync workers |
| `/pages/terms-and-conditions`, `/pages/privacy-policy`, `/pages/data-deletion` | Legal pages (written for Meta app review) |
| `app.getcommerce.xyz/register`, `/login`, `/forgot-password` | The merchant SaaS portal |

**Global chrome:**
- A floating white pill header: logo, Home, About Us, Features, Templates, Pricing, Blog, Contact, Login, and a gradient "REQUEST A QUOTE" CTA.
- Bottom-right chat bubble (**ReplyX** widget).
- 4-column footer, a newsletter (website + email), two office addresses, socials (Facebook, LinkedIn, YouTube), and the line "© 2026 GetStore. Powered by GetUp Limited".
- **Trackers:** 2 Meta Pixels, GTM, a Google Ads conversion tag, Cloudflare Web Analytics.
- **Mobile:** hamburger menu, full-width stacked CTAs, chat bubble.

---

## 2. Homepage, section by section

1. **Hero:** "Build & Scale Your eCommerce with GetCommerce". Subcopy: single-vendor shop up to an enterprise marketplace. CTAs: **Get Started →** (goes to `/register`) and **Book a demo**. Below them is a dashboard screenshot with a **video play button** and floating stat badges ("100+ / 150+ Enterprise-ready features", inconsistent numbers).
2. **All-in-one commerce:** 6 tiles in Bangla (Product Management, Order & Delivery, Marketing Tools, Sales & Reports, Integrations, Web & Mobile Apps).
3. **Templates:** filter chips (All, Gadget, Fashion, Grocery, Gift-Store) and 6 cards, each with a screenshot, name and "Technology: PHP, Laravel, MySQL" (Gadget 2 adds Next.js). Then "Get a demo →" and "View all templates".
4. **How GetCommerce works (4 steps, Bangla):** Sign up (free, no card) → Customize (template, logo, colours) → Add products → Go live (connect a domain).
5. **Our Ecosystem:** Parent company Softifybd. Products: Enterprise E-commerce Solution (GetCommerce/GetStore), Customer Delivery Intelligence (**CourierVerify**), Business Communication Platform (**Obiram**). Integrated partners carousel.
6. **Pricing:** the same cards as `/plans` (see §4).
7. **FAQ:** 6 accordions (try before buying → book a demo; own domain and branding → yes; cost → from ৳2,999; payments and couriers → yes; can it grow → upgrade).
8. **Final CTA (Bangla):** "Start your online store now", **Start Free Trial →** and Request a demo.

---

## 3. Features page (`/features`): what the product claims to do

A tabbed explorer with 7 tabs. Each shows the same fake orders table (customer, amount, COD/Online, courier SteadFast/Pathao/RedX, status), a Bangla description, 3 bullet features and a 4-step flow strip.

| Tab | Bullets | Flow strip |
|---|---|---|
| **Orders & Fulfillment** | Advanced order management · **Incomplete order capture & convert** · Courier integration & auto-update | New Order → **Fraud Check** → Courier Booking → Delivered → **Settlement** |
| **Products & Inventory** | Multi-variant & attributes · Low-stock alert · **Multi-warehouse inventory** | Add Product → Variants → Stock Sync → Publish |
| **Courier & Delivery** | Multi-courier (Steadfast, Pathao, RedX) · **Smart delivery-charge rules** · Status auto-sync | Pick Courier → Book Parcel → Track → Delivered |
| **Marketing & CRM** | Coupons & flash sale · Customer profile & history · SMS / offer automation | Segment → Campaign → Notify → Convert |
| **POS & Accounts** | Outlet POS · Accounting & expense tracking · Invoice & settlement | Sell → Payment → Accounts → Report |
| **Reports & Analytics** | Sales & profit dashboard · Stock & order reports · **Campaign ad profitability** | Collect → Analyze → Compare → Decide |
| **Integrations** | bKash / SSLCommerz / Nagad · SMS & communication · Shopify / WooCommerce sync | Connect → Map → Sync → Live |

"More Powerful Features" cards:
- Product Variants & Attributes
- **Smart Delivery Rules** (by district, weight and order value)
- **Courier Reconciliation** (auto-update from courier APIs plus tracking courier payments / COD settlement)
- Customer Insights & CRM
- **Shopify & WooCommerce Sync** (products, stock and orders, one click)
- **Marketing Automation** (coupons, flash sale, **abandoned-cart offers**, SMS marketing)

Every "Explore This Feature →" button just goes to `/demo`. There are no real feature pages.

---

## 4. Pricing and plans (`/plans`): the full decoded table

### 4.1 Plan cards (monthly "offer" price vs crossed-out price)

| | Starter | Growth (BEST VALUE) | Scale | Empire | Enterprise |
|---|---|---|---|---|---|
| Price/month | **৳2,999** (৳3,999) | **৳4,999** (৳6,999) | **৳9,999** (৳13,999) | **৳15,000** (৳19,999) | Let's talk |
| Tagline | Active sellers | Serious sellers running ads | Multi-warehouse operators | Multi-brand, high-volume | Unique enterprise needs |
| Pitch | All themes, POS, landing pages, day-to-day order ops | True ad cost, Unified Inbox, AI, fraud checks, full accounting | Multi-warehouse, in-dashboard call centre, AI ad suggestions | Multiple brands, channels, full call centre | White-label, dedicated infra, custom integrations, SLA |
| Shops (card) | 1 | 1 | 2 | 3 | Unlimited |
| Products (card) | 500 | 1,000 | 2,500 | 5,000 | Unlimited |
| Staff (card) | 3 | 7 | 12 | 30 | Unlimited |
| Orders/month | 1,500 | 3,000 | 6,000 | 10,000 | Unlimited |
| Custom domains | 1 | 1 | 1 | 1 | Unlimited |
| Database | Isolated sandbox (all plans) | | | | |

**Interactions:**
- **Monthly / Yearly toggle** ("SAVE 2 MONTHS"). Yearly shows a per-month price plus "Billed ৳X/year". Examples: Starter ৳2,789.07/mo, billed ৳33,468.84; Growth ৳4,499.1; Scale ৳8,799.12. Badges show "Save 7% / 10% / 12% yearly".
- **"Select what you need" chips:** Multi-shop, Own domain, Chatbot, Accounting, White-label app. Plans that don't include every selected option are faded out. This is a nice plan-finder idea.
- "+36…43 more in the full comparison" links to the table.

### 4.2 Full comparison table

| Feature | Starter | Growth | Scale | Empire | Enterprise |
|---|---|---|---|---|---|
| **Limits** | | | | | |
| Team members | 3 | 7 | 15 | 30 | Custom |
| Extra user / month | ৳250 | ৳250 | ৳250 | ৳250 | Custom |
| Product SKUs | 500 | 1,000 | 2,500 | 5,000 | Unlimited |
| Orders / month | 1,500 | 3,000 | 6,000 | 10,000 | Unlimited |
| **Extra order** (overage) | ৳1.4 | ৳1.3 | ৳1.2 | ৳1 | — |
| Warehouses | 1 | 2 | 5 | 10 | Unlimited |
| Shop | 1 | 2 | 3 | 5 | ✓ |
| **Channel** | | | | | |
| WordPress (WooCommerce) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Shopify | ✓ | ✓ | ✓ | ✓ | ✓ |
| **Unified Inbox** | | | | | |
| Live chat, Facebook Pages, Messenger, WhatsApp, Instagram | **Coming soon** (all plans) | | | | |
| **Storefront & themes** | | | | | |
| Custom domain, theme templates, **website builder**, **landing page builder**, **Easy Checkout**, **Pop-up Checkout** | ✓ all | | | | |
| Payment gateways (bKash, SSLCommerz, **DGpay**, **EPS**) | ✓ all | | | | |
| **Store operations** | | | | | |
| Advanced order management, **incomplete order tracking**, **fraud checker**, **duplicate order block**, dispatch & return, customer management, low-stock alerts, analytics & reports | ✓ all | | | | |
| Couriers (Steadfast / Pathao / RedX / Paperfly / Carrybee) | ✓ all | | | | |
| Outlet POS | — | — | ✓ | ✓ | ✓ |
| Campaign ad profitability | — | ✓ | ✓ | ✓ | ✓ |
| **Inventory & Accounting** | | | | | |
| Accounting | — | ✓ | ✓ | ✓ | ✓ |
| Inventory management | — | ✓ | ✓ | ✓ | ✓ |
| **Production management** | — | — | — | ✓ | — (!) |
| **HRM** | | | | | |
| Employee management, payroll | ✓ all | | | | |
| **Call centre integration (Obiram)** | | | | | |
| AI auto call, IVR + custom routing, custom brand voice | **Add-on** (all plans) | | | | |
| **Marketing & analytics** | | | | | |
| Coupon | ✓ all | | | | |
| Promotion engine | — | ✓ | ✓ | ✓ | ✓ |
| **Apps** (T&S apply) | | | | | |
| Android app | — | ✓ | ✓ | ✓ | ✓ |

**Plans FAQ:**
- Switching plans: up or down from the billing page; the new limits apply next cycle.
- Yearly: "charges 10 months".
- Custom: white-label, dedicated infra, written SLA.
- Trial: "start a trial from any plan card".

Trust strip: 7-day money-back · No setup fee · Cancel anytime · Yearly saves 2 months.

### 4.3 Pricing problems and contradictions (things to do better)

- **Cards vs table don't match:**
  - Scale staff: 12 vs 15. Shops: Scale 2 vs 3, Empire 3 vs 5.
  - Starter's card says "POS", but the table only has Outlet POS from Scale up.
  - Growth's card sells "Unified Inbox" and "AI", but the table says the inbox is "Coming soon" and has no AI row.
  - Scale's card sells an "in-dashboard call centre", but the table makes the call centre an add-on for every plan.
- **The yearly maths is wrong.** "Charges 10 months / save 2 months" would be about 16.7% off, but the displayed yearly prices are only 7–12% below the monthly offer price. For example, Starter is ৳2,999 × 12 = ৳35,988 a year on monthly billing vs ৳33,469 on yearly billing.
- **"Free trial" vs reality:** the home CTA says "free account, no card", but the FAQ steers people towards a demo.
- Enterprise lacks Production management while Empire has it, which is probably a data-entry error.
- Typos: "Unifide Inbox", "Getway", "Employees Mmanagement", "Peperfly".

---

## 5. Demo booking (`/demo` and the bottom of `/plans`) and Contact

**`/demo`, "Book a GetCommerce demo":**
- Badge: "Live product walkthrough"; "~30–45 minutes · no commitment".
- Form fields:
  - Name
  - Company/store (optional)
  - **Phone** (hint: "minimum 11 digits, spaces or +880 allowed"; required "so we can confirm quickly")
  - Email (optional)
  - Preferred date
  - Preferred time (4 slot chips: Morning 10–11, Noon 12–13, Afternoon 15–16, Evening 17–18)
  - "What should we focus on?" (optional)
- Consent line: "By booking, you agree we may call or message you."
- Left panel, "What we'll cover": Storefront & catalog / Checkout & payments / Admin & growth tools.
- The `/plans` version adds a **plan dropdown** ("Tell us the plan you are considering") and "We'll get back within 1 business day".

**`/contact`:**
- Cards with **click-to-copy** phone, email and address, plus quick actions: Call now, Email us, WhatsApp, Book a demo.
- **Topic chips:** Pricing & plans / Enterprise-custom / Migration support / Technical help / Partnership.
- Form: name, phone, email (optional), subject, message (0/5000 counter).
- FAQ accordions (reply time, live demo, migration help).

**Lead-gen pattern to copy (in our own words):** phone-first, email optional, time-slot chips, topic chips. That suits BD sellers, who answer WhatsApp and phone rather than email.

---

## 6. Merchant SaaS portal (`app.getcommerce.xyz`), looked at only

**Register:**
- Split screen. The left panel says "SaaS management portal: control tenants, subscriptions, billing, and system operations" (copy aimed at the super-admin, not merchants) with bullets: multi-tenant, isolated DB per store; RBAC; real-time analytics.
- Fields: Name, Email, Mobile (hint: "BD mobile with or without 88, saved as 8801…"), Password, Confirm.
- The hint openly says **"Signup OTP is currently off — no SMS/email code is sent."** It has no CAPTCHA, so it is open to fake sign-ups.

**Login:** "Email or phone" plus password, a remember-me box, "Forgot password?", "Create account" and "Back to homepage".

Takeaways: the merchant portal is a separate subdomain, and identity is phone-first (BD numbers normalised to `8801…`).

---

## 7. Free SEO tools (`/tools`), a lead magnet

Three tabs:
1. **SEO Meta Tag Generator:** site title, description, keywords, and so on, producing a live HTML snippet with "Copy Code".
2. **CNAME / DNS Lookup:** checks that a merchant's custom domain points correctly. This doubles as **domain-connection support**.
3. **JSON-LD Schema Builder.**

Good idea for us too: free tools such as a delivery-charge calculator, COD fraud check, a Bangla product-description generator, or an invoice maker can bring in organic sign-ups.

---

## 8. Company, ecosystem, status and legal

- **About / Our Company:**
  - Mission: "democratise WooCommerce and custom tenant hosting by automating database provisioning and SSL validations".
  - Vision: "biggest automated headless ecommerce host in South Asia".
  - Values: Merchant-first, Isolation & trust, One ecosystem.
  - An internal note is publicly visible: *"icons and addresses only, managed from Super Admin."*
- **Group:** Softifybd (parent), GetUp Limited (operator), GetCommerce/GetStore, CourierVerify, Obiram.
- **Offices:** HQ in Gulshan Avenue, and a dev and support office in Gulshan-1.
- **Status page:** 4 components (domain registry, SaaS portal, storefront, channel sync workers), active incidents, and a recent list. Bug: "Storefront: *Health URL not configured*" is still shown as **OPERATIONAL**.
- **Terms:** multi-tenant software; acceptable use (bans illegal goods, fraud, spam, abuse of Meta APIs); third-party providers' terms; non-payment may suspend access. The contact link points to `getstore.com.bd`.
- **Privacy:** collects account data, billing data, store and customer data, technical logs, and Meta channel data (page IDs, message metadata). Doesn't sell data. Shares with hosting, SMS/email and payment processors and with Meta.
- **Data Deletion:** written for **Meta app review**. They are a Meta tech provider (Facebook, Instagram and WhatsApp login and inbox). Meta calls an automated endpoint that returns a confirmation code, with a status URL `getstore.com.bd/meta/data-deletion/status/{code}`. Deletion within 30 days, except invoices.

**Takeaway:** if we build a Messenger/WhatsApp unified inbox, we also need Meta app review, a data-deletion callback endpoint and a status page. Plan for it early.

---

## 9. Templates

| Template | Stack | Live demo? |
|---|---|---|
| Gadget | PHP, Laravel, MySQL | Only a screenshot page (`gadget1.getupdemo.xyz` exists but isn't linked) |
| Gadget 2 | PHP, Laravel, **Next.js**, MySQL | Screenshot only |
| Fashion | PHP, Laravel, MySQL | **Yes:** `fashion1.getupdemo.xyz` |
| Fashion 2 | PHP, Laravel, MySQL | Screenshot only |
| Grocery | PHP, Laravel, MySQL | Screenshot only (this is the template ghorerbazar uses) |
| Gift Store | PHP, Laravel, MySQL | Screenshot only |

Each detail page has a back link, a title, "Industry · Technology", one line of description ("Ready-made X storefront layout for GetCommerce merchants"), one long screenshot, and "Get a demo" / "Browse all". **There is no "Preview live" or "Use this template" button.** That's an easy win for us.

---

## 10. Demo store 1: Fashion (`fashion1.getupdemo.xyz`)

Same engine as ghorerbazar (`addToCart.js`, toastr, jquery.countdown, magnific-popup, swiper, parsley, reCAPTCHA, Meta Pixel), but an **older build**.

**Homepage:**
- Transparent header: Home, Festival ▾, Men, Women; centred logo; search, wishlist (count), cart (count), account.
- Full-screen hero slider.
- 3 big image category tiles (Women / Traditional / Panjabi), then a lookbook banner grid.
- Category product carousels ("TRADITIONAL", "FASHION") with "X% OFF" pills.
- **Featured Products with tabs:** New Arrival / New Flag / Best Selling.
- An SEO text block with "Read More".
- Footer:
  - Company: contact, blog, terms, privacy, shipping, return, warranty, FAQ.
  - **Accounts:** My account, **My orders**, **My wishlist**, **Payment history**, **Support ticket**, Order tracking, **Update price list**.
  - Showroom location.
  - Newsletter, app badges ("15% discount on your first purchase"), and a payment-method logo strip.
- **Newsletter popup** with "Don't show this popup again".

**Category (`/category/{slug}`):**
- A category **banner image**, title and breadcrumb.
- Sidebar: Filter by Category, **Price min/max inputs + Go**, Brands, Product Flag.
- `/shop` adds **Filter Sizes** (S/M/L/XL) and **Filter Colors**.
- Sort (Default/Latest/Oldest/Price ↑↓), per-page (16/20/24/36), numbered pagination.

**Product page (`/product/{slug}-{timestamp}{random}`):**
- 2-column layout: gallery left; right side has title, brand logo, price with MRP, star rating and review count, short description, a **wishlist heart**.
- **Variant selectors:** Color swatches, Size, **Storage, SIM type, Region, Device condition, Product warranty**. This is a fixed, gadget-oriented attribute set reused for clothing.
- Selecting options calls `POST /check/product/variant`, which returns price and stock. An invalid combination **hides the price and shows "Stock Out"**.
- Qty stepper, ADD TO CART (toggles to "Remove from cart"), BUY NOW, **Order on WhatsApp**, **Share** (Facebook, Twitter/X, WhatsApp, LinkedIn).
- Tabs: **Specification · Description · Video · Warranty Policy · Vendor Info · Customer Reviews**.
  - **Vendor Info:** vendor name, rating, description, "VISIT STORE". This shows the **multi-vendor marketplace** capability.
  - Reviews: average rating, **% recommended**, a 5→1 star breakdown and a submit form (`/submit/product/review` with rating and text).

**Cart:**
- Sidebar: items, ± qty, ✕, total, **VIEW CART** and **CHECKOUT**.
- A **`/view/cart` page** with a 3-step progress bar (Shopping Cart → Checkout → Order Complete), a table, Continue shopping, **Clear cart**, and a totals box.

**Checkout (looked at only):**
- Login/Register strip.
- **Delivery method: Home delivery / Store pickup.** Store pickup sets delivery to ৳0 but still asks for a full address.
- Address: name, phone, email, address, District (the list contains junk such as a person's name, 70 entries instead of 64), **Thana (required here)**, **postal code**.
- Special notes, payment (COD / Online / bKash), coupon or gift voucher, Sub total / Delivery cost (Dhaka ৳80) / **Total highlighted in yellow**.
- Terms checkbox **not** pre-ticked; reCAPTCHA.
- JS routes on this build include `/apply/for/reward/points` (**reward points**), coupon, guest addresses and delivery method. There is **no** incomplete-order capture, partial payment or wallet yet. Those were added in 3.0.0, as seen on ghorerbazar.

**Customer login (`/login`):** **mobile OTP login** ("Send OTP") **or** email/phone + password, plus **Google sign-in** (`/auth/google`), forgot password and register.

**Other pages:**
- **Track order:** a single "order id" field, and it shows **"No Order Found" before any search** (the same bug as ghorerbazar, so it is platform-level).
- FAQ (accordion, generic).
- Blog with categories and counts (food categories on a fashion store).
- 404 page with category icon shortcuts.
- `/pricelist` returns a 404 even though it is linked in the footer.

**Bugs and quality issues in the demo:**
- Uses a **famous luxury fashion brand's logo** as the demo logo (a trademark risk; never do this).
- Product names and descriptions are faker/lorem ipsum; the "about" text was copy-pasted from a real flower-shop client.
- Footer says "London, UK", `sample@example.com` and an invalid phone number.
- The policy links are written as `//terms-and-condition` (protocol-relative), so they are **broken**.
- Men and Women both point to the same category. The category page titled "Accessories" sits at URL `/fashion`.
- Prices differ between the search dropdown and the homepage for the same item.
- Only Meta's automatic "SubscribedButtonClick" fires on add to cart. There is no proper AddToCart event.

---

## 11. Demo store 2: Gadget (`gadget1.getupdemo.xyz`)

This is the same theme ghorerbazar uses (white header with a big search bar; Track Order / Sign In / Wishlist / Cart / More icons; a coloured category bar), plus a **"✦ FLASH SALE" button** on the right of the nav bar.

**Homepage sections:**
- Hero slider plus 2 stacked side banners.
- **Featured Categories** (16 icon tiles).
- "Ready for Order" carousel.
- A 2-up promo banner row.
- Featured Products.
- **Featured Brand Products** (a brand banner on the left plus products).
- A brand logo strip.
- "Just For You" with **Load More**.
- An SEO text block (fashion copy on a gadget store: a template leftover).
- Newsletter.

**Product cards:** "X%" discount badge, name, price with MRP, **Buy Now** and **Add to Cart** buttons. For variant products the second button is **"Order Now"**, which goes to the product page to pick a variant.

**Product page (3 columns):**
- Gallery with **zoom / fullscreen**.
- Info column with variants (same attribute set as above).
- A **right sidebar** with trust badges (Easy shipping & returns · Secure payment · Money-back guarantee, "within 7 days") and a "More Products" mini-carousel.

**Flash sale (`/offered/product`):** just a list of discounted products, with **no countdown, no schedule and no stock bar**, plus the "Showing 1 – 25 of 20 results" bug.

**Mobile:** hamburger + logo + cart; a bottom nav (Home, Menu, **raised centre Cart button**, Search, Account); a 3-column category grid (16 tiles make a very long scroll). The floating cart pill and chat bubble cover the content (the same problem as ghorerbazar).

---

## 12. Decoded architecture (from URLs, JS routes and copy)

```
Marketing site      getcommerce.xyz              Laravel + Vite, CMS-managed from "Super Admin"
Merchant portal     app.getcommerce.xyz          Laravel; tenants, subscriptions, billing, RBAC
Tenant storefronts  {store}.getupdemo.xyz        Laravel Blade + jQuery theme engine (one codebase,
                    or the merchant's custom      many themes); a Next.js storefront for "Gadget 2"
                    domain via CNAME             (headless API)
Tenant data         database-per-tenant MySQL    ("isolated sandbox"), automated DB provisioning
                                                  and SSL issuing for custom domains
Workers             channel sync workers         Shopify / WooCommerce sync, courier status sync
Status              /status                      component health checks
Sister services     CourierVerify                fraud / delivery-success intelligence
                    Obiram                       call centre: AI auto-call, IVR, brand voice
Meta                tech provider                FB/IG/WhatsApp login + inbox; data-deletion callback
```

**Storefront route map (as seen across the demos and ghorerbazar):**

| Area | Routes |
|---|---|
| Catalog | `/shop`, `/category/{slug}` (old) or `/collections/{slug}` (v3), `/product/{slug}` (old) or `/products/{slug}` (v3), `/brand/{slug}`, `/all-brands`, `/offered/product`, `/search/product?keyword=` |
| Search | `POST /product/live/search`, `/track/search/query` |
| Cart | `/add/to/cart`, `/add/to/cart/with/qty`, `/update/cart/qty`, `/remove/cart/item`, `/view/cart`, combo routes `/combo/update-cart-qty`, `/combo/remove-from-cart` |
| Variants | `POST /check/product/variant` |
| Checkout | `/checkout`, `/country/wise/district`, `/district/wise/thana`, `/check/delivery/area`, `/change/delivery/method`, `/change/fixed/shipping/option`, `/api/check/express/delivery`, `/check/guest/addresses`, `/apply/coupon`, `/remove/coupon`, `/apply/for/reward/points` (old), `/apply/wallet/balance` (v3), `/apply/partial/payment/discount` (v3) |
| Incomplete orders (v3) | `/incomplete-order/capture`, `/incomplete-order/heartbeat`, `/incomplete-order/placed` |
| Customer | `/login` (OTP + password + Google `/auth/google`), `/register`, `/my/orders`, `/my/wishlists`, `/my/payments`, `/support/tickets`, `/track/order` |
| Content | `/page/{slug}` (v3) or `/{slug}` (old), `/blogs`, `/faq`, `/contact` |
| Marketing | `/api/web-popups`, `/subscribe` (newsletter), `/submit/product/review` |

**Version notes:**
- The older build (fashion demo) has: reward points, store pickup, a View Cart page, a postal code field and OTP login.
- v3.0.0 (ghorerbazar) adds: incomplete-order capture, partial advance payment plans, wallet balance, express delivery, combo products, a web-popups API, custom slugs (`/products/`, `/collections/`) and a billing address with a country selector.

---

## 13. Master feature checklist for OUR platform

✅ = they have it and we must match it · ⭐ = do it better · 🆕 = they lack it or it's weak (our differentiator)

**Storefront**
- ✅ Multiple industry themes plus a website builder and a **landing-page builder** (single-product sales pages for Facebook ads).
- ⭐ Live template previews with a "Start with this template" button (they only show screenshots).
- ✅ Homepage section builder: sliders, banners, category tiles, product carousels by category or flag, tabbed featured products, brand strip, Load More grid, testimonials, SEO text.
- ✅ Live search (products, with brand and price) and search-query logging. ⭐ Add categories, Bangla/phonetic matching, typo tolerance and a results heading.
- ✅ Filters: category, price, brand, flag, size, colour. ⭐ AJAX filters with applied-filter chips.
- ✅ Variants with per-combination price and stock. ⭐ Merchant-defined attributes (not a fixed "SIM / Region" list), a variant image swap, and disabling impossible combinations instead of hiding the price.
- ✅ Wishlist, share buttons, reviews with breakdown and "% recommended". ⭐ Photo reviews and a verified-buyer badge.
- ✅ Order on WhatsApp, click-to-call, live chat.
- ✅ Product flags (new, trending, best selling, offered, pre-order, free delivery), combo products, pre-order.
- ⭐ Real flash sales: countdown, schedule, stock bar, automatic price revert.
- ✅ Newsletter popup and web popups with frequency caps.
- ✅ Multi-vendor: vendor info tab, vendor store page.
- ✅ Mobile bottom nav. ⭐ Keep floating widgets from covering content.

**Cart and checkout**
- ✅ Cart sidebar plus a full cart page, an upsell carousel, clear cart.
- ✅ **Easy Checkout** (one page, guest) and **Pop-up Checkout** (checkout in a modal straight from the product page, for landing pages).
- ✅ Delivery method: home delivery / store pickup / express. ⭐ Hide the address when "store pickup" is chosen.
- ✅ Smart delivery rules by district, weight, order value and zone.
- ✅ Payments: COD, bKash, Nagad, SSLCommerz, **DGpay**, **EPS**, cards. ✅ Partial advance (50/75/100%) with an optional discount for paying more upfront.
- ✅ Coupons, gift vouchers, **reward points**, **wallet / store credit**.
- ✅ **Incomplete-order capture**, with a heartbeat and conversion marking. ⭐ Consent text and a mention in the privacy policy.
- ✅ **Duplicate-order block** and a **fraud checker** (courier success rate by phone). ⭐ OTP for risky COD orders.
- ✅ Saved guest addresses looked up by phone.

**Customer accounts**
- ✅ OTP login by mobile, password login, Google login.
- ✅ My orders, wishlist, payment history, **support tickets**, order tracking. ⭐ Tracking by order ID + phone with a status timeline and courier consignment ID; don't show "not found" before a search.

**Merchant back office (claimed in their plans)**
- ✅ Advanced order management, dispatch and returns, low-stock alerts.
- ✅ 5 couriers (Steadfast, Pathao, RedX, Paperfly, Carrybee) with booking, status sync and **COD settlement reconciliation**.
- ✅ Multi-warehouse inventory, multi-shop / multi-brand, outlet **POS**.
- ✅ Accounting and expenses, invoices, **production management** (manufacturing sellers).
- ✅ HRM: employees, **payroll**.
- ✅ CRM: customer profiles, segments, SMS campaigns, abandoned-cart offers, promotion engine.
- ✅ Reports: sales, profit, stock, orders, and **campaign ad profitability / true ad cost** (connect Meta Ads spend to orders).
- ✅ Call-centre integration: AI auto-call to confirm orders, IVR.
- 🆕 Unified inbox (Messenger, WhatsApp, Instagram, live chat). **Theirs is "coming soon"**, so this is our chance to ship it first, with order creation inside the chat.
- ✅ Shopify and WooCommerce two-way sync (lets merchants migrate *to* us, or use us as the back office).
- ✅ Android app for merchants (Growth and up), white-label customer apps (Enterprise).
- ✅ RBAC staff accounts with ৳/user overage.

**Platform and SaaS**
- ✅ Multi-tenant, with DB isolation per tenant, automated provisioning, automatic SSL for custom domains, and a CNAME checker.
- ✅ Plans limited by orders/month, SKUs, staff, warehouses and shops, with per-order overage billing.
- ✅ Monthly/yearly billing, upgrades and downgrades, a trial, a 7-day money-back guarantee.
- ✅ Status page, Meta data-deletion endpoint, legal pages.
- 🆕 Honest, consistent pricing (a single source of truth for both the cards and the table) and a working free trial with **OTP sign-up and a CAPTCHA**.
- 🆕 Real case studies, a blog, and a customer showcase (all of theirs are empty).
- 🆕 Proper pixel events out of the box (Meta CAPI, GA4 ecommerce, TikTok), where their demo sends only automatic events.

---

## 14. Suggested pricing positioning for us

Their entry point is ৳2,999/month for 1,500 orders and 500 SKUs, with accounting and inventory locked to ৳4,999+. Options to undercut or differentiate:
- A **free or low-cost starter** (for example ≤ 100 orders/month) to capture small Facebook sellers they currently ignore.
- Include **fraud check + incomplete orders + courier booking on every plan**, as they do, because that is table stakes in BD.
- **Don't lock inventory or accounting** behind the second tier. Gate by volume (orders, staff, warehouses) instead.
- Make the yearly discount match the label exactly (if it says "2 months free", charge for 10 months).
- Offer an **"orders included + ৳X per extra order" calculator** on the pricing page so sellers can estimate their bill.
