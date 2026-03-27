"use client";

import Link from "next/link";
import {
  MOCK_PORTFOLIO,
  MOCK_TRANSACTIONS,
  formatRupiah,
  formatFractionValue,
  formatDateTime,
  truncateAddress,
} from "@/lib/mockData";

const totalValue = MOCK_PORTFOLIO.reduce((s, p) => s + p.valueIdr, 0);
const totalROI = MOCK_PORTFOLIO.reduce((s, p) => s + p.roiReceived, 0);
const totalFractions = MOCK_PORTFOLIO.reduce((s, p) => s + p.fractions, 0);

const SUMMARY_CARDS = [
  { label: "Total Investasi", value: formatRupiah(totalValue), accent: "var(--green-700)", bg: "var(--green-50)" },
  { label: "ROI Diterima", value: formatRupiah(totalROI), accent: "var(--gold-600)", bg: "var(--gold-50)" },
  { label: "Total Fraksi", value: totalFractions.toString(), accent: "var(--green-600)", bg: "var(--green-50)" },
  { label: "Aset Dimiliki", value: MOCK_PORTFOLIO.length.toString(), accent: "var(--gray-700)", bg: "var(--gray-100)" },
];

export default function DashboardPage() {
  return (
    <main className="page-content">
      <div className="container">
        {/* Header */}
        <div className="animate-fade-up" style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          marginBottom: "2rem", flexWrap: "wrap", gap: 16,
        }}>
          <div>
            <h1 style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)", marginBottom: 4 }}>
              Portofolio Saya
            </h1>
            <p style={{ color: "var(--gray-500)", fontSize: "0.9rem" }}>
              Kelola aset wakaf dan pantau ROI Anda
            </p>
          </div>
          {/* KYC Status */}
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            padding: "10px 18px",
            background: "var(--green-50)",
            border: "1px solid var(--green-200)",
            borderRadius: "var(--radius-md)",
          }}>
            <div style={{
              width: 8, height: 8, borderRadius: "50%",
              background: "var(--green-500)",
              boxShadow: "0 0 0 3px rgba(45,148,100,0.2)",
            }} />
            <span style={{ fontSize: "0.82rem", fontWeight: 600, color: "var(--green-700)" }}>
              KYC Terverifikasi
            </span>
            <span style={{ fontSize: "0.72rem", color: "var(--gray-400)" }}>via VIDA</span>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="stagger" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}>
          {SUMMARY_CARDS.map((card) => (
            <div key={card.label} className="card animate-fade-up" style={{
              padding: "1.5rem",
              background: card.bg,
              borderColor: "transparent",
            }}>
              <p style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--gray-500)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {card.label}
              </p>
              <p style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.6rem",
                fontWeight: 700,
                color: card.accent,
              }}>
                {card.value}
              </p>
            </div>
          ))}
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "1.5rem",
        }}>
          {/* Owned Assets */}
          <div className="card" style={{ padding: "1.5rem", gridColumn: "1 / -1" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 600, fontFamily: "var(--font-body)" }}>
                Aset Dimiliki
              </h2>
              <Link href="/assets" className="btn btn-ghost btn-sm">+ Tambah Aset</Link>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Aset</th>
                    <th>Kategori</th>
                    <th>Fraksi</th>
                    <th>Nilai</th>
                    <th>ROI</th>
                    <th>Tanggal Beli</th>
                  </tr>
                </thead>
                <tbody>
                  {MOCK_PORTFOLIO.map((item) => (
                    <tr key={item.partition}>
                      <td>
                        <Link href={`/assets/${item.partition}`} style={{
                          fontWeight: 500, color: "var(--green-700)",
                          textDecoration: "none",
                        }}>
                          {item.assetName}
                        </Link>
                      </td>
                      <td>
                        <span className="badge badge-gray">{item.category}</span>
                      </td>
                      <td style={{ fontWeight: 600 }}>{item.fractions}x</td>
                      <td>{formatRupiah(item.valueIdr)}</td>
                      <td style={{ color: item.roiReceived > 0 ? "var(--green-600)" : "var(--gray-400)" }}>
                        {item.roiReceived > 0 ? `+${formatRupiah(item.roiReceived)}` : "—"}
                      </td>
                      <td style={{ fontSize: "0.8rem", color: "var(--gray-500)" }}>
                        {new Date(item.purchaseDate).toLocaleDateString("id-ID")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="card" style={{ padding: "1.5rem", gridColumn: "1 / -1" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 600, fontFamily: "var(--font-body)" }}>
                Transaksi Terbaru
              </h2>
              <Link href="/transparency" className="btn btn-ghost btn-sm">Lihat Semua</Link>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {MOCK_TRANSACTIONS.slice(0, 5).map((tx) => (
                <div key={tx.id} style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  padding: "14px 0",
                  borderBottom: "1px solid var(--gray-100)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 36, height: 36,
                      borderRadius: "var(--radius-sm)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      background:
                        tx.type === "MINT" ? "var(--green-50)" :
                        tx.type === "ROI_DISTRIBUTION" ? "var(--gold-50)" :
                        tx.type === "KYC_WHITELIST" ? "var(--blue-100)" : "var(--gray-100)",
                      color:
                        tx.type === "MINT" ? "var(--green-600)" :
                        tx.type === "ROI_DISTRIBUTION" ? "var(--gold-600)" :
                        tx.type === "KYC_WHITELIST" ? "var(--blue-600)" : "var(--gray-600)",
                      flexShrink: 0,
                    }}>
                      {tx.type === "MINT" && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14m-7-7h14"/></svg>
                      )}
                      {tx.type === "ROI_DISTRIBUTION" && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20m5-13l-5-5-5 5"/></svg>
                      )}
                      {tx.type === "KYC_WHITELIST" && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      )}
                      {tx.type === "TRANSFER" && (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14m-4-4l4 4-4 4"/></svg>
                      )}
                    </div>
                    <div>
                      <div style={{ fontWeight: 500, fontSize: "0.85rem", color: "var(--gray-800)" }}>
                        {tx.type === "MINT" && `Mint ${tx.fractions} fraksi`}
                        {tx.type === "ROI_DISTRIBUTION" && "Distribusi ROI"}
                        {tx.type === "KYC_WHITELIST" && "KYC Verifikasi"}
                        {tx.type === "TRANSFER" && `Transfer ${tx.fractions} fraksi`}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "var(--gray-400)" }}>
                        {tx.assetName || tx.source.toUpperCase()} &middot; {formatDateTime(tx.timestamp)}
                      </div>
                    </div>
                  </div>
                  <span style={{ fontFamily: "monospace", fontSize: "0.72rem", color: "var(--gray-400)" }}>
                    {tx.txHash}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
