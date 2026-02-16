"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Download } from "lucide-react";

const STATUS_OPTIONS = [
  { value: "PENDING", label: "ממתין" },
  { value: "PROCESSING", label: "בטיפול" },
  { value: "SHIPPED", label: "נשלח" },
  { value: "DELIVERED", label: "נמסר" },
  { value: "CANCELLED", label: "בוטל" },
];

const STATUS_COLORS: Record<string, "success" | "info" | "warning" | "default" | "danger"> = {
  DELIVERED: "success", SHIPPED: "info", PROCESSING: "warning", PENDING: "default", CANCELLED: "danger",
};
const STATUS_LABELS: Record<string, string> = {
  DELIVERED: "נמסר", SHIPPED: "נשלח", PROCESSING: "בטיפול", PENDING: "ממתין", CANCELLED: "בוטל",
};

const MOCK_ORDERS = [
  { id: "ORD-001", customer: "שרה מ.", email: "sarah@example.com", items: 3, total: 339.97, status: "PROCESSING", date: "2025-01-28", type: "one-time" },
  { id: "ORD-002", customer: "יעקב ר.", email: "james@example.com", items: 2, total: 267.98, status: "SHIPPED", date: "2025-01-27", type: "subscription" },
  { id: "ORD-003", customer: "אמילי ק.", email: "emily@example.com", items: 1, total: 54.99, status: "DELIVERED", date: "2025-01-26", type: "one-time" },
  { id: "ORD-004", customer: "מיכאל ט.", email: "mike@example.com", items: 4, total: 124.97, status: "PENDING", date: "2025-01-28", type: "one-time" },
  { id: "ORD-005", customer: "ליזה ו.", email: "lisa@example.com", items: 1, total: 42.99, status: "PROCESSING", date: "2025-01-28", type: "subscription" },
  { id: "ORD-006", customer: "דוד פ.", email: "david@example.com", items: 2, total: 79.98, status: "DELIVERED", date: "2025-01-25", type: "one-time" },
];

export default function AdminOrders() {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");

  function updateStatus(orderId: string, newStatus: string) {
    setOrders(orders.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o)));
  }

  function exportCSV() {
    const csv = "הזמנה,לקוח,אימייל,פריטים,סכום,סטטוס,תאריך,סוג\n" +
      orders.map((o) => `${o.id},${o.customer},${o.email},${o.items},${o.total},${STATUS_LABELS[o.status]},${o.date},${o.type === "subscription" ? "מנוי" : "חד פעמי"}`).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "orders.csv"; a.click();
  }

  const filtered = filterStatus === "ALL" ? orders : orders.filter((o) => o.status === filterStatus);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-black">הזמנות</h1><p className="text-sm text-muted mt-1">{orders.length} הזמנות</p></div>
        <Button variant="outline" size="sm" onClick={exportCSV}><Download className="h-4 w-4" />ייצוא CSV</Button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {[{ value: "ALL", label: "הכל" }, ...STATUS_OPTIONS].map((s) => (
          <button key={s.value} onClick={() => setFilterStatus(s.value)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${filterStatus === s.value ? "bg-black text-white" : "bg-gray-100 text-muted hover:bg-gray-200"}`}>
            {s.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border bg-gray-50">
              <th className="text-right text-xs font-medium text-muted uppercase px-5 py-3">הזמנה</th>
              <th className="text-right text-xs font-medium text-muted uppercase px-5 py-3">לקוח</th>
              <th className="text-right text-xs font-medium text-muted uppercase px-5 py-3">תאריך</th>
              <th className="text-right text-xs font-medium text-muted uppercase px-5 py-3">סכום</th>
              <th className="text-right text-xs font-medium text-muted uppercase px-5 py-3">סוג</th>
              <th className="text-right text-xs font-medium text-muted uppercase px-5 py-3">סטטוס</th>
              <th className="text-left text-xs font-medium text-muted uppercase px-5 py-3">עדכון</th>
            </tr></thead>
            <tbody className="divide-y divide-border">
              {filtered.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4"><span className="font-medium text-black text-sm">{order.id}</span></td>
                  <td className="px-5 py-4"><p className="text-sm text-black">{order.customer}</p><p className="text-xs text-muted">{order.email}</p></td>
                  <td className="px-5 py-4"><span className="text-sm text-muted">{new Date(order.date).toLocaleDateString("he-IL")}</span></td>
                  <td className="px-5 py-4"><span className="text-sm font-medium text-black">{formatPrice(order.total)}</span></td>
                  <td className="px-5 py-4"><Badge variant={order.type === "subscription" ? "info" : "default"}>{order.type === "subscription" ? "מנוי" : "חד פעמי"}</Badge></td>
                  <td className="px-5 py-4"><Badge variant={STATUS_COLORS[order.status] || "default"}>{STATUS_LABELS[order.status]}</Badge></td>
                  <td className="px-5 py-4">
                    <select value={order.status} onChange={(e) => updateStatus(order.id, e.target.value)}
                      className="text-xs border border-border rounded-lg px-2 py-1.5 bg-white text-black focus:outline-none focus:ring-1 focus:ring-black">
                      {STATUS_OPTIONS.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
