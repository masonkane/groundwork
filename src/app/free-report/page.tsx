"use client";

import { Suspense, useCallback, useEffect, useRef, useState } from "react";
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

function EmailForm({
  id,
  ctaLabel = "Get the Free Playbook",
  onSuccess,
}: {
  id: string;
  ctaLabel?: string;
  onSuccess?: () => void;
}) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const trimmedName = firstName.trim();
    const trimmed = email.trim().toLowerCase();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);

    // Store locally (used for playbook access gating + questionnaire update)
    try {
      localStorage.setItem("gw_lead_email", trimmed);
      if (trimmedName) localStorage.setItem("gw_lead_firstName", trimmedName);
    } catch {}

    // Capture UTM params
    const utmKeys = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];
    const utms: Record<string, string> = {};
    try {
      utmKeys.forEach((k) => {
        const v = searchParams.get(k);
        if (v) utms[k] = v;
      });
      if (Object.keys(utms).length > 0) {
        localStorage.setItem("gw_utm", JSON.stringify(utms));
      }
    } catch {}

    // Persist lead to server
    fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: trimmed,
        firstName: trimmedName || undefined,
        source: "hero-email-form",
        utm: Object.keys(utms).length > 0 ? utms : undefined,
      }),
    }).catch(() => {});

    if (onSuccess) {
      onSuccess();
    } else {
      router.push("/ai-playbook");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col gap-3">
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
          aria-label="First name"
          className="w-full px-5 py-4 rounded-full border border-black/10 bg-white text-sm placeholder:text-[var(--mid-gray)]/40 focus:outline-none focus:ring-2 focus:ring-[var(--black)] transition-shadow min-h-[48px]"
        />
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
      </div>
      {error && (
        <p className="text-red-500 text-xs mt-2 text-center">{error}</p>
      )}
    </form>
  );
}

/* ── Questionnaire data ─────────────────────────── */

interface QuestionSingleSelect {
  key: string;
  question: string;
  type: "single";
  options: string[];
}

interface QuestionMultiSelect {
  key: string;
  question: string;
  type: "multi";
  maxSelect: number;
  options: string[];
}

type Question = QuestionSingleSelect | QuestionMultiSelect;

const questions: Question[] = [
  {
    key: "industry",
    question: "What industry is your business in?",
    type: "single",
    options: [
      "Construction & Trades",
      "Healthcare",
      "E-Commerce & Retail",
      "Professional Services",
      "Real Estate",
      "Marketing Agency",
      "Finance & Insurance",
      "Manufacturing",
      "Technology & SaaS",
      "Hospitality",
      "Other",
    ],
  },
  {
    key: "teamSize",
    question: "How many employees?",
    type: "single",
    options: ["Just me", "2-5", "6-20", "21-50", "51-100", "100+"],
  },
  {
    key: "painPoints",
    question: "What are your biggest operational pain points?",
    type: "multi",
    maxSelect: 3,
    options: [
      "Lead follow-up is slow or inconsistent",
      "Customer support takes too much time",
      "Invoicing & documents are manual",
      "Reporting eats hours every week",
      "Scheduling is a mess",
      "Content creation is a bottleneck",
      "Don't know which leads to prioritize",
      "Inventory/supply issues",
      "Hard to track customer sentiment",
      "Hiring takes forever",
    ],
  },
  {
    key: "goal",
    question: "What's your #1 goal with AI?",
    type: "single",
    options: [
      "Cut costs and save money",
      "Save time on repetitive tasks",
      "Win more customers",
      "Scale without hiring",
      "Get ahead of competitors",
    ],
  },
];

/* ── Questionnaire component ────────────────────── */

