"use client";

import { useState } from "react";

const insights = [
  { stat: "64%", title: "Using AI for Customer Service", desc: "Competitors in your industry have deployed chatbots, automated email responses, and AI-powered phone systems. Customers now expect instant responses.", yourStatus: "Not implemented", risk: "Critical", opportunity: "Deploy an AI chatbot to handle 60%+ of inquiries. Your customers are already used to this from your competitors.", impact: "$24,000/yr savings", timeline: "3-5 weeks" },
  { stat: "52%", title: "Predictive Scheduling & Dispatch", desc: "Over half of comparable businesses use AI to optimize scheduling. They complete 15-20% more jobs per week with the same crew size.", yourStatus: "Not implemented", risk: "High", opportunity: "Smart scheduling alone can add 15% capacity without hiring. That directly translates to revenue.", impact: "$21,600/yr savings", timeline: "2-3 weeks" },
  { stat: "41%", title: "Automated Invoicing & Billing", desc: "Nearly half of your competitors have eliminated manual invoicing. They process payments faster and have significantly lower accounts receivable aging.", yourStatus: "Not implemented", risk: "High", opportunity: "Automate invoice processing to cut AR aging by 30-40% and free up 20 hours/week of admin time.", impact: "$28,800/yr savings", timeline: "2-4 weeks" },
  { stat: "37%", title: "AI-Powered Lead Generation", desc: "Competitors using AI for lead gen report 3.2x faster response times and 28% higher conversion rates on inbound inquiries.", yourStatus: "Not implemented", risk: "Medium", opportunity: "Your leads are going cold while competitors respond in minutes. AI follow-up fixes this overnight.", impact: "$37,200/yr savings", timeline: "2-3 weeks" },
  { stat: "29%", title: "Automated Marketing Content", desc: "AI-generated social media, email campaigns, and blog content keeps competitors visible online without dedicated marketing staff.", yourStatus: "Not implemented", risk: "Medium", opportunity: "Consistent content keeps you top-of-mind. AI can maintain your online presence with minimal time investment.", impact: "$9,600/yr savings", timeline: "1-2 weeks" },
  { stat: "18%", title: "AI Contract & Document Analysis", desc: "Early adopters are using AI to review contracts, identify risk, and generate proposals 5x faster than manual processes.", yourStatus: "Not implemented", risk: "Low", opportunity: "Early mover advantage here. Only 18% have adopted this, so you can leapfrog most competitors.", impact: "$7,200/yr savings", timeline: "3-4 weeks" },
];

const industryTrends = [
  { trend: "AI adoption growing 42% year-over-year in your industry", direction: "up" },
  { trend: "Average AI investment per company: $2,800/year", direction: "up" },
  { trend: "Companies with 3+ AI tools report 2.1x revenue growth", direction: "up" },
  { trend: "67% plan to increase AI budget in the next 12 months", direction: "up" },
];

