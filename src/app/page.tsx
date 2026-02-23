"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { LogoIcon, LogoFull } from "@/components/Logo";

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

function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={className} style={{ opacity: 0, transform: "translateY(40px)", transition: `all 0.8s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms` }}>
      {children}
    </div>
  );
}

function ScaleReveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
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
    <div ref={ref} className={className} style={{ opacity: 0, transform: "scale(0.92)", transition: `all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ${delay}ms` }}>
      {children}
    </div>
  );
}

function HeroCTA({ label = "Get Your Free Report", dark = false }: { label?: string; dark?: boolean }) {
  return (
    <Link href="/questionnaire" aria-label={label} className={`group relative inline-flex items-center gap-2 sm:gap-3 font-semibold px-7 sm:px-10 py-4 sm:py-5 rounded-full text-sm sm:text-base overflow-hidden transition-all duration-300 active:scale-[0.97] ${dark ? "bg-white text-[var(--black)] hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] animate-pulse-glow-white" : "bg-[var(--black)] text-white hover:shadow-[0_4px_50px_rgba(0,0,0,0.3)] animate-pulse-glow"}`}>
      <span className={`absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[800ms] ease-out ${dark ? "bg-gradient-to-r from-transparent via-black/5 to-transparent" : "bg-gradient-to-r from-transparent via-white/20 to-transparent"}`} />
      <span className="relative z-10">{label}</span>
      <span className="relative z-10 group-hover:translate-x-2 transition-transform duration-300">
        <svg width="20" height="20" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 9H14M10 4.5L14.5 9L10 13.5" /></svg>
      </span>
    </Link>
  );
}

const industries = [
  "Construction", "Healthcare", "E-Commerce", "Real Estate", "SaaS & Technology",
  "Manufacturing", "Professional Services", "Trades & Home Services", "Finance & Insurance",
  "Hospitality", "Transportation & Logistics", "Education", "Marketing Agencies",
  "Fitness & Wellness", "Automotive", "Nonprofits", "Agriculture", "Legal Services",
];

function AnimatedStat({ value, prefix = "", suffix = "" }: { value: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
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
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, prefix, suffix]);
  return <span ref={ref}>{prefix}0{suffix}</span>;
}

