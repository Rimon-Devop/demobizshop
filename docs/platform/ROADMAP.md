# Platform Roadmap — multi-shop e-commerce SaaS for Bangladeshi sellers

**Status:** plan, ready to build · **Last updated:** 28 Nov 2026
**Read with:** `FEATURES.md` (feature list), `PLAN-LARAVEL.md` and `PLAN-MERN.md` (stack-specific build plans),
`../competitor-ghorerbazar.md` (a live store on getCommerce 3.0.0), `../competitor-getcommerce.md` (the SaaS itself),
`../research/bizgrow/report.md` (8 storefront design families) and the working theme demos in `../../demos/`.

Working product name in this document: **"the Platform"** (brand to be decided).

---

## 1. What we are building and why we can win

A SaaS that gives a Bangladeshi seller a complete online business in one place: a fast storefront and landing pages, plus the
**operations stack that BD COD commerce actually runs on** — incomplete-order capture, fraud check, courier booking and COD
reconciliation, call confirmation, ad-cost profitability, inventory and accounts.

getCommerce proved the model (৳2,999–15,000/month, Laravel, database per store). Their weak spots are our opening:

| Their weakness (from the teardowns) | Our answer |
|---|---|
| Unified Inbox "coming soon" | Ship Messenger/WhatsApp/Instagram inbox **with order creation in the chat** (Phase 6) |
| Pricing cards and comparison table contradict each other; yearly maths wrong | One pricing config feeds the cards, table, invoices and limits; "2 months free" means 10× monthly |
| Only 1 of 6 templates has a live preview | Every theme has a live demo + "Start with this template" (we already have 20 demos) |
| Inventory and accounting locked to ৳4,999+ | Gate by volume (orders, staff, warehouses), not by core features |
| Platform bugs on every store: "Order Not Found" before search, "1–25 of 0 results", flash sale without timer, pre-ticked terms | Built-in quality rules + automated browser tests on every theme |
| Fixed gadget attribute set (SIM, Region) on clothing | Merchant-defined attributes, variant image swap, disabled impossible combinations |
| Demo stores full of lorem ipsum and a famous brand's logo | Clean, realistic demo data; trademark-free assets |
| Sign-up OTP off, no CAPTCHA | Phone OTP + Turnstile on sign-up from day one |
| Empty blog, empty customer showcase | Case studies from our first agency clients (we already build their sites) |
| No small-seller tier | A low-cost "Starter Lite" for ≤ 150 orders/month (Facebook sellers they ignore) |

**Go-to-market advantage:** we already sell websites (WooCommerce, ৳5–10k). Every agency client is a future Platform customer and a case study.

---

## 2. Key decisions (made — change only with a written reason)

