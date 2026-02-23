"use client";

const modules = [
  {
    title: "AI Fundamentals for Your Team",
    description: "A non-technical overview of what AI is, how it works, and why it matters for your business. Designed for teams with basic to intermediate tech skills.",
    duration: "30 min read",
    type: "Guide",
    difficulty: "Beginner",
    topics: ["What AI actually is (no jargon)", "How AI tools learn and improve", "Common fears and misconceptions", "Real examples from your industry"],
  },
  {
    title: "Getting Started with Your First AI Tool",
    description: "Step-by-step walkthrough for setting up and using your first recommended AI tool. Based on your Quick Wins list.",
    duration: "45 min",
    type: "Walkthrough",
    difficulty: "Beginner",
    topics: ["Account setup and configuration", "Connecting to existing tools", "Running your first automation", "Measuring initial results"],
  },
  {
    title: "AI for Customer Communication",
    description: "How to deploy AI chatbots and automated responses without losing the personal touch your customers expect.",
    duration: "25 min read",
    type: "Guide",
    difficulty: "Intermediate",
    topics: ["Setting up AI chat support", "Writing effective AI prompts", "When AI should hand off to humans", "Maintaining your brand voice"],
  },
  {
    title: "Automating Your Sales Pipeline",
    description: "Deploy AI lead scoring, automated follow-ups, and proposal generation to close more deals faster.",
    duration: "40 min",
    type: "Walkthrough",
    difficulty: "Intermediate",
    topics: ["AI lead scoring setup", "Automated email sequences", "Proposal generation with AI", "Pipeline analytics and insights"],
  },
  {
    title: "AI-Powered Operations Management",
    description: "Implement smart scheduling, predictive inventory, and automated reporting across your operations.",
    duration: "35 min",
    type: "Walkthrough",
    difficulty: "Intermediate",
    topics: ["Smart scheduling configuration", "Inventory prediction setup", "Automated report generation", "Quality control AI tools"],
  },
  {
    title: "Data Preparation for AI Success",
    description: "How to organize, clean, and structure your business data so AI tools can deliver maximum results.",
    duration: "20 min read",
    type: "Guide",
    difficulty: "Beginner",
    topics: ["Data audit checklist", "Cleaning and organizing records", "Connecting data sources", "Data privacy best practices"],
  },
  {
    title: "Measuring AI ROI",
    description: "How to track and prove the value of your AI implementations using the ROI Tracking dashboard.",
    duration: "15 min read",
    type: "Guide",
    difficulty: "Beginner",
    topics: ["Setting up tracking metrics", "Before and after comparisons", "Building a business case", "Reporting to stakeholders"],
  },
  {
    title: "Advanced: Building Custom AI Workflows",
    description: "For tech-comfortable teams ready to go beyond off-the-shelf tools. Build custom automations using APIs and integration platforms.",
    duration: "60 min",
    type: "Deep Dive",
    difficulty: "Advanced",
    topics: ["API basics for non-developers", "Zapier and Make.com automations", "Custom ChatGPT integrations", "Building AI workflows from scratch"],
  },
];

export default function TrainingPage() {
  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Team Training Resources</h1>
        <p className="text-[var(--mid-gray)] text-sm mt-1">Guides and walkthroughs tailored to your team's tech comfort level (rated 3/5 in your questionnaire).</p>
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round"><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>
          <h2 className="text-sm font-bold text-blue-900">Training Path Recommended for Your Team</h2>
        </div>
        <p className="text-xs text-blue-800/60 leading-relaxed">Based on your team's tech comfort level (3 out of 5), we recommend starting with the Beginner modules and progressing to Intermediate as your team gains confidence. The #1 reason AI implementations fail is poor team adoption. These resources prevent that.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white border border-black/5 rounded-xl p-5 text-center">
          <div className="text-3xl font-extrabold mb-1">8</div>
          <div className="text-xs text-[var(--mid-gray)]">Training modules</div>
        </div>
        <div className="bg-white border border-black/5 rounded-xl p-5 text-center">
          <div className="text-3xl font-extrabold mb-1">4.5 hrs</div>
          <div className="text-xs text-[var(--mid-gray)]">Total training time</div>
        </div>
        <div className="bg-white border border-black/5 rounded-xl p-5 text-center">
          <div className="text-3xl font-extrabold mb-1">3</div>
          <div className="text-xs text-[var(--mid-gray)]">Difficulty levels</div>
        </div>
      </div>

      <div className="space-y-4">
        {modules.map((mod, i) => (
          <div key={mod.title} className="bg-white border border-black/5 rounded-xl p-5 hover:border-black/10 hover:shadow-lg transition-all duration-300">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[var(--light-surface)] rounded-xl flex items-center justify-center text-sm font-bold shrink-0">{i + 1}</div>
                <div>
                  <div className="text-sm font-bold mb-1">{mod.title}</div>
                  <p className="text-xs text-[var(--mid-gray)] leading-relaxed">{mod.description}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 ml-14">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                  mod.difficulty === "Beginner" ? "bg-green-50 text-green-700" : mod.difficulty === "Intermediate" ? "bg-blue-50 text-blue-700" : "bg-purple-50 text-purple-700"
                }`}>{mod.difficulty}</span>
                <span className="text-[10px] bg-[var(--light-surface)] px-2 py-0.5 rounded font-medium text-[var(--mid-gray)]">{mod.type}</span>
                <span className="text-[10px] text-[var(--mid-gray)]">{mod.duration}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5 mt-3 ml-14">
              {mod.topics.map((t) => (<span key={t} className="text-[10px] bg-[var(--light-surface)] px-2 py-0.5 rounded font-medium">{t}</span>))}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[var(--black)] text-white rounded-2xl p-6 text-center">
        <h3 className="text-lg font-bold mb-2">Need live training for your team?</h3>
        <p className="text-white/50 text-sm mb-4">Upgrade to the Hands-On plan for personalized training sessions, team workshops, and 1-on-1 implementation support.</p>
        <button className="bg-white text-[var(--black)] text-sm font-semibold px-6 py-2.5 rounded-full hover:bg-white/90 transition-colors">Learn About Hands-On →</button>
      </div>
    </div>
  );
}
