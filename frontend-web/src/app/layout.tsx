import type { Metadata } from "next";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "WaqFi — Tokenized Waqf Platform",
  description:
    "Platform wakaf tokenisasi pertama di Indonesia. Partisipasi mikro mulai dari Rp 10.000. Sesuai DSN-MUI, transparan di blockchain Polygon.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body>
        <Navigation />
        {children}
        <Footer />
      </body>
    </html>
  );
}
