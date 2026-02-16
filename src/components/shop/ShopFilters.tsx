"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { PET_TYPES, PRODUCT_CATEGORIES } from "@/lib/constants";
import { RefreshCw } from "lucide-react";

interface ShopFiltersProps { currentPet?: string; currentCategory?: string; currentSubscription?: string; currentSort?: string }

export default function ShopFilters({ currentPet, currentCategory, currentSubscription, currentSort }: ShopFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  function updateFilter(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value); else params.delete(key);
    params.delete("page");
    router.push(`/shop?${params.toString()}`);
  }

  const pill = "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border";
  const off = "bg-surface text-textSecondary border-border hover:border-accent/50 hover:text-accent";
  const on = "bg-accent text-white border-accent shadow-lg shadow-accent/20";

  return (
    <div className="mb-8 space-y-4 bg-card rounded-xl p-5 border border-border">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-bold text-textMuted ml-2 min-w-fit">חיית מחמד:</span>
        <button onClick={() => updateFilter("pet", null)} className={cn(pill, !currentPet ? on : off)}>הכל</button>
        {PET_TYPES.map((p) => <button key={p.value} onClick={() => updateFilter("pet", currentPet === p.value ? null : p.value)} className={cn(pill, currentPet === p.value ? on : off)}>{p.emoji} {p.label}</button>)}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-bold text-textMuted ml-2 min-w-fit">קטגוריה:</span>
        <button onClick={() => updateFilter("category", null)} className={cn(pill, !currentCategory ? on : off)}>הכל</button>
        {PRODUCT_CATEGORIES.map((c) => <button key={c.value} onClick={() => updateFilter("category", currentCategory === c.value ? null : c.value)} className={cn(pill, currentCategory === c.value ? on : off)}>{c.label}</button>)}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-border">
        <button onClick={() => updateFilter("subscription", currentSubscription === "true" ? null : "true")} className={cn("inline-flex items-center gap-2", pill, currentSubscription === "true" ? on : off)}><RefreshCw className="h-3.5 w-3.5" /> מנוי וחיסכון</button>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-textMuted">מיין:</span>
          <select value={currentSort || ""} onChange={(e) => updateFilter("sort", e.target.value || null)} className="text-sm border border-border rounded-xl px-3 py-2 bg-surface text-textPrimary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent font-medium">
            <option value="">מומלצים</option><option value="price-asc">מחיר: נמוך לגבוה</option><option value="price-desc">מחיר: גבוה לנמוך</option><option value="name">שם: א-ת</option>
          </select>
        </div>
      </div>
    </div>
  );
}
