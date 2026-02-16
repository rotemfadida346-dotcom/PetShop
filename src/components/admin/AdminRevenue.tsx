"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils";
import { BarChart3, TrendingUp, ShoppingCart, Users } from "lucide-react";
import RevenueChart from "./RevenueChart";

interface Stats {
  overview: { totalRevenue: number; totalOrders: number; activeSubscriptions: number; monthlyRecurring: number; activeProducts: number; freeShippingOrders: number; paidShippingOrders: number; totalProducts: number; totalSubscriptions: number };
  monthlyRevenue: { month: string; revenue: number }[];
  categoryBreakdown: { category: string; count: number; revenue: number }[];
}

export default function AdminRevenue() {
  const [stats, setStats] = useState<Stats | null>(null);
  useEffect(() => { fetch("/api/admin/stats").then((r) => r.json()).then(setStats).catch(console.error); }, []);

  if (!stats) return <div className="py-20 text-center text-text-secondary">טוען נתונים...</div>;

  const avgCart = stats.overview.totalOrders > 0 ? stats.overview.totalRevenue / stats.overview.totalOrders : 0;
  const hasRevenue = stats.monthlyRevenue.some((m) => m.revenue > 0);

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <BarChart3 className="h-6 w-6 text-accent" />
        <h1 className="text-heading-lg text-text-primary">הכנסות וסטטיסטיקות</h1>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "הכנסות כוללות", value: formatPrice(stats.overview.totalRevenue), icon: TrendingUp },
          { label: "הזמנות", value: String(stats.overview.totalOrders), icon: ShoppingCart },
          { label: "סל ממוצע", value: formatPrice(avgCart), icon: BarChart3 },
          { label: "הכנסה חוזרת (MRR)", value: formatPrice(stats.overview.monthlyRecurring), icon: Users },
        ].map((c) => (
          <div key={c.label} className="bg-card rounded-2xl border border-card-border p-5">
            <div className="flex items-center justify-between mb-2"><span className="text-body-sm text-text-secondary">{c.label}</span><c.icon className="h-5 w-5 text-text-muted" /></div>
            <p className="text-heading-md text-text-primary">{c.value}</p>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-card rounded-2xl border border-card-border p-6 mb-8">
        <h2 className="font-bold text-text-primary mb-4">הכנסות חודשיות (₪)</h2>
        {hasRevenue ? <RevenueChart data={stats.monthlyRevenue} /> : (
          <div className="h-48 flex items-center justify-center text-text-muted text-body-sm">אין נתוני הכנסות עדיין. הנתונים יופיעו כאן לאחר הזמנות.</div>
        )}
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl border border-card-border p-6">
          <h2 className="font-bold text-text-primary mb-4">פירוט לפי קטגוריה</h2>
          {stats.categoryBreakdown.length > 0 ? (
            <div className="space-y-3">
              {stats.categoryBreakdown.map((c) => (
                <div key={c.category} className="flex items-center justify-between">
                  <div><p className="text-body-sm font-medium text-text-primary">{c.category}</p><p className="text-xs text-text-muted">{c.count} מוצרים</p></div>
                  <p className="text-body-sm font-bold text-text-primary">{formatPrice(c.revenue)}</p>
                </div>
              ))}
            </div>
          ) : <p className="text-body-sm text-text-muted">אין נתונים עדיין.</p>}
        </div>

        <div className="bg-card rounded-2xl border border-card-border p-6">
          <h2 className="font-bold text-text-primary mb-4">נתונים נוספים</h2>
          <div className="space-y-4">
            {[
              { label: "מוצרים פעילים", value: String(stats.overview.activeProducts) },
              { label: "מנויים פעילים", value: String(stats.overview.activeSubscriptions) },
              { label: "הזמנות עם משלוח חינם", value: String(stats.overview.freeShippingOrders) },
              { label: "הזמנות עם משלוח בתשלום", value: String(stats.overview.paidShippingOrders) },
            ].map((r) => (
              <div key={r.label} className="flex items-center justify-between py-2 border-b border-card-border last:border-0">
                <span className="text-body-sm text-text-secondary">{r.label}</span>
                <span className="text-body-sm font-bold text-text-primary">{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
