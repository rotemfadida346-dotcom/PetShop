import { Metadata } from "next";
import Badge from "@/components/ui/Badge";
import { formatPrice, getSubscriptionIntervalLabel } from "@/lib/utils";
import { Eye, RefreshCw } from "lucide-react";

export const metadata: Metadata = {
  title: "Manage Subscriptions - Admin",
  description: "View and manage active subscriptions.",
};

const SUBSCRIPTIONS = [
  {
    id: "SUB-001",
    customer: "Sarah M.",
    product: "Premium Chicken & Rice Dog Food",
    status: "ACTIVE",
    interval: 4,
    price: 46.74,
    nextDelivery: "2025-02-15",
    created: "2024-10-01",
  },
  {
    id: "SUB-002",
    customer: "James R.",
    product: "Natural Clumping Cat Litter",
    status: "ACTIVE",
    interval: 6,
    price: 21.24,
    nextDelivery: "2025-02-28",
    created: "2024-11-15",
  },
  {
    id: "SUB-003",
    customer: "Emily K.",
    product: "Puppy Growth Chicken & Oatmeal",
    status: "ACTIVE",
    interval: 2,
    price: 42.49,
    nextDelivery: "2025-02-10",
    created: "2024-12-01",
  },
  {
    id: "SUB-004",
    customer: "Mike T.",
    product: "Wild Salmon & Sweet Potato Dog Food",
    status: "PAUSED",
    interval: 4,
    price: 50.99,
    nextDelivery: null,
    created: "2024-09-15",
  },
  {
    id: "SUB-005",
    customer: "Lisa W.",
    product: "Indoor Cat Chicken Formula",
    status: "CANCELLED",
    interval: 4,
    price: 37.83,
    nextDelivery: null,
    created: "2024-08-01",
  },
];

const STATUS_COLORS: Record<string, "success" | "warning" | "default"> = {
  ACTIVE: "success",
  PAUSED: "warning",
  CANCELLED: "default",
};

export default function AdminSubscriptionsPage() {
  const activeCount = SUBSCRIPTIONS.filter((s) => s.status === "ACTIVE").length;
  const monthlyRevenue = SUBSCRIPTIONS.filter(
    (s) => s.status === "ACTIVE"
  ).reduce((sum, s) => sum + s.price, 0);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-stone-900">Subscriptions</h1>
        <p className="text-sm text-stone-500 mt-1">
          {activeCount} active subscriptions &middot;{" "}
          {formatPrice(monthlyRevenue)} est. monthly revenue
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-stone-200 p-4">
          <p className="text-xs text-stone-500 uppercase">Active</p>
          <p className="text-2xl font-bold text-emerald-600 mt-1">
            {SUBSCRIPTIONS.filter((s) => s.status === "ACTIVE").length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-stone-200 p-4">
          <p className="text-xs text-stone-500 uppercase">Paused</p>
          <p className="text-2xl font-bold text-amber-600 mt-1">
            {SUBSCRIPTIONS.filter((s) => s.status === "PAUSED").length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-stone-200 p-4">
          <p className="text-xs text-stone-500 uppercase">Cancelled</p>
          <p className="text-2xl font-bold text-stone-400 mt-1">
            {SUBSCRIPTIONS.filter((s) => s.status === "CANCELLED").length}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-100 bg-stone-50">
                <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-5 py-3">
                  Subscription
                </th>
                <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-5 py-3">
                  Customer
                </th>
                <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-5 py-3">
                  Product
                </th>
                <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-5 py-3">
                  Interval
                </th>
                <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-5 py-3">
                  Price
                </th>
                <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-5 py-3">
                  Next Delivery
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
              {SUBSCRIPTIONS.map((sub) => (
                <tr
                  key={sub.id}
                  className="hover:bg-stone-50 transition-colors"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4 text-stone-400" />
                      <span className="font-medium text-stone-900 text-sm">
                        {sub.id}
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-stone-900">
                      {sub.customer}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-stone-600 line-clamp-1">
                      {sub.product}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-stone-600">
                      {getSubscriptionIntervalLabel(sub.interval)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-medium text-stone-900">
                      {formatPrice(sub.price)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-stone-600">
                      {sub.nextDelivery
                        ? new Date(sub.nextDelivery).toLocaleDateString(
                            "en-US",
                            { month: "short", day: "numeric" }
                          )
                        : "—"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Badge variant={STATUS_COLORS[sub.status] || "default"}>
                      {sub.status.charAt(0) +
                        sub.status.slice(1).toLowerCase()}
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
