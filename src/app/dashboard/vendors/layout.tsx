import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vendor and Tool Recommendations — Groundwork",
  description: "AI tools matched to your business with pricing and integration details.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
