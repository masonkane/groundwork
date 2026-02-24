"use client";

import { useState, useEffect } from "react";

type Playbook = {
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  status: "Available" | "Coming Soon";
  timeline: string;
  savings: string;
  savingsNum: number;
  setupCost: string;
  description: string;
  prerequisites: string[];
  steps: { title: string; detail: string }[];
  tools: { name: string; price: string }[];
  weekByWeek: { week: string; task: string }[];
  successMetrics: string[];
  pitfalls: string[];
};

const playbooks: Playbook[] = [
  {
    title: "AI Lead Follow-Up System",
    difficulty: "Easy",
    status: "Available",
    timeline: "2-3 weeks",
    savings: "$37,200/yr",
    savingsNum: 37200,
    setupCost: "$45-79/mo for tools",
    description: "Deploy AI email and text sequences that respond to inbound leads within 2 minutes. Personalized based on lead source, industry, and behavior signals. Most businesses see 35-50% higher conversion within the first month.",
    prerequisites: [
      "List of all current lead sources (website forms, phone, referrals, ads)",
      "Access to your email service provider or CRM",
      "5-10 examples of your best sales emails for voice training",
      "Your typical follow-up timeline documented",
    ],
    steps: [
      { title: "Audit your current lead response time", detail: "Track how long it takes to respond to every new inquiry over one week. Most businesses average 4+ hours. Document this as your baseline." },
      { title: "Choose your automation platform", detail: "HubSpot (free CRM + $45/mo marketing) or ActiveCampaign ($29/mo) are the top picks. Both have AI sequence builders. Choose based on whether you need a full CRM or just email." },
      { title: "Map your lead types and create segments", detail: "Create 3-5 segments based on lead source and intent level. A website quote request is different from a social media inquiry. Each gets a different sequence." },
      { title: "Build your instant-response templates", detail: "Write 5 response templates that AI will personalize. Include: acknowledgment, next steps, value proposition, social proof, and a clear CTA. Keep them conversational, not corporate." },
      { title: "Create 7-day nurture sequences", detail: "Day 1: Instant response + value. Day 2: Case study. Day 3: Quick tip. Day 5: Soft check-in. Day 7: Last chance + urgency. AI personalizes each based on engagement." },
      { title: "Set up hot lead alerts", detail: "Configure instant SMS/push notifications when a lead opens emails 3+ times, clicks pricing, or replies. These are your hottest prospects and need immediate human follow-up." },
      { title: "A/B test for 2 weeks", detail: "Run two versions of your subject lines and opening paragraphs. Let the AI optimize based on open rates and reply rates. Most platforms auto-select winners after statistical significance." },
      { title: "Scale winning sequences across all channels", detail: "Once you have a winning formula, replicate it across all lead sources. Add SMS follow-up for high-intent leads. Connect to your ads for retargeting." },
    ],
    tools: [
      { name: "HubSpot AI", price: "$45/mo" },
      { name: "ActiveCampaign", price: "$29/mo" },
      { name: "Apollo.io", price: "$39/mo" },
      { name: "Instantly.ai", price: "$30/mo" },
    ],
    weekByWeek: [
      { week: "Week 1", task: "Audit current process, choose platform, set up account, import contacts" },
      { week: "Week 2", task: "Build templates, create sequences, configure triggers and alerts" },
      { week: "Week 3", task: "Launch A/B tests, monitor results, optimize based on data" },
    ],
    successMetrics: [
      "Lead response time drops below 5 minutes (from 4+ hours)",
      "Email open rate above 40% (industry avg is 21%)",
      "Reply rate above 8% on cold sequences",
      "30% increase in lead-to-meeting conversion within 60 days",
    ],
    pitfalls: [
      "Sending too many emails too fast (space them out, respect opt-outs)",
      "Generic templates that sound robotic (use your actual voice and personality)",
      "Not setting up human handoff triggers (AI qualifies, humans close)",
      "Ignoring analytics after setup (review weekly for the first month)",
    ],
  },
  {
    title: "Invoice Processing Automation",
    difficulty: "Easy",
    status: "Available",
    timeline: "2-4 weeks",
    savings: "$28,800/yr",
    savingsNum: 28800,
    setupCost: "$29-49/mo for tools",
    description: "Replace manual invoice entry with AI-powered OCR that extracts line items, validates against purchase orders, and auto-routes for approval. Processes 500+ invoices/month with 98% accuracy, freeing up 15-20 hours of admin time weekly.",
    prerequisites: [
      "Access to your accounting software (QuickBooks, Xero, etc.)",
      "50 sample invoices from the last 3 months for AI training",
      "Your current approval workflow documented (who approves what amounts)",
      "List of your top 20 vendors by invoice volume",
    ],
    steps: [
      { title: "Document your current invoice workflow", detail: "Map every step: how invoices arrive (email, mail, portal), who enters data, who approves, what gets checked. Time each step. This is your baseline." },
      { title: "Select your AI processing tool", detail: "Docsumo ($29/mo) for simple invoice processing. Rossum ($49/mo) for complex multi-page invoices. Both integrate with QuickBooks and Xero." },
      { title: "Upload training invoices", detail: "Upload 50 sample invoices. The AI learns your vendor formats, line item patterns, and coding structure. Accuracy improves with each batch." },
      { title: "Configure approval routing rules", detail: "Set rules: invoices under $500 auto-approve, $500-$5000 route to manager, $5000+ route to owner. Match your existing approval authority." },
      { title: "Run parallel processing for 2 weeks", detail: "Process invoices through both the old manual method and the new AI system simultaneously. Compare results to validate accuracy before going fully automated." },
      { title: "Switch to full automation", detail: "Once accuracy exceeds 95% in parallel testing, switch to AI-primary processing. Keep manual review for flagged exceptions only." },
    ],
    tools: [
      { name: "Docsumo", price: "$29/mo" },
      { name: "Rossum", price: "$49/mo" },
      { name: "Stampli", price: "$45/mo" },
    ],
    weekByWeek: [
      { week: "Week 1", task: "Document workflow, select tool, upload training data" },
      { week: "Week 2", task: "Configure rules, test with sample invoices, refine accuracy" },
      { week: "Week 3-4", task: "Parallel processing validation, switch to full automation" },
    ],
    successMetrics: [
      "Invoice processing time drops from 15 min to under 2 min per invoice",
      "Data entry errors reduced by 90%+",
      "15-20 hours/week of admin time recovered",
      "Approval cycle time cut in half",
    ],
    pitfalls: [
      "Skipping the parallel testing phase (always validate before going full auto)",
      "Not training on enough diverse invoice formats",
      "Forgetting to set up exception handling for edge cases",
      "Not measuring baseline metrics before starting (you need the comparison)",
    ],
  },
  {
    title: "Smart Scheduling Deployment",
    difficulty: "Easy",
    status: "Available",
    timeline: "2-3 weeks",
    savings: "$21,600/yr",
    savingsNum: 21600,
    setupCost: "$12-89/mo for tools",
    description: "AI scheduling that eliminates back-and-forth emails, auto-considers team availability, client preferences, and travel time. Reduces scheduling overhead by 80% and booking friction by 90%.",
    prerequisites: [
      "Team member list with roles and availability patterns",
      "Access to your current calendar system (Google, Outlook, etc.)",
      "List of your appointment/service types with durations",
      "Your service area or office locations",
    ],
    steps: [
      { title: "Catalog all meeting and appointment types", detail: "List every type of appointment you book: consultations, service calls, follow-ups, internal meetings. Note average duration, required staff, and any preparation time needed." },
      { title: "Choose your scheduling platform", detail: "Calendly ($12/mo) for simple booking. Motion ($19/mo) for AI task scheduling. ServiceTitan ($89/mo) for field service with dispatch optimization." },
      { title: "Set availability rules and buffer times", detail: "Configure working hours, lunch breaks, travel buffers between appointments, and blackout dates. Set maximum appointments per day to prevent burnout." },
      { title: "Integrate with your existing calendar", detail: "Sync with Google Calendar or Outlook so the AI sees real-time availability. Enable two-way sync so manual bookings are reflected too." },
      { title: "Add booking links everywhere", detail: "Website, email signature, text message templates, social media bios, Google Business Profile. Every customer touchpoint should have a booking option." },
      { title: "Train your team (30-minute session)", detail: "Walk the team through how bookings appear, how to block time, and how to handle reschedules. Keep it simple. Most tools take 10 minutes to learn." },
    ],
    tools: [
      { name: "Calendly", price: "$12/mo" },
      { name: "Motion", price: "$19/mo" },
      { name: "Reclaim.ai", price: "$10/mo" },
      { name: "ServiceTitan", price: "$89/mo" },
    ],
    weekByWeek: [
      { week: "Week 1", task: "Audit appointment types, select tool, configure settings" },
      { week: "Week 2", task: "Integrate calendars, deploy booking links, train team" },
      { week: "Week 3", task: "Monitor adoption, adjust rules, optimize based on feedback" },
    ],
    successMetrics: [
      "Scheduling emails/calls reduced by 80%+",
      "Zero double-bookings or scheduling conflicts",
      "Average time-to-book drops from 2 days to under 5 minutes",
      "Team satisfaction with scheduling process improves",
    ],
    pitfalls: [
      "Not setting adequate buffer time between appointments",
      "Forgetting to sync all team calendars (partial visibility causes conflicts)",
      "Making the booking page too complicated with too many options",
      "Not promoting the booking link enough (it only works if people use it)",
    ],
  },
  {
    title: "Customer Communication Hub",
    difficulty: "Medium",
    status: "Available",
    timeline: "3-5 weeks",
    savings: "$24,000/yr",
    savingsNum: 24000,
    setupCost: "$74-150/mo for tools",
    description: "Centralize all customer communication with an AI chatbot trained on your specific products, pricing, and policies. Handles 60-70% of inquiries automatically, 24/7. Escalates complex issues to humans with full conversation context.",
    prerequisites: [
      "Export of your last 6 months of support tickets or common questions",
      "Your FAQ, pricing info, and service descriptions documented",
      "List of scenarios that must go to a human (complaints, billing disputes, etc.)",
      "Your website login or CMS access for widget installation",
    ],
    steps: [
      { title: "Export and categorize your support history", detail: "Pull the last 6 months of customer inquiries. Categorize them: pricing questions, scheduling, status updates, complaints, general info. Identify the top 20 questions by volume." },
      { title: "Build your AI knowledge base", detail: "Upload your FAQ, service descriptions, pricing, policies, and any training docs. The AI learns from these to answer questions accurately. More detail = better answers." },
      { title: "Configure your chatbot personality", detail: "Set the tone (professional but friendly), response length preferences, and your business name. Add custom greetings for different pages (pricing page vs. support page)." },
      { title: "Set up human handoff rules", detail: "Define triggers for escalation: negative sentiment detected, billing questions over $500, explicit request for human, 2+ failed attempts to answer. Include full conversation context in the handoff." },
      { title: "Install the chat widget", detail: "Add the widget to your website (usually one line of code). Configure appearance to match your brand. Set business hours visibility or 24/7 mode." },
      { title: "Monitor and train for 2 weeks", detail: "Review every AI conversation for the first 2 weeks. Flag wrong answers and update the knowledge base. Accuracy improves rapidly with feedback." },
      { title: "Expand to email and SMS", detail: "Once chat is performing well, extend the AI to handle email replies and SMS inquiries using the same knowledge base. Unified communication across all channels." },
    ],
    tools: [
      { name: "Intercom Fin", price: "$74/mo" },
      { name: "Zendesk AI", price: "$89/mo" },
      { name: "Drift", price: "$150/mo" },
    ],
    weekByWeek: [
      { week: "Week 1", task: "Export support data, categorize questions, start knowledge base" },
      { week: "Week 2", task: "Build knowledge base, configure chatbot, set escalation rules" },
      { week: "Week 3", task: "Install widget, begin soft launch with monitoring" },
      { week: "Week 4-5", task: "Review conversations, refine answers, expand channels" },
    ],
    successMetrics: [
      "60%+ of inquiries resolved without human intervention",
      "Average response time drops to under 30 seconds (from hours)",
      "Customer satisfaction score maintains or improves",
      "Support team workload reduced by 50%+ for routine questions",
    ],
    pitfalls: [
      "Launching without enough training data (garbage in, garbage out)",
      "Not setting up human handoff (customers get frustrated with loops)",
      "Making the chatbot too aggressive with upsells",
      "Ignoring the review process in the first 2 weeks (critical for accuracy)",
    ],
  },
  {
    title: "AI Proposal Generator",
    difficulty: "Medium",
    status: "Available",
    timeline: "4-6 weeks",
    savings: "$18,000/yr",
    savingsNum: 18000,
    setupCost: "$49-79/mo for tools",
    description: "Generate professional proposals in 10 minutes instead of 3+ hours. AI pulls from your pricing database, customizes language based on the prospect, and creates polished documents that close deals faster.",
    prerequisites: [
      "Your current proposal template(s) in digital format",
      "Pricing sheet or rate card for all services",
      "10-15 examples of winning proposals from the past year",
      "Brand assets (logo, colors, fonts) for template design",
    ],
    steps: [
      { title: "Audit your current proposal process", detail: "Track how long each proposal takes from request to delivery. Note bottlenecks: pricing lookups, custom writing, approval delays, formatting. Calculate your cost per proposal." },
      { title: "Select your proposal platform", detail: "PandaDoc ($49/mo) for document automation with e-signatures. Proposify ($79/mo) for design-heavy proposals with analytics. Both have AI content features." },
      { title: "Build your content library", detail: "Upload your service descriptions, case studies, testimonials, and pricing. Create modular content blocks the AI can mix and match based on the prospect's needs." },
      { title: "Create template structures", detail: "Build 3-5 proposal templates for your most common service types. Include dynamic fields for pricing, scope, timelines, and custom sections." },
      { title: "Train AI on your winning proposals", detail: "Feed in your best proposals so the AI learns your language, structure, and persuasion patterns. It will generate first drafts that sound like you, not a robot." },
      { title: "Build approval workflow", detail: "Set up review triggers: proposals over a certain value get manager review, standard proposals auto-send after creator approval. Track who is bottlenecking." },
      { title: "Launch and measure close rates", detail: "Track close rates, time-to-send, and deal velocity before and after. Most businesses see proposal turnaround drop from days to hours." },
    ],
    tools: [
      { name: "PandaDoc", price: "$49/mo" },
      { name: "Proposify", price: "$79/mo" },
      { name: "Qwilr", price: "$35/mo" },
    ],
    weekByWeek: [
      { week: "Week 1-2", task: "Audit process, select tool, upload content library" },
      { week: "Week 3-4", task: "Build templates, train AI, configure workflows" },
      { week: "Week 5-6", task: "Test with real proposals, refine, go live" },
    ],
    successMetrics: [
      "Proposal creation time drops from 3+ hours to under 30 minutes",
      "Proposal turnaround goes from days to same-day",
      "Close rate improves by 15-25% with faster, more professional proposals",
      "Team sends 2-3x more proposals per week",
    ],
    pitfalls: [
      "Over-automating and losing the personal touch (always customize the intro)",
      "Not updating pricing blocks when rates change",
      "Skipping the AI training step (generic output kills close rates)",
      "Not tracking analytics (PandaDoc shows exactly when prospects read each section)",
    ],
  },
  {
    title: "AI Bookkeeping Assistant",
    difficulty: "Easy",
    status: "Available",
    timeline: "2-3 weeks",
    savings: "$14,400/yr",
    savingsNum: 14400,
    setupCost: "$30-50/mo for tools",
    description: "Automate transaction categorization, receipt matching, and bank reconciliation. Reduces bookkeeping time by 80% and catches categorization errors that humans miss. Your books stay clean in real-time instead of once a month.",
    prerequisites: [
      "Access to your accounting software (QuickBooks, Xero, FreshBooks)",
      "Bank and credit card accounts connected to your accounting software",
      "Your chart of accounts reviewed and up to date",
      "Any recurring transactions documented",
    ],
    steps: [
      { title: "Clean up your chart of accounts", detail: "Before AI takes over, make sure your categories make sense. Merge duplicates, archive unused accounts, and ensure your top 20 expense categories are clear and consistent." },
      { title: "Enable AI categorization", detail: "QuickBooks and Xero both have built-in AI categorization. Turn it on and let it learn from your past 12 months of transactions. It gets smarter with every correction." },
      { title: "Set up receipt capture", detail: "Use the mobile app to snap receipts, or set up email forwarding for digital receipts. AI matches receipts to transactions automatically." },
      { title: "Configure rules for recurring transactions", detail: "Set up auto-categorization rules for your regular vendors: rent, utilities, subscriptions, payroll. These should never need manual review." },
      { title: "Enable bank reconciliation automation", detail: "Turn on auto-matching for bank feeds. AI matches deposits to invoices and payments to bills. Review exceptions only." },
      { title: "Set up monthly review workflow", detail: "Schedule a 30-minute monthly review instead of 8+ hours. AI flags anomalies, uncategorized items, and potential errors for your attention." },
    ],
    tools: [
      { name: "QuickBooks AI", price: "$30/mo" },
      { name: "Bench", price: "$50/mo" },
      { name: "Pilot", price: "$50/mo" },
    ],
    weekByWeek: [
      { week: "Week 1", task: "Clean chart of accounts, enable AI features, import history" },
      { week: "Week 2", task: "Set up receipt capture, configure rules, test reconciliation" },
      { week: "Week 3", task: "Run first full automated month, review and refine" },
    ],
    successMetrics: [
      "Monthly bookkeeping time drops from 8+ hours to under 1 hour",
      "Transaction categorization accuracy above 95%",
      "Receipts matched automatically within 24 hours",
      "Monthly close completed by the 3rd of each month",
    ],
    pitfalls: [
      "Not cleaning up your chart of accounts first (AI learns bad habits)",
      "Ignoring the AI's suggestions early on (corrections train it faster)",
      "Forgetting to set up receipt capture (missing receipts = audit risk)",
      "Skipping the monthly review entirely (AI is great but not perfect)",
    ],
  },
  {
    title: "Predictive Inventory System",
    difficulty: "Medium",
    status: "Coming Soon",
    timeline: "6-8 weeks",
    savings: "$14,400/yr",
    savingsNum: 14400,
    setupCost: "$79-149/mo for tools",
    description: "AI analyzes your historical usage patterns, seasonal trends, and upcoming project schedules to predict material needs before you run out. Eliminates emergency orders (which cost 15-30% more) and reduces overstock waste.",
    prerequisites: [
      "12+ months of purchase order and inventory data",
      "Current inventory levels and reorder points documented",
      "Upcoming project schedule for the next 3-6 months",
      "Your top 50 materials by spend volume identified",
    ],
    steps: [
      { title: "Export your purchase and usage history", detail: "Pull 12-24 months of material purchase data including quantities, dates, vendors, and prices. The more history, the better the AI predictions." },
      { title: "Map materials to projects", detail: "Connect material usage to specific project types. This lets the AI predict needs based on your project pipeline, not just historical averages." },
      { title: "Select your forecasting tool", detail: "Fishbowl AI ($79/mo) for standalone inventory. inFlow ($149/mo) for manufacturing. Both offer demand forecasting and automated reorder triggers." },
      { title: "Set up demand forecasting models", detail: "Configure the AI with your lead times, minimum order quantities, and seasonal patterns. It builds a predictive model specific to your business." },
      { title: "Create automated reorder triggers", detail: "When predicted inventory drops below your safety stock level, the system auto-generates a PO draft for your review. No more emergency runs." },
      { title: "Integrate with your project management system", detail: "Connect to your project scheduler so the AI can see upcoming jobs and pre-order materials before you even think about it." },
    ],
    tools: [
      { name: "Fishbowl AI", price: "$79/mo" },
      { name: "inFlow", price: "$149/mo" },
      { name: "Sortly Pro", price: "$49/mo" },
    ],
    weekByWeek: [
      { week: "Week 1-2", task: "Data export, cleanup, and tool selection" },
      { week: "Week 3-4", task: "Configure forecasting models, set parameters" },
      { week: "Week 5-6", task: "Test predictions against actual usage" },
      { week: "Week 7-8", task: "Enable automated reorders, integrate with projects" },
    ],
    successMetrics: [
      "Emergency orders reduced by 70%+",
      "Overstock waste reduced by 40%+",
      "Material costs decrease 10-15% through better planning",
      "Zero project delays due to material shortages",
    ],
    pitfalls: [
      "Not enough historical data (need at least 12 months for reliable predictions)",
      "Ignoring seasonal patterns in the setup",
      "Setting reorder points too tight (always build in a safety buffer)",
      "Not updating the model when you add new service types or materials",
    ],
  },
  {
    title: "Quality Control AI",
    difficulty: "Hard",
    status: "Coming Soon",
    timeline: "8-12 weeks",
    savings: "$12,000/yr",
    savingsNum: 12000,
    setupCost: "$149-299/mo for tools",
    description: "Use image recognition and AI-powered checklists to automate quality inspections. AI analyzes photos of completed work against standards, flags issues before they become costly rework, and generates compliance documentation automatically.",
    prerequisites: [
      "Photo documentation process already in place (even basic phone photos)",
      "Written quality standards or inspection checklists for each service type",
      "200+ photos of completed work (good and bad examples) for AI training",
      "Compliance requirements documented for your industry",
    ],
    steps: [
      { title: "Document your quality standards visually", detail: "Take reference photos of what 'good' looks like for every major service type. Also document common defects. This becomes your AI training data." },
      { title: "Choose your QC platform", detail: "ComplianceQuest ($149/mo) for regulated industries. Custom AI solution ($299/mo setup) for specialized trade-specific inspection. Both require initial training period." },
      { title: "Build digital inspection checklists", detail: "Convert your paper checklists to digital with photo capture points. Each checkpoint should have pass/fail criteria the AI can evaluate." },
      { title: "Train the image recognition model", detail: "Upload your reference photos (good and bad). Label defects, acceptable variations, and critical failures. The AI needs 200+ examples per category." },
      { title: "Pilot on one project type", detail: "Start with your most common service type. Run AI inspections alongside human inspections for 4 weeks to validate accuracy." },
      { title: "Scale to all service types", detail: "Once validated, expand to all project types. Continue feeding the AI new examples to improve accuracy over time." },
    ],
    tools: [
      { name: "ComplianceQuest", price: "$149/mo" },
      { name: "Custom AI Build", price: "$299/mo" },
      { name: "FotoIn", price: "$99/mo" },
    ],
    weekByWeek: [
      { week: "Week 1-3", task: "Document standards, collect training photos, select tool" },
      { week: "Week 4-6", task: "Build checklists, train AI model" },
      { week: "Week 7-9", task: "Pilot testing alongside human inspections" },
      { week: "Week 10-12", task: "Validate, refine, expand to more service types" },
    ],
    successMetrics: [
      "Rework incidents reduced by 50%+",
      "Inspection time reduced by 60%",
      "Compliance documentation generated automatically",
      "Customer callbacks for quality issues drop significantly",
    ],
    pitfalls: [
      "Not enough training photos (200+ per category minimum)",
      "Skipping the human validation phase (never trust AI alone on quality early on)",
      "Using low-quality photos (good lighting and consistent angles matter)",
      "Not updating the model as your standards or services evolve",
    ],
  },
];

