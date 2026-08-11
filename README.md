# Shopping Genie — SG-01

**Tagline:** Search Once. Compare Everywhere.

Shopping Genie is an India-focused shopping search and comparison product. MVP scope:
- Product search
- Location-aware availability
- Price comparison
- Stock status
- Delivery information
- Platform link / buy action
- Basic sorting: lowest price, fastest delivery, in stock

## Repository layout

- `mobile/` — Flutter Android application skeleton
- `backend/` — Node.js + TypeScript API skeleton
- `connectors/` — platform connector contracts and future adapters
- `database/` — PostgreSQL schema
- `admin/` — admin-panel specification placeholder
- `docs/` — architecture and API notes

## Current milestone: SG-01 Sprint 1A

This is the foundation/skeleton. It intentionally does **not** scrape or automate user logins on third-party platforms.

Platform integrations must use an official API, affiliate API, partner integration, or another authorized access method. The first real connector should be added only after its access method and terms are verified.

## Local prerequisites

- Node.js 20+
- Flutter SDK (for the mobile app)
- PostgreSQL 15+
- Git

## Backend

```bash
cd backend
npm install
npm run dev
```

The API exposes:
- `GET /health`
- `GET /api/v1/platforms`
- `POST /api/v1/search`

The search endpoint currently returns deterministic mock comparison data so the mobile UI can be developed before a real platform connector is attached.

## Mobile

Install Flutter, then:

```bash
cd mobile
flutter pub get
flutter run
```

## Important MVP rule

Do not add AI assistant, coupon/card discount optimization, universal cart, price history, or smart-basket features to the MVP. They are deliberately deferred.
