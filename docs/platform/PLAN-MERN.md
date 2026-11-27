# Build Plan — MERN Edition

Same multi-shop e-commerce platform for Bangladeshi sellers, built on MongoDB, Express, React and Node. Feature list: `FEATURES.md` (identical to the Laravel edition). Competitor teardown: `docs/competitor-ghorerbazar.md`.

Why MERN: one language (TypeScript) for API, admin, storefront and a future mobile app (React Native); flexible documents suit product variants, theme settings and page sections; strong for real-time admin features (live order feed).

> **Storefront note:** a plain React single-page app is bad for SEO and slow on first load on mobile data. The storefront therefore uses **Next.js** (React with server rendering). Admin stays a plain React app. This is still the MERN stack — React on the front, Node/Express API, MongoDB.

---

## 1. Tech stack

| Layer | Choice | Why |
|---|---|---|
| Language | **TypeScript** everywhere, Node.js 22 LTS | One language, shared types |
| Monorepo | **pnpm workspaces + Turborepo** | Shared code, one CI |
| API | **Express 5** + Zod validation (or NestJS if the team prefers structure) | Familiar, light |
| Database | **MongoDB 7** with Mongoose; replica set (needed for transactions) | Flexible documents; transactions for orders/stock |
| Cache / queues | **Redis** + **BullMQ** (+ Bull Board UI) | SMS, courier, pixel and email jobs |
| Storefront | **Next.js 15 (App Router)**, React Server Components, Tailwind CSS | SEO + fast first load; ISR caching per shop |
| Admin panel | **React 19 + Vite**, React Router, TanStack Query + Table, React Hook Form, shadcn/ui | Fast to build tables/forms |
| Search | MongoDB Atlas Search **or** **Meilisearch** (self-hosted) | Typo-tolerant, Bangla-friendly |
| Images | Upload to **Cloudflare R2**; resize with `sharp` in a queue job (WebP, several sizes) | Cheap, fast |
| Auth | JWT access + refresh tokens (httpOnly cookies) for admin; phone OTP for customers | |
| Roles | CASL (permission rules per shop role) | |
| Custom domains + SSL | **Caddy** on-demand TLS in front of Next.js and the API | Automatic certificates |
| Testing | Vitest (unit), Supertest (API), **Playwright** (checkout end-to-end) | |
| Code quality | ESLint, Prettier, `tsc --noEmit` in CI | |
| Deploy | Docker images, GitHub Actions → VPS (Docker Compose) at start; PM2 alternative | |
| Error tracking | Sentry | |

**BD integrations** live in `packages/integrations` behind interfaces, the same as the Laravel edition: `PaymentGateway` (bKash, Nagad, SSLCommerz, aamarPay), `CourierProvider` (Steadfast, Pathao, RedX), `FraudCheckProvider`, `SmsProvider` (BulkSMSBD, SSL Wireless, Alpha SMS). BD address data (divisions → districts → upazilas) seeded into a global collection.

---

## 2. Repository layout

```
platform-mern/
├─ apps/
│  ├─ api/              # Express API: /store/* (public), /admin/* (shop staff), /super/* , /webhooks/*
│  │  └─ src/modules/{shops,catalog,checkout,orders,payments,shipping,marketing,notifications,reports}
│  ├─ storefront/       # Next.js: resolves shop by host, renders theme
│  │  └─ themes/{default,fresh}/   # React section components per theme
│  ├─ admin/            # React + Vite shop admin (and super-admin routes)
│  └─ worker/           # BullMQ workers (SMS, courier sync, CAPI, image resize, backups)
├─ packages/
│  ├─ shared/           # Zod schemas + TS types used by all apps (Product, Order, …)
│  ├─ integrations/     # bkash, nagad, sslcommerz, steadfast, pathao, redx, sms providers
│  ├─ ui/               # shared React components (admin)
│  └─ config/           # eslint, tsconfig, tailwind presets
├─ docker/              # Caddyfile, compose files
└─ docs/
```

---

## 3. Multi-tenancy design

- `shops` and `domains` collections. Next.js **middleware** reads the `Host` header, looks up the shop (cached in Redis), and passes `shopId` to pages; unknown host → 404.
- API: `resolveShop` middleware for `/store/*` (by host header forwarded from Next.js) and by the logged-in staff member's selected shop for `/admin/*`.
- **Every shop-owned document has `shopId`** and a compound index starting with `shopId`. A Mongoose plugin automatically adds `{ shopId }` to every query and save, and throws if it is missing. Tests prove one shop can never read another's data.
- Files under `shops/{shopId}/…` on R2. Queue jobs carry `shopId`.
- Caddy on-demand TLS asks `GET /internal/domain-check?domain=…` before issuing a certificate.
- Big client later: give the shop its own database (connection chosen per shop) — possible because all access goes through the plugin.

---

## 4. Core data model (main collections)

