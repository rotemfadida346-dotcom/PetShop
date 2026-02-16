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

  return (
    <div className="mb-8 space-y-4 bg-surface rounded-2xl p-5 border border-gray-100">
      {/* Pet Type */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-semibold text-gray-500 ml-2 min-w-fit">חיית מחמד:</span>
        <button onClick={() => updateFilter("pet", null)} className={cn("px-4 py-2 rounded-full text-sm font-semibold transition-all", !currentPet ? "bg-gray-900 text-white shadow-md" : "bg-white text-gray-500 border border-gray-200 hover:border-brand-300 hover:text-brand-600")}>הכל</button>
        {PET_TYPES.map((pet) => (
          <button key={pet.value} onClick={() => updateFilter("pet", currentPet === pet.value ? null : pet.value)}
            className={cn("px-4 py-2 rounded-full text-sm font-semibold transition-all",
              currentPet === pet.value
                ? pet.value === "DOG" ? "bg-dog-500 text-white shadow-md" : "bg-cat-500 text-white shadow-md"
                : "bg-white text-gray-500 border border-gray-200 hover:border-brand-300 hover:text-brand-600")}>
            {pet.emoji} {pet.label}
          </button>
        ))}
      </div>

      {/* Category */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-semibold text-gray-500 ml-2 min-w-fit">קטגוריה:</span>
        <button onClick={() => updateFilter("category", null)} className={cn("px-4 py-2 rounded-full text-sm font-semibold transition-all", !currentCategory ? "bg-brand-500 text-white shadow-md" : "bg-white text-gray-500 border border-gray-200 hover:border-brand-300 hover:text-brand-600")}>הכל</button>
        {PRODUCT_CATEGORIES.map((cat) => (
          <button key={cat.value} onClick={() => updateFilter("category", currentCategory === cat.value ? null : cat.value)}
            className={cn("px-4 py-2 rounded-full text-sm font-semibold transition-all", currentCategory === cat.value ? "bg-brand-500 text-white shadow-md" : "bg-white text-gray-500 border border-gray-200 hover:border-brand-300 hover:text-brand-600")}>
            {cat.label}
          </button>
        ))}
      </div>

      {/* Subscription + Sort */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-gray-200">
        <button onClick={() => updateFilter("subscription", currentSubscription === "true" ? null : "true")}
          className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all",
            currentSubscription === "true" ? "bg-emerald-500 text-white shadow-md" : "bg-white text-gray-500 border border-gray-200 hover:border-emerald-300 hover:text-emerald-600")}>
          <RefreshCw className="h-3.5 w-3.5" />
          מנוי וחיסכון
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-gray-500">מיין:</span>
          <select value={currentSort || ""} onChange={(e) => updateFilter("sort", e.target.value || null)}
            className="text-sm border border-gray-200 rounded-xl px-3 py-2 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-400/30 focus:border-brand-400 font-medium">
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
