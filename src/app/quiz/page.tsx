import { Metadata } from "next";
import dynamic from "next/dynamic";
import Container from "@/components/ui/Container";

const QuizFlow = dynamic(() => import("@/components/quiz/QuizFlow"), {
  loading: () => (
    <div className="flex items-center justify-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
    </div>
  ),
  ssr: false,
});

export const metadata: Metadata = { title: "שאלון חיות מחמד - מצאו את המוצרים המושלמים" };

export default function QuizPage() {
  return (
    <div className="bg-surface min-h-screen">
      <Container size="md"><div className="py-12 md:py-20"><QuizFlow /></div></Container>
    </div>
  );
}
