<div align="center">

<br>

```
 ╦ ╦╔═╗╔═╗ ╔═╗╦
 ║║║╠═╣║═╬╗╠╣ ║
 ╚╩╝╩ ╩╚═╝╚╩  ╩
```

### Tokenized Waqf Platform

**Fraksionalisasi aset wakaf di blockchain Polygon.**<br>
**Partisipasi mikro mulai Rp 10.000 — transparan, aman, sesuai syariah.**

<br>

[![Live Demo](https://img.shields.io/badge/LIVE_DEMO-mshadianto.github.io-1a5632?style=for-the-badge&logo=github)](https://mshadianto.github.io/waq-fi-v2/)
[![Polygon](https://img.shields.io/badge/Polygon-L2-7B3FE4?style=for-the-badge&logo=polygon&logoColor=white)](https://polygon.technology/)
[![ERC-1400](https://img.shields.io/badge/ERC--1400-Security_Token-c9a84c?style=for-the-badge)](https://github.com/ethereum/EIPs)
[![DSN-MUI](https://img.shields.io/badge/DSN--MUI-Compliant-1a5632?style=for-the-badge)](https://dsnmui.or.id/)

<br>

</div>

---

<br>

## Masalah yang Diselesaikan

> *"Indonesia memiliki potensi wakaf **Rp 180 triliun/tahun**, tetapi realisasinya kurang dari **1%**. Hambatan utama: nominal besar, proses manual, dan kurangnya transparansi."*

WaqFi mengubah paradigma wakaf tradisional:

```
  TRADISIONAL                          WAQFI
  ─────────────                        ─────
  Minimal Rp 50 juta+          →       Mulai Rp 10.000
  Proses manual & kertas       →       Otomatis via smart contract
  Transparansi terbatas        →       100% on-chain & auditable
  Laporan tahunan BWI manual   →       Real-time compliance report
  Terbatas geografis           →       Akses dari mana saja
```

<br>

## Arsitektur Sistem

```
                    ┌──────────────────────────────────────────┐
                    │              FRONTEND (Next.js)          │
                    │         mshadianto.github.io/waq-fi-v2   │
                    └────────────────────┬─────────────────────┘
                                         │
                    ┌────────────────────┴─────────────────────┐
                    │          API GATEWAY (Node.js :3001)      │
                    │                                           │
                    │  POST /webhook/payment/xendit             │
                    │  POST /webhook/payment/midtrans           │
                    │  POST /api/v1/ekyc/verify                 │
                    │  GET  /api/v1/assets                      │
                    └───────┬───────────────────┬───────────────┘
                            │                   │
               ┌────────────┴──────┐   ┌───────┴────────────────┐
               │  POLYGON L2       │   │  LEDGER SERVICE        │
               │  (Smart Contract) │   │  (Go :8080)            │
               │                   │   │                        │
               │  WaqFiFractional  │   │  POST /audit/events    │
               │  ┌─────────────┐  │   │  GET  /audit/events    │
               │  │ ERC-1400    │  │──▶│  GET  /compliance-     │
               │  │ KYC Gate    │  │   │        report          │
               │  │ Partitions  │  │   │                        │
               │  │ ROI Dist.   │  │   │  ┌──────────────────┐  │
               │  └─────────────┘  │   │  │ Agentic AI       │  │
               └───────────────────┘   │  │ Command Center   │◀─┤
                                       │  └──────────────────┘  │
                                       └────────────────────────┘
                    ┌──────────────────────────────────────────┐
                    │          DATA LAYER                       │
                    │   PostgreSQL (relational) + Redis (cache) │
                    └──────────────────────────────────────────┘
```

<br>

## Tech Stack

```
BLOCKCHAIN        Polygon L2 (EVM Compatible)
SMART CONTRACT    Solidity 0.8.24 · ERC-1400 Security Token · OpenZeppelin v5
BACKEND API       Node.js · Express · ethers.js v6 · Winston
BACKEND LEDGER    Go 1.22 · chi router · zap logger
DATABASE          PostgreSQL · Redis
FRONTEND          Next.js 14 · TypeScript · App Router · Static Export
PAYMENT           Xendit · Midtrans (webhook-based)
e-KYC             VIDA · PrivyID
CI/CD             GitHub Actions → GitHub Pages
```

<br>

## Smart Contract — `WaqFiFractional.sol`

Implementasi ERC-1400 Security Token yang menjadi inti kepatuhan platform:

```solidity
// Hanya wallet KYC-verified yang bisa menerima token
modifier onlyWhitelisted(address account) {
    require(_whitelisted[account], "WaqFi: address not KYC-verified");
    _;
}

// Mint fraksi wakaf setelah pembayaran dikonfirmasi
function mintFractional(
    bytes32 partition,     // Aset wakaf (masjid, sekolah, dll)
    address to,            // Wallet penerima (harus whitelisted)
    uint256 amount,        // Jumlah fraksi (min 1 = Rp 10.000)
    bytes calldata data    // Reference pembayaran
) external onlyRole(MINTER_ROLE) onlyWhitelisted(to) { ... }

// Distribusi ROI otomatis ke Mauquf Alaih
function distributeROI(bytes32 partition) external onlyRole(DEFAULT_ADMIN_ROLE) { ... }
```

**Fitur utama:**

| Fitur | Deskripsi |
|:---|:---|
| `onlyWhitelisted` | Gate KYC — tidak ada transaksi tanpa verifikasi identitas |
| `mintFractional` | Mint token fraksi (Rp 10.000/unit) setelah payment confirmed |
| `transferByPartition` | Transfer terkontrol — pengirim & penerima harus KYC-verified |
| `distributeROI` | Payout otomatis ke wallet Mauquf Alaih (penerima manfaat) |
| `registerWaqfAsset` | Registrasi aset baru sebagai partition dengan target funding |
| `setDocument` | Simpan hash dokumen on-chain (AIW, sertifikat tanah, fatwa) |

<br>

## Alur Transaksi

```
 WAKIF (Pengguna)
   │
   ├─ 1. Verifikasi KYC ──────▶ VIDA / PrivyID
   │                                    │
   │                            2. Callback success
   │                                    │
   │                            3. addToWhitelist(wallet)
   │                                    │
   │                           ┌────────▼────────┐
   │                           │  SMART CONTRACT  │
   │                           │  (on Polygon)    │
   │                           └────────┬────────┘
   │                                    │
   ├─ 4. Bayar Rp 10.000+ ───▶ Xendit / Midtrans
   │                                    │
   │                            5. Webhook callback
   │                                    │
   │                            6. mintFractional(wallet, amount)
   │                                    │
   │                            7. Token di-mint ke wallet
   │                                    │
   └─ 8. Lihat di Dashboard ◀──────────┘
                                        │
                                9. Audit event → Go Ledger
                                        │
                               10. Compliance report → BWI
```

<br>

## Frontend — 7 Halaman

<table>
<tr>
<td width="50%">

**`/` Landing Page**
- Hero dengan geometric pattern
- Statistik platform real-time
- 4 keunggulan utama
- Cara kerja (4 langkah)
- Proyek wakaf unggulan

</td>
<td width="50%">

**`/assets` Katalog Aset**
- Grid aset dengan progress bar
- Filter kategori: Masjid, Pendidikan, Kesehatan, Produktif
- Search by nama/lokasi
- Link ke detail setiap aset

</td>
</tr>
<tr>
<td>

**`/assets/[id]` Detail Aset**
- Progress funding besar
- Form partisipasi (pilih jumlah fraksi)
- Info Mauquf Alaih (penerima manfaat)
- Dokumen & sertifikat on-chain
- Riwayat transaksi

</td>
<td>

**`/dashboard` Portofolio**
- Summary: total investasi, ROI, fraksi
- Badge status KYC
- Tabel aset dimiliki
- Riwayat transaksi terbaru

</td>
</tr>
<tr>
<td>

**`/kyc` Verifikasi KYC**
- 4-step wizard interaktif
- Connect wallet (MetaMask/WalletConnect)
- Upload KTP + selfie liveness check
- Pilih provider: VIDA atau PrivyID
- Status verifikasi real-time

</td>
<td>

**`/transparency` Transparansi**
- Audit log publik (filterable)
- Status kepatuhan compliance
- Laporan BWI & status submission
- Referensi fatwa DSN-MUI
- Link verifikasi PolygonScan

</td>
</tr>
<tr>
<td colspan="2">

**`/about` Tentang WaqFi**
- Misi & nilai-nilai platform
- Tim pengembang dengan afiliasi
- 7 mitra & partner (BWI, DSN-MUI, VIDA, PrivyID, Xendit, Midtrans, Polygon)
- FAQ accordion (6 pertanyaan umum)

</td>
</tr>
</table>

<br>

## Kepatuhan & Regulasi

```
 ┌─────────────────────────────────────────────────────────────┐
 │                    COMPLIANCE FRAMEWORK                      │
 │                                                              │
 │   ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐   │
 │   │ DSN-MUI  │  │   BWI    │  │ AML/KYC  │  │ ERC-1400 │   │
 │   │          │  │          │  │          │  │          │   │
 │   │ Fatwa    │  │ Registr. │  │ VIDA     │  │ Security │   │
 │   │ Syariah  │  │ & Report │  │ PrivyID  │  │ Token    │   │
 │   └──────────┘  └──────────┘  └──────────┘  └──────────┘   │
 │                                                              │
 │   Seluruh state change tercatat di immutable audit trail     │
 │   Go Ledger → GET /compliance-report → Agentic AI / BWI     │
 └─────────────────────────────────────────────────────────────┘
```

<br>

## Quick Start

### Prerequisites

```
Node.js >= 18    Go >= 1.22    Git
```

### 1. Clone & Setup

```bash
git clone https://github.com/mshadianto/waq-fi-v2.git
cd waq-fi-v2
```

### 2. Smart Contracts

```bash
cd contracts
npm install
npx hardhat compile                              # Compile
npx hardhat test                                  # Run tests
npx hardhat run scripts/deploy.js --network hardhat  # Deploy local
```

### 3. Node.js API Gateway

```bash
cd backend-api-node
npm install
cp .env.example .env     # Edit konfigurasi
npm run dev              # → http://localhost:3001
```

### 4. Go Ledger Service

```bash
cd backend-ledger-go
go run cmd/server/main.go    # → http://localhost:8080
```

### 5. Frontend

```bash
cd frontend-web
npm install
npm run dev              # → http://localhost:3000
```

<br>

## Deployment

Frontend auto-deploy ke GitHub Pages setiap push ke `main`:

```
Workflow    .github/workflows/deploy-pages.yml
Trigger     Push to main branch
Build       Next.js static export → /out
URL         https://mshadianto.github.io/waq-fi-v2/
```

<br>

## Struktur Repository

```
waq-fi_v2/
│
├── contracts/                          SMART CONTRACT
│   ├── contracts/
│   │   └── WaqFiFractional.sol         ERC-1400 security token
│   ├── scripts/deploy.js              Deploy script + sample asset
│   ├── test/WaqFiFractional.test.js    Full test suite
│   └── hardhat.config.js              Polygon network config
│
├── backend-api-node/                   API GATEWAY
│   └── src/
│       ├── routes/
│       │   ├── paymentWebhook.js       Xendit & Midtrans webhooks
│       │   ├── ekyc.js                 e-KYC verification endpoint
│       │   └── assets.js               Asset catalog from chain
│       ├── services/
│       │   ├── mintingService.js        On-chain minting logic
│       │   └── ledgerClient.js          Forward events to Go ledger
│       ├── middleware/
│       │   └── verifyWebhook.js         Signature verification
│       └── config/
│           ├── blockchain.js            ethers.js contract binding
│           └── logger.js                Winston structured logging
│
├── backend-ledger-go/                  AUDIT LEDGER
│   ├── cmd/server/main.go             Server entrypoint
│   └── internal/
│       ├── handler/audit.go            REST handlers
│       ├── service/audit.go            Append-only log + compliance
│       ├── model/audit.go              AuditEvent, ComplianceReport
│       └── config/config.go            Environment config
│
├── frontend-web/                       WEB DASHBOARD
│   └── src/
│       ├── app/                        7 pages (Next.js App Router)
│       ├── components/                 Navigation, Footer
│       └── lib/mockData.ts             Shared types & mock data
│
├── .github/workflows/
│   └── deploy-pages.yml                CI/CD → GitHub Pages
│
├── CLAUDE.md                           AI development context
└── README.md                           ← You are here
```

<br>

## Tim Pengembang

<table>
<tr>
<td align="center" width="20%">
<strong>Dr. Yaser Taufik Syamlan</strong><br>
<sub>Ketua Tim</sub><br>
<sub><i>Universitas Tazkia</i></sub>
</td>
<td align="center" width="20%">
<strong>M. Sopian Hadianto, SE, Ak, MM</strong><br>
<sub>Tech & AI Lead</sub><br>
<sub><i>Badan Pengelola Keuangan Haji</i></sub><br>
<a href="https://github.com/mshadianto"><sub>github.com/mshadianto</sub></a>
</td>
<td align="center" width="20%">
<strong>H. Aa, Lc.M.Pd.I, CWC</strong><br>
<sub>Sharia Compliance</sub><br>
<sub><i>Wakil Sekretaris ANWI</i></sub><br>
<sub><i>Asesor BWI Pusat</i></sub>
</td>
<td align="center" width="20%">
<strong>Ronal Rulindo, PhD</strong><br>
<sub>Research Lead</sub><br>
<sub><i>Academic Research</i></sub>
</td>
<td align="center" width="20%">
<strong>M. Ichsan Junaedi</strong><br>
<sub>Engineer</sub><br>
<a href="https://github.com/IchsanJunaediDev"><sub>github.com/IchsanJunaediDev</sub></a>
</td>
</tr>
</table>

<br>

## Kontak

```
Email       Lppm@tazkia.ac.id
Telepon     0811-1000-8252
Institusi   Universitas Tazkia
```

---

<div align="center">

**WaqFi** — *Wakaf Digital untuk Semua Umat*

Polygon L2 &nbsp;·&nbsp; ERC-1400 &nbsp;·&nbsp; DSN-MUI Compliant &nbsp;·&nbsp; BWI Registered

<br>

[![Deploy](https://github.com/mshadianto/waq-fi-v2/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/mshadianto/waq-fi-v2/actions/workflows/deploy-pages.yml)

<sub>MIT License &copy; 2026 WaqFi Team</sub>

</div>
