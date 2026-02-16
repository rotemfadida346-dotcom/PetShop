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
    { label: "הכנסות כוללות", value: formatPrice(stats.overview.totalRevenue), icon: DollarSign, change: "+18.2%" },
    { label: "הזמנות", value: String(stats.overview.totalOrders), icon: ShoppingCart, change: "+12.5%" },
    { label: "מנויים פעילים", value: String(stats.overview.activeSubscriptions), icon: RefreshCw, change: "+23%" },
    { label: "הכנסה חוזרת חודשית", value: formatPrice(stats.overview.monthlyRecurring), icon: TrendingUp, change: "+8.4%" },
    { label: "מוצרים פעילים", value: String(stats.overview.activeProducts), icon: Package, change: "" },
    { label: "משלוח חינם / בתשלום", value: `${stats.overview.freeShippingOrders} / ${stats.overview.paidShippingOrders}`, icon: Truck, change: "" },
  ];

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
            {card.change && (
              <p className="text-xs text-emerald-600 font-medium mt-1">
                {card.change} מול חודש קודם
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-xl border border-border p-6 mb-8">
        <h2 className="font-semibold text-black mb-4">הכנסות חודשיות (₪)</h2>
        <RevenueChart data={stats.monthlyRevenue} />
      </div>

      {/* Two columns: Categories + Top Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Category Breakdown */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="font-semibold text-black mb-4">פירוט לפי קטגוריה</h2>
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
        </div>

        {/* Low Stock Alert */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="font-semibold text-black mb-4">מלאי נמוך</h2>
          <div className="space-y-3">
            {stats.topProducts
              .filter((p) => p.stock < 150)
              .map((product) => (
                <div key={product.id} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-black">{product.name}</p>
                    <p className="text-xs text-muted">
                      {product.petType === "DOG" ? "🐕" : "🐈"} {product.category === "FOOD" ? "מזון" : product.category === "TREATS" ? "חטיפים" : "חול"}
                    </p>
                  </div>
                  <span className={`text-sm font-bold ${product.stock < 50 ? "text-red-600" : product.stock < 100 ? "text-amber-600" : "text-black"}`}>
                    {product.stock} יח׳
                  </span>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
