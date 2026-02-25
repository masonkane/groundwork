import { NextResponse } from "next/server";

const implementations = [
  {
    rank: 1,
    title: "AI-Powered Lead Follow-Up",
    category: "Sales",
    savings: 37200,
    difficulty: "Low",
    time: "1-2 weeks",
    description:
      "Deploy AI email sequences that respond to inbound leads within 2 minutes. Personalized based on lead source, industry, and behavior. Increases conversion by 35-50% while eliminating the 4-hour average response delay.",
    tools: [
      { name: "HubSpot AI", price: "$45/mo" },
      { name: "Instantly.ai", price: "$30/mo" },
      { name: "Apollo.io", price: "$39/mo" },
    ],
    steps: [
      "Map current lead sources and average response times",
      "Create 5 AI sequence templates by lead type",
      "Set up instant-response triggers for each channel",
      "A/B test subject lines and messaging for 2 weeks",
      "Scale winning sequences across all channels",
    ],
    why: "Speed-to-lead is the #1 predictor of conversion. Responding in 2 minutes vs. 4 hours increases close rates by 391%.",
  },
  {
    rank: 2,
    title: "AI Customer Support Chatbot",
    category: "Customer Experience",
    savings: 33600,
    difficulty: "Medium",
    time: "2-3 weeks",
    description:
      "Handle 60-70% of support tickets automatically with an AI chatbot trained on your specific products, pricing, and policies.",
    tools: [
      { name: "Intercom Fin", price: "$74/mo" },
      { name: "Zendesk AI", price: "$55/mo" },
      { name: "Drift", price: "$40/mo" },
    ],
    steps: [
      "Export last 6 months of support tickets for analysis",
      "Identify top 20 question categories by volume",
      "Train chatbot on your specific knowledge base",
      "Deploy with human handoff rules for complex issues",
      "Review weekly and patch gaps in training data",
    ],
    why: "Support costs scale linearly with customers. AI chatbots break that curve - handling 60-70% of tickets means you can 3x customers without 3x support staff.",
  },
  {
    rank: 3,
    title: "Invoice & Document Automation",
    category: "Operations",
    savings: 28800,
    difficulty: "Low",
    time: "1-2 weeks",
    description:
      "Replace manual invoice entry with AI-powered OCR that extracts line items, validates against POs, and auto-routes for approval.",
    tools: [
      { name: "Docsumo", price: "$29/mo" },
      { name: "Rossum", price: "$49/mo" },
      { name: "Stampli", price: "$35/mo" },
    ],
    steps: [
      "Audit current invoice volume and error rate",
      "Select tool based on your ERP/accounting integration",
      "Upload 50 sample invoices for AI training",
      "Run parallel processing for 2 weeks to validate",
      "Switch to full automation once accuracy exceeds 95%",
    ],
    why: "Manual data entry is the most expensive way to process information. Every invoice touched by a human costs $15-25 in labor. AI drops that to $0.10.",
  },
  {
    rank: 4,
    title: "Automated Report Generation",
    category: "Back Office",
    savings: 22800,
    difficulty: "Low",
    time: "1-2 weeks",
    description:
      "Generate weekly/monthly business reports automatically. AI pulls data from your tools, identifies trends, and creates executive summaries.",
    tools: [
      { name: "Coefficient", price: "$49/mo" },
      { name: "Rows.com", price: "$29/mo" },
      { name: "Equals", price: "$39/mo" },
    ],
    steps: [
      "List all recurring reports and their data sources",
      "Set up automated data connections to each source",
      "Design report templates with AI-generated summaries",
      "Schedule automated delivery to stakeholders",
      "Add anomaly detection alerts for critical metrics",
    ],
    why: "Reporting is necessary but not value-creating. Every hour spent compiling data is an hour not spent acting on it.",
  },
  {
    rank: 5,
    title: "Smart Scheduling System",
    category: "Operations",
    savings: 21600,
    difficulty: "Low",
    time: "2-3 weeks",
    description:
      "AI scheduling that eliminates back-and-forth emails, auto-considers team availability, and reduces scheduling overhead by 80%.",
    tools: [
      { name: "Motion", price: "$19/mo" },
      { name: "Reclaim.ai", price: "$12/mo" },
      { name: "Calendly AI", price: "$16/mo" },
    ],
    steps: [
      "Catalog all recurring meeting types and durations",
      "Set availability rules and buffer time preferences",
      "Integrate with your existing calendar system",
      "Train team on the new booking flow and links",
      "Monitor and adjust scheduling rules after 30 days",
    ],
    why: "The average professional spends 4.8 hours/week on scheduling. For a 10-person team, that's 2,496 hours/year.",
  },
  {
    rank: 6,
    title: "Content Generation Pipeline",
    category: "Sales & Marketing",
    savings: 9600,
    difficulty: "Medium",
    time: "2-3 weeks",
    description:
      "AI-assisted content creation for blog posts, social media, email campaigns, and ad copy. 10x more content at 20% of the cost.",
    tools: [
      { name: "Jasper", price: "$49/mo" },
      { name: "Copy.ai", price: "$36/mo" },
      { name: "Writer.com", price: "$18/mo" },
    ],
    steps: [
      "Audit current content output and publishing frequency",
      "Create brand voice guidelines for the AI to follow",
      "Set up templates for each content type",
      "Establish a human review workflow for quality control",
      "Scale to 3-5x current publishing frequency over 30 days",
    ],
    why: "Content marketing compounds. AI lets you publish 10x more, which means 10x more compounding assets.",
  },
  {
    rank: 7,
    title: "Predictive Lead Scoring",
    category: "Sales & Marketing",
    savings: 7200,
    difficulty: "Medium",
    time: "3-4 weeks",
    description:
      "AI analyzes lead behavior and engagement to predict which leads will convert. Sales focuses on the top 20%.",
    tools: [
      { name: "HubSpot AI", price: "$45/mo" },
      { name: "Madkudu", price: "$99/mo" },
      { name: "6sense", price: "Custom" },
    ],
    steps: [
      "Export 12 months of won/lost deal data",
      "Identify the 5-7 signals that predict conversion",
      "Configure scoring model in your CRM",
      "Train sales team on the new prioritization workflow",
      "Refine the model quarterly based on new close data",
    ],
    why: "Sales reps spend 65% of their time on leads that will never buy. Predictive scoring flips that.",
  },
  {
    rank: 8,
    title: "Inventory Forecasting",
    category: "Operations",
    savings: 7200,
    difficulty: "Medium",
    time: "3-4 weeks",
    description:
      "AI predicts demand patterns and supply chain disruptions to optimize inventory levels.",
    tools: [
      { name: "Inventory Planner", price: "$99/mo" },
      { name: "Flieber", price: "$79/mo" },
      { name: "Cogsy", price: "$59/mo" },
    ],
    steps: [
      "Export 24 months of sales and inventory history",
      "Identify seasonal patterns and demand drivers",
      "Configure AI forecasting for top 50 SKUs first",
      "Set automated reorder points and safety stock levels",
      "Expand to full catalog after 60-day validation",
    ],
    why: "Carrying excess inventory costs 20-30% of its value annually. Stockouts cost 4.1% of revenue.",
  },
  {
    rank: 9,
    title: "Sentiment Analysis",
    category: "Customer Experience",
    savings: 7200,
    difficulty: "Medium",
    time: "2-3 weeks",
    description:
      "AI monitors reviews, tickets, and social mentions to detect sentiment shifts in real-time.",
    tools: [
      { name: "MonkeyLearn", price: "$29/mo" },
      { name: "Brandwatch", price: "$99/mo" },
      { name: "Sprout Social", price: "$89/mo" },
    ],
    steps: [
      "Connect all customer feedback channels",
      "Set up sentiment classification",
      "Configure real-time alerts for negative sentiment spikes",
      "Create response templates for common complaint categories",
      "Build a weekly sentiment dashboard for leadership review",
    ],
    why: "A single negative review costs an average of 30 lost customers.",
  },
  {
    rank: 10,
    title: "HR/Hiring AI Screening",
    category: "Back Office",
    savings: 5600,
    difficulty: "Medium",
    time: "3-4 weeks",
    description:
      "AI screens resumes, ranks candidates by fit, and automates initial outreach. Reduces time-to-hire by 40%.",
    tools: [
      { name: "Lever", price: "$49/mo" },
      { name: "Greenhouse AI", price: "$79/mo" },
      { name: "HireVue", price: "$35/mo" },
    ],
    steps: [
      "Define ideal candidate profiles for each open role",
      "Upload last 12 months of hiring data",
      "Configure screening criteria and knockout questions",
      "Set up automated candidate communication sequences",
      "Review and adjust scoring after 30 days of hires",
    ],
    why: "A bad hire costs 30% of their annual salary. AI screening reduces bad hires by 35%.",
  },
];

