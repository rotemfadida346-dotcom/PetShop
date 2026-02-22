"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import Button from "@/components/ui/Button";
import { Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function ModernSignInForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
    } catch {
      setError("התחברות נכשלה. אנא בדוק את הפרטים ונסה שוב.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {error && (
        <div className="flex items-center gap-2 text-error bg-error/10 border border-error/30 rounded-lg px-4 py-3 text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

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
            placeholder="הכנס סיסמה"
            className="w-full pr-12 pl-12 py-3 bg-white border-2 border-gray-300 rounded-xl text-text-primary placeholder:text-text-secondary focus:border-primary-green focus:outline-none focus:ring-4 focus:ring-primary-green/10 transition-all"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors"
          >
            {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Remember & Forgot */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            className="w-4 h-4 text-primary-green border-gray-300 rounded focus:ring-primary-green focus:ring-2"
          />
          <span className="text-text-secondary">זכור אותי</span>
        </label>
        <Link href="/auth/forgot-password" className="text-primary-green hover:text-accent-forest font-medium">
          שכחת סיסמה?
        </Link>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="lg"
        isLoading={isLoading}
        className="w-full bg-gradient-to-r from-primary-green to-primary-blue hover:from-accent-forest hover:to-accent-navy text-white font-bold py-4 text-lg shadow-lg hover:shadow-xl transition-all"
      >
        התחבר לחשבון
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

      {/* Sign Up Link */}
      <div className="text-center">
        <p className="text-text-secondary">
          אין לך חשבון?{" "}
          <Link href="/auth/signup" className="text-primary-green hover:text-accent-forest font-bold underline">
            הירשם עכשיו בחינם
          </Link>
        </p>
      </div>
    </form>
  );
}
