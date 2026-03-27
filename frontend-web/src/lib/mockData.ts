export interface WaqfAsset {
  partition: string;
  name: string;
  location: string;
  category: "Masjid" | "Pendidikan" | "Kesehatan" | "Produktif";
  description: string;
  targetAmount: number;
  raisedAmount: number;
  fullyFunded: boolean;
  progressPercent: number;
  mauqufAlaih: string;
  mauqufAlaihAddress: string;
  participantCount: number;
  createdAt: string;
  imageGradient: string;
}

export interface PortfolioItem {
  partition: string;
  assetName: string;
  category: string;
  fractions: number;
  valueIdr: number;
  roiReceived: number;
  purchaseDate: string;
}

export interface Transaction {
  id: string;
  type: "MINT" | "TRANSFER" | "ROI_DISTRIBUTION" | "KYC_WHITELIST";
  walletAddress: string;
  partition: string;
  assetName: string;
  fractions: number;
  txHash: string;
  timestamp: string;
  source: string;
}

export interface AuditEvent {
  id: string;
  type: string;
  source: string;
  walletAddress: string;
  partition: string;
  fractions: number;
  txHash: string;
  timestamp: string;
  status: "COMPLIANT" | "REVIEW_NEEDED" | "FLAGGED";
}

export const MOCK_ASSETS: WaqfAsset[] = [
  {
    partition: "masjid-al-ikhlas",
    name: "Masjid Al-Ikhlas Expansion",
    location: "Jakarta Selatan, DKI Jakarta",
    category: "Masjid",
    description: "Perluasan area sholat Masjid Al-Ikhlas untuk menampung 2.000 jamaah. Proyek ini mencakup pembangunan lantai 2 dan renovasi area wudhu dengan standar aksesibilitas universal.",
    targetAmount: 10000,
    raisedAmount: 6500,
    fullyFunded: false,
    progressPercent: 65,
    mauqufAlaih: "Yayasan Wakaf Al-Ikhlas",
    mauqufAlaihAddress: "0x742d...4a3E",
    participantCount: 423,
    createdAt: "2026-01-15",
    imageGradient: "linear-gradient(135deg, #1a5632 0%, #2d9464 100%)",
  },
  {
    partition: "rumah-tahfidz-bintaro",
    name: "Rumah Tahfidz Bintaro",
    location: "Tangerang Selatan, Banten",
    category: "Pendidikan",
    description: "Pembangunan rumah tahfidz Al-Quran untuk 50 santri dengan fasilitas asrama, ruang belajar, dan perpustakaan Islam digital.",
    targetAmount: 5000,
    raisedAmount: 5000,
    fullyFunded: true,
    progressPercent: 100,
    mauqufAlaih: "Yayasan Tahfidz Nusantara",
    mauqufAlaihAddress: "0x8f3a...9B2c",
    participantCount: 312,
    createdAt: "2025-11-20",
    imageGradient: "linear-gradient(135deg, #8a6d2b 0%, #c9a84c 100%)",
  },
  {
    partition: "klinik-wakaf-sehat",
    name: "Klinik Wakaf Sehat",
    location: "Bandung, Jawa Barat",
    category: "Kesehatan",
    description: "Klinik kesehatan berbasis wakaf untuk masyarakat dhuafa. Menyediakan layanan kesehatan dasar, pemeriksaan rutin, dan obat-obatan gratis.",
    targetAmount: 8000,
    raisedAmount: 1200,
    fullyFunded: false,
    progressPercent: 15,
    mauqufAlaih: "Yayasan Kesehatan Ummat",
    mauqufAlaihAddress: "0x3c4d...7F1a",
    participantCount: 89,
    createdAt: "2026-02-01",
    imageGradient: "linear-gradient(135deg, #0d5445 0%, #1a8a6e 100%)",
  },
  {
    partition: "koperasi-wakaf-produktif",
    name: "Koperasi Wakaf Produktif Sukabumi",
    location: "Sukabumi, Jawa Barat",
    category: "Produktif",
    description: "Wakaf produktif berupa koperasi simpan pinjam syariah untuk pemberdayaan ekonomi UMKM di daerah Sukabumi. ROI disalurkan untuk pembangunan pesantren.",
    targetAmount: 12000,
    raisedAmount: 7800,
    fullyFunded: false,
    progressPercent: 65,
    mauqufAlaih: "Koperasi Baitul Maal Sukabumi",
    mauqufAlaihAddress: "0xab12...3D4e",
    participantCount: 534,
    createdAt: "2025-12-10",
    imageGradient: "linear-gradient(135deg, #5c4a1e 0%, #a5832f 100%)",
  },
  {
    partition: "masjid-raya-bogor",
    name: "Renovasi Masjid Raya Bogor",
    location: "Bogor, Jawa Barat",
    category: "Masjid",
    description: "Renovasi dan modernisasi Masjid Raya Bogor meliputi sistem pendingin, tata suara digital, dan area parkir bawah tanah.",
    targetAmount: 15000,
    raisedAmount: 4500,
    fullyFunded: false,
    progressPercent: 30,
    mauqufAlaih: "DKM Masjid Raya Bogor",
    mauqufAlaihAddress: "0xde56...8A9b",
    participantCount: 267,
    createdAt: "2026-01-05",
    imageGradient: "linear-gradient(135deg, #133d22 0%, #22714a 100%)",
  },
  {
    partition: "sekolah-tahfidz-depok",
    name: "Sekolah Tahfidz Terpadu Depok",
    location: "Depok, Jawa Barat",
    category: "Pendidikan",
    description: "Pembangunan sekolah tahfidz terpadu dengan kurikulum nasional dan internasional untuk 200 siswa dari keluarga kurang mampu.",
    targetAmount: 20000,
    raisedAmount: 3200,
    fullyFunded: false,
    progressPercent: 16,
    mauqufAlaih: "Yayasan Pendidikan Islam Depok",
    mauqufAlaihAddress: "0xf012...4C5d",
    participantCount: 156,
    createdAt: "2026-02-20",
    imageGradient: "linear-gradient(135deg, #6b5b2e 0%, #d4b96a 100%)",
  },
];

