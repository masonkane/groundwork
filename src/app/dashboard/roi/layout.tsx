import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ROI and Cost Savings — Groundwork",
  description: "Projected return broken down by business area with tool costs, net savings, and time recovered.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
