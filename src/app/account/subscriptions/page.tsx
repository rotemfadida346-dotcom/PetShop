import { Metadata } from "next";
import Container from "@/components/ui/Container";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { formatPrice, getSubscriptionIntervalLabel } from "@/lib/utils";
import { ArrowRight, RefreshCw, Pause, Play, X, Calendar } from "lucide-react";

export const metadata: Metadata = { title: "המנויים שלי" };

const MOCK_SUBSCRIPTIONS = [
  { id: "SUB-001", productName: "מוצר 1", status: "ACTIVE" as const, intervalWeeks: 4, pricePerDelivery: 46.74, originalPrice: 54.99, nextDelivery: "2025-02-15" },
  { id: "SUB-002", productName: "מוצר 9", status: "ACTIVE" as const, intervalWeeks: 6, pricePerDelivery: 21.24, originalPrice: 24.99, nextDelivery: "2025-02-28" },
];

const STATUS_MAP: Record<string, { label: string; variant: "success" | "warning" | "default" }> = {
  ACTIVE: { label: "פעיל", variant: "success" }, PAUSED: { label: "מושהה", variant: "warning" }, CANCELLED: { label: "בוטל", variant: "default" },
};

export default function SubscriptionsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Container size="lg">
        <div className="py-8 md:py-12">
          <Link href="/account" className="inline-flex items-center gap-1 text-sm text-muted hover:text-black mb-6 transition-colors"><ArrowRight className="h-4 w-4" />חזרה לחשבון</Link>
          <h1 className="text-3xl font-bold text-black tracking-tight mb-8">המנויים שלי</h1>
          <div className="space-y-4">
            {MOCK_SUBSCRIPTIONS.map((sub) => {
              const status = STATUS_MAP[sub.status] || STATUS_MAP.ACTIVE;
              const savings = sub.originalPrice - sub.pricePerDelivery;
              return (
                <div key={sub.id} className="bg-white rounded-xl border border-border p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <RefreshCw className="h-5 w-5 text-black" />
                        <h2 className="font-semibold text-black">{sub.productName}</h2>
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
                        <div><p className="text-xs text-muted uppercase tracking-wide">תדירות</p><p className="text-sm font-medium text-black mt-1">{getSubscriptionIntervalLabel(sub.intervalWeeks)}</p></div>
                        <div><p className="text-xs text-muted uppercase tracking-wide">מחיר</p><p className="text-sm font-medium text-black mt-1">{formatPrice(sub.pricePerDelivery)} <span className="text-xs text-muted line-through">{formatPrice(sub.originalPrice)}</span></p></div>
                        <div><p className="text-xs text-muted uppercase tracking-wide">חיסכון</p><p className="text-sm font-medium text-emerald-600 mt-1">{formatPrice(savings)}/משלוח</p></div>
                        <div><p className="text-xs text-muted uppercase tracking-wide">משלוח הבא</p><p className="text-sm font-medium text-black mt-1 flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{new Date(sub.nextDelivery).toLocaleDateString("he-IL", { month: "short", day: "numeric" })}</p></div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      {sub.status === "ACTIVE" ? (
                        <>
                          <Button variant="outline" size="sm"><Pause className="h-3.5 w-3.5" />השהה</Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700 hover:bg-red-50"><X className="h-3.5 w-3.5" />בטל</Button>
                        </>
                      ) : sub.status === "PAUSED" ? (
                        <Button variant="outline" size="sm"><Play className="h-3.5 w-3.5" />חדש</Button>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-8 bg-gray-100 border border-border rounded-xl p-6">
            <h3 className="font-semibold text-black mb-2">יתרונות המנוי</h3>
            <ul className="text-sm text-muted space-y-1">
              <li>• חסכו עד 10% על כל הזמנה</li>
              <li>• משלוח חינם על כל הזמנות מנוי</li>
              <li>• עצרו, דלגו או בטלו בכל עת — ללא התחייבות</li>
              <li>• שנו תדירות או החליפו מוצרים בקלות</li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  );
}
