"use client";

import { useEffect, useState } from "react";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const hasCookie = document.cookie.split(";").some((c) => c.trim().startsWith("gw_auth="));
    if (!hasCookie) {
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
