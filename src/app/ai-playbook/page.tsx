"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogoFull } from "@/components/Logo";

/* ── Animation helpers (from homepage) ──────────── */

function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = "1";
          (entry.target as HTMLElement).style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function RevealSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(40px)",
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function ScaleReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = "1";
          (entry.target as HTMLElement).style.transform = "scale(1)";
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: "scale(0.92)",
        transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function AnimatedStat({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 1800;
          const startTime = performance.now();
          const animate = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            el.textContent = `${prefix}${Math.round(eased * value).toLocaleString()}${suffix}`;
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, prefix, suffix]);
  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}

/* ── Data ───────────────────────────────────────── */

const implementations = [
  {
    rank: 1,
    category: "Sales",
    title: "AI-Powered Lead Follow-Up",
    savings: 37200,
    difficulty: "Low" as const,
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
    why: "Speed-to-lead is the #1 predictor of conversion. Responding in 2 minutes vs. 4 hours increases close rates by 391%. AI handles the speed; your team handles the relationship.",
  },
  {
    rank: 2,
    category: "Customer Experience",
    title: "AI Customer Support Chatbot",
    savings: 33600,
    difficulty: "Medium" as const,
    time: "2-3 weeks",
    description:
      "Handle 60-70% of support tickets automatically with an AI chatbot trained on your specific products, pricing, and policies. Escalates complex issues to humans with full context.",
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
    why: "Support costs scale linearly with customers. AI chatbots break that curve — handling 60-70% of tickets means you can 3x customers without 3x support staff.",
  },
  {
    rank: 3,
    category: "Operations",
    title: "Invoice & Document Automation",
    savings: 28800,
    difficulty: "Low" as const,
    time: "1-2 weeks",
    description:
      "Replace manual invoice entry with AI-powered OCR that extracts line items, validates against POs, and auto-routes for approval. Processes 500+ invoices/month with 98% accuracy.",
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
    category: "Back Office",
    title: "Automated Report Generation",
    savings: 22800,
    difficulty: "Low" as const,
    time: "1-2 weeks",
    description:
      "Generate weekly/monthly business reports automatically. AI pulls data from your tools, identifies trends, flags anomalies, and creates executive summaries. Saves 8-12 hours of manual reporting per month.",
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
    why: "Reporting is necessary but not value-creating. Every hour spent compiling data is an hour not spent acting on it. AI compiles; your team decides.",
  },
  {
    rank: 5,
    category: "Operations",
    title: "Smart Scheduling System",
    savings: 21600,
    difficulty: "Low" as const,
    time: "2-3 weeks",
    description:
      "AI scheduling that eliminates back-and-forth emails, auto-considers team availability, client preferences, and travel time. Reduces scheduling overhead by 80%.",
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
    why: "The average professional spends 4.8 hours/week on scheduling. For a 10-person team, that's 2,496 hours/year — equivalent to 1.2 full-time employees just coordinating calendars.",
  },
  {
    rank: 6,
    category: "Sales & Marketing",
    title: "Content Generation Pipeline",
    savings: 9600,
    difficulty: "Medium" as const,
    time: "2-3 weeks",
    description:
      "AI-assisted content creation for blog posts, social media, email campaigns, and ad copy. Human-guided AI produces 10x more content at 20% of the cost of hiring writers.",
    tools: [
      { name: "Jasper", price: "$49/mo" },
      { name: "Copy.ai", price: "$36/mo" },
      { name: "Writer.com", price: "$18/mo" },
    ],
    steps: [
      "Audit current content output and publishing frequency",
      "Create brand voice guidelines for the AI to follow",
      "Set up templates for each content type (blog, social, email)",
      "Establish a human review workflow for quality control",
      "Scale to 3-5x current publishing frequency over 30 days",
    ],
    why: "Content marketing compounds. A blog post published today generates traffic for years. AI lets you publish 10x more, which means 10x more compounding assets.",
  },
  {
    rank: 7,
    category: "Sales & Marketing",
    title: "Predictive Lead Scoring",
    savings: 7200,
    difficulty: "Medium" as const,
    time: "3-4 weeks",
    description:
      "AI analyzes lead behavior, demographics, and engagement to predict which leads will convert. Sales team focuses on the top 20% instead of chasing everyone equally.",
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
    why: "Sales reps spend 65% of their time on leads that will never buy. Predictive scoring flips that — 65% of their time goes to the 20% most likely to close.",
  },
  {
    rank: 8,
    category: "Operations",
    title: "Inventory Forecasting",
    savings: 7200,
    difficulty: "Medium" as const,
    time: "3-4 weeks",
    description:
      "AI predicts demand patterns, seasonal trends, and supply chain disruptions to optimize inventory levels. Reduces stockouts by 40% and overstock by 30%.",
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
    why: "Carrying excess inventory costs 20-30% of its value annually. Stockouts cost 4.1% of revenue. AI threading this needle saves both ways.",
  },
  {
    rank: 9,
    category: "Customer Experience",
    title: "Sentiment Analysis",
    savings: 7200,
    difficulty: "Medium" as const,
    time: "2-3 weeks",
    description:
      "AI monitors customer reviews, support tickets, and social mentions to detect sentiment shifts in real-time. Catch problems before they become public crises.",
    tools: [
      { name: "MonkeyLearn", price: "$29/mo" },
      { name: "Brandwatch", price: "$99/mo" },
      { name: "Sprout Social", price: "$89/mo" },
    ],
    steps: [
      "Connect all customer feedback channels (reviews, tickets, social)",
      "Set up sentiment classification (positive, neutral, negative)",
      "Configure real-time alerts for negative sentiment spikes",
      "Create response templates for common complaint categories",
      "Build a weekly sentiment dashboard for leadership review",
    ],
    why: "A single negative review costs an average of 30 lost customers. Catching and resolving issues before they go public is worth 10x the cost of the tool.",
  },
  {
    rank: 10,
    category: "Back Office",
    title: "HR/Hiring AI Screening",
    savings: 5600,
    difficulty: "Medium" as const,
    time: "3-4 weeks",
    description:
      "AI screens resumes, ranks candidates by fit, and automates initial outreach. Reduces time-to-hire by 40% while increasing candidate quality scores.",
    tools: [
      { name: "Lever", price: "$49/mo" },
      { name: "Greenhouse AI", price: "$79/mo" },
      { name: "HireVue", price: "$35/mo" },
    ],
    steps: [
      "Define ideal candidate profiles for each open role",
      "Upload last 12 months of hiring data (applications, outcomes)",
      "Configure screening criteria and knockout questions",
      "Set up automated candidate communication sequences",
      "Review and adjust scoring after 30 days of hires",
    ],
    why: "A bad hire costs 30% of their annual salary. AI screening doesn't eliminate bad hires, but it reduces them by 35% by surfacing better-fit candidates faster.",
  },
];

