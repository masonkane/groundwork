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
    <Link href="/questionnaire" className={`group relative inline-flex items-center gap-3 font-semibold px-10 py-5 rounded-full text-base overflow-hidden transition-all duration-300 active:scale-[0.97] ${dark ? "bg-white text-[var(--black)] hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] animate-pulse-glow-white" : "bg-[var(--black)] text-white hover:shadow-[0_4px_50px_rgba(0,0,0,0.3)] animate-pulse-glow"}`}>
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

/* ── Cal.com style mockup illustrations ───────────── */
function QuestionnaireVisual() {
  return (
    <div className="bg-white rounded-2xl border border-black/5 p-5 shadow-sm">
      {/* Form header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-black/10" />
        <div className="w-2 h-2 rounded-full bg-black/10" />
        <div className="w-2 h-2 rounded-full bg-black/10" />
      </div>
      {/* Progress bar */}
      <div className="h-1 bg-black/5 rounded-full mb-5">
        <div className="h-full w-3/5 bg-[var(--black)] rounded-full" />
      </div>
      {/* Question */}
      <div className="mb-4">
        <div className="h-3 w-48 bg-black/8 rounded mb-4" />
        <div className="h-2 w-64 bg-black/4 rounded mb-6" />
      </div>
      {/* Options */}
      {[true, false, false].map((selected, i) => (
        <div key={i} className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-2 border-2 transition-all ${selected ? "border-[var(--black)] bg-black/[0.02]" : "border-black/5"}`}>
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selected ? "border-[var(--black)]" : "border-black/10"}`}>
            {selected && <div className="w-2.5 h-2.5 rounded-full bg-[var(--black)]" />}
          </div>
          <div className={`h-2 rounded ${selected ? "w-32 bg-black/15" : i === 1 ? "w-40 bg-black/5" : "w-28 bg-black/5"}`} />
        </div>
      ))}
    </div>
  );
}

