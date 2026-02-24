"use client";

import { useState } from "react";
import { showToast } from "@/components/Toast";

function handleExportPDF() {
  const link = document.createElement("a");
  link.href = "/api/report/pdf";
  link.download = "Summit-Electrical-AI-Report.pdf";
  link.click();
}

function handleShare() {
  navigator.clipboard.writeText(window.location.href).then(() => {
    showToast("Link copied to clipboard");
  });
}

const recommendations = [
  {
    category: "Operations",
    items: [
      { title: "Automate Invoice Processing", impact: "High", savings: "$28,800/yr", description: "Replace manual data entry with AI-powered invoice scanning and processing. Automatically extract line items, match to POs, and route for approval.", tools: ["QuickBooks AI", "Docsumo", "Rossum"], timeline: "2-4 weeks", effort: "Low" },
      { title: "AI-Powered Scheduling System", impact: "High", savings: "$21,600/yr", description: "Implement smart scheduling that considers crew availability, job proximity, skill requirements, and weather. Eliminates scheduling conflicts and reduces drive time.", tools: ["ServiceTitan", "Jobber AI", "Custom Build"], timeline: "4-6 weeks", effort: "Medium" },
      { title: "Predictive Inventory Management", impact: "Medium", savings: "$14,400/yr", description: "AI analyzes historical usage patterns and upcoming jobs to predict material needs. Reduces emergency orders and overstock waste.", tools: ["Fishbowl AI", "inFlow", "Custom Integration"], timeline: "6-8 weeks", effort: "Medium" },
      { title: "Automated Reporting & Dashboards", impact: "Medium", savings: "$9,600/yr", description: "Replace manual spreadsheet reporting with real-time AI dashboards. Auto-generate weekly reports, P&L summaries, and project profitability analysis.", tools: ["Power BI", "Looker", "Custom Dashboard"], timeline: "3-5 weeks", effort: "Low" },
      { title: "Document Processing Automation", impact: "Low", savings: "$7,200/yr", description: "Automate contract generation, change order processing, and compliance documentation using AI templates and smart data fill.", tools: ["PandaDoc AI", "DocuSign", "Custom Templates"], timeline: "2-3 weeks", effort: "Low" },
      { title: "Quality Control AI Assistant", impact: "Medium", savings: "$12,000/yr", description: "Use image recognition and checklists to automate quality inspections. AI flags issues before they become costly rework.", tools: ["ComplianceQuest", "Custom AI Model"], timeline: "8-12 weeks", effort: "High" },
    ],
  },
  {
    category: "Sales & Marketing",
    items: [
      { title: "AI Lead Follow-Up Sequences", impact: "High", savings: "$37,200/yr", description: "Automated email and text sequences that respond to inquiries within minutes, nurture leads with personalized content, and alert your team when leads are hot.", tools: ["HubSpot AI", "ActiveCampaign", "Custom Sequences"], timeline: "2-3 weeks", effort: "Low" },
      { title: "AI Proposal & Estimate Generator", impact: "High", savings: "$18,000/yr", description: "Generate professional proposals in minutes instead of hours. AI pulls from your pricing database, customizes language, and creates polished documents.", tools: ["PandaDoc", "Proposify", "Custom AI"], timeline: "4-6 weeks", effort: "Medium" },
      { title: "Social Media Content Engine", impact: "Medium", savings: "$9,600/yr", description: "AI generates industry-relevant content, schedules posts, and engages with comments. Maintains consistent brand presence without dedicated marketing staff.", tools: ["Buffer AI", "Hootsuite", "ChatGPT + Canva"], timeline: "1-2 weeks", effort: "Low" },
      { title: "AI-Powered Review Management", impact: "Medium", savings: "$7,200/yr", description: "Automatically request reviews after job completion, respond to reviews with personalized AI-drafted replies, and monitor sentiment across platforms.", tools: ["Birdeye", "Podium", "Custom Integration"], timeline: "2-3 weeks", effort: "Low" },
      { title: "Competitive Price Intelligence", impact: "Medium", savings: "$14,400/yr", description: "AI monitors competitor pricing, market rates, and bid outcomes to optimize your pricing strategy. Win more bids without leaving money on the table.", tools: ["Custom AI Build", "Price2Spy"], timeline: "6-8 weeks", effort: "Medium" },
    ],
  },
  {
    category: "Customer Experience",
    items: [
      { title: "AI Customer Communication Hub", impact: "High", savings: "$24,000/yr", description: "Centralize all customer communication with AI-powered responses for common questions, project updates, and scheduling. Customers get instant answers 24/7.", tools: ["Intercom", "Drift", "Custom Chatbot"], timeline: "3-5 weeks", effort: "Medium" },
      { title: "Automated Project Updates", impact: "Medium", savings: "$8,400/yr", description: "AI generates and sends project progress updates to customers automatically. Photos, milestones, timeline changes, all communicated without manual effort.", tools: ["BuilderTrend", "Custom Integration"], timeline: "4-6 weeks", effort: "Medium" },
      { title: "Post-Job Relationship Nurturing", impact: "Medium", savings: "$12,000/yr", description: "Automated sequences that maintain customer relationships after project completion. Seasonal check-ins, maintenance reminders, and referral requests.", tools: ["Mailchimp AI", "Customer.io"], timeline: "2-3 weeks", effort: "Low" },
      { title: "AI Satisfaction Monitoring", impact: "Low", savings: "$6,000/yr", description: "Analyze customer interactions and feedback in real-time to flag at-risk relationships before they become negative reviews or lost customers.", tools: ["Medallia", "Custom AI Analysis"], timeline: "4-6 weeks", effort: "Medium" },
    ],
  },
  {
    category: "Back Office",
    items: [
      { title: "AI Bookkeeping Assistant", impact: "High", savings: "$14,400/yr", description: "Automate transaction categorization, receipt matching, and bank reconciliation. Reduces bookkeeping time by 80% and catches errors humans miss.", tools: ["QuickBooks AI", "Bench", "Pilot"], timeline: "2-3 weeks", effort: "Low" },
      { title: "Smart HR & Onboarding", impact: "Medium", savings: "$9,600/yr", description: "AI-powered onboarding workflows, policy document generation, training scheduling, and compliance tracking for new hires.", tools: ["Rippling", "BambooHR", "Custom System"], timeline: "4-6 weeks", effort: "Medium" },
      { title: "AI Contract Analysis", impact: "Low", savings: "$7,200/yr", description: "Automatically review contracts for risk clauses, unfavorable terms, and compliance issues. Flag problems before you sign.", tools: ["Juro", "ContractPodAi", "Custom AI"], timeline: "3-4 weeks", effort: "Low" },
    ],
  },
];

