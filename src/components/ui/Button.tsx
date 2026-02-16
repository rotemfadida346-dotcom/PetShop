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
      primary: "bg-brand-500 text-white hover:bg-brand-600 shadow-md shadow-brand-500/20 hover:shadow-lg hover:shadow-brand-500/30",
      secondary: "bg-gray-900 text-white hover:bg-gray-800 shadow-md",
      outline: "border-2 border-gray-200 text-gray-700 hover:border-brand-300 hover:bg-brand-50",
      ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
      danger: "bg-red-500 text-white hover:bg-red-600 shadow-md",
    };

    const sizes = {
      sm: "px-3.5 py-1.5 text-sm rounded-lg",
      md: "px-5 py-2.5 text-sm rounded-xl",
      lg: "px-8 py-3.5 text-base rounded-xl",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-400/40 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]",
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
