"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_ASSETS, CATEGORIES, formatFractionValue } from "@/lib/mockData";

export default function AssetsPage() {
  const [activeCategory, setActiveCategory] = useState<string>("Semua");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = MOCK_ASSETS.filter((a) => {
    const matchCat = activeCategory === "Semua" || a.category === activeCategory;
    const matchSearch =
      searchQuery === "" ||
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main className="page-content">
      <div className="container">
        {/* Header */}
        <div className="animate-fade-up" style={{ marginBottom: "2rem" }}>
          <span className="badge badge-green" style={{ marginBottom: 12 }}>Katalog</span>
          <h1 style={{ fontSize: "clamp(1.5rem, 4vw, 2rem)", marginBottom: 8 }}>
            Aset Wakaf Tersedia
          </h1>
          <p style={{ color: "var(--gray-500)", maxWidth: 520 }}>
            Pilih proyek wakaf yang sesuai dengan preferensi Anda. Semua aset telah diverifikasi dan sesuai DSN-MUI.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="animate-fade-up" style={{
          display: "flex",
          gap: 16,
          marginBottom: "2rem",
          flexWrap: "wrap",
          alignItems: "center",
          animationDelay: "100ms",
        }}>
          <div style={{ position: "relative", flex: "1 1 280px" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gray-400)" strokeWidth="2" style={{
              position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
            }}>
              <circle cx="11" cy="11" r="7"/>
              <path d="M21 21l-4.35-4.35"/>
            </svg>
            <input
              className="input"
              placeholder="Cari nama atau lokasi aset..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: 42 }}
            />
          </div>

          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: "8px 16px",
                  borderRadius: "var(--radius-full)",
                  border: "1.5px solid",
                  borderColor: activeCategory === cat ? "var(--green-600)" : "var(--gray-200)",
                  background: activeCategory === cat ? "var(--green-700)" : "var(--white)",
                  color: activeCategory === cat ? "white" : "var(--gray-600)",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  transition: "all 0.2s ease",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Results count */}
        <p style={{ fontSize: "0.8rem", color: "var(--gray-400)", marginBottom: "1.25rem" }}>
          Menampilkan {filtered.length} dari {MOCK_ASSETS.length} aset
        </p>

        {/* Asset Grid */}
        <div className="stagger" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
          gap: "1.5rem",
        }}>
          {filtered.map((asset) => (
            <Link href={`/assets/${asset.partition}`} key={asset.partition}>
              <article className="card animate-fade-up" style={{ padding: 0, overflow: "hidden" }}>
                {/* Gradient header */}
                <div style={{
                  height: 100,
                  background: asset.imageGradient,
                  position: "relative",
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                }}>
                  <div className="geo-pattern" style={{
                    top: 0, left: 0, right: 0, bottom: 0, opacity: 0.08,
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='white' stroke-width='0.5'%3E%3Cpath d='M20 0L40 20L20 40L0 20Z'/%3E%3Ccircle cx='20' cy='20' r='5'/%3E%3C/g%3E%3C/svg%3E")`,
                  }} />
                  <span className="badge" style={{
                    background: "rgba(255,255,255,0.2)",
                    color: "white",
                    backdropFilter: "blur(8px)",
                    fontSize: "0.7rem",
                  }}>
                    {asset.category}
                  </span>
                  {asset.fullyFunded && (
                    <span className="badge" style={{
                      background: "rgba(201,168,76,0.3)",
                      color: "var(--gold-100)",
                      backdropFilter: "blur(8px)",
                      fontSize: "0.7rem",
                    }}>
                      Fully Funded
                    </span>
                  )}
                </div>

                <div style={{ padding: "18px 20px 20px" }}>
                  <h3 style={{
                    fontSize: "1rem",
                    fontWeight: 600,
                    marginBottom: 4,
                    fontFamily: "var(--font-body)",
                    color: "var(--gray-900)",
                  }}>
                    {asset.name}
                  </h3>
                  <p style={{ fontSize: "0.8rem", color: "var(--gray-400)", marginBottom: 14 }}>
                    {asset.location}
                  </p>

                  <div className="progress-track">
                    <div className={`progress-fill ${asset.fullyFunded ? "funded" : ""}`} style={{ width: `${asset.progressPercent}%` }} />
                  </div>

                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    marginTop: 8, fontSize: "0.78rem",
                  }}>
                    <span style={{ color: "var(--green-700)", fontWeight: 600 }}>
                      {formatFractionValue(asset.raisedAmount)}
                    </span>
                    <span style={{ color: "var(--gray-400)" }}>
                      {asset.progressPercent}% dari {formatFractionValue(asset.targetAmount)}
                    </span>
                  </div>

                  <div style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--gray-100)",
                  }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--gray-400)" }}>
                      {asset.participantCount} wakif
                    </span>
                    {!asset.fullyFunded ? (
                      <span className="btn btn-primary btn-sm" style={{ padding: "6px 14px", fontSize: "0.75rem" }}>
                        Wakaf Sekarang
                      </span>
                    ) : (
                      <span className="badge badge-gold">Selesai</span>
                    )}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{
            textAlign: "center", padding: "4rem 1rem",
            color: "var(--gray-400)",
          }}>
            <p style={{ fontSize: "1.1rem", marginBottom: 8 }}>Tidak ada aset ditemukan</p>
            <p style={{ fontSize: "0.85rem" }}>Coba ubah filter atau kata kunci pencarian.</p>
          </div>
        )}
      </div>
    </main>
  );
}
