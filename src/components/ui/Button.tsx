"use client";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isLoading = false, fullWidth = false, children, disabled, ...props }, ref) => {
    const variants = {
      primary: "bg-accent text-white hover:bg-accent-600 shadow-lg shadow-accent/20 hover:shadow-accent/30",
      secondary: "bg-surface text-textPrimary hover:bg-card-hover border border-border shadow-md",
      outline: "border-2 border-border text-textPrimary hover:border-accent hover:text-accent",
      ghost: "text-textSecondary hover:bg-surface hover:text-textPrimary",
      danger: "bg-red-600 text-white hover:bg-red-500 shadow-md",
    };
    const sizes = {
      sm: "px-3.5 py-1.5 text-sm rounded-lg",
      md: "px-5 py-2.5 text-sm rounded-xl",
      lg: "px-8 py-3.5 text-base rounded-xl",
    };
    return (
      <button ref={ref} className={cn("inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]", variants[variant], sizes[size], fullWidth && "w-full", className)} disabled={disabled || isLoading} {...props}>
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
export default Button;
