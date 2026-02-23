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
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: 0, transform: "translateY(30px)", transition: "all 0.7s cubic-bezier(0.4, 0, 0.2, 1)" }}
    >
      {children}
    </div>
  );
}

const features = [
  {
    icon: "💰",
    title: "ROI & Cost Savings",
    desc: "See exactly how much you're leaving on the table. Large, undeniable numbers — projected annual savings, monthly savings, and ROI percentage.",
  },
  {
    icon: "🔥",
    title: "Cost of Inaction Calculator",
    desc: "Watch money bleed out in real time. A live ticker showing what you're losing every month you wait to implement AI.",
  },
  {
    icon: "📊",
    title: "AI Readiness Score",
    desc: "A credit-score style rating (0–100) of your current AI maturity. Share it, track it, improve it over time.",
  },
  {
    icon: "🏆",
    title: "Competitive Intelligence",
    desc: "See what your competitors are already doing with AI. Don't get left behind — know exactly where they're pulling ahead.",
  },
  {
    icon: "📋",
    title: "Implementation Playbooks",
    desc: "Step-by-step guides for every recommendation. Timeline, tools, costs, difficulty, expected impact. Just follow the playbook.",
  },
  {
    icon: "⚡",
    title: "Quick Wins",
    desc: "2–3 things you can implement this week with minimal effort and immediate impact. Start saving money on day one.",
  },
  {
    icon: "🔄",
    title: "Quarterly AI Audits",
    desc: "AI evolves fast. Every quarter, we reassess your business and surface new opportunities you didn't have before.",
  },
  {
    icon: "📈",
    title: "ROI Tracking Dashboard",
    desc: "After implementation, track actual savings and revenue impact over time. See real numbers proving the value.",
  },
];

const steps = [
  {
    num: "01",
    title: "Answer 37 Questions",
    desc: "Our AI-powered questionnaire digs deep into your operations, technology, customers, and goals. Takes about 15 minutes.",
  },
  {
    num: "02",
    title: "AI Analyzes Your Business",
    desc: "Claude — our AI engine — synthesizes your answers against industry benchmarks, cost data, and competitive intelligence.",
  },
  {
    num: "03",
    title: "Get Your Personalized Report",
    desc: "A detailed, actionable breakdown of exactly where AI fits in your specific business. Not generic advice — dollar-amount roadmaps.",
  },
  {
    num: "04",
    title: "Implement & Track ROI",
    desc: "Follow the playbooks, implement quick wins, and watch your savings grow on your live dashboard.",
  },
];

