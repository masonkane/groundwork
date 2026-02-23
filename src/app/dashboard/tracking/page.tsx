"use client";

import { useState } from "react";

const implementations = [
  { name: "AI Lead Follow-Up", status: "active", startDate: "Feb 24, 2026", projected: 3100, actual: 2840, hoursRecovered: 12, completionPct: 85 },
  { name: "Invoice Automation", status: "active", startDate: "Feb 28, 2026", projected: 2400, actual: 1920, hoursRecovered: 18, completionPct: 65 },
  { name: "Smart Scheduling", status: "setup", startDate: "Mar 3, 2026", projected: 1800, actual: 0, hoursRecovered: 0, completionPct: 20 },
  { name: "AI Support Chatbot", status: "planned", startDate: "Mar 10, 2026", projected: 2800, actual: 0, hoursRecovered: 0, completionPct: 0 },
  { name: "Bookkeeping AI", status: "planned", startDate: "Mar 17, 2026", projected: 1200, actual: 0, hoursRecovered: 0, completionPct: 0 },
];

const monthlyData = [
  { month: "Mar", projected: 4200, actual: 3680 },
  { month: "Apr", projected: 7800, actual: 6940 },
  { month: "May", projected: 9600, actual: 0 },
  { month: "Jun", projected: 11200, actual: 0 },
  { month: "Jul", projected: 11900, actual: 0 },
  { month: "Aug", projected: 11900, actual: 0 },
];

