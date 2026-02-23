"use client";

import { useState } from "react";

const breakdowns = [
  { 
    area: "Operations Automation", monthly: 4017, annual: 48200, color: "#080808",
    items: [
      { name: "Invoice processing", monthly: 2400, hours: 20 },
      { name: "Scheduling optimization", monthly: 1500, hours: 12 },
      { name: "Reporting automation", monthly: 800, hours: 8 },
      { name: "Quality control", monthly: 317, hours: 3 },
    ]
  },
  { 
    area: "Sales & Marketing AI", monthly: 3300, annual: 39600, color: "#2563eb",
    items: [
      { name: "Lead follow-up automation", monthly: 3100, hours: 15 },
      { name: "Content generation", monthly: 800, hours: 6 },
      { name: "Proposal automation", monthly: 1500, hours: 10 },
      { name: "Review management", monthly: 600, hours: 4 },
    ]
  },
  { 
    area: "Customer Experience", monthly: 2617, annual: 31400, color: "#7c3aed",
    items: [
      { name: "AI chatbot support", monthly: 2800, hours: 25 },
      { name: "Automated project updates", monthly: 700, hours: 5 },
      { name: "Post-job nurturing", monthly: 1000, hours: 3 },
      { name: "Satisfaction monitoring", monthly: 500, hours: 2 },
    ]
  },
  { 
    area: "Back Office Automation", monthly: 1967, annual: 23600, color: "#059669",
    items: [
      { name: "AI bookkeeping", monthly: 1200, hours: 10 },
      { name: "Document processing", monthly: 600, hours: 5 },
      { name: "HR/onboarding AI", monthly: 800, hours: 6 },
    ]
  },
];

const toolCosts = [
  { name: "CRM + Lead AI", cost: 45 },
  { name: "Invoice Processing", cost: 29 },
  { name: "Customer Support AI", cost: 74 },
  { name: "Scheduling", cost: 19 },
  { name: "Bookkeeping AI", cost: 30 },
  { name: "Content + Proposals", cost: 49 },
];

