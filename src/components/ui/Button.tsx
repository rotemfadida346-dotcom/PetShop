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
    const v = {
      primary: "bg-accent text-text-inverse hover:bg-accent-400 shadow-lg shadow-accent/15",
      secondary: "bg-surface-light text-text-primary hover:bg-surface-hover border border-border",
      outline: "border border-border-light text-text-secondary hover:border-accent/60 hover:text-accent",
      ghost: "text-text-secondary hover:bg-surface hover:text-text-primary",
      danger: "bg-red-600/90 text-white hover:bg-red-500",
    };
    const s = {
      sm: "px-3.5 py-1.5 text-body-sm rounded-lg",
      md: "px-5 py-2.5 text-body-sm rounded-2xl",
      lg: "px-8 py-3.5 text-body rounded-2xl",
    };
    return (
      <button ref={ref} className={cn("inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:ring-offset-2 focus:ring-offset-bg disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.97]", v[variant], s[size], fullWidth && "w-full", className)} disabled={disabled || isLoading} {...props}>
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
export default Button;
