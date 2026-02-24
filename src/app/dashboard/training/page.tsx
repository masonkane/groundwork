"use client";

import { useState, useEffect } from "react";

type Module = {
  title: string;
  description: string;
  duration: string;
  type: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  topics: string[];
  content: { heading: string; body: string }[];
  actionItems: string[];
};

const modules: Module[] = [
  {
    title: "AI Fundamentals for Your Team",
    description: "A non-technical overview of what AI is, how it works, and why it matters for your business. Designed for teams with basic to intermediate tech skills.",
    duration: "30 min read",
    type: "Guide",
    difficulty: "Beginner",
    topics: ["What AI actually is (no jargon)", "How AI tools learn and improve", "Common fears and misconceptions", "Real examples from your industry"],
    content: [
      { heading: "What AI Actually Is", body: "AI is software that can learn patterns and make decisions. When you use spam filters, autocomplete, or GPS routing, you are already using AI. Business AI is the same concept applied to your operations: it learns your patterns and automates repetitive decisions." },
      { heading: "How AI Tools Learn", body: "Most AI tools you will use are pre-trained. They already know how to read invoices, draft emails, or categorize expenses. You customize them by feeding in your specific data: your products, your pricing, your customer history. The more data you give them, the better they perform." },
      { heading: "What AI Cannot Do", body: "AI cannot replace human judgment for complex decisions, creative strategy, or relationship building. It handles the repetitive 80% so your team can focus on the high-value 20%. Think of it as a tireless assistant that never forgets, never sleeps, and never makes the same mistake twice." },
      { heading: "Why This Matters Now", body: "64% of businesses in your industry have already deployed at least one AI tool. The gap between AI-enabled and AI-absent businesses grows every quarter. Starting now means you catch up. Waiting means the gap widens." },
    ],
    actionItems: ["Share this guide with your team before implementing any tools", "Have each team member list 3 tasks they do repeatedly every week", "Identify which of those tasks could be handled by software"],
  },
  {
    title: "Getting Started with Your First AI Tool",
    description: "Step-by-step walkthrough for setting up and using your first recommended AI tool. Based on your Quick Wins list.",
    duration: "45 min",
    type: "Walkthrough",
    difficulty: "Beginner",
    topics: ["Account setup and configuration", "Connecting to existing tools", "Running your first automation", "Measuring initial results"],
    content: [
      { heading: "Pick One Tool, Not Five", body: "The biggest mistake is trying to implement everything at once. Pick the Quick Win with the highest savings and lowest effort. For most businesses, that is either invoice automation or lead follow-up. Master one before adding more." },
      { heading: "Setup Takes 30 Minutes", body: "Most AI tools have guided onboarding. You will need: your business email, access to the system it connects with (CRM, accounting software, calendar), and 30 minutes of uninterrupted time. Follow the setup wizard exactly." },
      { heading: "The First Week", body: "Run the AI tool alongside your existing process for the first week. Do not replace anything yet. Compare results. Check accuracy. Note anything it gets wrong. This parallel testing period builds confidence and catches issues early." },
      { heading: "Measuring Results", body: "Before you start, write down: how long the task takes now, how many errors happen per week, and how much it costs in labor. After 2 weeks of AI, measure the same things. The difference is your ROI." },
    ],
    actionItems: ["Choose your first Quick Win from the dashboard", "Block 45 minutes on your calendar for setup", "Document your current process (time, errors, cost) before starting"],
  },
  {
    title: "AI for Customer Communication",
    description: "How to deploy AI chatbots and automated responses without losing the personal touch your customers expect.",
    duration: "25 min read",
    type: "Guide",
    difficulty: "Intermediate",
    topics: ["Setting up AI chat support", "Writing effective knowledge bases", "When AI should hand off to humans", "Maintaining your brand voice"],
    content: [
      { heading: "The 60/40 Rule", body: "AI should handle 60% of customer inquiries (FAQs, status checks, scheduling, basic info) and hand off 40% to humans (complaints, complex issues, high-value accounts). Getting this split right is the difference between delighted customers and frustrated ones." },
      { heading: "Building Your Knowledge Base", body: "Export your last 6 months of customer questions. Group them into categories. Write clear, specific answers for the top 20 questions. This becomes your AI's brain. The more detailed your answers, the more accurate the AI." },
      { heading: "Human Handoff Rules", body: "Set explicit triggers for when AI escalates to a human: negative sentiment detected, billing disputes over $100, customer explicitly asks for a person, or AI fails to answer after 2 attempts. Every handoff should include the full conversation context." },
      { heading: "Testing Before Launch", body: "Have your team test the chatbot by asking the 20 most common questions. Score each answer: correct, partially correct, or wrong. Fix wrong answers before going live. Aim for 90%+ accuracy before launch." },
    ],
    actionItems: ["Export your support ticket history from the last 6 months", "Identify your top 20 customer questions", "Write detailed answers for each and upload to your chosen tool"],
  },
  {
    title: "Automating Your Sales Pipeline",
    description: "Deploy AI lead scoring, automated follow-ups, and proposal generation to close more deals faster.",
    duration: "40 min",
    type: "Walkthrough",
    difficulty: "Intermediate",
    topics: ["AI lead scoring setup", "Automated email sequences", "Proposal generation with AI", "Pipeline analytics"],
    content: [
      { heading: "Why Speed Wins", body: "The average business responds to a new lead in 4+ hours. Companies that respond within 5 minutes are 21x more likely to qualify the lead. AI follow-up responds in seconds, 24/7, with personalized messages based on the lead source." },
      { heading: "Setting Up Lead Scoring", body: "Lead scoring assigns points based on behavior: opened email (+5), visited pricing page (+15), requested a quote (+25), downloaded something (+10). Set a threshold (e.g., 50 points) where the AI notifies a salesperson for immediate follow-up." },
      { heading: "Email Sequence Architecture", body: "Build 5 sequences: Instant Response (within 2 min), Day 1 Follow-Up (value add), Day 3 Check-In (case study), Day 5 Soft Nudge, Day 7 Last Chance. AI personalizes each based on lead data. A/B test subject lines for 2 weeks." },
      { heading: "AI Proposals", body: "Upload your 10 best proposals as templates. The AI learns your pricing structure, service descriptions, and persuasion patterns. It generates first drafts in minutes that sound like you, not a robot. You review and send." },
    ],
    actionItems: ["Map your current lead response time for one week", "Create 5 email templates based on your best sales emails", "Set up lead scoring rules in your CRM"],
  },
  {
    title: "AI-Powered Operations Management",
    description: "Implement smart scheduling, predictive inventory, and automated reporting across your operations.",
    duration: "35 min",
    type: "Walkthrough",
    difficulty: "Intermediate",
    topics: ["Smart scheduling configuration", "Inventory prediction", "Automated reporting", "Quality control AI"],
    content: [
      { heading: "Smart Scheduling", body: "AI scheduling considers: team availability, travel time between jobs, customer preferences, skill requirements, and job priority. It optimizes routes and assignments to complete 15-20% more jobs with the same team size." },
      { heading: "Predictive Inventory", body: "If you manage materials or products, AI forecasting analyzes historical usage, seasonal patterns, and your project pipeline to predict needs 30-90 days ahead. This eliminates emergency orders (which cost 15-30% more) and reduces overstock waste." },
      { heading: "Automated Reporting", body: "Instead of spending 8+ hours building monthly reports, set up AI to pull data from all your tools, identify trends, flag anomalies, and generate executive summaries automatically. You review for 30 minutes instead of building for 8 hours." },
      { heading: "Quality Control", body: "AI-powered checklists with photo verification catch issues before they become callbacks. Train the system on what 'good' looks like and it flags deviations automatically. Reduces rework by 30-50%." },
    ],
    actionItems: ["Document your scheduling process and pain points", "List your top 50 materials or products by spend", "Identify your 3 most time-consuming monthly reports"],
  },
  {
    title: "Data Preparation for AI Success",
    description: "How to organize, clean, and structure your business data so AI tools can deliver maximum results.",
    duration: "20 min read",
    type: "Guide",
    difficulty: "Beginner",
    topics: ["Data audit checklist", "Cleaning records", "Connecting sources", "Privacy best practices"],
    content: [
      { heading: "The Data Audit", body: "List every system that holds your business data: CRM, accounting software, email, spreadsheets, project management, customer database. For each, note: what data it holds, how current it is, and whether it has an API or export feature." },
      { heading: "Cleaning Your Data", body: "Start with your customer database. Remove duplicates, fix misspellings, standardize phone number and address formats. Then do the same for your product/service catalog. Clean data in = accurate AI out. Dirty data in = expensive garbage out." },
      { heading: "Connecting Systems", body: "Most AI tools need data from multiple sources. Use integration platforms like Zapier or Make.com to connect systems that do not talk to each other natively. The goal: data flows automatically between systems without manual re-entry." },
      { heading: "Privacy and Security", body: "Before feeding data to any AI tool, check: Is the data encrypted in transit? Does the vendor store your data? Can you delete your data if you stop using the tool? Never upload sensitive customer data to free AI tools with unclear privacy policies." },
    ],
    actionItems: ["List all systems that hold your business data", "Start cleaning your customer database (duplicates first)", "Check privacy policies of any AI tools you plan to use"],
  },
  {
    title: "Measuring AI ROI",
    description: "How to track and prove the value of your AI implementations using the ROI Tracking dashboard.",
    duration: "15 min read",
    type: "Guide",
    difficulty: "Beginner",
    topics: ["Setting up metrics", "Before/after comparison", "Building a business case", "Reporting to stakeholders"],
    content: [
      { heading: "Baseline Everything", body: "Before implementing any AI tool, measure: time spent on the task (hours/week), error rate (mistakes per month), cost (hourly rate x hours), and customer satisfaction (if applicable). Write these numbers down. They are your 'before' snapshot." },
      { heading: "Track Weekly for 90 Days", body: "After implementing, measure the same metrics weekly for 90 days. Most AI tools show significant improvement by week 3-4. By day 90, you should have enough data to calculate accurate annual projections." },
      { heading: "Use the Dashboard", body: "Your Groundwork ROI Tracking page is designed for exactly this. Enter your baseline metrics and actual results. It calculates savings, ROI, and time recovered automatically. Use it to track every implementation." },
      { heading: "Reporting to Stakeholders", body: "Lead with the number. 'We saved $2,400 last month on invoice processing' is more powerful than 'AI is working well.' Always include: dollars saved, hours recovered, error reduction, and projected annual impact." },
    ],
    actionItems: ["Document baseline metrics for your first Quick Win before starting", "Set a weekly 15-minute calendar reminder to update your tracking", "Share your first 30-day results with your team"],
  },
  {
    title: "Advanced: Building Custom AI Workflows",
    description: "For tech-comfortable teams ready to go beyond off-the-shelf tools. Build custom automations using APIs and integration platforms.",
    duration: "60 min",
    type: "Deep Dive",
    difficulty: "Advanced",
    topics: ["API basics", "Zapier and Make.com", "Custom GPT integrations", "Workflow design"],
    content: [
      { heading: "When to Go Custom", body: "Off-the-shelf tools cover 80% of use cases. Go custom when: you need tools to talk to each other in ways they don't natively support, you have a unique workflow no tool covers, or you want to build a competitive moat with proprietary AI." },
      { heading: "Zapier and Make.com", body: "These are no-code integration platforms. They connect 5,000+ tools with if-this-then-that logic. Example: 'When a new invoice arrives in Gmail, extract data with Docsumo, create a record in QuickBooks, and notify the team in Slack.' No coding required." },
      { heading: "Custom GPT Integrations", body: "Build custom AI assistants trained on your specific data. Upload your SOPs, pricing, product catalog, and FAQs. The AI becomes an expert on your business that can answer questions, draft documents, and assist your team 24/7." },
      { heading: "Workflow Design Principles", body: "Start with the end state: what does the perfect automated workflow look like? Map every step. Identify which steps are decisions (needs rules or AI) vs actions (needs integration). Build the simplest version first, then add complexity." },
    ],
    actionItems: ["Identify one workflow that requires multiple tools to talk to each other", "Sign up for Zapier or Make.com (both have free tiers)", "Map your ideal workflow on paper before building anything"],
  },
];

