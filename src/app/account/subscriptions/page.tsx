import { Metadata } from "next";
import Container from "@/components/ui/Container";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { formatPrice, getSubscriptionIntervalLabel } from "@/lib/utils";
import { ArrowLeft, RefreshCw, Pause, Play, X, Calendar } from "lucide-react";

export const metadata: Metadata = {
  title: "My Subscriptions",
  description: "Manage your active subscriptions.",
};

const MOCK_SUBSCRIPTIONS = [
  {
    id: "SUB-001",
    productName: "Premium Chicken & Rice Dog Food",
    status: "ACTIVE" as const,
    intervalWeeks: 4,
    pricePerDelivery: 46.74,
    originalPrice: 54.99,
    nextDelivery: "2025-02-15",
    createdAt: "2024-10-01",
  },
  {
    id: "SUB-002",
    productName: "Natural Clumping Cat Litter",
    status: "ACTIVE" as const,
    intervalWeeks: 6,
    pricePerDelivery: 21.24,
    originalPrice: 24.99,
    nextDelivery: "2025-02-28",
    createdAt: "2024-11-15",
  },
];

const STATUS_MAP: Record<string, { label: string; variant: "success" | "warning" | "default" }> = {
  ACTIVE: { label: "Active", variant: "success" },
  PAUSED: { label: "Paused", variant: "warning" },
  CANCELLED: { label: "Cancelled", variant: "default" },
};

export default function SubscriptionsPage() {
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
            My Subscriptions
          </h1>

          <div className="space-y-4">
            {MOCK_SUBSCRIPTIONS.map((sub) => {
              const status = STATUS_MAP[sub.status] || STATUS_MAP.ACTIVE;
              const savings = sub.originalPrice - sub.pricePerDelivery;

              return (
                <div
                  key={sub.id}
                  className="bg-white rounded-xl border border-stone-200 p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <RefreshCw className="h-5 w-5 text-amber-600" />
                        <h2 className="font-semibold text-stone-900">
                          {sub.productName}
                        </h2>
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                        <div>
                          <p className="text-xs text-stone-500 uppercase tracking-wide">
                            Frequency
                          </p>
                          <p className="text-sm font-medium text-stone-900 mt-1">
                            {getSubscriptionIntervalLabel(sub.intervalWeeks)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-stone-500 uppercase tracking-wide">
                            Price
                          </p>
                          <p className="text-sm font-medium text-stone-900 mt-1">
                            {formatPrice(sub.pricePerDelivery)}
                            <span className="text-xs text-stone-400 ml-1 line-through">
                              {formatPrice(sub.originalPrice)}
                            </span>
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-stone-500 uppercase tracking-wide">
                            You Save
                          </p>
                          <p className="text-sm font-medium text-emerald-600 mt-1">
                            {formatPrice(savings)}/delivery
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-stone-500 uppercase tracking-wide">
                            Next Delivery
                          </p>
                          <p className="text-sm font-medium text-stone-900 mt-1 flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" />
                            {new Date(sub.nextDelivery).toLocaleDateString(
                              "en-US",
                              { month: "short", day: "numeric" }
                            )}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      {sub.status === "ACTIVE" ? (
                        <>
                          <Button variant="outline" size="sm">
                            <Pause className="h-3.5 w-3.5" />
                            Pause
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50">
                            <X className="h-3.5 w-3.5" />
                            Cancel
                          </Button>
                        </>
                      ) : sub.status === "PAUSED" ? (
                        <Button variant="outline" size="sm">
                          <Play className="h-3.5 w-3.5" />
                          Resume
                        </Button>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Info box */}
          <div className="mt-8 bg-amber-50 border border-amber-200 rounded-xl p-6">
            <h3 className="font-semibold text-amber-800 mb-2">
              Subscription Benefits
            </h3>
            <ul className="text-sm text-amber-700 space-y-1">
              <li>• Save up to 15% on every delivery</li>
              <li>• Free shipping on all subscription orders</li>
              <li>• Pause, skip, or cancel anytime — no commitment</li>
              <li>• Change frequency or swap products easily</li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}
