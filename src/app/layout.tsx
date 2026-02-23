import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Groundwork — Discover Where AI Fits in Your Business",
  description: "Stop guessing about AI. Get a personalized analysis of exactly where AI can save you money, grow your revenue, and eliminate wasted time.",
  openGraph: {
    title: "Groundwork — Discover Where AI Fits in Your Business",
    description: "Stop guessing about AI. Get a personalized analysis of exactly where AI can save you money, grow your revenue, and eliminate wasted time.",
    images: ["/images/og-image.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Groundwork — Discover Where AI Fits in Your Business",
    description: "Stop guessing about AI. Get a personalized analysis of exactly where AI can save you money, grow your revenue, and eliminate wasted time.",
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
