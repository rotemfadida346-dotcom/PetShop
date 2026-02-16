import Link from "next/link";
import Container from "@/components/ui/Container";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  RefreshCw,
  ArrowLeft,
} from "lucide-react";

const ADMIN_NAV = [
  { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/products", icon: Package, label: "Products" },
  { href: "/admin/orders", icon: ShoppingCart, label: "Orders" },
  { href: "/admin/subscriptions", icon: RefreshCw, label: "Subscriptions" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-stone-50 min-h-screen">
      <div className="bg-stone-900 text-white">
        <Container>
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="text-sm text-stone-400 hover:text-white flex items-center gap-1 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Store
              </Link>
              <span className="text-stone-600">|</span>
              <span className="font-semibold text-sm">Admin Dashboard</span>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="flex gap-8 py-8">
          {/* Sidebar */}
          <aside className="hidden md:block w-56 shrink-0">
            <nav className="sticky top-32 space-y-1">
              {ADMIN_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-stone-600 hover:text-stone-900 hover:bg-white transition-colors"
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </aside>

          {/* Content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </Container>
    </div>
  );
}