// Detailed implementation guides keyed by rank
const detailedGuides: Record<
  number,
  { steps: { title: string; detail: string }[]; kpis: string[]; pitfalls: string[] }
> = {
  1: {
    steps: [
      { title: "Audit your current lead flow (15 min)", detail: "Export last 90 days of leads from your CRM" },
      { title: "Choose your tool", detail: "HubSpot AI ($45/mo) for teams under 20, Apollo.io ($39/mo) for larger teams" },
      { title: "Connect your lead sources (20 min)", detail: "Integrate every channel: website forms, email, social DMs" },
      { title: "Build 5 response templates (30 min)", detail: "Templates for: new inquiry, quote request, returning customer, referral, cold lead" },
      { title: "Set up instant-response triggers (15 min)", detail: "Configure 2-minute auto-response per lead source" },
      { title: "Create a 5-touch follow-up sequence", detail: "Day 0, Day 1, Day 3, Day 7, Day 14 cadence" },
      { title: "A/B test your messaging", detail: "Run two versions for 2 weeks, pick winners" },
      { title: "Set up lead routing rules", detail: "Hot leads to sales, warm leads to nurture sequences" },
    ],
    kpis: ["Response time under 5 min", "45%+ open rate", "15%+ reply rate", "25% conversion improvement"],
    pitfalls: ["Don't use generic templates", "Don't skip A/B testing", "Don't forget human handoff for hot leads"],
  },
  2: {
    steps: [
      { title: "Export and categorize support history (1 hour)", detail: "Pull 6 months of tickets, sort by topic" },
      { title: "Choose your platform", detail: "Intercom Fin ($74/mo), budget: Drift ($40/mo)" },
      { title: "Build your knowledge base (2-3 hours)", detail: "Write answers for top 20 question categories" },
      { title: "Configure escalation rules", detail: "Define when to hand off to humans" },
      { title: "Set up chatbot personality", detail: "Name, tone, guardrails matching your brand" },
      { title: "Test with 50 real questions", detail: "Track accuracy, target 90%+" },
      { title: "Soft launch to 20% of traffic", detail: "Add feedback button, patch gaps daily" },
      { title: "Full rollout with monitoring", detail: "Weekly accuracy reviews, track deflection rate" },
    ],
    kpis: ["60-70% ticket deflection", "85%+ satisfaction", "50% resolution time reduction"],
    pitfalls: ["Don't launch without testing", "Don't hide \"talk to human\" option", "Don't set and forget"],
  },
  3: {
    steps: [
      { title: "Audit invoice volume and process", detail: "Count monthly invoices, calculate current cost per invoice" },
      { title: "Select your tool", detail: "Docsumo ($29/mo) for small biz, Stampli ($35/mo) mid-market" },
      { title: "Upload 50 sample invoices for training", detail: "Cover your most common vendor formats" },
      { title: "Map your data fields", detail: "Vendor, invoice #, date, line items, amounts, tax" },
      { title: "Configure approval workflows", detail: "Auto-approve under $500, manager for $500-5K" },
      { title: "Run parallel processing 2 weeks", detail: "Compare AI vs manual, target 95%+ accuracy" },
      { title: "Connect to accounting system", detail: "Push approved invoices automatically" },
      { title: "Go live with exception handling", detail: "Keep human review for flagged items" },
    ],
    kpis: ["90% time reduction", "Under 2% error rate", "Under $0.50/invoice", "70% faster approvals"],
    pitfalls: ["Don't skip parallel processing", "Handle edge cases", "Watch for tax variations"],
  },
  4: {
    steps: [
      { title: "Inventory all recurring reports", detail: "List every report, recipients, frequency" },
      { title: "Select tool", detail: "Coefficient ($49/mo) for spreadsheets, Rows.com ($29/mo) for dashboards" },
      { title: "Connect data sources", detail: "Link CRM, accounting, project management" },
      { title: "Design report templates", detail: "Recreate current reports, add AI summaries" },
      { title: "Set up anomaly detection", detail: "Alerts for revenue drops >10%, expense spikes" },
      { title: "Schedule automated delivery", detail: "Daily dashboards at 8am, weekly on Monday" },
      { title: "Add AI narrative summaries", detail: "Plain-English trend analysis" },
      { title: "Train team on self-service", detail: "Reduce ad-hoc data requests" },
    ],
    kpis: ["80% reduction in report creation time", "100% on-schedule delivery"],
    pitfalls: ["Don't skip data source validation", "Don't over-automate without QA"],
  },
  5: {
    steps: [
      { title: "Catalog meeting types", detail: "List all types, durations, frequencies" },
      { title: "Choose tool", detail: "Motion ($19/mo), Calendly AI ($16/mo), Reclaim.ai ($12/mo)" },
      { title: "Set scheduling rules", detail: "Buffer times, core hours, meeting-free blocks" },
      { title: "Create booking pages", detail: "Client-facing availability with pre-meeting questionnaires" },
      { title: "Configure team availability", detail: "Route meetings to right team members" },
      { title: "Integrate existing tools", detail: "CRM, video conferencing, project management" },
      { title: "Train team", detail: "Walk through new workflow" },
      { title: "Review after 30 days", detail: "Adjust rules based on usage" },
    ],
    kpis: ["80% reduction in scheduling time", "Zero double-bookings"],
    pitfalls: ["Don't forget buffer times", "Don't skip team training"],
  },
  6: {
    steps: [
      { title: "Audit current content output", detail: "Count pieces per week, note gaps" },
      { title: "Select AI tool", detail: "Jasper ($49/mo) long-form, Copy.ai ($36/mo) social" },
      { title: "Create brand voice profile", detail: "Feed 10 examples, define tone and guardrails" },
      { title: "Build content templates", detail: "Blog, social, email, ad copy frameworks" },
      { title: "Set up content calendar", detail: "Plan 4 weeks, mix educational/promotional" },
      { title: "Establish human review workflow", detail: "AI drafts, human reviews, publish" },
      { title: "Scale gradually", detail: "Start at 2x output, increase to 3-5x" },
      { title: "Repurpose across channels", detail: "Turn blogs into social posts, emails, scripts" },
    ],
    kpis: ["3-5x content output", "70% cost reduction per piece"],
    pitfalls: ["Don't publish without human review", "Don't ignore brand voice"],
  },
  7: {
    steps: [
      { title: "Export deal history", detail: "12 months of won/lost deals with engagement data" },
      { title: "Identify conversion signals", detail: "Pricing page visits, demo requests, email replies" },
      { title: "Choose platform", detail: "HubSpot AI built-in or Madkudu ($99/mo)" },
      { title: "Configure scoring model", detail: "Assign points to signals (positive and negative)" },
      { title: "Define score tiers", detail: "Hot (80+), Warm (50-79), Cold (below 50)" },
      { title: "Train sales team", detail: "New prioritization workflow" },
      { title: "Shadow mode for 2 weeks", detail: "Compare AI vs current process" },
      { title: "Launch and iterate quarterly", detail: "Retrain model with fresh data" },
    ],
    kpis: ["40% more deals per rep", "30% better conversion", "20% shorter sales cycle"],
    pitfalls: ["Don't skip shadow mode", "Don't ignore negative signals"],
  },
  8: {
    steps: [
      { title: "Export 24 months of data", detail: "Sales, inventory, stockouts, lead times" },
      { title: "Select tool", detail: "Inventory Planner ($99/mo), Flieber ($79/mo), Cogsy ($59/mo)" },
      { title: "Start with top 50 SKUs", detail: "Focus on 80% of revenue" },
      { title: "Set reorder parameters", detail: "Safety stock, reorder points, order quantities" },
      { title: "Add external signals", detail: "Weather, economic indicators, marketing calendar" },
      { title: "Configure alerts", detail: "Stockout warnings, excess inventory, demand spikes" },
      { title: "Parallel forecasts for 60 days", detail: "Compare AI vs current method" },
      { title: "Expand to full catalog", detail: "Automate routine purchase orders" },
    ],
    kpis: ["90%+ forecast accuracy", "40% fewer stockouts", "30% less overstock"],
    pitfalls: ["Don't skip parallel forecasting", "Don't ignore external factors"],
  },
  9: {
    steps: [
      { title: "Connect all feedback channels", detail: "Reviews, tickets, social, surveys" },
      { title: "Choose platform", detail: "MonkeyLearn ($29/mo), Sprout Social ($89/mo)" },
      { title: "Set up classification", detail: "Product quality, service, pricing, delivery" },
      { title: "Build alert system", detail: "Under 3 stars = immediate notification" },
      { title: "Create response templates", detail: "Personalized for common negative scenarios" },
      { title: "Weekly sentiment dashboard", detail: "Trends, themes, response times" },
      { title: "Train team on response protocols", detail: "Who responds to what" },
      { title: "Feedback-to-product loop", detail: "Monthly review with product/ops team" },
    ],
    kpis: ["Under 4-hour response to negatives", "0.3+ rating improvement in 90 days"],
    pitfalls: ["Don't ignore positive feedback", "Don't automate responses to negatives"],
  },
  10: {
    steps: [
      { title: "Define ideal candidate profiles", detail: "Must-haves, nice-to-haves, red flags" },
      { title: "Choose ATS", detail: "Lever ($49/mo), HireVue ($35/mo), Greenhouse AI ($79/mo)" },
      { title: "Upload hiring data", detail: "12 months of applications and outcomes" },
      { title: "Configure screening criteria", detail: "Knockout questions, weighted scoring" },
      { title: "Build automated outreach", detail: "Application received, interview invite, rejection" },
      { title: "Set up interview scheduling", detail: "Self-scheduling with real-time availability" },
      { title: "Shadow screening 30 days", detail: "Compare AI vs human screening" },
      { title: "Go live with AI-first screening", detail: "AI screens, humans interview" },
    ],
    kpis: ["Under 24-hour response", "40% faster time-to-fill", "35% cost reduction"],
    pitfalls: ["Don't remove human interviews", "Don't ignore bias in training data"],
  },
};

