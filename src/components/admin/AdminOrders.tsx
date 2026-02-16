"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

const STATUS_COLORS: Record<string, "success" | "info" | "warning" | "default" | "danger"> = {
  DELIVERED: "success", SHIPPED: "info", PROCESSING: "warning", PENDING: "default", CANCELLED: "danger",
};
const STATUS_LABELS: Record<string, string> = {
  DELIVERED: "נמסר", SHIPPED: "נשלח", PROCESSING: "בטיפול", PENDING: "ממתין", CANCELLED: "בוטל",
};

interface Order {
  id: string;
  email: string;
  total: number;
  status: string;
  createdAt: string;
}

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((r) => r.json())
      .then((data) => { setOrders(data.orders || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div className="py-20 text-center text-text-secondary">טוען הזמנות...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-text-primary">הזמנות</h1><p className="text-sm text-text-secondary mt-1">{orders.length} הזמנות</p></div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-12 text-center">
          <p className="text-4xl mb-3">📦</p>
          <h2 className="text-lg font-semibold text-text-primary mb-1">אין הזמנות עדיין</h2>
          <p className="text-sm text-text-secondary">הזמנות חדשות יופיעו כאן כשלקוחות ירכשו מוצרים.</p>
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead><tr className="border-b border-border bg-surface">
                <th className="text-right text-xs font-medium text-text-secondary uppercase px-5 py-3">הזמנה</th>
                <th className="text-right text-xs font-medium text-text-secondary uppercase px-5 py-3">לקוח</th>
                <th className="text-right text-xs font-medium text-text-secondary uppercase px-5 py-3">תאריך</th>
                <th className="text-right text-xs font-medium text-text-secondary uppercase px-5 py-3">סכום</th>
                <th className="text-right text-xs font-medium text-text-secondary uppercase px-5 py-3">סטטוס</th>
              </tr></thead>
              <tbody className="divide-y divide-border">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-surface-hover transition-colors">
                    <td className="px-5 py-4"><span className="font-medium text-text-primary text-sm">{order.id.slice(0, 12)}...</span></td>
                    <td className="px-5 py-4"><span className="text-sm text-text-secondary">{order.email}</span></td>
                    <td className="px-5 py-4"><span className="text-sm text-text-secondary">{new Date(order.createdAt).toLocaleDateString("he-IL")}</span></td>
                    <td className="px-5 py-4"><span className="text-sm font-medium text-text-primary">{formatPrice(order.total)}</span></td>
                    <td className="px-5 py-4"><Badge variant={STATUS_COLORS[order.status] || "default"}>{STATUS_LABELS[order.status] || order.status}</Badge></td>
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
