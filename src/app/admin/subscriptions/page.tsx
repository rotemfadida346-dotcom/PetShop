import { Metadata } from "next";
import Badge from "@/components/ui/Badge";
import { formatPrice, getSubscriptionIntervalLabel } from "@/lib/utils";
import { Eye, RefreshCw } from "lucide-react";

export const metadata: Metadata = { title: "ניהול מנויים" };

const SUBSCRIPTIONS = [
  { id: "SUB-001", customer: "שרה מ.", product: "מוצר 1", status: "ACTIVE", interval: 4, price: 46.74, nextDelivery: "2025-02-15" },
  { id: "SUB-002", customer: "יעקב ר.", product: "מוצר 9", status: "ACTIVE", interval: 6, price: 21.24, nextDelivery: "2025-02-28" },
  { id: "SUB-003", customer: "אמילי ק.", product: "מוצר 5", status: "ACTIVE", interval: 2, price: 42.49, nextDelivery: "2025-02-10" },
  { id: "SUB-004", customer: "מיכאל ט.", product: "מוצר 2", status: "PAUSED", interval: 4, price: 50.99, nextDelivery: null },
  { id: "SUB-005", customer: "ליזה ו.", product: "מוצר 6", status: "CANCELLED", interval: 4, price: 37.83, nextDelivery: null },
];

const STATUS_MAP: Record<string, { label: string; variant: "success" | "warning" | "default" }> = { ACTIVE: { label: "פעיל", variant: "success" }, PAUSED: { label: "מושהה", variant: "warning" }, CANCELLED: { label: "בוטל", variant: "default" } };

export default function AdminSubscriptionsPage() {
  const activeCount = SUBSCRIPTIONS.filter((s) => s.status === "ACTIVE").length;
  const monthlyRevenue = SUBSCRIPTIONS.filter((s) => s.status === "ACTIVE").reduce((sum, s) => sum + s.price, 0);

  return (
    <div>
      <div className="mb-6"><h1 className="text-2xl font-bold text-black">מנויים</h1><p className="text-sm text-muted mt-1">{activeCount} מנויים פעילים &middot; {formatPrice(monthlyRevenue)} הכנסה חודשית משוערת</p></div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-border p-4"><p className="text-xs text-muted uppercase">פעילים</p><p className="text-2xl font-bold text-emerald-600 mt-1">{SUBSCRIPTIONS.filter((s) => s.status === "ACTIVE").length}</p></div>
        <div className="bg-white rounded-xl border border-border p-4"><p className="text-xs text-muted uppercase">מושהים</p><p className="text-2xl font-bold text-amber-600 mt-1">{SUBSCRIPTIONS.filter((s) => s.status === "PAUSED").length}</p></div>
        <div className="bg-white rounded-xl border border-border p-4"><p className="text-xs text-muted uppercase">בוטלו</p><p className="text-2xl font-bold text-muted mt-1">{SUBSCRIPTIONS.filter((s) => s.status === "CANCELLED").length}</p></div>
      </div>
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border bg-gray-50">
              <th className="text-right text-xs font-medium text-muted uppercase px-5 py-3">מנוי</th>
              <th className="text-right text-xs font-medium text-muted uppercase px-5 py-3">לקוח</th>
              <th className="text-right text-xs font-medium text-muted uppercase px-5 py-3">מוצר</th>
              <th className="text-right text-xs font-medium text-muted uppercase px-5 py-3">תדירות</th>
              <th className="text-right text-xs font-medium text-muted uppercase px-5 py-3">מחיר</th>
              <th className="text-right text-xs font-medium text-muted uppercase px-5 py-3">משלוח הבא</th>
              <th className="text-right text-xs font-medium text-muted uppercase px-5 py-3">סטטוס</th>
              <th className="text-left text-xs font-medium text-muted uppercase px-5 py-3">פעולות</th>
            </tr></thead>
            <tbody className="divide-y divide-border">
              {SUBSCRIPTIONS.map((sub) => (
                <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4"><div className="flex items-center gap-2"><RefreshCw className="h-4 w-4 text-muted" /><span className="font-medium text-black text-sm">{sub.id}</span></div></td>
                  <td className="px-5 py-4"><span className="text-sm text-black">{sub.customer}</span></td>
                  <td className="px-5 py-4"><span className="text-sm text-muted line-clamp-1">{sub.product}</span></td>
                  <td className="px-5 py-4"><span className="text-sm text-muted">{getSubscriptionIntervalLabel(sub.interval)}</span></td>
                  <td className="px-5 py-4"><span className="text-sm font-medium text-black">{formatPrice(sub.price)}</span></td>
                  <td className="px-5 py-4"><span className="text-sm text-muted">{sub.nextDelivery ? new Date(sub.nextDelivery).toLocaleDateString("he-IL", { month: "short", day: "numeric" }) : "—"}</span></td>
                  <td className="px-5 py-4"><Badge variant={STATUS_MAP[sub.status]?.variant || "default"}>{STATUS_MAP[sub.status]?.label}</Badge></td>
                  <td className="px-5 py-4"><div className="flex justify-end"><button className="p-2 text-gray-400 hover:text-black transition-colors"><Eye className="h-4 w-4" /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
