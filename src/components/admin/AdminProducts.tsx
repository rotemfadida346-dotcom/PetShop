"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import { Pencil, Trash2, Save, X, Tag } from "lucide-react";

interface Product {
  id: string; name: string; slug: string; price: number; compareAt: number | null;
  stock: number; petType: string; category: string; isActive: boolean;
  isFeatured: boolean; subscriptionDiscount: number; description: string;
  shortDesc: string | null; benefits: string | null; ingredients: string | null;
}

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Product>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/products?limit=50")
      .then((r) => r.json())
      .then((data) => { setProducts(data.products || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  function startEdit(product: Product) {
    setEditing(product.id);
    setEditData({
      name: product.name,
      price: product.price,
      compareAt: product.compareAt,
      stock: product.stock,
      subscriptionDiscount: product.subscriptionDiscount,
    });
  }

  async function saveEdit(slug: string) {
    try {
      const payload = { ...editData };
      // If compareAt is 0 or empty, set to null (no discount)
      if (!payload.compareAt || payload.compareAt <= (payload.price || 0)) {
        payload.compareAt = null;
      }
      const res = await fetch(`/api/products/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        const { product } = await res.json();
        setProducts(products.map((p) => (p.id === editing ? { ...p, ...product } : p)));
      }
    } catch (e) { console.error(e); }
    setEditing(null);
  }

  async function deleteProduct(slug: string, id: string) {
    if (!confirm("האם למחוק מוצר זה?")) return;
    try {
      await fetch(`/api/products/${slug}`, { method: "DELETE" });
      setProducts(products.filter((p) => p.id !== id));
    } catch (e) { console.error(e); }
  }

  if (loading) return <div className="py-20 text-center text-muted">טוען מוצרים...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-900">מוצרים ({products.length})</h1>
      </div>

      {/* Tip */}
      <div className="bg-brand-50 border border-brand-200 rounded-xl p-4 mb-6 flex items-start gap-3">
        <Tag className="h-5 w-5 text-brand-600 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-brand-800">איך לשים הנחה על מוצר?</p>
          <p className="text-sm text-brand-700 mt-0.5">לחצו על עריכה ← הכניסו את המחיר המקורי בעמודת ״מחיר לפני הנחה״. ההנחה תופיע אוטומטית בחנות.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="text-right text-xs font-medium text-gray-500 uppercase px-4 py-3">מוצר</th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase px-4 py-3">קטגוריה</th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase px-4 py-3">מחיר</th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase px-4 py-3">מחיר לפני הנחה</th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase px-4 py-3">הנחה</th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase px-4 py-3">מלאי</th>
                <th className="text-right text-xs font-medium text-gray-500 uppercase px-4 py-3">סטטוס</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-4 py-3">פעולות</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map((product) => {
                const hasDiscount = product.compareAt && product.compareAt > product.price;
                const discountPercent = hasDiscount ? Math.round((1 - product.price / product.compareAt!) * 100) : 0;

                return (
                  <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                    {/* Name */}
                    <td className="px-4 py-4">
                      {editing === product.id ? (
                        <Input value={editData.name || ""} onChange={(e) => setEditData({ ...editData, name: e.target.value })} className="text-sm" />
                      ) : (
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0">
                            <span className="text-lg">{product.petType === "DOG" ? "🐕" : "🐈"}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-gray-900 text-sm">{product.name}</p>
                            <p className="text-xs text-gray-400">{product.slug}</p>
                          </div>
                        </div>
                      )}
                    </td>

                    {/* Category */}
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-500">{product.category === "FOOD" ? "מזון" : product.category === "TREATS" ? "חטיפים" : product.category === "LITTER" ? "חול" : product.category}</span>
                    </td>

                    {/* Price */}
                    <td className="px-4 py-4">
                      {editing === product.id ? (
                        <Input type="number" value={editData.price || 0} onChange={(e) => setEditData({ ...editData, price: parseFloat(e.target.value) })} className="text-sm w-24" />
                      ) : (
                        <span className="text-sm font-bold text-gray-900">{formatPrice(product.price)}</span>
                      )}
                    </td>

                    {/* Compare At (original price for discount) */}
                    <td className="px-4 py-4">
                      {editing === product.id ? (
                        <Input
                          type="number"
                          value={editData.compareAt || ""}
                          onChange={(e) => setEditData({ ...editData, compareAt: e.target.value ? parseFloat(e.target.value) : null })}
                          placeholder="ריק = ללא הנחה"
                          className="text-sm w-28"
                        />
                      ) : (
                        <span className="text-sm text-gray-400">
                          {hasDiscount ? <span className="line-through">{formatPrice(product.compareAt!)}</span> : "—"}
                        </span>
                      )}
                    </td>

                    {/* Discount display */}
                    <td className="px-4 py-4">
                      {hasDiscount ? (
                        <Badge variant="danger">-{discountPercent}%</Badge>
                      ) : (
                        <span className="text-xs text-gray-300">—</span>
                      )}
                    </td>

                    {/* Stock */}
                    <td className="px-4 py-4">
                      {editing === product.id ? (
                        <Input type="number" value={editData.stock || 0} onChange={(e) => setEditData({ ...editData, stock: parseInt(e.target.value) })} className="text-sm w-20" />
                      ) : (
                        <span className={`text-sm font-medium ${product.stock < 50 ? "text-red-600" : product.stock < 100 ? "text-amber-600" : "text-gray-900"}`}>{product.stock}</span>
                      )}
                    </td>

                    {/* Status */}
                    <td className="px-4 py-4">
                      <Badge variant={product.isActive ? "success" : "default"}>{product.isActive ? "פעיל" : "מושבת"}</Badge>
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {editing === product.id ? (
                          <>
                            <button onClick={() => saveEdit(product.slug)} className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all" title="שמור"><Save className="h-4 w-4" /></button>
                            <button onClick={() => setEditing(null)} className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all" title="ביטול"><X className="h-4 w-4" /></button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => startEdit(product)} className="p-2 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-all" title="עריכה"><Pencil className="h-4 w-4" /></button>
                            <button onClick={() => deleteProduct(product.slug, product.id)} className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="מחיקה"><Trash2 className="h-4 w-4" /></button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