// Pain point key to implementation rank mapping
const painPointToRanks: Record<string, number[]> = {
  "lead-followup": [1, 7],
  support: [2, 9],
  invoicing: [3],
  reporting: [4],
  scheduling: [5],
  content: [6],
  "lead-scoring": [7],
  inventory: [8],
  sentiment: [9],
  hiring: [10],
};

// Goal to executive summary text mapping
const goalSummaries: Record<string, string> = {
  "cut-costs":
    "This playbook is designed to help you cut operational costs through strategic AI automation. Based on analysis of hundreds of businesses, we've identified 10 high-ROI implementations that can save your business over $180,000 per year \u2014 with specific tools, costs, and step-by-step instructions for each.",
  "save-time":
    "This playbook is designed to help you reclaim hours every week by automating repetitive tasks. Based on analysis of hundreds of businesses, we've identified 10 AI implementations that can free up over 40 hours per month for your team \u2014 so you can focus on work that actually moves the needle.",
  "win-customers":
    "This playbook is designed to help you win more customers through AI-powered sales and marketing automation. Based on analysis of hundreds of businesses, we've identified 10 implementations that can increase your conversion rates by 35-50% while reducing customer acquisition costs.",
  "scale-without-hiring":
    "This playbook is designed to help you scale your operations without proportionally increasing headcount. Based on analysis of hundreds of businesses, we've identified 10 AI implementations that can 3x your operational capacity \u2014 without 3x the payroll.",
  "get-ahead":
    "This playbook is designed to help you gain a decisive competitive advantage through AI. While 64% of businesses have already adopted some form of AI, most are still in the early stages. The 10 implementations in this playbook will put you in the top 10% of AI-enabled businesses in your industry.",
};

