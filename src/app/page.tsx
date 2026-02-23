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
    <div
      ref={ref}
      className={className}
      style={{
        opacity: 0,
        transform: "translateY(30px)",
        transition: `all 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Animated CTA Button ──────────────────────────── */
function HeroCTA() {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href="/questionnaire"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative inline-flex items-center gap-3 bg-[var(--black)] text-white font-semibold px-8 py-4 rounded-full text-base overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,0,0,0.2)] active:scale-[0.97]"
    >
      {/* Shimmer effect */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />

      {/* Glow ring */}
      <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ boxShadow: "inset 0 1px 1px rgba(255,255,255,0.1), 0 0 20px rgba(0,0,0,0.15)" }}
      />

      <span className="relative z-10">Get Your Free Report</span>

      {/* Animated arrow */}
      <span className={`relative z-10 transition-transform duration-300 ${hovered ? "translate-x-1" : ""}`}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M4 9H14M10 4.5L14.5 9L10 13.5" />
        </svg>
      </span>

      {/* Pulse ring animation */}
      <span className="absolute inset-0 rounded-full animate-ping opacity-[0.03] bg-black" style={{ animationDuration: "3s" }} />
    </Link>
  );
}

/* ── Rotating words in hero ───────────────────────── */
function RotatingWord() {
  const words = ["money", "time", "customers", "growth"];
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % words.length);
        setVisible(true);
      }, 300);
    }, 2800);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block relative">
      <span
        className={`transition-all duration-300 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        }`}
        style={{ display: "inline-block" }}
      >
        {words[index]}
      </span>
      {/* Underline accent */}
      <span className="absolute bottom-0 left-0 right-0 h-[3px] bg-[var(--black)]/20 rounded-full" />
    </span>
  );
}

const features = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
    title: "ROI & Cost Savings",
    desc: "See exactly how much you're leaving on the table — projected annual and monthly savings specific to your business.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12,6 12,12 16,14" />
      </svg>
    ),
    title: "Cost of Inaction",
    desc: "A live ticker showing what you're losing every month you wait. Flip the framing from savings to bleeding.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: "AI Readiness Score",
    desc: "A 0–100 rating of your current AI maturity. Track it, share it, improve it over time.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: "Competitive Intel",
    desc: "See what competitors in your industry are already doing with AI. Don't get left behind.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14,2 14,8 20,8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10,9 9,9 8,9" />
      </svg>
    ),
    title: "Implementation Playbooks",
    desc: "Step-by-step guides for every recommendation. Timeline, tools, costs, difficulty, expected impact.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" />
      </svg>
    ),
    title: "Quick Wins",
    desc: "2–3 things you can implement this week with minimal effort and immediate impact.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
        <polyline points="17,6 23,6 23,12" />
      </svg>
    ),
    title: "ROI Tracking",
    desc: "After implementation, track actual savings over time. Real numbers proving the value in black and white.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    title: "Quarterly Audits",
    desc: "AI evolves fast. Every quarter, we resurface new opportunities you didn't have before.",
  },
];

const steps = [
  {
    title: "Tell us about your business",
    desc: "Answer questions about your operations, customers, technology, and goals. We ask the questions a $10K consultant would — but it takes 15 minutes, not 15 meetings.",
    visual: (
      <div className="space-y-2.5">
        {["Company & Industry", "Operations & Workflows", "Technology & Tools", "Customers & Revenue", "Goals & Priorities"].map((s, i) => (
          <div key={s} className="flex items-center gap-3">
            <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${i < 3 ? "bg-[var(--black)] text-white" : "bg-black/5 text-[var(--mid-gray)]"}`}>
              {i < 3 ? (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M2.5 7L5.5 10L11.5 4" />
                </svg>
              ) : (
                String(i + 1)
              )}
            </span>
            <span className={`text-sm ${i < 3 ? "font-medium" : "text-[var(--mid-gray)]"}`}>{s}</span>
          </div>
        ))}
      </div>
    ),
  },
  {
    title: "AI analyzes everything",
    desc: "Our engine cross-references your answers against industry benchmarks, cost data, and competitive intelligence to build a report that's specific to your business — not generic advice.",
    visual: (
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-xs">
          <span className="w-2 h-2 bg-[var(--black)] rounded-full animate-pulse" />
          <span className="text-[var(--mid-gray)]">Analyzing operations data...</span>
        </div>
        <div className="h-2 bg-black/5 rounded-full overflow-hidden">
          <div className="h-full bg-[var(--black)] rounded-full" style={{ width: "78%", transition: "width 2s ease" }} />
        </div>
        <div className="grid grid-cols-2 gap-2 mt-3">
          {["Industry Benchmarks", "Cost Analysis", "Tool Mapping", "Competitor Data"].map((label) => (
            <div key={label} className="bg-black/[0.03] rounded-lg px-3 py-2 text-[11px] font-medium text-[var(--mid-gray)]">
              {label}
            </div>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Get your personalized report",
    desc: "A detailed, dollar-amount roadmap of exactly where AI fits in your business. Quick wins you can act on this week, plus long-term strategic plays worth thousands.",
    visual: (
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[var(--mid-gray)]">Projected Annual Savings</span>
        </div>
        <div className="text-3xl font-extrabold tracking-tight">$47,200</div>
        <div className="flex gap-2">
          <span className="bg-green-50 text-green-700 text-[11px] font-semibold px-2.5 py-1 rounded-full">↑ 340% ROI</span>
          <span className="bg-black/[0.03] text-[var(--mid-gray)] text-[11px] font-semibold px-2.5 py-1 rounded-full">12 opportunities found</span>
        </div>
        <div className="border-t border-black/5 pt-3 mt-1">
          <div className="text-[11px] font-bold text-[var(--mid-gray)] mb-2">Top Quick Wins</div>
          {["Automate invoice processing", "AI customer follow-ups", "Smart scheduling"].map((w) => (
            <div key={w} className="flex items-center gap-2 text-xs py-1">
              <span className="w-1.5 h-1.5 bg-[var(--black)] rounded-full" />
              {w}
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

/* ── Ticker for social proof ──────────────────────── */
const industries = [
  "Construction", "Healthcare", "E-commerce", "Real Estate", "SaaS", "Manufacturing",
  "Professional Services", "Trades & Home Services", "Finance", "Hospitality",
  "Transportation", "Education", "Marketing Agencies", "Fitness", "Automotive",
];

export default function Home() {
  return (
    <main className="dot-grid min-h-screen">
      <Navbar />

      {/* ═══════════════ HERO ═══════════════ */}
      <section className="relative pt-36 sm:pt-44 pb-24 px-6">
        {/* Subtle radial gradient behind hero */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(0,0,0,0.02), transparent)",
          }}
        />

        <div className="max-w-3xl mx-auto text-center relative z-10">
          <RevealSection>
            <div className="inline-flex items-center gap-2 bg-[var(--light-surface)] border border-black/5 rounded-full px-4 py-1.5 mb-8">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-[var(--mid-gray)]">
                AI-Powered Business Intelligence
              </span>
            </div>
          </RevealSection>

          <RevealSection delay={100}>
            <h1 className="text-5xl sm:text-6xl md:text-[72px] font-extrabold tracking-[-0.035em] leading-[1.05] mb-6">
              Your business is
              <br />
              leaving <RotatingWord /> on the table
            </h1>
          </RevealSection>

          <RevealSection delay={200}>
            <p className="text-lg sm:text-xl text-[var(--mid-gray)] max-w-xl mx-auto mb-12 leading-relaxed">
              Most businesses lose thousands every month to problems AI already solves.
              We&apos;ll show you exactly where — and exactly how much.
            </p>
          </RevealSection>

          <RevealSection delay={300}>
            <HeroCTA />
          </RevealSection>

          <RevealSection delay={400} className="mt-8">
            <p className="text-[11px] text-[var(--mid-gray)]/40">
              Free executive summary · No credit card required · Takes ~15 minutes
            </p>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════ INDUSTRY TICKER ═══════════════ */}
      <RevealSection>
        <section className="py-10 border-y border-black/5 overflow-hidden">
          <p className="text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--mid-gray)]/30 mb-5">
            Built for every industry
          </p>
          <div className="relative">
            <div className="flex gap-4 animate-ticker whitespace-nowrap">
              {[...industries, ...industries].map((ind, i) => (
                <span
                  key={i}
                  className="inline-block px-4 py-2 bg-black/[0.02] border border-black/5 rounded-full text-xs font-medium text-[var(--mid-gray)] whitespace-nowrap"
                >
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </section>
      </RevealSection>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section id="how-it-works" className="py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="text-center mb-20">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--mid-gray)]/40 mb-3">
              How It Works
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Three steps to clarity
            </h2>
          </RevealSection>

          <div className="space-y-8">
            {steps.map((step, i) => (
              <RevealSection key={i} delay={i * 100}>
                <div className="group grid md:grid-cols-2 gap-8 bg-white border border-black/5 rounded-3xl p-8 md:p-10 hover:border-black/10 hover:shadow-xl transition-all duration-500">
                  <div className="flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="w-8 h-8 bg-[var(--black)] text-white rounded-full flex items-center justify-center text-xs font-bold">
                        {i + 1}
                      </span>
                      <span className="h-px flex-1 bg-black/5" />
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight mb-3">{step.title}</h3>
                    <p className="text-[var(--mid-gray)] leading-relaxed">{step.desc}</p>
                  </div>
                  <div className="bg-[var(--light-surface)] rounded-2xl p-6 md:p-8">
                    {step.visual}
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SHOCK MOMENT ═══════════════ */}
      <RevealSection>
        <section className="py-28 px-6 bg-[var(--black)] text-white relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="max-w-3xl mx-auto text-center relative z-10">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25 mb-6">
              The Wake-Up Call
            </p>
            <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              What if you&apos;re losing
              <br />
              <span className="text-red-400">$3,900 every month</span>
              <br />
              and don&apos;t even know it?
            </h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto mb-12 leading-relaxed">
              The average business we analyze discovers tens of thousands in annual savings
              they never knew existed. The report is free. The cost of not knowing isn&apos;t.
            </p>
            <Link
              href="/questionnaire"
              className="group relative inline-flex items-center gap-3 bg-white text-[var(--black)] font-semibold px-8 py-4 rounded-full overflow-hidden transition-all hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] active:scale-[0.97]"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-black/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10">Find Out Your Number</span>
              <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M4 9H14M10 4.5L14.5 9L10 13.5" />
                </svg>
              </span>
            </Link>
          </div>
        </section>
      </RevealSection>

      {/* ═══════════════ FEATURES GRID ═══════════════ */}
      <section id="features" className="py-28 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealSection className="text-center mb-20">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[var(--mid-gray)]/40 mb-3">
              What You Get
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
              Not advice. A system.
            </h2>
            <p className="text-[var(--mid-gray)] mt-4 max-w-lg mx-auto">
              Everything you need to understand, implement, and track AI in your business.
            </p>
          </RevealSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((f, i) => (
              <RevealSection key={i} delay={i * 50}>
                <div className="group bg-white border border-black/5 rounded-2xl p-6 hover:border-black/10 hover:shadow-lg transition-all duration-500 h-full">
                  <div className="w-10 h-10 bg-[var(--light-surface)] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[var(--black)] group-hover:text-white transition-colors duration-300">
                    {f.icon}
                  </div>
                  <h3 className="text-sm font-bold mb-2">{f.title}</h3>
                  <p className="text-[var(--mid-gray)] text-xs leading-relaxed">{f.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <RevealSection>
        <section className="py-28 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <LogoIcon className="h-10 w-10 mx-auto mb-8 opacity-10" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-tight">
              Every day you wait
              <br />
              costs you money
            </h2>
            <p className="text-[var(--mid-gray)] text-lg mb-12 max-w-lg mx-auto leading-relaxed">
              Your competitors are already implementing AI. Find out what you&apos;re missing — for free.
            </p>
            <HeroCTA />
          </div>
        </section>
      </RevealSection>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="border-t border-black/5 py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <LogoFull className="h-5 w-auto opacity-30" />
          <p className="text-[11px] text-[var(--mid-gray)]/40">
            © 2026 Groundwork. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
