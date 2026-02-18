"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { Mail, Lock, User as UserIcon, Eye, EyeOff, AlertCircle, Check } from "lucide-react";

export default function ModernSignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!agreedToTerms) {
      setError("עליך לאשר את תנאי השימוש");
      return;
    }

    setIsLoading(true);

    // Simulate signup - will connect to NextAuth later
    setTimeout(() => {
      setIsLoading(false);
      router.push("/account");
    }, 1000);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="flex items-center gap-2 text-error bg-error/10 border border-error/30 rounded-lg px-4 py-3 text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Name Input */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-text-primary">
          שם מלא
        </label>
        <div className="relative">
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">
            <UserIcon className="h-5 w-5" />
          </div>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="הכנס את שמך המלא"
            className="w-full pr-12 pl-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-text-primary placeholder:text-text-secondary focus:border-primary-green focus:outline-none focus:ring-4 focus:ring-primary-green/10 transition-all"
            required
          />
        </div>
      </div>

      {/* Email Input */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-text-primary">
          כתובת אימייל
        </label>
        <div className="relative">
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">
            <Mail className="h-5 w-5" />
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
            className="w-full pr-12 pl-4 py-3 bg-white border-2 border-gray-300 rounded-xl text-text-primary placeholder:text-text-secondary focus:border-primary-green focus:outline-none focus:ring-4 focus:ring-primary-green/10 transition-all"
            required
          />
        </div>
      </div>

      {/* Password Input */}
      <div className="space-y-2">
        <label className="block text-sm font-semibold text-text-primary">
          סיסמה
        </label>
        <div className="relative">
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">
            <Lock className="h-5 w-5" />
          </div>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="לפחות 6 תווים"
            className="w-full pr-12 pl-12 py-3 bg-white border-2 border-gray-300 rounded-xl text-text-primary placeholder:text-text-secondary focus:border-primary-green focus:outline-none focus:ring-4 focus:ring-primary-green/10 transition-all"
            required
            minLength={6}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
        <p className="text-xs text-text-secondary flex items-center gap-1">
          <Check className="h-3 w-3 text-success" />
          לפחות 6 תווים
        </p>
      </div>

      {/* Terms Agreement */}
      <div className="space-y-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
            className="w-5 h-5 mt-0.5 text-primary-green border-gray-300 rounded focus:ring-primary-green focus:ring-2"
          />
          <span className="text-sm text-text-secondary">
            אני מסכים ל
            <Link href="/terms" target="_blank" className="text-primary-green hover:underline font-medium">
              תנאי השימוש
            </Link>
            {" "}ול
            <Link href="/privacy" target="_blank" className="text-primary-green hover:underline font-medium">
              מדיניות הפרטיות
            </Link>
          </span>
        </label>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        disabled={!agreedToTerms}
        isLoading={isLoading}
        className="w-full bg-gradient-to-r from-primary-green to-primary-blue hover:from-accent-forest hover:to-accent-navy text-white font-bold py-4 text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        צור חשבון חינם
      </Button>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-white text-text-secondary">או</span>
        </div>
      </div>

      {/* Sign In Link */}
      <div className="text-center">
        <p className="text-text-secondary">
          כבר יש לך חשבון?{" "}
          <Link href="/auth/signin" className="text-primary-green hover:text-accent-forest font-bold underline">
            התחבר כאן
          </Link>
        </p>
      </div>
    </form>
  );
}
