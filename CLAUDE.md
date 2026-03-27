# CLAUDE.md — WaqFi Project Context

This file provides context for Claude Code when working on this repository.

## Project Overview

WaqFi is a tokenized waqf (Islamic endowment) platform on Polygon L2. It fractionalizes fixed waqf assets for Yayasan Wakaf, enabling micro-participation starting from Rp 10.000. The platform must strictly adhere to DSN-MUI compliance, AML regulations, and BWI reporting standards.

**Live:** https://mshadianto.github.io/waq-fi-v2/
**Repo:** https://github.com/mshadianto/waq-fi-v2

## Monorepo Structure

```
waq-fi_v2/
├── contracts/                 Hardhat + Solidity (ERC-1400)
│   ├── contracts/WaqFiFractional.sol   Core security token
│   ├── scripts/deploy.js              Deploy + register sample asset
│   └── test/WaqFiFractional.test.js   Full test suite
├── backend-api-node/          Node.js + Express API gateway
│   └── src/
│       ├── routes/            paymentWebhook, ekyc, assets
│       ├── services/          mintingService, ledgerClient
│       ├── middleware/        verifyWebhook (Xendit/Midtrans)
│       └── config/            blockchain (ethers.js), logger
├── backend-ledger-go/         Go + chi audit/compliance service
│   ├── cmd/server/main.go     Entrypoint
│   └── internal/              handler, service, model, config
├── frontend-web/              Next.js 14 App Router (static export)
│   └── src/
│       ├── app/               7 pages + globals.css
│       ├── components/        Navigation, Footer
│       └── lib/mockData.ts    Shared types, mock data, formatters
└── .github/workflows/         deploy-pages.yml (CI/CD)
```

## Key Build Commands

```bash
# Contracts — compile & test
cd contracts && npm install && npx hardhat compile && npx hardhat test

# Node.js API — dev server on :3001
cd backend-api-node && npm install && npm run dev

# Go Ledger — dev server on :8080
cd backend-ledger-go && go run cmd/server/main.go

# Frontend — dev server on :3000
cd frontend-web && npm install && npm run dev

# Frontend — static build (output to /out, basePath /waq-fi-v2)
cd frontend-web && npm run build
```

## Architecture Decisions

### Smart Contract (contracts/contracts/WaqFiFractional.sol)
- **ERC-1400 Security Token** — not ERC-20. Transfers are restricted to KYC-whitelisted addresses only.
- **Partition-based** — each waqf asset is a `bytes32` partition with independent supply, target, and beneficiary (Mauquf Alaih).
- **Roles**: `DEFAULT_ADMIN_ROLE`, `COMPLIANCE_ROLE` (whitelist management), `MINTER_ROLE` (mint after payment), `PAUSER_ROLE`.
- **onlyWhitelisted modifier** — enforces KYC gate on all token movements. This is the core GRC isolation pattern.
- **MIN_FRACTION = 1** — represents Rp 10.000 minimum participation.
- Uses OpenZeppelin v5 (AccessControl, ReentrancyGuard, Pausable).
- Solidity 0.8.24, optimizer enabled (200 runs), viaIR.

### Node.js API Gateway (backend-api-node/)
- Payment webhooks verify signatures: Xendit via `x-callback-token` header, Midtrans via SHA-512.
- After payment confirmation, divides amount by 10,000 to get fractions, then calls `mintFractional()`.
- e-KYC endpoint calls `addToWhitelist()` after VIDA/PrivyID verification succeeds.
- All state changes are forwarded to the Go ledger service (non-blocking, fire-and-forget).
- Uses ethers.js v6 for blockchain interaction.
- CommonJS (`require`), Winston structured logging, no TypeScript.

### Go Ledger Service (backend-ledger-go/)
- Append-only audit log (currently in-memory; production should use PostgreSQL via sqlx).
- `GET /api/v1/audit/compliance-report` is designed for consumption by an external Agentic AI command center.
- Compliance report includes basic AML heuristic flags (e.g., mints without KYC events → REVIEW_NEEDED).
- Standard Go project layout (`cmd/`, `internal/`), chi router, zap logger.

