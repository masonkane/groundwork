"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { sections, totalQuestions, type Question } from "@/lib/questions";
import { LogoFull } from "@/components/Logo";
import Link from "next/link";

type Answers = Record<number, string | string[]>;

/* ── Text Input ───────────────────────────────────── */
function TextInput({ q, value, onChange }: { q: Question; value: string; onChange: (v: string) => void }) {
  return (
    <input
      type={q.type === "email" ? "email" : "text"}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={q.placeholder}
      className="w-full bg-transparent border-b-2 border-black/10 focus:border-black py-3 text-lg outline-none transition-colors placeholder:text-black/20"
      autoFocus
    />
  );
}

/* ── Textarea with Suggestion Chips ───────────────── */
function TextareaInput({
  q, value, onChange,
}: { q: Question; value: string; onChange: (v: string) => void }) {
  const addSuggestion = (s: string) => {
    const current = value.trim();
    if (current.toLowerCase().includes(s.toLowerCase())) return;
    onChange(current ? `${current}, ${s}` : s);
  };

  return (
    <div>
      {q.suggestions && q.suggestions.length > 0 && (
        <div className="mb-4">
          <p className="text-xs text-[var(--mid-gray)]/60 mb-2.5">Click to add, or type your own below</p>
          <div className="flex flex-wrap gap-2">
            {q.suggestions.map((s) => {
              const active = value.toLowerCase().includes(s.toLowerCase());
              return (
                <button
                  key={s}
                  onClick={() => addSuggestion(s)}
                  className={`text-xs px-3.5 py-2 rounded-full border transition-all ${
                    active
                      ? "bg-[var(--black)] text-white border-[var(--black)]"
                      : "bg-white border-black/10 text-[var(--mid-gray)] hover:border-black/25 hover:text-[var(--black)]"
                  }`}
                >
                  {active && <span className="mr-1.5">●</span>}
                  {s}
                </button>
              );
            })}
          </div>
        </div>
      )}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={q.placeholder}
        rows={3}
        className="w-full bg-white border-2 border-black/8 focus:border-black/20 rounded-xl px-4 py-3 text-base outline-none transition-colors placeholder:text-black/20 resize-none"
        autoFocus={!q.suggestions?.length}
      />
    </div>
  );
}

