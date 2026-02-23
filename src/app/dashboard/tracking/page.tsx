"use client";

export default function TrackingPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">ROI Tracking</h1>
        <p className="text-[var(--mid-gray)] text-sm mt-1">Track actual savings and revenue impact as you implement recommendations.</p>
      </div>

      <div className="bg-white border border-black/5 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 bg-[var(--light-surface)] rounded-2xl flex items-center justify-center mx-auto mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#555" strokeWidth="1.5" strokeLinecap="round"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18" /><polyline points="17,6 23,6 23,12" /></svg>
        </div>
        <h2 className="text-xl font-bold mb-2">Tracking Starts After Implementation</h2>
        <p className="text-[var(--mid-gray)] leading-relaxed max-w-md mx-auto mb-6">Once you begin implementing Quick Wins and playbook recommendations, this dashboard will track your actual savings, revenue impact, and time recovered in real-time.</p>
        <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
          <div className="p-3 bg-[var(--light-surface)] rounded-xl">
            <div className="text-lg font-bold text-[var(--mid-gray)]/30">$0</div>
            <div className="text-[10px] text-[var(--mid-gray)]">Saved so far</div>
          </div>
          <div className="p-3 bg-[var(--light-surface)] rounded-xl">
            <div className="text-lg font-bold text-[var(--mid-gray)]/30">0 hrs</div>
            <div className="text-[10px] text-[var(--mid-gray)]">Time recovered</div>
          </div>
          <div className="p-3 bg-[var(--light-surface)] rounded-xl">
            <div className="text-lg font-bold text-[var(--mid-gray)]/30">0</div>
            <div className="text-[10px] text-[var(--mid-gray)]">Implemented</div>
          </div>
        </div>
      </div>
    </div>
  );
}
