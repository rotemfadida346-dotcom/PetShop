"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { PET_TYPES, PRODUCT_CATEGORIES } from "@/lib/constants";
import { RefreshCw } from "lucide-react";

interface ShopFiltersProps { currentPet?: string; currentCategory?: string; currentSubscription?: string; currentSort?: string }

export default function ShopFilters({ currentPet, currentCategory, currentSubscription, currentSort }: ShopFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  function u(key: string, value: string | null) { const p = new URLSearchParams(searchParams.toString()); if (value) p.set(key, value); else p.delete(key); p.delete("page"); router.push(`/shop?${p.toString()}`); }

  const pill = "px-4 py-2 rounded-full text-body-sm font-semibold transition-all duration-200";
  const off = "bg-surface text-text-secondary hover:bg-surface-hover hover:text-accent";
  const on = "bg-accent/15 text-accent ring-1 ring-accent/30";

  return (
    <div className="mb-8 space-y-3 bg-surface rounded-2xl p-5 border border-border">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-body-sm font-bold text-text-muted ml-2">חיית מחמד:</span>
        <button onClick={() => u("pet", null)} className={cn(pill, !currentPet ? on : off)}>הכל</button>
        {PET_TYPES.map((p) => <button key={p.value} onClick={() => u("pet", currentPet === p.value ? null : p.value)} className={cn(pill, currentPet === p.value ? on : off)}>{p.emoji} {p.label}</button>)}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-body-sm font-bold text-text-muted ml-2">קטגוריה:</span>
        <button onClick={() => u("category", null)} className={cn(pill, !currentCategory ? on : off)}>הכל</button>
        {PRODUCT_CATEGORIES.map((c) => <button key={c.value} onClick={() => u("category", currentCategory === c.value ? null : c.value)} className={cn(pill, currentCategory === c.value ? on : off)}>{c.label}</button>)}
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border">
        <button onClick={() => u("subscription", currentSubscription === "true" ? null : "true")} className={cn("inline-flex items-center gap-2", pill, currentSubscription === "true" ? on : off)}><RefreshCw className="h-3.5 w-3.5" /> מנוי</button>
        <select value={currentSort || ""} onChange={(e) => u("sort", e.target.value || null)} className="text-body-sm border border-border rounded-xl px-3 py-2 bg-surface text-text-primary focus:outline-none focus:ring-1 focus:ring-accent/30 font-medium">
          <option value="">מומלצים</option><option value="price-asc">מחיר ↑</option><option value="price-desc">מחיר ↓</option><option value="name">א-ת</option>
        </select>
      </div>
    </div>
  );
}
