"use client";

import Link from "next/link";
import { MOCK_ASSETS, formatFractionValue } from "@/lib/mockData";

const STATS = [
  { value: "Rp 2.3M+", label: "Total Wakaf Terkumpul" },
  { value: "1,781", label: "Wakif Terdaftar" },
  { value: "6", label: "Proyek Aktif" },
  { value: "100%", label: "On-Chain Transparan" },
];

const FEATURES = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="2" y="6" width="24" height="16" rx="3" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M2 11h24" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="5" y="15" width="8" height="3" rx="1" stroke="currentColor" strokeWidth="1"/>
      </svg>
    ),
    title: "Mulai Rp 10.000",
    desc: "Partisipasi wakaf dengan nominal terjangkau. Fraksionalisasi aset memungkinkan siapa pun berkontribusi.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 2L26 9v10l-12 7L2 19V9l12-7z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
        <path d="M14 8l6 3.5v7L14 22l-6-3.5v-7L14 8z" stroke="currentColor" strokeWidth="1" fill="none"/>
        <circle cx="14" cy="14" r="2.5" stroke="currentColor" strokeWidth="1"/>
      </svg>
    ),
    title: "Blockchain Polygon",
    desc: "Setiap transaksi tercatat di blockchain Polygon L2. Transparan, immutable, dan dapat diverifikasi publik.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 3l3 6h7l-5.5 4.5 2 7L14 17l-6.5 3.5 2-7L4 9h7l3-6z" stroke="currentColor" strokeWidth="1.5" fill="none"/>
      </svg>
    ),
    title: "DSN-MUI Compliant",
    desc: "Sesuai fatwa DSN-MUI tentang wakaf. Terdaftar di Badan Wakaf Indonesia (BWI) untuk kepatuhan penuh.",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="4" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M10 14l3 3 5-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "e-KYC Terverifikasi",
    desc: "Integrasi VIDA & PrivyID untuk verifikasi identitas. Anti money laundering sesuai regulasi OJK.",
  },
];

const STEPS = [
  { num: "01", title: "Verifikasi Identitas", desc: "Daftarkan wallet dan selesaikan e-KYC melalui VIDA atau PrivyID dalam hitungan menit." },
  { num: "02", title: "Pilih Aset Wakaf", desc: "Jelajahi katalog aset wakaf terverifikasi. Lihat progress, lokasi, dan penerima manfaat." },
  { num: "03", title: "Partisipasi & Mint", desc: "Bayar mulai Rp 10.000 via Xendit/Midtrans. Token fraksi otomatis di-mint ke wallet Anda." },
  { num: "04", title: "Pantau & Terima ROI", desc: "Lacak portofolio Anda secara real-time. Terima distribusi ROI otomatis dari smart contract." },
];

