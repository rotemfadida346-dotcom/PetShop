"use client";

import { useState } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { UserPlus } from "lucide-react";

export default function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => { setIsLoading(false); window.location.href = "/account"; }, 1000);
  }

  return (
    <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4"><Input id="firstName" label="שם פרטי" placeholder="ישראל" required /><Input id="lastName" label="שם משפחה" placeholder="ישראלי" required /></div>
        <Input id="email" label="אימייל" type="email" placeholder="you@email.com" required />
        <Input id="password" label="סיסמה" type="password" placeholder="מינימום 8 תווים" required minLength={8} />
        <Input id="confirmPassword" label="אישור סיסמה" type="password" placeholder="הכניסו שוב את הסיסמה" required minLength={8} />
        <label className="flex items-start gap-2 text-sm"><input type="checkbox" required className="mt-0.5 h-4 w-4 rounded border-gray-300 text-text-primary focus:ring-black" />
          <span className="text-text-secondary">אני מסכים/ה ל<Link href="/terms" className="text-text-primary hover:underline">תנאי השימוש</Link> ול<Link href="/privacy" className="text-text-primary hover:underline">מדיניות הפרטיות</Link></span>
        </label>
        <Button type="submit" fullWidth size="lg" isLoading={isLoading}><UserPlus className="h-4 w-4" />צרו חשבון</Button>
      </form>
      <p className="text-center text-sm text-text-secondary mt-6">יש לכם כבר חשבון? <Link href="/auth/signin" className="text-text-primary hover:text-text-secondary font-medium">התחברו</Link></p>
    </div>
  );
}
