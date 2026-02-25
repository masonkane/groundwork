import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Report: The AI Profit Playbook | Groundwork",
  description:
    "Discover the 10 highest-ROI AI implementations for 2026. See exact dollar savings, recommended tools, and step-by-step instructions. 100% free.",
  openGraph: {
    title: "Free: The 10 Highest-ROI AI Implementations for 2026",
    description:
      "$180K+ in annual savings identified. Get the full playbook with tools, steps, and benchmarks — free.",
    images: ["/images/og-image.png"],
    type: "website",
    siteName: "Groundwork",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free: The 10 Highest-ROI AI Implementations for 2026",
    description:
      "$180K+ in annual savings identified. Get the full playbook free.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function FreeReportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
