"use client";

import { useEffect, useRef, useState } from "react";
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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={className} style={{ opacity: 0, transform: "translateY(30px)", transition: `all 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms` }}>
      {children}
    </div>
  );
}

/* ── Animated CTA Button ──────────────────────────── */
function HeroCTA({ label = "Get Your Free Report", dark = false }: { label?: string; dark?: boolean }) {
  return (
    <Link
      href="/questionnaire"
      className={`group relative inline-flex items-center gap-3 font-semibold px-9 py-4.5 rounded-full text-base overflow-hidden transition-all duration-300 active:scale-[0.97] ${
        dark
          ? "bg-white text-[var(--black)] hover:shadow-[0_0_50px_rgba(255,255,255,0.15)]"
          : "bg-[var(--black)] text-white hover:shadow-[0_4px_40px_rgba(0,0,0,0.25)]"
      }`}
    >
      {/* Shimmer sweep */}
      <span className={`absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[800ms] ease-out ${
        dark ? "bg-gradient-to-r from-transparent via-black/5 to-transparent" : "bg-gradient-to-r from-transparent via-white/15 to-transparent"
      }`} />

      {/* Glow border */}
      <span className={`absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
        dark ? "" : "shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)]"
      }`} />

      <span className="relative z-10">{label}</span>

      {/* Arrow with bounce */}
      <span className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-300">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 9H14M10 4.5L14.5 9L10 13.5" />
        </svg>
      </span>

      {/* Outer pulse ring */}
      <span className={`absolute -inset-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 ${
        dark ? "" : "shadow-[0_0_0_2px_rgba(0,0,0,0.05)]"
      }`} />
    </Link>
  );
}

/* ── Industry grid with icons ─────────────────────── */
const industryItems = [
  { name: "Construction", icon: "🏗️" },
  { name: "Healthcare", icon: "🏥" },
  { name: "E-Commerce", icon: "🛒" },
  { name: "Real Estate", icon: "🏠" },
  { name: "SaaS & Tech", icon: "💻" },
  { name: "Manufacturing", icon: "🏭" },
  { name: "Professional Services", icon: "💼" },
  { name: "Trades & Home Services", icon: "🔧" },
  { name: "Finance & Insurance", icon: "📊" },
  { name: "Hospitality", icon: "🍽️" },
  { name: "Transportation", icon: "🚛" },
  { name: "Education", icon: "📚" },
  { name: "Marketing Agencies", icon: "📣" },
  { name: "Fitness & Wellness", icon: "💪" },
  { name: "Automotive", icon: "🚗" },
  { name: "Nonprofits", icon: "❤️" },
];

/* ── What we actually do (the stack) ──────────────── */
const valueStack = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" /></svg>
    ),
    title: "Personalized AI Opportunity Report",
    desc: "A detailed breakdown of every place AI can save you money, grow revenue, or eliminate wasted time — specific to your business, not generic advice.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" /></svg>
    ),
    title: "Dollar-Amount ROI Projections",
    desc: "Not vague promises. Actual numbers — projected savings, revenue gains, and cost-of-inaction calculations so you know exactly what's at stake.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polygon points="13,2 3,14 12,14 11,22 21,10 12,10" /></svg>
    ),
    title: "Quick Wins You Can Act On This Week",
    desc: "Immediate, low-effort changes that start saving you money before you even commit to a plan. Results from day one.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14,2 14,8 20,8" /><path d="M9 15l2 2 4-4" /></svg>
    ),
    title: "Step-by-Step Implementation Playbooks",
    desc: "For every recommendation — the exact tools, timeline, costs, and steps. Just follow the playbook. No guesswork.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>
    ),
    title: "Hands-On Implementation Support",
    desc: "Not just a report you'll never read. We walk you through it — training, vendor selection, team onboarding, the full rollout.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><polyline points="23,6 13.5,15.5 8.5,10.5 1,18" /><polyline points="17,6 23,6 23,12" /></svg>
    ),
    title: "Ongoing Optimization & Quarterly Audits",
    desc: "AI evolves fast. We reassess your business every quarter and surface new opportunities automatically. You stay ahead — permanently.",
  },
];

