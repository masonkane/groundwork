"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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

/* ── Email form component ───────────────────────── */

function EmailForm({ id, ctaLabel = "Get the Free Playbook" }: { id: string; ctaLabel?: string }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);

    // Store email
    try {
      localStorage.setItem("gw_lead_email", trimmed);
    } catch {}

    // Capture UTM params
    try {
      const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
      const utms: Record<string, string> = {};
      utmKeys.forEach((k) => {
        const v = searchParams.get(k);
        if (v) utms[k] = v;
      });
      if (Object.keys(utms).length > 0) {
        localStorage.setItem("gw_utm", JSON.stringify(utms));
      }
    } catch {}

    // Fire-and-forget magic link for future dashboard access
    fetch("/api/auth/magic-link", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: trimmed }),
    }).catch(() => {});

    router.push("/ai-playbook");
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          id={id}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@company.com"
          aria-label="Email address"
          className="flex-1 px-5 py-4 rounded-full border border-black/10 bg-white text-sm placeholder:text-[var(--mid-gray)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--black)] transition-shadow min-h-[48px]"
        />
        <button
          type="submit"
          disabled={submitting}
          className="group relative inline-flex items-center justify-center gap-2 font-semibold px-7 py-4 rounded-full text-sm overflow-hidden transition-all duration-300 active:scale-[0.97] bg-[var(--black)] text-white hover:shadow-[0_4px_50px_rgba(0,0,0,0.3)] animate-pulse-glow disabled:opacity-70 min-h-[48px]"
        >
          <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[800ms] ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <span className="relative z-10">{ctaLabel}</span>
          <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
            <svg
              width="18"
              height="18"
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
        </button>
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-2 text-center">{error}</p>
      )}
    </form>
  );
}

/* ── FAQ item ───────────────────────────────────── */

function FAQItem({
  question,
  answer,
  defaultOpen = false,
}: {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-black/5 rounded-2xl overflow-hidden transition-shadow hover:shadow-sm">
      <button
        onClick={() => setOpen(!open)}
        className="w-full p-5 flex items-center justify-between text-left min-h-[48px]"
      >
        <span className="text-sm font-bold pr-4">{question}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className={`text-[var(--mid-gray)] transition-transform shrink-0 ${open ? "rotate-180" : ""}`}
        >
          <polyline points="6,9 12,15 18,9" />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-5 border-t border-black/5 pt-4">
          <p className="text-sm text-[var(--mid-gray)] leading-relaxed">
            {answer}
          </p>
        </div>
      )}
    </div>
  );
}

/* ── Page data ──────────────────────────────────── */

const valueCards = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
      </svg>
    ),
    title: "10 Implementations Ranked by ROI",
    desc: "Every opportunity ranked by annual savings, from $37K down to $5.6K. Know exactly where to start.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
        <polyline points="17,6 23,6 23,12" />
      </svg>
    ),
    title: "Exact Dollar Savings per Implementation",
    desc: "No vague 'save money with AI' claims. Real numbers: $37,200/yr for lead follow-up, $33,600/yr for chatbots, and more.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <polygon points="13,2 3,14 12,14 11,22 21,10 12,10" />
      </svg>
    ),
    title: "6 Recommended Tools with Pricing",
    desc: "We name names: HubSpot AI, Docsumo, Intercom Fin, and more. Including monthly costs so you can budget today.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
        <polyline points="14,2 14,8 20,8" />
        <path d="M9 15l2 2 4-4" />
      </svg>
    ),
    title: "Step-by-Step Quick-Start Instructions",
    desc: "5 concrete steps for each implementation. Not theory — actions you can execute this week.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    title: "Industry Benchmark Comparisons",
    desc: "See how your AI adoption compares to industry averages across 6 key areas. Know where you're falling behind.",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    ),
    title: "4-Phase Implementation Roadmap",
    desc: "From quick wins in week 1 to strategic plays by month 6. A complete timeline so you never wonder 'what next?'",
  },
];

const problemStats = [
  {
    value: 64,
    suffix: "%",
    label: "of businesses already use AI for customer service",
    subtext: "Are you one of them?",
  },
  {
    value: 142,
    prefix: "$",
    suffix: "K",
    label: "average annual savings identified per business",
    subtext: "That's money left on the table",
  },
  {
    value: 18,
    suffix: "+",
    label: "AI opportunities per business on average",
    subtext: "Most owners know about 2-3",
  },
];

