"use client";

import { useState } from "react";

const wins = [
  { title: "Automate Invoice Processing", impact: "$2,400/mo", impactNum: 2400, effort: "Low", time: "1-2 weeks", category: "Operations", description: "Set up AI-powered invoice scanning that extracts line items, matches to purchase orders, and routes for approval automatically. Most businesses process 100-500 invoices/month manually at 10-15 minutes each.", tools: ["Docsumo", "Rossum", "Stampli"], steps: ["Sign up for Docsumo or Rossum (both offer free trials)", "Connect to your accounting software (QuickBooks, Xero, etc.)", "Upload 10-20 sample invoices to train the AI model", "Configure approval routing rules (auto-approve under $500, route larger ones)", "Run parallel processing for 1 week to validate accuracy", "Switch to full automation once accuracy exceeds 95%"] },
  { title: "AI Lead Follow-Up Sequences", impact: "$3,100/mo", impactNum: 3100, effort: "Low", time: "1-2 weeks", category: "Sales", description: "Automated email and text sequences that respond to new inquiries within 2 minutes. Your current average response time is likely 4+ hours. Faster response = 35-50% higher conversion.", tools: ["HubSpot AI", "ActiveCampaign", "Instantly.ai"], steps: ["Audit your current lead sources and average response times", "Choose a platform (HubSpot free CRM or ActiveCampaign $29/mo)", "Write 5 email templates based on your best-performing sales emails", "Set up instant-response triggers for each lead source", "Create a 7-day nurture sequence with case studies and value content", "Configure hot lead alerts (3+ email opens = instant notification to your phone)", "A/B test subject lines for 2 weeks, then scale winners"] },
  { title: "Smart Scheduling Assistant", impact: "$1,800/mo", impactNum: 1800, effort: "Low", time: "2-3 weeks", category: "Operations", description: "AI scheduling eliminates back-and-forth emails, considers team availability, travel time, and customer preferences. Reduces scheduling overhead by 80% and booking friction by 90%.", tools: ["Calendly", "Motion", "Reclaim.ai"], steps: ["List all your appointment/meeting types with durations", "Choose a platform (Calendly $12/mo or Motion $19/mo)", "Set availability rules, buffer times, and max appointments per day", "Integrate with Google Calendar or Outlook (two-way sync)", "Add booking links to your website, email signature, and social bios", "Train your team in a 30-minute session", "Monitor for 2 weeks and adjust buffer times based on feedback"] },
  { title: "AI Review Request Automation", impact: "$600/mo", impactNum: 600, effort: "Very Low", time: "3-5 days", category: "Customer Experience", description: "Automatically request reviews 24 hours after job completion via text and email. AI drafts response suggestions for all incoming reviews. Businesses that respond to reviews within 24 hours see 12% more conversions.", tools: ["Birdeye", "Podium", "NiceJob"], steps: ["Sign up for Birdeye or Podium (most offer free trials)", "Connect to your job management or CRM system", "Set trigger: job marked complete = review request sent 24 hours later", "Enable AI-drafted responses for incoming reviews", "Review and approve AI responses for the first 2 weeks", "Set top-performing responses to auto-publish"] },
  { title: "Social Media Content Automation", impact: "$800/mo", impactNum: 800, effort: "Very Low", time: "3 days", category: "Marketing", description: "AI generates industry-relevant posts, schedules them across platforms, and maintains consistent brand presence. Consistent posting increases inbound leads by 20-30% over 90 days.", tools: ["Buffer", "Hootsuite", "Lately.ai"], steps: ["Connect your social accounts to Buffer or Hootsuite", "Define your brand voice, content themes, and posting frequency", "Use AI to generate 30 days of content in one sitting", "Review the batch and make edits (should take 30 minutes)", "Set to auto-publish on a consistent schedule", "Check performance weekly and adjust themes based on engagement"] },
];

