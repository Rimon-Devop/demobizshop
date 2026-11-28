# Build Plan — Laravel Edition

> **Phases and priorities are defined in `ROADMAP.md`** (updated after the getCommerce teardown). The MVP phases below cover roadmap Phases 0–4; later phases (marketing tools, unified inbox, Hisab/POS, channels) follow ROADMAP §5.

Multi-shop e-commerce platform for Bangladeshi sellers, built on Laravel. Feature list: `FEATURES.md`. Competitor teardown: `docs/competitor-ghorerbazar.md`.

Why Laravel: the same stack as getCommerce, the most common PHP skill in Bangladesh (easy to hire), runs on cheap cPanel/VPS hosting, mature packages for admin panels, queues and payments.

---

## 1. Tech stack

| Layer | Choice | Why |
|---|---|---|
| Language / framework | PHP 8.3+, **Laravel 12** | Current LTS-style release line, long support |
| Database | **MySQL 8** (or MariaDB 10.11) | Available on every BD host |
| Cache / queue / sessions | **Redis** + **Laravel Horizon** | Fast queues for SMS, courier, pixel events |
| Admin panel (shop + super-admin) | **Filament 3** | Tables, forms, filters, bulk actions, roles out of the box — saves weeks |
| Storefront | **Blade + Alpine.js + Tailwind CSS** (+ Livewire for cart/filters/search) | Server-rendered = fast + SEO-friendly; Alpine for small interactions |
| Search | MySQL FULLTEXT (P1) → **Meilisearch** via Laravel Scout (P2) | Typo-tolerant, Bangla-friendly search later |
| Images | Spatie Media Library + Glide/Intervention; WebP; stored on **Cloudflare R2** (S3-compatible) | Cheap storage, no egress fees |
| Roles & permissions | spatie/laravel-permission (team = shop) | Staff roles per shop |
| Multi-tenancy | Single database, `shop_id` on every shop-owned table + global scope (see §3) | Simplest to run and back up |
| Custom domains + SSL | **Caddy** with on-demand TLS (asks our app "is this domain a shop?") | Automatic certificates for every client domain |
| Activity log | spatie/laravel-activitylog | Who changed what |
| Backups | spatie/laravel-backup → R2 | Daily |
| Testing | Pest + Laravel Dusk (browser tests for checkout) | |
| Code quality | Laravel Pint, Larastan (level 6+) | |
| CI/CD | GitHub Actions → deploy with Laravel Envoy / Deployer (zero-downtime) | |
| Error tracking | Sentry (free tier) | |

**BD integrations (own small service classes behind interfaces):**
- Payments: bKash Tokenized Checkout, Nagad, SSLCommerz, aamarPay — `PaymentGateway` interface
- Couriers: Steadfast, Pathao, RedX — `CourierProvider` interface (create parcel, get status, webhook)
- Fraud check: courier-history lookup by phone — `FraudCheckProvider` interface
- SMS: BulkSMSBD / SSL Wireless / Alpha SMS — `SmsProvider` interface (shop chooses provider + API key)
- Address data: all divisions → districts → upazilas/thanas, seeded from an open dataset (e.g. the `bangladesh-geocode` project), stored in our DB

---

## 2. Repository layout

```
platform-laravel/
├─ app/
│  ├─ Domain/                 # business logic, grouped by area
│  │  ├─ Catalog/             # Product, Variant, Category, Brand, Combo
│  │  ├─ Checkout/            # Cart, DeliveryCharge, IncompleteOrder, PlaceOrder action
│  │  ├─ Orders/              # Order, OrderItem, statuses, invoices
│  │  ├─ Payments/            # Gateways/{Bkash,Nagad,SslCommerz,AamarPay}, Payment
│  │  ├─ Shipping/            # Couriers/{Steadfast,Pathao,Redx}, Shipment, FraudCheck
│  │  ├─ Marketing/           # Coupon, FlashSale, Popup, PixelEvent, LandingPage
│  │  ├─ Notifications/       # Sms/{providers}, templates
│  │  └─ Shops/               # Shop, Domain, Plan, Settings, Theme, HomepageSection
│  ├─ Filament/
│  │  ├─ Admin/               # super-admin panel (/superadmin)
│  │  └─ Shop/                # shop panel (/admin), tenant-aware
│  ├─ Http/Controllers/Store/ # storefront controllers
│  └─ Livewire/Store/         # cart, filters, live search, checkout
├─ resources/views/themes/
│  ├─ default/                # theme = folder of Blade views + sections
│  │  ├─ layouts/  sections/  components/  pages/
│  └─ fresh/ …
├─ database/{migrations,seeders}/   # seeders: BD address data, demo shop
├─ routes/{web.php,store.php,webhooks.php,api.php}
├─ tests/{Feature,Unit,Browser}/
└─ docs/
```