const steps = [
  {
    title: "Tell us about your business",
    desc: "Answer questions about your operations, customers, tech stack, and goals. Think of it like sitting down with a consultant who actually listens — except it takes 15 minutes, not 15 meetings.",
    visual: (
      <div className="space-y-2.5">
        {["Company & Industry", "Operations & Workflows", "Technology Stack", "Customers & Revenue", "Goals & Priorities"].map((s, i) => (
          <div key={s} className="flex items-center gap-3">
            <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold ${i < 3 ? "bg-[var(--black)] text-white" : "bg-black/5 text-[var(--mid-gray)]"}`}>
              {i < 3 ? (
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M2.5 7L5.5 10L11.5 4" /></svg>
              ) : String(i + 1)}
            </span>
            <span className={`text-sm ${i < 3 ? "font-medium" : "text-[var(--mid-gray)]"}`}>{s}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "We analyze everything",
    desc: "Your answers are cross-referenced against industry benchmarks, cost data, and competitive intelligence to build a report that's specific to your business — not a template.",
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
    title: "Get your roadmap — then we build it",
    desc: "You get a detailed, dollar-amount report with quick wins and strategic plays. Then Groundwork helps you implement every recommendation — tools, training, rollout, everything.",
    visual: (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[var(--mid-gray)]">Projected Annual Savings</span>
        </div>
        <div className="text-3xl font-extrabold tracking-tight">$47,200</div>
        <div className="flex gap-2">
          <span className="bg-green-50 text-green-700 text-[11px] font-semibold px-2.5 py-1 rounded-full">↑ 340% ROI</span>
          <span className="bg-black/[0.03] text-[var(--mid-gray)] text-[11px] font-semibold px-2.5 py-1 rounded-full">12 opportunities</span>
        </div>
        <div className="border-t border-black/5 pt-3 mt-1">
          <div className="text-[11px] font-bold text-[var(--mid-gray)] mb-2">Quick Wins</div>
          {["Automate invoice processing", "AI customer follow-ups", "Smart scheduling"].map((w) => (
            <div key={w} className="flex items-center gap-2 text-xs py-1">
              <span className="w-1.5 h-1.5 bg-[var(--black)] rounded-full" />{w}
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export default function Home() {
  return (
    <main className="dot-grid min-h-screen">
      <Navbar />

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative pt-36 sm:pt-44 pb-24 px-6">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(0,0,0,0.015), transparent)" }} />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <RevealSection>
            <div className="inline-flex items-center gap-2 bg-[var(--light-surface)] border border-black/5 rounded-full px-4 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-[var(--mid-gray)]">
                Trusted by businesses across 15+ industries
              </span>
            </div>
          </RevealSection>

          <RevealSection delay={100}>
            <h1 className="text-[44px] sm:text-[56px] md:text-[68px] font-extrabold tracking-[-0.035em] leading-[1.08] mb-6">
              We find the AI your
              <br />
              business is missing.
              <br />
              <span className="text-[var(--mid-gray)]">Then we build it for you.</span>
            </h1>
          </RevealSection>

          <RevealSection delay={200}>
            <p className="text-lg sm:text-xl text-[var(--mid-gray)] max-w-xl mx-auto mb-12 leading-relaxed">
              Most businesses are bleeding thousands a month on problems AI already solves — they just don&apos;t know where to start. We do. Get your free report and see exactly what you&apos;re missing.
            </p>
          </RevealSection>

          <RevealSection delay={300}>
            <div className="flex flex-col items-center gap-4">
              <HeroCTA />
              <p className="text-[11px] text-[var(--mid-gray)]/40">
                Free · No credit card · Takes ~15 minutes
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════ INDUSTRY GRID ═══════════════ */}
      <RevealSection>
        <section className="py-16 border-y border-black/5">
          <div className="max-w-5xl mx-auto px-6">
            <p className="text-center text-sm font-medium text-[var(--mid-gray)] mb-8">
              We&apos;ve analyzed businesses in every one of these industries — and found money left on the table in all of them.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
              {industryItems.map((ind) => (
                <div key={ind.name} className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl hover:bg-black/[0.02] transition-colors">
                  <span className="text-xl">{ind.icon}</span>
                  <span className="text-[10px] font-medium text-[var(--mid-gray)] text-center leading-tight">{ind.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ═══════════════ THE PROBLEM ═══════════════ */}
      <section className="py-28 px-6">
        <div className="max-w-3xl mx-auto">
          <RevealSection className="text-center mb-16">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--mid-gray)]/40 mb-3">The Problem</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              You know AI can help your business.
              <br />
              <span className="text-[var(--mid-gray)]">You just don&apos;t know where — or how.</span>
            </h2>
          </RevealSection>

          <div className="grid sm:grid-cols-3 gap-5">
            {[
              { num: "72%", label: "of business owners say they want to use AI but don't know where to start" },
              { num: "$4,200", label: "average monthly savings discovered in a Groundwork analysis" },
              { num: "3 hrs", label: "average weekly time saved per employee after AI implementation" },
            ].map((stat, i) => (
              <RevealSection key={i} delay={i * 100}>
                <div className="text-center p-6 bg-white border border-black/5 rounded-2xl">
                  <div className="text-3xl font-extrabold mb-2">{stat.num}</div>
                  <p className="text-xs text-[var(--mid-gray)] leading-relaxed">{stat.label}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section id="how-it-works" className="py-28 px-6 bg-[var(--light-surface)]">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="text-center mb-20">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--mid-gray)]/40 mb-3">How It Works</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              From blind spots to bottom line
            </h2>
            <p className="text-[var(--mid-gray)] mt-4 max-w-lg mx-auto">
              Three steps. No jargon. No mystery.
            </p>
          </RevealSection>

          <div className="space-y-8">
            {steps.map((step, i) => (
              <RevealSection key={i} delay={i * 100}>
                <div className="group grid md:grid-cols-2 gap-8 bg-white border border-black/5 rounded-3xl p-8 md:p-10 hover:border-black/10 hover:shadow-xl transition-all duration-500">
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="w-8 h-8 bg-[var(--black)] text-white rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</span>
                      <span className="h-px flex-1 bg-black/5" />
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight mb-3">{step.title}</h3>
                    <p className="text-[var(--mid-gray)] leading-relaxed text-[15px]">{step.desc}</p>
                  </div>
                  <div className="bg-[var(--light-surface)] group-hover:bg-black/[0.03] rounded-2xl p-6 md:p-8 transition-colors duration-500">
                    {step.visual}
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ THE FULL STACK (what you actually get) ═══════════════ */}
      <section id="features" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="text-center mb-20">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--mid-gray)]/40 mb-3">What You Get</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Not just a report. A partner.
            </h2>
            <p className="text-[var(--mid-gray)] mt-4 max-w-lg mx-auto">
              Groundwork doesn&apos;t hand you a PDF and walk away. We find the opportunities,
              build the roadmap, and help you implement every step.
            </p>
          </RevealSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {valueStack.map((item, i) => (
              <RevealSection key={i} delay={i * 60}>
                <div className="group h-full bg-white border border-black/5 rounded-2xl p-7 hover:border-black/10 hover:shadow-lg transition-all duration-500">
                  <div className="w-10 h-10 bg-[var(--light-surface)] rounded-xl flex items-center justify-center mb-5 group-hover:bg-[var(--black)] group-hover:text-white transition-colors duration-300">
                    {item.icon}
                  </div>
                  <h3 className="text-sm font-bold mb-2">{item.title}</h3>
                  <p className="text-[var(--mid-gray)] text-xs leading-relaxed">{item.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SHOCK MOMENT ═══════════════ */}
      <RevealSection>
        <section className="py-28 px-6 bg-[var(--black)] text-white relative overflow-hidden">
          <div className="absolute inset-0" style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)", backgroundSize: "24px 24px" }} />
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/20 mb-6">The Question You Need To Ask</p>
            <h2 className="text-3xl sm:text-5xl md:text-[56px] font-extrabold tracking-tight mb-6 leading-tight">
              If your competitors are already using AI and you&apos;re not —
              <br />
              <span className="text-red-400">how long before it shows?</span>
            </h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto mb-12 leading-relaxed">
              Every month you wait, the gap gets wider. The report is free.
              The cost of doing nothing isn&apos;t.
            </p>
            <HeroCTA label="See What You're Missing" dark />
          </div>
        </section>
      </RevealSection>

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <RevealSection>
        <section className="py-28 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <LogoIcon className="h-10 w-10 mx-auto mb-8 opacity-10" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              Your business has AI opportunities
              <br />
              you haven&apos;t found yet.
            </h2>
            <p className="text-[var(--mid-gray)] text-lg mb-12 max-w-lg mx-auto leading-relaxed">
              Get the free report. See the numbers. Then decide if you want us to build it.
              <br />
              <span className="font-medium text-[var(--black)]">There&apos;s literally nothing to lose.</span>
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
