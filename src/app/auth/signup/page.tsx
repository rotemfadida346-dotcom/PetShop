import { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import ModernSignUpForm from "@/components/auth/ModernSignUpForm";

export const metadata: Metadata = { title: "הרשמה - הצטרפו ל-PawStory" };

export default function SignUpPage() {
  return (
    <div className="bg-gradient-to-br from-secondary-cream via-white to-secondary-softBlue/20 min-h-screen flex items-center py-12">
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
            <h1 className="text-3xl font-bold text-text-primary mb-2">הצטרפו ל-PawStory! 🐾</h1>
            <p className="text-text-secondary">צרו חשבון חינם ותהנו ממבצעים ייחודיים</p>
          </div>

          {/* Benefits Banner */}
          <div className="bg-gradient-to-r from-success/10 to-info/10 border-2 border-success/30 rounded-xl p-4 mb-6">
            <p className="text-sm font-bold text-success mb-2">🎁 יתרונות החברות:</p>
            <ul className="text-xs text-text-primary space-y-1">
              <li>✓ מעקב אחר הזמנות בזמן אמת</li>
              <li>✓ ניהול מנויים חודשיים</li>
              <li>✓ שמירת מועדפים</li>
              <li>✓ היסטוריית רכישות</li>
              <li>✓ מבצעים בלעדיים</li>
            </ul>
          </div>

          {/* Sign Up Card */}
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200 p-8 mb-6">
            <ModernSignUpForm />
          </div>

          {/* Sign In Link */}
          <div className="text-center bg-gradient-to-r from-secondary-lightGreen to-secondary-softBlue rounded-xl p-4">
            <p className="text-sm text-text-primary">
              כבר יש לך חשבון?{" "}
              <Link href="/auth/signin" className="font-bold text-primary-green hover:text-accent-forest underline">
                התחבר כאן
              </Link>
            </p>
          </div>
        </div>
      </Container>
    </div>
  );
}
