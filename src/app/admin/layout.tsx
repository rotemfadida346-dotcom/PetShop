import Link from "next/link";
import Container from "@/components/ui/Container";
import { LayoutDashboard, Package, ShoppingCart, RefreshCw, ArrowRight } from "lucide-react";

const ADMIN_NAV = [
  { href: "/admin", icon: LayoutDashboard, label: "לוח בקרה" },
  { href: "/admin/products", icon: Package, label: "מוצרים" },
  { href: "/admin/orders", icon: ShoppingCart, label: "הזמנות" },
  { href: "/admin/subscriptions", icon: RefreshCw, label: "מנויים" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-black text-white">
        <Container>
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-6">
              <Link href="/" className="text-sm text-gray-400 hover:text-white flex items-center gap-1 transition-colors"><ArrowRight className="h-4 w-4" />חנות</Link>
              <span className="text-gray-600">|</span>
              <span className="font-semibold text-sm">ניהול</span>
            </div>
          </div>
        </Container>
      </div>
      <Container>
        <div className="flex gap-8 py-8">
          <aside className="hidden md:block w-56 shrink-0">
            <nav className="sticky top-32 space-y-1">
              {ADMIN_NAV.map((item) => (
                <Link key={item.href} href={item.href} className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted hover:text-black hover:bg-white transition-colors">
                  <item.icon className="h-4 w-4" />{item.label}
                </Link>
              ))}
            </nav>
          </aside>
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </Container>
    </div>
  );
}
