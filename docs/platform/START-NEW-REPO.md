# Prompt to start the platform in a new repository

Paste the block for your track into a new Claude Code session that has the new repository attached.
First copy the files listed in `ROADMAP.md` §9 into the new repo's `docs/` folder (or ask the session to copy them from `Rimon-Devop/demobizshop`).

---

## Laravel track (`platform-laravel`)

```
We are building a multi-shop e-commerce SaaS for Bangladeshi sellers (like getCommerce, but better).
Read these first, in order, and treat them as the source of truth:
  docs/ROADMAP.md            (phases, decisions D1–D10, pricing, milestones)
  docs/FEATURES.md           (feature list with priorities)
  docs/PLAN-LARAVEL.md       (stack, folder layout, data model)
  docs/competitor-getcommerce.md and docs/competitor-ghorerbazar.md (what to match and what to beat)
  docs/research/bizgrow/report.md and the demos in docs/reference/demos (storefront themes to port)

Then start Phase 0 from ROADMAP.md §5:
  - Laravel 12, Pest, Pint, Larastan, Docker (Sail), GitHub Actions CI
  - Filament 3 with /superadmin and /admin (tenant = Shop)
  - shops + domains tables, ResolveShop middleware, BelongsToShop trait, and tests proving one shop can never read another's data
  - phone OTP auth behind an SmsProvider interface (with a fake for tests), staff roles
  - money stored as integer poisha; plans config table; BD divisions/districts/upazilas seed
Work in small commits, run the tests after each step, and open one pull request for Phase 0 when its exit criteria pass.
Ask me before choosing paid services or anything that costs money.
```

## MERN track (`platform-mern`)

```
We are building a multi-shop e-commerce SaaS for Bangladeshi sellers (like getCommerce, but better).
Read these first, in order, and treat them as the source of truth:
  docs/ROADMAP.md, docs/FEATURES.md, docs/PLAN-MERN.md,
  docs/competitor-getcommerce.md, docs/competitor-ghorerbazar.md,
  docs/research/bizgrow/report.md and the demos in docs/reference/demos

Then start Phase 0 from ROADMAP.md §5 using the MERN stack in PLAN-MERN.md:
  - pnpm + Turborepo monorepo: apps/api (Express 5 + Zod), apps/storefront (Next.js), apps/admin (React + Vite), apps/worker (BullMQ), packages/shared, packages/integrations
  - Docker Compose with a MongoDB replica set + Redis; TypeScript strict; ESLint; Vitest; GitHub Actions CI
  - Shop + Domain models, host-based shop resolution, a Mongoose tenant plugin that forces shopId on every query, and tests proving isolation
  - phone OTP auth behind an SmsProvider interface (with a fake), staff roles with CASL
  - money stored as integer poisha; plans config; BD divisions/districts/upazilas seed
Work in small commits, run the tests after each step, and open one pull request for Phase 0 when its exit criteria pass.
Ask me before choosing paid services or anything that costs money.
```
