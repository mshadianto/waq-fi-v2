import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WaqFi — Tokenized Waqf Platform",
  description:
    "Fractionalised waqf asset participation starting from Rp 10.000. DSN-MUI compliant.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body style={{ margin: 0, fontFamily: "system-ui, sans-serif", background: "#f8f9fa" }}>
        {children}
      </body>
    </html>
  );
}
