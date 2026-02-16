"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { LogIn, AlertCircle } from "lucide-react";

export default function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "שגיאה בהתחברות");
        return;
      }

      router.push("/admin");
      router.refresh();
    } catch {
      setError("שגיאה בהתחברות. נסו שוב.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="bg-card rounded-2xl p-8 border border-border shadow-sm">
      {error && (
        <div className="flex items-center gap-2 text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3 mb-4 text-sm">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input id="email" label="אימייל" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="admin@pawsome.co.il" required />
        <Input id="password" label="סיסמה" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="הכניסו סיסמה" required />
        <Button type="submit" fullWidth size="lg" isLoading={isLoading}>
          <LogIn className="h-4 w-4" />
          כניסה לפאנל
        </Button>
      </form>
    </div>
  );
}
