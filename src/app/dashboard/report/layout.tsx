import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Opportunity Report — Groundwork",
  description: "Your full AI opportunity report with 18 recommendations across 4 business areas. See tools, timelines, effort, and projected savings.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
