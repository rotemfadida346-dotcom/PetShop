"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";
import { PET_TYPES, PRODUCT_CATEGORIES } from "@/lib/constants";

interface ShopFiltersProps {
  currentPet?: string;
  currentCategory?: string;
  currentSort?: string;
}

export default function ShopFilters({
  currentPet,
  currentCategory,
  currentSort,
}: ShopFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateFilter(key: string, value: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/shop?${params.toString()}`);
  }

  return (
    <div className="mb-8 space-y-4">
      {/* Pet Type Filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-stone-500 mr-2">Pet:</span>
        <button
          onClick={() => updateFilter("pet", null)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            !currentPet
              ? "bg-stone-900 text-white"
              : "bg-stone-100 text-stone-600 hover:bg-stone-200"
          )}
        >
          All
        </button>
        {PET_TYPES.map((pet) => (
          <button
            key={pet.value}
            onClick={() =>
              updateFilter("pet", currentPet === pet.value ? null : pet.value)
            }
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              currentPet === pet.value
                ? "bg-stone-900 text-white"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            )}
          >
            {pet.emoji} {pet.label}
          </button>
        ))}
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-stone-500 mr-2">
          Category:
        </span>
        <button
          onClick={() => updateFilter("category", null)}
          className={cn(
            "px-4 py-2 rounded-full text-sm font-medium transition-colors",
            !currentCategory
              ? "bg-amber-600 text-white"
              : "bg-stone-100 text-stone-600 hover:bg-stone-200"
          )}
        >
          All
        </button>
        {PRODUCT_CATEGORIES.map((cat) => (
          <button
            key={cat.value}
            onClick={() =>
              updateFilter(
                "category",
                currentCategory === cat.value ? null : cat.value
              )
            }
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              currentCategory === cat.value
                ? "bg-amber-600 text-white"
                : "bg-stone-100 text-stone-600 hover:bg-stone-200"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Sort */}
      <div className="flex items-center gap-2 pt-2 border-t border-stone-100">
        <span className="text-sm font-medium text-stone-500">Sort by:</span>
        <select
          value={currentSort || ""}
          onChange={(e) =>
            updateFilter("sort", e.target.value || null)
          }
          className="text-sm border border-stone-200 rounded-lg px-3 py-2 bg-white text-stone-700 focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500"
        >
          <option value="">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name">Name: A-Z</option>
        </select>
      </div>
    </div>
  );
}