export default function LandingPage() {
  const featuredAssets = MOCK_ASSETS.slice(0, 3);

  return (
    <main>
      {/* ═══════════════ HERO ═══════════════ */}
      <section style={{
        position: "relative",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: "linear-gradient(170deg, var(--green-900) 0%, var(--green-800) 40%, var(--green-700) 100%)",
        overflow: "hidden",
      }}>
        {/* Geometric pattern overlay */}
        <div className="geo-pattern" style={{
          top: 0, left: 0, right: 0, bottom: 0,
          opacity: 0.06,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='white' stroke-width='0.6'%3E%3Cpath d='M60 0L120 60L60 120L0 60Z'/%3E%3Cpath d='M60 15L105 60L60 105L15 60Z'/%3E%3Cpath d='M60 30L90 60L60 90L30 60Z'/%3E%3Ccircle cx='60' cy='60' r='12'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        {/* Gold accent orb */}
        <div style={{
          position: "absolute",
          top: "10%",
          right: "-5%",
          width: 500,
          height: 500,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,76,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute",
          bottom: "-10%",
          left: "-10%",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(45,148,100,0.15) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: "var(--nav-height)" }}>
          <div style={{
            maxWidth: 700,
            padding: "4rem 0",
          }}>
            {/* Tag */}
            <div className="animate-fade-up" style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "rgba(201,168,76,0.15)",
              border: "1px solid rgba(201,168,76,0.25)",
              borderRadius: "var(--radius-full)",
              padding: "6px 16px",
              marginBottom: 24,
            }}>
              <div style={{
                width: 6, height: 6,
                borderRadius: "50%",
                background: "var(--gold-400)",
                animation: "pulse-gold 2s infinite",
              }} />
              <span style={{ color: "var(--gold-300)", fontSize: "0.8rem", fontWeight: 500 }}>
                Polygon L2 &middot; ERC-1400 Security Token
              </span>
            </div>

            <h1 className="animate-fade-up" style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 6vw, 4rem)",
              fontWeight: 700,
              color: "white",
              lineHeight: 1.1,
              marginBottom: 20,
              animationDelay: "100ms",
            }}>
              Wakaf Digital untuk{" "}
              <span style={{
                background: "linear-gradient(135deg, var(--gold-400), var(--gold-300))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                Semua Umat
              </span>
            </h1>

            <p className="animate-fade-up" style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)",
              color: "rgba(255,255,255,0.7)",
              lineHeight: 1.7,
              marginBottom: 36,
              maxWidth: 560,
              animationDelay: "200ms",
            }}>
              Fraksionalisasi aset wakaf dengan teknologi blockchain. Mulai partisipasi dari Rp 10.000 — transparan, aman, dan sesuai syariah.
            </p>

            <div className="animate-fade-up" style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              animationDelay: "300ms",
            }}>
              <Link href="/assets" className="btn btn-gold btn-lg">
                Jelajahi Aset Wakaf
              </Link>
              <Link href="/about" className="btn btn-lg" style={{
                background: "rgba(255,255,255,0.08)",
                color: "white",
                border: "1px solid rgba(255,255,255,0.15)",
                backdropFilter: "blur(10px)",
              }}>
                Pelajari Lebih Lanjut
              </Link>
            </div>

            {/* Trust badges */}
            <div className="animate-fade-up" style={{
              display: "flex",
              gap: 24,
              marginTop: 48,
              paddingTop: 32,
              borderTop: "1px solid rgba(255,255,255,0.08)",
              flexWrap: "wrap",
              animationDelay: "400ms",
            }}>
              {["DSN-MUI", "BWI", "VIDA", "Xendit"].map((partner) => (
                <span key={partner} style={{
                  color: "rgba(255,255,255,0.35)",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                }}>
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ STATS ═══════════════ */}
      <section style={{
        background: "var(--white)",
        borderBottom: "1px solid rgba(13,43,24,0.06)",
      }}>
        <div className="container">
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: 0,
          }}>
            {STATS.map((stat, i) => (
              <div key={stat.label} className="animate-fade-up" style={{
                textAlign: "center",
                padding: "2.5rem 1rem",
                borderRight: i < STATS.length - 1 ? "1px solid var(--gray-100)" : "none",
                animationDelay: `${i * 100}ms`,
              }}>
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2rem",
                  fontWeight: 700,
                  color: "var(--green-700)",
                  marginBottom: 4,
                }}>
                  {stat.value}
                </div>
                <div style={{ fontSize: "0.8rem", color: "var(--gray-500)", fontWeight: 500 }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURES ═══════════════ */}
      <section className="section" style={{ position: "relative" }}>
        <div className="geo-pattern" style={{ top: 0, left: 0, right: 0, bottom: 0 }} />
        <div className="container" style={{ position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span className="badge badge-gold" style={{ marginBottom: 12 }}>Keunggulan</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", marginBottom: 12 }}>
              Mengapa WaqFi?
            </h2>
            <p style={{ color: "var(--gray-500)", maxWidth: 500, margin: "0 auto", fontSize: "0.95rem" }}>
              Teknologi blockchain bertemu kepatuhan syariah untuk menciptakan ekosistem wakaf yang modern dan terpercaya.
            </p>
          </div>

          <div className="stagger" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "1.5rem",
          }}>
            {FEATURES.map((f) => (
              <div key={f.title} className="card animate-fade-up" style={{ padding: "2rem" }}>
                <div style={{
                  width: 52,
                  height: 52,
                  borderRadius: "var(--radius-md)",
                  background: "var(--green-50)",
                  color: "var(--green-600)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                }}>
                  {f.icon}
                </div>
                <h3 style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: 8, fontFamily: "var(--font-body)" }}>
                  {f.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--gray-500)", lineHeight: 1.7 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FEATURED ASSETS ═══════════════ */}
      <section className="section" style={{ background: "var(--white)" }}>
        <div className="container">
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: "2.5rem",
            flexWrap: "wrap",
            gap: 16,
          }}>
            <div>
              <span className="badge badge-green" style={{ marginBottom: 12 }}>Aset Pilihan</span>
              <h2 style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)" }}>Proyek Wakaf Unggulan</h2>
            </div>
            <Link href="/assets" className="btn btn-outline btn-sm">
              Lihat Semua
            </Link>
          </div>

          <div className="stagger" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}>
            {featuredAssets.map((asset) => (
              <Link href={`/assets/${asset.partition}`} key={asset.partition}>
                <article className="card animate-fade-up" style={{ padding: 0, overflow: "hidden" }}>
                  {/* Card header gradient */}
                  <div style={{
                    height: 120,
                    background: asset.imageGradient,
                    position: "relative",
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "16px 20px",
                  }}>
                    <div className="geo-pattern" style={{
                      top: 0, left: 0, right: 0, bottom: 0,
                      opacity: 0.08,
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
                  </div>

                  <div style={{ padding: "20px" }}>
                    <h3 style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      marginBottom: 4,
                      fontFamily: "var(--font-body)",
                      color: "var(--gray-900)",
                    }}>
                      {asset.name}
                    </h3>
                    <p style={{ fontSize: "0.8rem", color: "var(--gray-400)", marginBottom: 16 }}>
                      {asset.location}
                    </p>

                    <div className={`progress-track`}>
                      <div className={`progress-fill ${asset.fullyFunded ? "funded" : ""}`} style={{ width: `${asset.progressPercent}%` }} />
                    </div>

                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: 8,
                      fontSize: "0.78rem",
                    }}>
                      <span style={{ color: "var(--gray-600)", fontWeight: 500 }}>
                        {formatFractionValue(asset.raisedAmount)}
                      </span>
                      <span style={{ color: "var(--gray-400)" }}>
                        {asset.progressPercent}%
                      </span>
                    </div>

                    <div style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginTop: 12,
                      paddingTop: 12,
                      borderTop: "1px solid var(--gray-100)",
                      fontSize: "0.75rem",
                      color: "var(--gray-400)",
                    }}>
                      <span>{asset.participantCount} wakif</span>
                      <span>Target: {formatFractionValue(asset.targetAmount)}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section className="section" style={{ position: "relative" }}>
        <div className="geo-pattern-gold" style={{ top: 0, left: 0, right: 0, bottom: 0 }} />
        <div className="container" style={{ position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
            <span className="badge badge-gold" style={{ marginBottom: 12 }}>Cara Kerja</span>
            <h2 style={{ fontSize: "clamp(1.5rem, 4vw, 2.2rem)", marginBottom: 12 }}>
              4 Langkah Mudah
            </h2>
            <p style={{ color: "var(--gray-500)", maxWidth: 480, margin: "0 auto" }}>
              Dari verifikasi identitas hingga menerima ROI — semuanya terotomasi oleh smart contract.
            </p>
          </div>

          <div className="stagger" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "1.5rem",
          }}>
            {STEPS.map((step) => (
              <div key={step.num} className="card animate-fade-up" style={{
                position: "relative",
                padding: "2rem 1.5rem",
                textAlign: "center",
              }}>
                <div style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2.5rem",
                  fontWeight: 700,
                  color: "var(--green-100)",
                  marginBottom: 8,
                  lineHeight: 1,
                }}>
                  {step.num}
                </div>
                <h3 style={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  marginBottom: 8,
                  fontFamily: "var(--font-body)",
                  color: "var(--green-800)",
                }}>
                  {step.title}
                </h3>
                <p style={{ fontSize: "0.83rem", color: "var(--gray-500)", lineHeight: 1.7 }}>
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA ═══════════════ */}
      <section style={{
        background: "linear-gradient(135deg, var(--green-800), var(--green-900))",
        position: "relative",
        overflow: "hidden",
      }}>
        <div className="geo-pattern" style={{
          top: 0, left: 0, right: 0, bottom: 0,
          opacity: 0.05,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='white' stroke-width='0.5'%3E%3Cpath d='M50 0L100 50L50 100L0 50Z'/%3E%3Cpath d='M50 20L80 50L50 80L20 50Z'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="container" style={{
          position: "relative",
          textAlign: "center",
          padding: "5rem var(--page-px)",
        }}>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.5rem, 4vw, 2.2rem)",
            color: "white",
            marginBottom: 16,
          }}>
            Siap Berwakaf dengan Cara Baru?
          </h2>
          <p style={{
            color: "rgba(255,255,255,0.6)",
            maxWidth: 480,
            margin: "0 auto 32px",
            fontSize: "0.95rem",
          }}>
            Bergabung dengan ribuan wakif yang sudah merasakan kemudahan wakaf digital berbasis blockchain.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/kyc" className="btn btn-gold btn-lg">
              Mulai Verifikasi KYC
            </Link>
            <Link href="/assets" className="btn btn-lg" style={{
              background: "rgba(255,255,255,0.06)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.12)",
            }}>
              Lihat Katalog
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