export default function TrackingPage() {
  const [tab, setTab] = useState<"overview" | "implementations">("overview");

  const totalProjected = implementations.reduce((s, i) => s + i.projected, 0);
  const totalActual = implementations.reduce((s, i) => s + i.actual, 0);
  const totalHours = implementations.reduce((s, i) => s + i.hoursRecovered, 0);
  const activeCount = implementations.filter((i) => i.status === "active").length;
  const maxBar = Math.max(...monthlyData.map(d => Math.max(d.projected, d.actual)));

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">ROI Tracking</h1>
          <p className="text-[var(--mid-gray)] text-sm mt-1">Track actual savings against projections as you implement recommendations.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setTab("overview")} className={`text-xs font-medium px-4 py-2 rounded-lg transition-colors ${tab === "overview" ? "bg-[var(--black)] text-white" : "bg-white border border-black/5 text-[var(--mid-gray)]"}`}>Overview</button>
          <button onClick={() => setTab("implementations")} className={`text-xs font-medium px-4 py-2 rounded-lg transition-colors ${tab === "implementations" ? "bg-[var(--black)] text-white" : "bg-white border border-black/5 text-[var(--mid-gray)]"}`}>By Implementation</button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white border border-black/5 rounded-xl p-4">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--mid-gray)] mb-1">Monthly Savings (Actual)</div>
          <div className="text-2xl font-extrabold text-green-600">${totalActual.toLocaleString()}</div>
          <div className="text-[10px] text-[var(--mid-gray)] mt-0.5">${totalProjected.toLocaleString()} projected</div>
        </div>
        <div className="bg-white border border-black/5 rounded-xl p-4">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--mid-gray)] mb-1">Hours Recovered</div>
          <div className="text-2xl font-extrabold">{totalHours}</div>
          <div className="text-[10px] text-[var(--mid-gray)] mt-0.5">per month</div>
        </div>
        <div className="bg-white border border-black/5 rounded-xl p-4">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--mid-gray)] mb-1">Active Implementations</div>
          <div className="text-2xl font-extrabold">{activeCount}</div>
          <div className="text-[10px] text-[var(--mid-gray)] mt-0.5">of {implementations.length} total</div>
        </div>
        <div className="bg-white border border-black/5 rounded-xl p-4">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--mid-gray)] mb-1">Tracking Accuracy</div>
          <div className="text-2xl font-extrabold">{totalProjected > 0 ? Math.round((totalActual / totalProjected) * 100) : 0}%</div>
          <div className="text-[10px] text-[var(--mid-gray)] mt-0.5">actual vs projected</div>
        </div>
      </div>

      {tab === "overview" ? (
        <>
          {/* Savings Over Time Chart */}
          <div className="bg-white border border-black/5 rounded-2xl p-6">
            <h2 className="text-lg font-bold mb-1">Savings Over Time</h2>
            <p className="text-xs text-[var(--mid-gray)] mb-5">Projected vs actual monthly savings. Bars show your real performance.</p>
            <div className="flex items-end gap-3 h-48">
              {monthlyData.map((d) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex gap-1 items-end h-40">
                    <div className="flex-1 bg-black/10 rounded-t transition-all" style={{ height: `${(d.projected / maxBar) * 100}%` }} title={`Projected: $${d.projected.toLocaleString()}`} />
                    {d.actual > 0 && (
                      <div className="flex-1 bg-green-500 rounded-t transition-all" style={{ height: `${(d.actual / maxBar) * 100}%` }} title={`Actual: $${d.actual.toLocaleString()}`} />
                    )}
                  </div>
                  <span className="text-[10px] text-[var(--mid-gray)] font-medium">{d.month}</span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-black/5">
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-black/10 rounded" /><span className="text-[10px] text-[var(--mid-gray)]">Projected</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded" /><span className="text-[10px] text-[var(--mid-gray)]">Actual</span></div>
            </div>
          </div>

          {/* Cumulative Savings */}
          <div className="bg-green-50 border border-green-100 rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-green-900">Cumulative Savings to Date</h2>
                <p className="text-xs text-green-800/60 mt-1">Total money saved since you started implementing AI recommendations.</p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-extrabold text-green-700">${(totalActual * 1).toLocaleString()}</div>
                <div className="text-[10px] text-green-600">and growing</div>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Implementations Detail View */
        <div className="space-y-3">
          {implementations.map((impl) => (
            <div key={impl.name} className="bg-white border border-black/5 rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className={`w-2 h-2 rounded-full ${impl.status === "active" ? "bg-green-500" : impl.status === "setup" ? "bg-amber-500 animate-pulse" : "bg-gray-300"}`} />
                  <div>
                    <div className="text-sm font-bold">{impl.name}</div>
                    <div className="text-[10px] text-[var(--mid-gray)]">Started {impl.startDate}</div>
                  </div>
                </div>
                <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                  impl.status === "active" ? "bg-green-50 text-green-700 border border-green-100" : impl.status === "setup" ? "bg-amber-50 text-amber-700 border border-amber-100" : "bg-gray-50 text-gray-500 border border-gray-200"
                }`}>{impl.status === "setup" ? "Setting Up" : impl.status === "active" ? "Active" : "Planned"}</span>
              </div>

              {/* Progress bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-[var(--mid-gray)]">Implementation progress</span>
                  <span className="text-[10px] font-bold">{impl.completionPct}%</span>
                </div>
                <div className="h-2 bg-[var(--light-surface)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--black)] rounded-full transition-all" style={{ width: `${impl.completionPct}%` }} />
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-[var(--light-surface)] rounded-lg text-center">
                  <div className="text-sm font-extrabold text-green-600">${impl.actual.toLocaleString()}</div>
                  <div className="text-[9px] text-[var(--mid-gray)]">Actual savings/mo</div>
                </div>
                <div className="p-3 bg-[var(--light-surface)] rounded-lg text-center">
                  <div className="text-sm font-extrabold">${impl.projected.toLocaleString()}</div>
                  <div className="text-[9px] text-[var(--mid-gray)]">Projected/mo</div>
                </div>
                <div className="p-3 bg-[var(--light-surface)] rounded-lg text-center">
                  <div className="text-sm font-extrabold">{impl.hoursRecovered}h</div>
                  <div className="text-[9px] text-[var(--mid-gray)]">Hours recovered/mo</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
