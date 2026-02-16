import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { label?: string; error?: string }

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, label, error, id, ...props }, ref) => (
  <div className="w-full">
    {label && <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-textPrimary">{label}</label>}
    <input ref={ref} id={id} className={cn("block w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-textPrimary placeholder:text-textMuted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 transition-colors", error && "border-red-500 focus:border-red-500 focus:ring-red-500/20", className)} {...props} />
    {error && <p className="mt-1 text-sm text-red-400">{error}</p>}
  </div>
));
Input.displayName = "Input";
export default Input;
