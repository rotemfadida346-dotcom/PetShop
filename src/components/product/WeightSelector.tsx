"use client";

import { Check } from "lucide-react";

interface WeightOption {
  id: string;
  weight: string;
  unit: string;
  price: number;
  compareAt: number | null;
  stock: number;
  isDefault: boolean;
}

interface WeightSelectorProps {
  options: WeightOption[];
  selected: WeightOption;
  onSelect: (option: WeightOption) => void;
}

export default function WeightSelector({ options, selected, onSelect }: WeightSelectorProps) {
  if (!options || options.length === 0) return null;

  // Don't show if only one option
  if (options.length === 1) return null;

  const calculateDiscount = (option: WeightOption) => {
    if (!option.compareAt || option.compareAt <= option.price) return null;
    return Math.round(((option.compareAt - option.price) / option.compareAt) * 100);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-text-primary">בחר משקל האריזה:</h3>
        <span className="text-xs text-text-secondary">{options.length} אפשרויות</span>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {options.map((option) => {
          const isSelected = selected.id === option.id;
          const discount = calculateDiscount(option);
          const isOutOfStock = option.stock === 0;

          return (
            <button
              key={option.id}
              onClick={() => !isOutOfStock && onSelect(option)}
              disabled={isOutOfStock}
              className={`relative rounded-xl border-2 p-4 text-right transition-all ${
                isSelected
                  ? "border-primary-green bg-primary-green/10 shadow-lg scale-105"
                  : "border-gray-300 bg-white hover:border-primary-green/50 hover:shadow-md"
              } ${isOutOfStock ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
            >
              {/* Selected Check */}
              {isSelected && (
                <div className="absolute left-3 top-3 flex h-6 w-6 items-center justify-center rounded-full bg-primary-green">
                  <Check size={14} className="text-white" />
                </div>
              )}

              {/* Discount Badge */}
              {discount && !isOutOfStock && (
                <div className="absolute left-3 top-3 rounded-full bg-error px-2 py-1 text-xs font-bold text-white shadow-lg">
                  -{discount}%
                </div>
              )}

              {/* Weight */}
              <div className="mb-2">
                <span className="text-2xl font-bold text-text-primary">
                  {option.weight} {option.unit}
                </span>
              </div>

              {/* Price */}
              <div className="flex flex-col gap-1">
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-bold text-primary-green">
                    ₪{option.price.toFixed(2)}
                  </span>
                  {option.compareAt && option.compareAt > option.price && (
                    <span className="text-sm text-text-secondary line-through">
                      ₪{option.compareAt.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Stock Status */}
                {isOutOfStock ? (
                  <span className="text-xs font-bold text-error">אזל מהמלאי</span>
                ) : option.stock < 5 ? (
                  <span className="text-xs font-medium text-warning">
                    נותרו {option.stock} יחידות
                  </span>
                ) : (
                  <span className="text-xs text-success font-medium">במלאי</span>
                )}
              </div>

              {/* Default Badge */}
              {option.isDefault && !isSelected && (
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <span className="text-xs text-primary-green font-medium">מומלץ ביותר</span>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Selected Display */}
      <div className="rounded-lg bg-gradient-to-r from-primary-green/10 to-primary-blue/10 border-2 border-primary-green/30 p-3">
        <p className="text-sm">
          <span className="font-medium text-text-secondary">נבחר:</span>{" "}
          <span className="font-bold text-primary-green">
            {selected.weight} {selected.unit}
          </span>
          {" "}•{" "}
          <span className="font-bold text-text-primary">₪{selected.price.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
}
