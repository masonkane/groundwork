"use client";

export default function AuditsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Quarterly AI Audits</h1>
        <p className="text-[var(--mid-gray)] text-sm mt-1">We reassess your business every quarter to find new AI opportunities.</p>
      </div>

      <div className="space-y-4">
        <div className="bg-white border border-black/5 rounded-xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[var(--black)] text-white rounded-xl flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 15l2 2 4-4" /></svg>
            </div>
            <div>
              <div className="text-sm font-bold">Initial AI Assessment</div>
              <div className="text-xs text-[var(--mid-gray)]">February 23, 2026</div>
            </div>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-50 px-2.5 py-1 rounded-full">Complete</span>
        </div>

        <div className="bg-white border-2 border-[var(--black)] rounded-xl p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-[var(--light-surface)] rounded-xl flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#080808" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
            </div>
            <div>
              <div className="text-sm font-bold">Q2 2026 Audit</div>
              <div className="text-xs text-[var(--mid-gray)]">May 23, 2026</div>
            </div>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">Upcoming</span>
        </div>

        {["Q3 2026 Audit — August 23, 2026", "Q4 2026 Audit — November 23, 2026", "Q1 2027 Audit — February 23, 2027"].map((audit) => (
          <div key={audit} className="bg-white border border-black/5 rounded-xl p-5 flex items-center justify-between opacity-50">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[var(--light-surface)] rounded-xl flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
              </div>
              <div className="text-sm font-medium text-[var(--mid-gray)]">{audit}</div>
            </div>
            <span className="text-[10px] font-medium text-[var(--mid-gray)]">Scheduled</span>
          </div>
        ))}
      </div>
    </div>
  );
}
