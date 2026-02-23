"use client";

import { useState } from "react";

const dimensions = [
  { 
    name: "Leadership Buy-In", score: 90, color: "#22c55e",
    desc: "Decision-makers are ready to invest in AI. This is your biggest advantage and a strong foundation for implementation.",
    strengths: ["Executive team sees AI as a priority", "Budget is available for tool investment", "Willingness to change existing processes"],
    actions: ["Communicate AI roadmap to the full team", "Set quarterly AI adoption goals", "Designate an internal AI champion"],
  },
  { 
    name: "Process Automation", score: 74, color: "#22c55e",
    desc: "Some processes are already systematized. AI can be layered on top of existing workflows with minimal disruption.",
    strengths: ["Standard operating procedures exist for key processes", "Some digital tools already in use", "Team follows documented workflows"],
    actions: ["Map every manual touchpoint in your top 5 processes", "Identify which steps are repetitive and rule-based", "Prioritize automating the most time-consuming steps first"],
  },
  { 
    name: "Technology Stack", score: 72, color: "#22c55e",
    desc: "Your current tools have moderate AI integration capability. Several key systems support AI plugins or have built-in AI features you are not using yet.",
    strengths: ["Cloud-based tools that support integrations", "API access available for key systems", "Some tools already have AI features turned off"],
    actions: ["Enable built-in AI features in existing tools (QuickBooks, CRM)", "Audit API availability for your top 10 tools", "Consolidate tools where possible to reduce integration complexity"],
  },
  { 
    name: "Data Maturity", score: 65, color: "#f59e0b",
    desc: "You collect good operational data but it is fragmented across systems. Consolidation and cleanup will multiply AI effectiveness.",
    strengths: ["Regular data collection from business operations", "Historical records available for training AI models", "Customer data exists across multiple platforms"],
    actions: ["Create a single source of truth for customer data", "Clean and deduplicate your records (start with top 100 customers)", "Set up automated data syncing between your core systems"],
  },
  { 
    name: "Team Readiness", score: 58, color: "#f59e0b",
    desc: "Your team has basic technology skills but limited AI experience. Training and onboarding will be needed for successful adoption.",
    strengths: ["Team is willing to learn new tools", "Basic comfort with digital workflows", "Strong work ethic and adaptability"],
    actions: ["Start with the Team Training modules in your dashboard", "Assign one tool per team member to become the expert on", "Celebrate early wins publicly to build momentum and reduce fear"],
  },
  { 
    name: "AI Experience", score: 45, color: "#ef4444",
    desc: "Limited prior AI usage. This is common and not a barrier. Expect a learning curve during the first implementations, which flattens quickly with guided tools.",
    strengths: ["No bad habits or failed implementations to unlearn", "Fresh perspective on what AI can do", "High upside potential from first implementations"],
    actions: ["Start with the easiest Quick Win (it takes 3 days)", "Use no-code/low-code AI tools exclusively at first", "Schedule a 15-minute weekly AI check-in to discuss what is working"],
  },
];

