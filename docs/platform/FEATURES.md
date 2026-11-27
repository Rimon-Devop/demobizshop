# Platform Feature Spec (shared by the Laravel and MERN builds)

**What we are building:** a multi-shop e-commerce platform for Bangladeshi sellers. One codebase runs many shops; each shop gets its own domain, theme, products, orders and settings. We set up a new client's shop in about an hour and charge a setup fee plus a monthly fee — the same model getCommerce uses for ghorerbazar.com.

**Sources:** `docs/competitor-ghorerbazar.md` (full teardown). Rule: copy features and flows, never another store's name, logo, photos, text or exact design.

Priority: **P1** = MVP (needed to sell to the first client) · **P2** = soon after · **P3** = later.

---

## 1. Platform & shops (multi-tenant)
| Feature | Pri |
|---|---|
| One codebase, many shops; shop is resolved from the request domain | P1 |
| Free subdomain per shop (`shopname.ourplatform.com`) + custom domain with automatic SSL | P1 |
| Super-admin panel: create shop, assign plan, suspend, log in as shop owner (impersonate, logged) | P1 |
| Shop staff roles: Owner, Manager, Order handler, Call-centre agent (permissions per role) | P1 |
| Plans & limits (products, staff, storage); monthly billing reminder via SMS/email | P2 |
| Shop onboarding wizard: name, logo, colours, phone, WhatsApp, delivery charges, payment methods | P2 |
| Daily backups per shop; export products/orders to CSV/Excel | P2 |
| Audit log (who changed price, who cancelled order) | P2 |

## 2. Catalogue
| Feature | Pri |
|---|---|
| Products with **real variants** (size/weight/colour), each variant with its own price, stock, SKU | P1 |
| Categories (nested), brands, product flags: Best Selling, New Arrival, Trending, Offer, Free Delivery, Pre-order | P1 |
| Image gallery; uploads auto-resized to several sizes (WebP) and served from CDN | P1 |
| Rich description (Bangla + English), short description, SEO title/description per product | P1 |
| Stock tracking, low-stock alert, "out of stock" / "pre-order" states | P1 |
| Auto "Save X%" / "Save ৳X" badge from old price | P1 |
| **Combos built from real products** (stock deducted from each item; contents listed on the page) | P2 |
| Bulk import/export (CSV), bulk price update | P2 |
| Related products (same category) and "frequently bought together" | P2 |
| Reviews with photos, star rating, verified-buyer badge, admin moderation | P2 |

## 3. Storefront
| Feature | Pri |
|---|---|
| Mobile-first, Bangla-first, fast (target: LCP < 2.5 s on 4G, page < 500 KB) | P1 |
| Homepage **section builder**: slider, banners, category carousel, product rows by category/flag, testimonials, brands — admin picks, orders and styles each section | P1 |
| 3+ themes (header/footer/card styles), colours via CSS variables | P1 (1 theme), P2 (3+) |
| Category page with **instant (AJAX) filters**: sub-category, price range, brand, flag; filter chips; sort; URL kept in sync | P1 |
| Product page: 2-column on desktop, buy box above the fold, sticky add-to-cart bar, variant picker, qty, Add to cart / Buy now / **Order on WhatsApp** (product name + link pre-filled) / **Call for order** | P1 |
| Delivery estimate + delivery charge + return policy shown near the buy box | P1 |
| Live search: products + categories + brands, Bangla & English, typo-tolerant; search term shown on results page; queries logged | P1 (basic), P2 (typo-tolerant) |
| Cart sidebar: qty ±, remove, **free-delivery progress bar**, coupon, contextual upsell | P1 |
| Mobile bottom nav (Home / Categories / Cart / Search / Account); floating WhatsApp/Call that never covers buttons | P1 |
| Wishlist, recently viewed | P2 |
| Single-product **sales landing pages** (for Facebook ads) with built-in order form | P1 |
| Popups manager: centre / corner / full-screen; page targeting; frequency caps; exit intent; coupon popups | P2 |
| CMS pages (About, Policies, FAQ as accordion); **policy pages generated from shop settings** so they never contradict checkout | P1 |
| SEO: per-page titles/meta, breadcrumbs with category, schema.org Product/Offer/Breadcrumb, sitemap.xml, clean slugs (Bangla allowed) | P1 |

