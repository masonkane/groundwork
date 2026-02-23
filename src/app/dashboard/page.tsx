"use client";

import { useState, useRef } from "react";
import Link from "next/link";

/* ── Circular Progress ────────────────────────────── */
function ScoreRing({ score, size = 120, stroke = 8, color = "#080808" }: { score: number; size?: number; stroke?: number; color?: string }) {
  const r = (size - stroke) / 2;
  const circ = 2 * Math.PI * r;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full -rotate-90">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#f5f5f5" strokeWidth={stroke} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeDasharray={`${(score/100)*circ} ${circ}`} strokeLinecap="round" className="transition-all duration-1000" />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-extrabold">{score}</span>
        <span className="text-[9px] text-[var(--mid-gray)]">/ 100</span>
      </div>
    </div>
  );
}

/* ── Expandable Detail Card ───────────────────────── */
function DetailCard({ title, subtitle, children, defaultOpen = false }: { title: string; subtitle?: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white border border-black/5 rounded-2xl overflow-hidden transition-shadow hover:shadow-sm">
      <button onClick={() => setOpen(!open)} className="w-full p-5 flex items-center justify-between text-left">
        <div>
          <h3 className="text-sm font-bold">{title}</h3>
          {subtitle && <p className="text-[11px] text-[var(--mid-gray)] mt-0.5">{subtitle}</p>}
        </div>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`text-[var(--mid-gray)] transition-transform ${open ? "rotate-180" : ""}`}>
          <polyline points="6,9 12,15 18,9" />
        </svg>
      </button>
      {open && <div className="px-5 pb-5 border-t border-black/5 pt-4">{children}</div>}
    </div>
  );
}

/* ── Data ─────────────────────────────────────────── */
const quickWins = [
  { title: "Automate invoice processing", impact: "$2,400/mo", effort: "Low", time: "1-2 weeks", category: "Operations", description: "Replace manual invoice entry with AI-powered OCR that extracts line items, validates against POs, and auto-routes for approval. Tools like Docsumo or Rossum can process 500+ invoices/month with 98% accuracy.", tools: ["Docsumo", "Rossum", "Stampli"], steps: ["Audit current invoice volume and error rate", "Select tool based on your ERP integration", "Upload 50 sample invoices for training", "Run parallel processing for 2 weeks", "Switch to full automation once accuracy exceeds 95%"] },
  { title: "AI-powered lead follow-up sequences", impact: "$3,100/mo", effort: "Low", time: "1-2 weeks", category: "Sales", description: "Deploy AI email sequences that respond to inbound leads within 2 minutes (vs. your current 4-hour average). Personalized based on lead source, industry, and behavior. Increases conversion by 35-50%.", tools: ["HubSpot AI", "Instantly.ai", "Apollo.io"], steps: ["Map current lead sources and response times", "Create 5 AI sequence templates by lead type", "Set up instant-response triggers", "A/B test subject lines for 2 weeks", "Scale winning sequences across all channels"] },
  { title: "Smart scheduling assistant", impact: "$1,800/mo", effort: "Low", time: "2-3 weeks", category: "Operations", description: "AI scheduling that eliminates back-and-forth emails, auto-considers team availability, client preferences, and travel time. Reduces scheduling overhead by 80%.", tools: ["Calendly AI", "Reclaim.ai", "Motion"], steps: ["Catalog all recurring meeting types", "Set availability rules and buffer times", "Integrate with existing calendar system", "Train team on the new booking flow", "Monitor and adjust rules after 30 days"] },
  { title: "AI customer support chatbot", impact: "$2,800/mo", effort: "Medium", time: "2-3 weeks", category: "Customer Experience", description: "Handle 60-70% of support tickets automatically with an AI chatbot trained on your specific products, pricing, and policies. Escalates complex issues to humans with full context.", tools: ["Intercom Fin", "Zendesk AI", "Drift"], steps: ["Export last 6 months of support tickets", "Identify top 20 question categories", "Train chatbot on your knowledge base", "Deploy with human handoff rules", "Review weekly for gaps in training"] },
  { title: "Automated report generation", impact: "$1,900/mo", effort: "Low", time: "1-2 weeks", category: "Back Office", description: "Generate weekly/monthly business reports automatically. AI pulls data from your tools, identifies trends, and creates executive summaries. Saves 8-12 hours of manual reporting per month.", tools: ["Coefficient", "Rows.com", "Equals"], steps: ["List all recurring reports and their data sources", "Set up automated data connections", "Design report templates with AI summaries", "Schedule automated delivery", "Add anomaly detection alerts"] },
];

