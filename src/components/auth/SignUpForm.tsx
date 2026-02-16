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

    // Placeholder: in production, call /api/auth/register
    setTimeout(() => {
      setIsLoading(false);
      window.location.href = "/account";
    }, 1000);
  }

  return (
    <div className="bg-white rounded-2xl p-8 border border-stone-200 shadow-sm">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            id="firstName"
            label="First Name"
            placeholder="John"
            required
          />
          <Input
            id="lastName"
            label="Last Name"
            placeholder="Doe"
            required
          />
        </div>

        <Input
          id="email"
          label="Email"
          type="email"
          placeholder="you@email.com"
          required
        />
        <Input
          id="password"
          label="Password"
          type="password"
          placeholder="Min. 8 characters"
          required
          minLength={8}
        />
        <Input
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Re-enter your password"
          required
          minLength={8}
        />

        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 rounded border-stone-300 text-amber-600 focus:ring-amber-500"
          />
          <span className="text-stone-600">
            I agree to the{" "}
            <Link href="/terms" className="text-amber-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-amber-600 hover:underline">
              Privacy Policy
            </Link>
          </span>
        </label>

        <Button type="submit" fullWidth size="lg" isLoading={isLoading}>
          <UserPlus className="h-4 w-4" />
          Create Account
        </Button>
      </form>

      <p className="text-center text-sm text-stone-500 mt-6">
        Already have an account?{" "}
        <Link
          href="/auth/signin"
          className="text-amber-600 hover:text-amber-700 font-medium"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
