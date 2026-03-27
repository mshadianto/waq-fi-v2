import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{
      background: "var(--green-900)",
      color: "rgba(255,255,255,0.7)",
      position: "relative",
      overflow: "hidden",
    }}>
      <div className="geo-pattern-gold" style={{
        top: 0, left: 0, right: 0, bottom: 0,
        opacity: 0.03,
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "2.5rem",
          padding: "3.5rem 0 2.5rem",
        }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 32, height: 32,
                background: "linear-gradient(135deg, var(--green-500), var(--green-400))",
                borderRadius: 7,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M10 1L19 10L10 19L1 10Z" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" fill="none"/>
                  <circle cx="10" cy="10" r="2" fill="rgba(201,168,76,0.9)"/>
                </svg>
              </div>
              <span style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "white",
              }}>WaqFi</span>
            </div>
            <p style={{ fontSize: "0.85rem", lineHeight: 1.7, maxWidth: 260 }}>
              Platform wakaf tokenisasi pertama di Indonesia. Sesuai DSN-MUI, transparan, dan mudah diakses.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 style={{ color: "var(--gold-400)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16, fontFamily: "var(--font-body)" }}>Platform</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <Link href="/assets" style={{ fontSize: "0.85rem", transition: "color 0.2s" }}>Aset Wakaf</Link>
              <Link href="/dashboard" style={{ fontSize: "0.85rem" }}>Portofolio</Link>
              <Link href="/kyc" style={{ fontSize: "0.85rem" }}>Verifikasi KYC</Link>
              <Link href="/transparency" style={{ fontSize: "0.85rem" }}>Transparansi</Link>
            </div>
          </div>

          {/* Kepatuhan */}
          <div>
            <h4 style={{ color: "var(--gold-400)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16, fontFamily: "var(--font-body)" }}>Kepatuhan</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: "0.85rem" }}>
              <span>DSN-MUI Compliant</span>
              <span>BWI Registered</span>
              <span>AML/KYC Verified</span>
              <span>Smart Contract Audited</span>
            </div>
          </div>

          {/* Kontak */}
          <div>
            <h4 style={{ color: "var(--gold-400)", fontSize: "0.8rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16, fontFamily: "var(--font-body)" }}>Kontak</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: "0.85rem" }}>
              <span>Lppm@tazkia.ac.id</span>
              <span>0811-1000-8252</span>
              <span>Jakarta, Indonesia</span>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "1.25rem 0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
          fontSize: "0.78rem",
          color: "rgba(255,255,255,0.4)",
        }}>
          <span>&copy; 2026 WaqFi. All rights reserved.</span>
          <span>Powered by Polygon L2 &middot; ERC-1400 Security Token</span>
        </div>
      </div>
    </footer>
  );
}