const opportunities = [
  { area: "Operations", count: 6, savings: 48200, pct: 34, color: "#080808", items: [
    { name: "Invoice automation", savings: 28800, status: "Quick Win" },
    { name: "Inventory forecasting", savings: 7200, status: "Medium-term" },
    { name: "Smart scheduling", savings: 5400, status: "Quick Win" },
    { name: "Quality control AI", savings: 3600, status: "Strategic" },
    { name: "Fleet/logistics optimization", savings: 1800, status: "Strategic" },
    { name: "Predictive maintenance", savings: 1400, status: "Strategic" },
  ]},
  { area: "Sales & Marketing", count: 5, savings: 39600, pct: 28, color: "#2563eb", items: [
    { name: "AI lead follow-up", savings: 14400, status: "Quick Win" },
    { name: "Content generation pipeline", savings: 9600, status: "Medium-term" },
    { name: "Predictive lead scoring", savings: 7200, status: "Medium-term" },
    { name: "Ad spend optimization", savings: 4800, status: "Strategic" },
    { name: "Social listening & response", savings: 3600, status: "Strategic" },
  ]},
  { area: "Customer Experience", count: 4, savings: 31400, pct: 22, color: "#7c3aed", items: [
    { name: "AI support chatbot", savings: 14400, status: "Quick Win" },
    { name: "Sentiment analysis", savings: 7200, status: "Medium-term" },
    { name: "Personalized recommendations", savings: 6000, status: "Strategic" },
    { name: "Churn prediction", savings: 3800, status: "Strategic" },
  ]},
  { area: "Back Office", count: 3, savings: 23600, pct: 16, color: "#059669", items: [
    { name: "Automated reporting", savings: 10800, status: "Quick Win" },
    { name: "Document processing", savings: 7200, status: "Medium-term" },
    { name: "HR/hiring AI screening", savings: 5600, status: "Medium-term" },
  ]},
];

const savingsData = [
  { month: "Jan", cumulative: 7300, label: "Quick wins go live" },
  { month: "Feb", cumulative: 16400, label: "Core automations start" },
  { month: "Mar", cumulative: 28200, label: "" },
  { month: "Apr", cumulative: 42100, label: "Sales AI deploys" },
  { month: "May", cumulative: 54800, label: "" },
  { month: "Jun", cumulative: 68500, label: "Full pipeline active" },
  { month: "Jul", cumulative: 80200, label: "" },
  { month: "Aug", cumulative: 92700, label: "" },
  { month: "Sep", cumulative: 105100, label: "Strategic plays kick in" },
  { month: "Oct", cumulative: 118400, label: "" },
  { month: "Nov", cumulative: 130900, label: "" },
  { month: "Dec", cumulative: 142800, label: "Full run rate" },
];

const competitorStats = [
  { area: "Customer Service AI", yours: 0, industry: 64, gap: "critical" },
  { area: "Automated Billing", yours: 0, industry: 41, gap: "high" },
  { area: "AI Lead Generation", yours: 0, industry: 37, gap: "medium" },
  { area: "Predictive Scheduling", yours: 0, industry: 52, gap: "high" },
  { area: "AI Content Marketing", yours: 0, industry: 29, gap: "medium" },
  { area: "Data Analytics/BI", yours: 0, industry: 58, gap: "critical" },
];

