"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils";
import { DollarSign, ShoppingCart, RefreshCw, TrendingUp, Package, Truck } from "lucide-react";
import RevenueChart from "./RevenueChart";

interface Stats {
  overview: { totalRevenue: number; totalOrders: number; activeSubscriptions: number; monthlyRecurring: number; activeProducts: number; freeShippingOrders: number; paidShippingOrders: number; totalProducts: number; totalSubscriptions: number };
  monthlyRevenue: { month: string; revenue: number }[];
  categoryBreakdown: { category: string; count: number; revenue: number }[];
  topProducts: { id: string; name: string; price: number; stock: number; petType: string; category: string }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);
  useEffect(() => { fetch("/api/admin/stats").then((r) => r.json()).then(setStats).catch(console.error); }, []);

  if (!stats) return <div className="py-20 text-center text-text-secondary">טוען נתונים...</div>;

  const hasRevenue = stats.monthlyRevenue.some((m) => m.revenue > 0);
  const avgCart = stats.overview.totalOrders > 0 ? stats.overview.totalRevenue / stats.overview.totalOrders : 0;

  const cards = [
    { label: "הכנסות כוללות", value: formatPrice(stats.overview.totalRevenue), icon: DollarSign, sub: "" },
    { label: "הזמנות", value: String(stats.overview.totalOrders), icon: ShoppingCart, sub: `סל ממוצע: ${formatPrice(avgCart)}` },
    { label: "מנויים פעילים", value: String(stats.overview.activeSubscriptions), icon: RefreshCw, sub: `MRR: ${formatPrice(stats.overview.monthlyRecurring)}` },
    { label: "מוצרים פעילים", value: String(stats.overview.activeProducts), icon: Package, sub: `מתוך ${stats.overview.totalProducts} מוצרים` },
    { label: "משלוח חינם", value: String(stats.overview.freeShippingOrders), icon: Truck, sub: `בתשלום: ${stats.overview.paidShippingOrders}` },
    { label: "הכנסה חוזרת", value: formatPrice(stats.overview.monthlyRecurring), icon: TrendingUp, sub: "חודשי" },
  ];

  return (
    <div>
      <h1 className="text-heading-lg text-text-primary mb-6">לוח בקרה</h1>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {cards.map((c) => (
          <div key={c.label} className="bg-card rounded-2xl border border-card-border p-5 hover:border-accent/20 transition-colors">
            <div className="flex items-center justify-between mb-2"><span className="text-body-sm text-text-secondary">{c.label}</span><c.icon className="h-5 w-5 text-text-muted" /></div>
            <p className="text-heading-md text-text-primary">{c.value}</p>
            {c.sub && <p className="text-xs text-text-muted mt-1">{c.sub}</p>}
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-card rounded-2xl border border-card-border p-6 mb-8">
        <h2 className="font-bold text-text-primary mb-4">הכנסות חודשיות</h2>
        {hasRevenue ? <RevenueChart data={stats.monthlyRevenue} /> : (
          <div className="h-48 flex items-center justify-center text-text-muted text-body-sm">אין הכנסות עדיין. הנתונים יופיעו לאחר הזמנות.</div>
        )}
      </div>

      {/* Bottom: Categories + Stock */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl border border-card-border p-6">
          <h2 className="font-bold text-text-primary mb-4">מכירות לפי קטגוריה</h2>
          {stats.categoryBreakdown.length > 0 ? (
            <div className="space-y-3">
              {stats.categoryBreakdown.map((c) => {
                const maxRev = Math.max(...stats.categoryBreakdown.map((x) => x.revenue), 1);
                const pct = Math.round((c.revenue / maxRev) * 100);
                return (
                  <div key={c.category}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-body-sm font-medium text-text-primary">{c.category}</span>
                      <span className="text-body-sm font-bold text-text-primary">{formatPrice(c.revenue)}</span>
                    </div>
                    <div className="h-2 bg-surface rounded-full overflow-hidden"><div className="h-full bg-accent/40 rounded-full transition-all" style={{ width: `${pct}%` }} /></div>
                  </div>
                );
              })}
            </div>
          ) : <p className="text-body-sm text-text-muted">אין נתונים.</p>}
        </div>

        <div className="bg-card rounded-2xl border border-card-border p-6">
          <h2 className="font-bold text-text-primary mb-4">סקירת מלאי</h2>
          {stats.topProducts.length > 0 ? (
            <div className="space-y-3">
              {stats.topProducts.map((p) => (
                <div key={p.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-body-sm font-medium text-text-primary">{p.name}</p>
                    <p className="text-xs text-text-muted">{p.petType === "DOG" ? "🐕" : "🐈"} {p.category === "FOOD" ? "מזון" : p.category === "TREATS" ? "חטיפים" : p.category === "LITTER" ? "חול" : p.category}</p>
                  </div>
                  <span className={`text-body-sm font-bold ${p.stock < 50 ? "text-red-400" : p.stock < 100 ? "text-amber-400" : "text-text-primary"}`}>{p.stock} יח׳</span>
                </div>
              ))}
            </div>
          ) : <p className="text-body-sm text-text-muted">אין מוצרים.</p>}
        </div>
      </div>
    </div>
  );
}