function Questionnaire({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [fadeState, setFadeState] = useState<"in" | "out">("in");
  const totalSteps = questions.length;
  const current = questions[step];

  const transitionTo = useCallback((next: number) => {
    setFadeState("out");
    setTimeout(() => {
      setStep(next);
      setFadeState("in");
    }, 200);
  }, []);

  const handleSingleSelect = useCallback(
    (option: string) => {
      setAnswers((prev) => ({ ...prev, [current.key]: option }));
      if (step < totalSteps - 1) {
        setTimeout(() => transitionTo(step + 1), 300);
      } else {
        // Last question -- save and redirect
        setTimeout(() => {
          const finalAnswers = { ...answers, [current.key]: option };
          try {
            localStorage.setItem("gw_playbook_answers", JSON.stringify(finalAnswers));
          } catch {}

          // Update lead record with questionnaire answers
          try {
            const email = localStorage.getItem("gw_lead_email");
            if (email) {
              const utmRaw = localStorage.getItem("gw_utm");
              const utm = utmRaw ? JSON.parse(utmRaw) : undefined;
              const firstName = localStorage.getItem("gw_lead_firstName") || undefined;
              fetch("/api/leads", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email,
                  firstName,
                  source: "questionnaire-complete",
                  answers: finalAnswers,
                  utm,
                }),
              }).catch(() => {});
            }
          } catch {}

          onComplete();
        }, 300);
      }
    },
    [answers, current.key, onComplete, step, totalSteps, transitionTo]
  );

  const handleMultiSelect = useCallback(
    (option: string) => {
      setAnswers((prev) => {
        const currentSelections = (prev[current.key] as string[]) || [];
        if (currentSelections.includes(option)) {
          return {
            ...prev,
            [current.key]: currentSelections.filter((o) => o !== option),
          };
        }
        const maxSelect = (current as QuestionMultiSelect).maxSelect;
        if (currentSelections.length >= maxSelect) return prev;
        return {
          ...prev,
          [current.key]: [...currentSelections, option],
        };
      });
    },
    [current]
  );

  const handleMultiContinue = useCallback(() => {
    if (step < totalSteps - 1) {
      transitionTo(step + 1);
    } else {
      try {
        localStorage.setItem("gw_playbook_answers", JSON.stringify(answers));
      } catch {}
      onComplete();
    }
  }, [answers, onComplete, step, totalSteps, transitionTo]);

  const handleBack = useCallback(() => {
    if (step > 0) {
      transitionTo(step - 1);
    }
  }, [step, transitionTo]);

  const progressPercent = ((step + 1) / totalSteps) * 100;
  const multiSelections = (answers[current.key] as string[]) || [];
  const singleSelection = (answers[current.key] as string) || "";

  return (
    <div className="max-w-2xl mx-auto text-center relative z-10">
      <div className="flex justify-center mb-8 sm:mb-10">
        <LogoFull className="h-7 sm:h-8" />
      </div>

      {/* Progress indicator */}
      <p className="text-xs font-semibold tracking-widest uppercase text-[var(--mid-gray)] mb-3">
        Step {step + 1} of {totalSteps}
      </p>
      <div className="w-full max-w-xs mx-auto h-1.5 bg-[var(--light-surface)] rounded-full mb-10 overflow-hidden">
        <div
          className="h-full bg-[var(--black)] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Question content with fade transition */}
      <div
        className="transition-opacity duration-200 ease-in-out"
        style={{ opacity: fadeState === "in" ? 1 : 0 }}
      >
        <h2 className="text-[22px] sm:text-[32px] font-extrabold tracking-[-0.03em] leading-tight mb-3">
          {current.question}
        </h2>

        {current.type === "multi" && (
          <p className="text-sm text-[var(--mid-gray)] mb-6">
            Pick up to {(current as QuestionMultiSelect).maxSelect}
          </p>
        )}

        {current.type === "single" && <div className="mb-6" />}

        {/* Option pills */}
        <div className="flex flex-wrap justify-center gap-3 max-w-xl mx-auto">
          {current.options.map((option) => {
            const isSelected =
              current.type === "single"
                ? singleSelection === option
                : multiSelections.includes(option);

            return (
              <button
                key={option}
                type="button"
                onClick={() =>
                  current.type === "single"
                    ? handleSingleSelect(option)
                    : handleMultiSelect(option)
                }
                className={`px-5 py-3 rounded-full text-sm font-semibold transition-all duration-200 min-h-[48px] ${
                  isSelected
                    ? "bg-[var(--black)] text-white border border-[var(--black)]"
                    : "bg-white border border-black/10 hover:border-black/30 text-[var(--black)]"
                }`}
              >
                {option}
              </button>
            );
          })}
        </div>

        {/* Multi-select continue button */}
        {current.type === "multi" && multiSelections.length > 0 && (
          <div className="mt-8">
            <button
              type="button"
              onClick={handleMultiContinue}
              className="group relative inline-flex items-center justify-center gap-2 font-semibold px-8 py-4 rounded-full text-sm overflow-hidden transition-all duration-300 active:scale-[0.97] bg-[var(--black)] text-white hover:shadow-[0_4px_50px_rgba(0,0,0,0.3)] min-h-[48px]"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-[800ms] ease-out bg-gradient-to-r from-transparent via-white/20 to-transparent" />
              <span className="relative z-10">Continue</span>
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
        )}

        {/* Back link */}
        {step > 0 && (
          <div className="mt-6">
            <button
              type="button"
              onClick={handleBack}
              className="text-sm text-[var(--mid-gray)] hover:text-[var(--black)] transition-colors duration-200 min-h-[48px]"
            >
              &larr; Back
            </button>
          </div>
        )}
      </div>
    </div>
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
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [heroFade, setHeroFade] = useState<"visible" | "fading" | "questionnaire">("visible");
  const router = useRouter();

  const handleEmailSuccess = useCallback(() => {
    setHeroFade("fading");
    setTimeout(() => {
      setShowQuestionnaire(true);
      setHeroFade("questionnaire");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 300);
  }, []);

  const handleQuestionnaireComplete = useCallback(() => {
    router.push("/ai-playbook");
  }, [router]);

  // Bottom CTA submit handler
  const [bottomCtaError, setBottomCtaError] = useState("");
  const handleBottomCtaSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setBottomCtaError("");
      const form = e.currentTarget as HTMLFormElement;
      const inputs = form.querySelectorAll("input");
      const nameInput = inputs[0] as HTMLInputElement;
      const emailInput = inputs[1] as HTMLInputElement;
      if (!emailInput) return;
      const trimmedName = nameInput?.value.trim() || "";
      const trimmed = emailInput.value.trim().toLowerCase();
      if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
        setBottomCtaError("Please enter a valid email address.");
        return;
      }
      try {
        localStorage.setItem("gw_lead_email", trimmed);
        if (trimmedName) localStorage.setItem("gw_lead_firstName", trimmedName);
      } catch {}
      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          firstName: trimmedName || undefined,
          source: "bottom-cta",
        }),
      }).catch(() => {});
      handleEmailSuccess();
    },
    [handleEmailSuccess]
  );

  return (
    <main className="dot-grid min-h-screen">
      {/* ═══════════════ HERO ═══════════════ */}
      <section
        aria-label="Hero"
        className="relative min-h-[85vh] sm:min-h-screen flex items-center justify-center px-4 sm:px-6 pt-12 pb-16"
      >
        <div
          className="absolute inset-0 pointer-events-none mesh-gradient-hero"
        />

        {/* Landing page content */}
        {!showQuestionnaire && (
          <div
            className="max-w-3xl mx-auto text-center relative z-10 transition-opacity duration-300"
            style={{ opacity: heroFade === "fading" ? 0 : 1 }}
          >
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
              <h1 className="text-[32px] sm:text-[52px] md:text-[68px] font-light tracking-[-0.035em] leading-[1.08] mb-5 sm:mb-6 px-2">
                Find Out Exactly How Much
                <br className="hidden sm:block" /> AI Could <span className="font-extrabold">Save Your
                <br className="hidden sm:block" /> Business</span> This Year
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
              <Suspense><EmailForm id="hero-email" onSuccess={handleEmailSuccess} /></Suspense>
              <p className="text-[11px] text-[var(--mid-gray)]/40 mt-3">
                No spam · No credit card · Instant access
              </p>
              <div className="flex items-center justify-center gap-4 mt-5">
                <div className="flex -space-x-2">
                  {["JF", "SK", "MR", "AL", "TC"].map((initials, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full bg-[var(--light-surface)] border-2 border-[var(--black)] flex items-center justify-center text-[8px] font-bold text-[var(--mid-gray)]"
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
        )}

        {/* Questionnaire content */}
        {showQuestionnaire && (
          <div
            className="w-full transition-opacity duration-300"
            style={{ opacity: heroFade === "questionnaire" ? 1 : 0 }}
          >
            <Questionnaire onComplete={handleQuestionnaireComplete} />
          </div>
        )}
      </section>

      {/* ═══════════════ TRUST BAR ═══════════════ */}
      <section
        aria-label="Key stats"
        className="border-t border-black/5 bg-[var(--light-surface)]"
      >
        <div className="max-w-4xl mx-auto py-4 sm:py-5 px-4 sm:px-6 flex flex-wrap items-center justify-center gap-4 sm:gap-10">
          {[
            { value: "$142K", label: "avg savings identified" },
            { value: "10", label: "AI implementations" },
            { value: "6", label: "recommended tools" },
            { value: "100%", label: "free" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <span className="text-sm sm:text-base font-extrabold text-[var(--black)]">
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
      <section aria-label="Problem" className="py-20 sm:py-32 px-4 sm:px-6">
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
                <div className="bg-white border border-black/5 rounded-2xl p-5 sm:p-8 text-center card-accent-hover">
                  <div className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 text-[var(--black)]">
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
        className="py-20 sm:py-32 px-4 sm:px-6 bg-[var(--light-surface)] border-t border-black/5"
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

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {valueCards.map((card, i) => (
              <ScaleReveal key={i} delay={i * 80}>
                <div className="bg-white border border-black/5 rounded-2xl p-5 sm:p-6 h-full card-accent-hover group">
                  <div className="w-10 h-10 bg-[var(--light-surface)] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[var(--black)] group-hover:text-white transition-colors">
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
        className="py-20 sm:py-32 px-4 sm:px-6"
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

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                step: "1",
                title: "Enter Your Email",
                desc: "One field. Takes 3 seconds.",
              },
              {
                step: "2",
                title: "Answer 4 Quick Questions",
                desc: "Tell us about your business so we can personalize your playbook. Takes 30 seconds.",
              },
              {
                step: "3",
                title: "Get Your Personalized Playbook",
                desc: "Instantly access AI implementations tailored to your industry and pain points, with a downloadable PDF.",
              },
            ].map((item, i) => (
              <RevealSection key={i} delay={i * 150} className={i < 2 ? "step-connector" : ""}>
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
      <section aria-label="FAQ" className="py-20 sm:py-32 px-4 sm:px-6">
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
        className="py-20 sm:py-32 px-4 sm:px-6 mesh-gradient-dark text-white"
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
              onSubmit={handleBottomCtaSubmit}
              className="w-full max-w-md mx-auto"
            >
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="First name"
                  aria-label="First name"
                  className="w-full px-5 py-4 rounded-full border border-white/10 bg-white/10 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/40 transition-shadow min-h-[48px]"
                />
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
              </div>
            </form>
            {bottomCtaError && (
              <p className="text-red-400 text-xs mt-2 text-center">{bottomCtaError}</p>
            )}
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
