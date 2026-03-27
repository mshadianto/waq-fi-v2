"use client";

import { useEffect, useState } from "react";

interface WaqfAsset {
  partition: string;
  name: string;
  location: string;
  targetAmount: number;
  raisedAmount: number;
  fullyFunded: boolean;
  progressPercent: number;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Mock data used when the API gateway is not running.
const MOCK_ASSETS: WaqfAsset[] = [
  {
    partition: "0x1a2b",
    name: "Masjid Al-Ikhlas Expansion",
    location: "Jakarta Selatan, DKI Jakarta",
    targetAmount: 10000,
    raisedAmount: 6500,
    fullyFunded: false,
    progressPercent: 65,
  },
  {
    partition: "0x3c4d",
    name: "Rumah Tahfidz Bintaro",
    location: "Tangerang Selatan, Banten",
    targetAmount: 5000,
    raisedAmount: 5000,
    fullyFunded: true,
    progressPercent: 100,
  },
  {
    partition: "0x5e6f",
    name: "Klinik Wakaf Sehat",
    location: "Bandung, Jawa Barat",
    targetAmount: 8000,
    raisedAmount: 1200,
    fullyFunded: false,
    progressPercent: 15,
  },
];

export default function Dashboard() {
  const [assets, setAssets] = useState<WaqfAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [usingMock, setUsingMock] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE}/api/v1/assets`)
      .then((r) => r.json())
      .then((data) => {
        setAssets(data.assets || []);
        setLoading(false);
      })
      .catch(() => {
        // Fallback to mock data when API is unavailable
        setAssets(MOCK_ASSETS);
        setUsingMock(true);
        setLoading(false);
      });
  }, []);

  const formatRupiah = (fractions: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(fractions * 10_000);

  return (
    <main style={{ maxWidth: 960, margin: "0 auto", padding: "2rem 1rem" }}>
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#1a5632" }}>
          WaqFi Dashboard
        </h1>
        <p style={{ color: "#555", margin: "0.25rem 0" }}>
          Tokenized waqf asset catalog — micro-participation from Rp 10.000
        </p>
        {usingMock && (
          <p
            style={{
              fontSize: "0.8rem",
              color: "#b45309",
              background: "#fef3c7",
              display: "inline-block",
              padding: "0.25rem 0.5rem",
              borderRadius: 4,
              marginTop: "0.5rem",
            }}
          >
            Showing mock data (API gateway not connected)
          </p>
        )}
      </header>

      {loading ? (
        <p>Loading assets...</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {assets.map((asset) => (
            <article
              key={asset.partition}
              style={{
                background: "#fff",
                border: "1px solid #e5e7eb",
                borderRadius: 12,
                padding: "1.25rem",
                boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
              }}
            >
              <h2
                style={{
                  fontSize: "1.1rem",
                  fontWeight: 600,
                  margin: "0 0 0.25rem",
                  color: "#111",
                }}
              >
                {asset.name}
              </h2>
              <p style={{ fontSize: "0.85rem", color: "#777", margin: "0 0 1rem" }}>
                {asset.location}
              </p>

              {/* Funding progress bar */}
              <div
                style={{
                  background: "#e5e7eb",
                  borderRadius: 999,
                  height: 10,
                  overflow: "hidden",
                  marginBottom: "0.5rem",
                }}
              >
                <div
                  style={{
                    width: `${asset.progressPercent}%`,
                    height: "100%",
                    background: asset.fullyFunded ? "#16a34a" : "#2563eb",
                    borderRadius: 999,
                    transition: "width 0.6s ease",
                  }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.8rem",
                  color: "#555",
                }}
              >
                <span>{formatRupiah(asset.raisedAmount)} raised</span>
                <span>{asset.progressPercent}%</span>
              </div>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "#999",
                  margin: "0.25rem 0 0",
                }}
              >
                Target: {formatRupiah(asset.targetAmount)}
              </p>

              {asset.fullyFunded && (
                <span
                  style={{
                    display: "inline-block",
                    marginTop: "0.75rem",
                    background: "#dcfce7",
                    color: "#166534",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    padding: "0.2rem 0.6rem",
                    borderRadius: 999,
                  }}
                >
                  Fully Funded
                </span>
              )}

              {!asset.fullyFunded && (
                <button
                  style={{
                    marginTop: "0.75rem",
                    width: "100%",
                    padding: "0.5rem",
                    background: "#1a5632",
                    color: "#fff",
                    border: "none",
                    borderRadius: 8,
                    fontWeight: 600,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                  }}
                >
                  Participate — Rp 10.000
                </button>
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
