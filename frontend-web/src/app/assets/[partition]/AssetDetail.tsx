"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  MOCK_ASSETS,
  MOCK_TRANSACTIONS,
  formatFractionValue,
  formatRupiah,
  formatDateTime,
  truncateAddress,
} from "@/lib/mockData";

const AMOUNT_OPTIONS = [1, 5, 10, 25, 50, 100];

export default function AssetDetailPage() {
  const { partition } = useParams<{ partition: string }>();
  const asset = MOCK_ASSETS.find((a) => a.partition === partition);
  const [selectedAmount, setSelectedAmount] = useState(1);
  const [customAmount, setCustomAmount] = useState("");

  if (!asset) {
    return (
      <main className="page-content">
        <div className="container" style={{ textAlign: "center", padding: "6rem 1rem" }}>
          <h1 style={{ fontSize: "1.5rem", marginBottom: 12 }}>Aset Tidak Ditemukan</h1>
          <p style={{ color: "var(--gray-500)", marginBottom: 24 }}>Partition &quot;{partition}&quot; tidak tersedia.</p>
          <Link href="/assets" className="btn btn-primary">Kembali ke Katalog</Link>
        </div>
      </main>
    );
  }

  const assetTxs = MOCK_TRANSACTIONS.filter(
    (t) => t.partition === asset.partition
  );
  const actualAmount = customAmount ? parseInt(customAmount) || 1 : selectedAmount;

  return (
    <main className="page-content">
      {/* Hero Banner */}
      <div style={{
        background: asset.imageGradient,
        position: "relative",
        padding: "3rem 0 4rem",
        marginTop: "calc(-1 * var(--nav-height) - 2rem)",
        paddingTop: "calc(var(--nav-height) + 3rem)",
        overflow: "hidden",
      }}>
        <div className="geo-pattern" style={{
          top: 0, left: 0, right: 0, bottom: 0, opacity: 0.08,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='white' stroke-width='0.5'%3E%3Cpath d='M30 0L60 30L30 60L0 30Z'/%3E%3Cpath d='M30 10L50 30L30 50L10 30Z'/%3E%3Ccircle cx='30' cy='30' r='6'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="container" style={{ position: "relative" }}>
          <Link href="/assets" style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            color: "rgba(255,255,255,0.7)", fontSize: "0.85rem",
            marginBottom: 16,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
            Kembali ke Katalog
          </Link>
          <div style={{ display: "flex", gap: 10, marginBottom: 12, flexWrap: "wrap" }}>
            <span className="badge" style={{ background: "rgba(255,255,255,0.2)", color: "white", backdropFilter: "blur(8px)" }}>
              {asset.category}
            </span>
            {asset.fullyFunded && (
              <span className="badge" style={{ background: "rgba(201,168,76,0.3)", color: "var(--gold-100)" }}>
                Fully Funded
              </span>
            )}
          </div>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
            color: "white",
            marginBottom: 8,
          }}>
            {asset.name}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "0.9rem" }}>
            {asset.location}
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: -32 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 380px",
          gap: "2rem",
          alignItems: "start",
        }}>
          {/* Left Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Progress Card */}
            <div className="card" style={{ padding: "1.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6, fontSize: "0.85rem" }}>
                <span style={{ fontWeight: 600, color: "var(--green-700)" }}>
                  {formatFractionValue(asset.raisedAmount)} terkumpul
                </span>
                <span style={{ color: "var(--gray-400)" }}>
                  {asset.progressPercent}%
                </span>
              </div>
              <div className="progress-track lg">
                <div className={`progress-fill ${asset.fullyFunded ? "funded" : ""}`} style={{ width: `${asset.progressPercent}%` }} />
              </div>
              <div style={{
                display: "flex", justifyContent: "space-between",
                marginTop: 10, fontSize: "0.78rem", color: "var(--gray-400)",
              }}>
                <span>{asset.participantCount} wakif berpartisipasi</span>
                <span>Target: {formatFractionValue(asset.targetAmount)}</span>
              </div>
            </div>

            {/* Description */}
            <div className="card" style={{ padding: "1.75rem" }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 12, fontFamily: "var(--font-body)" }}>
                Tentang Proyek
              </h2>
              <p style={{ fontSize: "0.9rem", color: "var(--gray-600)", lineHeight: 1.8 }}>
                {asset.description}
              </p>
            </div>

            {/* Mauquf Alaih */}
            <div className="card" style={{ padding: "1.75rem" }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 16, fontFamily: "var(--font-body)" }}>
                Penerima Manfaat (Mauquf Alaih)
              </h2>
              <div style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "14px 18px",
                background: "var(--green-50)",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--green-100)",
              }}>
                <div style={{
                  width: 44, height: 44,
                  borderRadius: "var(--radius-md)",
                  background: "linear-gradient(135deg, var(--green-600), var(--green-400))",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: "white", fontWeight: 700, fontSize: "1rem",
                  flexShrink: 0,
                }}>
                  {asset.mauqufAlaih.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--green-800)" }}>
                    {asset.mauqufAlaih}
                  </div>
                  <div style={{ fontSize: "0.78rem", color: "var(--gray-400)", fontFamily: "monospace" }}>
                    {asset.mauqufAlaihAddress}
                  </div>
                </div>
              </div>
            </div>

            {/* Documents */}
            <div className="card" style={{ padding: "1.75rem" }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 16, fontFamily: "var(--font-body)" }}>
                Dokumen & Sertifikat
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[
                  { name: "Akta Ikrar Wakaf (AIW)", hash: "0xabcd...ef01" },
                  { name: "Sertifikat Tanah Wakaf", hash: "0x1234...5678" },
                  { name: "Fatwa DSN-MUI", hash: "0x9abc...def0" },
                ].map((doc) => (
                  <div key={doc.name} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "12px 16px",
                    border: "1px solid var(--gray-100)",
                    borderRadius: "var(--radius-sm)",
                    fontSize: "0.85rem",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--green-600)" strokeWidth="1.5">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                        <polyline points="14,2 14,8 20,8"/>
                      </svg>
                      <span style={{ color: "var(--gray-700)" }}>{doc.name}</span>
                    </div>
                    <span style={{ fontFamily: "monospace", fontSize: "0.75rem", color: "var(--gray-400)" }}>
                      {doc.hash}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Transaction History */}
            <div className="card" style={{ padding: "1.75rem" }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 16, fontFamily: "var(--font-body)" }}>
                Riwayat Transaksi
              </h2>
              {assetTxs.length > 0 ? (
                <div className="table-wrap">
                  <table>
                    <thead>
                      <tr>
                        <th>Tipe</th>
                        <th>Wallet</th>
                        <th>Fraksi</th>
                        <th>Tx Hash</th>
                        <th>Waktu</th>
                      </tr>
                    </thead>
                    <tbody>
                      {assetTxs.map((tx) => (
                        <tr key={tx.id}>
                          <td>
                            <span className={`badge ${tx.type === "MINT" ? "badge-green" : tx.type === "ROI_DISTRIBUTION" ? "badge-gold" : "badge-blue"}`}>
                              {tx.type}
                            </span>
                          </td>
                          <td style={{ fontFamily: "monospace", fontSize: "0.78rem" }}>
                            {truncateAddress(tx.walletAddress)}
                          </td>
                          <td>{tx.fractions > 0 ? tx.fractions : "—"}</td>
                          <td style={{ fontFamily: "monospace", fontSize: "0.78rem" }}>
                            {tx.txHash}
                          </td>
                          <td style={{ fontSize: "0.78rem" }}>
                            {formatDateTime(tx.timestamp)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p style={{ color: "var(--gray-400)", fontSize: "0.85rem", textAlign: "center", padding: "2rem" }}>
                  Belum ada transaksi untuk aset ini.
                </p>
              )}
            </div>
          </div>

          {/* Right Sidebar — Participation Form */}
          <div style={{ position: "sticky", top: "calc(var(--nav-height) + 1.5rem)" }}>
            <div className="card" style={{
              padding: "1.75rem",
              border: "1.5px solid var(--green-200)",
              background: "linear-gradient(180deg, var(--white) 0%, var(--green-50) 100%)",
            }}>
              <h3 style={{ fontSize: "1rem", fontWeight: 600, marginBottom: 4, fontFamily: "var(--font-body)" }}>
                Partisipasi Wakaf
              </h3>
              <p style={{ fontSize: "0.78rem", color: "var(--gray-400)", marginBottom: 20 }}>
                Minimum Rp 10.000 per fraksi
              </p>

              {/* Amount selector */}
              <label style={{ fontSize: "0.8rem", fontWeight: 500, color: "var(--gray-600)", marginBottom: 8, display: "block" }}>
                Jumlah Fraksi
              </label>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: 8,
                marginBottom: 12,
              }}>
                {AMOUNT_OPTIONS.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => { setSelectedAmount(amt); setCustomAmount(""); }}
                    style={{
                      padding: "10px 0",
                      borderRadius: "var(--radius-sm)",
                      border: "1.5px solid",
                      borderColor: selectedAmount === amt && !customAmount ? "var(--green-600)" : "var(--gray-200)",
                      background: selectedAmount === amt && !customAmount ? "var(--green-50)" : "var(--white)",
                      color: selectedAmount === amt && !customAmount ? "var(--green-700)" : "var(--gray-600)",
                      fontWeight: 600,
                      fontSize: "0.85rem",
                      transition: "all 0.15s ease",
                    }}
                  >
                    {amt}x
                  </button>
                ))}
              </div>

              <input
                className="input"
                type="number"
                min="1"
                placeholder="Atau masukkan jumlah custom..."
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                style={{ marginBottom: 16 }}
              />

              {/* Summary */}
              <div style={{
                padding: "14px 16px",
                background: "var(--ivory-warm)",
                borderRadius: "var(--radius-sm)",
                marginBottom: 16,
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: 6 }}>
                  <span style={{ color: "var(--gray-500)" }}>Fraksi</span>
                  <span style={{ fontWeight: 600 }}>{actualAmount}x</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem", marginBottom: 6 }}>
                  <span style={{ color: "var(--gray-500)" }}>Harga per fraksi</span>
                  <span>{formatRupiah(10_000)}</span>
                </div>
                <div style={{
                  display: "flex", justifyContent: "space-between",
                  fontSize: "0.95rem", fontWeight: 700,
                  paddingTop: 8, borderTop: "1px solid var(--gray-200)",
                  color: "var(--green-800)",
                }}>
                  <span>Total</span>
                  <span>{formatRupiah(actualAmount * 10_000)}</span>
                </div>
              </div>

              <button
                className="btn btn-primary"
                disabled={asset.fullyFunded}
                style={{
                  width: "100%",
                  padding: "14px 0",
                  fontSize: "0.95rem",
                  opacity: asset.fullyFunded ? 0.5 : 1,
                }}
              >
                {asset.fullyFunded ? "Aset Sudah Terdanai" : "Bayar & Mint Token"}
              </button>

              <p style={{
                fontSize: "0.72rem",
                color: "var(--gray-400)",
                textAlign: "center",
                marginTop: 12,
                lineHeight: 1.6,
              }}>
                Pembayaran via Xendit/Midtrans. Token akan di-mint ke wallet Anda setelah pembayaran dikonfirmasi.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 860px) {
          div[style*="grid-template-columns: 1fr 380px"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