export default function ReadinessPage() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const overall = Math.round(dimensions.reduce((s, d) => s + d.score, 0) / dimensions.length);

  const getGrade = (score: number) => {
    if (score >= 80) return { label: "Strong", color: "text-green-600 bg-green-50 border-green-100" };
    if (score >= 60) return { label: "Moderate", color: "text-amber-600 bg-amber-50 border-amber-100" };
    return { label: "Needs Work", color: "text-red-600 bg-red-50 border-red-100" };
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">AI Readiness Score</h1>
        <p className="text-[var(--mid-gray)] text-sm mt-1">How prepared your business is to implement AI. Click any dimension for details and action steps.</p>
      </div>

      {/* Overall score */}
      <div className="bg-white border border-black/5 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="relative w-36 h-36 shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#f5f5f5" strokeWidth="6" />
            <circle cx="50" cy="50" r="42" fill="none" stroke="#080808" strokeWidth="6" strokeDasharray={`${overall * 2.64} ${100 * 2.64}`} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold">{overall}</span>
            <span className="text-xs text-[var(--mid-gray)]">out of 100</span>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Your business is AI-ready with room to grow.</h2>
          <p className="text-[var(--mid-gray)] text-sm leading-relaxed mb-4">A score of {overall} means you have a solid foundation for AI implementation. Your strongest area is leadership buy-in. The biggest opportunity for improvement is hands-on AI experience, which will grow naturally as you implement recommendations.</p>
          <div className="flex flex-wrap gap-2">
            <div className="text-[10px] font-semibold px-3 py-1 rounded-full bg-green-50 text-green-700 border border-green-100">{dimensions.filter(d => d.score >= 70).length} dimensions strong</div>
            <div className="text-[10px] font-semibold px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-100">{dimensions.filter(d => d.score >= 50 && d.score < 70).length} moderate</div>
            <div className="text-[10px] font-semibold px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-100">{dimensions.filter(d => d.score < 50).length} needs work</div>
          </div>
        </div>
      </div>

      {/* Dimensions */}
      <div className="space-y-3">
        {dimensions.map((dim, i) => {
          const grade = getGrade(dim.score);
          const isOpen = expandedIdx === i;
          return (
            <div key={dim.name} className="bg-white border border-black/5 rounded-2xl overflow-hidden">
              <button onClick={() => setExpandedIdx(isOpen ? null : i)} className="w-full p-5 text-left hover:bg-black/[0.01] transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-bold">{dim.name}</span>
                    <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${grade.color}`}>{grade.label}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-extrabold" style={{ color: dim.color }}>{dim.score}</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`text-[var(--mid-gray)] transition-transform ${isOpen ? "rotate-180" : ""}`}><polyline points="6,9 12,15 18,9"/></svg>
                  </div>
                </div>
                <div className="h-2 bg-[var(--light-surface)] rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-700" style={{ width: `${dim.score}%`, backgroundColor: dim.color }} />
                </div>
              </button>
              {isOpen && (
                <div className="px-5 pb-5 border-t border-black/5 pt-4 space-y-4">
                  <p className="text-sm text-[var(--mid-gray)] leading-relaxed">{dim.desc}</p>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--mid-gray)]/60 mb-2 flex items-center gap-2">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>
                        Strengths
                      </h4>
                      <div className="space-y-1.5">
                        {dim.strengths.map((s, si) => (
                          <div key={si} className="flex items-start gap-2 p-2.5 bg-green-50 rounded-lg border border-green-100">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" className="shrink-0 mt-1"><polyline points="20,6 9,17 4,12"/></svg>
                            <span className="text-[11px] text-green-800">{s}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--mid-gray)]/60 mb-2 flex items-center gap-2">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#080808" strokeWidth="2" strokeLinecap="round"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/></svg>
                        Action Steps
                      </h4>
                      <div className="space-y-1.5">
                        {dim.actions.map((a, ai) => (
                          <div key={ai} className="flex items-start gap-2 p-2.5 bg-[var(--light-surface)] rounded-lg border border-black/5">
                            <div className="w-4 h-4 border-2 border-black/10 rounded mt-0.5 shrink-0" />
                            <span className="text-[11px]">{a}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="bg-[var(--light-surface)] border border-black/5 rounded-2xl p-6 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold">Not sure where to start?</h3>
          <p className="text-xs text-[var(--mid-gray)] mt-0.5">The Quick Wins are specifically chosen because they work at your current readiness level. No advanced tech skills required.</p>
        </div>
        <a href="/dashboard/quick-wins" className="text-xs font-medium bg-[var(--black)] text-white px-4 py-2.5 rounded-xl hover:bg-[var(--dark-surface)] transition-colors shrink-0">View Quick Wins</a>
      </div>
    </div>
  );
}
