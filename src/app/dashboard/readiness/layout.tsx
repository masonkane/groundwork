import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Readiness Score — Groundwork",
  description: "How prepared your business is to implement AI across 6 dimensions with action steps.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