export default function ROIPage() {
  const [expandedArea, setExpandedArea] = useState<string | null>(null);
  const totalAnnual = breakdowns.reduce((s, b) => s + b.annual, 0);
  const totalMonthly = breakdowns.reduce((s, b) => s + b.monthly, 0);
  const totalToolCost = toolCosts.reduce((s, t) => s + t.cost, 0);
  const netMonthly = totalMonthly - totalToolCost;
  const roi = Math.round((netMonthly * 12) / (totalToolCost * 12) * 100);
  const totalHours = breakdowns.flatMap(b => b.items).reduce((s, i) => s + i.hours, 0);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">ROI & Cost Savings</h1>
        <p className="text-[var(--mid-gray)] text-sm mt-1">Your projected return broken down by business area, with tool costs and net savings calculated.</p>
      </div>

      {/* Big numbers */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="bg-white border border-black/5 rounded-xl p-4 text-center">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--mid-gray)] mb-1">Annual Savings</div>
          <div className="text-2xl font-extrabold">${totalAnnual.toLocaleString()}</div>
        </div>
        <div className="bg-white border border-black/5 rounded-xl p-4 text-center">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--mid-gray)] mb-1">Monthly Savings</div>
          <div className="text-2xl font-extrabold">${totalMonthly.toLocaleString()}</div>
        </div>
        <div className="bg-white border border-black/5 rounded-xl p-4 text-center">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--mid-gray)] mb-1">Tool Costs</div>
          <div className="text-2xl font-extrabold text-red-500">-${totalToolCost}/mo</div>
        </div>
        <div className="bg-white border border-black/5 rounded-xl p-4 text-center">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--mid-gray)] mb-1">Net Monthly</div>
          <div className="text-2xl font-extrabold text-green-600">${netMonthly.toLocaleString()}</div>
        </div>
        <div className="bg-white border border-black/5 rounded-xl p-4 text-center">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--mid-gray)] mb-1">ROI</div>
          <div className="text-2xl font-extrabold text-green-600">{roi}%</div>
        </div>
      </div>

      {/* Net Savings Visualization */}
      <div className="bg-white border border-black/5 rounded-2xl p-6">
        <h2 className="text-lg font-bold mb-4">Net Savings Equation</h2>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <div className="text-center p-4 bg-green-50 rounded-xl border border-green-100 min-w-[140px]">
            <div className="text-xl font-extrabold text-green-700">${totalMonthly.toLocaleString()}</div>
            <div className="text-[10px] text-green-600 mt-0.5">Gross savings/mo</div>
          </div>
          <span className="text-2xl font-extrabold text-[var(--mid-gray)]">-</span>
          <div className="text-center p-4 bg-red-50 rounded-xl border border-red-100 min-w-[140px]">
            <div className="text-xl font-extrabold text-red-600">${totalToolCost}</div>
            <div className="text-[10px] text-red-500 mt-0.5">Tool costs/mo</div>
          </div>
          <span className="text-2xl font-extrabold text-[var(--mid-gray)]">=</span>
          <div className="text-center p-4 bg-[var(--black)] rounded-xl min-w-[140px]">
            <div className="text-xl font-extrabold text-white">${netMonthly.toLocaleString()}</div>
            <div className="text-[10px] text-white/50 mt-0.5">Net profit/mo</div>
          </div>
        </div>
      </div>

      {/* Time Savings */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-lg font-bold text-blue-900">Time Savings</h2>
            <p className="text-xs text-blue-800/60 mt-1">Hours your team gets back every month. Reinvest in growth, customer service, or work-life balance.</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-extrabold text-blue-700">{totalHours}</div>
              <div className="text-[10px] text-blue-600">hours/month</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-extrabold text-blue-700">{Math.round(totalHours / 4.3)}</div>
              <div className="text-[10px] text-blue-600">hours/week</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-extrabold text-blue-700">{Math.round(totalHours * 12 / 8)}</div>
              <div className="text-[10px] text-blue-600">workdays/year</div>
            </div>
          </div>
        </div>
      </div>

      {/* Cost of Inaction */}
      <div className="bg-red-50 border border-red-100 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-red-900 mb-2">Cost of Inaction</h2>
        <p className="text-red-800/70 text-sm mb-4">What your business loses by waiting. Every day of delay is money left on the table.</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { period: "Per Day", amount: Math.round(totalAnnual / 365) },
            { period: "Per Week", amount: Math.round(totalAnnual / 52) },
            { period: "Per Month", amount: totalMonthly },
            { period: "Per Year", amount: totalAnnual },
          ].map((t) => (
            <div key={t.period} className="text-center p-4 bg-red-100/50 rounded-xl border border-red-200/50">
              <div className="text-xl font-extrabold text-red-600">${t.amount.toLocaleString()}</div>
              <div className="text-[10px] text-red-500 mt-0.5">{t.period}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Breakdown by Area */}
      <div className="bg-white border border-black/5 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-black/5">
          <h2 className="text-lg font-bold">Savings Breakdown by Area</h2>
          <p className="text-xs text-[var(--mid-gray)] mt-1">Click any area to see individual line items.</p>
        </div>
        <div className="divide-y divide-black/5">
          {breakdowns.map((b) => (
            <div key={b.area}>
              <button onClick={() => setExpandedArea(expandedArea === b.area ? null : b.area)} className="w-full flex items-center justify-between px-6 py-4 hover:bg-black/[0.01] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: b.color }} />
                  <span className="text-sm font-semibold">{b.area}</span>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-sm font-bold">${b.monthly.toLocaleString()}/mo</div>
                    <div className="text-[10px] text-[var(--mid-gray)]">${b.annual.toLocaleString()}/yr</div>
                  </div>
                  <div className="w-32 h-2 bg-[var(--light-surface)] rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${(b.annual / totalAnnual) * 100}%`, backgroundColor: b.color }} />
                  </div>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`text-[var(--mid-gray)] transition-transform ${expandedArea === b.area ? "rotate-180" : ""}`}><polyline points="6,9 12,15 18,9"/></svg>
                </div>
              </button>
              {expandedArea === b.area && (
                <div className="px-6 pb-4 space-y-2">
                  {b.items.map((item) => (
                    <div key={item.name} className="flex items-center justify-between p-3 bg-[var(--light-surface)] rounded-lg">
                      <span className="text-xs font-medium">{item.name}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-[var(--mid-gray)]">{item.hours}h/mo saved</span>
                        <span className="text-xs font-bold text-green-600">${item.monthly.toLocaleString()}/mo</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Tool Costs Detail */}
      <div className="bg-white border border-black/5 rounded-2xl p-6">
        <h2 className="text-lg font-bold mb-1">Tool Investment Breakdown</h2>
        <p className="text-xs text-[var(--mid-gray)] mb-4">Monthly cost for the recommended AI tool stack. Total: ${totalToolCost}/mo (${totalToolCost * 12}/yr).</p>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
          {toolCosts.map((t) => (
            <div key={t.name} className="flex items-center justify-between p-3 bg-[var(--light-surface)] rounded-lg">
              <span className="text-xs font-medium">{t.name}</span>
              <span className="text-xs font-bold">${t.cost}/mo</span>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-100 flex items-center justify-between">
          <span className="text-xs font-bold text-green-800">For every $1 spent on tools, you save ${Math.round(netMonthly / totalToolCost)}</span>
          <span className="text-sm font-extrabold text-green-700">{roi}% ROI</span>
        </div>
      </div>
    </div>
  );
}
