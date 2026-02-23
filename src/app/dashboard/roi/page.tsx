"use client";

const breakdowns = [
  { area: "Operations Automation", monthly: 4017, annual: 48200 },
  { area: "Sales & Marketing AI", monthly: 3300, annual: 39600 },
  { area: "Customer Experience", monthly: 2617, annual: 31400 },
  { area: "Back Office Automation", monthly: 1967, annual: 23600 },
];

export default function ROIPage() {
  const totalAnnual = breakdowns.reduce((s, b) => s + b.annual, 0);
  const totalMonthly = breakdowns.reduce((s, b) => s + b.monthly, 0);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">ROI & Cost Savings</h1>
        <p className="text-[var(--mid-gray)] text-sm mt-1">Your projected savings broken down by business area.</p>
      </div>

      {/* Big numbers */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-[var(--black)] text-white rounded-2xl p-6">
          <div className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-2">Annual Savings</div>
          <div className="text-4xl font-extrabold">${totalAnnual.toLocaleString()}</div>
        </div>
        <div className="bg-white border border-black/5 rounded-2xl p-6">
          <div className="text-[var(--mid-gray)] text-xs font-semibold uppercase tracking-widest mb-2">Monthly Savings</div>
          <div className="text-4xl font-extrabold">${totalMonthly.toLocaleString()}</div>
        </div>
        <div className="bg-white border border-black/5 rounded-2xl p-6">
          <div className="text-[var(--mid-gray)] text-xs font-semibold uppercase tracking-widest mb-2">Projected ROI</div>
          <div className="text-4xl font-extrabold text-green-600">580%</div>
        </div>
      </div>

      {/* Cost of Inaction */}
      <div className="bg-red-50 border border-red-100 rounded-2xl p-6 md:p-8">
        <h2 className="text-lg font-bold text-red-900 mb-2">Cost of Inaction</h2>
        <p className="text-red-800/70 text-sm mb-4">This is what your business loses every month by not implementing these AI solutions.</p>
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-3xl font-extrabold text-red-600">${totalMonthly.toLocaleString()}</div>
            <div className="text-xs text-red-800/50 mt-1">Per month lost</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold text-red-600">${(totalMonthly * 3).toLocaleString()}</div>
            <div className="text-xs text-red-800/50 mt-1">Per quarter lost</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-extrabold text-red-600">${totalAnnual.toLocaleString()}</div>
            <div className="text-xs text-red-800/50 mt-1">Per year lost</div>
          </div>
        </div>
      </div>

      {/* Breakdown table */}
      <div className="bg-white border border-black/5 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-black/5">
          <h2 className="text-lg font-bold">Savings Breakdown</h2>
        </div>
        <div className="divide-y divide-black/5">
          {breakdowns.map((b) => (
            <div key={b.area} className="flex items-center justify-between px-6 py-4">
              <span className="text-sm font-medium">{b.area}</span>
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <div className="text-sm font-bold">${b.monthly.toLocaleString()}/mo</div>
                  <div className="text-[11px] text-[var(--mid-gray)]">${b.annual.toLocaleString()}/yr</div>
                </div>
                <div className="w-32 h-2 bg-[var(--light-surface)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--black)] rounded-full" style={{ width: `${(b.annual / totalAnnual) * 100}%` }} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
