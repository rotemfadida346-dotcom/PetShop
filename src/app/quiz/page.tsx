import { Metadata } from "next";
import Container from "@/components/ui/Container";
import QuizFlow from "@/components/quiz/QuizFlow";

export const metadata: Metadata = { title: "שאלון חיות מחמד - מצאו את המוצרים המושלמים" };

export default function QuizPage() {
  return (
    <div className="bg-surface min-h-screen">
      <Container size="md"><div className="py-12 md:py-20"><QuizFlow /></div></Container>
    </div>
  );
}
