import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quick Wins — Groundwork",
  description: "5 high-impact AI changes you can implement this week with full implementation guides.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