---

## 3. Multi-tenancy design

- `shops` table; `domains` table (`host`, `shop_id`, `is_primary`, `verified_at`).
- Middleware `ResolveShop`: look up `request()->getHost()` in `domains` (cached in Redis) → bind `currentShop()`; 404 page if unknown.
- Trait `BelongsToShop` on every shop-owned model: adds a global scope `where shop_id = currentShop()->id` and fills `shop_id` on create. Tests check that one shop can never read another shop's data.
- Filament shop panel uses Filament's built-in tenancy (`->tenant(Shop::class)`), staff can belong to several shops.
- Files stored under `shops/{shop_id}/…` on R2.
- Queue jobs carry `shop_id` and restore the shop context before running.
- Caddy on-demand TLS calls `GET /internal/domain-check?domain=…` to allow a certificate only for registered domains.

Upgrade path if a big client needs isolation: move that shop to its own database with `stancl/tenancy` (keep `shop_id` columns so this is a config change, not a rewrite).

---

## 4. Core data model (main tables)

```
shops(id, name, slug, plan_id, status, settings JSON, theme, created_at)
domains(id, shop_id, host, is_primary, verified_at)
users(id, name, phone, email, password)          shop_user(shop_id, user_id, role)
categories(id, shop_id, parent_id, name, slug, image, sort, seo JSON)
brands(id, shop_id, name, slug, logo)
products(id, shop_id, brand_id, name, slug, type[simple|variable|combo], description,
         flags JSON, status, seo JSON, is_preorder, preorder_eta)
product_category(product_id, category_id)
variants(id, shop_id, product_id, sku, options JSON, price, old_price, cost_price, stock, weight)
combo_items(combo_product_id, variant_id, qty)
customers(id, shop_id, phone, name, email, total_orders, delivered, returned, is_blocked)
addresses(id, customer_id, district_id, upazila_id, line, …)
districts / upazilas (global, seeded)
delivery_zones(id, shop_id, name, charge, express_charge, district_ids JSON)
carts(id, shop_id, token, customer_id, items JSON, updated_at)
incomplete_orders(id, shop_id, phone, name, address JSON, cart JSON, last_seen_at,
                  status[open|called|converted|lost], order_id, notes)
orders(id, shop_id, number, customer_id, status, subtotal, delivery_charge, discount, total,
       paid, due, payment_method, payment_plan, district_id, upazila_id, address, note,
       source[web|landing|manual|whatsapp], utm JSON, fraud_score, assigned_to)
order_items(id, order_id, variant_id, name, options, price, qty)
order_status_history(id, order_id, status, user_id, note, created_at)
payments(id, shop_id, order_id, gateway, amount, trx_id, status, payload JSON)
shipments(id, shop_id, order_id, courier, consignment_id, status, cod_amount, payload JSON)
coupons(id, shop_id, code, type, value, min_order, max_uses, per_customer, starts_at, ends_at)
flash_sales(id, shop_id, name, starts_at, ends_at)   flash_sale_items(flash_sale_id, variant_id, price, qty_limit, sold)
reviews(id, shop_id, product_id, customer_id, rating, body, photos JSON, status)
homepage_sections(id, shop_id, type, style, settings JSON, sort, is_active)
pages(id, shop_id, slug, title, body, type[custom|policy])
popups(id, shop_id, type, content, targeting JSON, frequency, starts_at, ends_at)
landing_pages(id, shop_id, slug, product_id, blocks JSON)
search_logs(id, shop_id, query, results_count, created_at)
pixel_events(id, shop_id, event, event_id, payload JSON, sent_at, response)  # CAPI log
sms_logs(id, shop_id, to, template, body, provider, status, cost)
```

