"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV_ITEMS = [
  { href: "/", label: "Beranda" },
  { href: "/assets", label: "Aset Wakaf" },
  { href: "/dashboard", label: "Portofolio" },
  { href: "/kyc", label: "Verifikasi KYC" },
  { href: "/transparency", label: "Transparansi" },
  { href: "/about", label: "Tentang" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "var(--nav-height)",
        background: "rgba(250,248,243,0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(13,43,24,0.06)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
      }}>
        <div style={{
          maxWidth: "var(--page-max)",
          margin: "0 auto",
          padding: "0 var(--page-px)",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          {/* Logo */}
          <Link href="/" style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
          }}>
            {/* Islamic geometric logo mark */}
            <div style={{
              width: 36,
              height: 36,
              background: "linear-gradient(135deg, var(--green-700), var(--green-600))",
              borderRadius: 8,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              overflow: "hidden",
            }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 1L19 10L10 19L1 10Z" stroke="rgba(255,255,255,0.9)" strokeWidth="1.2" fill="none"/>
                <path d="M10 5L15 10L10 15L5 10Z" stroke="rgba(201,168,76,0.8)" strokeWidth="1" fill="none"/>
                <circle cx="10" cy="10" r="2" fill="rgba(201,168,76,0.9)"/>
              </svg>
            </div>
            <div>
              <span style={{
                fontFamily: "var(--font-display)",
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "var(--green-800)",
                letterSpacing: "-0.02em",
              }}>WaqFi</span>
              <span style={{
                display: "block",
                fontSize: "0.6rem",
                color: "var(--gold-600)",
                fontWeight: 600,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                marginTop: -2,
              }}>TOKENIZED WAQF</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
          }} className="hide-mobile">
            {NAV_ITEMS.map((item) => {
              const active = pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link key={item.href} href={item.href} style={{
                  padding: "8px 14px",
                  borderRadius: "var(--radius-md)",
                  fontSize: "0.85rem",
                  fontWeight: active ? 600 : 400,
                  color: active ? "var(--green-700)" : "var(--gray-600)",
                  background: active ? "var(--green-50)" : "transparent",
                  transition: "all 0.2s ease",
                  textDecoration: "none",
                }}>
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Connect Wallet CTA */}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button className="btn btn-primary btn-sm hide-mobile">
              Connect Wallet
            </button>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{
                display: "none",
                background: "none",
                border: "none",
                padding: 8,
                color: "var(--gray-700)",
              }}
              className="show-mobile-only"
              aria-label="Menu"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileOpen ? (
                  <path d="M6 6L18 18M6 18L18 6"/>
                ) : (
                  <path d="M3 6h18M3 12h18M3 18h18"/>
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div style={{
          position: "fixed",
          top: "var(--nav-height)",
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(250,248,243,0.98)",
          backdropFilter: "blur(20px)",
          zIndex: 99,
          padding: "1.5rem var(--page-px)",
          animation: "fadeIn 0.2s ease",
        }}>
          {NAV_ITEMS.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  display: "block",
                  padding: "14px 0",
                  fontSize: "1.1rem",
                  fontWeight: active ? 600 : 400,
                  color: active ? "var(--green-700)" : "var(--gray-700)",
                  borderBottom: "1px solid var(--gray-100)",
                  textDecoration: "none",
                }}
              >
                {item.label}
              </Link>
            );
          })}
          <button className="btn btn-primary" style={{ width: "100%", marginTop: 24 }}>
            Connect Wallet
          </button>
        </div>
      )}

      <style jsx global>{`
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .show-mobile-only { display: block !important; }
        }
        @media (min-width: 769px) {
          .show-mobile-only { display: none !important; }
        }
      `}</style>
    </>
  );
}
