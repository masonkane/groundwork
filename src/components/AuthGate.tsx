"use client";

import { useEffect, useState } from "react";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const match = document.cookie.split(";").map((c) => c.trim()).find((c) => c.startsWith("gw_auth="));
    if (!match) {
      window.location.href = "/login";
      return;
    }
    const value = decodeURIComponent(match.split("=")[1]);
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    if (!isValidEmail && value !== "demo@summitelectrical.com") {
      document.cookie = "gw_auth=; path=/; max-age=0";
      window.location.href = "/login";
      return;
    }
    setChecked(true);
  }, []);

  if (!checked) {
    return (
      <div className="min-h-screen bg-[var(--light-surface)] flex items-center justify-center">
        <div className="w-10 h-10 border-[3px] border-black/10 border-t-[var(--black)] rounded-full animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