const faqs = [
  {
    q: "Is this actually free?",
    a: "100% free. No credit card, no hidden upsell wall. We created this playbook to demonstrate our expertise. If the data impresses you, you might want a custom report — but there's zero pressure.",
  },
  {
    q: "What exactly is inside the playbook?",
    a: "10 AI implementations ranked by ROI, with exact dollar savings, difficulty ratings, recommended tools with pricing, and step-by-step quick-start instructions for each one. Plus industry benchmarks and a 4-phase implementation timeline.",
  },
  {
    q: "How is this different from every other AI guide?",
    a: "Specificity. We don't say 'AI can help your business.' We say 'AI-powered lead follow-up saves $37,200/yr using HubSpot AI at $45/mo. Here are 5 steps to set it up.' Every recommendation includes tools, costs, and actions.",
  },
  {
    q: "Will you spam me?",
    a: "No. You'll receive the playbook access and an optional invitation to get a custom AI report for your specific business. You can unsubscribe in one click. We hate spam as much as you do.",
  },
];

/* ── Main page ──────────────────────────────────── */

export default function FreeReportPage() {
  return (
    <main className="dot-grid min-h-screen">
      {/* ═══════════════ HERO ═══════════════ */}
      <section
        aria-label="Hero"
        className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center px-4 sm:px-6 pt-12 pb-16"
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(0,0,0,0.02), transparent)",
          }}
        />
        <div className="max-w-3xl mx-auto text-center relative z-10">
          <RevealSection>
            <div className="flex justify-center mb-8 sm:mb-10">
              <LogoFull className="h-7 sm:h-8" />
            </div>
          </RevealSection>

          <RevealSection delay={100}>
            <div className="inline-flex items-center gap-2 bg-[var(--light-surface)] border border-black/5 rounded-full px-3 sm:px-4 py-1.5 mb-6 sm:mb-8 animate-float">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[10px] sm:text-xs font-medium text-[var(--mid-gray)]">
                Free AI Profit Playbook — 2026 Edition
              </span>
            </div>
          </RevealSection>

          <RevealSection delay={200}>
            <h1 className="text-[28px] sm:text-[44px] md:text-[54px] font-extrabold tracking-[-0.035em] leading-[1.08] mb-5 sm:mb-6 px-2">
              Find Out Exactly How Much
              <br className="hidden sm:block" /> AI Could Save Your
              <br className="hidden sm:block" /> Business This Year
            </h1>
          </RevealSection>

          <RevealSection delay={350}>
            <p className="text-base sm:text-lg text-[var(--mid-gray)] max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed px-2">
              Get the 10 highest-ROI AI implementations for 2026 — with exact
              dollar savings, recommended tools, and step-by-step instructions.
              <span className="font-semibold text-[var(--black)]">
                {" "}
                Takes 3 seconds. 100% free.
              </span>
            </p>
          </RevealSection>

          <RevealSection delay={500}>
            <Suspense><EmailForm id="hero-email" /></Suspense>
            <p className="text-[11px] text-[var(--mid-gray)]/40 mt-3">
              No spam · No credit card · Instant access
            </p>
            <div className="flex items-center justify-center gap-4 mt-5">
              <div className="flex -space-x-2">
                {["JF", "SK", "MR", "AL", "TC"].map((initials, i) => (
                  <div
                    key={i}
                    className="w-7 h-7 rounded-full bg-[var(--light-surface)] border-2 border-white flex items-center justify-center text-[8px] font-bold text-[var(--mid-gray)]"
                  >
                    {initials}
                  </div>
                ))}
              </div>
              <p className="text-[11px] text-[var(--mid-gray)]/50">
                <span className="font-semibold text-[var(--mid-gray)]">
                  2,847 business owners
                </span>{" "}
                downloaded this month
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ═══════════════ TRUST BAR ═══════════════ */}
      <section
        aria-label="Key stats"
        className="border-t border-black/5 bg-[var(--light-surface)]"
      >
        <div className="max-w-4xl mx-auto py-4 sm:py-5 px-4 sm:px-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {[
            { value: "$142K", label: "avg savings identified" },
            { value: "10", label: "AI implementations" },
            { value: "6", label: "recommended tools" },
            { value: "100%", label: "free" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-extrabold">
                {s.value}
              </span>
              <span className="text-[10px] sm:text-[11px] text-[var(--mid-gray)]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ PROBLEM / AGITATE ═══════════════ */}
      <section aria-label="Problem" className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <RevealSection className="text-center mb-14 sm:mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase text-[var(--mid-gray)] mb-3">
              The Problem
            </p>
            <h2 className="text-[24px] sm:text-[36px] md:text-[42px] font-extrabold tracking-[-0.03em] leading-tight mb-4">
              Every Month You Wait, AI Saves
              <br className="hidden sm:block" /> Your Competitors More Money
            </h2>
            <p className="text-sm sm:text-base text-[var(--mid-gray)] max-w-2xl mx-auto leading-relaxed">
              While you&apos;re wondering if AI is worth it, your competitors
              are automating customer service, generating leads on autopilot, and
              cutting costs by six figures. The gap widens every quarter.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {problemStats.map((stat, i) => (
              <ScaleReveal key={i} delay={i * 120}>
                <div className="bg-white border border-black/5 rounded-2xl p-6 sm:p-8 text-center">
                  <div className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2">
                    <AnimatedStat
                      value={stat.value}
                      prefix={stat.prefix || ""}
                      suffix={stat.suffix || ""}
                    />
                  </div>
                  <p className="text-sm font-medium mb-1">{stat.label}</p>
                  <p className="text-xs text-[var(--mid-gray)]">
                    {stat.subtext}
                  </p>
                </div>
              </ScaleReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ WHAT YOU GET (VALUE STACK) ═══════════════ */}
      <section
        aria-label="What you get"
        className="py-20 sm:py-28 px-4 sm:px-6 bg-[var(--light-surface)] border-t border-black/5"
      >
        <div className="max-w-5xl mx-auto">
          <RevealSection className="text-center mb-14 sm:mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase text-[var(--mid-gray)] mb-3">
              What You Get
            </p>
            <h2 className="text-[24px] sm:text-[36px] md:text-[42px] font-extrabold tracking-[-0.03em] leading-tight mb-4">
              Everything Inside the AI Profit Playbook
            </h2>
            <p className="text-sm sm:text-base text-[var(--mid-gray)] max-w-2xl mx-auto leading-relaxed">
              Not vague promises. Not generic tips. Specific implementations
              with specific dollar amounts and specific tools — ready to act on
              today.
            </p>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {valueCards.map((card, i) => (
              <ScaleReveal key={i} delay={i * 80}>
                <div className="bg-white border border-black/5 rounded-2xl p-6 h-full">
                  <div className="w-10 h-10 bg-[var(--light-surface)] rounded-xl flex items-center justify-center mb-4">
                    {card.icon}
                  </div>
                  <h3 className="text-sm font-bold mb-2">{card.title}</h3>
                  <p className="text-xs text-[var(--mid-gray)] leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </ScaleReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ HOW IT WORKS ═══════════════ */}
      <section
        aria-label="How it works"
        className="py-20 sm:py-28 px-4 sm:px-6"
      >
        <div className="max-w-4xl mx-auto">
          <RevealSection className="text-center mb-14 sm:mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase text-[var(--mid-gray)] mb-3">
              How It Works
            </p>
            <h2 className="text-[24px] sm:text-[36px] md:text-[42px] font-extrabold tracking-[-0.03em] leading-tight">
              3 Steps. 3 Minutes. $180K+ in Insights.
            </h2>
          </RevealSection>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                step: "1",
                title: "Enter Your Email",
                desc: "One field. No surveys, no phone number, no company size dropdown. Just your email.",
              },
              {
                step: "2",
                title: "Read the Playbook",
                desc: "Instant access to all 10 implementations with dollar amounts, tools, and step-by-step instructions.",
              },
              {
                step: "3",
                title: "Discover Your Savings",
                desc: "Want numbers customized to YOUR business? Take our free assessment for a personalized AI report.",
              },
            ].map((item, i) => (
              <RevealSection key={i} delay={i * 150}>
                <div className="text-center">
                  <div className="w-12 h-12 bg-[var(--black)] text-white rounded-2xl flex items-center justify-center text-lg font-bold mx-auto mb-5">
                    {item.step}
                  </div>
                  <h3 className="text-base font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--mid-gray)] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SOCIAL PROOF ═══════════════ */}
      <section
        aria-label="Social proof"
        className="border-t border-b border-black/5 bg-[var(--light-surface)]"
      >
        <div className="max-w-4xl mx-auto py-4 sm:py-5 px-4 sm:px-6 flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {[
            { value: "500+", label: "businesses analyzed" },
            { value: "$71M+", label: "in savings identified" },
            { value: "18+", label: "opportunities per business" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-extrabold">
                {s.value}
              </span>
              <span className="text-[10px] sm:text-[11px] text-[var(--mid-gray)]">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ FAQ ═══════════════ */}
      <section aria-label="FAQ" className="py-20 sm:py-28 px-4 sm:px-6">
        <div className="max-w-2xl mx-auto">
          <RevealSection className="text-center mb-14 sm:mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase text-[var(--mid-gray)] mb-3">
              Questions
            </p>
            <h2 className="text-[24px] sm:text-[36px] font-extrabold tracking-[-0.03em] leading-tight">
              Frequently Asked Questions
            </h2>
          </RevealSection>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <RevealSection key={i} delay={i * 80}>
                <FAQItem question={faq.q} answer={faq.a} defaultOpen={i === 0} />
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ FINAL CTA ═══════════════ */}
      <section
        aria-label="Get the playbook"
        className="py-20 sm:py-28 px-4 sm:px-6 bg-[var(--black)] text-white"
      >
        <div className="max-w-3xl mx-auto text-center">
          <RevealSection>
            <h2 className="text-[24px] sm:text-[36px] md:text-[42px] font-extrabold tracking-[-0.03em] leading-tight mb-4">
              Your Competitors Already Have This Data.
              <br className="hidden sm:block" /> Now It&apos;s Your Turn.
            </h2>
            <p className="text-sm sm:text-base text-white/60 max-w-xl mx-auto mb-10 leading-relaxed">
              Get the AI Profit Playbook free. See the 10 implementations, the
              dollar savings, the tools, and the steps. It takes 3 seconds.
            </p>
          </RevealSection>

          <RevealSection delay={200}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const input = form.querySelector("input") as HTMLInputElement;
                if (input) {
                  const heroForm = document.getElementById("hero-email") as HTMLInputElement;
                  if (heroForm) {
                    // Sync the value and trigger the hero form logic
                  }
                  // Duplicate minimal submit logic here
                  const trimmed = input.value.trim().toLowerCase();
                  if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
                    return;
                  }
                  try {
                    localStorage.setItem("gw_lead_email", trimmed);
                  } catch {}
                  fetch("/api/auth/magic-link", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: trimmed }),
                  }).catch(() => {});
                  window.location.href = "/ai-playbook";
                }
              }}
              className="w-full max-w-md mx-auto"
            >
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="email"
                  placeholder="you@company.com"
                  aria-label="Email address"
                  className="flex-1 px-5 py-4 rounded-full border border-white/10 bg-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/40 transition-shadow min-h-[48px]"
                />
                <button
                  type="submit"
                  className="group relative inline-flex items-center justify-center gap-2 font-semibold px-7 py-4 rounded-full text-sm overflow-hidden transition-all duration-300 active:scale-[0.97] bg-white text-[var(--black)] hover:shadow-[0_0_50px_rgba(255,255,255,0.2)] animate-pulse-glow-white min-h-[48px]"
                >
                  <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[800ms] ease-out bg-gradient-to-r from-transparent via-black/5 to-transparent" />
                  <span className="relative z-10">Get Free Access</span>
                  <span className="relative z-10 group-hover:translate-x-1 transition-transform duration-300">
                    <svg
                      width="18"
                      height="18"
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
                </button>
              </div>
            </form>
            <p className="text-[11px] text-white/30 mt-3">
              No spam · No credit card · Instant access
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