### Frontend (frontend-web/)
- Next.js 14 App Router with `output: "export"` for static GitHub Pages deployment.
- **`basePath: "/waq-fi-v2"`** — all internal links MUST use Next.js `<Link>` (not raw `<a>`) for basePath to work correctly.
- Dynamic route `/assets/[partition]` uses `generateStaticParams()` in `page.tsx` (server component) wrapping `AssetDetail.tsx` (client component).
- Design system in `globals.css`: Playfair Display (headings) + DM Sans (body), green (#1a5632) + gold (#c9a84c) palette.
- Islamic geometric SVG patterns as decorative overlays (inline SVG data URIs in CSS).
- All data is mock (inline in `src/lib/mockData.ts`). No live API calls yet.
- Team member avatar initials are explicit (`initials` field in TEAM array), not auto-generated from name.

## API Endpoints

### Node.js Gateway (:3001)
| Method | Path | Purpose |
|--------|------|---------|
| POST | `/webhook/payment/xendit` | Xendit payment callback → mint tokens |
| POST | `/webhook/payment/midtrans` | Midtrans payment callback → mint tokens |
| POST | `/api/v1/ekyc/verify` | KYC verified → whitelist wallet on-chain |
| GET | `/api/v1/assets` | List all waqf assets from smart contract |
| GET | `/health` | Health check |

### Go Ledger (:8080)
| Method | Path | Purpose |
|--------|------|---------|
| POST | `/api/v1/audit/events` | Record audit event (append-only) |
| GET | `/api/v1/audit/events?type=MINT` | List events, filterable by type |
| GET | `/api/v1/audit/compliance-report?from=&to=` | BWI/AI compliance report |
| GET | `/health` | Health check |

## Frontend Pages

| Route | File | Type |
|-------|------|------|
| `/` | `app/page.tsx` | Landing — hero, stats, features, how-it-works, CTA |
| `/assets` | `app/assets/page.tsx` | Catalog — search, category filter, asset cards |
| `/assets/[partition]` | `app/assets/[partition]/page.tsx` + `AssetDetail.tsx` | Detail — progress, participation form, docs, tx history |
| `/dashboard` | `app/dashboard/page.tsx` | Portfolio — summary cards, owned assets, transactions |
| `/kyc` | `app/kyc/page.tsx` | KYC — 4-step wizard, VIDA/PrivyID selection |
| `/transparency` | `app/transparency/page.tsx` | Audit — public log, BWI report, fatwa references |
| `/about` | `app/about/page.tsx` | About — mission, team, partners, FAQ accordion |

## Compliance Context

- **DSN-MUI** — Dewan Syariah Nasional (National Sharia Board) fatwa compliance
- **BWI** — Badan Wakaf Indonesia (Indonesian Waqf Board) registration and reporting
- **AML/KYC** — Anti Money Laundering / Know Your Customer via VIDA and PrivyID
- **Mauquf Alaih** — The beneficiary of waqf (receives ROI distributions)
- **AIW** — Akta Ikrar Wakaf (Waqf Pledge Deed) — required legal document per asset
- **ANWI** — Asosiasi Nazhir Wakaf Indonesia

## Deployment

- Frontend auto-deploys to GitHub Pages via `.github/workflows/deploy-pages.yml` on every push to `main`.
- Workflow: install → `npm run build` (static export to `out/`) → upload artifact → deploy pages.
- Live URL: https://mshadianto.github.io/waq-fi-v2/

## Important Gotchas

1. **basePath** — Never use raw `<a href="/...">` in frontend. Always use `<Link>` from `next/link` so basePath `/waq-fi-v2` is applied automatically.
2. **generateStaticParams** — Required for `/assets/[partition]` because of `output: "export"`. The server component `page.tsx` provides params, the client component `AssetDetail.tsx` uses `useParams()`.
3. **Webhook signatures** — Xendit uses `x-callback-token` header (timing-safe compare). Midtrans uses SHA-512 of `order_id + status_code + gross_amount + server_key`.
4. **initials field** — Team avatar initials in `about/page.tsx` are explicit strings, not computed. Update the `initials` field when changing team names.
5. **Go go.sum** — The `go.sum` file is not committed yet. Run `go mod tidy` in `backend-ledger-go/` before first Go build.

## Team

| Name | Role | Affiliation |
|---|---|---|
| Dr. Yaser Taufik Syamlan | Ketua Tim | Universitas Tazkia |
| M. Sopian Hadianto, SE, Ak, MM | Tech & AI Lead | Badan Pengelola Keuangan Haji (BPKH) |
| H. Aa, Lc.M.Pd.I, CWC | Sharia Compliance | Wakil Sekretaris ANWI, Asesor BWI Pusat |
| Ronal Rulindo, PhD | Research Lead | Academic Research |
| M. Ichsan Junaedi | Engineer | github.com/IchsanJunaediDev |

## Contact

- **Email:** Lppm@tazkia.ac.id
- **Phone:** 0811-1000-8252
- **Institution:** Universitas Tazkia