export const MOCK_PORTFOLIO: PortfolioItem[] = [
  {
    partition: "masjid-al-ikhlas",
    assetName: "Masjid Al-Ikhlas Expansion",
    category: "Masjid",
    fractions: 15,
    valueIdr: 150_000,
    roiReceived: 0,
    purchaseDate: "2026-02-15",
  },
  {
    partition: "rumah-tahfidz-bintaro",
    assetName: "Rumah Tahfidz Bintaro",
    category: "Pendidikan",
    fractions: 25,
    valueIdr: 250_000,
    roiReceived: 12_500,
    purchaseDate: "2026-01-10",
  },
  {
    partition: "koperasi-wakaf-produktif",
    assetName: "Koperasi Wakaf Produktif Sukabumi",
    category: "Produktif",
    fractions: 50,
    valueIdr: 500_000,
    roiReceived: 37_500,
    purchaseDate: "2025-12-20",
  },
];

export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "tx-001",
    type: "MINT",
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc4a3E",
    partition: "masjid-al-ikhlas",
    assetName: "Masjid Al-Ikhlas Expansion",
    fractions: 10,
    txHash: "0xabc123...def456",
    timestamp: "2026-03-27T10:30:00Z",
    source: "xendit",
  },
  {
    id: "tx-002",
    type: "ROI_DISTRIBUTION",
    walletAddress: "0x8f3a21Bb5523D0421814b733F9B2c",
    partition: "rumah-tahfidz-bintaro",
    assetName: "Rumah Tahfidz Bintaro",
    fractions: 0,
    txHash: "0x789abc...012def",
    timestamp: "2026-03-25T14:00:00Z",
    source: "system",
  },
  {
    id: "tx-003",
    type: "MINT",
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc4a3E",
    partition: "koperasi-wakaf-produktif",
    assetName: "Koperasi Wakaf Produktif Sukabumi",
    fractions: 50,
    txHash: "0x456def...789ghi",
    timestamp: "2026-03-20T09:15:00Z",
    source: "midtrans",
  },
  {
    id: "tx-004",
    type: "KYC_WHITELIST",
    walletAddress: "0x742d35Cc6634C0532925a3b844Bc4a3E",
    partition: "",
    assetName: "",
    fractions: 0,
    txHash: "0xeee111...222fff",
    timestamp: "2026-03-15T08:00:00Z",
    source: "vida",
  },
  {
    id: "tx-005",
    type: "MINT",
    walletAddress: "0xde5688Aa9934F0531728c456D8A9b",
    partition: "masjid-raya-bogor",
    assetName: "Renovasi Masjid Raya Bogor",
    fractions: 5,
    txHash: "0x333aaa...444bbb",
    timestamp: "2026-03-18T16:45:00Z",
    source: "xendit",
  },
];

export const MOCK_AUDIT_EVENTS: AuditEvent[] = [
  {
    id: "aud-001", type: "MINT", source: "xendit",
    walletAddress: "0x742d...4a3E", partition: "masjid-al-ikhlas",
    fractions: 10, txHash: "0xabc123...def456",
    timestamp: "2026-03-27T10:30:00Z", status: "COMPLIANT",
  },
  {
    id: "aud-002", type: "KYC_WHITELIST", source: "vida",
    walletAddress: "0x742d...4a3E", partition: "",
    fractions: 0, txHash: "0xeee111...222fff",
    timestamp: "2026-03-15T08:00:00Z", status: "COMPLIANT",
  },
  {
    id: "aud-003", type: "ROI_DISTRIBUTION", source: "system",
    walletAddress: "0x8f3a...9B2c", partition: "rumah-tahfidz-bintaro",
    fractions: 0, txHash: "0x789abc...012def",
    timestamp: "2026-03-25T14:00:00Z", status: "COMPLIANT",
  },
  {
    id: "aud-004", type: "MINT", source: "midtrans",
    walletAddress: "0xab12...3D4e", partition: "koperasi-wakaf-produktif",
    fractions: 100, txHash: "0x555ccc...666ddd",
    timestamp: "2026-03-22T11:20:00Z", status: "REVIEW_NEEDED",
  },
  {
    id: "aud-005", type: "TRANSFER", source: "admin",
    walletAddress: "0xf012...4C5d", partition: "sekolah-tahfidz-depok",
    fractions: 20, txHash: "0x777eee...888fff",
    timestamp: "2026-03-21T09:10:00Z", status: "COMPLIANT",
  },
];

export const CATEGORIES = ["Semua", "Masjid", "Pendidikan", "Kesehatan", "Produktif"] as const;

export function formatRupiah(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatFractionValue(fractions: number): string {
  return formatRupiah(fractions * 10_000);
}

export function truncateAddress(addr: string): string {
  if (addr.length <= 12) return addr;
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
