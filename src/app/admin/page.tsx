import { Metadata } from "next";
import { formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import {
  DollarSign,
  Package,
  ShoppingCart,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description: "Manage your store.",
};

const STATS = [
  {
    label: "Revenue",
    value: "$12,450",
    change: "+12.5%",
    isUp: true,
    icon: DollarSign,
  },
  {
    label: "Orders",
    value: "156",
    change: "+8.2%",
    isUp: true,
    icon: ShoppingCart,
  },
  {
    label: "Products",
    value: "10",
    change: "0",
    isUp: true,
    icon: Package,
  },
  {
    label: "Active Subs",
    value: "47",
    change: "+23%",
    isUp: true,
    icon: RefreshCw,
  },
];

const RECENT_ORDERS = [
  {
    id: "ORD-001",
    customer: "Sarah M.",
    email: "sarah@example.com",
    total: 89.97,
    status: "PROCESSING",
    date: "2025-01-28",
  },
  {
    id: "ORD-002",
    customer: "James R.",
    email: "james@example.com",
    total: 67.98,
    status: "SHIPPED",
    date: "2025-01-27",
  },
  {
    id: "ORD-003",
    customer: "Emily K.",
    email: "emily@example.com",
    total: 54.99,
    status: "DELIVERED",
    date: "2025-01-26",
  },
  {
    id: "ORD-004",
    customer: "Mike T.",
    email: "mike@example.com",
    total: 124.97,
    status: "PENDING",
    date: "2025-01-28",
  },
  {
    id: "ORD-005",
    customer: "Lisa W.",
    email: "lisa@example.com",
    total: 42.99,
    status: "PROCESSING",
    date: "2025-01-28",
  },
];

const STATUS_COLORS: Record<string, "success" | "info" | "warning" | "default"> = {
  DELIVERED: "success",
  SHIPPED: "info",
  PROCESSING: "warning",
  PENDING: "default",
};

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-stone-900 mb-6">Dashboard</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="bg-white rounded-xl border border-stone-200 p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-stone-500">{stat.label}</span>
              <stat.icon className="h-5 w-5 text-stone-400" />
            </div>
            <p className="text-2xl font-bold text-stone-900">{stat.value}</p>
            <div className="flex items-center gap-1 mt-1">
              {stat.isUp ? (
                <ArrowUpRight className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <ArrowDownRight className="h-3.5 w-3.5 text-red-500" />
              )}
              <span
                className={`text-xs font-medium ${
                  stat.isUp ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {stat.change}
              </span>
              <span className="text-xs text-stone-400">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl border border-stone-200">
        <div className="flex items-center justify-between p-5 border-b border-stone-100">
          <h2 className="font-semibold text-stone-900">Recent Orders</h2>
          <a
            href="/admin/orders"
            className="text-sm text-amber-600 hover:text-amber-700 font-medium"
          >
            View all
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-100">
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
                  Total
                </th>
                <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-5 py-3">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {RECENT_ORDERS.map((order) => (
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
                    <span className="text-sm font-medium text-stone-900">
                      {formatPrice(order.total)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={STATUS_COLORS[order.status] || "default"}>
                      {order.status.charAt(0) +
                        order.status.slice(1).toLowerCase()}
                    </Badge>
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
