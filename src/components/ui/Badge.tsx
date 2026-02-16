import { cn } from "@/lib/utils";

interface BadgeProps { children: React.ReactNode; variant?: "default" | "success" | "warning" | "danger" | "info" | "accent" | "dog" | "cat"; className?: string }

export default function Badge({ children, variant = "default", className }: BadgeProps) {
  const v = {
    default: "bg-surface-light text-text-secondary",
    success: "bg-accent-50 text-accent-600",
    warning: "bg-amber-900/30 text-amber-400",
    danger: "bg-red-900/30 text-red-400",
    info: "bg-blue-900/30 text-blue-400",
    accent: "bg-accent/15 text-accent",
    dog: "bg-dog-bg text-dog-text",
    cat: "bg-cat-bg text-cat-text",
  };
  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold", v[variant], className)}>{children}</span>;
}
