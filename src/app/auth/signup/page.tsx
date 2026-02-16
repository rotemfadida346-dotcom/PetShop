import { Metadata } from "next";
import Container from "@/components/ui/Container";
import SignUpForm from "@/components/auth/SignUpForm";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create a Pawsome account to manage orders and subscriptions.",
};

export default function SignUpPage() {
  return (
    <div className="bg-stone-50 min-h-screen flex items-center">
      <Container size="sm">
        <div className="py-12">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">P</span>
                </div>
              </div>
              <h1 className="text-2xl font-bold text-stone-900">
                Create your account
              </h1>
              <p className="text-stone-500 mt-1">
                Join thousands of happy pet parents.
              </p>
            </div>

            <SignUpForm />
          </div>
        </div>
      </Container>
    </div>
  );
}