export default function TrainingPage() {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>("All");
  const [completedModules, setCompletedModules] = useState<Set<number>>(() => {
    if (typeof window === 'undefined') return new Set();
    try {
      const saved = localStorage.getItem('gw_training_completed');
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch { return new Set(); }
  });

  useEffect(() => {
    localStorage.setItem('gw_training_completed', JSON.stringify([...completedModules]));
  }, [completedModules]);

  const filtered = filter === "All" ? modules : modules.filter(m => m.difficulty === filter);
  const filters = ["All", "Beginner", "Intermediate", "Advanced"];

  const toggleComplete = (idx: number) => {
    setCompletedModules(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx); else next.add(idx);
      return next;
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Team Training Resources</h1>
        <p className="text-[var(--mid-gray)] text-sm mt-1">Guides and walkthroughs tailored to your team. Click any module to expand the full lesson.</p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5">
        <div className="flex items-center gap-3 mb-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>
          <h2 className="text-sm font-bold text-blue-900">Recommended Training Path</h2>
        </div>
        <p className="text-xs text-blue-800/60 leading-relaxed">Based on your team&apos;s tech comfort level (3 out of 5), start with Beginner modules then progress to Intermediate. The #1 reason AI implementations fail is poor team adoption. These resources prevent that.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-black/5 rounded-xl p-4 text-center">
          <div className="text-2xl font-extrabold">{modules.length}</div>
          <div className="text-[10px] text-[var(--mid-gray)]">Modules</div>
        </div>
        <div className="bg-white border border-black/5 rounded-xl p-4 text-center">
          <div className="text-2xl font-extrabold">4.5 hrs</div>
          <div className="text-[10px] text-[var(--mid-gray)]">Total Time</div>
        </div>
        <div className="bg-white border border-black/5 rounded-xl p-4 text-center">
          <div className="text-2xl font-extrabold text-green-600">{completedModules.size}</div>
          <div className="text-[10px] text-[var(--mid-gray)]">Completed</div>
        </div>
        <div className="bg-white border border-black/5 rounded-xl p-4 text-center">
          <div className="text-2xl font-extrabold">{Math.round((completedModules.size / modules.length) * 100)}%</div>
          <div className="text-[10px] text-[var(--mid-gray)]">Progress</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map(f => (
          <button key={f} onClick={() => { setFilter(f); setExpandedIdx(null); }} className={`text-xs font-medium px-4 py-2 rounded-lg transition-colors ${filter === f ? "bg-[var(--black)] text-white" : "bg-white border border-black/5 text-[var(--mid-gray)] hover:bg-[var(--light-surface)]"}`}>{f}</button>
        ))}
      </div>

      {/* Modules */}
      <div className="space-y-3">
        {filtered.map((mod) => {
          const globalIdx = modules.indexOf(mod);
          const isOpen = expandedIdx === globalIdx;
          const isComplete = completedModules.has(globalIdx);
          return (
            <div key={mod.title} className={`bg-white border rounded-2xl overflow-hidden transition-all ${isComplete ? "border-green-200" : "border-black/5"}`}>
              <button onClick={() => setExpandedIdx(isOpen ? null : globalIdx)} className="w-full p-5 flex items-center justify-between text-left hover:bg-black/[0.01] transition-colors">
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0 ${isComplete ? "bg-green-50 text-green-600" : "bg-[var(--light-surface)]"}`}>
                    {isComplete ? (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>
                    ) : globalIdx + 1}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold flex items-center gap-2 flex-wrap">
                      {mod.title}
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        mod.difficulty === "Beginner" ? "bg-green-50 text-green-700 border border-green-100" : mod.difficulty === "Intermediate" ? "bg-blue-50 text-blue-700 border border-blue-100" : "bg-purple-50 text-purple-700 border border-purple-100"
                      }`}>{mod.difficulty}</span>
                    </div>
                    <div className="text-xs text-[var(--mid-gray)] mt-0.5">{mod.type} · {mod.duration}</div>
                  </div>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`text-[var(--mid-gray)] transition-transform shrink-0 ${isOpen ? "rotate-180" : ""}`}><polyline points="6,9 12,15 18,9"/></svg>
              </button>

              {isOpen && (
                <div className="border-t border-black/5 p-5 space-y-5">
                  <p className="text-sm text-[var(--mid-gray)] leading-relaxed">{mod.description}</p>

                  {/* Lesson Content */}
                  <div className="space-y-4">
                    {mod.content.map((section, si) => (
                      <div key={si} className="p-4 bg-[var(--light-surface)] rounded-xl border border-black/5">
                        <h4 className="text-xs font-bold mb-2">{section.heading}</h4>
                        <p className="text-xs text-[var(--mid-gray)] leading-relaxed">{section.body}</p>
                      </div>
                    ))}
                  </div>

                  {/* Topics */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--mid-gray)]/60 mb-2">Topics Covered</h4>
                    <div className="flex flex-wrap gap-1.5">
                      {mod.topics.map(t => (
                        <span key={t} className="text-[10px] bg-[var(--light-surface)] border border-black/5 px-2.5 py-1 rounded-lg font-medium">{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Action Items */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--mid-gray)]/60 mb-2 flex items-center gap-2">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10"/></svg>
                      Action Items
                    </h4>
                    <div className="space-y-1.5">
                      {mod.actionItems.map((a, i) => (
                        <div key={i} className="flex items-start gap-2 p-2.5 bg-amber-50 rounded-lg border border-amber-100">
                          <div className="w-4 h-4 border-2 border-amber-300 rounded mt-0.5 shrink-0" />
                          <span className="text-[11px] text-amber-900">{a}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Mark Complete */}
                  <button
                    onClick={() => toggleComplete(globalIdx)}
                    className={`w-full py-3 rounded-xl text-xs font-semibold transition-colors ${
                      isComplete ? "bg-green-50 text-green-700 border border-green-100" : "bg-[var(--black)] text-white hover:bg-[var(--dark-surface)]"
                    }`}
                  >
                    {isComplete ? "Completed" : "Mark as Complete"}
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Hands-On CTA */}
      <div className="bg-[var(--black)] text-white rounded-2xl p-6 text-center">
        <h3 className="text-lg font-bold mb-2">Need live training for your team?</h3>
        <p className="text-white/50 text-sm mb-4">Upgrade to the Hands-On plan for personalized training sessions, team workshops, and 1-on-1 implementation support.</p>
        <button className="bg-white text-[var(--black)] text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-white/90 transition-colors">Learn About Hands-On</button>
      </div>
    </div>
  );
}
