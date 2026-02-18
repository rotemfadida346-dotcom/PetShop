import { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = { title: "התחברות לפאנל ניהול - PawStory Admin" };

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-green/5 via-white to-primary-blue/5">
      <Container size="sm">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary-green to-primary-blue rounded-2xl mb-4 shadow-2xl">
              <svg viewBox="0 0 100 100" className="w-12 h-12">
                <path d="M50 20c-8 0-15 7-15 15s7 15 15 15 15-7 15-15-7-15-15-15z" fill="white"/>
                <circle cx="35" cy="30" r="8" fill="white" opacity="0.8"/>
                <circle cx="65" cy="30" r="8" fill="white" opacity="0.8"/>
                <circle cx="25" cy="45" r="6" fill="white" opacity="0.6"/>
                <circle cx="75" cy="45" r="6" fill="white" opacity="0.6"/>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-text-primary mb-2">PawStory Admin</h1>
            <p className="text-text-secondary mb-6">פאנל ניהול החנות</p>
            
            {/* Credentials Box */}
            <div className="bg-gradient-to-r from-emerald-50 to-green-50 border-2 border-emerald-300 rounded-xl p-5 text-right mb-6 shadow-lg">
              <p className="text-base font-bold text-emerald-900 mb-3 flex items-center gap-2">
                <span className="text-2xl">🔑</span>
                פרטי התחברות:
              </p>
              <div className="space-y-3">
                <div className="bg-white rounded-lg p-4 space-y-2 border-2 border-emerald-400">
                  <p className="text-xs font-bold text-emerald-700 mb-2">אפשרות 1 - Admin ראשי:</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">אימייל:</span>
                    <code className="text-sm font-bold text-primary-green bg-emerald-50 px-3 py-1 rounded">
                      admin@pawsome.com
                    </code>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">סיסמה:</span>
                    <code className="text-sm font-bold text-primary-green bg-emerald-50 px-3 py-1 rounded">
                      admin123456
                    </code>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4 space-y-2 border-2 border-blue-400">
                  <p className="text-xs font-bold text-blue-700 mb-2">אפשרות 2 - המייל שלך:</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">אימייל:</span>
                    <code className="text-sm font-bold text-primary-blue bg-blue-50 px-3 py-1 rounded">
                      rotemfadida346@gmail.com
                    </code>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-text-secondary">סיסמה:</span>
                    <code className="text-sm font-bold text-primary-blue bg-blue-50 px-3 py-1 rounded">
                      admin123456
                    </code>
                  </div>
                </div>
              </div>
              <p className="text-xs text-emerald-700 mt-3 text-center">
                💡 שני האימיילים יעבדו - בחר את המועדף עליך!
              </p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-2xl border-2 border-gray-200">
            <AdminLoginForm />
          </div>
          
          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-primary-green hover:text-accent-forest font-medium inline-flex items-center gap-2">
              ← חזרה לאתר
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