export default function PlaybooksPage() {
  const [filter, setFilter] = useState<string>("All");
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);
  const [playbookStatus, setPlaybookStatus] = useState<Record<string, "not_started" | "in_progress" | "completed">>({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem("gw_playbook_status");
      if (saved) setPlaybookStatus(JSON.parse(saved));
    } catch {}
  }, []);

  function updatePlaybookStatus(title: string, status: "not_started" | "in_progress" | "completed") {
    const updated = { ...playbookStatus, [title]: status };
    setPlaybookStatus(updated);
    localStorage.setItem("gw_playbook_status", JSON.stringify(updated));
  }

  const filtered = playbooks.filter((pb) => {
    if (filter === "All") return true;
    if (filter === "Available" || filter === "Coming Soon") return pb.status === filter;
    return pb.difficulty === filter;
  });

  const totalSavings = playbooks.reduce((s, p) => s + p.savingsNum, 0);
  const availableCount = playbooks.filter((p) => p.status === "Available").length;

  const filters = ["All", "Easy", "Medium", "Hard", "Available", "Coming Soon"];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-extrabold tracking-tight">Implementation Playbooks</h1>
        <p className="text-[var(--mid-gray)] text-sm mt-1">Step-by-step implementation guides written for your business. Follow the playbook, get the results.</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white border border-black/5 rounded-xl p-4 text-center">
          <div className="text-2xl font-extrabold">{playbooks.length}</div>
          <div className="text-[10px] text-[var(--mid-gray)]">Total Playbooks</div>
        </div>
        <div className="bg-white border border-black/5 rounded-xl p-4 text-center">
          <div className="text-2xl font-extrabold text-green-600">${(totalSavings / 1000).toFixed(1)}K/yr</div>
          <div className="text-[10px] text-[var(--mid-gray)]">Combined Savings</div>
        </div>
        <div className="bg-white border border-black/5 rounded-xl p-4 text-center">
          <div className="text-2xl font-extrabold">3-4 wks</div>
          <div className="text-[10px] text-[var(--mid-gray)]">Avg. Implementation</div>
        </div>
        <div className="bg-white border border-black/5 rounded-xl p-4 text-center">
          <div className="text-2xl font-extrabold">{availableCount}</div>
          <div className="text-[10px] text-[var(--mid-gray)]">Ready Now</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => { setFilter(f); setExpandedIdx(null); }}
            className={`text-xs font-medium px-4 py-2 rounded-lg transition-colors ${
              filter === f ? "bg-[var(--black)] text-white" : "bg-white border border-black/5 text-[var(--mid-gray)] hover:bg-[var(--light-surface)]"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Playbooks */}
      <div className="space-y-4">
        {filtered.map((pb, idx) => {
          const globalIdx = playbooks.indexOf(pb);
          const isOpen = expandedIdx === globalIdx;
          return (
            <div key={pb.title} className="bg-white border border-black/5 rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpandedIdx(isOpen ? null : globalIdx)}
                className="w-full p-5 md:p-6 flex items-center justify-between text-left hover:bg-black/[0.01] transition-colors"
              >
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  <div className="w-10 h-10 bg-[var(--light-surface)] rounded-xl flex items-center justify-center text-sm font-extrabold shrink-0">{idx + 1}</div>
                  <div className="min-w-0">
                    <div className="text-sm font-bold flex items-center gap-2 flex-wrap">
                      {pb.title}
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                        pb.difficulty === "Easy" ? "bg-green-50 text-green-700 border border-green-100" : pb.difficulty === "Medium" ? "bg-amber-50 text-amber-700 border border-amber-100" : "bg-red-50 text-red-600 border border-red-100"
                      }`}>{pb.difficulty}</span>
                      {pb.status === "Coming Soon" && <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">Coming Soon</span>}
                      {playbookStatus[pb.title] === "in_progress" && <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">In Progress</span>}
                      {playbookStatus[pb.title] === "completed" && <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-100">Completed</span>}
                    </div>
                    <div className="text-xs text-[var(--mid-gray)] mt-0.5">{pb.timeline} · {pb.setupCost}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  <span className="text-sm font-extrabold text-green-600">{pb.savings}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className={`text-[var(--mid-gray)] transition-transform ${isOpen ? "rotate-180" : ""}`}><polyline points="6,9 12,15 18,9"/></svg>
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-black/5 p-5 md:p-6 space-y-6">
                  {/* Description */}
                  <p className="text-sm text-[var(--mid-gray)] leading-relaxed">{pb.description}</p>

                  {/* Prerequisites */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--mid-gray)]/60 mb-3 flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
                      Prerequisites
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {pb.prerequisites.map((p, i) => (
                        <div key={i} className="flex items-start gap-2 p-3 bg-[var(--light-surface)] rounded-lg">
                          <div className="w-4 h-4 border-2 border-black/10 rounded mt-0.5 shrink-0" />
                          <span className="text-xs">{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Steps */}
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--mid-gray)]/60 mb-3 flex items-center gap-2">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
                      Step-by-Step Implementation
                    </h4>
                    <div className="space-y-3">
                      {pb.steps.map((step, si) => (
                        <div key={si} className="flex items-start gap-3">
                          <div className="w-7 h-7 bg-[var(--black)] text-white rounded-lg flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">{si + 1}</div>
                          <div className="flex-1">
                            <div className="text-sm font-semibold">{step.title}</div>
                            <p className="text-xs text-[var(--mid-gray)] leading-relaxed mt-1">{step.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Tools + Timeline side by side */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--mid-gray)]/60 mb-3">Recommended Tools</h4>
                      <div className="space-y-2">
                        {pb.tools.map((t) => (
                          <div key={t.name} className="flex items-center justify-between p-3 bg-[var(--light-surface)] rounded-lg">
                            <span className="text-xs font-semibold">{t.name}</span>
                            <span className="text-xs text-[var(--mid-gray)]">{t.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--mid-gray)]/60 mb-3">Week-by-Week Timeline</h4>
                      <div className="space-y-2">
                        {pb.weekByWeek.map((w) => (
                          <div key={w.week} className="p-3 bg-[var(--light-surface)] rounded-lg">
                            <div className="text-xs font-bold">{w.week}</div>
                            <div className="text-[11px] text-[var(--mid-gray)] mt-0.5">{w.task}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Success Metrics + Pitfalls */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--mid-gray)]/60 mb-3 flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>
                        Success Metrics
                      </h4>
                      <div className="space-y-2">
                        {pb.successMetrics.map((m, i) => (
                          <div key={i} className="flex items-start gap-2 p-2.5 bg-green-50 rounded-lg border border-green-100">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" className="shrink-0 mt-0.5"><polyline points="20,6 9,17 4,12"/></svg>
                            <span className="text-[11px] text-green-800">{m}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--mid-gray)]/60 mb-3 flex items-center gap-2">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                        Common Pitfalls
                      </h4>
                      <div className="space-y-2">
                        {pb.pitfalls.map((p, i) => (
                          <div key={i} className="flex items-start gap-2 p-2.5 bg-red-50 rounded-lg border border-red-100">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" className="shrink-0 mt-0.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                            <span className="text-[11px] text-red-800">{p}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Bottom savings callout */}
                  <div className="p-4 bg-[var(--light-surface)] rounded-xl flex items-center justify-between border border-black/5">
                    <div>
                      <div className="text-xs font-bold">Projected Annual Savings</div>
                      <div className="text-[10px] text-[var(--mid-gray)]">Setup: {pb.setupCost} · Timeline: {pb.timeline}</div>
                    </div>
                    <div className="text-xl font-extrabold text-green-600">{pb.savings}</div>
                  </div>

                  {/* Implementation tracking buttons */}
                  {pb.status === "Available" && (
                    <div className="flex items-center gap-3">
                      {(!playbookStatus[pb.title] || playbookStatus[pb.title] === "not_started") && (
                        <button
                          onClick={() => updatePlaybookStatus(pb.title, "in_progress")}
                          className="text-sm font-semibold bg-[var(--black)] text-white px-5 py-2.5 rounded-xl hover:bg-[var(--dark-surface)] transition-colors"
                        >
                          Start Implementation
                        </button>
                      )}
                      {playbookStatus[pb.title] === "in_progress" && (
                        <button
                          onClick={() => updatePlaybookStatus(pb.title, "completed")}
                          className="text-sm font-semibold bg-green-600 text-white px-5 py-2.5 rounded-xl hover:bg-green-700 transition-colors"
                        >
                          Mark Complete
                        </button>
                      )}
                      {playbookStatus[pb.title] === "completed" && (
                        <span className="text-sm font-semibold text-green-600 flex items-center gap-2">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><polyline points="20,6 9,17 4,12"/></svg>
                          Implementation Complete
                        </span>
                      )}
                      {playbookStatus[pb.title] && playbookStatus[pb.title] !== "not_started" && (
                        <button
                          onClick={() => updatePlaybookStatus(pb.title, "not_started")}
                          className="text-xs font-medium text-[var(--mid-gray)] hover:text-[var(--black)] transition-colors"
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
