import { Metadata } from "next";
import Container from "@/components/ui/Container";
import QuizFlow from "@/components/quiz/QuizFlow";

export const metadata: Metadata = {
  title: "Pet Quiz - Find the Perfect Products",
  description:
    "Answer a few questions about your pet and get personalized product recommendations tailored to their needs.",
};

export default function QuizPage() {
  return (
    <div className="bg-gradient-to-b from-amber-50 to-white min-h-screen">
      <Container size="md">
        <div className="py-12 md:py-20">
          <QuizFlow />
        </div>
      </Container>
    </div>
  );
}
