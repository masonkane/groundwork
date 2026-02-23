"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

/* ── Live Cost of Inaction Ticker ─────────────────── */
function LiveTicker() {
  const perSecond = 142800 / 365 / 24 / 3600; // dollars per second
  const [lost, setLost] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = (Date.now() - start) / 1000;
      setLost(elapsed * perSecond);
    }, 50);
    return () => clearInterval(interval);
  }, [perSecond]);

  return (
    <span className="tabular-nums text-red-400 font-extrabold">
      ${lost.toFixed(4)}
    </span>
  );
}

/* ── Circular Progress ────────────────────────────── */
function ScoreRing({ score, size = 120, stroke = 8, color = "#080808" }: { score: number; size?: number; stroke?: number; color?: string }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full -rotate-90">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#f2f2f2" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={`${(score/100)*circ} ${circ}`} strokeLinecap="round" className="transition-all duration-1000" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-extrabold">{score}</span>
        <span className="text-[9px] text-[var(--mid-gray)]">/ 100</span>
      </div>
    </div>
  );
}

/* ── Mini Sparkline ───────────────────────────────── */
function Sparkline({ data, color = "#080808" }: { data: number[]; color?: string }) {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const h = 40;
  const w = data.length * 12;
  const points = data.map((v, i) => `${i * 12},${h - ((v - min) / range) * (h - 4) - 2}`).join(" ");
  return (
    <svg width={w} height={h} className="overflow-visible">
      <polyline points={points} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const quickWins = [
  { title: "Automate invoice processing", impact: "$2,400/mo", effort: "Low", time: "1-2 weeks", category: "Operations" },
  { title: "AI lead follow-up sequences", impact: "$3,100/mo", effort: "Low", time: "1-2 weeks", category: "Sales" },
  { title: "Smart scheduling assistant", impact: "$1,800/mo", effort: "Low", time: "2-3 weeks", category: "Operations" },
];

const opportunities = [
  { area: "Operations", count: 6, savings: 48200, color: "#080808", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9" /></svg> },
  { area: "Sales & Marketing", count: 5, savings: 39600, color: "#2563eb", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18" /><polyline points="17,6 23,6 23,12" /></svg> },
  { area: "Customer Experience", count: 4, savings: 31400, color: "#7c3aed", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /></svg> },
  { area: "Back Office", count: 3, savings: 23600, color: "#059669", icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" /></svg> },
];

const recentTools = [
  { name: "HubSpot AI", category: "CRM & Sales", match: "98%", pricing: "$45/mo" },
  { name: "Docsumo", category: "Invoice Processing", match: "95%", pricing: "$29/mo" },
  { name: "Intercom Fin", category: "Customer Support", match: "92%", pricing: "$74/mo" },
  { name: "ServiceTitan", category: "Scheduling", match: "89%", pricing: "$89/mo" },
];

export default function DashboardOverview() {
  const totalSavings = 142800;
  const monthlySavings = 11900;

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">Dashboard</h1>
          <p className="text-[var(--mid-gray)] text-sm mt-1">Your personalized AI opportunity analysis.</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="text-xs font-medium bg-white border border-black/10 px-4 py-2 rounded-lg hover:bg-[var(--light-surface)] transition-colors">Export PDF</button>
          <button className="text-xs font-medium bg-[var(--black)] text-white px-4 py-2 rounded-lg hover:bg-[var(--dark-surface)] transition-colors">Share Report</button>
        </div>
      </div>

      {/* ═══ SHOCK MOMENT ═══ */}
      <div className="bg-[var(--black)] text-white rounded-2xl p-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.3) 1px, transparent 1px)", backgroundSize: "20px 20px" }} />
        <div className="relative z-10">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-white/40 text-[10px] font-semibold uppercase tracking-widest mb-2">Projected Annual Savings</p>
              <div className="text-5xl md:text-6xl font-extrabold tracking-tight mb-2">${totalSavings.toLocaleString()}</div>
              <div className="flex items-center gap-3 mb-6">
                <span className="bg-green-500/20 text-green-400 text-xs font-semibold px-3 py-1 rounded-full">↑ 580% ROI</span>
                <span className="bg-white/10 text-white/60 text-xs font-semibold px-3 py-1 rounded-full">18 opportunities</span>
              </div>
              <p className="text-white/40 text-sm leading-relaxed">Based on your questionnaire responses and industry benchmarks. These savings are achievable within 12 months of full implementation.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Monthly Savings", value: `$${monthlySavings.toLocaleString()}`, sub: "per month" },
                { label: "Quick Wins Ready", value: "3", sub: "implement this week" },
                { label: "AI Readiness", value: "67/100", sub: "room to grow" },
                { label: "Competitive Gap", value: "31%", sub: "behind industry avg" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/5 rounded-xl p-4 border border-white/5">
                  <div className="text-white/30 text-[10px] font-semibold uppercase tracking-wider mb-1">{stat.label}</div>
                  <div className="text-xl font-extrabold">{stat.value}</div>
                  <div className="text-white/30 text-[10px] mt-0.5">{stat.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ═══ COST OF INACTION — LIVE TICKER ═══ */}
      <div className="bg-white border border-red-100 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 via-red-500 to-red-400" />
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2">
              Cost of Inaction
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            </h2>
            <p className="text-[var(--mid-gray)] text-xs mt-0.5">Money your business is losing right now by not implementing AI.</p>
          </div>
          <div className="text-right">
            <div className="text-xs text-red-400 font-medium mb-1">Lost since you opened this page</div>
            <div className="text-3xl font-extrabold text-red-500"><LiveTicker /></div>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4 mt-6">
          {[
            { period: "Per Day", amount: `$${Math.round(totalSavings/365).toLocaleString()}` },
            { period: "Per Week", amount: `$${Math.round(totalSavings/52).toLocaleString()}` },
            { period: "Per Month", amount: `$${monthlySavings.toLocaleString()}` },
            { period: "Per Year", amount: `$${totalSavings.toLocaleString()}` },
          ].map((t) => (
            <div key={t.period} className="text-center p-3 bg-red-50/50 rounded-xl">
              <div className="text-lg font-extrabold text-red-600">{t.amount}</div>
              <div className="text-[10px] text-red-400">{t.period}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* ═══ QUICK WINS ═══ */}
        <div className="lg:col-span-2 bg-white border border-black/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 className="text-lg font-bold">Quick Wins</h2>
              <p className="text-xs text-[var(--mid-gray)]">High-impact changes you can implement this week.</p>
            </div>
            <Link href="/dashboard/quick-wins" className="text-xs font-medium text-[var(--mid-gray)] hover:text-[var(--black)] transition-colors">View all →</Link>
          </div>
          <div className="space-y-3">
            {quickWins.map((win, i) => (
              <div key={win.title} className="flex items-center justify-between p-4 bg-[var(--light-surface)] rounded-xl hover:bg-black/[0.03] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-9 h-9 bg-green-50 rounded-lg flex items-center justify-center text-sm font-bold text-green-600">{i + 1}</div>
                  <div>
                    <div className="text-sm font-semibold">{win.title}</div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[10px] bg-white border border-black/5 px-2 py-0.5 rounded font-medium">{win.category}</span>
                      <span className="text-[10px] text-[var(--mid-gray)]">{win.effort} effort · {win.time}</span>
                    </div>
                  </div>
                </div>
                <span className="text-sm font-bold text-green-600">{win.impact}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-green-50 rounded-xl flex items-center justify-between">
            <span className="text-xs font-semibold text-green-800">Combined Quick Win Savings</span>
            <span className="text-sm font-extrabold text-green-700">$7,300/mo</span>
          </div>
        </div>

        {/* ═══ AI READINESS SCORE ═══ */}
        <div className="bg-white border border-black/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold">AI Readiness</h2>
            <Link href="/dashboard/readiness" className="text-xs font-medium text-[var(--mid-gray)] hover:text-[var(--black)] transition-colors">Details →</Link>
          </div>
          <div className="flex justify-center mb-5">
            <ScoreRing score={67} />
          </div>
          <div className="space-y-3">
            {[
              { label: "Tech Stack", score: 72 },
              { label: "Team Readiness", score: 58 },
              { label: "Data Maturity", score: 65 },
              { label: "Process Automation", score: 74 },
              { label: "Leadership Buy-In", score: 90 },
            ].map((dim) => (
              <div key={dim.label}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-medium">{dim.label}</span>
                  <span className="text-[11px] font-bold text-[var(--mid-gray)]">{dim.score}</span>
                </div>
                <div className="h-1.5 bg-[var(--light-surface)] rounded-full overflow-hidden">
                  <div className={`h-full rounded-full transition-all duration-700 ${dim.score >= 70 ? "bg-green-500" : dim.score >= 50 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${dim.score}%` }} />
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-[var(--mid-gray)] mt-4 leading-relaxed">Your business is AI-ready with strong leadership buy-in. Focus on team training and data consolidation for best results.</p>
        </div>
      </div>

      {/* ═══ OPPORTUNITIES BREAKDOWN ═══ */}
      <div className="bg-white border border-black/5 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold">Opportunities by Business Area</h2>
            <p className="text-xs text-[var(--mid-gray)]">18 AI implementations identified across your operations.</p>
          </div>
          <Link href="/dashboard/report" className="text-xs font-medium text-[var(--mid-gray)] hover:text-[var(--black)] transition-colors">Full report →</Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {opportunities.map((opp) => (
            <div key={opp.area} className="p-5 bg-[var(--light-surface)] rounded-xl hover:bg-black/[0.03] transition-colors">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${opp.color}10`, color: opp.color }}>{opp.icon}</div>
                <span className="text-xs font-semibold">{opp.area}</span>
              </div>
              <div className="text-2xl font-extrabold mb-1">${(opp.savings / 1000).toFixed(1)}K</div>
              <div className="text-[10px] text-[var(--mid-gray)]">{opp.count} opportunities · per year</div>
              <div className="h-1.5 bg-white rounded-full mt-3 overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${(opp.savings / 50000) * 100}%`, backgroundColor: opp.color }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* ═══ COMPETITIVE INTEL ═══ */}
        <div className="bg-white border border-black/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold">Competitive Intelligence</h2>
            <Link href="/dashboard/competitors" className="text-xs font-medium text-[var(--mid-gray)] hover:text-[var(--black)] transition-colors">Full analysis →</Link>
          </div>
          <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl mb-4">
            <p className="text-xs font-semibold text-amber-800">You are 31% behind the AI adoption average in your industry.</p>
            <p className="text-[10px] text-amber-700/60 mt-1">64% of competitors have deployed at least one AI solution. You have 0 active.</p>
          </div>
          <div className="space-y-3">
            {[
              { area: "Customer Service AI", yours: 0, industry: 64 },
              { area: "Automated Billing", yours: 0, industry: 41 },
              { area: "AI Lead Generation", yours: 0, industry: 37 },
              { area: "Predictive Scheduling", yours: 0, industry: 52 },
            ].map((item) => (
              <div key={item.area}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-medium">{item.area}</span>
                  <span className="text-[10px] text-[var(--mid-gray)]">You: {item.yours}% · Industry: {item.industry}%</span>
                </div>
                <div className="h-2 bg-[var(--light-surface)] rounded-full overflow-hidden relative">
                  <div className="h-full bg-amber-400/30 rounded-full absolute" style={{ width: `${item.industry}%` }} />
                  <div className="h-full bg-[var(--black)] rounded-full absolute" style={{ width: `${item.yours}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ RECOMMENDED TOOLS ═══ */}
        <div className="bg-white border border-black/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold">Recommended Tools</h2>
            <Link href="/dashboard/vendors" className="text-xs font-medium text-[var(--mid-gray)] hover:text-[var(--black)] transition-colors">All tools →</Link>
          </div>
          <div className="space-y-3">
            {recentTools.map((tool) => (
              <div key={tool.name} className="flex items-center justify-between p-3.5 bg-[var(--light-surface)] rounded-xl">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-white border border-black/5 rounded-lg flex items-center justify-center text-xs font-bold">{tool.name[0]}</div>
                  <div>
                    <div className="text-sm font-semibold">{tool.name}</div>
                    <div className="text-[10px] text-[var(--mid-gray)]">{tool.category}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-green-600">{tool.match} match</div>
                  <div className="text-[10px] text-[var(--mid-gray)]">{tool.pricing}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* ═══ SAVINGS PROJECTION ═══ */}
        <div className="lg:col-span-2 bg-white border border-black/5 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-1">12-Month Savings Projection</h2>
          <p className="text-xs text-[var(--mid-gray)] mb-5">Cumulative savings as you implement recommendations over time.</p>
          <div className="flex items-end gap-2 h-40">
            {[12, 28, 42, 54, 65, 78, 89, 98, 110, 122, 134, 143].map((val, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                <div className="text-[9px] text-[var(--mid-gray)] opacity-0 group-hover:opacity-100 transition-opacity font-bold">${val}K</div>
                <div className="w-full bg-[var(--black)] rounded-t hover:bg-[var(--dark-surface)] transition-colors cursor-default" style={{ height: `${(val / 150) * 100}%` }} />
                <span className="text-[9px] text-[var(--mid-gray)]">{["J","F","M","A","M","J","J","A","S","O","N","D"][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ IMPLEMENTATION TIMELINE ═══ */}
        <div className="bg-white border border-black/5 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-1">Implementation Timeline</h2>
          <p className="text-xs text-[var(--mid-gray)] mb-5">Recommended rollout order.</p>
          <div className="space-y-4">
            {[
              { phase: "Week 1-2", items: "Quick Wins (3)", status: "Start here" },
              { phase: "Week 3-6", items: "Core Automations (4)", status: "High impact" },
              { phase: "Month 2-3", items: "Sales & Marketing AI (5)", status: "Revenue growth" },
              { phase: "Month 3-6", items: "Strategic Plays (6)", status: "Long-term value" },
            ].map((phase, i) => (
              <div key={phase.phase} className="flex items-start gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${i === 0 ? "bg-[var(--black)] text-white" : "bg-[var(--light-surface)] text-[var(--mid-gray)]"}`}>{i + 1}</div>
                  {i < 3 && <div className="w-px h-8 bg-black/10" />}
                </div>
                <div className="flex-1 pb-2">
                  <div className="text-xs font-bold">{phase.phase}</div>
                  <div className="text-[11px] text-[var(--mid-gray)]">{phase.items}</div>
                  <span className="text-[9px] bg-[var(--light-surface)] px-2 py-0.5 rounded font-medium text-[var(--mid-gray)]">{phase.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ TEAM TRAINING + AUDIT ═══ */}
      <div className="grid lg:grid-cols-2 gap-6">
        <Link href="/dashboard/training" className="block bg-white border border-black/5 rounded-2xl p-6 hover:border-black/10 hover:shadow-lg transition-all duration-300">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>
            </div>
            <div>
              <h3 className="text-sm font-bold">Team Training Resources</h3>
              <p className="text-xs text-[var(--mid-gray)]">Guides, walkthroughs, and onboarding materials tailored to your team's tech comfort level.</p>
            </div>
          </div>
        </Link>
        <div className="bg-[var(--light-surface)] border border-black/5 rounded-2xl p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-black/5 shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#080808" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
            </div>
            <div>
              <div className="text-sm font-bold">Next Quarterly Audit: May 23, 2026</div>
              <p className="text-xs text-[var(--mid-gray)]">We will reassess your business for new AI opportunities and industry changes.</p>
            </div>
          </div>
          <Link href="/dashboard/audits" className="text-xs font-medium text-[var(--mid-gray)] hover:text-[var(--black)] transition-colors whitespace-nowrap ml-4">Schedule →</Link>
        </div>
      </div>
    </div>
  );
}
