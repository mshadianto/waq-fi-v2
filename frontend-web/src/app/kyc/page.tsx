"use client";

import { useState } from "react";
import Link from "next/link";

type Step = 0 | 1 | 2 | 3;

const STEPS = [
  { title: "Hubungkan Wallet", icon: "wallet" },
  { title: "Upload KTP", icon: "id" },
  { title: "Verifikasi Selfie", icon: "camera" },
  { title: "Status", icon: "check" },
];

export default function KYCPage() {
  const [currentStep, setCurrentStep] = useState<Step>(0);
  const [provider, setProvider] = useState<"vida" | "privyid">("vida");
  const [walletConnected, setWalletConnected] = useState(false);
  const [ktpUploaded, setKtpUploaded] = useState(false);
  const [selfieUploaded, setSelfieUploaded] = useState(false);

  const goNext = () => {
    if (currentStep < 3) setCurrentStep((s) => (s + 1) as Step);
  };

  return (
    <main className="page-content">
      <div className="container" style={{ maxWidth: 720 }}>
        {/* Header */}
        <div className="animate-fade-up" style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <span className="badge badge-green" style={{ marginBottom: 12 }}>e-KYC</span>
          <h1 style={{ fontSize: "clamp(1.4rem, 3vw, 1.8rem)", marginBottom: 8 }}>
            Verifikasi Identitas
          </h1>
          <p style={{ color: "var(--gray-500)", maxWidth: 480, margin: "0 auto" }}>
            Selesaikan verifikasi KYC untuk mulai berpartisipasi dalam wakaf. Proses hanya memakan waktu 2-3 menit.
          </p>
        </div>

        {/* Step Indicator */}
        <div className="animate-fade-up" style={{
          display: "flex",
          justifyContent: "center",
          gap: 0,
          marginBottom: "3rem",
          animationDelay: "100ms",
        }}>
          {STEPS.map((step, i) => (
            <div key={step.title} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{
                  width: 40, height: 40,
                  borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: i <= currentStep
                    ? "linear-gradient(135deg, var(--green-700), var(--green-600))"
                    : "var(--gray-100)",
                  color: i <= currentStep ? "white" : "var(--gray-400)",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  transition: "all 0.3s var(--ease-out)",
                  boxShadow: i === currentStep ? "0 0 0 4px rgba(26,86,50,0.15)" : "none",
                }}>
                  {i < currentStep ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M5 12l5 5L20 7"/>
                    </svg>
                  ) : (
                    i + 1
                  )}
                </div>
                <span style={{
                  fontSize: "0.7rem",
                  fontWeight: i <= currentStep ? 600 : 400,
                  color: i <= currentStep ? "var(--green-700)" : "var(--gray-400)",
                  whiteSpace: "nowrap",
                }}>
                  {step.title}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{
                  width: 60,
                  height: 2,
                  background: i < currentStep ? "var(--green-400)" : "var(--gray-200)",
                  margin: "0 8px",
                  marginBottom: 22,
                  borderRadius: 1,
                  transition: "background 0.3s ease",
                }} />
              )}
            </div>
          ))}
        </div>

        {/* Provider Selection */}
        {currentStep === 0 && (
          <div className="animate-fade-up" style={{ marginBottom: "1.5rem" }}>
            <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--gray-700)", display: "block", marginBottom: 10 }}>
              Pilih Provider e-KYC
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              {(["vida", "privyid"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setProvider(p)}
                  style={{
                    padding: "16px",
                    borderRadius: "var(--radius-md)",
                    border: "2px solid",
                    borderColor: provider === p ? "var(--green-500)" : "var(--gray-200)",
                    background: provider === p ? "var(--green-50)" : "var(--white)",
                    textAlign: "center",
                    transition: "all 0.2s ease",
                  }}
                >
                  <div style={{
                    fontWeight: 700,
                    fontSize: "1rem",
                    color: provider === p ? "var(--green-700)" : "var(--gray-600)",
                    marginBottom: 4,
                  }}>
                    {p === "vida" ? "VIDA" : "PrivyID"}
                  </div>
                  <div style={{ fontSize: "0.75rem", color: "var(--gray-400)" }}>
                    {p === "vida" ? "Verifikasi biometrik AI" : "e-KYC terintegrasi Dukcapil"}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step Content */}
        <div className="card" style={{ padding: "2rem" }}>
          {/* Step 0: Connect Wallet */}
          {currentStep === 0 && (
            <div className="animate-fade-up">
              <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: 8, fontFamily: "var(--font-body)" }}>
                Hubungkan Wallet Anda
              </h2>
              <p style={{ color: "var(--gray-500)", fontSize: "0.85rem", marginBottom: 20 }}>
                Hubungkan wallet Polygon Anda untuk memulai proses verifikasi. Wallet ini akan digunakan untuk menerima token wakaf.
              </p>

              {!walletConnected ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <button
                    onClick={() => setWalletConnected(true)}
                    className="btn btn-primary"
                    style={{ width: "100%", padding: 16 }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="2" y="6" width="20" height="14" rx="2"/>
                      <path d="M16 14h.01"/>
                      <path d="M2 10h20"/>
                    </svg>
                    MetaMask
                  </button>
                  <button className="btn btn-outline" style={{ width: "100%", padding: 16 }}>
                    WalletConnect
                  </button>
                </div>
              ) : (
                <div style={{
                  padding: "16px",
                  background: "var(--green-50)",
                  border: "1px solid var(--green-200)",
                  borderRadius: "var(--radius-md)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 8, height: 8, borderRadius: "50%",
                      background: "var(--green-500)",
                    }} />
                    <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--green-700)" }}>
                      Wallet terhubung
                    </span>
                  </div>
                  <span style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "var(--gray-500)" }}>
                    0x742d...4a3E
                  </span>
                </div>
              )}

              {walletConnected && (
                <button onClick={goNext} className="btn btn-primary" style={{ width: "100%", marginTop: 16 }}>
                  Lanjutkan
                </button>
              )}
            </div>
          )}

          {/* Step 1: Upload KTP */}
          {currentStep === 1 && (
            <div className="animate-fade-up">
              <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: 8, fontFamily: "var(--font-body)" }}>
                Upload Kartu Tanda Penduduk (KTP)
              </h2>
              <p style={{ color: "var(--gray-500)", fontSize: "0.85rem", marginBottom: 20 }}>
                Foto KTP Anda akan diverifikasi oleh {provider === "vida" ? "VIDA" : "PrivyID"} secara otomatis.
              </p>

              {!ktpUploaded ? (
                <button
                  onClick={() => setKtpUploaded(true)}
                  style={{
                    width: "100%",
                    padding: "3rem 1rem",
                    border: "2px dashed var(--gray-300)",
                    borderRadius: "var(--radius-md)",
                    background: "var(--ivory)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 12,
                    color: "var(--gray-500)",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--green-500)" strokeWidth="1.5">
                    <rect x="3" y="5" width="18" height="14" rx="2"/>
                    <circle cx="12" cy="12" r="3"/>
                    <path d="M17 8h.01"/>
                  </svg>
                  <span style={{ fontWeight: 500 }}>Klik untuk upload foto KTP</span>
                  <span style={{ fontSize: "0.75rem" }}>JPG, PNG maks. 5MB</span>
                </button>
              ) : (
                <div style={{
                  padding: "16px",
                  background: "var(--green-50)",
                  border: "1px solid var(--green-200)",
                  borderRadius: "var(--radius-md)",
                  display: "flex", alignItems: "center", gap: 10,
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--green-600)" strokeWidth="2">
                    <path d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--green-700)" }}>
                    KTP berhasil diupload
                  </span>
                </div>
              )}

              {ktpUploaded && (
                <button onClick={goNext} className="btn btn-primary" style={{ width: "100%", marginTop: 16 }}>
                  Lanjutkan ke Verifikasi Selfie
                </button>
              )}
            </div>
          )}

          {/* Step 2: Selfie Verification */}
          {currentStep === 2 && (
            <div className="animate-fade-up">
              <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: 8, fontFamily: "var(--font-body)" }}>
                Verifikasi Selfie (Liveness Check)
              </h2>
              <p style={{ color: "var(--gray-500)", fontSize: "0.85rem", marginBottom: 20 }}>
                Ambil foto selfie untuk dicocokkan dengan KTP Anda. Pastikan pencahayaan memadai.
              </p>

              {!selfieUploaded ? (
                <button
                  onClick={() => setSelfieUploaded(true)}
                  style={{
                    width: "100%",
                    padding: "3rem 1rem",
                    border: "2px dashed var(--gray-300)",
                    borderRadius: "var(--radius-md)",
                    background: "var(--ivory)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 12,
                    color: "var(--gray-500)",
                    cursor: "pointer",
                  }}
                >
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--green-500)" strokeWidth="1.5">
                    <path d="M12 16a4 4 0 100-8 4 4 0 000 8z"/>
                    <path d="M3 16V8a2 2 0 012-2h2l1-2h8l1 2h2a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
                  </svg>
                  <span style={{ fontWeight: 500 }}>Klik untuk ambil selfie</span>
                  <span style={{ fontSize: "0.75rem" }}>Pastikan wajah terlihat jelas</span>
                </button>
              ) : (
                <div style={{
                  padding: "16px",
                  background: "var(--green-50)",
                  border: "1px solid var(--green-200)",
                  borderRadius: "var(--radius-md)",
                  display: "flex", alignItems: "center", gap: 10,
                }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--green-600)" strokeWidth="2">
                    <path d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  <span style={{ fontSize: "0.85rem", fontWeight: 500, color: "var(--green-700)" }}>
                    Selfie berhasil diupload
                  </span>
                </div>
              )}

              {selfieUploaded && (
                <button onClick={goNext} className="btn btn-primary" style={{ width: "100%", marginTop: 16 }}>
                  Kirim untuk Verifikasi
                </button>
              )}
            </div>
          )}

          {/* Step 3: Status */}
          {currentStep === 3 && (
            <div className="animate-fade-up" style={{ textAlign: "center", padding: "2rem 0" }}>
              <div style={{
                width: 80, height: 80,
                borderRadius: "50%",
                background: "linear-gradient(135deg, var(--green-500), var(--green-400))",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 20px",
                animation: "pulse-gold 2s infinite",
              }}>
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <path d="M5 12l5 5L20 7"/>
                </svg>
              </div>

              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, marginBottom: 8 }}>
                Verifikasi Berhasil!
              </h2>
              <p style={{ color: "var(--gray-500)", marginBottom: 8 }}>
                Wallet Anda telah di-whitelist pada smart contract WaqFi.
              </p>
              <p style={{ fontFamily: "monospace", fontSize: "0.8rem", color: "var(--gray-400)", marginBottom: 24 }}>
                Tx: 0xeee111...222fff
              </p>

              <div style={{
                padding: "14px 18px",
                background: "var(--green-50)",
                border: "1px solid var(--green-200)",
                borderRadius: "var(--radius-md)",
                marginBottom: 24,
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
              }}>
                <span style={{ fontSize: "0.85rem", color: "var(--green-700)", fontWeight: 500 }}>
                  Provider: {provider === "vida" ? "VIDA" : "PrivyID"}
                </span>
                <span className="badge badge-green">Terverifikasi</span>
              </div>

              <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                <Link href="/assets" className="btn btn-primary">
                  Mulai Berwakaf
                </Link>
                <Link href="/dashboard" className="btn btn-outline">
                  Lihat Portofolio
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Info Box */}
        <div className="animate-fade-up" style={{
          marginTop: "1.5rem",
          padding: "16px 20px",
          background: "var(--gold-50)",
          border: "1px solid var(--gold-200)",
          borderRadius: "var(--radius-md)",
          display: "flex",
          gap: 12,
          alignItems: "flex-start",
          animationDelay: "200ms",
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--gold-600)" strokeWidth="2" style={{ flexShrink: 0, marginTop: 2 }}>
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4m0-4h.01"/>
          </svg>
          <div style={{ fontSize: "0.82rem", color: "var(--gray-600)", lineHeight: 1.7 }}>
            <strong>Mengapa perlu KYC?</strong> Sesuai regulasi AML/CFT dan fatwa DSN-MUI, setiap peserta wakaf wajib terverifikasi identitasnya.
            Data Anda diproses oleh {provider === "vida" ? "VIDA" : "PrivyID"} dan tidak disimpan di blockchain.
          </div>
        </div>
      </div>
    </main>
  );
}
