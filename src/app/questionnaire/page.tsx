"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import { sections, totalQuestions, type Question } from "@/lib/questions";
import { LogoFull } from "@/components/Logo";
import Link from "next/link";

type Answers = Record<number, string | string[]>;

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

function TextareaInput({ q, value, onChange }: { q: Question; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={q.placeholder}
        rows={4}
        className="w-full bg-transparent border-b-2 border-black/10 focus:border-black py-3 text-lg outline-none transition-colors placeholder:text-black/20 resize-none"
        autoFocus
      />
      {q.examples && (
        <p className="text-xs text-[var(--mid-gray)]/50 mt-2">Examples: {q.examples}</p>
      )}
    </div>
  );
}

function SelectInput({ q, value, onChange }: { q: Question; value: string; onChange: (v: string) => void }) {
  return (
    <div className="grid gap-2.5">
      {q.options?.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`text-left px-5 py-3.5 rounded-xl border-2 transition-all text-sm font-medium ${
            value === opt
              ? "border-[var(--black)] bg-[var(--black)] text-white"
              : "border-black/8 hover:border-black/20 bg-white"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function MultiSelectInput({ q, value, onChange }: { q: Question; value: string[]; onChange: (v: string[]) => void }) {
  const toggle = (opt: string) => {
    if (value.includes(opt)) {
      onChange(value.filter((v) => v !== opt));
    } else {
      onChange([...value, opt]);
    }
  };
  return (
    <div>
      <p className="text-xs text-[var(--mid-gray)] mb-3">Select all that apply</p>
      <div className="grid gap-2.5">
        {q.options?.map((opt) => (
          <button
            key={opt}
            onClick={() => toggle(opt)}
            className={`text-left px-5 py-3.5 rounded-xl border-2 transition-all text-sm font-medium flex items-center gap-3 ${
              value.includes(opt)
                ? "border-[var(--black)] bg-[var(--black)] text-white"
                : "border-black/8 hover:border-black/20 bg-white"
            }`}
          >
            <span className={`w-5 h-5 rounded flex items-center justify-center text-xs shrink-0 ${
              value.includes(opt) ? "bg-white text-black" : "bg-black/5"
            }`}>
              {value.includes(opt) ? "✓" : ""}
            </span>
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

function ScaleInput({ q, value, onChange }: { q: Question; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <div className="flex justify-between text-xs text-[var(--mid-gray)] mb-3">
        <span>{q.scaleLabels?.low}</span>
        <span>{q.scaleLabels?.high}</span>
      </div>
      <div className="grid grid-cols-5 gap-2">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            onClick={() => onChange(String(n))}
            className={`aspect-square rounded-xl border-2 text-lg font-bold transition-all ${
              value === String(n)
                ? "border-[var(--black)] bg-[var(--black)] text-white"
                : "border-black/8 hover:border-black/20 bg-white"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

function RankInput({ q, value, onChange }: { q: Question; value: string[]; onChange: (v: string[]) => void }) {
  const items = value.length > 0 ? value : q.options || [];
  
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
      <p className="text-xs text-[var(--mid-gray)] mb-3">Drag or use arrows to rank from most to least important</p>
      <div className="grid gap-2">
        {items.map((item, i) => (
          <div
            key={item}
            className="flex items-center gap-3 px-5 py-3.5 rounded-xl border-2 border-black/8 bg-white text-sm font-medium"
          >
            <span className="text-xs font-bold text-[var(--mid-gray)]/40 w-6">{i + 1}.</span>
            <span className="flex-1">{item}</span>
            <div className="flex flex-col gap-0.5">
              <button onClick={() => moveUp(i)} className="text-[var(--mid-gray)] hover:text-black text-xs leading-none p-1">▲</button>
              <button onClick={() => moveDown(i)} className="text-[var(--mid-gray)] hover:text-black text-xs leading-none p-1">▼</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function QuestionnairePage() {
  const [sectionIndex, setSectionIndex] = useState(0);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [completing, setCompleting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

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
    if (typeof a === "string") return a.trim().length > 0;
    return false;
  };

  const next = () => {
    if (questionIndex < visibleQuestions.length - 1) {
      setQuestionIndex(questionIndex + 1);
    } else if (sectionIndex < sections.length - 1) {
      setSectionIndex(sectionIndex + 1);
      setQuestionIndex(0);
    } else {
      setCompleting(true);
      sessionStorage.setItem("groundwork_answers", JSON.stringify(answers));
      setTimeout(() => {
        window.location.href = "/report";
      }, 2500);
    }
  };

  const prev = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
    } else if (sectionIndex > 0) {
      setSectionIndex(sectionIndex - 1);
      const prevSection = sections[sectionIndex - 1];
      const prevVisible = prevSection.questions.filter((q) => {
        if (!q.conditional) return true;
        const dep = answers[q.conditional.questionId];
        return dep !== q.conditional.notValue;
      });
      setQuestionIndex(prevVisible.length - 1);
    }
  };

  // Keyboard nav
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Enter" && canContinue()) {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  if (completing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--black)] text-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin mx-auto mb-8" />
          <h2 className="text-2xl font-bold mb-2">Analyzing your business...</h2>
          <p className="text-white/50">Our AI is building your personalized report</p>
        </div>
      </div>
    );
  }

  if (!question) return null;

  return (
    <div className="min-h-screen bg-white flex flex-col" ref={containerRef}>
      {/* Top bar */}
      <div className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-black/5">
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <LogoFull />
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-xs text-[var(--mid-gray)]">
              {answeredCount} of {totalQuestions}
            </span>
            <button
              onClick={() => {
                if (confirm("Leave the questionnaire? Your progress will be lost.")) {
                  window.location.href = "/";
                }
              }}
              className="text-xs text-[var(--mid-gray)] hover:text-black transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
        {/* Progress bar */}
        <div className="h-0.5 bg-black/5">
          <div
            className="h-full bg-[var(--black)] progress-bar"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex items-start justify-center px-6 pt-12 pb-24">
        <div className="w-full max-w-xl">
          {/* Section label */}
          <div className="flex items-center gap-3 mb-8">
            <span className="text-xs font-bold text-[var(--mid-gray)]/40">
              Section {section.id} of {sections.length}
            </span>
            <span className="text-xs text-[var(--mid-gray)]/30">•</span>
            <span className="text-xs font-medium text-[var(--mid-gray)]">
              {section.title}
            </span>
          </div>

          {/* Question */}
          <div key={question.id} className="slide-up">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8 leading-snug">
              {question.question}
            </h2>

            {question.type === "text" || question.type === "email" ? (
              <TextInput q={question} value={currentAnswer as string} onChange={setAnswer} />
            ) : question.type === "textarea" ? (
              <TextareaInput q={question} value={currentAnswer as string} onChange={setAnswer} />
            ) : question.type === "select" ? (
              <SelectInput q={question} value={currentAnswer as string} onChange={(v) => { setAnswer(v); }} />
            ) : question.type === "multi-select" ? (
              <MultiSelectInput q={question} value={currentAnswer as string[]} onChange={setAnswer} />
            ) : question.type === "scale" ? (
              <ScaleInput q={question} value={currentAnswer as string} onChange={setAnswer} />
            ) : question.type === "rank" ? (
              <RankInput q={question} value={currentAnswer as string[]} onChange={setAnswer} />
            ) : null}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-12">
            <button
              onClick={prev}
              disabled={sectionIndex === 0 && questionIndex === 0}
              className="text-sm text-[var(--mid-gray)] hover:text-black transition-colors disabled:opacity-20 disabled:cursor-not-allowed flex items-center gap-2"
            >
              ← Back
            </button>

            <button
              onClick={next}
              disabled={!canContinue()}
              className={`text-sm font-semibold px-8 py-3 rounded-full transition-all ${
                canContinue()
                  ? "bg-[var(--black)] text-white hover:bg-[var(--dark-surface)]"
                  : "bg-black/5 text-black/20 cursor-not-allowed"
              }`}
            >
              {sectionIndex === sections.length - 1 && questionIndex === visibleQuestions.length - 1
                ? "Generate My Report →"
                : "Continue →"}
            </button>
          </div>

          {/* Enter hint */}
          {canContinue() && (
            <p className="text-center text-xs text-[var(--mid-gray)]/30 mt-6">
              Press <kbd className="bg-black/5 px-1.5 py-0.5 rounded text-[10px] font-mono">Enter ↵</kbd> to continue
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
