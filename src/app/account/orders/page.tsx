import { Metadata } from "next";
import Container from "@/components/ui/Container";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { ArrowRight, Package, Eye } from "lucide-react";

export const metadata: Metadata = { title: "ההזמנות שלי" };

const MOCK_ORDERS = [
  { id: "ORD-001", date: "2024-12-15", status: "DELIVERED" as const, total: 339.97, items: [{ name: "מוצר 1", qty: 1, price: 54.99 }, { name: "מוצר 3", qty: 2, price: 12.99 }] },
  { id: "ORD-002", date: "2025-01-02", status: "SHIPPED" as const, total: 267.98, items: [{ name: "מוצר 6", qty: 1, price: 42.99 }, { name: "מוצר 9", qty: 1, price: 24.99 }] },
  { id: "ORD-003", date: "2025-01-28", status: "PROCESSING" as const, total: 59.99, items: [{ name: "מוצר 2", qty: 1, price: 59.99 }] },
];

const STATUS_MAP: Record<string, { label: string; variant: "success" | "info" | "warning" | "default" }> = {
  DELIVERED: { label: "נמסר", variant: "success" }, SHIPPED: { label: "נשלח", variant: "info" },
  PROCESSING: { label: "בטיפול", variant: "warning" }, PENDING: { label: "ממתין", variant: "default" },
};

export default function OrdersPage() {
  return (
    <div className="bg-surface min-h-screen">
      <Container size="lg">
        <div className="py-8 md:py-12">
          <Link href="/account" className="inline-flex items-center gap-1 text-sm text-muted hover:text-textPrimary mb-6 transition-colors"><ArrowRight className="h-4 w-4" />חזרה לחשבון</Link>
          <h1 className="text-3xl font-bold text-textPrimary tracking-tight mb-8">ההזמנות שלי</h1>
          <div className="space-y-4">
            {MOCK_ORDERS.map((order) => {
              const status = STATUS_MAP[order.status] || STATUS_MAP.PENDING;
              return (
                <div key={order.id} className="bg-card rounded-xl border border-border p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-muted" />
                      <div>
                        <p className="font-semibold text-textPrimary">{order.id}</p>
                        <p className="text-sm text-muted">{new Date(order.date).toLocaleDateString("he-IL")}</p>
                      </div>
                    </div>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </div>
                  <div className="border-t border-border pt-4 space-y-2">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex justify-between text-sm"><span className="text-muted">{item.name} x{item.qty}</span><span className="text-textPrimary font-medium">{formatPrice(item.price * item.qty)}</span></div>
                    ))}
                  </div>
                  <div className="border-t border-border mt-4 pt-4 flex items-center justify-between">
                    <p className="font-semibold text-textPrimary">סה״כ: {formatPrice(order.total)}</p>
                    <Button variant="ghost" size="sm"><Eye className="h-4 w-4" />פרטים</Button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </div>
  );
}
