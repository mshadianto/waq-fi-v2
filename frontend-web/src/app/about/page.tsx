"use client";

import { useState } from "react";
import Link from "next/link";

const TEAM = [
  { name: "Dr. Yaser Taufik Syamlan", initials: "YT", role: "Ketua Tim", affiliation: "Universitas Tazkia", bg: "linear-gradient(135deg, #1a5632, #2d9464)" },
  { name: "M. Sopian Hadianto, SE, Ak, MM", initials: "MS", role: "Tech & AI Lead", affiliation: "Badan Pengelola Keuangan Haji · github.com/mshadianto", bg: "linear-gradient(135deg, #133d22, #22714a)" },
  { name: "H. Aa, Lc.M.Pd.I, CWC", initials: "AA", role: "Sharia Compliance", affiliation: "Wakil Sekretaris ANWI, Asesor BWI Pusat", bg: "linear-gradient(135deg, #8a6d2b, #c9a84c)" },
  { name: "Ronal Rulindo, PhD", initials: "RR", role: "Research Lead", affiliation: "Academic Research", bg: "linear-gradient(135deg, #0d5445, #1a8a6e)" },
  { name: "M. Ichsan Junaedi", initials: "MI", role: "Engineer", affiliation: "github.com/IchsanJunaediDev", bg: "linear-gradient(135deg, #5c4a1e, #a5832f)" },
];

const PARTNERS = [
  { name: "BWI", desc: "Badan Wakaf Indonesia — Regulator wakaf nasional", category: "Regulator" },
  { name: "DSN-MUI", desc: "Dewan Syariah Nasional — Fatwa kepatuhan syariah", category: "Regulator" },
  { name: "VIDA", desc: "Verifikasi identitas digital berbasis AI", category: "e-KYC" },
  { name: "PrivyID", desc: "Platform e-KYC terintegrasi Dukcapil", category: "e-KYC" },
  { name: "Xendit", desc: "Payment gateway untuk pembayaran Indonesia", category: "Payment" },
  { name: "Midtrans", desc: "Payment gateway multi-channel", category: "Payment" },
  { name: "Polygon", desc: "Layer 2 blockchain untuk transaksi cepat & murah", category: "Blockchain" },
];

