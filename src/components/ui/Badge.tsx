import { cn } from "@/lib/utils";

interface BadgeProps { children: React.ReactNode; variant?: "default" | "success" | "warning" | "danger" | "info" | "accent" | "dog" | "cat"; className?: string }

export default function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    default: "bg-surface text-textSecondary border border-border",
    success: "bg-accent-50 text-accent-600 border border-accent-200",
    warning: "bg-amber-900/30 text-amber-400 border border-amber-800/50",
    danger: "bg-red-900/30 text-red-400 border border-red-800/50",
    info: "bg-blue-900/30 text-blue-400 border border-blue-800/50",
    accent: "bg-accent text-white",
    dog: "bg-dog-50 text-dog-600 border border-dog-100",
    cat: "bg-cat-50 text-cat-600 border border-cat-100",
  };
  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", variants[variant], className)}>{children}</span>;
}
