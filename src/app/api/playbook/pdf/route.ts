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

// Tool URLs for clickable links in the PDF
const toolUrls: Record<string, string> = {
  "HubSpot AI": "https://www.hubspot.com",
  "Instantly.ai": "https://instantly.ai",
  "Apollo.io": "https://www.apollo.io",
  "Intercom Fin": "https://www.intercom.com/fin",
  "Zendesk AI": "https://www.zendesk.com",
  Drift: "https://www.drift.com",
  Docsumo: "https://www.docsumo.com",
  Rossum: "https://rossum.ai",
  Stampli: "https://www.stampli.com",
  Coefficient: "https://coefficient.io",
  "Rows.com": "https://rows.com",
  Equals: "https://equals.com",
  Motion: "https://www.usemotion.com",
  "Reclaim.ai": "https://reclaim.ai",
  "Calendly AI": "https://calendly.com",
  Jasper: "https://www.jasper.ai",
  "Copy.ai": "https://www.copy.ai",
  "Writer.com": "https://writer.com",
  Madkudu: "https://www.madkudu.com",
  "6sense": "https://6sense.com",
  "Inventory Planner": "https://www.inventory-planner.com",
  Flieber: "https://www.flieber.com",
  Cogsy: "https://www.cogsy.com",
  MonkeyLearn: "https://monkeylearn.com",
  Brandwatch: "https://www.brandwatch.com",
  "Sprout Social": "https://sproutsocial.com",
  Lever: "https://www.lever.co",
  "Greenhouse AI": "https://www.greenhouse.com",
  HireVue: "https://www.hirevue.com",
};

