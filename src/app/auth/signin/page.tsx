import { Metadata } from "next";
import Container from "@/components/ui/Container";
import SignInForm from "@/components/auth/SignInForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Pawsome account.",
};

export default function SignInPage() {
  return (
    <div className="bg-stone-50 min-h-screen flex items-center">
      <Container size="sm">
        <div className="py-12">
          <div className="max-w-md mx-auto">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">P</span>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-stone-900">
                Welcome back
              </h1>
              <p className="text-stone-500 mt-1">
                Sign in to your account to manage orders and subscriptions.
              </p>
            </div>

            <SignInForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
