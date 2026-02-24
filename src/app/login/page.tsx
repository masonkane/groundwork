"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { LogoFull } from "@/components/Logo";

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="w-10 h-10 border-[3px] border-black/10 border-t-[var(--black)] rounded-full animate-spin" />
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const searchParams = useSearchParams();
  const urlError = searchParams.get("error");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setSent(true);
      } else {
        const data = await res.json();
        setError(data.error || "Something went wrong.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoMode = () => {
    document.cookie = "gw_auth=demo@summitelectrical.com; path=/; max-age=86400";
    window.location.href = "/dashboard";
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6">
      <div className="max-w-sm w-full text-center py-12">
        <div className="flex justify-center mb-8">
          <LogoFull className="h-7 w-auto" />
        </div>

        {sent ? (
          <>
            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round">
                <path d="M22 2L11 13" /><path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight mb-3">Check your email</h1>
            <p className="text-[var(--mid-gray)] text-sm leading-relaxed mb-6">
              We sent a login link to <span className="font-semibold text-[var(--black)]">{email}</span>. Click the link to access your dashboard.
            </p>
            <p className="text-[10px] text-[var(--mid-gray)]/40">Link expires in 30 minutes. Check your spam folder if you do not see it.</p>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-extrabold tracking-tight mb-2">Sign in to your dashboard</h1>
            <p className="text-[var(--mid-gray)] text-sm mb-6">Enter the email you used during the assessment.</p>

            {(urlError || error) && (
              <div className="bg-red-50 border border-red-100 rounded-xl p-3 mb-4 text-left">
                <p className="text-xs text-red-700">
                  {urlError === "missing_token" || urlError === "invalid_token"
                    ? "This link is expired or invalid. Request a new one below."
                    : error}
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3 mb-6">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full bg-[var(--light-surface)] border border-black/5 rounded-xl px-4 py-3 text-sm outline-none focus:border-black/20 transition-colors placeholder:text-black/20"
                autoFocus
              />
              <button
                type="submit"
                disabled={loading || !email.includes("@")}
                className="w-full bg-[var(--black)] text-white font-semibold py-3 rounded-xl text-sm hover:bg-[var(--dark-surface)] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? "Sending..." : "Send Login Link"}
              </button>
            </form>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-black/5" /></div>
              <div className="relative flex justify-center"><span className="bg-white px-3 text-[10px] text-[var(--mid-gray)]/40 uppercase tracking-wider font-semibold">or</span></div>
            </div>

            <button
              onClick={handleDemoMode}
              className="w-full bg-[var(--light-surface)] border border-black/5 text-[var(--black)] font-semibold py-3 rounded-xl text-sm hover:bg-black/[0.04] transition-colors"
            >
              Demo Mode
            </button>
            <p className="text-[10px] text-[var(--mid-gray)]/40 mt-3">Demo mode uses sample data from Summit Electrical Contractors.</p>
          </>
        )}
      </div>
    </div>
  );
}
