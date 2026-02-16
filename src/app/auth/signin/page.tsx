import { Metadata } from "next";
import Container from "@/components/ui/Container";
import SignInForm from "@/components/auth/SignInForm";

export const metadata: Metadata = { title: "התחברות" };

export default function SignInPage() {
  return (
    <div className="bg-surface min-h-screen flex items-center">
      <Container size="sm">
        <div className="py-12">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center"><span className="text-white font-bold">P</span></div>
              </div>
              <h1 className="text-2xl font-bold text-text-primary">ברוכים השבים</h1>
              <p className="text-text-secondary mt-1">התחברו לחשבון שלכם לניהול הזמנות ומנויים.</p>
            </div>
            <SignInForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