export default function Home() {
  return (
    <main className="dot-grid min-h-screen">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <RevealSection>
            <div className="inline-flex items-center gap-2 bg-[var(--light-surface)] rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-medium text-[var(--mid-gray)]">
                AI-Powered Business Intelligence
              </span>
            </div>
          </RevealSection>

          <RevealSection>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6">
              Discover where AI fits
              <br />
              <span className="text-[var(--mid-gray)]">in your business</span>
            </h1>
          </RevealSection>

          <RevealSection>
            <p className="text-lg sm:text-xl text-[var(--mid-gray)] max-w-2xl mx-auto mb-10 leading-relaxed">
              Stop guessing about AI. Get a personalized analysis of exactly where AI
              can save you money, grow your revenue, and eliminate wasted time.
            </p>
          </RevealSection>

          <RevealSection>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/questionnaire"
                className="bg-[var(--black)] text-white font-semibold px-8 py-4 rounded-full text-base hover:bg-[var(--dark-surface)] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Get Your Free Report →
              </Link>
              <Link
                href="#how-it-works"
                className="text-[var(--mid-gray)] font-medium px-8 py-4 rounded-full text-base hover:text-[var(--black)] transition-colors"
              >
                See How It Works
              </Link>
            </div>
          </RevealSection>

          <RevealSection className="mt-12">
            <p className="text-xs text-[var(--mid-gray)]/60">
              Takes about 15 minutes · No credit card required · Executive summary is free
            </p>
          </RevealSection>
        </div>
      </section>

      {/* Social Proof Bar */}
      <RevealSection>
        <section className="py-12 border-y border-black/5">
          <div className="max-w-5xl mx-auto px-6 flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-center">
            <div>
              <div className="text-3xl font-bold">37</div>
              <div className="text-xs text-[var(--mid-gray)] mt-1">Deep-Dive Questions</div>
            </div>
            <div className="w-px h-10 bg-black/10 hidden sm:block" />
            <div>
              <div className="text-3xl font-bold">7</div>
              <div className="text-xs text-[var(--mid-gray)] mt-1">Business Dimensions</div>
            </div>
            <div className="w-px h-10 bg-black/10 hidden sm:block" />
            <div>
              <div className="text-3xl font-bold">$10K+</div>
              <div className="text-xs text-[var(--mid-gray)] mt-1">Consulting-Grade Analysis</div>
            </div>
            <div className="w-px h-10 bg-black/10 hidden sm:block" />
            <div>
              <div className="text-3xl font-bold">15 min</div>
              <div className="text-xs text-[var(--mid-gray)] mt-1">To Complete</div>
            </div>
          </div>
        </section>
      </RevealSection>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--mid-gray)] mb-3">
              How It Works
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              From questionnaire to ROI in four steps
            </h2>
          </RevealSection>

          <div className="grid md:grid-cols-2 gap-6">
            {steps.map((step, i) => (
              <RevealSection key={i}>
                <div className="group bg-white border border-black/5 rounded-2xl p-8 hover:border-black/15 hover:shadow-lg transition-all duration-300">
                  <div className="text-xs font-bold text-[var(--mid-gray)]/40 mb-4">{step.num}</div>
                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-[var(--mid-gray)] leading-relaxed text-sm">{step.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* The Shock Moment */}
      <RevealSection>
        <section className="py-24 px-6 bg-[var(--black)] text-white relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.15) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <p className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-4">
              The Shock Moment
            </p>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-6">
              &ldquo;I&rsquo;m losing <span className="text-red-400">$47,000</span> a year
              <br />by not doing this?&rdquo;
            </h2>
            <p className="text-white/60 text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
              The first thing you see in your dashboard is a number you can&rsquo;t ignore.
              Projected savings so specific to your business, you&rsquo;d be foolish not to act.
            </p>
            <Link
              href="/questionnaire"
              className="inline-block bg-white text-[var(--black)] font-semibold px-8 py-4 rounded-full hover:bg-white/90 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Find Out Your Number →
            </Link>
          </div>
        </section>
      </RevealSection>

      {/* Features Grid */}
      <section id="features" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <RevealSection className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--mid-gray)] mb-3">
              What You Get
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Everything you need to implement AI with confidence
            </h2>
          </RevealSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {features.map((f, i) => (
              <RevealSection key={i}>
                <div className="group bg-white border border-black/5 rounded-2xl p-6 hover:border-black/15 hover:shadow-lg transition-all duration-300 h-full">
                  <div className="text-2xl mb-4">{f.icon}</div>
                  <h3 className="text-base font-bold mb-2">{f.title}</h3>
                  <p className="text-[var(--mid-gray)] text-sm leading-relaxed">{f.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-6 bg-[var(--light-surface)]">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="text-center mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--mid-gray)] mb-3">
              Pricing
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Plans that scale with your business
            </h2>
            <p className="text-[var(--mid-gray)] mt-4 max-w-xl mx-auto">
              Your plan is automatically recommended based on your company size.
              Every plan starts with a free executive summary.
            </p>
          </RevealSection>

          <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <RevealSection>
              <div className="bg-white border border-black/5 rounded-2xl p-8 h-full">
                <div className="text-xs font-semibold uppercase tracking-widest text-[var(--mid-gray)] mb-2">
                  Hands-Off
                </div>
                <h3 className="text-2xl font-bold mb-1">Self-Guided</h3>
                <p className="text-[var(--mid-gray)] text-sm mb-6">
                  Full report + dashboard. You implement at your pace.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Full AI Opportunity Report",
                    "Dashboard Access",
                    "Implementation Playbooks",
                    "AI Readiness Score",
                    "Quick Wins Priority List",
                    "Quarterly AI Audits",
                    "Intercom Fin Chatbot Support",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <span className="text-green-600 mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/questionnaire"
                  className="block text-center bg-[var(--light-surface)] text-[var(--black)] font-semibold px-6 py-3 rounded-full hover:bg-black/10 transition-colors text-sm"
                >
                  Start Free →
                </Link>
              </div>
            </RevealSection>

            <RevealSection>
              <div className="bg-[var(--black)] text-white border border-black/5 rounded-2xl p-8 h-full relative">
                <div className="absolute top-4 right-4 bg-white/10 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                  Recommended
                </div>
                <div className="text-xs font-semibold uppercase tracking-widest text-white/40 mb-2">
                  Hands-On
                </div>
                <h3 className="text-2xl font-bold mb-1">Full Service</h3>
                <p className="text-white/60 text-sm mb-6">
                  Everything in Hands-Off plus personal implementation support.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Everything in Hands-Off",
                    "Personalized Implementation Support",
                    "Live Training Sessions",
                    "Vendor Negotiation",
                    "Priority Access & Response",
                    "Strategic Guidance Calls",
                    "Team Workshops & Onboarding",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm">
                      <span className="text-green-400 mt-0.5">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/questionnaire"
                  className="block text-center bg-white text-[var(--black)] font-semibold px-6 py-3 rounded-full hover:bg-white/90 transition-colors text-sm"
                >
                  Start Free →
                </Link>
              </div>
            </RevealSection>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <RevealSection>
        <section className="py-24 px-6">
          <div className="max-w-3xl mx-auto text-center">
            <LogoIcon className="h-12 w-12 mx-auto mb-8 opacity-20" />
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Every day you wait costs you money
            </h2>
            <p className="text-[var(--mid-gray)] text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Your competitors are already implementing AI. The question isn&rsquo;t whether
              you should — it&rsquo;s how much you&rsquo;re losing by not starting today.
            </p>
            <Link
              href="/questionnaire"
              className="inline-block bg-[var(--black)] text-white font-semibold px-10 py-4 rounded-full text-base hover:bg-[var(--dark-surface)] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Get Your Free Report →
            </Link>
          </div>
        </section>
      </RevealSection>

      {/* Footer */}
      <footer className="border-t border-black/5 py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <LogoFull className="h-6 w-auto opacity-50" />
          <p className="text-xs text-[var(--mid-gray)]">
            © 2026 Groundwork. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}
