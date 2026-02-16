"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { PET_TYPES, PRODUCT_CATEGORIES } from "@/lib/constants";
import { RefreshCw } from "lucide-react";

interface ShopFiltersProps {
  currentPet?: string;
  currentCategory?: string;
  currentSubscription?: string;
  currentSort?: string;
}

export default function ShopFilters({ currentPet, currentCategory, currentSubscription, currentSort }: ShopFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateFilter(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) { params.set(key, value); } else { params.delete(key); }
    params.delete("page");
    router.push(`/shop?${params.toString()}`);
  }

  const pillBase = "px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 border";
  const pillInactive = "bg-card text-textSecondary border-gray-200 hover:border-accent hover:text-accent";
  const pillActive = "bg-accent text-white border-accent shadow-md shadow-accent/20";

  return (
    <div className="mb-8 space-y-4 bg-card rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-bold text-textSecondary ml-2 min-w-fit">חיית מחמד:</span>
        <button onClick={() => updateFilter("pet", null)} className={cn(pillBase, !currentPet ? pillActive : pillInactive)}>הכל</button>
        {PET_TYPES.map((pet) => (
          <button key={pet.value} onClick={() => updateFilter("pet", currentPet === pet.value ? null : pet.value)} className={cn(pillBase, currentPet === pet.value ? pillActive : pillInactive)}>
            {pet.emoji} {pet.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-bold text-textSecondary ml-2 min-w-fit">קטגוריה:</span>
        <button onClick={() => updateFilter("category", null)} className={cn(pillBase, !currentCategory ? pillActive : pillInactive)}>הכל</button>
        {PRODUCT_CATEGORIES.map((cat) => (
          <button key={cat.value} onClick={() => updateFilter("category", currentCategory === cat.value ? null : cat.value)} className={cn(pillBase, currentCategory === cat.value ? pillActive : pillInactive)}>
            {cat.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-gray-200">
        <button onClick={() => updateFilter("subscription", currentSubscription === "true" ? null : "true")}
          className={cn("inline-flex items-center gap-2", pillBase, currentSubscription === "true" ? pillActive : pillInactive)}>
          <RefreshCw className="h-3.5 w-3.5" /> מנוי וחיסכון
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-textSecondary">מיין:</span>
          <select value={currentSort || ""} onChange={(e) => updateFilter("sort", e.target.value || null)}
            className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-card text-textPrimary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent font-medium">
            <option value="">מומלצים</option>
            <option value="price-asc">מחיר: נמוך לגבוה</option>
            <option value="price-desc">מחיר: גבוה לנמוך</option>
            <option value="name">שם: א-ת</option>
          </select>
        </div>
      </div>
    </div>
  );
}