---

## 5. Build phases (1 full-time developer; ~10 weeks to sellable MVP)

| Phase | Weeks | Deliverables | Done when |
|---|---|---|---|
| **0. Foundation** | 1 | Repo, CI (Pint, Larastan, Pest), Docker dev env (Sail), Filament installed, auth, `shops`/`domains`, `ResolveShop`, `BelongsToShop` + isolation tests, BD address seed | Two demo shops on two local domains show different data |
| **1. Catalogue + storefront** | 2–3 | Categories, brands, products, variants, images, flags; default theme: home (section builder v1), category with Livewire filters, product page, live search, cart sidebar, mobile bottom nav, CMS pages, SEO basics | A shop owner can add products and a visitor can browse on mobile fast |
| **2. Checkout + orders** | 4–5 | One-page checkout, district/upazila, delivery-zone engine, COD + manual payment, incomplete-order capture + admin inbox, order admin (filters, bulk status, invoice print), manual order entry, SMS on order, tracking page, landing-page template | A real order goes from website → admin → SMS to customer |
| **3. Payments + couriers + fraud** | 6–7 | bKash, SSLCommerz, partial advance; Steadfast (then Pathao, RedX) booking + status sync; fraud check on order screen; block list | Paid order and courier booking work end-to-end in sandbox |
| **4. Marketing** | 8–9 | Meta Pixel + CAPI (queued, event_id dedup), GA4, coupons, flash sales with countdown, combos from real SKUs, reviews, popups v1 | Facebook Events Manager shows deduplicated Purchase events |
| **5. SaaS readiness** | 10 | Super-admin panel, onboarding wizard, plans/limits, custom domain + Caddy TLS, backups, Sentry, docs for adding a shop | New client shop live on their domain in < 1 hour |
| **6. After launch** | 11+ | More themes, Nagad, aamarPay, Meilisearch, OTP login, customer accounts, reports, product feed, bulk SMS, wallet | — |

Each phase ends with: tests green, deployed to staging, a short demo video for clients.

---

## 6. Hosting & cost (start small)

| Stage | Setup | Approx. monthly |
|---|---|---|
| Staging + first 5–20 shops | 1 VPS (4 vCPU / 8 GB, e.g. Hetzner/DigitalOcean/Contabo) running Caddy, PHP-FPM, MySQL, Redis, Horizon; Cloudflare in front; R2 for files | $15–40 |
| 20–100 shops | Split: app server(s) + managed MySQL + Redis; Meilisearch on its own small VPS | $60–150 |

Domains are bought by each client in their own name (matches our pricing). We point them to our server with one DNS record.

---

## 7. Security & quality checklist
- Every shop-owned query scoped by `shop_id`; automated tests prove isolation.
- Payment and courier webhooks: verify signatures, idempotent handlers, log raw payloads.
- Rate limits on checkout, OTP, tracking and live search; reCAPTCHA/Turnstile only on checkout and login.
- Personal data: incomplete-order consent text; privacy policy generated with pixel + abandoned-checkout clauses; delete-my-data request.
- Never store card data (gateways host the card form).
- Licensed packages only — no nulled themes/plugins.

---

## 8. First tasks (week 1 checklist)
1. `laravel new platform-laravel` (Pest, MySQL, Redis), add Sail, Pint, Larastan, GitHub Actions.
2. Install Filament 3 with two panels: `/superadmin` and `/admin` (tenant = Shop).
3. Migrations: shops, domains, users, shop_user; `ResolveShop` middleware; `BelongsToShop` trait; isolation tests.
4. Seed BD divisions/districts/upazilas.
5. Default theme skeleton (Tailwind + Alpine + Livewire) with layout, header, mobile bottom nav, footer.
6. Seed a demo shop using the organic-food demo data from the `demobizshop` repo.