const totalSavings = implementations.reduce((sum, impl) => sum + impl.savings, 0);

const competitorStats = [
  { area: "Customer Service AI", yours: 0, industry: 64, gap: "critical" as const },
  { area: "Automated Billing", yours: 0, industry: 41, gap: "high" as const },
  { area: "AI Lead Generation", yours: 0, industry: 37, gap: "medium" as const },
  { area: "Predictive Scheduling", yours: 0, industry: 52, gap: "high" as const },
  { area: "AI Content Marketing", yours: 0, industry: 29, gap: "medium" as const },
  { area: "Data Analytics/BI", yours: 0, industry: 58, gap: "critical" as const },
];

const implementationPhases = [
  {
    phase: "Week 1-2",
    title: "Quick Wins",
    count: 3,
    savings: "$7,300/mo",
    description: "Low-effort, high-impact automations you can deploy immediately.",
    items: ["Lead follow-up AI", "Invoice automation", "Smart scheduling"],
  },
  {
    phase: "Week 3-6",
    title: "Core Automations",
    count: 3,
    savings: "$4,500/mo additional",
    description: "Deeper integrations that build on the quick wins for compounding returns.",
    items: ["Support chatbot", "Report generation", "Content pipeline"],
  },
  {
    phase: "Month 2-3",
    title: "Growth Engines",
    count: 2,
    savings: "$1,200/mo additional",
    description: "Revenue-generating AI that directly impacts your top line.",
    items: ["Predictive lead scoring", "Inventory forecasting"],
  },
  {
    phase: "Month 3-6",
    title: "Strategic Plays",
    count: 2,
    savings: "$1,100/mo additional",
    description: "Long-term competitive advantages that compound over time.",
    items: ["Sentiment analysis", "HR/hiring screening"],
  },
];

