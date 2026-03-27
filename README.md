# WaqFi — Tokenized Waqf Platform

**Platform wakaf tokenisasi pertama di Indonesia.** Fraksionalisasi aset wakaf tetap untuk Yayasan Wakaf, memungkinkan partisipasi mikro mulai dari **Rp 10.000** — transparan di blockchain, sesuai syariah.

> **Live Demo:** [mshadianto.github.io/waq-fi-v2](https://mshadianto.github.io/waq-fi-v2/)

---

## Arsitektur

```
waq-fi_v2/
├── contracts/                 Solidity — ERC-1400 Security Token (Hardhat)
├── backend-api-node/          Node.js — API Gateway, Payment Webhooks, e-KYC
├── backend-ledger-go/         Go — Immutable Audit Trail, BWI Compliance Report
└── frontend-web/              Next.js — Web Dashboard (7 halaman)
```

### Technology Stack

| Layer | Teknologi | Fungsi |
|---|---|---|
| **Blockchain** | Polygon L2 (EVM) | Transaksi on-chain cepat & murah |
| **Smart Contract** | Solidity / ERC-1400 | Security token dengan built-in KYC/AML |
| **Backend API** | Node.js + Express | Payment gateway webhooks, e-KYC integration |
| **Backend Ledger** | Go + chi | Immutable audit trail, compliance reporting |
| **Database** | PostgreSQL + Redis | Data relasional & caching |
| **Frontend** | Next.js 14 (App Router) | Dashboard web responsif |

---

## Smart Contract — WaqFiFractional.sol

Implementasi ERC-1400 Security Token dengan fitur:

- **`onlyWhitelisted` modifier** — Token hanya bisa di-mint/transfer ke alamat yang telah terverifikasi e-KYC (VIDA/PrivyID)
- **`mintFractional()`** — Mint fraksi wakaf (minimum 1 unit = Rp 10.000)
- **`distributeROI()`** — Distribusi ROI otomatis ke wallet Mauquf Alaih
- **`transferByPartition()`** — Transfer terkontrol antar wallet KYC-verified
- **Partition-based** — Setiap aset wakaf adalah partition terpisah dengan supply independen
- **Document management** — Penyimpanan hash dokumen on-chain (AIW, sertifikat)

---

## Backend Services

### Node.js API Gateway (`:3001`)

| Endpoint | Fungsi |
|---|---|
| `POST /webhook/payment/xendit` | Terima callback Xendit, trigger minting |
| `POST /webhook/payment/midtrans` | Terima callback Midtrans, trigger minting |
| `POST /api/v1/ekyc/verify` | Whitelist wallet setelah verifikasi e-KYC |
| `GET /api/v1/assets` | Katalog aset wakaf dari smart contract |

### Go Ledger Service (`:8080`)

| Endpoint | Fungsi |
|---|---|
| `POST /api/v1/audit/events` | Catat audit event (append-only) |
| `GET /api/v1/audit/events` | List events dengan filter tipe |
| `GET /api/v1/audit/compliance-report` | Laporan kepatuhan untuk Agentic AI / BWI |

---

## Frontend Pages

| Route | Halaman |
|---|---|
| `/` | Landing — hero, fitur, statistik, cara kerja |
| `/assets` | Katalog aset wakaf dengan filter & pencarian |
| `/assets/[partition]` | Detail aset, form partisipasi, riwayat transaksi |
| `/dashboard` | Portofolio — aset dimiliki, ROI, transaksi |
| `/kyc` | Verifikasi e-KYC (4 langkah: wallet → KTP → selfie → status) |
| `/transparency` | Audit log publik, laporan BWI, referensi fatwa |
| `/about` | Misi, tim, mitra, FAQ |

---

## Kepatuhan & Regulasi

- **DSN-MUI** — Sesuai fatwa Dewan Syariah Nasional tentang wakaf
- **BWI** — Terdaftar di Badan Wakaf Indonesia
- **AML/KYC** — Verifikasi identitas wajib via VIDA/PrivyID sebelum transaksi on-chain
- **ERC-1400** — Security token standard dengan transfer terkontrol
- **GRC Audit Trail** — Seluruh state change tercatat di Go ledger service

---

## Quick Start

### Prerequisites

- Node.js >= 18
- Go >= 1.22
- Git

### 1. Smart Contracts

```bash
cd contracts
npm install
npx hardhat compile
npx hardhat test
npx hardhat run scripts/deploy.js --network hardhat
```

### 2. Node.js API Gateway

```bash
cd backend-api-node
npm install
cp .env.example .env    # edit konfigurasi
npm run dev              # http://localhost:3001
```

### 3. Go Ledger Service

```bash
cd backend-ledger-go
go run cmd/server/main.go    # http://localhost:8080
```

### 4. Frontend Web

```bash
cd frontend-web
npm install
npm run dev    # http://localhost:3000
```

---

## Deployment

Frontend di-deploy otomatis ke GitHub Pages via GitHub Actions setiap push ke `main`.

```
Workflow: .github/workflows/deploy-pages.yml
URL:      https://mshadianto.github.io/waq-fi-v2/
```

---

## Tim Pengembang

| Nama | Peran | Afiliasi |
|---|---|---|
| Dr. Yaser Taufik Syamlan | Ketua Tim | Universitas Tazkia |
| M. Sopian Hadianto, SE, Ak, MM | Tech & AI Lead | Badan Pengelola Keuangan Haji |
| H. Aa, Lc.M.Pd.I, CWC | Sharia Compliance | Wakil Sekretaris ANWI, Asesor BWI Pusat |
| Ronal Rulindo, PhD | Research Lead | Academic Research |
| M. Ichsan Junaedi | Engineer | github.com/IchsanJunaediDev |

---

## Lisensi

MIT