## 4. Checkout & orders
| Feature | Pri |
|---|---|
| **Guest checkout on one page**: name, phone (BD 11-digit validation, +88), optional email, address, **District → Upazila/Thana** dropdowns (all 64 districts pre-loaded), note | P1 |
| Address preview; returning customer's saved address found by phone | P2 |
| **Delivery-charge engine**: zones (Inside Dhaka / Dhaka suburbs / Outside Dhaka / custom), express option per zone, free-delivery threshold, per-product extra charge (heavy items); shows "from ৳60" before a district is chosen | P1 |
| **Incomplete-order capture**: draft saved once a valid phone is entered (debounced), heartbeat while on page, marked converted on order; consent text under phone field | P1 |
| Terms checkbox **not** pre-ticked | P1 |
| Mobile: sticky "Place order" bar **showing the total** | P1 |
| Order statuses: Pending → Confirmed → Packed → Shipped (courier) → Delivered / Returned / Cancelled; history with who/when | P1 |
| Admin order list: filters, search by phone, bulk status change, print invoice & courier label | P1 |
| Manual order entry (for Facebook/phone orders) by staff | P1 |
| Order tracking page: order ID + phone, status timeline, courier + consignment ID; **no error before searching** | P1 |
| Pre-order products (advance payment required, ETA per product) | P2 |
| Order notes, tags, assign to staff | P2 |

## 5. Payments
| Feature | Pri |
|---|---|
| Cash on Delivery (on/off per shop, per product, max order value) | P1 |
| **bKash** (Tokenized Checkout) | P1 |
| **Nagad** | P2 |
| **SSLCommerz** and/or **aamarPay** (cards, all wallets, net banking) | P2 |
| **Partial advance**: % (e.g. 50/75/100) or fixed (e.g. delivery charge upfront); optional discount for paying more | P2 |
| Manual payment (customer sends money, enters TrxID; staff verifies) | P1 |
| Refunds recorded against order; wallet / store credit | P3 |

## 6. Delivery & fraud
| Feature | Pri |
|---|---|
| One-click booking with **Steadfast**, **Pathao**, **RedX**; consignment ID saved; status synced by webhook/polling | P2 (Steadfast in P1) |
| **Fraud check by phone**: customer's courier delivery success ratio shown on the order before confirming | P1 |
| Block list (phone/IP), OTP for high-value COD orders, auto-flag repeat cancellers | P2 |

## 7. Marketing & analytics
| Feature | Pri |
|---|---|
| Pixel manager: **Meta Pixel + Conversions API (server-side, event_id dedup)**, GA4, GTM, TikTok Pixel, Google Ads | P1 (Meta + GA4), P2 (rest) |
| Standard events: ViewContent, AddToCart, InitiateCheckout, Purchase | P1 |
| Coupons: % / fixed / free delivery; min order; usage limits; per-customer limit; expiry | P1 |
| **Flash sales**: start/end time, countdown on strip/card/page, sold-X-of-Y bar, auto revert; hidden when none live | P2 |
| SMS: order placed / confirmed / shipped (with tracking link) / delivered; bulk SMS campaigns | P1 (transactional), P2 (campaigns) |
| Abandoned-checkout follow-up (SMS/WhatsApp template from incomplete orders) | P2 |
| Product feed for Facebook/Google catalogue | P2 |

## 8. Reports
| Feature | Pri |
|---|---|
| Dashboard: today's orders, sales, pending, delivered, return rate | P1 |
| Sales by day/product/category; courier delivery & return rate; top customers | P2 |
| Search-query report (incl. zero-result searches) | P2 |
| Profit report (cost price → hooks into "Hisab" accounting product later) | P3 |

## 9. Customer accounts
| Feature | Pri |
|---|---|
| Optional login by **phone + OTP** (no password needed) | P2 |
| Order history, saved addresses, wishlist | P2 |

## 10. Later products on the same platform
POS for physical shops · Hisab (accounting/due book) · mobile app (same API) · multi-vendor marketplace · AI ad-video ordering inside admin.

---

## getCommerce: what we know & what to check

**Known (from ghorerbazar.com):** `<meta name="generator" content="getCommerce 3.0.0">`; Laravel + Blade + jQuery + Bootstrap; Wolmart-style theme; admin-selectable section styles (header style-7, hero style-7, card style-6, footer style-3); colours from CSS variables; jStorage client cart synced to server; route list in §4 of the teardown.

**Not found yet:** the vendor, its website, pricing, admin panel. A web search for "getCommerce" found nothing relevant.

**Research checklist (run in the local Chrome session):**
1. On ghorerbazar.com, look for "Developed by / Powered by" in the footer, `/humans.txt`, `/robots.txt`, `/sitemap.xml`, and HTML comments.
2. Search Facebook and Google for "getCommerce" + Bangladesh, "getcommerce.com.bd", "getcommerce.xyz", and the phrase in the generator tag.
3. Find 3–5 other stores with the same generator tag (search the exact `getCommerce 3.0.0` string, or check stores that share the same theme/routes).
4. If a vendor site exists: pricing, plans, setup fee, feature list, admin demo, themes, payment/courier integrations, support terms.
5. Record everything in `docs/competitor-getcommerce.md` with the same format as the ghorerbazar teardown.