const difficultyColor = {
  Low: "bg-green-50 text-green-700 border-green-200",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
};

const gapColor = {
  critical: "bg-red-50 text-red-700",
  high: "bg-amber-50 text-amber-700",
  medium: "bg-yellow-50 text-yellow-700",
};

/* ── Implementation Card ────────────────────────── */

function ImplementationCard({
  impl,
  defaultOpen = false,
}: {
  impl: (typeof implementations)[0];
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-white border border-black/5 rounded-2xl overflow-hidden transition-shadow hover:shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-5 sm:p-6 flex items-start gap-4 text-left min-h-[48px]"
      >
        <div className="w-9 h-9 bg-[var(--black)] text-white rounded-xl flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
          {impl.rank}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--mid-gray)]">
              {impl.category}
            </span>
            <span
              className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${difficultyColor[impl.difficulty]}`}
            >
              {impl.difficulty}
            </span>
          </div>
          <h3 className="text-sm sm:text-base font-bold mb-1">
            {impl.title}
          </h3>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-[var(--mid-gray)]">
            <span className="font-extrabold text-[var(--black)] text-sm">
              ${impl.savings.toLocaleString()}/yr
            </span>
            <span>{impl.time}</span>
          </div>
        </div>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className={`text-[var(--mid-gray)] transition-transform shrink-0 mt-2 ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6,9 12,15 18,9" />
        </svg>
      </button>

      {open && (
        <div className="px-5 sm:px-6 pb-5 sm:pb-6 border-t border-black/5 pt-4 space-y-5">
          <p className="text-sm text-[var(--mid-gray)] leading-relaxed">
            {impl.description}
          </p>

          {/* Recommended tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--mid-gray)] mb-2">
              Recommended Tools
            </h4>
            <div className="flex flex-wrap gap-2">
              {impl.tools.map((tool) => (
                <span
                  key={tool.name}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[var(--light-surface)] rounded-full text-xs font-medium"
                >
                  {tool.name}
                  <span className="text-[var(--mid-gray)]">{tool.price}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Quick-start steps */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--mid-gray)] mb-2">
              Quick-Start Steps
            </h4>
            <ol className="space-y-2">
              {impl.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm">
                  <span className="w-5 h-5 bg-[var(--light-surface)] rounded-md flex items-center justify-center text-[10px] font-bold text-[var(--mid-gray)] shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-[var(--mid-gray)] leading-relaxed">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          {/* Why it works */}
          <div className="bg-[var(--light-surface)] rounded-xl p-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--mid-gray)] mb-1.5">
              Why This Works
            </h4>
            <p className="text-xs text-[var(--mid-gray)] leading-relaxed">
              {impl.why}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Main page ──────────────────────────────────── */

export default function AIPlaybookPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  // Access gate: check for email in localStorage
  useEffect(() => {
    try {
      const email = localStorage.getItem("gw_lead_email");
      if (!email) {
        router.replace("/free-report");
        return;
      }
      setAuthorized(true);
    } catch {
      router.replace("/free-report");
    }
  }, [router]);

  if (!authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-[var(--black)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="dot-grid min-h-screen">
      {/* ═══════════════ HERO ═══════════════ */}
      <section
        aria-label="Playbook hero"
        className="relative py-16 sm:py-24 px-4 sm:px-6"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(0,0,0,0.02), transparent)",
          }}
        />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <RevealSection>
            <div className="flex justify-center mb-6">
              <LogoFull className="h-7 sm:h-8" />
            </div>
          </RevealSection>

          <RevealSection delay={100}>
            <div className="inline-flex items-center gap-2 bg-[var(--light-surface)] border border-black/5 rounded-full px-3 sm:px-4 py-1.5 mb-6 animate-float">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] sm:text-xs font-medium text-[var(--mid-gray)]">
                2026 Edition · Updated Monthly
              </span>
            </div>
          </RevealSection>

          <RevealSection delay={200}>
            <h1 className="text-[28px] sm:text-[44px] md:text-[54px] font-extrabold tracking-[-0.035em] leading-[1.08] mb-5 sm:mb-6">
              The AI Profit Playbook
            </h1>
            <p className="text-base sm:text-lg text-[var(--mid-gray)] max-w-2xl mx-auto mb-8 leading-relaxed">
              The 10 highest-ROI AI implementations for 2026, ranked by annual
              savings. With specific tools, costs, and step-by-step instructions
              for each one.
            </p>
          </RevealSection>

          <RevealSection delay={350}>
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
              {[
                {
                  label: "total annual savings",
                  node: (
                    <span className="text-lg sm:text-xl font-extrabold">
                      <AnimatedStat
                        value={180}
                        prefix="$"
                        suffix="K+"
                      />
                    </span>
                  ),
                },
                {
                  label: "implementations",
                  node: (
                    <span className="text-lg sm:text-xl font-extrabold">
                      10
                    </span>
                  ),
                },
                {
                  label: "recommended tools",
                  node: (
                    <span className="text-lg sm:text-xl font-extrabold">
                      30+
                    </span>
                  ),
                },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  {s.node}
                  <span className="text-[10px] sm:text-[11px] text-[var(--mid-gray)]">
                    {s.label}
                  </span>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════ TOTAL SAVINGS BAR ═══════════════ */}
      <section className="border-t border-b border-black/5 bg-[var(--black)] text-white">
        <div className="max-w-4xl mx-auto py-5 px-4 sm:px-6 text-center">
          <p className="text-xs text-white/50 uppercase tracking-widest mb-1">
            Combined Annual Savings
          </p>
          <p className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            <AnimatedStat value={totalSavings} prefix="$" suffix="/yr" />
          </p>
        </div>
      </section>

      {/* ═══════════════ IMPLEMENTATION CARDS ═══════════════ */}
      <section
        aria-label="Implementations"
        className="py-14 sm:py-20 px-4 sm:px-6"
      >
        <div className="max-w-3xl mx-auto">
          <RevealSection className="mb-8 sm:mb-10">
            <h2 className="text-[22px] sm:text-[30px] font-extrabold tracking-[-0.03em] leading-tight mb-2">
              10 Implementations, Ranked by ROI
            </h2>
            <p className="text-sm text-[var(--mid-gray)]">
              Click any card to see recommended tools, step-by-step
              instructions, and why it works.
            </p>
          </RevealSection>

          <div className="space-y-3">
            {implementations.map((impl, i) => (
              <ScaleReveal key={impl.rank} delay={Math.min(i * 60, 400)}>
                <ImplementationCard impl={impl} defaultOpen={i < 3} />
              </ScaleReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ INDUSTRY BENCHMARKS ═══════════════ */}
      <section
        aria-label="Industry benchmarks"
        className="py-14 sm:py-20 px-4 sm:px-6 bg-[var(--light-surface)] border-t border-black/5"
      >
        <div className="max-w-3xl mx-auto">
          <RevealSection className="mb-8 sm:mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-[var(--mid-gray)] mb-3">
              Benchmark
            </p>
            <h2 className="text-[22px] sm:text-[30px] font-extrabold tracking-[-0.03em] leading-tight mb-2">
              How You Compare to Industry Averages
            </h2>
            <p className="text-sm text-[var(--mid-gray)]">
              Businesses without AI implementations score 0% in these areas.
              Here&apos;s what the average company in your industry has already adopted.
            </p>
          </RevealSection>

          <RevealSection delay={100}>
            <div className="bg-white border border-black/5 rounded-2xl overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-[1fr_60px_80px_60px] sm:grid-cols-[1fr_80px_100px_80px] gap-2 p-4 border-b border-black/5 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[var(--mid-gray)]">
                <span>Area</span>
                <span className="text-center">You</span>
                <span className="text-center">Industry Avg</span>
                <span className="text-center">Gap</span>
              </div>
              {/* Rows */}
              {competitorStats.map((stat) => (
                <div
                  key={stat.area}
                  className="grid grid-cols-[1fr_60px_80px_60px] sm:grid-cols-[1fr_80px_100px_80px] gap-2 p-4 border-b border-black/5 last:border-b-0 items-center"
                >
                  <span className="text-xs sm:text-sm font-medium">
                    {stat.area}
                  </span>
                  <span className="text-center text-xs font-bold text-red-500">
                    {stat.yours}%
                  </span>
                  <div className="flex items-center justify-center gap-2">
                    <div className="flex-1 h-1.5 bg-black/5 rounded-full overflow-hidden max-w-[50px]">
                      <div
                        className="h-full bg-[var(--black)] rounded-full"
                        style={{ width: `${stat.industry}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium">{stat.industry}%</span>
                  </div>
                  <div className="flex justify-center">
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-full capitalize ${gapColor[stat.gap]}`}
                    >
                      {stat.gap}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════ IMPLEMENTATION TIMELINE ═══════════════ */}
      <section
        aria-label="Implementation timeline"
        className="py-14 sm:py-20 px-4 sm:px-6"
      >
        <div className="max-w-3xl mx-auto">
          <RevealSection className="mb-8 sm:mb-10">
            <p className="text-xs font-semibold tracking-widest uppercase text-[var(--mid-gray)] mb-3">
              Timeline
            </p>
            <h2 className="text-[22px] sm:text-[30px] font-extrabold tracking-[-0.03em] leading-tight mb-2">
              Your 6-Month Implementation Roadmap
            </h2>
            <p className="text-sm text-[var(--mid-gray)]">
              Start with quick wins, build momentum, and layer in strategic
              plays over time.
            </p>
          </RevealSection>

          <div className="space-y-4">
            {implementationPhases.map((phase, i) => (
              <RevealSection key={i} delay={i * 100}>
                <div className="bg-white border border-black/5 rounded-2xl p-5 sm:p-6">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="text-xs font-bold bg-[var(--black)] text-white px-3 py-1 rounded-full">
                      {phase.phase}
                    </span>
                    <span className="text-sm font-bold">{phase.title}</span>
                    <span className="text-xs text-[var(--mid-gray)]">
                      {phase.count} implementations · {phase.savings}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--mid-gray)] mb-3 leading-relaxed">
                    {phase.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {phase.items.map((item) => (
                      <span
                        key={item}
                        className="text-[11px] font-medium px-2.5 py-1 bg-[var(--light-surface)] rounded-lg"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ BOTTOM CTA ═══════════════ */}
      <section
        aria-label="Get custom report"
        className="py-20 sm:py-28 px-4 sm:px-6 bg-[var(--black)] text-white"
      >
        <div className="max-w-3xl mx-auto text-center">
          <RevealSection>
            <p className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4">
              Next Step
            </p>
            <h2 className="text-[24px] sm:text-[36px] md:text-[42px] font-extrabold tracking-[-0.03em] leading-tight mb-4">
              Want These Numbers Customized
              <br className="hidden sm:block" /> For YOUR Business?
            </h2>
            <p className="text-sm sm:text-base text-white/60 max-w-xl mx-auto mb-10 leading-relaxed">
              The playbook above uses industry averages. Our free assessment
              analyzes your specific business — your team size, your tools, your
              processes — and shows you the exact dollar savings you can capture.
            </p>
          </RevealSection>

          <RevealSection delay={200}>
            <Link
              href="/questionnaire"
              className="group relative inline-flex items-center gap-2 sm:gap-3 font-semibold px-7 sm:px-10 py-4 sm:py-5 rounded-full text-sm sm:text-base overflow-hidden transition-all duration-300 active:scale-[0.97] bg-white text-[var(--black)] hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] animate-pulse-glow-white"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[800ms] ease-out bg-gradient-to-r from-transparent via-black/5 to-transparent" />
              <span className="relative z-10">
                Get Your Free Custom AI Report
              </span>
              <span className="relative z-10 group-hover:translate-x-2 transition-transform duration-300">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 18 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  aria-hidden="true"
                >
                  <path d="M4 9H14M10 4.5L14.5 9L10 13.5" />
                </svg>
              </span>
            </Link>
            <p className="text-[11px] text-white/30 mt-4">
              Free · Takes about 15 minutes · No credit card required
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="py-8 px-4 sm:px-6 border-t border-black/5">
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-3">
          <LogoFull className="h-5" />
          <span className="text-[11px] text-[var(--mid-gray)]">
            &copy; {new Date().getFullYear()} Groundwork. All rights reserved.
          </span>
        </div>
      </footer>
    </main>
  );
}
