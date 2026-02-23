"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { LogoFull } from "@/components/Logo";

export default function ReportPage() {
  const [hasAnswers, setHasAnswers] = useState(false);

  useEffect(() => {
    const answers = sessionStorage.getItem("groundwork_answers");
    setHasAnswers(!!answers);
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

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">Your report is being generated.</h1>
        <p className="text-[var(--mid-gray)] text-sm sm:text-base leading-relaxed mb-8 max-w-md mx-auto">
          Our AI engine is analyzing your responses against industry benchmarks, competitive data, and our tool database to build your personalized analysis.
        </p>

        {/* Progress steps */}
        <div className="bg-[var(--light-surface)] rounded-2xl p-5 sm:p-6 mb-8 text-left">
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

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 bg-[var(--black)] text-white font-semibold px-8 py-4 rounded-full text-sm sm:text-base hover:shadow-[0_4px_30px_rgba(0,0,0,0.2)] transition-all active:scale-[0.97]"
        >
          View Your Dashboard
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12,5 19,12 12,19" /></svg>
        </Link>

        <p className="text-[10px] text-[var(--mid-gray)]/40 mt-6">Your data is encrypted and never shared with third parties.</p>
      </div>
    </div>
  );
}
