import type { Metadata } from "next";
import DashboardShell from "@/components/DashboardShell";

export const metadata: Metadata = {
  title: "Dashboard — Groundwork",
  description: "Your personalized AI opportunity analysis. See projected savings, quick wins, implementation playbooks, and competitive intelligence.",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <DashboardShell>{children}</DashboardShell>;
}
