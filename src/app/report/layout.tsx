import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Your Report is Ready — Groundwork",
  description: "Your personalized AI opportunity report has been generated. View your dashboard to see projected savings, quick wins, and implementation playbooks.",
};

export default function ReportLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