// Industry-specific context for implementations
const industryContext: Record<string, Record<number, string>> = {
  "Construction & Trades": {
    1: "In construction, leads from project bids and referrals have a 72-hour decision window. AI follow-up ensures you respond to RFQs and bid invitations before competitors.",
    2: "Construction clients frequently ask about project timelines, change orders, and warranty claims. An AI chatbot trained on your project types reduces office phone volume by 50%+.",
    3: "Construction invoicing involves progress billing, retention, and change orders. AI handles AIA-format invoices and matches against original estimates automatically.",
    4: "Job costing reports, project status updates, and equipment utilization reports can be auto-generated from your project management system weekly.",
    5: "Scheduling site inspections, subcontractor meetings, and client walkthroughs across multiple active job sites is a perfect use case for AI scheduling.",
    6: "Before/after project photos, safety updates, and project milestone content builds trust with future clients and improves local SEO rankings.",
  },
  "Home Services (HVAC, Plumbing, Electrical)": {
    1: "Homeowners requesting quotes typically contact 3-4 providers. The first to respond wins the job 78% of the time. AI follow-up is your biggest competitive advantage.",
    2: "Common questions about service areas, pricing ranges, emergency availability, and maintenance schedules can be handled 24/7 by an AI chatbot on your website.",
    3: "Home service invoicing with parts, labor, and warranty tracking gets automated. AI matches purchase orders to supplier invoices and flags pricing discrepancies.",
    5: "Dispatch optimization with AI scheduling reduces drive time between appointments by 20-30%, fitting more jobs per day while respecting technician skill matching.",
    8: "Track van inventory and warehouse stock of common parts (filters, fittings, breakers). AI predicts seasonal demand spikes for AC units in summer and furnaces in winter.",
    9: "Monitor Google reviews, Yelp, and Nextdoor mentions. In home services, a single negative review can cost $10K+ in lost business over a year.",
  },
  "Real Estate": {
    1: "Real estate leads go cold within hours. AI sequences nurture buyers and sellers with market updates, new listings, and neighborhood insights personalized to their search criteria.",
    4: "Market analysis reports, comparable sales, and portfolio performance summaries can be auto-generated from MLS data and your transaction history.",
    5: "Coordinate showings, open houses, and client meetings across multiple properties. AI scheduling with travel time buffers eliminates double-bookings.",
    6: "Property descriptions, market updates, social media posts, and email newsletters are perfect for AI content generation. 10x your marketing output.",
    7: "Score leads based on online behavior: property views, saved searches, mortgage calculator usage, and open house attendance predict who is ready to transact.",
    9: "Track client satisfaction through post-closing surveys and online reviews. In real estate, referrals account for 40%+ of business.",
  },
  "Healthcare & Dental": {
    1: "Patient inquiries about services, insurance acceptance, and availability need immediate response. AI follow-up reduces no-shows by 35% with automated appointment confirmations.",
    2: "Answer questions about insurance, office hours, preparation instructions, and post-procedure care 24/7. Reduce front desk call volume by 60%.",
    3: "Insurance claim processing, patient billing, and EOB reconciliation are perfect for AI automation. Reduce claim denials by catching coding errors before submission.",
    5: "Patient scheduling with AI considers provider availability, room requirements, equipment needs, and insurance verification. Reduces scheduling staff workload by 70%.",
    9: "Monitor patient reviews on Google, Healthgrades, and Zocdoc. Healthcare practices with 4.5+ star ratings see 28% more new patient bookings.",
    10: "Screen clinical and administrative candidates with AI that evaluates certifications, experience requirements, and cultural fit markers from applications.",
  },
  "Legal & Accounting": {
    1: "Legal and accounting leads expect professional, prompt responses. AI follow-up with case-type-specific templates demonstrates competence and availability immediately.",
    3: "Time-and-materials billing, trust account reconciliation, and expense tracking are streamlined with AI that auto-categorizes billable time and generates invoices.",
    4: "Client status reports, billable hours summaries, and matter updates can be auto-generated from your practice management system.",
    6: "Thought leadership content, practice area guides, and regulatory updates position your firm as an authority. AI helps produce 5x more content consistently.",
    7: "Score prospective clients based on case type, estimated value, engagement signals, and fit with your practice areas to prioritize high-value opportunities.",
    10: "Screen associate and paralegal candidates with AI that evaluates bar admissions, practice area experience, and writing quality from applications.",
  },
  "Restaurant & Food Service": {
    1: "Catering inquiries, event bookings, and large party reservations need fast follow-up. AI sequences with menu options and availability drive 40%+ more bookings.",
    2: "Handle menu questions, dietary accommodations, hours, reservation status, and delivery tracking automatically. Free up staff to focus on in-house guests.",
    3: "Vendor invoicing for food supplies, beverage distributors, and equipment maintenance. AI matches delivery receipts to purchase orders and flags price increases.",
    5: "Staff scheduling that considers peak hours, certifications (food handler, alcohol service), availability preferences, and labor cost targets.",
    8: "Predict ingredient needs based on reservation counts, seasonal menu changes, catering orders, and historical consumption patterns. Reduce food waste by 25-40%.",
    9: "Restaurant reviews on Google, Yelp, and DoorDash directly impact revenue. AI monitors and alerts on negative sentiment so you can respond within hours.",
  },
  "Retail & E-Commerce": {
    1: "Cart abandonment emails, post-purchase follow-ups, and re-engagement campaigns driven by AI recover 15-25% of lost revenue automatically.",
    2: "Handle order status, return policies, sizing questions, and product recommendations 24/7. E-commerce chatbots typically deflect 70%+ of support tickets.",
    6: "Product descriptions, social media posts, email campaigns, and ad copy at scale. AI generates personalized content for hundreds of SKUs efficiently.",
    7: "Score leads based on browsing behavior, cart value, purchase history, and email engagement to prioritize outreach and personalize offers.",
    8: "Demand forecasting for seasonal trends, promotional impacts, and new product launches. Reduce stockouts by 40% and overstock by 30%.",
    9: "Monitor product reviews, social mentions, and support ticket sentiment to identify quality issues, trending products, and customer satisfaction shifts.",
  },
  "Professional Services & Consulting": {
    1: "Consulting leads evaluating multiple firms respond to speed and personalization. AI follow-up with relevant case studies and availability drives 45%+ more meetings.",
    3: "Project-based billing, retainer tracking, and expense reports are automated. AI matches time entries to project budgets and flags overages before they become disputes.",
    4: "Client deliverable tracking, project status dashboards, and utilization reports generated automatically from your project management and time tracking tools.",
    6: "Whitepapers, case studies, blog posts, and LinkedIn content establish thought leadership. AI helps consultants publish 5-10x more content consistently.",
    7: "Score inbound leads based on company size, budget signals, project scope indicators, and engagement patterns to focus on highest-value opportunities.",
    10: "Screen consultant and analyst candidates with AI that evaluates relevant experience, certifications, client-facing skills, and cultural alignment.",
  },
  "Fitness & Wellness": {
    1: "Fitness leads researching memberships need immediate engagement. AI follow-up with class schedules, trial offers, and success stories converts 35%+ more prospects.",
    2: "Answer questions about class schedules, membership options, cancellation policies, and facility amenities 24/7 without tying up front desk staff.",
    5: "Class scheduling, personal training sessions, and room bookings with AI that considers instructor availability, capacity limits, and member preferences.",
    6: "Workout tips, nutrition content, success stories, and challenge promotions keep members engaged and attract new prospects through social media.",
    9: "Monitor Google reviews and social mentions. Fitness businesses with strong online reputation see 35%+ higher membership inquiry rates.",
    10: "Screen trainer and instructor candidates with AI that evaluates certifications, specializations, teaching style indicators, and availability fit.",
  },
  "Auto Repair & Dealerships": {
    1: "Service appointment requests and vehicle inquiries need fast response. AI follow-up with appointment availability and service specials drives 30%+ more bookings.",
    2: "Handle questions about service pricing, appointment availability, parts status, and warranty coverage automatically. Reduce service advisor phone time by 50%.",
    3: "Parts invoicing, warranty claims processing, and vendor payment reconciliation automated with AI that matches repair orders to supplier invoices.",
    5: "Service bay scheduling with AI considers technician specializations, bay equipment, estimated repair times, and parts availability for optimal throughput.",
    8: "Predict parts demand based on seasonal service trends, fleet contracts, and common failure patterns by vehicle make/model/year.",
    9: "Auto repair reviews heavily influence consumer choice. AI monitoring ensures you respond to negative experiences before they become permanent reputation damage.",
  },
  Other: {
    1: "Fast lead response is universally valuable. AI follow-up within 2 minutes increases conversion by 35-50% regardless of your specific industry.",
    2: "Every business has common questions from customers. An AI chatbot trained on your specific FAQs frees up staff time and improves response consistency.",
    3: "Invoice processing automation works for any business that handles 50+ invoices per month, regardless of industry vertical.",
    5: "Scheduling automation eliminates the back-and-forth that wastes 4-5 hours per week per team member across all industries.",
    6: "Content marketing drives organic growth in every industry. AI helps you create more content consistently without hiring a content team.",
    9: "Online reputation management matters for every business. AI monitoring ensures you never miss important customer feedback.",
  },
};