/* ── Select (single) ──────────────────────────────── */
function SelectInput({ q, value, onChange }: { q: Question; value: string; onChange: (v: string) => void }) {
  return (
    <div className="grid gap-2">
      {q.options?.map((opt) => {
        const selected = value === opt;
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`text-left px-5 py-3.5 rounded-xl border-2 transition-all text-sm font-medium flex items-center gap-3 ${
              selected
                ? "border-[var(--black)] bg-[var(--black)] text-white"
                : "border-black/6 hover:border-black/15 bg-white"
            }`}
          >
            <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
              selected ? "border-white bg-white" : "border-black/15"
            }`}>
              {selected && <span className="w-2.5 h-2.5 rounded-full bg-[var(--black)]" />}
            </span>
            {opt}
          </button>
        );
      })}
    </div>
  );
}

/* ── Select with "Other" text input ───────────────── */
function SelectOtherInput({ q, value, onChange }: { q: Question; value: string; onChange: (v: string) => void }) {
  const isOther = value.startsWith("Other: ") || (value === "Other");
  const [otherText, setOtherText] = useState(isOther ? value.replace("Other: ", "") : "");

  return (
    <div className="grid gap-2">
      {q.options?.map((opt) => {
        const selected = value === opt;
        return (
          <button
            key={opt}
            onClick={() => onChange(opt)}
            className={`text-left px-5 py-3.5 rounded-xl border-2 transition-all text-sm font-medium flex items-center gap-3 ${
              selected
                ? "border-[var(--black)] bg-[var(--black)] text-white"
                : "border-black/6 hover:border-black/15 bg-white"
            }`}
          >
            <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
              selected ? "border-white bg-white" : "border-black/15"
            }`}>
              {selected && <span className="w-2.5 h-2.5 rounded-full bg-[var(--black)]" />}
            </span>
            {opt}
          </button>
        );
      })}
      {/* Other option */}
      <div>
        <button
          onClick={() => onChange(otherText ? `Other: ${otherText}` : "Other")}
          className={`w-full text-left px-5 py-3.5 rounded-xl border-2 transition-all text-sm font-medium flex items-center gap-3 ${
            isOther
              ? "border-[var(--black)] bg-[var(--black)] text-white"
              : "border-black/6 hover:border-black/15 bg-white"
          }`}
        >
          <span className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${
            isOther ? "border-white bg-white" : "border-black/15"
          }`}>
            {isOther && <span className="w-2.5 h-2.5 rounded-full bg-[var(--black)]" />}
          </span>
          Other
        </button>
        {isOther && (
          <input
            type="text"
            value={otherText}
            onChange={(e) => {
              setOtherText(e.target.value);
              onChange(e.target.value ? `Other: ${e.target.value}` : "Other");
            }}
            placeholder="Type your industry..."
            className="mt-2 ml-8 w-[calc(100%-2rem)] bg-transparent border-b-2 border-black/10 focus:border-black py-2 text-sm outline-none transition-colors placeholder:text-black/20"
            autoFocus
          />
        )}
      </div>
    </div>
  );
}

/* ── Multi-Select with modern indicators ──────────── */
function MultiSelectInput({ q, value, onChange }: { q: Question; value: string[]; onChange: (v: string[]) => void }) {
  const toggle = (opt: string) => {
    if (value.includes(opt)) onChange(value.filter((v) => v !== opt));
    else onChange([...value, opt]);
  };
  return (
    <div>
      <p className="text-xs text-[var(--mid-gray)]/60 mb-3">Select all that apply</p>
      <div className="grid gap-2">
        {q.options?.map((opt) => {
          const selected = value.includes(opt);
          return (
            <button
              key={opt}
              onClick={() => toggle(opt)}
              className={`text-left px-5 py-3.5 rounded-xl border-2 transition-all text-sm font-medium flex items-center gap-3 ${
                selected
                  ? "border-[var(--black)] bg-[var(--black)] text-white"
                  : "border-black/6 hover:border-black/15 bg-white"
              }`}
            >
              <span className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                selected ? "bg-white" : "bg-black/5 border border-black/10"
              }`}>
                {selected && (
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6L5 8.5L9.5 3.5" stroke="#080808" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </span>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Scale (1-5) ──────────────────────────────────── */
function ScaleInput({ q, value, onChange }: { q: Question; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <div className="flex justify-between text-xs text-[var(--mid-gray)] mb-4">
        <span>{q.scaleLabels?.low}</span>
        <span>{q.scaleLabels?.high}</span>
      </div>
      <div className="grid grid-cols-5 gap-2 sm:gap-3">
        {[1, 2, 3, 4, 5].map((n) => {
          const selected = value === String(n);
          return (
            <button
              key={n}
              onClick={() => onChange(String(n))}
              className={`aspect-square rounded-2xl border-2 text-xl font-bold transition-all ${
                selected
                  ? "border-[var(--black)] bg-[var(--black)] text-white scale-105"
                  : "border-black/6 hover:border-black/15 bg-white"
              }`}
            >
              {n}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Drag-and-Drop Rank ───────────────────────────── */
function RankInput({ q, value, onChange }: { q: Question; value: string[]; onChange: (v: string[]) => void }) {
  const items = value.length > 0 ? value : q.options || [];
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [touchDragIdx, setTouchDragIdx] = useState<number | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleDragStart = (i: number) => {
    setDragIndex(i);
  };

  const handleDragOver = (e: React.DragEvent, i: number) => {
    e.preventDefault();
    setOverIndex(i);
  };

  const handleDrop = (i: number) => {
    if (dragIndex === null || dragIndex === i) {
      setDragIndex(null);
      setOverIndex(null);
      return;
    }
    const arr = [...items];
    const [removed] = arr.splice(dragIndex, 1);
    arr.splice(i, 0, removed);
    onChange(arr);
    setDragIndex(null);
    setOverIndex(null);
  };

  const handleTouchStart = (e: React.TouchEvent, i: number) => {
    setTouchStartY(e.touches[0].clientY);
    setTouchDragIdx(i);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchDragIdx === null || touchStartY === null) return;
    const y = e.touches[0].clientY;
    // Find which item we're over
    for (let i = 0; i < itemRefs.current.length; i++) {
      const el = itemRefs.current[i];
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (y >= rect.top && y <= rect.bottom) {
        setOverIndex(i);
        break;
      }
    }
  };

  const handleTouchEnd = () => {
    if (touchDragIdx !== null && overIndex !== null && touchDragIdx !== overIndex) {
      const arr = [...items];
      const [removed] = arr.splice(touchDragIdx, 1);
      arr.splice(overIndex, 0, removed);
      onChange(arr);
    }
    setTouchDragIdx(null);
    setTouchStartY(null);
    setOverIndex(null);
  };

  const moveUp = (i: number) => {
    if (i === 0) return;
    const arr = [...items];
    [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]];
    onChange(arr);
  };

  const moveDown = (i: number) => {
    if (i === items.length - 1) return;
    const arr = [...items];
    [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
    onChange(arr);
  };

  return (
    <div>
      <p className="text-xs text-[var(--mid-gray)]/60 mb-3">Drag to reorder, or use the arrows</p>
      <div className="grid gap-2" onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        {items.map((item, i) => {
          const isDragging = dragIndex === i || touchDragIdx === i;
          const isOver = overIndex === i && !isDragging;
          return (
            <div
              key={item}
              ref={(el) => { itemRefs.current[i] = el; }}
              draggable
              onDragStart={() => handleDragStart(i)}
              onDragOver={(e) => handleDragOver(e, i)}
              onDrop={() => handleDrop(i)}
              onDragEnd={() => { setDragIndex(null); setOverIndex(null); }}
              onTouchStart={(e) => handleTouchStart(e, i)}
              className={`flex items-center gap-3 px-5 py-3.5 rounded-xl border-2 bg-white text-sm font-medium cursor-grab active:cursor-grabbing select-none transition-all ${
                isDragging ? "opacity-50 scale-[0.98] border-black/20" : isOver ? "border-[var(--black)] bg-[var(--light-surface)]" : "border-black/6"
              }`}
            >
              {/* Drag handle */}
              <span className="text-black/20 shrink-0">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                  <circle cx="5" cy="4" r="1.5"/>
                  <circle cx="11" cy="4" r="1.5"/>
                  <circle cx="5" cy="8" r="1.5"/>
                  <circle cx="11" cy="8" r="1.5"/>
                  <circle cx="5" cy="12" r="1.5"/>
                  <circle cx="11" cy="12" r="1.5"/>
                </svg>
              </span>
              {/* Number badge */}
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                i === 0 ? "bg-[var(--black)] text-white" : "bg-black/5 text-[var(--mid-gray)]"
              }`}>
                {i + 1}
              </span>
              <span className="flex-1">{item}</span>
              {/* Arrow buttons */}
              <div className="flex flex-col shrink-0">
                <button
                  onClick={(e) => { e.stopPropagation(); moveUp(i); }}
                  disabled={i === 0}
                  className="text-black/20 hover:text-black disabled:opacity-20 p-0.5 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M3.5 8.5L7 5L10.5 8.5"/>
                  </svg>
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); moveDown(i); }}
                  disabled={i === items.length - 1}
                  className="text-black/20 hover:text-black disabled:opacity-20 p-0.5 transition-colors"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M3.5 5.5L7 9L10.5 5.5"/>
                  </svg>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Welcome Modal ────────────────────────────────── */
function WelcomeModal({ onStart }: { onStart: () => void }) {
  return (
    <div className="fixed inset-0 z-[100] bg-white flex items-center justify-center px-4 sm:px-6 overflow-y-auto">
      <div className="max-w-lg w-full text-center py-8 sm:py-0">
        {/* Groundwork logo - centered */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <LogoFull className="h-6 sm:h-7 w-auto" />
        </div>
        <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight mb-3 sm:mb-4">
          Before You Start
        </h2>
        <p className="text-[var(--mid-gray)] leading-relaxed mb-2 sm:mb-3 text-sm sm:text-base">
          The more detailed your answers, the better your report.
        </p>
        <p className="text-[var(--mid-gray)] leading-relaxed mb-6 sm:mb-8 text-xs sm:text-sm">
          This is not a generic survey. Our engine uses every word you write to build a
          personalized analysis of your specific business. Vague answers get vague results.
          <span className="font-semibold text-[var(--black)]"> Be specific, be honest, and you will get a report worth thousands.</span>
        </p>
        <div className="flex flex-col items-center gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 w-full mb-4 sm:mb-6">
            {[
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#080808" strokeWidth="1.5" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" />
                  </svg>
                ),
                label: "Be specific about your daily operations",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#080808" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                  </svg>
                ),
                label: "Include real numbers when you can",
              },
              {
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#080808" strokeWidth="1.5" strokeLinecap="round">
                    <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" />
                  </svg>
                ),
                label: "Write in your own words. Do not overthink it",
              },
            ].map((tip) => (
              <div key={tip.label} className="bg-[var(--light-surface)] rounded-xl p-4 text-center">
                <div className="flex justify-center mb-2">{tip.icon}</div>
                <span className="text-[10px] text-[var(--mid-gray)] leading-tight block">{tip.label}</span>
              </div>
            ))}
          </div>
          <button
            onClick={onStart}
            className="group relative inline-flex items-center gap-3 bg-[var(--black)] text-white font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-full text-sm sm:text-base overflow-hidden transition-all duration-300 hover:shadow-[0_4px_40px_rgba(0,0,0,0.25)] active:scale-[0.97]"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[800ms] ease-out" />
            <span className="relative z-10">Let&apos;s Go</span>
            <span className="relative z-10 group-hover:translate-x-1.5 transition-transform duration-300">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 9H14M10 4.5L14.5 9L10 13.5" />
              </svg>
            </span>
          </button>
          <p className="text-[10px] text-[var(--mid-gray)]/30 mt-2">Takes about 15 minutes</p>
        </div>
      </div>
    </div>
  );
}

/* ── Main Questionnaire ───────────────────────────── */
export default function QuestionnairePage() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [completing, setCompleting] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const section = sections[sectionIndex];
  const visibleQuestions = section.questions.filter((q) => {
    if (!q.conditional) return true;
    const depAnswer = answers[q.conditional.questionId];
    return depAnswer !== q.conditional.notValue;
  });
  const question = visibleQuestions[questionIndex];

  // Count progress
  let answeredCount = 0;
  for (const s of sections) {
    for (const q of s.questions) {
      if (q.conditional) {
        const dep = answers[q.conditional.questionId];
        if (dep === q.conditional.notValue) continue;
      }
      const a = answers[q.id];
      if (a && (typeof a === "string" ? a.trim() : a.length > 0)) answeredCount++;
    }
  }
  const progress = Math.round((answeredCount / totalQuestions) * 100);

  const currentAnswer = answers[question?.id] ?? (question?.type === "multi-select" || question?.type === "rank" ? [] : "");

  const setAnswer = useCallback(
    (val: string | string[]) => {
      if (!question) return;
      setAnswers((prev) => ({ ...prev, [question.id]: val }));
    },
    [question]
  );

  const canContinue = () => {
    if (!question) return false;
    const a = currentAnswer;
    if (question.type === "multi-select") return (a as string[]).length > 0;
    if (question.type === "rank") return true;
    if (question.type === "select-other") {
      if (typeof a === "string" && a === "Other") return false; // must type something
      return typeof a === "string" && a.trim().length > 0;
    }
    if (typeof a === "string") return a.trim().length > 0;
    return false;
  };

  const navigate = (dir: "next" | "prev") => {
    setAnimKey((k) => k + 1);
    if (dir === "next") {
      if (questionIndex < visibleQuestions.length - 1) {
        setQuestionIndex(questionIndex + 1);
      } else if (sectionIndex < sections.length - 1) {
        setSectionIndex(sectionIndex + 1);
        setQuestionIndex(0);
      } else {
        setCompleting(true);
        sessionStorage.setItem("groundwork_answers", JSON.stringify(answers));
        setTimeout(() => { window.location.href = "/report"; }, 2500);
      }
    } else {
      if (questionIndex > 0) {
        setQuestionIndex(questionIndex - 1);
      } else if (sectionIndex > 0) {
        const prevSec = sections[sectionIndex - 1];
        const prevVisible = prevSec.questions.filter((q) => {
          if (!q.conditional) return true;
          const dep = answers[q.conditional.questionId];
          return dep !== q.conditional.notValue;
        });
        setSectionIndex(sectionIndex - 1);
        setQuestionIndex(prevVisible.length - 1);
      }
    }
  };

  // Keyboard
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey && canContinue()) {
        e.preventDefault();
        navigate("next");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  if (showWelcome) {
    return <WelcomeModal onStart={() => setShowWelcome(false)} />;
  }

  if (completing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="text-center max-w-sm">
          <div className="w-14 h-14 border-[3px] border-black/10 border-t-[var(--black)] rounded-full animate-spin mx-auto mb-8" />
          <h2 className="text-xl sm:text-2xl font-extrabold mb-2 tracking-tight">Building your report...</h2>
          <p className="text-[var(--mid-gray)] text-sm mb-8">This takes a few seconds.</p>
          <div className="space-y-3 text-left">
            {[
              { label: "Analyzing questionnaire responses", delay: "0s" },
              { label: "Cross-referencing industry benchmarks", delay: "0.6s" },
              { label: "Calculating projected savings", delay: "1.2s" },
              { label: "Generating implementation playbooks", delay: "1.8s" },
            ].map((step) => (
              <div key={step.label} className="flex items-center gap-3 opacity-0" style={{ animation: `fadeInUp 0.4s ease-out ${step.delay} forwards` }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" className="shrink-0"><polyline points="20,6 9,17 4,12"/></svg>
                <span className="text-xs text-[var(--mid-gray)]">{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!question) return null;

  const isFirst = sectionIndex === 0 && questionIndex === 0;
  const isLast = sectionIndex === sections.length - 1 && questionIndex === visibleQuestions.length - 1;

  return (
    <div className="min-h-screen bg-[var(--light-surface)] flex flex-col">
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-white border-b border-black/5">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-3 sm:py-3.5 flex items-center justify-between">
          <Link href="/">
            <LogoFull className="h-6 w-auto" />
          </Link>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-semibold text-[var(--mid-gray)]/40">{Math.round(progress)}%</span>
            <span className="text-xs font-medium text-[var(--mid-gray)]">
              {answeredCount}/{totalQuestions}
            </span>
          </div>
        </div>
        {/* Progress */}
        <div className="h-1 bg-black/5">
          <div className="h-full bg-[var(--black)] progress-bar rounded-r-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex items-start justify-center px-4 sm:px-6 pt-6 sm:pt-10 pb-24 sm:pb-32">
        <div className="w-full max-w-xl" key={animKey}>
          {/* Section badge */}
          <div className="flex items-center gap-2.5 mb-8">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[var(--mid-gray)]/40">
              {section.title}
            </span>
            <span className="text-[10px] text-[var(--mid-gray)]/20">•</span>
            <span className="text-[10px] text-[var(--mid-gray)]/40">
              {sectionIndex + 1} of {sections.length}
            </span>
          </div>

          {/* Question card */}
          <div className="bg-white rounded-2xl border border-black/5 p-5 sm:p-8 shadow-sm slide-up">
            <h2 className="text-lg sm:text-2xl font-bold tracking-tight mb-5 sm:mb-8 leading-snug">
              {question.question}
            </h2>

            {question.type === "text" || question.type === "email" ? (
              <TextInput q={question} value={currentAnswer as string} onChange={setAnswer} />
            ) : question.type === "textarea" ? (
              <TextareaInput q={question} value={currentAnswer as string} onChange={setAnswer} />
            ) : question.type === "select" ? (
              <SelectInput q={question} value={currentAnswer as string} onChange={setAnswer} />
            ) : question.type === "select-other" ? (
              <SelectOtherInput q={question} value={currentAnswer as string} onChange={setAnswer} />
            ) : question.type === "multi-select" ? (
              <MultiSelectInput q={question} value={currentAnswer as string[]} onChange={setAnswer} />
            ) : question.type === "scale" ? (
              <ScaleInput q={question} value={currentAnswer as string} onChange={setAnswer} />
            ) : question.type === "rank" ? (
              <RankInput q={question} value={currentAnswer as string[]} onChange={setAnswer} />
            ) : null}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-6 px-2">
            <button
              onClick={() => navigate("prev")}
              disabled={isFirst}
              className="text-sm text-[var(--mid-gray)] hover:text-black transition-colors disabled:opacity-20 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M10 3L5 8L10 13"/>
              </svg>
              Back
            </button>

            <div className="flex items-center gap-3">
              {canContinue() && (
                <span className="text-[10px] text-[var(--mid-gray)]/30 hidden sm:block">
                  Press <kbd className="bg-white px-1.5 py-0.5 rounded text-[9px] font-mono border border-black/10">Enter ↵</kbd>
                </span>
              )}
              <button
                onClick={() => navigate("next")}
                disabled={!canContinue()}
                className={`text-sm font-semibold px-7 py-3 rounded-full transition-all flex items-center gap-2 ${
                  canContinue()
                    ? "bg-[var(--black)] text-white hover:bg-[var(--dark-surface)] active:scale-[0.97]"
                    : "bg-black/5 text-black/20 cursor-not-allowed"
                }`}
              >
                {isLast ? "Generate My Report" : "Continue"}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M6 3L11 8L6 13"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
