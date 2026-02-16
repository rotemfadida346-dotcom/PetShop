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
    <div className="mb-8 space-y-4">
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-muted ml-2">חיית מחמד:</span>
        <button onClick={() => updateFilter("pet", null)} className={cn("px-4 py-2 rounded-full text-sm font-medium transition-colors", !currentPet ? "bg-black text-white" : "bg-gray-100 text-muted hover:bg-gray-200")}>הכל</button>
        {PET_TYPES.map((pet) => (
          <button key={pet.value} onClick={() => updateFilter("pet", currentPet === pet.value ? null : pet.value)} className={cn("px-4 py-2 rounded-full text-sm font-medium transition-colors", currentPet === pet.value ? "bg-black text-white" : "bg-gray-100 text-muted hover:bg-gray-200")}>
            {pet.emoji} {pet.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-muted ml-2">קטגוריה:</span>
        <button onClick={() => updateFilter("category", null)} className={cn("px-4 py-2 rounded-full text-sm font-medium transition-colors", !currentCategory ? "bg-black text-white" : "bg-gray-100 text-muted hover:bg-gray-200")}>הכל</button>
        {PRODUCT_CATEGORIES.map((cat) => (
          <button key={cat.value} onClick={() => updateFilter("category", currentCategory === cat.value ? null : cat.value)} className={cn("px-4 py-2 rounded-full text-sm font-medium transition-colors", currentCategory === cat.value ? "bg-black text-white" : "bg-gray-100 text-muted hover:bg-gray-200")}>
            {cat.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-border">
        <button onClick={() => updateFilter("subscription", currentSubscription === "true" ? null : "true")} className={cn("inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors", currentSubscription === "true" ? "bg-black text-white" : "bg-gray-100 text-muted hover:bg-gray-200")}>
          <RefreshCw className="h-3.5 w-3.5" />
          מנוי וחיסכון
        </button>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted">מיין:</span>
          <select value={currentSort || ""} onChange={(e) => updateFilter("sort", e.target.value || null)} className="text-sm border border-border rounded-lg px-3 py-2 bg-white text-black focus:outline-none focus:ring-2 focus:ring-black/10 focus:border-black">
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
