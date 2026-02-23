"use client";

import { useState } from "react";

const wins = [
  { title: "Automate Invoice Processing", impact: "$2,400/mo", effort: "Low", time: "1-2 weeks", description: "Set up AI-powered invoice scanning that extracts line items, matches to purchase orders, and routes for approval automatically.", steps: ["Sign up for Docsumo or Rossum (free trial)", "Connect to your accounting software", "Upload 10 sample invoices to train the system", "Set approval routing rules", "Go live and monitor accuracy for one week"], status: "ready" },
  { title: "AI Lead Follow-Up Sequences", impact: "$3,100/mo", effort: "Low", time: "1-2 weeks", description: "Set up automated email and text sequences that respond to new inquiries within 2 minutes and nurture leads with personalized content.", steps: ["Choose a platform (HubSpot free tier or ActiveCampaign)", "Write 5 email templates for your follow-up sequence", "Set up trigger: new inquiry → instant response", "Create 7-day nurture sequence with value-add content", "Set up hot lead alerts to your phone"], status: "ready" },
  { title: "Smart Scheduling Assistant", impact: "$1,800/mo", effort: "Low", time: "2-3 weeks", description: "Deploy an AI scheduling tool that considers availability, job proximity, skill requirements, and customer preferences.", steps: ["Evaluate ServiceTitan, Jobber, or Calendly for your use case", "Import your team availability and service areas", "Set up booking rules and buffer times", "Add scheduling link to your website and email signature", "Train team on the new system (30 min session)"], status: "ready" },
  { title: "AI Review Request Automation", impact: "$600/mo", effort: "Very Low", time: "1 week", description: "Automatically send review requests via text and email 24 hours after job completion. AI drafts response suggestions for reviews received.", steps: ["Sign up for Birdeye or Podium", "Connect to your job management system", "Set trigger: job marked complete → send review request", "Enable AI response drafting for incoming reviews", "Monitor and approve responses for first 2 weeks"], status: "ready" },
  { title: "Social Media Content Automation", impact: "$800/mo", effort: "Very Low", time: "3 days", description: "AI generates industry-relevant posts, schedules them across platforms, and maintains consistent brand presence without manual effort.", steps: ["Connect your social accounts to Buffer or Hootsuite", "Set your brand voice and content themes", "Generate 30 days of content with AI", "Review and approve the batch", "Set to auto-publish and check weekly"], status: "ready" },
];

export default function QuickWinsPage() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Quick Wins</h1>
        <p className="text-[var(--mid-gray)] text-sm mt-1">High-impact, low-effort actions you can implement this week.</p>
      </div>

      <div className="bg-green-50 border border-green-100 rounded-2xl p-6 flex items-center gap-4">
        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center shrink-0">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10" /></svg>
        </div>
        <div>
          <div className="text-sm font-bold text-green-900">Combined Quick Win Savings: $8,700/month</div>
          <div className="text-xs text-green-800/60">All 5 quick wins can be implemented within 2-3 weeks with minimal disruption.</div>
        </div>
      </div>

      <div className="space-y-3">
        {wins.map((win, i) => (
          <div key={win.title} className="bg-white border border-black/5 rounded-xl overflow-hidden">
            <button
              onClick={() => setExpandedIdx(expandedIdx === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left hover:bg-black/[0.01] transition-colors"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center text-sm font-bold text-green-600 shrink-0">{i + 1}</div>
                <div>
                  <div className="text-sm font-semibold">{win.title}</div>
                  <div className="text-xs text-[var(--mid-gray)] mt-0.5">{win.effort} effort · {win.time}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-green-600">{win.impact}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`text-[var(--mid-gray)] transition-transform ${expandedIdx === i ? "rotate-180" : ""}`}><path d="M6 9l6 6 6-6" /></svg>
              </div>
            </button>
            {expandedIdx === i && (
              <div className="px-5 pb-5 border-t border-black/5 pt-4">
                <p className="text-sm text-[var(--mid-gray)] leading-relaxed mb-4">{win.description}</p>
                <div className="text-xs font-semibold uppercase tracking-wider text-[var(--mid-gray)]/50 mb-3">Implementation Steps</div>
                <div className="space-y-2">
                  {win.steps.map((step, si) => (
                    <div key={si} className="flex items-start gap-3 p-3 bg-[var(--light-surface)] rounded-lg">
                      <span className="w-5 h-5 bg-white border border-black/10 rounded flex items-center justify-center text-[10px] font-bold text-[var(--mid-gray)] shrink-0 mt-0.5">{si + 1}</span>
                      <span className="text-sm">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