| # | Decision | Choice | Why |
|---|---|---|---|
| D1 | Primary stack | **Laravel 12** (`PLAN-LARAVEL.md`) as the main product; **MERN** (`PLAN-MERN.md`) built in parallel as a second track (separate repo) | Laravel: fastest to MVP (Filament admin), same stack as the competitor, easiest hiring. MERN: shared types with a React Native app later. Both follow this roadmap and `FEATURES.md`. |
| D2 | Tenancy | **Shared database + `shop_id` on every row** for Starter/Growth; **isolated database per shop** as a paid option for Scale+/Enterprise | Isolation is a selling point ("isolated sandbox"), but DB-per-tenant for every small shop multiplies migrations, backups and cost. Design the code so a shop can be moved to its own DB without code changes (all access through the tenant scope). |
| D3 | Storefront rendering | Server-rendered themes (Blade on Laravel, Next.js on MERN) driven by a **theme config** like `demos/kit` (tokens + header/hero/card/checkout variants + section list) | Proven in our 20 demos; one engine, many designs; fast on 4G; SEO-friendly. |
| D4 | Admin UI | Laravel: **Filament 3**. MERN: React + shadcn/ui | Speed. |
| D5 | Identity | Phone-first (BD numbers normalised to `8801XXXXXXXXX`), OTP; email optional | BD sellers and buyers live on phone/WhatsApp. |
| D6 | Money | Store amounts as integer **poisha** (৳ × 100); BDT only at launch | No rounding bugs in partial payments and COD settlement. |
| D7 | Domains & SSL | Free `shop.<platform>.com` subdomain + custom domain via CNAME; **Caddy on-demand TLS**; built-in CNAME checker | Same as competitor, automated. |
| D8 | Integrations | Every external service behind an interface: `PaymentGateway`, `CourierProvider`, `FraudCheckProvider`, `SmsProvider`, `AdsProvider`, `ChannelProvider` | Swap providers per shop; test with fakes. |
| D9 | Events | Every business action emits a domain event (OrderPlaced, OrderConfirmed, ShipmentBooked, …) on a queue | Feeds SMS, pixels/CAPI, reports, webhooks, inbox notifications. |
| D10 | Quality bar | Each theme passes automated checks (no horizontal scroll at 390 px, no console errors, checkout completes, tracking empty-state correct, terms not pre-ticked) | Avoid the competitor's platform-wide bugs. |

---

## 3. Plans & pricing (single source of truth)

All limits and prices live in one config (DB table `plans` + seed file). The pricing page, comparison table, billing and
limit checks all read it. **Draft numbers** — validate with 10 sellers before launch:

| | Starter Lite | Starter | Growth | Scale | Enterprise |
|---|---|---|---|---|---|
| Price / month | ৳999 | ৳2,499 | ৳4,499 | ৳8,999 | Custom |
| Orders / month included | 150 | 1,500 | 3,500 | 8,000 | Custom |
| Extra order | ৳2 | ৳1.2 | ৳1.1 | ৳1 | — |
| Products (SKUs) | 100 | 1,000 | 3,000 | 10,000 | Unlimited |
| Staff included (extra ৳200/user) | 1 | 3 | 8 | 20 | Custom |
| Warehouses / shops | 1 / 1 | 1 / 1 | 2 / 2 | 5 / 5 | Custom |
| Storefront, themes, landing pages, Easy & Pop-up checkout | ✓ | ✓ | ✓ | ✓ | ✓ |
| Incomplete orders, fraud check, duplicate block, courier booking | ✓ | ✓ | ✓ | ✓ | ✓ |
| Inventory + basic accounts (Hisab) | ✓ | ✓ | ✓ | ✓ | ✓ |
| Ad-cost profitability, promotion engine, SMS automation | — | ✓ | ✓ | ✓ | ✓ |
| Unified inbox (Messenger / WhatsApp / IG) | — | — | ✓ | ✓ | ✓ |
| Outlet POS, multi-warehouse, production | — | — | — | ✓ | ✓ |
| Isolated database, white-label app, SLA | — | — | — | — | ✓ |

Rules: yearly = 10 × monthly (honest "2 months free"); 7-day money-back; no setup fee for self-serve (agency setup sold separately);
a **bill estimator** on the pricing page (orders/month → monthly cost); a **plan finder** (pick needs → matching plans highlighted).

Add-ons: call-centre (AI auto-call/IVR), extra SMS packs, isolated DB, custom theme, migration from Shopify/WooCommerce.

---

## 4. System architecture

