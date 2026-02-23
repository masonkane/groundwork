"use client";

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
  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">AI Opportunity Report</h1>
        <p className="text-[var(--mid-gray)] text-xs sm:text-sm mt-1">18 AI opportunities identified across 4 business areas. Click any to see details.</p>
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

      {/* Recommendations by category */}
      {recommendations.map((cat) => (
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
    </div>
  );
}
