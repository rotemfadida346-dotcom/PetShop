import { Metadata } from "next";
import Badge from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import { Eye, Download } from "lucide-react";
import Button from "@/components/ui/Button";

export const metadata: Metadata = { title: "ניהול הזמנות" };

const ORDERS = [
  { id: "ORD-001", customer: "שרה מ.", email: "sarah@example.com", items: 3, total: 339.97, status: "PROCESSING", date: "2025-01-28", type: "one-time" },
  { id: "ORD-002", customer: "יעקב ר.", email: "james@example.com", items: 2, total: 267.98, status: "SHIPPED", date: "2025-01-27", type: "subscription" },
  { id: "ORD-003", customer: "אמילי ק.", email: "emily@example.com", items: 1, total: 54.99, status: "DELIVERED", date: "2025-01-26", type: "one-time" },
  { id: "ORD-004", customer: "מיכאל ט.", email: "mike@example.com", items: 4, total: 124.97, status: "PENDING", date: "2025-01-28", type: "one-time" },
  { id: "ORD-005", customer: "ליזה ו.", email: "lisa@example.com", items: 1, total: 42.99, status: "PROCESSING", date: "2025-01-28", type: "subscription" },
];

const STATUS_COLORS: Record<string, "success" | "info" | "warning" | "default" | "danger"> = { DELIVERED: "success", SHIPPED: "info", PROCESSING: "warning", PENDING: "default", CANCELLED: "danger" };
const STATUS_LABELS: Record<string, string> = { DELIVERED: "נמסר", SHIPPED: "נשלח", PROCESSING: "בטיפול", PENDING: "ממתין", CANCELLED: "בוטל" };

export default function AdminOrdersPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div><h1 className="text-2xl font-bold text-black">הזמנות</h1><p className="text-sm text-muted mt-1">{ORDERS.length} הזמנות</p></div>
        <Button variant="outline" size="sm"><Download className="h-4 w-4" />ייצוא CSV</Button>
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
              <th className="text-left text-xs font-medium text-muted uppercase px-5 py-3">פעולות</th>
            </tr></thead>
            <tbody className="divide-y divide-border">
              {ORDERS.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4"><span className="font-medium text-black text-sm">{order.id}</span></td>
                  <td className="px-5 py-4"><p className="text-sm text-black">{order.customer}</p><p className="text-xs text-muted">{order.email}</p></td>
                  <td className="px-5 py-4"><span className="text-sm text-muted">{new Date(order.date).toLocaleDateString("he-IL", { month: "short", day: "numeric" })}</span></td>
                  <td className="px-5 py-4"><span className="text-sm font-medium text-black">{formatPrice(order.total)}</span></td>
                  <td className="px-5 py-4"><Badge variant={order.type === "subscription" ? "info" : "default"}>{order.type === "subscription" ? "מנוי" : "חד פעמי"}</Badge></td>
                  <td className="px-5 py-4"><Badge variant={STATUS_COLORS[order.status] || "default"}>{STATUS_LABELS[order.status]}</Badge></td>
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
