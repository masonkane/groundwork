import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Groundwork — We Implement AI Into Your Business",
    template: "%s | Groundwork",
  },
  description: "Stop guessing about AI. We analyze your business, show you the exact dollar savings, and implement every solution. Free AI opportunity report.",
  keywords: ["AI implementation", "business AI", "AI consulting", "AI savings", "AI readiness", "business automation", "AI opportunity report"],
  authors: [{ name: "Groundwork" }],
  openGraph: {
    title: "Groundwork — We Implement AI Into Your Business",
    description: "We analyze your business, show you the exact dollar savings, and implement every AI solution. Free report.",
    images: ["/images/og-image.png"],
    type: "website",
    siteName: "Groundwork",
  },
  twitter: {
    card: "summary_large_image",
    title: "Groundwork — We Implement AI Into Your Business",
    description: "We analyze your business, show you the exact dollar savings, and implement every AI solution. Free report.",
    images: ["/images/og-image.png"],
    creator: "@masonkanewalk",
  },
  icons: {
    icon: "/favicon.ico",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <meta name="theme-color" content="#080808" />
      </head>
      <body>{children}</body>
    </html>
  );
}
