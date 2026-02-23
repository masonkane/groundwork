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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "Groundwork",
              "applicationCategory": "BusinessApplication",
              "description": "AI implementation intelligence for businesses. Free assessment shows exactly where AI saves money, then we implement it.",
              "url": "https://groundwork-swart.vercel.app",
              "offers": {
                "@type": "AggregateOffer",
                "lowPrice": "0",
                "highPrice": "997",
                "priceCurrency": "USD",
                "offerCount": "3"
              },
              "operatingSystem": "Web",
              "creator": {
                "@type": "Organization",
                "name": "Groundwork"
              }
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                { "@type": "Question", "name": "Is the report actually free?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. The AI opportunity report, readiness score, and competitive analysis are 100% free. No credit card. No sales call." }},
                { "@type": "Question", "name": "How long does the questionnaire take?", "acceptedAnswer": { "@type": "Answer", "text": "About 15 minutes. 37 questions across 7 sections." }},
                { "@type": "Question", "name": "How accurate are the savings projections?", "acceptedAnswer": { "@type": "Answer", "text": "We use conservative estimates (70% of maximum reported savings). Most businesses hit 80-120% of projected savings within 90 days." }},
                { "@type": "Question", "name": "What industries do you cover?", "acceptedAnswer": { "@type": "Answer", "text": "All of them. Construction, healthcare, real estate, e-commerce, professional services, trades, SaaS, and more." }},
              ]
            }),
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
