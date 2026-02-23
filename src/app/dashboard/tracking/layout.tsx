import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ROI Tracking — Groundwork",
  description: "Track actual savings against projections as you implement AI recommendations.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
