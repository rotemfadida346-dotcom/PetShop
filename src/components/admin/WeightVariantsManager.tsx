"use client";

import { Plus, Trash2, Package } from "lucide-react";
import Button from "@/components/ui/Button";

interface WeightVariant {
  id: string;
  weight: string;
  unit: string;
  price: number;
  compareAt: number | null;
  stock: number;
  isDefault: boolean;
}

interface WeightVariantsManagerProps {
  variants: WeightVariant[];
  onChange: (variants: WeightVariant[]) => void;
}

export default function WeightVariantsManager({ variants, onChange }: WeightVariantsManagerProps) {
  const addVariant = () => {
    const newVariant: WeightVariant = {
      id: `var-${Date.now()}`,
      weight: "",
      unit: "ק״ג",
      price: 0,
      compareAt: null,
      stock: 0,
      isDefault: variants.length === 0,
    };
    onChange([...variants, newVariant]);
  };

  const updateVariant = (id: string, field: keyof WeightVariant, value: string | number | boolean | null) => {
    onChange(
      variants.map((v) =>
        v.id === id ? { ...v, [field]: value } : v
      )
    );
  };

  const removeVariant = (id: string) => {
    onChange(variants.filter((v) => v.id !== id));
  };

  const setDefault = (id: string) => {
    onChange(
      variants.map((v) => ({
        ...v,
        isDefault: v.id === id,
      }))
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-bold text-text-primary flex items-center gap-2">
            <Package className="h-5 w-5 text-primary-green" />
            משקלים ומחירים
          </h3>
          <p className="text-sm text-text-secondary">הוסף משקלים שונים (3.6 ק״ג, 7.3 ק״ג וכו׳)</p>
        </div>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addVariant}
        >
          <Plus className="h-4 w-4" />
          הוסף משקל
        </Button>
      </div>

      {variants.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
          <Package className="h-12 w-12 text-gray-400 mx-auto mb-3" />
          <p className="text-sm text-text-secondary mb-2">אין משקלים</p>
          <p className="text-xs text-text-muted">לחץ &quot;הוסף משקל&quot; כדי להוסיף אפשרויות משקל למוצר</p>
        </div>
      ) : (
        <div className="space-y-3">
          {variants.map((variant) => (
            <div
              key={variant.id}
              className={`p-4 rounded-xl border-2 ${
                variant.isDefault
                  ? "border-primary-green bg-primary-green/5"
                  : "border-gray-200 bg-white"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-3">
                  {/* Weight */}
                  <div>
                    <label className="block text-xs font-medium text-text-primary mb-1">
                      משקל *
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        step="0.1"
                        value={variant.weight}
                        onChange={(e) => updateVariant(variant.id, "weight", e.target.value)}
                        placeholder="3.6"
                        className="flex-1 px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-green text-sm"
                      />
                      <select
                        value={variant.unit}
                        onChange={(e) => updateVariant(variant.id, "unit", e.target.value)}
                        className="px-2 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-green text-sm"
                      >
                        <option value="ק״ג">ק״ג</option>
                        <option value="גרם">גרם</option>
                        <option value="ליטר">ליטר</option>
                      </select>
                    </div>
                  </div>

                  {/* Price */}
                  <div>
                    <label className="block text-xs font-medium text-text-primary mb-1">
                      מחיר (₪) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={variant.price || ""}
                      onChange={(e) => updateVariant(variant.id, "price", parseFloat(e.target.value) || 0)}
                      placeholder="189"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-green text-sm"
                    />
                  </div>

                  {/* Compare At Price */}
                  <div>
                    <label className="block text-xs font-medium text-text-primary mb-1">
                      לפני הנחה
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={variant.compareAt || ""}
                      onChange={(e) => updateVariant(variant.id, "compareAt", e.target.value ? parseFloat(e.target.value) : null)}
                      placeholder="220"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-green text-sm"
                    />
                  </div>

                  {/* Stock */}
                  <div>
                    <label className="block text-xs font-medium text-text-primary mb-1">
                      מלאי
                    </label>
                    <input
                      type="number"
                      value={variant.stock || ""}
                      onChange={(e) => updateVariant(variant.id, "stock", parseInt(e.target.value) || 0)}
                      placeholder="50"
                      className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-green text-sm"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => removeVariant(variant.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                    title="מחק"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                  {!variant.isDefault && (
                    <button
                      type="button"
                      onClick={() => setDefault(variant.id)}
                      className="text-xs px-2 py-1 bg-gray-100 hover:bg-primary-green hover:text-white rounded transition-colors"
                      title="קבע כברירת מחדל"
                    >
                      ברירת מחדל
                    </button>
                  )}
                </div>
              </div>

              {/* Default Badge */}
              {variant.isDefault && (
                <div className="mt-2 pt-2 border-t border-primary-green/20">
                  <span className="text-xs font-bold text-primary-green">
                    ✓ משקל ברירת מחדל - יוצג ראשון ללקוחות
                  </span>
                </div>
              )}

              {/* Preview */}
              <div className="mt-2 text-xs text-text-secondary">
                תצוגה: <span className="font-bold">{variant.weight} {variant.unit}</span> - 
                <span className="font-bold text-primary-green"> ₪{variant.price}</span>
                {variant.compareAt && variant.compareAt > variant.price && (
                  <span className="text-red-500"> (חסכון {Math.round((1 - variant.price / variant.compareAt) * 100)}%)</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p className="text-sm text-blue-900">
          <strong>💡 טיפ:</strong> לחץ &quot;הוסף משקל&quot; כדי ליצור אפשרויות כמו 3.6 ק״ג, 7.3 ק״ג וכו׳.
          כל משקל יכול להיות עם מחיר שונה!
        </p>
      </div>
    </div>
  );
}
