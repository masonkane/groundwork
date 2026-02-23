"use client";

import Link from "next/link";

const playbooks = [
  { title: "Invoice Processing Automation", difficulty: "Easy", timeline: "2-4 weeks", savings: "$28,800/yr", tools: ["Docsumo", "QuickBooks AI", "Rossum"], status: "Available" },
  { title: "AI Lead Follow-Up System", difficulty: "Easy", timeline: "2-3 weeks", savings: "$37,200/yr", tools: ["HubSpot AI", "ActiveCampaign"], status: "Available" },
  { title: "Smart Scheduling Deployment", difficulty: "Easy", timeline: "2-3 weeks", savings: "$21,600/yr", tools: ["ServiceTitan", "Jobber AI"], status: "Available" },
  { title: "Customer Communication Hub", difficulty: "Medium", timeline: "3-5 weeks", savings: "$24,000/yr", tools: ["Intercom", "Drift"], status: "Available" },
  { title: "AI Proposal Generator", difficulty: "Medium", timeline: "4-6 weeks", savings: "$18,000/yr", tools: ["PandaDoc", "Proposify"], status: "Available" },
  { title: "Predictive Inventory System", difficulty: "Medium", timeline: "6-8 weeks", savings: "$14,400/yr", tools: ["Fishbowl AI", "inFlow"], status: "Coming Soon" },
  { title: "AI Bookkeeping Assistant", difficulty: "Easy", timeline: "2-3 weeks", savings: "$14,400/yr", tools: ["QuickBooks AI", "Bench"], status: "Available" },
  { title: "Quality Control AI", difficulty: "Hard", timeline: "8-12 weeks", savings: "$12,000/yr", tools: ["ComplianceQuest", "Custom"], status: "Coming Soon" },
];

export default function PlaybooksPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Implementation Playbooks</h1>
        <p className="text-[var(--mid-gray)] text-sm mt-1">Step-by-step guides for every AI recommendation. Just follow the playbook.</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {playbooks.map((pb) => (
          <div key={pb.title} className="bg-white border border-black/5 rounded-xl p-5 hover:border-black/10 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-3">
              <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                pb.difficulty === "Easy" ? "bg-green-50 text-green-700" : pb.difficulty === "Medium" ? "bg-amber-50 text-amber-700" : "bg-red-50 text-red-600"
              }`}>{pb.difficulty}</span>
              <span className={`text-[10px] font-medium ${pb.status === "Available" ? "text-green-600" : "text-[var(--mid-gray)]"}`}>{pb.status}</span>
            </div>
            <h3 className="text-sm font-bold mb-2">{pb.title}</h3>
            <div className="flex items-center gap-3 text-xs text-[var(--mid-gray)] mb-3">
              <span>{pb.timeline}</span>
              <span>·</span>
              <span className="text-green-600 font-semibold">{pb.savings}</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {pb.tools.map((t) => (<span key={t} className="text-[10px] bg-[var(--light-surface)] px-2 py-0.5 rounded font-medium">{t}</span>))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