export default function ReportPage() {
  const [filter, setFilter] = useState<string>("All");
  const filters = ["All", "High Impact", "Low Effort", "Quick Start"];

  const allItems = recommendations.flatMap(cat => cat.items.map(item => ({ ...item, category: cat.category })));
  
  const getFiltered = () => {
    if (filter === "High Impact") return recommendations.map(cat => ({ ...cat, items: cat.items.filter(i => i.impact === "High") })).filter(c => c.items.length > 0);
    if (filter === "Low Effort") return recommendations.map(cat => ({ ...cat, items: cat.items.filter(i => i.effort === "Low") })).filter(c => c.items.length > 0);
    if (filter === "Quick Start") return recommendations.map(cat => ({ ...cat, items: cat.items.filter(i => i.timeline.includes("1-2") || i.timeline.includes("2-3")) })).filter(c => c.items.length > 0);
    return recommendations;
  };

  const filtered = getFiltered();
  const filteredCount = filtered.reduce((s, c) => s + c.items.length, 0);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">AI Opportunity Report</h1>
          <p className="text-[var(--mid-gray)] text-xs sm:text-sm mt-1">18 AI opportunities identified across 4 business areas. Click any to see details.</p>
        </div>
        <div className="flex items-center gap-2 print:hidden shrink-0">
          <button onClick={handleExportPDF} className="flex items-center gap-2 text-xs font-medium bg-white border border-black/10 px-4 py-2.5 rounded-xl hover:bg-[var(--light-surface)] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7,10 12,15 17,10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export Report
          </button>
          <button onClick={handleShare} className="flex items-center gap-2 text-xs font-medium bg-[var(--black)] text-white px-4 py-2.5 rounded-xl hover:bg-[var(--dark-surface)] transition-colors">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            Share
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 print:hidden">
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`text-xs font-medium px-4 py-2 rounded-lg transition-colors ${filter === f ? "bg-[var(--black)] text-white" : "bg-white border border-black/5 text-[var(--mid-gray)] hover:bg-[var(--light-surface)]"}`}>
            {f}{filter === f && f !== "All" ? ` (${filteredCount})` : ""}
          </button>
        ))}
      </div>

      {/* Executive Summary */}
      <div className="bg-white border border-black/5 rounded-2xl p-5 sm:p-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--mid-gray)]/50 mb-3">Executive Summary</h2>
        <p className="text-sm leading-relaxed text-[var(--mid-gray)] mb-4">After analyzing your business operations, technology stack, team structure, and industry benchmarks, we identified <span className="font-bold text-[var(--black)]">18 AI implementation opportunities</span> across four key areas of your business. These range from quick automations you can deploy this week to strategic plays that create lasting competitive advantages over 3-6 months.</p>
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="p-3 bg-green-50 rounded-xl border border-green-100">
            <div className="text-xs font-bold text-green-800 mb-1">Immediate Action (Week 1-2)</div>
            <p className="text-[10px] text-green-700/70 leading-relaxed">5 quick wins you can implement with minimal effort. Combined savings: $8,700/month from day one.</p>
          </div>
          <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
            <div className="text-xs font-bold text-blue-800 mb-1">Short-Term Gains (Month 1-3)</div>
            <p className="text-[10px] text-blue-700/70 leading-relaxed">8 core automations that require moderate setup but deliver significant recurring savings and time recovery.</p>
          </div>
          <div className="p-3 bg-purple-50 rounded-xl border border-purple-100">
            <div className="text-xs font-bold text-purple-800 mb-1">Strategic Plays (Month 3-6)</div>
            <p className="text-[10px] text-purple-700/70 leading-relaxed">5 advanced implementations that create compounding advantages your competitors cannot easily replicate.</p>
          </div>
        </div>
      </div>

      {/* Summary bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Opportunities", value: "18" },
          { label: "Projected Savings", value: "$142,800/yr" },
          { label: "Quick Wins", value: "5 ready now" },
          { label: "Avg. Implementation", value: "3-4 weeks" },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border border-black/5 rounded-xl p-4 text-center">
            <div className="text-xl font-extrabold">{stat.value}</div>
            <div className="text-[11px] text-[var(--mid-gray)] mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Savings distribution bar */}
      <div className="bg-white border border-black/5 rounded-xl p-4 sm:p-5">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold">Savings Distribution</span>
          <span className="text-xs text-[var(--mid-gray)]">$142,800 total</span>
        </div>
        <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
          <div className="bg-[#080808] rounded-l-full" style={{ width: "34%" }} title="Operations: $93,600" />
          <div className="bg-[#2563eb]" style={{ width: "28%" }} title="Sales & Marketing: $86,400" />
          <div className="bg-[#7c3aed]" style={{ width: "22%" }} title="Customer Experience: $50,400" />
          <div className="bg-[#059669] rounded-r-full" style={{ width: "16%" }} title="Back Office: $31,200" />
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-1 mt-3">
          {[
            { label: "Operations", color: "bg-[#080808]", pct: "34%" },
            { label: "Sales & Marketing", color: "bg-[#2563eb]", pct: "28%" },
            { label: "Customer Experience", color: "bg-[#7c3aed]", pct: "22%" },
            { label: "Back Office", color: "bg-[#059669]", pct: "16%" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-sm ${item.color}`} />
              <span className="text-[10px] text-[var(--mid-gray)]">{item.label} ({item.pct})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Methodology */}
      <div className="bg-[var(--light-surface)] border border-black/5 rounded-2xl p-5 sm:p-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--mid-gray)]/50 mb-3">How We Built This Report</h2>
        <div className="grid sm:grid-cols-4 gap-3">
          {[
            { step: "1", title: "Business Analysis", desc: "Your 37 questionnaire responses were cross-referenced against operational benchmarks for your industry and company size." },
            { step: "2", title: "Cost Modeling", desc: "Each opportunity was modeled using real tool pricing, implementation timelines, and conservative savings estimates from comparable businesses." },
            { step: "3", title: "Competitive Scan", desc: "We analyzed AI adoption rates in your industry to identify where competitors have already moved and where gaps create the most risk." },
            { step: "4", title: "Priority Ranking", desc: "Opportunities were ranked by ROI, effort required, and dependencies to create an implementation sequence that maximizes early wins." },
          ].map((m) => (
            <div key={m.step} className="flex flex-col gap-2">
              <div className="w-7 h-7 bg-white border border-black/5 rounded-lg flex items-center justify-center text-xs font-bold">{m.step}</div>
              <div className="text-xs font-bold">{m.title}</div>
              <p className="text-[10px] text-[var(--mid-gray)] leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Assessment */}
      <div className="bg-white border border-black/5 rounded-2xl p-5 sm:p-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--mid-gray)]/50 mb-3">Risk Assessment</h2>
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="p-3 bg-red-50 rounded-xl border border-red-100">
            <div className="text-xs font-bold text-red-800 mb-1">High Risk if Delayed</div>
            <p className="text-[10px] text-red-700/70 leading-relaxed">Customer service AI and lead follow-up. 64% of competitors already have these. Every month of delay widens the gap.</p>
          </div>
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-100">
            <div className="text-xs font-bold text-amber-800 mb-1">Moderate Risk</div>
            <p className="text-[10px] text-amber-700/70 leading-relaxed">Invoice automation and scheduling. Not yet industry standard but adoption is accelerating. 6-12 month window to implement before it becomes table stakes.</p>
          </div>
          <div className="p-3 bg-green-50 rounded-xl border border-green-100">
            <div className="text-xs font-bold text-green-800 mb-1">Early Mover Advantage</div>
            <p className="text-[10px] text-green-700/70 leading-relaxed">AI quality control and predictive inventory. Under 20% adoption. Implementing now creates a competitive moat that compounds over time.</p>
          </div>
        </div>
      </div>

      {/* Recommendations by category */}
      {filtered.map((cat) => (
        <div key={cat.category}>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-lg font-bold">{cat.category}</h2>
            <span className="text-xs font-medium bg-[var(--light-surface)] px-2.5 py-1 rounded-full text-[var(--mid-gray)]">{cat.items.length} opportunities</span>
          </div>
          <div className="space-y-3">
            {cat.items.map((item) => (
              <details key={item.title} className="group bg-white border border-black/5 rounded-xl overflow-hidden">
                <summary className="flex items-center justify-between p-5 cursor-pointer hover:bg-black/[0.01] transition-colors">
                  <div className="flex items-center gap-4 flex-1">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                      item.impact === "High" ? "bg-green-50 text-green-700" : item.impact === "Medium" ? "bg-amber-50 text-amber-700" : "bg-gray-100 text-gray-600"
                    }`}>{item.impact}</span>
                    <span className="text-sm font-semibold">{item.title}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-green-600">{item.savings}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-[var(--mid-gray)] group-open:rotate-180 transition-transform"><path d="M6 9l6 6 6-6" /></svg>
                  </div>
                </summary>
                <div className="px-5 pb-5 border-t border-black/5 pt-4">
                  <p className="text-sm text-[var(--mid-gray)] leading-relaxed mb-4">{item.description}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4">
                    <div className="p-3 bg-[var(--light-surface)] rounded-lg">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--mid-gray)]/50 mb-1.5">Recommended Tools</div>
                      <div className="flex flex-wrap gap-1.5">{item.tools.map((t) => (<span key={t} className="text-[11px] bg-white border border-black/5 px-2 py-0.5 rounded font-medium">{t}</span>))}</div>
                    </div>
                    <div className="p-3 bg-[var(--light-surface)] rounded-lg">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--mid-gray)]/50 mb-1.5">Timeline</div>
                      <div className="text-sm font-semibold">{item.timeline}</div>
                    </div>
                    <div className="p-3 bg-[var(--light-surface)] rounded-lg">
                      <div className="text-[10px] font-semibold uppercase tracking-wider text-[var(--mid-gray)]/50 mb-1.5">Effort Level</div>
                      <div className={`text-sm font-semibold ${item.effort === "Low" ? "text-green-600" : item.effort === "Medium" ? "text-amber-600" : "text-red-600"}`}>{item.effort}</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-100">
                    <div className="flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>
                      <span className="text-xs font-semibold text-green-800">Projected savings: {item.savings}</span>
                    </div>
                    <a href="/dashboard/playbooks" className="text-[10px] font-semibold text-green-700 hover:text-green-900 transition-colors">View playbook →</a>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      ))}

      {/* Methodology */}
      <div className="bg-white border border-black/5 rounded-2xl p-5 sm:p-6">
        <h2 className="text-sm font-bold uppercase tracking-wider text-[var(--mid-gray)]/50 mb-4">How We Calculated Your Numbers</h2>
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div className="p-3 bg-[var(--light-surface)] rounded-xl border border-black/5">
            <div className="text-xs font-bold mb-1">Your Questionnaire Data</div>
            <p className="text-[10px] text-[var(--mid-gray)] leading-relaxed">Team size, current tools, manual processes, time spent on specific tasks, and pain points from your 37 responses.</p>
          </div>
          <div className="p-3 bg-[var(--light-surface)] rounded-xl border border-black/5">
            <div className="text-xs font-bold mb-1">Industry Benchmarks</div>
            <p className="text-[10px] text-[var(--mid-gray)] leading-relaxed">Published data on AI adoption, cost savings, and productivity gains from McKinsey, Gartner, and industry-specific research.</p>
          </div>
          <div className="p-3 bg-[var(--light-surface)] rounded-xl border border-black/5">
            <div className="text-xs font-bold mb-1">Tool Pricing</div>
            <p className="text-[10px] text-[var(--mid-gray)] leading-relaxed">Current pricing from each recommended tool vendor. We use the tier most appropriate for your business size.</p>
          </div>
          <div className="p-3 bg-[var(--light-surface)] rounded-xl border border-black/5">
            <div className="text-xs font-bold mb-1">Conservative Multipliers</div>
            <p className="text-[10px] text-[var(--mid-gray)] leading-relaxed">All projections use 70% of the maximum reported savings. We would rather under-promise and over-deliver.</p>
          </div>
        </div>
        <div className="p-3 bg-amber-50 rounded-xl border border-amber-100 flex items-start gap-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          <p className="text-[10px] text-amber-800/70 leading-relaxed"><span className="font-bold text-amber-900">Honest disclaimer:</span> These are projections, not guarantees. Actual results depend on implementation quality, team adoption speed, and your specific business dynamics. That said, most businesses that follow our playbooks closely hit 80-120% of projected savings within the first 90 days.</p>
        </div>
      </div>
    </div>
  );
}
