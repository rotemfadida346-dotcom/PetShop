import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> { label?: string; error?: string }

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, label, error, id, ...props }, ref) => (
  <div className="w-full">
    {label && <label htmlFor={id} className="mb-1.5 block text-body-sm font-semibold text-text-primary">{label}</label>}
    <input ref={ref} id={id} className={cn("block w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/15 transition-colors", error && "border-red-500 focus:border-red-500", className)} {...props} />
    {error && <p className="mt-1 text-body-sm text-red-400">{error}</p>}
  </div>
));
Input.displayName = "Input";
export default Input;
