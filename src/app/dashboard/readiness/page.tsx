"use client";

const dimensions = [
  { name: "Technology Stack", score: 72, desc: "Your current tools have moderate AI integration capability. Several key systems support AI plugins or have built-in AI features you are not using yet." },
  { name: "Team Readiness", score: 58, desc: "Your team has basic technology skills but limited AI experience. Training and onboarding will be needed for successful adoption." },
  { name: "Data Maturity", score: 65, desc: "You collect good operational data but it is fragmented across systems. Consolidation and cleanup will multiply AI effectiveness." },
  { name: "Process Automation", score: 74, desc: "Some processes are already systematized. AI can be layered on top of existing workflows with minimal disruption." },
  { name: "Leadership Buy-In", score: 90, desc: "Decision-makers are ready to invest in AI. This is your biggest advantage and a strong foundation for implementation." },
  { name: "AI Experience", score: 45, desc: "Limited prior AI usage. This is common and not a barrier, but expect a learning curve during the first implementations." },
];

export default function ReadinessPage() {
  const overall = Math.round(dimensions.reduce((s, d) => s + d.score, 0) / dimensions.length);

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">AI Readiness Score</h1>
        <p className="text-[var(--mid-gray)] text-sm mt-1">How prepared your business is to implement AI across operations.</p>
      </div>

      {/* Overall score */}
      <div className="bg-white border border-black/5 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="relative w-40 h-40 shrink-0">
          <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
            <circle cx="50" cy="50" r="42" fill="none" stroke="#f2f2f2" strokeWidth="6" />
            <circle cx="50" cy="50" r="42" fill="none" stroke="#080808" strokeWidth="6" strokeDasharray={`${overall * 2.64} ${100 * 2.64}`} strokeLinecap="round" />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-extrabold">{overall}</span>
            <span className="text-xs text-[var(--mid-gray)]">out of 100</span>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold mb-2">Your business is AI-ready with room to grow.</h2>
          <p className="text-[var(--mid-gray)] leading-relaxed">A score of {overall} means you have a solid foundation for AI implementation. Your strongest areas are leadership buy-in and process automation. The biggest opportunity for improvement is hands-on AI experience, which will grow naturally as you implement the recommendations in your report.</p>
        </div>
      </div>

      {/* Dimension breakdown */}
      <div className="space-y-4">
        {dimensions.map((dim) => (
          <div key={dim.name} className="bg-white border border-black/5 rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold">{dim.name}</span>
              <span className={`text-sm font-extrabold ${dim.score >= 70 ? "text-green-600" : dim.score >= 50 ? "text-amber-600" : "text-red-500"}`}>{dim.score}/100</span>
            </div>
            <div className="h-2 bg-[var(--light-surface)] rounded-full overflow-hidden mb-3">
              <div className={`h-full rounded-full ${dim.score >= 70 ? "bg-green-500" : dim.score >= 50 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${dim.score}%` }} />
            </div>
            <p className="text-xs text-[var(--mid-gray)] leading-relaxed">{dim.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
