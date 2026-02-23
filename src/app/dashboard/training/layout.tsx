import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team Training — Groundwork",
  description: "Guides, walkthroughs, and onboarding materials for your team.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
