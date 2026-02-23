"use client";

import Link from "next/link";

const quickWins = [
  { title: "Automate invoice processing", impact: "$2,400/mo", effort: "Low", status: "ready" },
  { title: "AI-powered lead follow-up sequences", impact: "$3,100/mo", effort: "Low", status: "ready" },
  { title: "Smart scheduling assistant", impact: "$1,800/mo", effort: "Low", status: "ready" },
];

const opportunities = [
  { area: "Operations", count: 6, savings: "$48,200" },
  { area: "Sales & Marketing", count: 5, savings: "$39,600" },
  { area: "Customer Experience", count: 4, savings: "$31,400" },
  { area: "Back Office", count: 3, savings: "$23,600" },
];

const monthlyData = [28, 35, 42, 51, 58, 67, 74, 82, 89, 96, 108, 119];

export default function DashboardOverview() {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Dashboard</h1>
        <p className="text-[var(--mid-gray)] text-sm mt-1">Your AI opportunity analysis at a glance.</p>
      </div>

      {/* Shock moment — big savings number */}
      <div className="bg-[var(--black)] text-white rounded-2xl p-8 md:p-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="relative z-10">
          <p className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">Projected Annual Savings</p>
          <div className="flex items-end gap-4 mb-4">
            <span className="text-5xl md:text-6xl font-extrabold tracking-tight">$142,800</span>
            <span className="bg-green-500/20 text-green-400 text-sm font-semibold px-3 py-1 rounded-full mb-2">↑ 580% ROI</span>
          </div>
          <p className="text-white/50 text-sm">Based on 18 AI opportunities identified across your business.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div>
              <div className="text-2xl font-bold">$11,900</div>
              <div className="text-white/40 text-xs mt-0.5">Monthly savings</div>
            </div>
            <div>
              <div className="text-2xl font-bold">18</div>
              <div className="text-white/40 text-xs mt-0.5">Opportunities found</div>
            </div>
            <div>
              <div className="text-2xl font-bold">3</div>
              <div className="text-white/40 text-xs mt-0.5">Quick wins ready</div>
            </div>
            <div>
              <div className="text-2xl font-bold">67</div>
              <div className="text-white/40 text-xs mt-0.5">AI Readiness Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Cost of Inaction */}
      <div className="bg-white border border-black/5 rounded-2xl p-6 md:p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold">Cost of Inaction</h2>
            <p className="text-[var(--mid-gray)] text-sm mt-0.5">Every month you wait, this is what it costs you.</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-extrabold text-red-500">$11,900</div>
            <div className="text-xs text-[var(--mid-gray)]">per month lost</div>
          </div>
        </div>
        {/* Projected savings chart */}
        <div className="flex items-end gap-2 h-32">
          {monthlyData.map((val, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full bg-[var(--black)] rounded-t transition-all hover:opacity-80" style={{ height: `${(val / 120) * 100}%` }} />
              <span className="text-[9px] text-[var(--mid-gray)]">{["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i]}</span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-[var(--mid-gray)]/50 mt-3">Projected cumulative savings over 12 months (in thousands)</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Quick Wins */}
        <div className="bg-white border border-black/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold">Quick Wins</h2>
            <Link href="/dashboard/quick-wins" className="text-xs font-medium text-[var(--mid-gray)] hover:text-[var(--black)] transition-colors">View all →</Link>
          </div>
          <div className="space-y-3">
            {quickWins.map((win) => (
              <div key={win.title} className="flex items-center justify-between p-4 bg-[var(--light-surface)] rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10" /></svg>
                  </div>
                  <div>
                    <div className="text-sm font-medium">{win.title}</div>
                    <div className="text-xs text-[var(--mid-gray)]">{win.effort} effort</div>
                  </div>
                </div>
                <span className="text-sm font-bold text-green-600">{win.impact}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Opportunities by Area */}
        <div className="bg-white border border-black/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold">Opportunities by Area</h2>
            <Link href="/dashboard/report" className="text-xs font-medium text-[var(--mid-gray)] hover:text-[var(--black)] transition-colors">Full report →</Link>
          </div>
          <div className="space-y-4">
            {opportunities.map((opp) => (
              <div key={opp.area} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium">{opp.area}</span>
                    <span className="text-xs text-[var(--mid-gray)]">{opp.count} found · {opp.savings}/yr</span>
                  </div>
                  <div className="h-2 bg-[var(--light-surface)] rounded-full overflow-hidden">
                    <div className="h-full bg-[var(--black)] rounded-full" style={{ width: `${(opp.count / 6) * 100}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Readiness Score */}
      <div className="bg-white border border-black/5 rounded-2xl p-6 md:p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-lg font-bold">AI Readiness Score</h2>
            <p className="text-[var(--mid-gray)] text-sm mt-0.5">Your current AI maturity across key dimensions.</p>
          </div>
          <Link href="/dashboard/readiness" className="text-xs font-medium text-[var(--mid-gray)] hover:text-[var(--black)] transition-colors">Details →</Link>
        </div>
        <div className="flex items-center gap-8">
          {/* Score circle */}
          <div className="relative w-28 h-28 shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#f2f2f2" strokeWidth="8" />
              <circle cx="50" cy="50" r="42" fill="none" stroke="#080808" strokeWidth="8" strokeDasharray={`${67 * 2.64} ${100 * 2.64}`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-2xl font-extrabold">67</span>
              <span className="text-[9px] text-[var(--mid-gray)]">out of 100</span>
            </div>
          </div>
          {/* Breakdown */}
          <div className="flex-1 grid grid-cols-2 gap-3">
            {[
              { label: "Tech Stack", score: 72 },
              { label: "Team Readiness", score: 58 },
              { label: "Data Maturity", score: 65 },
              { label: "Process Automation", score: 74 },
            ].map((dim) => (
              <div key={dim.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium">{dim.label}</span>
                  <span className="text-xs text-[var(--mid-gray)]">{dim.score}</span>
                </div>
                <div className="h-1.5 bg-[var(--light-surface)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--black)] rounded-full" style={{ width: `${dim.score}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Competitive Intel Preview */}
      <div className="bg-white border border-black/5 rounded-2xl p-6 md:p-8">
        <div className="flex items-start justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold">Competitive Intelligence</h2>
            <p className="text-[var(--mid-gray)] text-sm mt-0.5">How your industry peers are using AI.</p>
          </div>
          <Link href="/dashboard/competitors" className="text-xs font-medium text-[var(--mid-gray)] hover:text-[var(--black)] transition-colors">Full analysis →</Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            { stat: "64%", label: "of competitors using AI for customer service" },
            { stat: "41%", label: "have automated their invoicing and billing" },
            { stat: "3.2x", label: "faster lead response from AI-enabled competitors" },
          ].map((item) => (
            <div key={item.label} className="p-4 bg-[var(--light-surface)] rounded-xl text-center">
              <div className="text-2xl font-extrabold mb-1">{item.stat}</div>
              <p className="text-[11px] text-[var(--mid-gray)] leading-relaxed">{item.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Next Audit */}
      <div className="bg-[var(--light-surface)] border border-black/5 rounded-2xl p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-black/5">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#080808" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
          </div>
          <div>
            <div className="text-sm font-bold">Next Quarterly AI Audit</div>
            <div className="text-xs text-[var(--mid-gray)]">Scheduled for May 23, 2026. We will reassess your business for new opportunities.</div>
          </div>
        </div>
        <Link href="/dashboard/audits" className="text-xs font-medium text-[var(--mid-gray)] hover:text-[var(--black)] transition-colors whitespace-nowrap">View schedule →</Link>
      </div>
    </div>
  );
}
