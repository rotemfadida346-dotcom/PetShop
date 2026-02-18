import { Metadata } from "next";
import Container from "@/components/ui/Container";
import ModernSignInForm from "@/components/auth/ModernSignInForm";

export const metadata: Metadata = { title: "התחברות" };

import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="bg-gradient-to-br from-secondary-cream via-white to-secondary-lightGreen/20 min-h-screen flex items-center py-12">
      <Container size="sm">
        <div className="max-w-md mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-green to-primary-blue rounded-2xl mb-4 shadow-xl">
              <svg viewBox="0 0 100 100" className="w-12 h-12">
                <path d="M50 20c-8 0-15 7-15 15s7 15 15 15 15-7 15-15-7-15-15-15z" fill="white"/>
                <circle cx="35" cy="30" r="8" fill="white" opacity="0.8"/>
                <circle cx="65" cy="30" r="8" fill="white" opacity="0.8"/>
                <circle cx="25" cy="45" r="6" fill="white" opacity="0.6"/>
                <circle cx="75" cy="45" r="6" fill="white" opacity="0.6"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">ברוכים השבים! 👋</h1>
            <p className="text-text-secondary">התחברו לחשבון שלכם לניהול הזמנות, מנויים ועוד</p>
          </div>

          {/* Sign In Card */}
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-8 mb-6">
            <ModernSignInForm />
          </div>

          {/* Sign Up Link */}
          <div className="text-center bg-gradient-to-r from-secondary-lightGreen to-secondary-softBlue rounded-xl p-4">
            <p className="text-sm text-text-primary">
              עדיין אין לך חשבון?{" "}
              <Link href="/auth/signup" className="font-bold text-primary-green hover:text-accent-forest underline">
                הרשם עכשיו בחינם
              </Link>
            </p>
          </div>

          {/* Benefits */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-2xl mb-2">📦</div>
              <p className="text-xs font-medium text-text-primary">מעקב הזמנות</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-2xl mb-2">🔄</div>
              <p className="text-xs font-medium text-text-primary">ניהול מנויים</p>
            </div>
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <div className="text-2xl mb-2">💝</div>
              <p className="text-xs font-medium text-text-primary">מועדפים</p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