```
Marketing site        platform.com                      pages, pricing (from plans config), templates with live demos,
                                                         free tools, blog, case studies, status, legal
Merchant portal       app.platform.com                  sign-up (phone OTP + Turnstile), onboarding wizard, billing,
                                                         admin panel (orders, products, couriers, reports, inbox …)
Super admin           app.platform.com/superadmin       shops, plans, invoices, impersonation (logged), feature flags,
                                                         platform health
Storefronts           {shop}.platform.com | custom      theme engine (config + sections), checkout, landing pages,
                      domain (CNAME, auto SSL)           customer accounts, tracking
Public API            api.platform.com/v1               storefront API (headless/Next.js, mobile apps), merchant API,
                                                         webhooks out
Workers               queue workers + scheduler         SMS, pixels/CAPI, courier sync, channel sync, invoices, backups,
                                                         incomplete-order follow-ups, report rollups
Data                  MySQL (or Mongo on MERN) + Redis  shared DB with shop_id; isolated DB option; R2 for media
Observability         Sentry, uptime checks, /status    per-component health (storefront, portal, workers, couriers)
```

Folder layouts, packages and data models: `PLAN-LARAVEL.md` §2–4 and `PLAN-MERN.md` §2–4.

---

## 5. Roadmap by phase

Durations assume **2 full-time developers + 1 part-time designer/QA**. With 1 developer, roughly double them.
Each phase ends with: tests green, deployed to staging, a 2-minute demo video, and the phase checklist below ticked.

### Phase 0 — Foundation (weeks 1–2)
- Repo, CI (lint, static analysis, tests), Docker dev environment, staging server, Sentry.
- Tenancy: `shops`, `domains`, tenant resolution by host, `shop_id` scope + **isolation tests**.
- Auth: phone OTP (SMS provider interface + fake), staff roles (Owner, Manager, Order handler, Call agent).
- BD address data: 8 divisions, 64 districts, ~495 upazilas/thanas (seed from an open dataset).
- Money type (poisha), plans config table, feature flags.
- **Exit:** two shops on two local domains show different data; isolation tests pass.

### Phase 1 — Catalogue & storefront (weeks 3–6)
- Products with merchant-defined attributes and variants (price/stock/SKU/image per combination); categories, brands, flags; media pipeline (WebP sizes, R2).
- Theme engine ported from `demos/kit`: tokens + header/hero/card/title/category/checkout variants + homepage **section builder** (drag to order, per-section settings).
- First 4 themes ported from demos: Fresh Green Bazar, Gadget Mart (3 presets), Royal Boutique, Atelier.
- Category pages with AJAX filters + chips; live search (products + categories + brands, Bangla/English); product page (2-column, sticky add-to-cart, WhatsApp/Call order, share); cart sidebar (free-delivery bar, contextual upsell) + cart page.
- CMS pages, **policy pages generated from settings**, SEO (titles, meta, JSON-LD Product/Breadcrumb, sitemap).
- **Exit:** a demo shop indistinguishable from our best static demo, Lighthouse mobile ≥ 85, no horizontal scroll at 390 px.

### Phase 2 — Checkout, orders, incomplete orders (weeks 7–10)
- **Easy Checkout** (one page, guest) and **Pop-up Checkout** (modal from product/landing page); district → thana; address preview; store pickup (hides address); express option.
- Delivery-rule engine: zones, district, weight, order value, free-delivery threshold, per-product surcharge; "from ৳X" before district chosen.
- Payments: COD, manual bKash/Nagad (TrxID), **bKash Tokenized**; partial advance (%, fixed, "delivery charge upfront") with optional discount.
- Coupons / gift vouchers.
- **Incomplete-order capture** (capture → heartbeat → placed), consent text, admin inbox with call status and one-click convert.
- **Duplicate-order block** (same phone + items within N minutes) and **fraud check** panel on the order screen (courier success ratio by phone).
- Order management: statuses with history, bulk actions, invoice + label print, manual order entry (Facebook/phone orders), notes/tags/assignee.
- Customer tracking page: order ID + phone, timeline, courier + consignment ID; correct empty state.
- Transactional SMS (placed, confirmed, shipped with tracking link).
- Landing-page builder v1 (blocks from our `landing` and `landing-offer` demos).
- **Exit:** a real order flows web → admin → SMS; incomplete order converts from the inbox; all theme checkouts pass browser tests.

