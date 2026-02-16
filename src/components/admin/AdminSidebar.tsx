"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  RefreshCw,
  Settings,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/admin", icon: LayoutDashboard, label: "לוח בקרה" },
  { href: "/admin/products", icon: Package, label: "מוצרים" },
  { href: "/admin/orders", icon: ShoppingCart, label: "הזמנות" },
  { href: "/admin/subscriptions", icon: RefreshCw, label: "מנויים" },
  { href: "/admin/settings", icon: Settings, label: "הגדרות" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden md:block w-56 shrink-0">
      <nav className="sticky top-32 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/admin" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-black text-white shadow-sm"
                  : "text-textSecondary hover:text-textPrimary hover:bg-card hover:shadow-sm"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
