import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings — Groundwork",
  description: "Manage your account, subscription, and notification preferences.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
