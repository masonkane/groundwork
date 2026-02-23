import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Questionnaire — Groundwork",
  description: "Answer 37 questions about your business and get a personalized AI opportunity report showing exactly where AI can save you money.",
  openGraph: {
    title: "AI Questionnaire — Groundwork",
    description: "Answer 37 questions about your business and get a personalized AI opportunity report showing exactly where AI can save you money.",
  },
};

export default function QuestionnaireLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
