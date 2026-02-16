"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Package, ShoppingCart, RefreshCw, Settings, BarChart3, Users } from "lucide-react";

const NAV = [
  { href: "/admin", icon: LayoutDashboard, label: "לוח בקרה" },
  { href: "/admin/products", icon: Package, label: "מוצרים" },
  { href: "/admin/orders", icon: ShoppingCart, label: "הזמנות" },
  { href: "/admin/subscriptions", icon: RefreshCw, label: "מנויים" },
  { href: "/admin/revenue", icon: BarChart3, label: "הכנסות" },
  { href: "/admin/users", icon: Users, label: "משתמשים" },
  { href: "/admin/settings", icon: Settings, label: "הגדרות" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden md:block w-52 shrink-0">
      <nav className="sticky top-32 space-y-1">
        {NAV.map((i) => {
          const active = pathname === i.href || (i.href !== "/admin" && pathname.startsWith(i.href));
          return (
            <Link key={i.href} href={i.href} className={cn("flex items-center gap-3 px-4 py-2.5 rounded-xl text-body-sm font-medium transition-all", active ? "bg-accent/15 text-accent" : "text-text-secondary hover:text-accent hover:bg-surface-hover")}>
              <i.icon className="h-4 w-4" />{i.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