export default function QuickWinsPage() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [checkedSteps, setCheckedSteps] = useState<Record<string, boolean>>({});

  const toggleStep = (winIdx: number, stepIdx: number) => {
    const key = `${winIdx}-${stepIdx}`;
    setCheckedSteps(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const totalSavings = wins.reduce((s, w) => s + w.impactNum, 0);
  const totalSteps = wins.reduce((s, w) => s + w.steps.length, 0);
  const completedSteps = Object.values(checkedSteps).filter(Boolean).length;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">Quick Wins</h1>
        <p className="text-[var(--mid-gray)] text-xs sm:text-sm mt-1">High-impact, low-effort AI implementations you can start this week. Click any to see the full plan.</p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white border border-black/5 rounded-xl p-4 text-center">
          <div className="text-2xl font-extrabold text-green-600">${totalSavings.toLocaleString()}</div>
          <div className="text-[10px] text-[var(--mid-gray)]">combined savings/mo</div>
        </div>
        <div className="bg-white border border-black/5 rounded-xl p-4 text-center">
          <div className="text-2xl font-extrabold">{wins.length}</div>
          <div className="text-[10px] text-[var(--mid-gray)]">quick wins available</div>
        </div>
        <div className="bg-white border border-black/5 rounded-xl p-4 text-center">
          <div className="text-2xl font-extrabold">1-2 wks</div>
          <div className="text-[10px] text-[var(--mid-gray)]">avg implementation</div>
        </div>
        <div className="bg-white border border-black/5 rounded-xl p-4 text-center">
          <div className="text-2xl font-extrabold">{completedSteps}/{totalSteps}</div>
          <div className="text-[10px] text-[var(--mid-gray)]">steps completed</div>
        </div>
      </div>

      {/* Progress bar */}
      {completedSteps > 0 && (
        <div className="bg-green-50 border border-green-100 rounded-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-green-800">Implementation Progress</span>
            <span className="text-xs font-bold text-green-600">{Math.round((completedSteps / totalSteps) * 100)}%</span>
          </div>
          <div className="h-2 bg-green-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full transition-all duration-500" style={{ width: `${(completedSteps / totalSteps) * 100}%` }} />
          </div>
        </div>
      )}

      {/* Quick win cards */}
      <div className="space-y-3">
        {wins.map((win, i) => {
          const isOpen = expandedIdx === i;
          const winStepsComplete = win.steps.filter((_, si) => checkedSteps[`${i}-${si}`]).length;
          const winComplete = winStepsComplete === win.steps.length;
          
          return (
            <div key={win.title} className={`bg-white border rounded-2xl overflow-hidden transition-colors ${winComplete ? "border-green-200 bg-green-50/30" : "border-black/5"}`}>
              <button
                onClick={() => setExpandedIdx(isOpen ? null : i)}
                className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-black/[0.01] transition-colors"
              >
                <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${winComplete ? "bg-green-500 text-white" : "bg-green-50 text-green-600"}`}>
                    {winComplete ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>
                    ) : (i + 1)}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold flex items-center gap-2 flex-wrap">
                      {win.title}
                      <span className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                        win.effort === "Very Low" ? "bg-green-50 text-green-700 border border-green-100" : "bg-blue-50 text-blue-700 border border-blue-100"
                      }`}>{win.effort} effort</span>
                      <span className="text-[9px] font-semibold px-2 py-0.5 rounded-full bg-[var(--light-surface)] text-[var(--mid-gray)] border border-black/5">{win.category}</span>
                    </div>
                    <div className="text-[10px] sm:text-xs text-[var(--mid-gray)] mt-0.5 flex items-center gap-2">
                      {win.time}
                      {winStepsComplete > 0 && !winComplete && (
                        <span className="text-green-600 font-semibold">{winStepsComplete}/{win.steps.length} steps done</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                  <span className="text-sm font-extrabold text-green-600">{win.impact}</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`text-[var(--mid-gray)] transition-transform ${isOpen ? "rotate-180" : ""}`}><polyline points="6,9 12,15 18,9"/></svg>
                </div>
              </button>
              
              {isOpen && (
                <div className="px-4 sm:px-5 pb-5 border-t border-black/5 pt-4 space-y-4">
                  <p className="text-sm text-[var(--mid-gray)] leading-relaxed">{win.description}</p>
                  
                  {/* Tools */}
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--mid-gray)]/50 mb-2">Recommended Tools</div>
                    <div className="flex flex-wrap gap-2">
                      {win.tools.map(t => (
                        <span key={t} className="text-xs font-medium bg-[var(--light-surface)] border border-black/5 px-3 py-1.5 rounded-lg">{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Steps with checkboxes */}
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-[var(--mid-gray)]/50 mb-2">Implementation Steps</div>
                    <div className="space-y-2">
                      {win.steps.map((step, si) => {
                        const checked = !!checkedSteps[`${i}-${si}`];
                        return (
                          <button
                            key={si}
                            onClick={(e) => { e.stopPropagation(); toggleStep(i, si); }}
                            className={`w-full flex items-start gap-3 p-3 rounded-xl text-left transition-all ${checked ? "bg-green-50 border border-green-100" : "bg-[var(--light-surface)] border border-transparent hover:border-black/5"}`}
                          >
                            <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${checked ? "bg-green-500" : "bg-white border-2 border-black/10"}`}>
                              {checked && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>}
                            </div>
                            <span className={`text-sm leading-relaxed transition-colors ${checked ? "text-green-800 line-through opacity-60" : ""}`}>{step}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Savings callout */}
                  <div className="p-3 bg-green-50 rounded-xl border border-green-100 flex items-center justify-between">
                    <span className="text-xs font-semibold text-green-800">Expected savings after 30 days</span>
                    <span className="text-sm font-extrabold text-green-700">{win.impact} saved</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