const FAQ = [
  {
    q: "Apa itu WaqFi?",
    a: "WaqFi adalah platform wakaf tokenisasi yang memungkinkan siapa pun berpartisipasi dalam wakaf aset tetap mulai dari Rp 10.000. Kami menggunakan teknologi blockchain Polygon dan standar ERC-1400 untuk memastikan transparansi dan kepatuhan syariah.",
  },
  {
    q: "Apakah WaqFi sesuai syariah?",
    a: "Ya. WaqFi dirancang sepenuhnya sesuai dengan fatwa DSN-MUI tentang wakaf dan terdaftar di Badan Wakaf Indonesia (BWI). Setiap aset memiliki Akta Ikrar Wakaf (AIW) yang valid.",
  },
  {
    q: "Bagaimana cara kerja fraksionalisasi?",
    a: "Aset wakaf yang sudah ada (masjid, sekolah, klinik, dll) di-tokenisasi menjadi unit-unit kecil menggunakan smart contract ERC-1400. Setiap unit mewakili partisipasi senilai Rp 10.000. Token ini tercatat di blockchain dan dapat diverifikasi publik.",
  },
  {
    q: "Mengapa perlu KYC?",
    a: "Sesuai regulasi Anti Money Laundering (AML) dan Counter-Terrorism Financing (CFT), setiap peserta wajib terverifikasi identitasnya. Kami bekerja sama dengan VIDA dan PrivyID untuk proses verifikasi yang cepat dan aman.",
  },
  {
    q: "Bagaimana distribusi ROI?",
    a: "Untuk wakaf produktif, ROI didistribusikan secara otomatis melalui smart contract ke wallet Mauquf Alaih (penerima manfaat). Seluruh distribusi tercatat di blockchain dan dapat diaudit.",
  },
  {
    q: "Apakah token bisa ditransfer?",
    a: "Transfer hanya dapat dilakukan antar wallet yang sudah terverifikasi KYC (whitelisted). Ini sesuai dengan standar ERC-1400 Security Token yang membatasi transfer untuk kepatuhan regulasi.",
  },
];

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="page-content">
      {/* Mission Section */}
      <section style={{
        background: "linear-gradient(170deg, var(--green-900), var(--green-800))",
        position: "relative",
        padding: "4rem 0",
        marginTop: "calc(-1 * var(--nav-height) - 2rem)",
        paddingTop: "calc(var(--nav-height) + 4rem)",
        overflow: "hidden",
      }}>
        <div className="geo-pattern" style={{
          top: 0, left: 0, right: 0, bottom: 0, opacity: 0.06,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='white' stroke-width='0.5'%3E%3Cpath d='M50 0L100 50L50 100L0 50Z'/%3E%3Cpath d='M50 15L85 50L50 85L15 50Z'/%3E%3Ccircle cx='50' cy='50' r='10'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="container" style={{ position: "relative", textAlign: "center" }}>
          <span className="badge" style={{
            background: "rgba(201,168,76,0.15)",
            color: "var(--gold-300)",
            border: "1px solid rgba(201,168,76,0.25)",
            marginBottom: 16,
          }}>
            Tentang WaqFi
          </span>
          <h1 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
            color: "white",
            marginBottom: 16,
            maxWidth: 600,
            margin: "0 auto 16px",
          }}>
            Demokratisasi Wakaf untuk{" "}
            <span style={{
              background: "linear-gradient(135deg, var(--gold-400), var(--gold-300))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Seluruh Umat
            </span>
          </h1>
          <p style={{
            color: "rgba(255,255,255,0.65)",
            maxWidth: 520,
            margin: "0 auto",
            fontSize: "1rem",
            lineHeight: 1.7,
          }}>
            Kami percaya wakaf seharusnya mudah diakses oleh siapa pun, bukan hanya mereka yang mampu membeli tanah atau bangunan.
            WaqFi menghadirkan teknologi blockchain untuk membuat wakaf lebih inklusif, transparan, dan terukur.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="section">
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)", marginBottom: 8 }}>
              Nilai-Nilai Kami
            </h2>
            <p style={{ color: "var(--gray-500)", maxWidth: 420, margin: "0 auto" }}>
              Tiga pilar yang mendasari setiap keputusan di WaqFi
            </p>
          </div>
          <div className="stagger" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "1.5rem",
          }}>
            {[
              {
                title: "Kepatuhan Syariah",
                desc: "Setiap fitur dan proses kami dirancang sesuai fatwa DSN-MUI dan regulasi BWI. Kepatuhan bukan tambahan — ia adalah fondasi.",
                accent: "var(--green-700)",
              },
              {
                title: "Transparansi Total",
                desc: "Seluruh transaksi tercatat di blockchain Polygon. Siapa pun dapat memverifikasi aliran dana, distribusi ROI, dan status aset.",
                accent: "var(--gold-600)",
              },
              {
                title: "Aksesibilitas",
                desc: "Dengan fraksionalisasi mulai Rp 10.000, kami menghapus hambatan ekonomi yang selama ini menghalangi partisipasi wakaf.",
                accent: "var(--green-500)",
              },
            ].map((v) => (
              <div key={v.title} className="card animate-fade-up" style={{ padding: "2rem", textAlign: "center" }}>
                <div style={{
                  width: 4,
                  height: 40,
                  background: v.accent,
                  borderRadius: 2,
                  margin: "0 auto 16px",
                }} />
                <h3 style={{ fontSize: "1.05rem", fontWeight: 600, marginBottom: 10, fontFamily: "var(--font-body)" }}>
                  {v.title}
                </h3>
                <p style={{ fontSize: "0.85rem", color: "var(--gray-500)", lineHeight: 1.7 }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section" style={{ background: "var(--white)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="badge badge-green" style={{ marginBottom: 12 }}>Tim</span>
            <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)" }}>Tim Kami</h2>
          </div>
          <div className="stagger" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "1.5rem",
            maxWidth: 960,
            margin: "0 auto",
          }}>
            {TEAM.map((member) => (
              <div key={member.name} className="card animate-fade-up" style={{
                padding: "1.75rem 1.5rem",
                textAlign: "center",
              }}>
                <div style={{
                  width: 68,
                  height: 68,
                  borderRadius: "50%",
                  background: member.bg,
                  margin: "0 auto 14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontFamily: "var(--font-display)",
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                }}>
                  {member.initials}
                </div>
                <h3 style={{ fontSize: "0.92rem", fontWeight: 600, marginBottom: 4, fontFamily: "var(--font-body)", lineHeight: 1.3 }}>
                  {member.name}
                </h3>
                <p style={{
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "var(--green-700)",
                  marginBottom: 6,
                }}>
                  {member.role}
                </p>
                <p style={{
                  fontSize: "0.72rem",
                  color: "var(--gray-400)",
                  lineHeight: 1.5,
                }}>
                  {member.affiliation}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="section" style={{ position: "relative" }}>
        <div className="geo-pattern-gold" style={{ top: 0, left: 0, right: 0, bottom: 0 }} />
        <div className="container" style={{ position: "relative" }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="badge badge-gold" style={{ marginBottom: 12 }}>Ekosistem</span>
            <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)" }}>Mitra & Partner</h2>
          </div>
          <div className="stagger" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1rem",
          }}>
            {PARTNERS.map((partner) => (
              <div key={partner.name} className="card animate-fade-up" style={{
                padding: "1.25rem",
                display: "flex",
                alignItems: "center",
                gap: 14,
              }}>
                <div style={{
                  width: 44, height: 44,
                  borderRadius: "var(--radius-md)",
                  background: partner.category === "Regulator" ? "var(--green-50)" :
                    partner.category === "e-KYC" ? "var(--blue-100)" :
                    partner.category === "Payment" ? "var(--gold-50)" : "var(--gray-100)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontWeight: 800,
                  fontSize: "0.7rem",
                  color: partner.category === "Regulator" ? "var(--green-700)" :
                    partner.category === "e-KYC" ? "var(--blue-600)" :
                    partner.category === "Payment" ? "var(--gold-700)" : "var(--gray-700)",
                  flexShrink: 0,
                }}>
                  {partner.name.slice(0, 3)}
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                    <span style={{ fontWeight: 600, fontSize: "0.9rem" }}>{partner.name}</span>
                    <span className="badge badge-gray" style={{ fontSize: "0.65rem" }}>
                      {partner.category}
                    </span>
                  </div>
                  <p style={{ fontSize: "0.78rem", color: "var(--gray-400)" }}>
                    {partner.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section" style={{ background: "var(--white)" }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <div style={{ textAlign: "center", marginBottom: "3rem" }}>
            <span className="badge badge-green" style={{ marginBottom: 12 }}>FAQ</span>
            <h2 style={{ fontSize: "clamp(1.3rem, 3vw, 1.8rem)" }}>Pertanyaan Umum</h2>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {FAQ.map((item, i) => (
              <div key={i} style={{
                border: "1px solid",
                borderColor: openFaq === i ? "var(--green-200)" : "var(--gray-200)",
                borderRadius: "var(--radius-md)",
                overflow: "hidden",
                transition: "border-color 0.2s ease",
              }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{
                    width: "100%",
                    padding: "16px 20px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: openFaq === i ? "var(--green-50)" : "var(--white)",
                    border: "none",
                    textAlign: "left",
                    fontSize: "0.9rem",
                    fontWeight: 600,
                    color: openFaq === i ? "var(--green-800)" : "var(--gray-800)",
                    transition: "all 0.2s ease",
                  }}
                >
                  {item.q}
                  <svg
                    width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2"
                    style={{
                      transform: openFaq === i ? "rotate(180deg)" : "rotate(0)",
                      transition: "transform 0.2s ease",
                      flexShrink: 0,
                      marginLeft: 12,
                    }}
                  >
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
                {openFaq === i && (
                  <div style={{
                    padding: "0 20px 16px",
                    background: "var(--green-50)",
                    fontSize: "0.85rem",
                    color: "var(--gray-600)",
                    lineHeight: 1.8,
                    animation: "fadeIn 0.2s ease",
                  }}>
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: "linear-gradient(135deg, var(--green-800), var(--green-900))",
        position: "relative",
        overflow: "hidden",
      }}>
        <div className="geo-pattern" style={{
          top: 0, left: 0, right: 0, bottom: 0, opacity: 0.05,
        }} />
        <div className="container" style={{
          position: "relative",
          textAlign: "center",
          padding: "4rem var(--page-px)",
        }}>
          <h2 style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
            color: "white",
            marginBottom: 12,
          }}>
            Mulai Perjalanan Wakaf Digital Anda
          </h2>
          <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: 28, maxWidth: 420, margin: "0 auto 28px" }}>
            Bergabung dengan ribuan wakif yang telah merasakan kemudahan wakaf tokenisasi.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/kyc" className="btn btn-gold btn-lg">Verifikasi KYC</Link>
            <Link href="/assets" className="btn btn-lg" style={{
              background: "rgba(255,255,255,0.06)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.12)",
            }}>
              Jelajahi Aset
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