### Phase 3 — Couriers, COD settlement & customer accounts (weeks 11–13)
- Courier integrations: **Steadfast, Pathao, RedX** first, then **Paperfly, Carrybee**: booking, bulk booking, label, status webhooks/polling.
- **COD settlement reconciliation**: import courier payouts, match to orders, show short-paid/returned, mark settled.
- Returns & dispatch workflow (return received → restock / damage).
- Customer accounts: OTP login (+ Google optional), my orders, wishlist, saved addresses, payment history, support tickets.
- More gateways: **SSLCommerz** / aamarPay, Nagad; DGpay/EPS later on demand.
- **Exit:** 100 sandbox orders booked to a courier, statuses sync automatically, settlement report balances.

### Phase 4 — SaaS launch (beta) (weeks 14–16)
- Marketing site: home, features (real pages, not "book a demo" everywhere), **templates with live demos + "Start with this template"**, pricing from config with plan finder + bill estimator, FAQ, contact (phone-first, topic chips), demo booking (time-slot chips).
- Self-serve sign-up (OTP + Turnstile) → onboarding wizard (name, logo, colours, theme, delivery charges, payments, first product) → store live on subdomain.
- Billing: plan limits, usage metering (orders, staff, SKUs), overage, invoices, bKash/SSLCommerz subscription payments, trial, upgrade/downgrade next cycle, suspension on non-payment with grace period.
- Custom domain wizard with CNAME checker; Caddy on-demand TLS.
- Super admin: shops, plans, invoices, impersonation log, feature flags.
- Status page, backups per shop, data export, legal pages (terms, privacy incl. pixels & incomplete orders, data deletion).
- **Exit:** 10 beta shops (our agency clients) live on real domains; zero cross-tenant data incidents.

### Phase 5 — Marketing & growth tools (weeks 17–20)
- Pixel manager: **Meta Pixel + Conversions API** (server-side, event_id dedup), GA4 ecommerce, TikTok, Google Ads — configured once, correct events on every theme.
- **Ad-cost profitability**: connect Meta Ads (read-only), map campaigns/UTMs to orders, show cost per order, true profit after COD returns.
- Promotion engine (buy X get Y, tiered discounts, free delivery rules), **real flash sales** (schedule, countdown, stock bar, auto revert), combos from real SKUs, pre-orders, reward points, wallet/store credit.
- CRM: customer profiles, segments, SMS/WhatsApp campaigns, abandoned-cart offers.
- Web popups (centre/corner/full, targeting, frequency caps, exit intent), newsletter.
- Reviews with photos, verified buyer, % recommended.
- **Exit:** a beta merchant sees ad spend vs profit per campaign; CAPI events match in Events Manager.

### Phase 6 — Unified inbox (weeks 21–24) — our headline differentiator
- Meta app review (Facebook Login, Pages messaging, Instagram, WhatsApp Business Platform), data-deletion callback + status URL.
- Inbox: Messenger, Instagram DM, WhatsApp, website live chat in one place; assign to staff; saved replies; **create order from chat** (product picker, address, delivery charge, payment link); customer history beside the chat.
- Comment-to-DM auto replies for Facebook posts; order-status replies.
- **Exit:** a merchant takes an order from a Messenger chat without leaving the inbox.

### Phase 7 — Back office: inventory, Hisab (accounts), POS (weeks 25–30)
- Multi-warehouse stock, transfers, purchase orders, suppliers, low-stock alerts, stock reports.
- **Hisab:** income/expense, cash & bank & mobile-wallet accounts, COD receivable, supplier payable, due book (baki khata), daily P&L, simple VAT-ready invoices.
- Outlet POS (web, works on a tablet; barcode; receipt printer; same stock).
- Production management (raw materials → finished goods) for manufacturing sellers.
- HRM basics: employees, attendance, payroll.
- **Exit:** a shop runs online + one outlet from one stock and closes the day in Hisab.