function AnalysisVisual() {
  return (
    <div className="bg-white rounded-2xl border border-black/5 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-black/10" />
        <div className="w-2 h-2 rounded-full bg-black/10" />
        <div className="w-2 h-2 rounded-full bg-black/10" />
      </div>
      {/* Processing indicator */}
      <div className="flex items-center gap-3 mb-5">
        <div className="w-3 h-3 bg-[var(--black)] rounded-full animate-pulse" />
        <div className="h-2 w-36 bg-black/8 rounded" />
      </div>
      {/* Data categories being analyzed */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        {[78, 62, 91, 45].map((pct, i) => (
          <div key={i} className="p-3 bg-[var(--light-surface)] rounded-xl">
            <div className="h-2 w-16 bg-black/8 rounded mb-2" />
            <div className="h-1.5 bg-black/5 rounded-full">
              <div className="h-full bg-[var(--black)] rounded-full" style={{ width: `${pct}%` }} />
            </div>
          </div>
        ))}
      </div>
      {/* Connections visualization */}
      <div className="flex items-center justify-between px-2">
        {[1,2,3,4,5].map((n) => (
          <div key={n} className="flex flex-col items-center gap-1">
            <div className="w-8 h-8 rounded-lg bg-black/[0.03] border border-black/5 flex items-center justify-center">
              <div className="w-3 h-3 rounded bg-black/10" />
            </div>
            <div className="h-0.5 w-0.5 bg-black/10 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ReportVisual() {
  return (
    <div className="bg-white rounded-2xl border border-black/5 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-black/10" />
        <div className="w-2 h-2 rounded-full bg-black/10" />
        <div className="w-2 h-2 rounded-full bg-black/10" />
      </div>
      {/* Big savings number */}
      <div className="mb-4">
        <div className="text-[10px] font-bold text-[var(--mid-gray)] mb-1">Projected Annual Savings</div>
        <div className="text-2xl font-extrabold tracking-tight">$142,800</div>
        <div className="flex gap-2 mt-2">
          <span className="bg-green-50 text-green-700 text-[9px] font-semibold px-2 py-0.5 rounded-full">↑ 580% ROI</span>
          <span className="bg-black/[0.03] text-[var(--mid-gray)] text-[9px] font-semibold px-2 py-0.5 rounded-full">18 found</span>
        </div>
      </div>
      {/* Mini chart */}
      <div className="flex items-end gap-1.5 h-16 mb-4 px-1">
        {[35, 55, 40, 70, 50, 85, 60, 95, 75, 100, 80, 90].map((h, i) => (
          <div key={i} className="flex-1 bg-[var(--black)] rounded-t" style={{ height: `${h}%`, opacity: 0.1 + (h / 120) }} />
        ))}
      </div>
      {/* Quick wins list */}
      <div className="border-t border-black/5 pt-3">
        <div className="text-[9px] font-bold text-[var(--mid-gray)] mb-2">Quick Wins</div>
        {["Invoice automation", "AI lead follow-up", "Smart scheduling"].map((w) => (
          <div key={w} className="flex items-center gap-2 py-1">
            <div className="w-4 h-4 rounded bg-green-50 flex items-center justify-center">
              <svg width="8" height="8" viewBox="0 0 12 12" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"><path d="M2 6L5 9L10 3" /></svg>
            </div>
            <span className="text-[10px] font-medium">{w}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main className="dot-grid min-h-screen">
      <Navbar />

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(0,0,0,0.02), transparent)" }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <RevealSection>
            <div className="inline-flex items-center gap-2 bg-[var(--light-surface)] border border-black/5 rounded-full px-4 py-1.5 mb-8 animate-float">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-[var(--mid-gray)]">Free AI opportunity report for your business</span>
            </div>
          </RevealSection>
          <RevealSection delay={150}>
            <h1 className="text-[40px] sm:text-[52px] md:text-[62px] font-extrabold tracking-[-0.035em] leading-[1.08] mb-6">
              We implement AI<br />into your business.<br />
              <span className="text-[var(--mid-gray)]">You grow and scale.</span>
            </h1>
          </RevealSection>
          <RevealSection delay={300}>
            <p className="text-lg text-[var(--mid-gray)] max-w-xl mx-auto mb-10 leading-relaxed">
              Most businesses lose thousands every month on problems AI already solves. We find exactly where, show you the dollar amount, and then implement every solution for you.
            </p>
          </RevealSection>
          <RevealSection delay={450}>
            <div className="flex flex-col items-center gap-3">
              <HeroCTA />
              <p className="text-[11px] text-[var(--mid-gray)]/40">Free · No credit card · Takes about 15 minutes</p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════ INDUSTRY TICKER ═══════════════ */}
      <section className="border-y border-black/5 overflow-hidden">
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
      <section className="py-28 px-6">
        <div className="max-w-4xl mx-auto">
          <RevealSection className="text-center mb-16">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--mid-gray)]/40 mb-4">The Problem</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-6">AI is not optional anymore. It is the new standard.</h2>
            <p className="text-[var(--mid-gray)] text-lg max-w-2xl mx-auto leading-relaxed">The businesses that figure out AI first will dominate their market. The ones that wait will spend the next five years wondering what happened.</p>
          </RevealSection>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { value: 72, suffix: "%", label: "of business owners want to use AI but have no idea where to start" },
              { value: 27400, prefix: "$", label: "in average monthly savings discovered per business we analyze" },
              { value: 3, suffix: "x", label: "faster growth for businesses that implement AI across operations" },
            ].map((stat, i) => (
              <ScaleReveal key={i} delay={i * 150}>
                <div className="text-center p-8 bg-white border border-black/5 rounded-2xl hover:border-black/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-500">
                  <div className="text-4xl sm:text-5xl font-extrabold mb-3"><AnimatedStat value={stat.value} prefix={stat.prefix} suffix={stat.suffix} /></div>
                  <p className="text-sm text-[var(--mid-gray)] leading-relaxed">{stat.label}</p>
                </div>
              </ScaleReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="h-px w-full animate-gradient-line" />

      {/* ═══════════════ HOW IT WORKS (cal.com style) ═══════════════ */}
      <section id="how-it-works" className="py-28 px-6 bg-[var(--light-surface)]">
        <div className="max-w-6xl mx-auto">
          <RevealSection className="text-center mb-20">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--mid-gray)]/40 mb-3">How It Works</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">From blind spots to bottom line</h2>
            <p className="text-[var(--mid-gray)] mt-4 max-w-lg mx-auto">Three steps. No jargon. No mystery.</p>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                num: "01",
                title: "Answer the questionnaire",
                desc: "Tell us about your operations, customers, tech stack, and goals. Takes about 15 minutes.",
                visual: <QuestionnaireVisual />,
              },
              {
                num: "02",
                title: "We analyze everything",
                desc: "Your answers are cross-referenced against industry benchmarks, cost data, and competitive intelligence.",
                visual: <AnalysisVisual />,
              },
              {
                num: "03",
                title: "Get your roadmap, we build it",
                desc: "Receive a dollar-amount report with quick wins. Then we implement every recommendation for you.",
                visual: <ReportVisual />,
              },
            ].map((step, i) => (
              <ScaleReveal key={i} delay={i * 120}>
                <div className="group bg-white border border-black/5 rounded-3xl p-6 hover:border-black/10 hover:shadow-xl hover:-translate-y-1 transition-all duration-500 h-full flex flex-col">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 bg-[var(--light-surface)] border border-black/5 rounded-lg text-xs font-bold text-[var(--mid-gray)]">{step.num}</span>
                  </div>
                  <h3 className="text-lg font-bold tracking-tight mb-2">{step.title}</h3>
                  <p className="text-[var(--mid-gray)] text-sm leading-relaxed mb-5">{step.desc}</p>
                  <div className="mt-auto">{step.visual}</div>
                </div>
              </ScaleReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHAT YOU GET ═══════════════ */}
      <section id="features" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="text-center mb-20">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--mid-gray)]/40 mb-3">What You Get</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">Not just a report. A growth engine.</h2>
            <p className="text-[var(--mid-gray)] mt-4 max-w-lg mx-auto">We find the AI opportunities hiding in your business, build the implementation plan, and walk you through every step until it is running.</p>
          </RevealSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
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

      {/* ═══════════════ REALITY CHECK (upgraded) ═══════════════ */}
      <RevealSection>
        <section className="relative overflow-hidden">
          {/* Top gradient fade */}
          <div className="h-24 bg-gradient-to-b from-white to-[var(--black)]" />

          <div className="bg-[var(--black)] text-white relative px-6 py-24">
            {/* Dot grid */}
            <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />

            {/* Animated glow orb */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04] pointer-events-none" style={{ background: "radial-gradient(circle, rgba(255,100,100,0.4), transparent 70%)" }} />

            <div className="max-w-3xl mx-auto text-center relative z-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/30 mb-6">The Reality Check</p>

              <h2 className="text-3xl sm:text-5xl md:text-[56px] font-extrabold tracking-tight mb-10 leading-tight">
                While you are figuring out AI,
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-red-500">your competitors already did.</span>
              </h2>

              {/* Stats row */}
              <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mb-10">
                {[
                  { num: "47%", label: "of SMBs now use AI" },
                  { num: "2.3x", label: "faster deal cycles" },
                  { num: "$328K", label: "avg annual savings" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-2xl sm:text-3xl font-extrabold mb-1">{s.num}</div>
                    <div className="text-[10px] text-white/40 uppercase tracking-wider">{s.label}</div>
                  </div>
                ))}
              </div>

              <p className="text-white text-lg max-w-xl mx-auto mb-4 leading-relaxed">
                They are closing deals faster. Spending less on operations. Scaling without adding headcount. Every week you wait, the gap between you and them gets wider.
              </p>
              <p className="text-white/60 text-base max-w-lg mx-auto mb-12 leading-relaxed">
                The free report takes 15 minutes. It will show you exactly what they are doing that you are not. The only risk is not looking.
              </p>
              <HeroCTA label="See What You Are Missing" dark />
            </div>
          </div>

          {/* Bottom gradient fade */}
          <div className="h-24 bg-gradient-to-t from-white to-[var(--black)]" />
        </section>
      </RevealSection>

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <RevealSection>
        <section className="py-28 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <LogoIcon className="h-10 w-10 mx-auto mb-8 opacity-10 animate-float" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              The businesses that move first<br />win the most.
            </h2>
            <p className="text-[var(--mid-gray)] text-lg mb-12 max-w-lg mx-auto leading-relaxed">
              Get the free report. See the numbers. Then let us implement it.
              <br /><span className="font-medium text-[var(--black)]">There is literally nothing to lose.</span>
            </p>
            <HeroCTA />
          </div>
        </section>
      </RevealSection>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="border-t border-black/5 py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <LogoFull className="h-5 w-auto opacity-30" />
          <p className="text-[11px] text-[var(--mid-gray)]/40">© 2026 Groundwork. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