export default function CompetitorsPage() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const yourScore = 0;
  const industryAvg = Math.round(insights.reduce((s, i) => s + parseInt(i.stat), 0) / insights.length);

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Competitive Intelligence</h1>
        <p className="text-[var(--mid-gray)] text-sm mt-1">How your AI adoption compares to others in your industry. Click any insight for details.</p>
      </div>

      {/* Gap Overview */}
      <div className="bg-white border border-black/5 rounded-2xl p-6">
        <div className="grid md:grid-cols-3 gap-6 items-center">
          <div className="text-center">
            <div className="text-5xl font-extrabold text-red-500">{yourScore}%</div>
            <div className="text-xs text-[var(--mid-gray)] mt-1">Your AI Adoption</div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <div className="w-full h-3 bg-[var(--light-surface)] rounded-full overflow-hidden relative">
              <div className="h-full bg-red-400 rounded-full absolute" style={{ width: `${yourScore}%`, minWidth: 4 }} />
              <div className="h-full bg-amber-400/50 rounded-full absolute" style={{ width: `${industryAvg}%` }} />
            </div>
            <div className="flex items-center justify-between w-full">
              <span className="text-[9px] text-red-500 font-semibold">You</span>
              <span className="text-[9px] text-amber-600 font-semibold">Industry Avg: {industryAvg}%</span>
            </div>
            <div className="text-sm font-bold mt-2">You are {industryAvg}% behind the industry average</div>
          </div>
          <div className="text-center">
            <div className="text-5xl font-extrabold text-amber-500">{industryAvg}%</div>
            <div className="text-xs text-[var(--mid-gray)] mt-1">Industry Average</div>
          </div>
        </div>
      </div>

      {/* Warning */}
      <div className="bg-amber-50 border border-amber-100 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97706" strokeWidth="2" strokeLinecap="round" className="shrink-0 mt-0.5"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          <div>
            <p className="text-sm font-bold text-amber-900">64% of competitors have deployed at least one AI solution. You have 0 active.</p>
            <p className="text-xs text-amber-800/60 mt-1">The gap widens every month. Businesses that adopt AI early see compounding advantages in efficiency, customer satisfaction, and cost structure that are increasingly difficult for late adopters to match.</p>
          </div>
        </div>
      </div>

      {/* Detailed Insights */}
      <div className="space-y-3">
        {insights.map((item, i) => (
          <div key={item.title} className="bg-white border border-black/5 rounded-2xl overflow-hidden">
            <button onClick={() => setExpandedIdx(expandedIdx === i ? null : i)} className="w-full p-5 flex items-center justify-between text-left hover:bg-black/[0.01] transition-colors">
              <div className="flex items-center gap-4">
                <div className="text-3xl font-extrabold min-w-[60px]">{item.stat}</div>
                <div>
                  <div className="text-sm font-bold">{item.title}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      item.risk === "Critical" ? "bg-red-50 text-red-600 border border-red-100" : item.risk === "High" ? "bg-amber-50 text-amber-700 border border-amber-100" : item.risk === "Medium" ? "bg-yellow-50 text-yellow-700 border border-yellow-100" : "bg-gray-50 text-gray-600 border border-gray-200"
                    }`}>{item.risk} gap</span>
                    <span className="text-[10px] text-[var(--mid-gray)]">{item.yourStatus}</span>
                  </div>
                </div>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`text-[var(--mid-gray)] transition-transform ${expandedIdx === i ? "rotate-180" : ""}`}><polyline points="6,9 12,15 18,9"/></svg>
            </button>
            {expandedIdx === i && (
              <div className="px-5 pb-5 border-t border-black/5 pt-4 space-y-4">
                <p className="text-sm text-[var(--mid-gray)] leading-relaxed">{item.desc}</p>
                <div className="p-4 bg-green-50 border border-green-100 rounded-xl">
                  <h4 className="text-xs font-bold text-green-800 mb-1">Your Opportunity</h4>
                  <p className="text-xs text-green-700/80 leading-relaxed">{item.opportunity}</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-[var(--light-surface)] rounded-lg">
                    <div className="text-[10px] text-[var(--mid-gray)] mb-0.5">Potential Impact</div>
                    <div className="text-sm font-bold text-green-600">{item.impact}</div>
                  </div>
                  <div className="p-3 bg-[var(--light-surface)] rounded-lg">
                    <div className="text-[10px] text-[var(--mid-gray)] mb-0.5">Implementation Time</div>
                    <div className="text-sm font-bold">{item.timeline}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Industry Trends */}
      <div className="bg-white border border-black/5 rounded-2xl p-6">
        <h2 className="text-lg font-bold mb-4">Industry AI Trends</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {industryTrends.map((t) => (
            <div key={t.trend} className="flex items-start gap-3 p-3 bg-[var(--light-surface)] rounded-lg">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" className="shrink-0 mt-0.5"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18"/><polyline points="17,6 23,6 23,12"/></svg>
              <span className="text-xs leading-relaxed">{t.trend}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
