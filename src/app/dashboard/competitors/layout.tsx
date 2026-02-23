import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Competitive Intelligence — Groundwork",
  description: "How your AI adoption compares to industry averages with gap analysis and opportunities.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
