"use client";

import { useState } from "react";

const audits = [
  {
    title: "Initial AI Assessment",
    date: "February 23, 2026",
    status: "complete" as const,
    findings: 18,
    savings: "$142,800/yr",
    summary: "Comprehensive assessment identified 18 AI opportunities across 4 business areas. Projected annual savings of $142,800 with 580% ROI.",
    highlights: [
      "5 Quick Wins identified for immediate implementation",
      "Critical gap found in customer service AI adoption (64% of competitors ahead)",
      "Leadership buy-in scored highest (90/100) among readiness dimensions",
      "AI experience scored lowest (45/100), addressed with training resources",
    ],
  },
  {
    title: "Q2 2026 Audit",
    date: "May 23, 2026",
    status: "upcoming" as const,
    findings: null,
    savings: null,
    summary: "This audit will measure progress on Quick Win implementations, track actual savings vs projections, and identify new AI opportunities based on industry changes.",
    highlights: [
      "Track ROI on implemented Quick Wins",
      "Reassess competitive landscape for new AI tools",
      "Update readiness score based on team experience",
      "Identify Phase 2 strategic opportunities",
    ],
  },
  { title: "Q3 2026 Audit", date: "August 23, 2026", status: "scheduled" as const, findings: null, savings: null, summary: "Mid-year review of full AI implementation roadmap. Focus on core automation ROI and sales AI deployment.", highlights: [] },
  { title: "Q4 2026 Audit", date: "November 23, 2026", status: "scheduled" as const, findings: null, savings: null, summary: "Pre-year-end assessment. Review full year ROI, plan next year AI budget and strategy.", highlights: [] },
  { title: "Q1 2027 Audit", date: "February 23, 2027", status: "scheduled" as const, findings: null, savings: null, summary: "One year anniversary audit. Comprehensive comparison of before and after AI implementation.", highlights: [] },
];

export default function AuditsPage() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(0);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Quarterly AI Audits</h1>
        <p className="text-[var(--mid-gray)] text-sm mt-1">We reassess your business every quarter to track progress, find new opportunities, and stay ahead of competitors.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white border border-black/5 rounded-xl p-4 text-center">
          <div className="text-2xl font-extrabold">5</div>
          <div className="text-[10px] text-[var(--mid-gray)]">Audits Scheduled</div>
        </div>
        <div className="bg-white border border-black/5 rounded-xl p-4 text-center">
          <div className="text-2xl font-extrabold">1</div>
          <div className="text-[10px] text-[var(--mid-gray)]">Completed</div>
        </div>
        <div className="bg-white border border-black/5 rounded-xl p-4 text-center">
          <div className="text-2xl font-extrabold text-amber-600">89 days</div>
          <div className="text-[10px] text-[var(--mid-gray)]">Until Next Audit</div>
        </div>
      </div>

      {/* What Each Audit Covers */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
        <h3 className="text-sm font-bold text-blue-900 mb-2">What Each Audit Includes</h3>
        <div className="grid sm:grid-cols-2 gap-2">
          {[
            "Full re-scan of your operations for new AI opportunities",
            "ROI tracking and actual vs projected savings analysis",
            "Competitive landscape update (who adopted what)",
            "Updated AI readiness score and team skill assessment",
            "New tool recommendations based on market changes",
            "Adjusted implementation roadmap for next quarter",
          ].map((item) => (
            <div key={item} className="flex items-start gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2.5" strokeLinecap="round" className="shrink-0 mt-0.5"><polyline points="20,6 9,17 4,12"/></svg>
              <span className="text-[11px] text-blue-800">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Timeline */}
      <div className="space-y-3">
        {audits.map((audit, i) => {
          const isOpen = expandedIdx === i;
          return (
            <div key={audit.title} className={`bg-white rounded-2xl overflow-hidden ${audit.status === "upcoming" ? "border-2 border-[var(--black)]" : "border border-black/5"} ${audit.status === "scheduled" ? "opacity-60" : ""}`}>
              <button onClick={() => setExpandedIdx(isOpen ? null : i)} className="w-full p-5 flex items-center justify-between text-left hover:bg-black/[0.01] transition-colors">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    audit.status === "complete" ? "bg-green-50" : audit.status === "upcoming" ? "bg-[var(--black)]" : "bg-[var(--light-surface)]"
                  }`}>
                    {audit.status === "complete" ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"><path d="M9 15l2 2 4-4"/></svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={audit.status === "upcoming" ? "white" : "#999"} strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-bold">{audit.title}</div>
                    <div className="text-xs text-[var(--mid-gray)]">{audit.date}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {audit.findings && <span className="text-xs font-bold text-green-600">{audit.savings}</span>}
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    audit.status === "complete" ? "bg-green-50 text-green-700 border border-green-100" : audit.status === "upcoming" ? "bg-amber-50 text-amber-700 border border-amber-100" : "bg-gray-50 text-gray-500 border border-gray-200"
                  }`}>{audit.status === "complete" ? "Complete" : audit.status === "upcoming" ? "Upcoming" : "Scheduled"}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`text-[var(--mid-gray)] transition-transform ${isOpen ? "rotate-180" : ""}`}><polyline points="6,9 12,15 18,9"/></svg>
                </div>
              </button>
              {isOpen && (
                <div className="px-5 pb-5 border-t border-black/5 pt-4 space-y-3">
                  <p className="text-sm text-[var(--mid-gray)] leading-relaxed">{audit.summary}</p>
                  {audit.findings && (
                    <div className="flex items-center gap-4 text-xs">
                      <span className="font-bold">{audit.findings} findings</span>
                      <span className="text-[var(--mid-gray)]">|</span>
                      <span className="font-bold text-green-600">{audit.savings} projected</span>
                    </div>
                  )}
                  {audit.highlights.length > 0 && (
                    <div className="space-y-1.5">
                      {audit.highlights.map((h) => (
                        <div key={h} className="flex items-start gap-2 p-2.5 bg-[var(--light-surface)] rounded-lg">
                          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="shrink-0 mt-1"><polyline points="20,6 9,17 4,12"/></svg>
                          <span className="text-[11px]">{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
