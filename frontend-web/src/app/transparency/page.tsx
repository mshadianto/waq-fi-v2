"use client";

import { useState } from "react";
import { MOCK_AUDIT_EVENTS, formatDateTime } from "@/lib/mockData";

const COMPLIANCE_SUMMARY = {
  status: "COMPLIANT",
  totalEvents: 847,
  totalMints: 534,
  totalTransfers: 89,
  totalKYC: 156,
  totalROI: 68,
  lastAudit: "2026-03-25T14:00:00Z",
  bwiReportStatus: "Submitted",
  bwiLastReport: "2026-03-01",
};

const FATWA_LIST = [
  { number: "112/DSN-MUI/IX/2017", title: "Fatwa tentang Akad Ijarah", relevance: "Underlying akad untuk wakaf produktif" },
  { number: "BWI/REG/2024/001", title: "Regulasi Wakaf Uang Digital", relevance: "Legalitas tokenisasi aset wakaf" },
  { number: "POJK 12/2024", title: "Penyelenggaraan Layanan Keuangan Digital", relevance: "Kepatuhan platform digital" },
];

export default function TransparencyPage() {
  const [typeFilter, setTypeFilter] = useState<string>("ALL");

  const filteredEvents = typeFilter === "ALL"
    ? MOCK_AUDIT_EVENTS
    : MOCK_AUDIT_EVENTS.filter((e) => e.type === typeFilter);

  return (
    <main className="page-content">
      <div className="container">
        {/* Header */}
        <div className="animate-fade-up" style={{ marginBottom: "2rem" }}>
          <span className="badge badge-green" style={{ marginBottom: 12 }}>Transparansi</span>
          <h1 style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)", marginBottom: 8 }}>
            Audit & Kepatuhan
          </h1>
          <p style={{ color: "var(--gray-500)", maxWidth: 560 }}>
            Seluruh transaksi WaqFi tercatat secara permanen di blockchain Polygon dan dapat diverifikasi oleh siapa pun.
          </p>
        </div>

        {/* Compliance Summary Cards */}
        <div className="stagger" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}>
          <div className="card animate-fade-up" style={{ padding: "1.25rem", background: "var(--green-50)", borderColor: "transparent" }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--gray-500)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>
              Status Kepatuhan
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "var(--green-500)", boxShadow: "0 0 0 3px rgba(45,148,100,0.2)" }} />
              <span style={{ fontWeight: 700, color: "var(--green-700)", fontSize: "1.1rem" }}>
                Compliant
              </span>
            </div>
          </div>
          <div className="card animate-fade-up" style={{ padding: "1.25rem" }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--gray-500)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Total Transaksi</p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "var(--green-700)" }}>
              {COMPLIANCE_SUMMARY.totalEvents}
            </p>
          </div>
          <div className="card animate-fade-up" style={{ padding: "1.25rem" }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--gray-500)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>KYC Terverifikasi</p>
            <p style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "var(--green-700)" }}>
              {COMPLIANCE_SUMMARY.totalKYC}
            </p>
          </div>
          <div className="card animate-fade-up" style={{ padding: "1.25rem" }}>
            <p style={{ fontSize: "0.72rem", fontWeight: 600, color: "var(--gray-500)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>Laporan BWI</p>
            <span className="badge badge-green">{COMPLIANCE_SUMMARY.bwiReportStatus}</span>
          </div>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "1.5rem",
          alignItems: "start",
        }}>
          {/* Audit Log */}
          <div className="card" style={{ padding: "1.5rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 10 }}>
              <h2 style={{ fontSize: "1rem", fontWeight: 600, fontFamily: "var(--font-body)" }}>
                Audit Log
              </h2>
              <div style={{ display: "flex", gap: 4 }}>
                {["ALL", "MINT", "KYC_WHITELIST", "ROI_DISTRIBUTION", "TRANSFER"].map((t) => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    style={{
                      padding: "4px 10px",
                      borderRadius: "var(--radius-full)",
                      border: "1px solid",
                      borderColor: typeFilter === t ? "var(--green-500)" : "var(--gray-200)",
                      background: typeFilter === t ? "var(--green-700)" : "transparent",
                      color: typeFilter === t ? "white" : "var(--gray-500)",
                      fontSize: "0.7rem",
                      fontWeight: 500,
                    }}
                  >
                    {t === "ALL" ? "Semua" : t.replace(/_/g, " ")}
                  </button>
                ))}
              </div>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Waktu</th>
                    <th>Tipe</th>
                    <th>Wallet</th>
                    <th>Fraksi</th>
                    <th>Tx Hash</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.map((evt) => (
                    <tr key={evt.id}>
                      <td style={{ fontSize: "0.78rem", whiteSpace: "nowrap" }}>
                        {formatDateTime(evt.timestamp)}
                      </td>
                      <td>
                        <span className={`badge ${
                          evt.type === "MINT" ? "badge-green" :
                          evt.type === "KYC_WHITELIST" ? "badge-blue" :
                          evt.type === "ROI_DISTRIBUTION" ? "badge-gold" : "badge-gray"
                        }`}>
                          {evt.type.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td style={{ fontFamily: "monospace", fontSize: "0.78rem" }}>
                        {evt.walletAddress}
                      </td>
                      <td>{evt.fractions > 0 ? evt.fractions : "—"}</td>
                      <td style={{ fontFamily: "monospace", fontSize: "0.78rem" }}>
                        {evt.txHash}
                      </td>
                      <td>
                        <span className={`badge ${
                          evt.status === "COMPLIANT" ? "badge-green" :
                          evt.status === "REVIEW_NEEDED" ? "badge-gold" : "badge-red"
                        }`}>
                          {evt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredEvents.length === 0 && (
              <p style={{ textAlign: "center", padding: "2rem", color: "var(--gray-400)", fontSize: "0.85rem" }}>
                Tidak ada event untuk filter ini.
              </p>
            )}
          </div>

          {/* Right Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* BWI Reporting */}
            <div className="card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: 14, fontFamily: "var(--font-body)" }}>
                Laporan BWI
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
                  <span style={{ color: "var(--gray-500)" }}>Status</span>
                  <span className="badge badge-green">Submitted</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
                  <span style={{ color: "var(--gray-500)" }}>Periode</span>
                  <span style={{ fontWeight: 500 }}>Maret 2026</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
                  <span style={{ color: "var(--gray-500)" }}>Total Mint</span>
                  <span style={{ fontWeight: 500 }}>{COMPLIANCE_SUMMARY.totalMints}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.82rem" }}>
                  <span style={{ color: "var(--gray-500)" }}>Total ROI Dist.</span>
                  <span style={{ fontWeight: 500 }}>{COMPLIANCE_SUMMARY.totalROI}</span>
                </div>
              </div>
            </div>

            {/* On-Chain Verification */}
            <div className="card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: 14, fontFamily: "var(--font-body)" }}>
                Verifikasi On-Chain
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{
                  padding: "10px 14px",
                  background: "var(--ivory)",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.78rem",
                }}>
                  <div style={{ color: "var(--gray-500)", marginBottom: 4 }}>Contract Address</div>
                  <div style={{ fontFamily: "monospace", color: "var(--green-700)", fontWeight: 500 }}>
                    0x1234...5678
                  </div>
                </div>
                <div style={{
                  padding: "10px 14px",
                  background: "var(--ivory)",
                  borderRadius: "var(--radius-sm)",
                  fontSize: "0.78rem",
                }}>
                  <div style={{ color: "var(--gray-500)", marginBottom: 4 }}>Network</div>
                  <div style={{ fontWeight: 500, color: "var(--gray-800)" }}>Polygon PoS (Chain ID: 137)</div>
                </div>
                <button className="btn btn-outline btn-sm" style={{ width: "100%", marginTop: 4 }}>
                  Lihat di PolygonScan
                </button>
              </div>
            </div>

            {/* DSN-MUI Reference */}
            <div className="card" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "0.95rem", fontWeight: 600, marginBottom: 14, fontFamily: "var(--font-body)" }}>
                Referensi Fatwa & Regulasi
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {FATWA_LIST.map((f) => (
                  <div key={f.number} style={{
                    padding: "10px 14px",
                    border: "1px solid var(--gray-100)",
                    borderRadius: "var(--radius-sm)",
                  }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 600, color: "var(--green-700)", marginBottom: 2 }}>
                      {f.number}
                    </div>
                    <div style={{ fontSize: "0.82rem", fontWeight: 500, color: "var(--gray-800)", marginBottom: 2 }}>
                      {f.title}
                    </div>
                    <div style={{ fontSize: "0.72rem", color: "var(--gray-400)" }}>
                      {f.relevance}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 860px) {
          div[style*="grid-template-columns: 2fr 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
