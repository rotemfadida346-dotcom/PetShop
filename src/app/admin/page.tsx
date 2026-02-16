import { Metadata } from "next";
import { formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import { DollarSign, Package, ShoppingCart, RefreshCw, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = { title: "לוח בקרה" };

const STATS = [
  { label: "הכנסות", value: "₪48,450", change: "+12.5%", icon: DollarSign },
  { label: "הזמנות", value: "156", change: "+8.2%", icon: ShoppingCart },
  { label: "מוצרים", value: "10", change: "0", icon: Package },
  { label: "מנויים פעילים", value: "47", change: "+23%", icon: RefreshCw },
];

const RECENT_ORDERS = [
  { id: "ORD-001", customer: "שרה מ.", email: "sarah@example.com", total: 339.97, status: "PROCESSING", date: "2025-01-28" },
  { id: "ORD-002", customer: "יעקב ר.", email: "james@example.com", total: 267.98, status: "SHIPPED", date: "2025-01-27" },
  { id: "ORD-003", customer: "אמילי ק.", email: "emily@example.com", total: 54.99, status: "DELIVERED", date: "2025-01-26" },
  { id: "ORD-004", customer: "מיכאל ט.", email: "mike@example.com", total: 124.97, status: "PENDING", date: "2025-01-28" },
];

const STATUS_COLORS: Record<string, "success" | "info" | "warning" | "default"> = { DELIVERED: "success", SHIPPED: "info", PROCESSING: "warning", PENDING: "default" };
const STATUS_LABELS: Record<string, string> = { DELIVERED: "נמסר", SHIPPED: "נשלח", PROCESSING: "בטיפול", PENDING: "ממתין" };

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-6">לוח בקרה</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((stat) => (
          <div key={stat.label} className="bg-white rounded-xl border border-border p-5">
            <div className="flex items-center justify-between mb-3"><span className="text-sm text-muted">{stat.label}</span><stat.icon className="h-5 w-5 text-muted" /></div>
            <p className="text-2xl font-bold text-black">{stat.value}</p>
            <div className="flex items-center gap-1 mt-1"><ArrowUpRight className="h-3.5 w-3.5 text-emerald-500" /><span className="text-xs font-medium text-emerald-600">{stat.change}</span><span className="text-xs text-muted">מול חודש קודם</span></div>
          </div>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-border">
        <div className="flex items-center justify-between p-5 border-b border-border"><h2 className="font-semibold text-black">הזמנות אחרונות</h2><a href="/admin/orders" className="text-sm text-black hover:text-muted font-medium">הצג הכל</a></div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border"><th className="text-right text-xs font-medium text-muted uppercase tracking-wider px-5 py-3">הזמנה</th><th className="text-right text-xs font-medium text-muted uppercase tracking-wider px-5 py-3">לקוח</th><th className="text-right text-xs font-medium text-muted uppercase tracking-wider px-5 py-3">תאריך</th><th className="text-right text-xs font-medium text-muted uppercase tracking-wider px-5 py-3">סכום</th><th className="text-right text-xs font-medium text-muted uppercase tracking-wider px-5 py-3">סטטוס</th></tr></thead>
            <tbody className="divide-y divide-border">
              {RECENT_ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4"><span className="font-medium text-black text-sm">{order.id}</span></td>
                  <td className="px-5 py-4"><p className="text-sm text-black">{order.customer}</p><p className="text-xs text-muted">{order.email}</p></td>
                  <td className="px-5 py-4"><span className="text-sm text-muted">{new Date(order.date).toLocaleDateString("he-IL", { month: "short", day: "numeric" })}</span></td>
                  <td className="px-5 py-4"><span className="text-sm font-medium text-black">{formatPrice(order.total)}</span></td>
                  <td className="px-5 py-4"><Badge variant={STATUS_COLORS[order.status] || "default"}>{STATUS_LABELS[order.status]}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