const implementationPhases = [
  { phase: "Week 1-2", title: "Quick Wins", count: 5, savings: "$7,300/mo", description: "Low-effort, high-impact automations you can deploy immediately. No technical expertise required.", items: ["Invoice automation", "Lead follow-up AI", "Smart scheduling", "Support chatbot", "Report generation"] },
  { phase: "Week 3-6", title: "Core Automations", count: 4, savings: "$3,100/mo additional", description: "Deeper integrations that connect your existing tools with AI middleware for seamless workflows.", items: ["Inventory forecasting", "Content pipeline", "Predictive lead scoring", "Sentiment analysis"] },
  { phase: "Month 2-3", title: "Sales & Marketing AI", count: 4, savings: "$2,600/mo additional", description: "Revenue-generating AI that directly impacts your top line through smarter outreach and conversion.", items: ["Ad spend optimization", "Social listening", "Personalized recommendations", "Document processing"] },
  { phase: "Month 3-6", title: "Strategic Plays", count: 5, savings: "$1,500/mo additional", description: "Long-term competitive advantages that compound over time and create lasting moats.", items: ["Quality control AI", "Fleet optimization", "Predictive maintenance", "Churn prediction", "HR/hiring screening"] },
];

const readinessDimensions = [
  { label: "Leadership Buy-In", score: 90, insight: "Strong executive support for AI adoption. This is your biggest advantage.", color: "#22c55e" },
  { label: "Process Automation", score: 74, insight: "Some processes already documented. Good foundation for AI layering.", color: "#22c55e" },
  { label: "Tech Stack", score: 72, insight: "Modern tools in place. Most support API integrations needed for AI.", color: "#22c55e" },
  { label: "Data Maturity", score: 65, insight: "Data exists but is siloed. Consolidation will unlock AI potential.", color: "#f59e0b" },
  { label: "Team Readiness", score: 58, insight: "Team is willing but needs training. Start with guided tools, not raw AI.", color: "#f59e0b" },
  { label: "AI Experience", score: 45, insight: "Limited prior AI usage. Prioritize no-code/low-code AI tools initially.", color: "#ef4444" },
];

const recommendedTools = [
  { name: "HubSpot AI", category: "CRM & Sales Automation", match: 98, pricing: "$45/mo", why: "Direct integration with your current lead flow. AI features included at no extra cost.", link: "#" },
  { name: "Docsumo", category: "Invoice & Document Processing", match: 95, pricing: "$29/mo", why: "Handles your invoice volume with 98% accuracy. 3-minute setup with QuickBooks.", link: "#" },
  { name: "Intercom Fin", category: "AI Customer Support", match: 92, pricing: "$74/mo", why: "Resolves 60%+ of tickets automatically. Learns from your specific knowledge base.", link: "#" },
  { name: "Motion", category: "AI Scheduling & Tasks", match: 89, pricing: "$19/mo", why: "Auto-schedules around your team's actual availability. Eliminates booking friction.", link: "#" },
  { name: "Coefficient", category: "Automated Reporting", match: 87, pricing: "$49/mo", why: "Pulls from all your data sources into one dashboard. AI-generated summaries.", link: "#" },
  { name: "Apollo.io", category: "Outbound Sales AI", match: 84, pricing: "$39/mo", why: "AI-written sequences with automatic personalization based on prospect data.", link: "#" },
];

/* ── PDF Export ───────────────────────────────────── */
function handleExportPDF() {
  window.print();
}

