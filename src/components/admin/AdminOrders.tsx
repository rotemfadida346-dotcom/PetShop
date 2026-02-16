"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import { ShoppingCart, ChevronDown, ChevronUp, Download } from "lucide-react";
import Button from "@/components/ui/Button";

interface Order {
  id: string; email: string; total: number; subtotal: number; shipping: number; status: string;
  createdAt: string; shippingName: string | null; shippingCity: string | null; shippingLine1: string | null;
  shippingZip: string | null; notes: string | null;
  items: { id: string; name: string; price: number; quantity: number }[];
}

const STATUS_COLORS: Record<string, "success" | "info" | "warning" | "default" | "danger"> = { DELIVERED: "success", SHIPPED: "info", PROCESSING: "warning", PENDING: "default", CANCELLED: "danger" };
const STATUS_LABELS: Record<string, string> = { DELIVERED: "נמסר", SHIPPED: "נשלח", PROCESSING: "בטיפול", PENDING: "ממתין", CANCELLED: "בוטל" };

export default function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/orders").then((r) => r.json()).then((d) => { setOrders(d.orders || []); setLoading(false); }).catch(() => setLoading(false));
  }, []);

  function exportCSV() {
    const csv = "הזמנה,אימייל,סכום,סטטוס,תאריך,עיר\n" + orders.map((o) => `${o.id},${o.email},${o.total},${STATUS_LABELS[o.status] || o.status},${new Date(o.createdAt).toLocaleDateString("he-IL")},${o.shippingCity || ""}`).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = "orders.csv"; a.click();
  }

  if (loading) return <div className="py-20 text-center text-text-secondary">טוען הזמנות...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3"><ShoppingCart className="h-6 w-6 text-accent" /><h1 className="text-heading-lg text-text-primary">הזמנות ({orders.length})</h1></div>
        {orders.length > 0 && <Button variant="secondary" size="sm" onClick={exportCSV}><Download className="h-4 w-4" />ייצוא CSV</Button>}
      </div>

      {orders.length === 0 ? (
        <div className="bg-card rounded-2xl border border-card-border p-12 text-center">
          <p className="text-4xl mb-3">📦</p>
          <h3 className="text-heading-md text-text-primary mb-1">אין הזמנות עדיין</h3>
          <p className="text-body-sm text-text-secondary">הזמנות חדשות יופיעו כאן.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {orders.map((order) => (
            <div key={order.id} className="bg-card rounded-2xl border border-card-border overflow-hidden">
              {/* Summary row */}
              <button onClick={() => setExpanded(expanded === order.id ? null : order.id)} className="w-full flex items-center justify-between p-5 text-right hover:bg-surface-hover transition-colors">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="font-bold text-text-primary text-body-sm">{order.id.slice(0, 12)}...</p>
                    <p className="text-xs text-text-muted">{new Date(order.createdAt).toLocaleDateString("he-IL")}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-body-sm text-text-muted">{order.email}</span>
                  <span className="text-body-sm font-bold text-text-primary">{formatPrice(order.total)}</span>
                  <Badge variant={STATUS_COLORS[order.status] || "default"}>{STATUS_LABELS[order.status] || order.status}</Badge>
                  {expanded === order.id ? <ChevronUp className="h-4 w-4 text-text-muted" /> : <ChevronDown className="h-4 w-4 text-text-muted" />}
                </div>
              </button>

              {/* Detail panel */}
              {expanded === order.id && (
                <div className="border-t border-card-border p-5 bg-surface space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-text-muted uppercase tracking-wider mb-1">כתובת משלוח</p>
                      <p className="text-body-sm text-text-primary">{order.shippingName || "—"}</p>
                      <p className="text-body-sm text-text-secondary">{order.shippingLine1 || ""}</p>
                      <p className="text-body-sm text-text-secondary">{order.shippingCity || ""} {order.shippingZip || ""}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-muted uppercase tracking-wider mb-1">סיכום</p>
                      <p className="text-body-sm text-text-secondary">סכום ביניים: {formatPrice(order.subtotal)}</p>
                      <p className="text-body-sm text-text-secondary">משלוח: {order.shipping === 0 ? "חינם" : formatPrice(order.shipping)}</p>
                      <p className="text-body-sm font-bold text-text-primary">סה״כ: {formatPrice(order.total)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-text-muted uppercase tracking-wider mb-1">הערה פנימית</p>
                      <p className="text-body-sm text-text-secondary italic">{order.notes || "אין הערות"}</p>
                    </div>
                  </div>

                  {order.items && order.items.length > 0 && (
                    <div>
                      <p className="text-xs text-text-muted uppercase tracking-wider mb-2">פריטים</p>
                      <div className="space-y-2">
                        {order.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between bg-card rounded-xl p-3 border border-card-border">
                            <span className="text-body-sm text-text-primary">{item.name} ×{item.quantity}</span>
                            <span className="text-body-sm font-bold text-text-primary">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
