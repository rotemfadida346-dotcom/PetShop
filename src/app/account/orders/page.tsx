import { Metadata } from "next";
import Container from "@/components/ui/Container";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { formatPrice } from "@/lib/utils";
import { ArrowLeft, Package, Eye } from "lucide-react";

export const metadata: Metadata = {
  title: "My Orders",
  description: "View your order history and track shipments.",
};

const MOCK_ORDERS = [
  {
    id: "ORD-2024-001",
    date: "2024-12-15",
    status: "DELIVERED" as const,
    total: 89.97,
    items: [
      { name: "Premium Chicken & Rice Dog Food", qty: 1, price: 54.99 },
      { name: "Peanut Butter Training Treats", qty: 2, price: 12.99 },
    ],
  },
  {
    id: "ORD-2024-002",
    date: "2025-01-02",
    status: "SHIPPED" as const,
    total: 67.98,
    items: [
      { name: "Indoor Cat Chicken Formula", qty: 1, price: 42.99 },
      { name: "Natural Clumping Cat Litter", qty: 1, price: 24.99 },
    ],
  },
  {
    id: "ORD-2024-003",
    date: "2025-01-28",
    status: "PROCESSING" as const,
    total: 59.99,
    items: [
      { name: "Wild Salmon & Sweet Potato Dog Food", qty: 1, price: 59.99 },
    ],
  },
];

const STATUS_MAP: Record<string, { label: string; variant: "success" | "info" | "warning" | "default" }> = {
  DELIVERED: { label: "Delivered", variant: "success" },
  SHIPPED: { label: "Shipped", variant: "info" },
  PROCESSING: { label: "Processing", variant: "warning" },
  PENDING: { label: "Pending", variant: "default" },
  CANCELLED: { label: "Cancelled", variant: "default" },
};

export default function OrdersPage() {
  return (
    <div className="bg-stone-50 min-h-screen">
      <Container size="lg">
        <div className="py-8 md:py-12">
          <Link
            href="/account"
            className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-stone-900 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Account
          </Link>

          <h1 className="text-3xl font-bold text-stone-900 tracking-tight mb-8">
            My Orders
          </h1>

          <div className="space-y-4">
            {MOCK_ORDERS.map((order) => {
              const status = STATUS_MAP[order.status] || STATUS_MAP.PENDING;

              return (
                <div
                  key={order.id}
                  className="bg-white rounded-xl border border-stone-200 p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <Package className="h-5 w-5 text-stone-400" />
                      <div>
                        <p className="font-semibold text-stone-900">
                          {order.id}
                        </p>
                        <p className="text-sm text-stone-500">
                          {new Date(order.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>
                    </div>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </div>

                  <div className="border-t border-stone-100 pt-4 space-y-2">
                    {order.items.map((item, i) => (
                      <div
                        key={i}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-stone-600">
                          {item.name} x{item.qty}
                        </span>
                        <span className="text-stone-900 font-medium">
                          {formatPrice(item.price * item.qty)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-stone-100 mt-4 pt-4 flex items-center justify-between">
                    <p className="font-semibold text-stone-900">
                      Total: {formatPrice(order.total)}
                    </p>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                      View Details
                    </Button>
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