// Goal-specific framing for implementations
const goalFraming: Record<string, Record<number, string>> = {
  "cut-costs": {
    1: "Eliminates the need for a dedicated lead qualification role ($45K-65K/yr). AI handles initial outreach, follow-up, and qualification at 5% of the cost.",
    2: "Replaces 1-2 full-time support agents ($35K-50K/yr each). AI handles routine tickets while humans focus on complex, high-value interactions only.",
    3: "Reduces invoice processing cost from $15-25 per invoice to under $0.50. For 200 invoices/month, that is $3,000-5,000/month in direct labor savings.",
    4: "Eliminates 8-12 hours/week of manual report compilation. At $30-50/hr for the analyst doing it, that is $12K-30K/yr in recovered productivity.",
    5: "Eliminates 4-5 hours/week of scheduling coordination per team member. For a 10-person team, that is $25K-50K/yr in recovered productive time.",
    6: "Replaces $3K-8K/month in freelance content costs. AI generates first drafts, humans polish. Same quality at 20% of the cost.",
    7: "Reduces wasted sales time on low-quality leads by 60%. Each sales rep recovers 10+ hours/week to focus on prospects that actually convert.",
    8: "Reduces emergency ordering premiums (15-30% markup) and overstock carrying costs (20-30% of value annually). Typical savings: $50K-200K/yr for mid-size operations.",
    9: "Prevents revenue loss from unaddressed negative reviews. Each prevented negative review saves an estimated 30 customers worth of lifetime value.",
    10: "Reduces cost-per-hire by 35% and cuts bad-hire costs (estimated at 30% of annual salary) by screening more effectively upfront.",
  },
  "save-time": {
    1: "Reclaim 10-15 hours/week currently spent on manual lead follow-up. AI handles the repetitive outreach so your team focuses on closing warm leads.",
    2: "Save 20-30 hours/week of support staff time. AI resolves 60-70% of tickets instantly, giving your team back full days to focus on complex issues.",
    3: "Reduce invoice processing from 15 minutes to under 2 minutes each. For 200 invoices/month, that is 40+ hours/month recovered.",
    4: "Eliminate 8-12 hours/week of manual data pulling and report formatting. Reports generate automatically on schedule with AI-written summaries.",
    5: "Eliminate 4-5 hours of scheduling back-and-forth per team member per week. Meetings book themselves based on real-time availability.",
    6: "Produce 3-5x more content without increasing time investment. What used to take 4 hours per blog post now takes 45 minutes with AI drafting.",
    7: "Stop wasting time on leads that will never convert. AI scoring tells your team exactly who to call first, recovering 10+ hours/week per rep.",
    8: "Eliminate manual inventory counts and spreadsheet forecasting. AI predicts demand automatically, saving 5-10 hours/week of inventory management time.",
    9: "Automate review monitoring across all platforms. Instead of manually checking 5+ sites daily, get instant alerts only when action is needed.",
    10: "Reduce resume screening from 30 minutes per application to 2 minutes. For 100 applicants per role, that is 45+ hours saved per hire.",
  },
  "win-customers": {
    1: "Convert 35-50% more leads by responding in 2 minutes instead of 4 hours. Speed-to-lead is the #1 factor in winning new business.",
    2: "24/7 instant support creates a premium customer experience. Businesses with AI chatbots see 25% higher customer satisfaction and 15% more repeat purchases.",
    3: "Faster, error-free invoicing improves client experience. Professional, timely billing builds trust and reduces payment disputes by 40%.",
    4: "Proactive client reporting demonstrates value and transparency. Clients who receive regular performance updates renew at 2x the rate.",
    5: "Frictionless booking converts more prospects into customers. Every extra step in scheduling loses 10-15% of potential bookings.",
    6: "10x your content output to reach 10x more prospects. Content marketing generates 3x more leads than paid advertising at 62% lower cost.",
    7: "Focus sales efforts on the 20% of leads most likely to buy. This increases close rates by 30% and shortens sales cycles by 20%.",
    8: "Never lose a sale due to stockouts. AI ensures you have the right products available when customers want to buy.",
    9: "Responding to negative reviews within 4 hours recovers 33% of dissatisfied customers. Proactive reputation management drives 15% more new business.",
    10: "Hire better people, faster. Great employees create great customer experiences. AI screening reduces time-to-hire by 40%.",
  },
  "scale-without-hiring": {
    1: "Handle 5x more leads without adding sales development reps. AI does the qualification and nurturing, humans only step in to close.",
    2: "Support 3x more customers without hiring additional support staff. AI handles routine inquiries while your existing team manages escalations.",
    3: "Process 10x more invoices without adding accounting headcount. AI scales linearly with volume at near-zero marginal cost.",
    4: "Generate unlimited reports without dedicated analysts. AI pulls data, identifies trends, and writes summaries automatically on any schedule.",
    5: "Manage 3x more appointments without hiring an office coordinator. AI handles all booking, rescheduling, and reminders automatically.",
    6: "Publish 5-10x more marketing content without hiring writers or agencies. AI drafts, your team edits. Scale content like a team of 10.",
    7: "Enable each sales rep to manage 3x more leads effectively. AI scoring and prioritization means fewer reps close more deals.",
    8: "Manage larger inventory across more locations without additional warehouse staff. AI automates forecasting, reordering, and allocation.",
    9: "Monitor customer sentiment across unlimited channels without hiring a community manager. AI flags what matters, you respond to what counts.",
    10: "Screen 10x more applicants without adding HR headcount. AI handles the initial filter, your team interviews only the best candidates.",
  },
  "get-ahead": {
    1: "Only 23% of businesses respond to leads within an hour. AI-powered 2-minute response puts you in the top 5% and creates an unfair advantage.",
    2: "While competitors make customers wait until business hours, your AI chatbot provides instant support 24/7. This alone differentiates you in most markets.",
    3: "Automated back-office operations free your team to focus on innovation and growth while competitors are still doing manual data entry.",
    4: "Real-time business intelligence while competitors make decisions on month-old data. AI reporting gives you a speed advantage in every strategic decision.",
    5: "While competitors lose leads to scheduling friction, your prospects book instantly. This removes a barrier that costs most businesses 10-15% of potential revenue.",
    6: "Dominate your market's content landscape. While competitors publish 2-4 pieces/month, you publish 20-40. More content means more organic traffic and authority.",
    7: "Know which leads will convert before your competitors even respond. Predictive scoring gives your sales team a structural advantage in every deal.",
    8: "Never lose a sale to stockouts while competitors scramble with emergency orders. Predictive inventory is a competitive moat most small businesses lack.",
    9: "Respond to customer feedback faster than any competitor. In markets where reputation drives revenue, real-time sentiment monitoring is a decisive advantage.",
    10: "Win the talent war with faster, better hiring. While competitors take 45 days to fill roles, you fill them in 25. Better people, faster growth.",
  },
};

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

  // Dynamic import to avoid SSR issues
  const { jsPDF } = await import("jspdf");

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const margin = 20;
  const contentW = W - margin * 2;
  let y = 20;

  const addPage = () => {
    doc.addPage();
    y = 20;
  };
  const checkSpace = (needed: number) => {
    if (y + needed > 265) addPage();
  };

  // Helper: draw section header with green accent bar
  const sectionHeader = (title: string, rank?: number) => {
    checkSpace(20);
    // Green accent bar
    doc.setFillColor(34, 197, 94);
    doc.rect(margin, y, 3, 16, "F");
    // Title
    doc.setTextColor(8, 8, 8);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    if (rank !== undefined) {
      doc.text(`#${rank}`, margin + 7, y + 6);
      doc.setFontSize(12);
      doc.text(title, margin + 18, y + 6);
    } else {
      doc.text(title, margin + 7, y + 6);
    }
    doc.setFontSize(9);
    y += 22;
  };

  // ── Page 1: Cover ──
  doc.setFillColor(8, 8, 8);
  doc.rect(0, 0, W, H, "F");

  // GROUNDWORK wordmark
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("G R O U N D W O R K", margin, 35);

  // Green accent line
  doc.setDrawColor(34, 197, 94);
  doc.setLineWidth(0.5);
  doc.line(margin, 45, margin + 40, 45);

  // Large title
  doc.setFontSize(32);
  doc.setFont("helvetica", "bold");
  doc.text("The AI Profit", margin, 75);
  doc.text("Playbook", margin, 90);

  // Subtitle
  doc.setFontSize(16);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(255, 255, 255, 200);
  if (industry) {
    doc.text(`Personalized for ${industry}`, margin, 108);
  } else {
    doc.text("2026 Edition", margin, 108);
  }

  if (teamSize) {
    doc.setFontSize(12);
    doc.text(`Team size: ${teamSize}`, margin, 120);
  }

  // Generation date + prepared by
  doc.setFontSize(10);
  doc.setTextColor(180, 180, 180);
  const dateStr = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  doc.text(`Generated ${dateStr}`, margin, 260);
  doc.text("Prepared by Groundwork", margin, 270);

  // ── Page 2: About + Table of Contents ──
  addPage();

  sectionHeader("What's Inside");

  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.setTextColor(60, 60, 60);
  const aboutText =
    goalSummaries[goal] || defaultSummary;
  const aboutLines = doc.splitTextToSize(aboutText, contentW);
  doc.text(aboutLines, margin, y);
  y += aboutLines.length * 4.5 + 12;

  // Table of Contents heading
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  doc.setTextColor(8, 8, 8);
  doc.text("Table of Contents", margin, y);
  y += 10;

  // List all 10 implementations
  implementations.forEach((impl) => {
    checkSpace(10);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(34, 197, 94);
    doc.text(`#${impl.rank}`, margin + 2, y);
    doc.setTextColor(8, 8, 8);
    doc.text(impl.title, margin + 14, y);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120, 120, 120);
    doc.text(impl.category, margin + 100, y);
    doc.setTextColor(34, 197, 94);
    doc.setFont("helvetica", "bold");
    doc.text(`$${impl.savings.toLocaleString()}/yr`, W - margin, y, { align: "right" });
    doc.setTextColor(8, 8, 8);
    y += 8;
  });

  y += 8;

  // Key metrics summary
  checkSpace(50);
  doc.setFillColor(245, 245, 245);
  doc.rect(margin, y, contentW, 42, "F");
  y += 8;
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("Key Metrics", margin + 6, y);
  y += 8;

  const metrics = [
    ["Total Annual Savings", "$180,800+"],
    ["Implementations", "10"],
    ["Average ROI", "500%+"],
    ["Recommended Tools", "30+"],
    ["Implementation Time", "1-4 weeks each"],
    ["Difficulty", "60% Low, 40% Medium"],
  ];

  metrics.forEach((m, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = margin + 6 + col * (contentW / 2);
    const yPos = y + row * 8;
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    doc.text(m[0], x, yPos);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(8, 8, 8);
    doc.text(m[1], x + 60, yPos);
  });

  // ── Pages 3-22: Implementation Pages (all 10, ~2 pages each) ──
  implementations.forEach((impl) => {
    addPage();
    const guide = detailedGuides[impl.rank];
    const isRecommended = recommendedRanksSet.has(impl.rank);
    const industryData = industry ? industryContext[industry] : undefined;
    const goalData = goal ? goalFraming[goal] : undefined;

    // Section header with rank
    sectionHeader(impl.title, impl.rank);

    // RECOMMENDED badge if matches pain points
    if (isRecommended) {
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(34, 197, 94);
      doc.text("RECOMMENDED BASED ON YOUR PAIN POINTS", margin, y);
      doc.setTextColor(8, 8, 8);
      y += 7;
    }

    // Description
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    const descLines = doc.splitTextToSize(impl.description, contentW);
    doc.text(descLines, margin, y);
    doc.setTextColor(8, 8, 8);
    y += descLines.length * 4.5 + 6;

    // Savings / Difficulty / Timeline row
    checkSpace(12);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(34, 197, 94);
    doc.text(`$${impl.savings.toLocaleString()}/yr savings`, margin, y);
    doc.setTextColor(8, 8, 8);
    doc.setFont("helvetica", "normal");
    doc.text(`Difficulty: ${impl.difficulty}`, margin + 55, y);
    doc.text(`Timeline: ${impl.time}`, margin + 105, y);
    y += 10;

    // Recommended Tools table with clickable links
    checkSpace(30);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(8, 8, 8);
    doc.text("Recommended Tools", margin, y);
    y += 6;

    // Table header
    doc.setFillColor(245, 245, 245);
    doc.rect(margin, y - 3, contentW, 7, "F");
    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(100, 100, 100);
    doc.text("Tool", margin + 3, y + 1);
    doc.text("Price", margin + 80, y + 1);
    doc.setTextColor(8, 8, 8);
    y += 7;

    impl.tools.forEach((tool) => {
      checkSpace(8);
      doc.setFontSize(8);
      const url = toolUrls[tool.name];
      if (url) {
        doc.setTextColor(37, 99, 235);
        doc.setFont("helvetica", "bold");
        doc.textWithLink(tool.name, margin + 3, y, { url });
      } else {
        doc.setFont("helvetica", "bold");
        doc.setTextColor(8, 8, 8);
        doc.text(tool.name, margin + 3, y);
      }
      doc.setFont("helvetica", "normal");
      doc.setTextColor(8, 8, 8);
      doc.text(tool.price, margin + 80, y);
      y += 6;
    });
    y += 6;

    // Step-by-Step Implementation
    checkSpace(20);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(8, 8, 8);
    doc.text("Step-by-Step Implementation", margin, y);
    y += 7;

    guide.steps.forEach((step, idx) => {
      checkSpace(16);
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(8, 8, 8);
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
    doc.setTextColor(8, 8, 8);
    doc.text("Common Pitfalls", margin, y);
    y += 6;
    guide.pitfalls.forEach((pitfall) => {
      checkSpace(10);
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
    doc.setTextColor(8, 8, 8);
    doc.text("Key Performance Indicators", margin, y);
    y += 6;
    guide.kpis.forEach((kpi) => {
      checkSpace(10);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(34, 197, 94);
      const kpiLines = doc.splitTextToSize(`- ${kpi}`, contentW);
      doc.text(kpiLines, margin + 3, y);
      doc.setTextColor(8, 8, 8);
      y += kpiLines.length * 4 + 2;
    });
    y += 4;

    // Industry Context box (if industry matches)
    if (industryData && industryData[impl.rank]) {
      checkSpace(28);
      const contextText = industryData[impl.rank];
      const contextLines = doc.splitTextToSize(contextText, contentW - 14);
      const boxHeight = contextLines.length * 4 + 12;
      doc.setFillColor(239, 246, 255);
      doc.rect(margin, y - 2, contentW, boxHeight, "F");
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(37, 99, 235);
      doc.text("Industry Insight:", margin + 5, y + 5);
      doc.setFont("helvetica", "normal");
      doc.text(contextLines, margin + 5, y + 11);
      doc.setTextColor(8, 8, 8);
      y += boxHeight + 6;
    }

    // Goal Framing box (if goal matches)
    if (goalData && goalData[impl.rank]) {
      checkSpace(28);
      const framingText = goalData[impl.rank];
      const framingLines = doc.splitTextToSize(framingText, contentW - 14);
      const boxHeight = framingLines.length * 4 + 12;
      doc.setFillColor(255, 251, 235);
      doc.rect(margin, y - 2, contentW, boxHeight, "F");
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(180, 100, 0);
      const goalLabel =
        goal === "cut-costs"
          ? "Cost Savings:"
          : goal === "save-time"
            ? "Time Savings:"
            : goal === "win-customers"
              ? "Customer Growth:"
              : goal === "scale-without-hiring"
                ? "Scale Without Hiring:"
                : "Competitive Edge:";
      doc.text(goalLabel, margin + 5, y + 5);
      doc.setFont("helvetica", "normal");
      doc.text(framingLines, margin + 5, y + 11);
      doc.setTextColor(8, 8, 8);
      y += boxHeight + 6;
    }
  });

  // ── Footer on every page ──
  const totalPages = doc.getNumberOfPages();
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    // Thin line
    doc.setDrawColor(200, 200, 200);
    doc.setLineWidth(0.3);
    doc.line(margin, 282, W - margin, 282);
    // GROUNDWORK left
    doc.setFontSize(7);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(180, 180, 180);
    doc.text("GROUNDWORK", margin, 288);
    // Page number right
    doc.setFont("helvetica", "normal");
    doc.text(`Page ${i} of ${totalPages}`, W - margin, 288, { align: "right" });
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