const valueStack = [
  { icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>), title: "Custom AI Roadmap for Your Business", desc: "We map every AI opportunity across your operations, sales, customer service, and back office. You see exactly what to implement, in what order, and what each change is worth in dollars." },
  { icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>), title: "Automate What Drains Your Time", desc: "Invoicing, scheduling, follow-ups, data entry, reporting. We identify the tasks eating your hours and implement AI systems that handle them automatically so your team can focus on revenue." },
  { icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10" /></svg>), title: "Scale Without Hiring", desc: "AI lets a 10-person team operate like a 30-person team. We show you exactly where AI agents, chatbots, and automation can replace the need to hire, saving you six figures in payroll." },
  { icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" /><path d="M9 15l2 2 4-4" /></svg>), title: "Full Implementation, Not Just Advice", desc: "We do not hand you a PDF and wish you luck. Groundwork walks your team through every tool, every integration, every workflow change. Training, setup, vendor selection, rollout. All of it." },
  { icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>), title: "Win More Customers with AI", desc: "AI-powered lead follow-up, proposal generation, review management, and customer communication. Close more deals faster and never let a lead slip through the cracks again." },
  { icon: (<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18" /><polyline points="17,6 23,6 23,12" /></svg>), title: "Stay Ahead Permanently", desc: "AI moves fast. Every quarter we reassess your business and find new opportunities. Your competitors scramble to keep up while you are already two steps ahead." },
];

/* ── How It Works step visuals ─────────────────────── */

export default function Home() {
  return (
    <main className="dot-grid min-h-screen">
      <a href="#how-it-works" className="skip-link">Skip to content</a>
      <Navbar />

      {/* ═══════════════ HERO ═══════════════ */}
      <section aria-label="Hero" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 pt-20 sm:pt-0">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(0,0,0,0.02), transparent)" }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <RevealSection>
            <div className="inline-flex items-center gap-2 bg-[var(--light-surface)] border border-black/5 rounded-full px-3 sm:px-4 py-1.5 mb-6 sm:mb-8 animate-float">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] sm:text-xs font-medium text-[var(--mid-gray)]">Free AI opportunity report for your business</span>
            </div>
          </RevealSection>
          <RevealSection delay={150}>
            <h1 className="text-[32px] sm:text-[52px] md:text-[62px] font-extrabold tracking-[-0.035em] leading-[1.08] mb-5 sm:mb-6">
              We implement AI<br />into your business.<br />
              <span className="text-[var(--mid-gray)]">You grow and scale.</span>
            </h1>
          </RevealSection>
          <RevealSection delay={300}>
            <p className="text-base sm:text-lg text-[var(--mid-gray)] max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
              Most businesses lose thousands every month on problems AI already solves. We find exactly where, show you the dollar amount, and then implement every solution for you.
            </p>
          </RevealSection>
          <RevealSection delay={450}>
            <div className="flex flex-col items-center gap-3">
              <HeroCTA />
              <p className="text-[11px] text-[var(--mid-gray)]/40">Free · No credit card · Takes about 15 minutes</p>
              <div className="flex items-center gap-4 mt-4">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-7 h-7 rounded-full bg-[var(--light-surface)] border-2 border-white flex items-center justify-center text-[8px] font-bold text-[var(--mid-gray)]">
                      {["JF", "SK", "MR", "AL"][i]}
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-[var(--mid-gray)]/50"><span className="font-semibold text-[var(--mid-gray)]">127 businesses</span> analyzed this month</p>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════ INDUSTRY TICKER ═══════════════ */}
      <section aria-label="Industries served" className="border-y border-black/5 overflow-hidden">
        <div className="py-4 px-6">
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--mid-gray)]/40 mb-4">Trusted across industries</p>
        </div>
        <div className="pb-5 relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="flex gap-8 animate-ticker whitespace-nowrap">
            {[...industries, ...industries].map((ind, i) => (
              <span key={i} className="inline-flex items-center gap-2.5 text-sm font-medium text-[var(--mid-gray)]/60 whitespace-nowrap">
                <span className="w-1 h-1 bg-black/20 rounded-full" />{ind}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ THE PROBLEM ═══════════════ */}
      <section aria-label="The problem AI solves" className="py-16 sm:py-28 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <RevealSection className="text-center mb-10 sm:mb-16">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--mid-gray)]/40 mb-4">The Problem</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-4 sm:mb-6">AI is not optional anymore. It is the new standard.</h2>
            <p className="text-[var(--mid-gray)] text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">The businesses that figure out AI first will dominate their market. The ones that wait will spend the next five years wondering what happened.</p>
          </RevealSection>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            {[
              { value: 72, suffix: "%", label: "of business owners want to use AI but have no idea where to start", source: "U.S. Chamber of Commerce, 2025" },
              { value: 27400, prefix: "$", label: "in average monthly savings discovered per business we analyze", source: "Groundwork analysis, 2026" },
              { value: 3, suffix: "x", label: "faster growth for businesses that implement AI across operations", source: "McKinsey Global Survey, 2025" },
            ].map((stat, i) => (
              <ScaleReveal key={i} delay={i * 150}>
                <div className="text-center p-6 sm:p-8 bg-white border border-black/5 rounded-2xl hover:border-black/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                  <div className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-2 sm:mb-3"><AnimatedStat value={stat.value} prefix={stat.prefix} suffix={stat.suffix} /></div>
                  <p className="text-sm text-[var(--mid-gray)] leading-relaxed mb-2">{stat.label}</p>
                  <p className="text-[9px] text-[var(--mid-gray)]/30 italic">{stat.source}</p>
                </div>
              </ScaleReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px w-full animate-gradient-line" />

      {/* ═══════════════ WHO THIS IS FOR ═══════════════ */}
      <section aria-label="Who this is for" className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <RevealSection className="text-center mb-10 sm:mb-14">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--mid-gray)]/40 mb-4">Who This Is For</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">You know AI matters. You just need someone to show you where.</h2>
          </RevealSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {[
              { text: "Business owners with 5-200 employees who are too busy running operations to research AI", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
              { text: "Contractors, trades, and service businesses losing hours every week to manual processes", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg> },
              { text: "Companies spending $5K+/month on tasks that AI handles in seconds", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg> },
              { text: "Founders who have tried ChatGPT but have not figured out how to make it save real money", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg> },
            ].map((item, i) => (
              <ScaleReveal key={i} delay={i * 80}>
                <div className="flex items-start gap-4 bg-white border border-black/5 rounded-xl p-5 hover:border-black/10 hover:shadow-md transition-all duration-300">
                  <div className="w-9 h-9 bg-[var(--light-surface)] rounded-lg flex items-center justify-center shrink-0 text-[var(--mid-gray)]">{item.icon}</div>
                  <p className="text-sm leading-relaxed">{item.text}</p>
                </div>
              </ScaleReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px w-full animate-gradient-line" />

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section id="how-it-works" className="py-16 sm:py-28 px-4 sm:px-6 bg-[var(--light-surface)]">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="text-center mb-12 sm:mb-20">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--mid-gray)]/40 mb-3">How It Works</p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight">From blind spots to bottom line</h2>
            <p className="text-[var(--mid-gray)] mt-3 sm:mt-4 max-w-lg mx-auto text-sm sm:text-base">Three steps. No jargon. No mystery.</p>
          </RevealSection>

          <div className="space-y-8">
            {[
              {
                title: "Tell us about your business",
                desc: "Answer questions about your operations, customers, tech stack, and goals. Like sitting down with a consultant who actually listens, except it takes 15 minutes, not 15 meetings.",
                visual: (
                  <div className="space-y-2.5">
                    {["Company & Industry", "Operations & Workflows", "Technology Stack", "Customers & Revenue", "Goals & Priorities"].map((s, i) => (
                      <div key={s} className="flex items-center gap-3">
                        <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${i < 3 ? "bg-[var(--black)] text-white" : "bg-black/5 text-[var(--mid-gray)]"}`}>
                          {i < 3 ? (<svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M2.5 7L5.5 10L11.5 4" /></svg>) : String(i + 1)}
                        </span>
                        <span className={`text-sm ${i < 3 ? "font-medium" : "text-[var(--mid-gray)]"}`}>{s}</span>
                      </div>
                    ))}
                  </div>
                ),
              },
              {
                title: "We analyze everything",
                desc: "Your answers are cross-referenced against industry benchmarks, cost data, and competitive intelligence to build a report specific to your business, not a generic template.",
                visual: (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs">
                      <span className="w-2 h-2 bg-[var(--black)] rounded-full animate-pulse" />
                      <span className="text-[var(--mid-gray)]">Processing business data...</span>
                    </div>
                    <div className="h-2 bg-black/5 rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--black)] rounded-full" style={{ width: "78%" }} />
                    </div>
                    <div className="grid grid-cols-2 gap-2 mt-3">
                      {["Industry Benchmarks", "Cost Analysis", "Tool Mapping", "Competitor Data"].map((label) => (
                        <div key={label} className="bg-black/[0.03] rounded-lg px-3 py-2 text-[11px] font-medium text-[var(--mid-gray)]">{label}</div>
                      ))}
                    </div>
                  </div>
                ),
              },
              {
                title: "Get your roadmap, then we build it",
                desc: "You receive a detailed report with dollar-amount projections and quick wins. Then Groundwork helps you implement every recommendation: tools, training, vendor selection, full rollout.",
                visual: (
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-[var(--mid-gray)]">Projected Annual Savings</div>
                    <div className="text-3xl font-extrabold tracking-tight">$142,800</div>
                    <div className="flex gap-2">
                      <span className="bg-green-50 text-green-700 text-[11px] font-semibold px-2.5 py-1 rounded-full">↑ 580% ROI</span>
                      <span className="bg-black/[0.03] text-[var(--mid-gray)] text-[11px] font-semibold px-2.5 py-1 rounded-full">18 opportunities</span>
                    </div>
                    <div className="border-t border-black/5 pt-3 mt-1">
                      <div className="text-[11px] font-bold text-[var(--mid-gray)] mb-2">Quick Wins</div>
                      {["Automate invoice processing", "AI-powered lead follow-up", "Smart scheduling system"].map((w) => (
                        <div key={w} className="flex items-center gap-2 text-xs py-1">
                          <span className="w-1.5 h-1.5 bg-[var(--black)] rounded-full" />{w}
                        </div>
                      ))}
                    </div>
                  </div>
                ),
              },
            ].map((step, i) => (
              <ScaleReveal key={i} delay={i * 120}>
                <div className="group grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 bg-white border border-black/5 rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 hover:border-black/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-500">
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4 sm:mb-5">
                      <span className="w-7 sm:w-8 h-7 sm:h-8 bg-[var(--black)] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">{i + 1}</span>
                      <span className="h-px flex-1 bg-black/5" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-2 sm:mb-3">{step.title}</h3>
                    <p className="text-[var(--mid-gray)] leading-relaxed text-sm sm:text-[15px]">{step.desc}</p>
                  </div>
                  <div className="bg-[var(--light-surface)] group-hover:bg-black/[0.03] rounded-2xl p-6 md:p-8 transition-colors duration-500">
                    {step.visual}
                  </div>
                </div>
              </ScaleReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHAT YOU GET ═══════════════ */}
      <section id="features" className="py-16 sm:py-28 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="text-center mb-12 sm:mb-20">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--mid-gray)]/40 mb-3">What You Get</p>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight">Not just a report. A growth engine.</h2>
            <p className="text-[var(--mid-gray)] mt-3 sm:mt-4 max-w-lg mx-auto text-sm sm:text-base">We find the AI opportunities hiding in your business, build the implementation plan, and walk you through every step until it is running.</p>
          </RevealSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {valueStack.map((item, i) => (
              <ScaleReveal key={i} delay={i * 80}>
                <div className="group h-full bg-white border border-black/5 rounded-2xl p-7 hover:border-black/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                  <div className="w-10 h-10 bg-[var(--light-surface)] rounded-xl flex items-center justify-center mb-5 group-hover:bg-[var(--black)] group-hover:text-white group-hover:scale-110 transition-all duration-300">{item.icon}</div>
                  <h3 className="text-sm font-bold mb-2">{item.title}</h3>
                  <p className="text-[var(--mid-gray)] text-xs leading-relaxed">{item.desc}</p>
                </div>
              </ScaleReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ COMPARISON ═══════════════ */}
      <section aria-label="Comparison" className="py-16 sm:py-24 px-4 sm:px-6 bg-[var(--light-surface)]">
        <div className="max-w-4xl mx-auto">
          <RevealSection className="text-center mb-10 sm:mb-14">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--mid-gray)]/40 mb-3">The Alternative</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-3">Why not just hire a consultant?</h2>
            <p className="text-[var(--mid-gray)] text-sm sm:text-base max-w-xl mx-auto">61% of businesses that hired AI consultants saw no measurable ROI. We built Groundwork so you do not become a statistic.</p>
          </RevealSection>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white border border-black/5 rounded-2xl p-6 sm:p-7">
              <div className="text-xs font-bold uppercase tracking-wider text-red-500/70 mb-4">Traditional AI Consulting</div>
              <div className="space-y-3">
                {[
                  "$5,000 to $25,000+ per engagement",
                  "Weeks of meetings before anything happens",
                  "Deliverable is a PDF you never open again",
                  "Generic recommendations across industries",
                  "Implementation is extra (and expensive)",
                  "No tracking. No accountability. No updates.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" className="shrink-0 mt-0.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                    <span className="text-sm text-[var(--mid-gray)]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[var(--black)] text-white rounded-2xl p-6 sm:p-7">
              <div className="text-xs font-bold uppercase tracking-wider text-green-400/70 mb-4">Groundwork</div>
              <div className="space-y-3">
                {[
                  "Free AI opportunity report with your exact numbers",
                  "Results in 15 minutes, not 15 meetings",
                  "Interactive dashboard you actually use",
                  "Customized to your business, industry, and team",
                  "Implementation playbooks included at no extra cost",
                  "Quarterly reassessments. ROI tracking. Always current.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" className="shrink-0 mt-0.5"><polyline points="20,6 9,17 4,12"/></svg>
                    <span className="text-sm text-white/80">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ REALITY CHECK (upgraded) ═══════════════ */}
      <RevealSection>
        <section className="relative overflow-hidden">
          {/* Top edge */}

          <div className="bg-[var(--black)] text-white relative px-4 sm:px-6 py-16 sm:py-24">
            {/* Dot grid */}
            <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

            {/* Animated glow orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] rounded-full opacity-[0.04] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,100,100,0.4), transparent 70%)" }} />

            <div className="max-w-3xl mx-auto text-center relative z-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-4 sm:mb-6">The Reality Check</p>

              <h2 className="text-2xl sm:text-4xl md:text-[56px] font-extrabold tracking-tight mb-8 sm:mb-10 leading-tight">
                While you are figuring out AI,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-500">your competitors already did.</span>
              </h2>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-xl mx-auto mb-8 sm:mb-10">
                {[
                  { num: "47%", label: "of SMBs now use AI" },
                  { num: "2.3x", label: "faster deal cycles" },
                  { num: "$328K", label: "avg annual savings" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-xl sm:text-2xl md:text-3xl font-extrabold mb-1">{s.num}</div>
                    <div className="text-[9px] sm:text-[10px] text-white/40 uppercase tracking-wider">{s.label}</div>
                  </div>
                ))}
              </div>

              <p className="text-white text-base sm:text-lg max-w-xl mx-auto mb-4 leading-relaxed">
                They are closing deals faster. Spending less on operations. Scaling without adding headcount. Every week you wait, the gap between you and them gets wider.
              </p>
              <p className="text-white/60 text-sm sm:text-base max-w-lg mx-auto mb-8 sm:mb-12 leading-relaxed">
                The free report takes 15 minutes. It will show you exactly what they are doing that you are not. The only risk is not looking.
              </p>
              <HeroCTA label="See What You Are Missing" dark />
            </div>
          </div>

          {/* Bottom edge */}
        </section>
      </RevealSection>

      {/* ═══════════════ FAQ ═══════════════ */}
      <RevealSection>
        <section className="py-16 sm:py-24 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10 sm:mb-14">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--mid-gray)]/40 mb-3">Questions</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">Before you ask.</h2>
            </div>
            <div className="space-y-3">
              {[
                { q: "Is the report actually free?", a: "Yes. The AI opportunity report, readiness score, and competitive analysis are 100% free. No credit card. No sales call. No catch. We make money when you decide you want help implementing the recommendations." },
                { q: "How long does the questionnaire take?", a: "About 15 minutes. There are 37 questions across 7 sections. The more specific you are, the more accurate your savings projections will be." },
                { q: "How accurate are the savings projections?", a: "We use conservative estimates (70% of maximum reported savings) based on your responses, industry benchmarks, and current tool pricing. Most businesses that follow our playbooks hit 80-120% of projected savings within 90 days." },
                { q: "What if I already use some AI tools?", a: "Great. The assessment accounts for your current tech stack and identifies gaps and upgrades. Even businesses with existing AI typically find 5-10 additional opportunities they had not considered." },
                { q: "Do I need technical skills to implement the recommendations?", a: "No. Our Quick Wins are specifically designed for non-technical business owners. Each playbook includes step-by-step instructions, recommended tools with pricing, and expected timelines. If you can set up a social media account, you can implement these." },
                { q: "What industries do you cover?", a: "All of them. We have analyzed businesses in construction, healthcare, real estate, e-commerce, professional services, trades, SaaS, and more. The questionnaire adapts to your specific industry and business model." },
                { q: "What happens after I get the report?", a: "You get full access to your interactive dashboard with implementation playbooks, ROI tracking, competitive intelligence, and quarterly reassessments. Start implementing at your own pace, or upgrade to our Hands-Off ($297/mo) or Hands-On ($997/mo) plans for guided implementation." },
              ].map((item) => (
                <details key={item.q} className="group bg-white border border-black/5 rounded-xl overflow-hidden hover:border-black/10 transition-colors">
                  <summary className="flex items-center justify-between p-4 sm:p-5 cursor-pointer list-none">
                    <span className="text-sm font-semibold pr-4">{item.q}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-[var(--mid-gray)] shrink-0 group-open:rotate-180 transition-transform"><polyline points="6,9 12,15 18,9"/></svg>
                  </summary>
                  <div className="px-4 sm:px-5 pb-4 sm:pb-5 border-t border-black/5 pt-3">
                    <p className="text-sm text-[var(--mid-gray)] leading-relaxed">{item.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* Duplicate comparison section removed — first one at "The Alternative" is stronger */}

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <RevealSection>
        <section className="py-16 sm:py-28 px-4 sm:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <LogoIcon className="h-8 sm:h-10 w-8 sm:w-10 mx-auto mb-6 sm:mb-8 opacity-10 animate-float" />
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              The businesses that move first<br />win the most.
            </h2>
            <p className="text-[var(--mid-gray)] text-base sm:text-lg mb-8 sm:mb-12 max-w-lg mx-auto leading-relaxed">
              Get the free report. See the numbers. Then let us implement it.
              <br /><span className="font-medium text-[var(--black)]">There is literally nothing to lose.</span>
            </p>
            <HeroCTA />
          </div>
        </section>
      </RevealSection>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer aria-label="Footer" className="border-t border-black/5 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 sm:gap-4">
            <div className="flex flex-col items-center sm:items-start gap-2">
              <LogoFull className="h-5 w-auto opacity-30" />
              <p className="text-[10px] text-[var(--mid-gray)]/30 max-w-[220px] text-center sm:text-left leading-relaxed">AI implementation intelligence for businesses that want to stop guessing and start saving.</p>
            </div>
            <div className="flex gap-8 sm:gap-12">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--mid-gray)]/30">Product</span>
                <Link href="/questionnaire" className="text-xs text-[var(--mid-gray)] hover:text-[var(--black)] transition-colors">Free Report</Link>
                <Link href="#how-it-works" className="text-xs text-[var(--mid-gray)] hover:text-[var(--black)] transition-colors">How It Works</Link>
                <Link href="#features" className="text-xs text-[var(--mid-gray)] hover:text-[var(--black)] transition-colors">Features</Link>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[var(--mid-gray)]/30">Company</span>
                <Link href="/privacy" className="text-xs text-[var(--mid-gray)] hover:text-[var(--black)] transition-colors">Privacy</Link>
                <Link href="/terms" className="text-xs text-[var(--mid-gray)] hover:text-[var(--black)] transition-colors">Terms</Link>
                <a href="mailto:hello@groundwork.ai" className="text-xs text-[var(--mid-gray)] hover:text-[var(--black)] transition-colors">Contact</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-4 border-t border-black/5 text-center">
            <p className="text-[10px] text-[var(--mid-gray)]/30">© 2026 Groundwork. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