### Phase 8 — Channels, apps & ecosystem (weeks 31–36)
- **Shopify & WooCommerce sync** (import products/orders/stock; two-way sync) — also our migration tool for agency clients.
- Merchant Android app (orders, inbox, notifications) — React Native (shares types with the MERN track).
- Call-centre add-on: AI auto-call order confirmation, IVR routing (partner or build).
- Courier-intelligence add-on (our own fraud/delivery-success network across shops, privacy-safe).
- White-label customer app for Enterprise; public API + outgoing webhooks; isolated-DB option.
- Free tools for SEO/lead-gen: delivery-charge calculator, COD fraud check, Bangla product-description writer, invoice maker, CNAME checker.

### Ongoing
- Port the remaining 8 demo themes; one new theme per month; theme browser tests in CI.
- Monthly security review; quarterly restore test of backups.

---

## 6. Milestones & targets

| Milestone | When | Target |
|---|---|---|
| M1 Internal alpha | end of Phase 2 (wk 10) | Our own demo shops take real test orders |
| M2 Closed beta | end of Phase 4 (wk 16) | 10 agency clients live; ≥ 300 real orders/week processed |
| M3 Public launch | end of Phase 5 (wk 20) | Self-serve sign-up open; 50 paying shops in 60 days |
| M4 Inbox launch | end of Phase 6 (wk 24) | 30% of Growth shops use the inbox weekly |
| M5 Back-office | end of Phase 7 (wk 30) | 20 shops using Hisab/POS |
| M6 Ecosystem | end of Phase 8 (wk 36) | Shopify/Woo migrations offered; Android app in Play Store |

Business KPIs: trial → paid ≥ 25%; monthly churn ≤ 4%; average orders/shop/month; support tickets per 100 orders.

---

## 7. Team & roles

| Role | Phase 0–4 | Phase 5–8 |
|---|---|---|
| Lead developer (backend + architecture) | 1 | 1 |
| Developer (frontend themes + admin) | 1 | 1–2 |
| Designer / QA (part-time) | 0.5 | 0.5 |
| Customer success (onboarding, calls) | — | 1 (from beta) |
| Founder: sales, agency clients, pricing, partnerships | ✓ | ✓ |

Claude Code sessions can take a large share of implementation; keep humans on review, integrations testing with real accounts, and customer contact.

---

## 8. Risks & mitigations

| Risk | Mitigation |
|---|---|
| Courier/payment APIs change or are unreliable | Provider interfaces, sandbox tests, status page component per provider, manual fallback |
| Meta app review delays the inbox | Start the review in Phase 4; ship live chat + WhatsApp Cloud API first |
| Cross-tenant data leak | Tenant scope everywhere, isolation tests in CI, no raw queries without scope, quarterly audit |
| Fake sign-ups / abuse | OTP + Turnstile, rate limits, manual approval for custom domains in beta |
| Price war with getCommerce | Compete on honesty, inbox, design quality, agency service; don't race to the bottom |
| Personal data (phones, addresses) | Consent text, privacy policy, retention rules for incomplete orders (auto-delete after 30 days unconverted), encrypted backups |
| Scope creep | This roadmap is the contract; new ideas go to a backlog and are scheduled at phase boundaries |

---

## 9. How to start in a new repository (handoff)

1. Create the repo (`platform-laravel` for the main track, `platform-mern` for the second track).
2. Copy into its `docs/`: `ROADMAP.md`, `FEATURES.md`, the matching `PLAN-*.md`, both competitor reports and `research/bizgrow/report.md`.
3. Copy `demos/kit/`, `demos/data/`, `demos/assets/img/` and a few demo folders into `docs/reference/demos/` as the visual reference for the theme engine.
4. Start a Claude Code session in that repo with the prompt in `START-NEW-REPO.md`.
5. Work phase by phase; open one pull request per phase section (e.g. "Phase 0: tenancy"), each with tests.
