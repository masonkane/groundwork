"use client";

import { useEffect, useState } from "react";
import { LogoFull } from "@/components/Logo";

export default function ReportPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    // Move answers from sessionStorage to localStorage for persistence
    const answers = sessionStorage.getItem("groundwork_answers");
    if (answers) {
      localStorage.setItem("groundwork_answers", answers);
      try {
        const parsed = JSON.parse(answers);
        // q37 is the email question (id 37)
        const userEmail = parsed[37] as string | undefined;
        if (userEmail && userEmail.includes("@")) {
          setEmail(userEmail);
          // Auto-send magic link
          fetch("/api/auth/magic-link", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: userEmail }),
          }).then(() => setSent(true));
        }
      } catch {
        // ignore parse errors
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6">
      <div className="max-w-lg w-full text-center py-12">
        <div className="flex justify-center mb-8">
          <LogoFull className="h-7 w-auto" />
        </div>

        {/* Success animation */}
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round">
            <polyline points="20,6 9,17 4,12" />
          </svg>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">Your report is ready.</h1>
        <p className="text-[var(--mid-gray)] text-sm sm:text-base leading-relaxed mb-6 max-w-md mx-auto">
          Our AI engine analyzed your responses against industry benchmarks, competitive data, and our tool database.
        </p>

        {/* Progress steps */}
        <div className="bg-[var(--light-surface)] rounded-2xl p-5 sm:p-6 mb-6 text-left">
          <div className="space-y-4">
            {[
              { label: "Questionnaire responses received", done: true },
              { label: "Analyzing your business operations", done: true },
              { label: "Running industry benchmark comparison", done: true },
              { label: "Calculating savings projections", done: true },
              { label: "Building your dashboard", done: true },
            ].map((step, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20,6 9,17 4,12" /></svg>
                </div>
                <span className="text-sm font-medium">{step.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Email notification */}
        {email && sent && (
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-6 text-left">
            <div className="flex items-start gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" className="shrink-0 mt-0.5">
                <path d="M22 2L11 13" /><path d="M22 2L15 22L11 13L2 9L22 2Z" />
              </svg>
              <div>
                <p className="text-sm font-bold text-blue-900">Check your email for your dashboard link</p>
                <p className="text-xs text-blue-800/60 mt-1">
                  We sent a login link to <span className="font-semibold">{email}</span>. Use that link anytime to access your full dashboard, reports, and implementation playbooks.
                </p>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => {
            // Set demo cookie so they can access dashboard immediately
            document.cookie = `gw_auth=${email || "demo@summitelectrical.com"}; path=/; max-age=86400`;
            window.location.href = "/dashboard";
          }}
          className="inline-flex items-center gap-2 bg-[var(--black)] text-white font-semibold px-8 py-4 rounded-full text-sm sm:text-base hover:shadow-[0_4px_30px_rgba(0,0,0,0.2)] transition-all active:scale-[0.97]"
        >
          View Your Dashboard
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" /></svg>
        </button>

        <p className="text-[10px] text-[var(--mid-gray)]/40 mt-6">Your data is encrypted and never shared with third parties.</p>
      </div>
    </div>
  );
}