```ts
Shop        { _id, name, slug, planId, status, settings, theme, createdAt }
Domain      { shopId, host, isPrimary, verifiedAt }
User        { name, phone, email, passwordHash, memberships: [{ shopId, role }] }
Category    { shopId, parentId, name, slug, image, sort, seo }
Brand       { shopId, name, slug, logo }
Product     { shopId, brandId, categoryIds[], name, slug, type: 'simple'|'variable'|'combo',
              description, flags[], status, seo, preorder: { enabled, eta },
              variants: [{ _id, sku, options: { size: '500g' }, price, oldPrice, costPrice, stock, weight }],
              comboItems: [{ productId, variantId, qty }], images[], ratingAvg, ratingCount }
Customer    { shopId, phone, name, email, stats: { orders, delivered, returned }, isBlocked, addresses[] }
District / Upazila (global)
DeliveryZone{ shopId, name, charge, expressCharge, districtIds[] }
Cart        { shopId, token, customerId, items[], updatedAt }   // TTL index
IncompleteOrder { shopId, phone, name, address, cart, lastSeenAt, status, orderId, notes }
Order       { shopId, number, customerId, status, items[ snapshot ], subtotal, deliveryCharge,
              discount, total, paid, due, payment: { method, plan }, address, note,
              source, utm, fraudScore, assignedTo, history: [{ status, userId, note, at }] }
Payment     { shopId, orderId, gateway, amount, trxId, status, payload }
Shipment    { shopId, orderId, courier, consignmentId, status, codAmount, payload }
Coupon, FlashSale { items[] }, Review, HomepageSection { type, style, settings, sort },
Page, Popup, LandingPage { blocks[] }, SearchLog, PixelEvent, SmsLog
```

Order placement uses a **MongoDB transaction**: check & decrement variant stock (and combo component stock), create order, mark incomplete order converted, apply coupon usage — all or nothing.

---

## 5. Build phases (1 full-time developer; ~11 weeks to sellable MVP)

MERN needs about one extra week compared with Laravel, because the admin panel is built by hand (no Filament equivalent).

| Phase | Weeks | Deliverables | Done when |
|---|---|---|---|
| **0. Foundation** | 1–1.5 | Monorepo, TS configs, CI (lint, typecheck, Vitest), Docker Compose (Mongo replica set, Redis), shop + domain models, tenant plugin + isolation tests, auth, BD address seed | Two demo shops on two local hosts show different data |
| **1. Catalogue + storefront** | 2–4 | Catalogue API; admin pages for categories, brands, products with variants and image upload; Next.js default theme: home (section builder v1), category with instant filters (URL-synced), product page, live search, cart sidebar, mobile bottom nav, CMS pages, SEO (metadata API, sitemap, JSON-LD) | A shop owner can add products and a visitor can browse on mobile fast |
| **2. Checkout + orders** | 5–6 | One-page checkout, district/upazila, delivery-zone engine, COD + manual payment, incomplete-order capture + admin inbox, order admin (filters, bulk actions, invoice PDF), manual order entry, SMS on order, tracking page, landing-page template | A real order goes from website → admin → SMS |
| **3. Payments + couriers + fraud** | 7–8 | bKash, SSLCommerz, partial advance; Steadfast/Pathao/RedX; fraud check; block list | Sandbox payment + courier booking end-to-end |
| **4. Marketing** | 9–10 | Meta Pixel + CAPI via worker, GA4, coupons, flash sales, combos, reviews, popups v1; live order feed in admin (WebSocket / SSE) | Deduplicated Purchase events in Events Manager |
| **5. SaaS readiness** | 11 | Super-admin, onboarding wizard, plans/limits, custom domains + Caddy TLS, backups (mongodump → R2), Sentry | New client shop live in < 1 hour |
| **6. After launch** | 12+ | More themes, Nagad, aamarPay, OTP login + accounts, reports, product feed, bulk SMS, **React Native app** reusing `packages/shared` | — |

---

## 6. Hosting & cost

| Stage | Setup | Approx. monthly |
|---|---|---|
| Staging + first 5–20 shops | 1 VPS (4 vCPU / 8 GB) with Docker Compose: Caddy, Next.js, API, worker, Redis; **MongoDB Atlas M10** or self-hosted Mongo replica set; Cloudflare; R2 | $25–80 |
| 20–100 shops | Separate API/worker and Next.js servers, Atlas M20+, Meilisearch VPS | $100–250 |

Node apps need a VPS (not shared cPanel hosting), so the MERN edition costs a bit more to run than Laravel at the start.

---

## 7. Security & quality checklist
Same as the Laravel plan: tenant isolation tests, signed + idempotent webhooks, rate limits (express-rate-limit + Redis), Turnstile only on checkout/login, consent text and generated privacy policy, no card data stored, `helmet` + strict CORS, input validated with Zod on every route, dependency audit in CI.

---

## 8. First tasks (week 1 checklist)
1. Create the monorepo (`pnpm`, Turborepo), apps `api`, `storefront`, `admin`, `worker`, packages `shared`, `integrations`, `config`.
2. Docker Compose with MongoDB replica set + Redis; `.env.example`.
3. Shop, Domain, User models; tenant Mongoose plugin; isolation tests.
4. Seed BD divisions/districts/upazilas.
5. Next.js middleware resolving shop by host; default theme layout (header, mobile bottom nav, footer).
6. Seed a demo shop from the organic-food demo data in the `demobizshop` repo.

---

## Laravel vs MERN — quick comparison

| | Laravel | MERN |
|---|---|---|
| Time to MVP (1 dev) | ~10 weeks | ~11 weeks |
| Admin panel | Filament (mostly generated) | Built by hand in React |
| SEO storefront | Blade (server-rendered) | Next.js (server-rendered) |
| Cheapest hosting | Shared cPanel/VPS works | Needs a VPS |
| Hiring in BD | Very easy | Easy |
| Mobile app later | Separate API work | Shares types/code with React Native |
| Same stack as getCommerce | Yes | No |
