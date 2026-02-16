"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { LogIn } from "lucide-react";

export default function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); window.location.href = "/account"; }, 1000);
  }

  return (
    <div className="bg-white rounded-2xl p-8 border border-border shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input id="email" label="אימייל" type="email" placeholder="you@email.com" required />
        <Input id="password" label="סיסמה" type="password" placeholder="הכניסו סיסמה" required />
        <div className="flex items-center justify-between">
          <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black" /><span className="text-muted">זכור אותי</span></label>
          <Link href="/auth/forgot-password" className="text-sm text-black hover:text-muted font-medium">שכחתם סיסמה?</Link>
        </div>
        <Button type="submit" fullWidth size="lg" isLoading={isLoading}><LogIn className="h-4 w-4" />התחברות</Button>
      </form>
      <p className="text-center text-sm text-muted mt-6">אין לכם חשבון? <Link href="/auth/signup" className="text-black hover:text-muted font-medium">צרו חשבון</Link></p>
    </div>
  );
}
