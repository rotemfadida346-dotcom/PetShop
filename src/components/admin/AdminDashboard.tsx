"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils";
import {
  DollarSign,
  Package,
  ShoppingCart,
  RefreshCw,
  TrendingUp,
  Truck,
} from "lucide-react";
import RevenueChart from "./RevenueChart";

interface Stats {
  overview: {
    totalProducts: number;
    activeProducts: number;
    totalOrders: number;
    totalSubscriptions: number;
    activeSubscriptions: number;
    totalRevenue: number;
    monthlyRecurring: number;
    freeShippingOrders: number;
    paidShippingOrders: number;
  };
  monthlyRevenue: { month: string; revenue: number }[];
  categoryBreakdown: { category: string; count: number; revenue: number }[];
  topProducts: { id: string; name: string; price: number; stock: number; petType: string; category: string }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then((r) => r.json())
      .then(setStats)
      .catch(console.error);
  }, []);

  if (!stats) {
    return <div className="py-20 text-center text-muted">טוען נתונים...</div>;
  }

  const cards = [
    { label: "הכנסות כוללות", value: formatPrice(stats.overview.totalRevenue), icon: DollarSign },
    { label: "הזמנות", value: String(stats.overview.totalOrders), icon: ShoppingCart },
    { label: "מנויים פעילים", value: String(stats.overview.activeSubscriptions), icon: RefreshCw },
    { label: "הכנסה חוזרת חודשית", value: formatPrice(stats.overview.monthlyRecurring), icon: TrendingUp },
    { label: "מוצרים פעילים", value: String(stats.overview.activeProducts), icon: Package },
    { label: "משלוח חינם / בתשלום", value: `${stats.overview.freeShippingOrders} / ${stats.overview.paidShippingOrders}`, icon: Truck },
  ];

  const hasRevenue = stats.monthlyRevenue.some((m) => m.revenue > 0);

  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-6">לוח בקרה</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {cards.map((card) => (
          <div key={card.label} className="bg-white rounded-xl border border-border p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted">{card.label}</span>
              <card.icon className="h-5 w-5 text-muted" />
            </div>
            <p className="text-2xl font-bold text-black">{card.value}</p>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-xl border border-border p-6 mb-8">
        <h2 className="font-semibold text-black mb-4">הכנסות חודשיות (₪)</h2>
        {hasRevenue ? (
          <RevenueChart data={stats.monthlyRevenue} />
        ) : (
          <div className="h-48 flex items-center justify-center text-muted text-sm">
            אין נתוני הכנסות עדיין. ההכנסות יופיעו כאן לאחר הזמנות.
          </div>
        )}
      </div>

      {/* Two columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Breakdown */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="font-semibold text-black mb-4">פירוט לפי קטגוריה</h2>
          {stats.categoryBreakdown.length > 0 ? (
            <div className="space-y-3">
              {stats.categoryBreakdown.map((cat) => (
                <div key={cat.category} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-black">{cat.category}</p>
                    <p className="text-xs text-muted">{cat.count} מוצרים</p>
                  </div>
                  <p className="text-sm font-bold text-black">{formatPrice(cat.revenue)}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted">אין נתונים עדיין.</p>
          )}
        </div>

        {/* Stock Overview */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="font-semibold text-black mb-4">סקירת מלאי</h2>
          {stats.topProducts.length > 0 ? (
            <div className="space-y-3">
              {stats.topProducts.map((product) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-black">{product.name}</p>
                    <p className="text-xs text-muted">
                      {product.petType === "DOG" ? "🐕" : "🐈"}{" "}
                      {product.category === "FOOD" ? "מזון" : product.category === "TREATS" ? "חטיפים" : product.category === "LITTER" ? "חול" : product.category}
                    </p>
                  </div>
                  <span className={`text-sm font-bold ${product.stock < 50 ? "text-red-600" : product.stock < 100 ? "text-amber-600" : "text-black"}`}>
                    {product.stock} יח׳
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-muted">אין מוצרים עדיין.</p>
          )}
        </div>
      </div>
    </div>
  );
}