export default function DashboardOverview() {
  const totalSavings = 142800;
  const monthlySavings = 11900;
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [expandedOpp, setExpandedOpp] = useState<string | null>(null);
  const maxSavings = Math.max(...savingsData.map(d => d.cumulative));

  return (
    <div className="max-w-7xl mx-auto space-y-6 print:space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">Dashboard</h1>
          <p className="text-[var(--mid-gray)] text-sm mt-1">Your personalized AI opportunity analysis.</p>
        </div>
        <div className="flex items-center gap-2 print:hidden">
          <button onClick={handleExportPDF} className="flex items-center gap-2 text-xs font-medium bg-white border border-black/10 px-4 py-2.5 rounded-xl hover:bg-[var(--light-surface)] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Download PDF Report
          </button>
          <button className="text-xs font-medium bg-[var(--black)] text-white px-4 py-2.5 rounded-xl hover:bg-[var(--dark-surface)] transition-colors">Share Report</button>
        </div>
      </div>

      {/* ═══ PROJECTED SAVINGS HERO ═══ */}
      <div className="bg-white border-2 border-black/[0.06] rounded-2xl p-5 sm:p-7 md:p-10 shadow-[0_1px_40px_rgba(0,0,0,0.04)]">
        <p className="text-[var(--mid-gray)] text-[10px] font-semibold uppercase tracking-widest mb-3">Projected Annual Savings</p>
        <div className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-4">${totalSavings.toLocaleString()}</div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
          <span className="bg-green-50 text-green-700 text-[10px] sm:text-xs font-semibold px-3 py-1.5 rounded-full border border-green-100">580% ROI</span>
          <span className="bg-[var(--light-surface)] text-[var(--mid-gray)] text-[10px] sm:text-xs font-semibold px-3 py-1.5 rounded-full border border-black/5">18 opportunities found</span>
          <span className="bg-[var(--light-surface)] text-[var(--mid-gray)] text-[10px] sm:text-xs font-semibold px-3 py-1.5 rounded-full border border-black/5">4 business areas</span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {[
            { label: "Monthly Savings", value: `$${monthlySavings.toLocaleString()}`, sub: "per month", accent: "text-green-600" },
            { label: "Quick Wins Ready", value: "5", sub: "implement this week", accent: "" },
            { label: "AI Readiness", value: "67/100", sub: "room to grow", accent: "" },
            { label: "Competitive Gap", value: "31%", sub: "behind industry avg", accent: "text-amber-600" },
          ].map((stat) => (
            <div key={stat.label} className="bg-[var(--light-surface)] rounded-xl p-3 sm:p-4 border border-black/5">
              <div className="text-[var(--mid-gray)] text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider mb-1">{stat.label}</div>
              <div className={`text-lg sm:text-xl font-extrabold ${stat.accent}`}>{stat.value}</div>
              <div className="text-[var(--mid-gray)] text-[9px] sm:text-[10px] mt-0.5">{stat.sub}</div>
            </div>
          ))}
        </div>

        <p className="text-[var(--mid-gray)] text-xs sm:text-sm leading-relaxed max-w-2xl">Based on your questionnaire responses, industry benchmarks, and current operational costs. These savings are achievable within 12 months of full implementation.</p>
      </div>

      {/* ═══ COST OF INACTION ═══ */}
      <div className="bg-white border border-black/5 rounded-2xl p-5 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4 mb-5">
          <div>
            <h2 className="text-base sm:text-lg font-bold">Cost of Inaction</h2>
            <p className="text-[var(--mid-gray)] text-xs mt-0.5">What your business loses by waiting to implement AI.</p>
          </div>
          <Link href="/dashboard/roi" className="text-xs font-medium text-[var(--mid-gray)] hover:text-[var(--black)] transition-colors print:hidden">Full ROI breakdown →</Link>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          {[
            { period: "Per Day", amount: Math.round(totalSavings/365), highlight: false },
            { period: "Per Week", amount: Math.round(totalSavings/52), highlight: false },
            { period: "Per Month", amount: monthlySavings, highlight: true },
            { period: "Per Year", amount: totalSavings, highlight: true },
          ].map((t) => (
            <div key={t.period} className={`text-center p-4 rounded-xl border ${t.highlight ? "bg-red-50 border-red-100" : "bg-[var(--light-surface)] border-black/5"}`}>
              <div className={`text-lg sm:text-xl font-extrabold ${t.highlight ? "text-red-600" : ""}`}>${t.amount.toLocaleString()}</div>
              <div className={`text-[10px] font-medium mt-1 ${t.highlight ? "text-red-400" : "text-[var(--mid-gray)]"}`}>{t.period}</div>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3 p-3 bg-[var(--light-surface)] rounded-xl border border-black/5">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" className="shrink-0"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <p className="text-xs text-[var(--mid-gray)] leading-relaxed">Every 90 days of delay costs your business <span className="font-bold text-[var(--black)]">${(Math.round(totalSavings/365) * 90).toLocaleString()}</span> in unrealized savings. The gap between you and AI-enabled competitors widens every month.</p>
        </div>
      </div>

      {/* ═══ QUICK WINS ═══ */}
      <div className="bg-white border border-black/5 rounded-2xl p-4 sm:p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0 mb-4 sm:mb-5">
          <div>
            <h2 className="text-base sm:text-lg font-bold">Quick Wins</h2>
            <p className="text-xs text-[var(--mid-gray)]">5 high-impact changes you can implement this week. Click any to see the full plan.</p>
          </div>
          <div className="text-right">
            <div className="text-xl font-extrabold text-green-600">$11,900/mo</div>
            <div className="text-[10px] text-[var(--mid-gray)]">combined savings</div>
          </div>
        </div>
        <div className="space-y-3">
          {quickWins.map((win, i) => (
            <DetailCard key={win.title} title={`${i + 1}. ${win.title}`} subtitle={`${win.impact} savings · ${win.effort} effort · ${win.time}`}>
              <p className="text-sm text-[var(--mid-gray)] leading-relaxed mb-4">{win.description}</p>
              <div className="mb-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--mid-gray)]/60 mb-2">Recommended Tools</h4>
                <div className="flex flex-wrap gap-2">
                  {win.tools.map(t => (
                    <span key={t} className="text-xs font-medium bg-[var(--light-surface)] border border-black/5 px-3 py-1.5 rounded-lg">{t}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--mid-gray)]/60 mb-2">Implementation Steps</h4>
                <div className="space-y-2">
                  {win.steps.map((step, si) => (
                    <div key={si} className="flex items-start gap-3">
                      <div className="w-5 h-5 bg-[var(--light-surface)] rounded-full flex items-center justify-center text-[9px] font-bold text-[var(--mid-gray)] shrink-0 mt-0.5">{si + 1}</div>
                      <span className="text-sm">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between p-3 bg-green-50 rounded-xl border border-green-100">
                <span className="text-xs font-semibold text-green-800">Expected outcome after 30 days</span>
                <span className="text-sm font-extrabold text-green-700">{win.impact} saved</span>
              </div>
            </DetailCard>
          ))}
        </div>
      </div>

      {/* ═══ OPPORTUNITIES BY AREA ═══ */}
      <div className="bg-white border border-black/5 rounded-2xl p-4 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold">Opportunities by Business Area</h2>
            <p className="text-xs text-[var(--mid-gray)]">18 AI implementations identified. Click any area to see specifics.</p>
          </div>
          <Link href="/dashboard/report" className="text-xs font-medium text-[var(--mid-gray)] hover:text-[var(--black)] transition-colors print:hidden">Full report →</Link>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {opportunities.map((opp) => (
            <div key={opp.area} className="border border-black/5 rounded-xl overflow-hidden">
              <button onClick={() => setExpandedOpp(expandedOpp === opp.area ? null : opp.area)} className="w-full p-5 flex items-center justify-between text-left hover:bg-black/[0.01] transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center font-extrabold text-white text-sm" style={{ backgroundColor: opp.color }}>{opp.pct}%</div>
                  <div>
                    <div className="text-sm font-bold">{opp.area}</div>
                    <div className="text-[10px] text-[var(--mid-gray)]">{opp.count} opportunities</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-extrabold">${(opp.savings / 1000).toFixed(1)}K</div>
                  <div className="text-[10px] text-[var(--mid-gray)]">per year</div>
                </div>
              </button>
              {expandedOpp === opp.area && (
                <div className="px-5 pb-5 border-t border-black/5 pt-4">
                  <div className="space-y-2">
                    {opp.items.map(item => (
                      <div key={item.name} className="flex items-center justify-between p-3 bg-[var(--light-surface)] rounded-lg">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{item.name}</span>
                          <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${item.status === "Quick Win" ? "bg-green-50 text-green-700 border border-green-100" : item.status === "Medium-term" ? "bg-blue-50 text-blue-700 border border-blue-100" : "bg-gray-50 text-gray-600 border border-gray-200"}`}>{item.status}</span>
                        </div>
                        <span className="text-sm font-bold">${item.savings.toLocaleString()}/yr</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* ═══ 12-MONTH SAVINGS PROJECTION ═══ */}
        <div className="lg:col-span-2 bg-white border border-black/5 rounded-2xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-lg font-bold">12-Month Savings Projection</h2>
            <div className="text-right">
              <div className="text-sm font-extrabold text-green-600">${totalSavings.toLocaleString()}</div>
              <div className="text-[9px] text-[var(--mid-gray)]">year-end total</div>
            </div>
          </div>
          <p className="text-xs text-[var(--mid-gray)] mb-5">Cumulative savings as each phase of implementation goes live.</p>
          
          {/* Chart */}
          <div className="relative">
            <div className="flex items-end gap-1 sm:gap-1.5 h-36 sm:h-48">
              {savingsData.map((d, i) => (
                <div 
                  key={d.month} 
                  className="flex-1 flex flex-col items-center gap-1 group relative"
                  onMouseEnter={() => setHoveredBar(i)}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {/* Tooltip */}
                  {hoveredBar === i && (
                    <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-[var(--black)] text-white px-3 py-2 rounded-lg text-xs z-10 whitespace-nowrap">
                      <div className="font-bold">${d.cumulative.toLocaleString()}</div>
                      {d.label && <div className="text-white/60 text-[9px] mt-0.5">{d.label}</div>}
                      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-[var(--black)] rotate-45" />
                    </div>
                  )}
                  <div 
                    className={`w-full rounded-t-md transition-all duration-200 cursor-pointer ${hoveredBar === i ? "bg-green-500" : "bg-[var(--black)]"}`}
                    style={{ height: `${(d.cumulative / maxSavings) * 100}%`, minHeight: 4 }} 
                  />
                  <span className="text-[9px] text-[var(--mid-gray)] font-medium">{d.month}</span>
                </div>
              ))}
            </div>
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-5 flex flex-col justify-between pointer-events-none -ml-1">
              {["$143K", "$107K", "$71K", "$36K", "$0"].map(label => (
                <span key={label} className="text-[8px] text-[var(--mid-gray)]/40 -translate-x-full pr-2">{label}</span>
              ))}
            </div>
          </div>

          {/* Phase markers */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-4 border-t border-black/5">
            {[
              { label: "Quick Wins", months: "Mo 1", color: "bg-green-500" },
              { label: "Core Automations", months: "Mo 1-2", color: "bg-blue-500" },
              { label: "Sales AI", months: "Mo 2-3", color: "bg-purple-500" },
              { label: "Strategic", months: "Mo 3-6", color: "bg-amber-500" },
            ].map(phase => (
              <div key={phase.label} className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${phase.color}`} />
                <div>
                  <div className="text-[10px] font-semibold">{phase.label}</div>
                  <div className="text-[9px] text-[var(--mid-gray)]">{phase.months}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ AI READINESS SCORE ═══ */}
        <div className="bg-white border border-black/5 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">AI Readiness</h2>
            <Link href="/dashboard/readiness" className="text-xs font-medium text-[var(--mid-gray)] hover:text-[var(--black)] transition-colors print:hidden">Details →</Link>
          </div>
          <div className="flex justify-center mb-5">
            <ScoreRing score={67} />
          </div>
          <div className="space-y-3">
            {readinessDimensions.map((dim) => (
              <div key={dim.label} className="group">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-medium">{dim.label}</span>
                  <span className="text-[11px] font-bold" style={{ color: dim.color }}>{dim.score}</span>
                </div>
                <div className="h-1.5 bg-[var(--light-surface)] rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${dim.score}%`, backgroundColor: dim.color }} />
                </div>
                <p className="text-[9px] text-[var(--mid-gray)] mt-1 opacity-0 group-hover:opacity-100 transition-opacity leading-relaxed">{dim.insight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ IMPLEMENTATION TIMELINE ═══ */}
      <div className="bg-white border border-black/5 rounded-2xl p-4 sm:p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-lg font-bold">Implementation Timeline</h2>
            <p className="text-xs text-[var(--mid-gray)]">Your recommended rollout order. Click any phase for details.</p>
          </div>
          <Link href="/dashboard/playbooks" className="text-xs font-medium text-[var(--mid-gray)] hover:text-[var(--black)] transition-colors print:hidden">View playbooks →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {implementationPhases.map((phase, i) => (
            <DetailCard key={phase.phase} title={phase.title} subtitle={phase.phase}>
              <p className="text-xs text-[var(--mid-gray)] leading-relaxed mb-3">{phase.description}</p>
              <div className="space-y-1.5 mb-3">
                {phase.items.map(item => (
                  <div key={item} className="flex items-center gap-2 text-xs">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>
                    {item}
                  </div>
                ))}
              </div>
              <div className="p-2.5 bg-green-50 rounded-lg border border-green-100 text-center">
                <div className="text-xs font-bold text-green-700">{phase.savings}</div>
              </div>
            </DetailCard>
          ))}
        </div>
      </div>

      {/* ═══ COMPETITIVE INTELLIGENCE ═══ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-white border border-black/5 rounded-2xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold">Competitive Intelligence</h2>
            <Link href="/dashboard/competitors" className="text-xs font-medium text-[var(--mid-gray)] hover:text-[var(--black)] transition-colors print:hidden">Full analysis →</Link>
          </div>
          <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl mb-4">
            <p className="text-xs font-semibold text-amber-800">You are 31% behind the AI adoption average in your industry.</p>
            <p className="text-[10px] text-amber-700/60 mt-1">64% of competitors have deployed at least one AI solution. You have 0 active.</p>
          </div>
          <div className="space-y-3">
            {competitorStats.map((item) => (
              <div key={item.area}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-medium">{item.area}</span>
                  <div className="flex items-center gap-2">
                    <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded ${item.gap === "critical" ? "bg-red-50 text-red-600" : item.gap === "high" ? "bg-amber-50 text-amber-600" : "bg-yellow-50 text-yellow-600"}`}>{item.gap}</span>
                    <span className="text-[10px] text-[var(--mid-gray)]">You: {item.yours}% · Industry: {item.industry}%</span>
                  </div>
                </div>
                <div className="h-2 bg-[var(--light-surface)] rounded-full overflow-hidden relative">
                  <div className="h-full bg-amber-200/50 rounded-full absolute" style={{ width: `${item.industry}%` }} />
                  <div className="h-full bg-[var(--black)] rounded-full absolute" style={{ width: `${item.yours}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ═══ RECOMMENDED TOOLS ═══ */}
        <div className="bg-white border border-black/5 rounded-2xl p-4 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold">Recommended Tools</h2>
            <Link href="/dashboard/vendors" className="text-xs font-medium text-[var(--mid-gray)] hover:text-[var(--black)] transition-colors print:hidden">All tools →</Link>
          </div>
          <div className="space-y-2">
            {recommendedTools.map((tool) => (
              <DetailCard key={tool.name} title={tool.name} subtitle={`${tool.category} · ${tool.pricing}`}>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-24 bg-[var(--light-surface)] rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: `${tool.match}%` }} />
                    </div>
                    <span className="text-xs font-bold text-green-600">{tool.match}% match</span>
                  </div>
                </div>
                <p className="text-xs text-[var(--mid-gray)] leading-relaxed">{tool.why}</p>
              </DetailCard>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ TEAM TRAINING + NEXT AUDIT ═══ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <Link href="/dashboard/training" className="block bg-white border border-black/5 rounded-2xl p-6 hover:border-black/10 hover:shadow-sm transition-all duration-300 print:shadow-none">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>
            </div>
            <div>
              <h3 className="text-sm font-bold">Team Training Resources</h3>
              <p className="text-xs text-[var(--mid-gray)] mt-0.5">Guides, walkthroughs, and onboarding materials tailored to your team&apos;s tech comfort level.</p>
            </div>
          </div>
        </Link>
        <div className="bg-white border border-black/5 rounded-2xl p-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[var(--light-surface)] rounded-xl flex items-center justify-center border border-black/5 shrink-0">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#080808" strokeWidth="1.5" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
            </div>
            <div>
              <div className="text-sm font-bold">Next Quarterly Audit: May 23, 2026</div>
              <p className="text-xs text-[var(--mid-gray)] mt-0.5">We will reassess your business for new AI opportunities and track implementation progress.</p>
            </div>
          </div>
          <Link href="/dashboard/audits" className="text-xs font-medium text-[var(--mid-gray)] hover:text-[var(--black)] transition-colors whitespace-nowrap ml-4 print:hidden">Schedule →</Link>
        </div>
      </div>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          .print\\:hidden { display: none !important; }
          .print\\:space-y-4 > * + * { margin-top: 1rem; }
          .print\\:shadow-none { box-shadow: none !important; }
          aside, header { display: none !important; }
          main { padding: 0 !important; margin: 0 !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        }
      `}</style>
    </div>
  );
}
