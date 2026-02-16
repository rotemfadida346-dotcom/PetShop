import { Metadata } from "next";
import Badge from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import { Eye, Download } from "lucide-react";
import Button from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Manage Orders - Admin",
  description: "View and manage all orders.",
};

const ORDERS = [
  {
    id: "ORD-001",
    customer: "Sarah M.",
    email: "sarah@example.com",
    items: 3,
    total: 89.97,
    status: "PROCESSING",
    date: "2025-01-28",
    type: "one-time",
  },
  {
    id: "ORD-002",
    customer: "James R.",
    email: "james@example.com",
    items: 2,
    total: 67.98,
    status: "SHIPPED",
    date: "2025-01-27",
    type: "subscription",
  },
  {
    id: "ORD-003",
    customer: "Emily K.",
    email: "emily@example.com",
    items: 1,
    total: 54.99,
    status: "DELIVERED",
    date: "2025-01-26",
    type: "one-time",
  },
  {
    id: "ORD-004",
    customer: "Mike T.",
    email: "mike@example.com",
    items: 4,
    total: 124.97,
    status: "PENDING",
    date: "2025-01-28",
    type: "one-time",
  },
  {
    id: "ORD-005",
    customer: "Lisa W.",
    email: "lisa@example.com",
    items: 1,
    total: 42.99,
    status: "PROCESSING",
    date: "2025-01-28",
    type: "subscription",
  },
  {
    id: "ORD-006",
    customer: "David P.",
    email: "david@example.com",
    items: 2,
    total: 79.98,
    status: "DELIVERED",
    date: "2025-01-25",
    type: "one-time",
  },
  {
    id: "ORD-007",
    customer: "Anna L.",
    email: "anna@example.com",
    items: 1,
    total: 24.99,
    status: "CANCELLED",
    date: "2025-01-24",
    type: "one-time",
  },
];

const STATUS_COLORS: Record<string, "success" | "info" | "warning" | "default" | "danger"> = {
  DELIVERED: "success",
  SHIPPED: "info",
  PROCESSING: "warning",
  PENDING: "default",
  CANCELLED: "danger",
};

export default function AdminOrdersPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-stone-900">Orders</h1>
          <p className="text-sm text-stone-500 mt-1">
            {ORDERS.length} total orders
          </p>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 mb-4">
        {["All", "Pending", "Processing", "Shipped", "Delivered", "Cancelled"].map(
          (tab) => (
            <button
              key={tab}
              className="px-3 py-1.5 rounded-full text-sm font-medium text-stone-600 hover:bg-white hover:text-stone-900 transition-colors first:bg-stone-900 first:text-white"
            >
              {tab}
            </button>
          )
        )}
      </div>

      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-100 bg-stone-50">
                <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-5 py-3">
                  Order
                </th>
                <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-5 py-3">
                  Customer
                </th>
                <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-5 py-3">
                  Date
                </th>
                <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-5 py-3">
                  Items
                </th>
                <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-5 py-3">
                  Total
                </th>
                <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-5 py-3">
                  Type
                </th>
                <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-5 py-3">
                  Status
                </th>
                <th className="text-right text-xs font-medium text-stone-500 uppercase tracking-wider px-5 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {ORDERS.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-stone-50 transition-colors"
                >
                  <td className="px-5 py-4">
                    <span className="font-medium text-stone-900 text-sm">
                      {order.id}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div>
                      <p className="text-sm text-stone-900">
                        {order.customer}
                      </p>
                      <p className="text-xs text-stone-500">{order.email}</p>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-stone-600">
                      {new Date(order.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-stone-600">
                      {order.items}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-medium text-stone-900">
                      {formatPrice(order.total)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Badge
                      variant={
                        order.type === "subscription" ? "info" : "default"
                      }
                    >
                      {order.type === "subscription" ? "Sub" : "One-time"}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    <Badge
                      variant={STATUS_COLORS[order.status] || "default"}
                    >
                      {order.status.charAt(0) +
                        order.status.slice(1).toLowerCase()}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex justify-end">
                      <button
                        className="p-2 text-stone-400 hover:text-stone-700 transition-colors"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </div>
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
