import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Implementation Playbooks — Groundwork",
  description: "Step-by-step AI implementation guides with tools, timelines, and success metrics.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
