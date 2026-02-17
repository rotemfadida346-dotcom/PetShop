import { Metadata } from "next";
import dynamic from "next/dynamic";
import Container from "@/components/ui/Container";

const PersonalConsultationWizard = dynamic(() => import("@/components/quiz/PersonalConsultationWizard"), {
  loading: () => (
    <div className="flex items-center justify-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
    </div>
  ),
  ssr: false,
});

export const metadata: Metadata = { 
  title: "התאמה אישית - קבל המלצות מותאמות אישית",
  description: "מלא שאלון קצר וקבל המלצות מוצרים מותאמות אישית מהמומחים שלנו. ייעוץ חינם ותוכנית טיפוח אישית."
};

export default function QuizPage() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <Container size="lg">
        <div className="py-12 md:py-20">
          <PersonalConsultationWizard />
        </div>
      </Container>
    </div>
  );
}
