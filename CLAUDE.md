# CLAUDE.md — WaqFi Project Context

This file provides context for Claude Code when working on this repository.

## Project Overview

WaqFi is a tokenized waqf (Islamic endowment) platform on Polygon L2. It fractionalizes fixed waqf assets for Yayasan Wakaf, enabling micro-participation starting from Rp 10.000. The platform must strictly adhere to DSN-MUI compliance, AML regulations, and BWI reporting standards.

## Monorepo Structure

```
waq-fi_v2/
├── contracts/                 Hardhat + Solidity (ERC-1400)
├── backend-api-node/          Node.js + Express API gateway
├── backend-ledger-go/         Go + chi audit/compliance service
└── frontend-web/              Next.js 14 App Router (static export → GitHub Pages)
```

## Key Build Commands

```bash
# Contracts
cd contracts && npm install && npx hardhat compile && npx hardhat test

# Node.js API
cd backend-api-node && npm install && npm run dev

# Go Ledger
cd backend-ledger-go && go run cmd/server/main.go

# Frontend
cd frontend-web && npm install && npm run dev
cd frontend-web && npm run build   # static export to /out
```

## Architecture Decisions

### Smart Contract (contracts/contracts/WaqFiFractional.sol)
- **ERC-1400 Security Token** — not ERC-20. Transfers are restricted to KYC-whitelisted addresses only.
- **Partition-based** — each waqf asset is a `bytes32` partition with independent supply, target, and beneficiary.
- **Roles**: `DEFAULT_ADMIN_ROLE`, `COMPLIANCE_ROLE` (whitelist management), `MINTER_ROLE` (mint after payment), `PAUSER_ROLE`.
- **onlyWhitelisted modifier** — enforces KYC gate on all token movements. This is the core GRC isolation pattern.
- Uses OpenZeppelin v5 (AccessControl, ReentrancyGuard, Pausable).

### Node.js API Gateway (backend-api-node/)
- Payment webhooks verify signatures: Xendit via `x-callback-token` header, Midtrans via SHA-512.
- After payment confirmation, calls `mintFractional()` on the smart contract.
- e-KYC endpoint calls `addToWhitelist()` after VIDA/PrivyID verification.
- All state changes are forwarded to the Go ledger service (non-blocking).
- Uses ethers.js v6 for blockchain interaction.

### Go Ledger Service (backend-ledger-go/)
- Append-only audit log (currently in-memory; production should use PostgreSQL via sqlx).
- `GET /api/v1/audit/compliance-report` is designed for consumption by an external Agentic AI command center.
- Compliance report includes basic AML heuristic flags (e.g., mints without KYC events).

### Frontend (frontend-web/)
- Next.js 14 App Router with `output: "export"` for static GitHub Pages deployment.
- `basePath: "/waq-fi-v2"` — all internal links must use Next.js `<Link>` (not raw `<a>`) for basePath to work.
- Dynamic route `/assets/[partition]` requires `generateStaticParams()` for static export.
- Design system in `globals.css`: Playfair Display (headings) + DM Sans (body), green (#1a5632) + gold (#c9a84c) palette.
- All data is mock (inline in `src/lib/mockData.ts`). No API calls in production frontend yet.
- Team member avatar initials are explicit (`initials` field in TEAM array), not auto-generated.

## Compliance Context

- **DSN-MUI** — Dewan Syariah Nasional (National Sharia Board) fatwa compliance
- **BWI** — Badan Wakaf Indonesia (Indonesian Waqf Board) registration and reporting
- **AML/KYC** — Anti Money Laundering / Know Your Customer via VIDA and PrivyID
- **Mauquf Alaih** — The beneficiary of waqf (receives ROI distributions)
- **AIW** — Akta Ikrar Wakaf (Waqf Pledge Deed) — required legal document per asset

## Deployment

- Frontend auto-deploys to GitHub Pages via `.github/workflows/deploy-pages.yml` on every push to `main`.
- Live URL: https://mshadianto.github.io/waq-fi-v2/

## Code Conventions

- Smart contract: Solidity 0.8.24, optimizer enabled (200 runs), viaIR.
- Node.js: CommonJS (`require`), Winston structured logging, no TypeScript.
- Go: Standard project layout (`cmd/`, `internal/`), chi router, zap logger.
- Frontend: TypeScript, CSS-in-JS (inline styles) + globals.css, no Tailwind.
- Indonesian language used for UI labels, variable naming is English.

## Team

| Name | Role |
|---|---|
| Dr. Yaser Taufik Syamlan | Ketua Tim (Universitas Tazkia) |
| M. Sopian Hadianto, SE, Ak, MM | Tech & AI Lead (BPKH) |
| H. Aa, Lc.M.Pd.I, CWC | Sharia Compliance (Asesor BWI Pusat) |
| Ronal Rulindo, PhD | Research Lead |
| M. Ichsan Junaedi | Engineer |
