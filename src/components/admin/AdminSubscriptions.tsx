"use client";

import { useEffect, useState } from "react";
import { formatPrice, getSubscriptionIntervalLabel } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import { RefreshCw, Pause, Play, X } from "lucide-react";

interface Sub {
  id: string;
  userId: string;
  productId: string;
  status: string;
  intervalWeeks: number;
  pricePerDelivery: number;
  nextDeliveryAt: string | null;
  product?: { name: string };
  user?: { name: string | null; email: string };
}

const STATUS_MAP: Record<string, { label: string; variant: "success" | "warning" | "default" }> = {
  ACTIVE: { label: "פעיל", variant: "success" }, PAUSED: { label: "מושהה", variant: "warning" }, CANCELLED: { label: "בוטל", variant: "default" },
};

export default function AdminSubscriptions() {
  const [subs, setSubs] = useState<Sub[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/subscriptions")
      .then((r) => r.json())
      .then((data) => { setSubs(data.subscriptions || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="py-20 text-center text-muted">טוען מנויים...</div>;

  const activeCount = subs.filter((s) => s.status === "ACTIVE").length;
  const mrr = subs.filter((s) => s.status === "ACTIVE").reduce((sum, s) => sum + s.pricePerDelivery, 0);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-black">מנויים</h1>
          <p className="text-sm text-muted mt-1">{activeCount} פעילים · {formatPrice(mrr)} הכנסה חוזרת</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-border p-4"><p className="text-xs text-muted uppercase">פעילים</p><p className="text-2xl font-bold text-emerald-600 mt-1">{subs.filter((s) => s.status === "ACTIVE").length}</p></div>
        <div className="bg-white rounded-xl border border-border p-4"><p className="text-xs text-muted uppercase">מושהים</p><p className="text-2xl font-bold text-amber-600 mt-1">{subs.filter((s) => s.status === "PAUSED").length}</p></div>
        <div className="bg-white rounded-xl border border-border p-4"><p className="text-xs text-muted uppercase">בוטלו</p><p className="text-2xl font-bold text-muted mt-1">{subs.filter((s) => s.status === "CANCELLED").length}</p></div>
      </div>

      {subs.length === 0 ? (
        <div className="bg-white rounded-xl border border-border p-12 text-center">
          <p className="text-4xl mb-3">🔄</p>
          <h2 className="text-lg font-semibold text-black mb-1">אין מנויים עדיין</h2>
          <p className="text-sm text-muted">מנויים חדשים יופיעו כאן כשלקוחות ירשמו.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-border bg-gray-50">
                <th className="text-right text-xs font-medium text-muted uppercase px-5 py-3">מנוי</th>
                <th className="text-right text-xs font-medium text-muted uppercase px-5 py-3">לקוח</th>
                <th className="text-right text-xs font-medium text-muted uppercase px-5 py-3">מוצר</th>
                <th className="text-right text-xs font-medium text-muted uppercase px-5 py-3">תדירות</th>
                <th className="text-right text-xs font-medium text-muted uppercase px-5 py-3">מחיר</th>
                <th className="text-right text-xs font-medium text-muted uppercase px-5 py-3">סטטוס</th>
                <th className="text-left text-xs font-medium text-muted uppercase px-5 py-3">פעולות</th>
              </tr></thead>
              <tbody className="divide-y divide-border">
                {subs.map((sub) => (
                  <tr key={sub.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-5 py-4"><div className="flex items-center gap-2"><RefreshCw className="h-4 w-4 text-muted" /><span className="font-medium text-black text-sm">{sub.id.slice(0, 10)}...</span></div></td>
                    <td className="px-5 py-4"><span className="text-sm text-black">{sub.user?.name || sub.user?.email || sub.userId.slice(0, 8)}</span></td>
                    <td className="px-5 py-4"><span className="text-sm text-muted">{sub.product?.name || sub.productId.slice(0, 8)}</span></td>
                    <td className="px-5 py-4"><span className="text-sm text-muted">{getSubscriptionIntervalLabel(sub.intervalWeeks)}</span></td>
                    <td className="px-5 py-4"><span className="text-sm font-medium text-black">{formatPrice(sub.pricePerDelivery)}</span></td>
                    <td className="px-5 py-4"><Badge variant={STATUS_MAP[sub.status]?.variant || "default"}>{STATUS_MAP[sub.status]?.label || sub.status}</Badge></td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {sub.status === "ACTIVE" && (
                          <>
                            <button className="p-2 text-amber-600 hover:text-amber-700 transition-colors" title="השהה"><Pause className="h-4 w-4" /></button>
                            <button className="p-2 text-red-500 hover:text-red-600 transition-colors" title="בטל"><X className="h-4 w-4" /></button>
                          </>
                        )}
                        {sub.status === "PAUSED" && (
                          <button className="p-2 text-emerald-600 hover:text-emerald-700 transition-colors" title="חדש"><Play className="h-4 w-4" /></button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
