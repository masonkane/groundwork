import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quarterly AI Audits — Groundwork",
  description: "Scheduled reassessments to track progress, find new opportunities, and stay ahead.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