const defaultSummary =
  "This playbook contains the 10 highest-ROI AI implementations for 2026, ranked by annual savings. Each includes specific tools with pricing, step-by-step instructions, and expected outcomes.";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const industry = searchParams.get("industry") || "";
  const teamSize = searchParams.get("teamSize") || "";
  const painPoints = searchParams.get("painPoints") || "";
  const goal = searchParams.get("goal") || "";

  // Resolve recommended implementation ranks from pain points
  const painKeys = painPoints
    .split(",")
    .map((k) => k.trim())
    .filter(Boolean);
  const recommendedRanksSet = new Set<number>();
  for (const key of painKeys) {
    const ranks = painPointToRanks[key];
    if (ranks) ranks.forEach((r) => recommendedRanksSet.add(r));
  }
  // Take up to 3 unique recommended implementations, preserving rank order
  const recommendedRanks = Array.from(recommendedRanksSet)
    .sort((a, b) => a - b)
    .slice(0, 3);
  const recommendedImpls = recommendedRanks.map(
    (r) => implementations.find((i) => i.rank === r)!
  );
  const remainingImpls = implementations.filter(
    (i) => !recommendedRanks.includes(i.rank)
  );

  // Dynamic import to avoid SSR issues
  const { jsPDF } = await import("jspdf");

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentW = W - margin * 2;
  let y = 20;

  const addPage = () => {
    doc.addPage();
    y = 20;
  };
  const checkSpace = (needed: number) => {
    if (y + needed > 270) addPage();
  };

  // Helper: draw section header
  const sectionHeader = (title: string) => {
    checkSpace(20);
    doc.setFillColor(8, 8, 8);
    doc.rect(margin, y, contentW, 10, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    doc.text(title, margin + 4, y + 7);
    doc.setTextColor(8, 8, 8);
    y += 16;
  };

  // ── Page: Cover ──
  doc.setFillColor(8, 8, 8);
  doc.rect(0, 0, W, 100, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  doc.text("The AI Profit Playbook", margin, 45);
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  if (industry) {
    doc.text(`Personalized for ${industry}`, margin, 58);
  } else {
    doc.text("2026 Edition", margin, 58);
  }
  if (teamSize) {
    doc.setFontSize(11);
    doc.text(`Tailored for teams of ${teamSize}`, margin, 70);
  }
  doc.setFontSize(10);
  doc.text(
    `Generated ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`,
    margin,
    teamSize ? 80 : 70
  );
  doc.text("Prepared by Groundwork", margin, teamSize ? 90 : 80);

  // ── Page: Executive Summary ──
  doc.setTextColor(8, 8, 8);
  y = 115;
  sectionHeader("Executive Summary");

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const summaryText = goalSummaries[goal] || defaultSummary;
  const summaryLines = doc.splitTextToSize(summaryText, contentW);
  doc.text(summaryLines, margin, y);
  y += summaryLines.length * 4.5 + 10;

  // Key metrics grid
  const metrics = [
    { label: "Total Annual Savings", value: "$180,800+" },
    { label: "Implementations", value: "10" },
    { label: "Average ROI", value: "500%+" },
    { label: "Recommended Tools", value: "30+" },
    { label: "Implementation Time", value: "1-4 weeks each" },
    { label: "Difficulty", value: "60% Low, 40% Medium" },
  ];

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("Key Metrics", margin, y);
  y += 7;

  metrics.forEach((m, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = margin + col * (contentW / 2);
    const yPos = y + row * 12;
    doc.setFillColor(242, 242, 242);
    doc.rect(x, yPos - 4, contentW / 2 - 3, 10, "F");
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(85, 85, 85);
    doc.text(m.label, x + 3, yPos + 1);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(8, 8, 8);
    doc.text(m.value, x + contentW / 2 - 6, yPos + 1, { align: "right" });
  });
  y += Math.ceil(metrics.length / 2) * 12 + 10;

  // ── Pages: Top Recommended Implementations ──
  if (recommendedImpls.length > 0) {
    recommendedImpls.forEach((impl) => {
      addPage();
      const guide = detailedGuides[impl.rank];

      sectionHeader(impl.title);

      // Recommended badge
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(34, 197, 94);
      doc.text("RECOMMENDED BASED ON YOUR PAIN POINTS", margin, y);
      doc.setTextColor(8, 8, 8);
      y += 7;

      // Description
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      const descLines = doc.splitTextToSize(impl.description, contentW);
      doc.text(descLines, margin, y);
      y += descLines.length * 4.5 + 6;

      // Savings, Difficulty, Timeline row
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(34, 197, 94);
      doc.text(`$${impl.savings.toLocaleString()}/yr`, margin, y);
      doc.setTextColor(8, 8, 8);
      doc.setFont("helvetica", "normal");
      doc.text(`Difficulty: ${impl.difficulty}`, margin + 45, y);
      doc.text(`Timeline: ${impl.time}`, margin + 95, y);
      y += 10;

      // Recommended Tools table
      checkSpace(30);
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text("Recommended Tools", margin, y);
      y += 6;

      doc.setFillColor(242, 242, 242);
      doc.rect(margin, y - 3, contentW, 7, "F");
      doc.setFontSize(7);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(85, 85, 85);
      doc.text("Tool", margin + 2, y + 1);
      doc.text("Price", margin + 80, y + 1);
      doc.setTextColor(8, 8, 8);
      y += 7;

      impl.tools.forEach((tool) => {
        doc.setFontSize(8);
        doc.setFont("helvetica", "bold");
        doc.text(tool.name, margin + 2, y);
        doc.setFont("helvetica", "normal");
        doc.text(tool.price, margin + 80, y);
        y += 6;
      });
      y += 6;

      // Detailed steps
      checkSpace(20);
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text("Step-by-Step Implementation", margin, y);
      y += 7;

      guide.steps.forEach((step, idx) => {
        checkSpace(14);
        doc.setFontSize(8);
        doc.setFont("helvetica", "bold");
        doc.text(`${idx + 1}. ${step.title}`, margin, y);
        y += 4.5;
        doc.setFont("helvetica", "normal");
        doc.setTextColor(85, 85, 85);
        const detailLines = doc.splitTextToSize(step.detail, contentW - 5);
        doc.text(detailLines, margin + 5, y);
        doc.setTextColor(8, 8, 8);
        y += detailLines.length * 4 + 3;
      });
      y += 4;

      // Common Pitfalls
      checkSpace(20);
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text("Common Pitfalls", margin, y);
      y += 6;
      guide.pitfalls.forEach((pitfall) => {
        checkSpace(8);
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(180, 50, 50);
        const pitfallLines = doc.splitTextToSize(`- ${pitfall}`, contentW);
        doc.text(pitfallLines, margin + 3, y);
        doc.setTextColor(8, 8, 8);
        y += pitfallLines.length * 4 + 2;
      });
      y += 4;

      // Key Performance Indicators
      checkSpace(20);
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text("Key Performance Indicators", margin, y);
      y += 6;
      guide.kpis.forEach((kpi) => {
        checkSpace(8);
        doc.setFontSize(8);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(34, 197, 94);
        const kpiLines = doc.splitTextToSize(`- ${kpi}`, contentW);
        doc.text(kpiLines, margin + 3, y);
        doc.setTextColor(8, 8, 8);
        y += kpiLines.length * 4 + 2;
      });
    });
  }

  // ── Pages: Remaining Implementations Overview ──
  addPage();
  sectionHeader("All Implementations Overview");

  // Table header
  doc.setFillColor(242, 242, 242);
  doc.rect(margin, y - 3, contentW, 7, "F");
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(85, 85, 85);
  doc.text("#", margin + 2, y + 1);
  doc.text("Implementation", margin + 10, y + 1);
  doc.text("Category", margin + 75, y + 1);
  doc.text("Savings", margin + 110, y + 1);
  doc.text("Difficulty", margin + 135, y + 1);
  doc.text("Timeline", margin + 155, y + 1);
  doc.setTextColor(8, 8, 8);
  y += 8;

  remainingImpls.forEach((impl) => {
    checkSpace(8);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(String(impl.rank), margin + 2, y);
    doc.text(impl.title, margin + 10, y);
    doc.setTextColor(85, 85, 85);
    doc.text(impl.category, margin + 75, y);
    doc.setTextColor(8, 8, 8);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(34, 197, 94);
    doc.text(`$${impl.savings.toLocaleString()}/yr`, margin + 110, y);
    doc.setTextColor(8, 8, 8);
    doc.setFont("helvetica", "normal");
    doc.text(impl.difficulty, margin + 135, y);
    doc.text(impl.time, margin + 155, y);
    y += 7;
  });

  // ── Page: Industry Benchmarks ──
  addPage();
  sectionHeader("Industry Benchmark Comparison");

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  const benchIntro =
    "Without AI implementations, your business starts at 0% across these key areas. Here's what the average business in your industry has already adopted.";
  const benchIntroLines = doc.splitTextToSize(benchIntro, contentW);
  doc.text(benchIntroLines, margin, y);
  y += benchIntroLines.length * 4.5 + 8;

  const benchmarks = [
    { area: "Customer Service AI", avg: "64%", priority: "Critical" },
    { area: "Automated Billing", avg: "41%", priority: "High" },
    { area: "AI Lead Generation", avg: "37%", priority: "Medium" },
    { area: "Predictive Scheduling", avg: "52%", priority: "High" },
    { area: "AI Content Marketing", avg: "29%", priority: "Medium" },
    { area: "Data Analytics/BI", avg: "58%", priority: "Critical" },
  ];

  // Table header
  doc.setFillColor(242, 242, 242);
  doc.rect(margin, y - 3, contentW, 7, "F");
  doc.setFontSize(7);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(85, 85, 85);
  doc.text("Area", margin + 2, y + 1);
  doc.text("Industry Avg", margin + 80, y + 1);
  doc.text("Gap Priority", margin + 120, y + 1);
  doc.setTextColor(8, 8, 8);
  y += 8;

  benchmarks.forEach((b) => {
    checkSpace(8);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text(b.area, margin + 2, y);
    doc.setFont("helvetica", "bold");
    doc.text(b.avg, margin + 80, y);
    doc.setFont("helvetica", "normal");
    // Color-code priority
    if (b.priority === "Critical") {
      doc.setTextColor(180, 50, 50);
    } else if (b.priority === "High") {
      doc.setTextColor(200, 140, 30);
    } else {
      doc.setTextColor(85, 85, 85);
    }
    doc.text(b.priority, margin + 120, y);
    doc.setTextColor(8, 8, 8);
    y += 7;
  });

  // ── Page: Implementation Roadmap ──
  addPage();
  sectionHeader("6-Month Implementation Roadmap");

  const phases = [
    {
      phase: "Week 1-2: Quick Wins",
      desc: "3 implementations, $7,300/mo savings.",
      items: "Lead follow-up, Invoice automation, Smart scheduling",
    },
    {
      phase: "Week 3-6: Core Automations",
      desc: "3 implementations, $4,500/mo additional.",
      items: "Support chatbot, Report generation, Content pipeline",
    },
    {
      phase: "Month 2-3: Growth Engines",
      desc: "2 implementations, $1,200/mo additional.",
      items: "Predictive lead scoring, Inventory forecasting",
    },
    {
      phase: "Month 3-6: Strategic Plays",
      desc: "2 implementations, $1,100/mo additional.",
      items: "Sentiment analysis, HR/hiring screening",
    },
  ];

  phases.forEach((p) => {
    checkSpace(22);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text(p.phase, margin, y);
    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.text(p.desc, margin, y);
    y += 5;
    doc.setTextColor(85, 85, 85);
    const itemLines = doc.splitTextToSize(p.items, contentW);
    doc.text(itemLines, margin, y);
    doc.setTextColor(8, 8, 8);
    y += itemLines.length * 4 + 6;
  });

  // ── Footer on every page ──
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(180, 180, 180);
    doc.text("Groundwork AI Profit Playbook | Confidential", margin, 290);
    doc.text(`Page ${i} of ${totalPages}`, W - margin, 290, {
      align: "right",
    });
  }

  const buffer = doc.output("arraybuffer");

  // Build filename
  let filename = "AI-Profit-Playbook";
  if (industry) {
    filename += `-${encodeURIComponent(industry)}`;
  }
  filename += ".pdf";

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
    },
  });
}
