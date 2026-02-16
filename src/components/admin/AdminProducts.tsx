"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Input from "@/components/ui/Input";
import { Pencil, Trash2, Save, X, Package } from "lucide-react";

interface Product {
  id: string; name: string; slug: string; price: number; stock: number;
  petType: string; category: string; isActive: boolean; isFeatured: boolean;
  subscriptionDiscount: number; description: string; shortDesc: string | null;
  benefits: string | null; ingredients: string | null;
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
    setEditData({ name: product.name, price: product.price, stock: product.stock, description: product.description, shortDesc: product.shortDesc, subscriptionDiscount: product.subscriptionDiscount });
  }

  async function saveEdit(slug: string) {
    try {
      const res = await fetch(`/api/products/${slug}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
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
        <h1 className="text-2xl font-bold text-black">מוצרים ({products.length})</h1>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-gray-50">
                <th className="text-right text-xs font-medium text-muted uppercase px-5 py-3">מוצר</th>
                <th className="text-right text-xs font-medium text-muted uppercase px-5 py-3">קטגוריה</th>
                <th className="text-right text-xs font-medium text-muted uppercase px-5 py-3">מחיר</th>
                <th className="text-right text-xs font-medium text-muted uppercase px-5 py-3">מלאי</th>
                <th className="text-right text-xs font-medium text-muted uppercase px-5 py-3">מנוי %</th>
                <th className="text-right text-xs font-medium text-muted uppercase px-5 py-3">סטטוס</th>
                <th className="text-left text-xs font-medium text-muted uppercase px-5 py-3">פעולות</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4">
                    {editing === product.id ? (
                      <Input value={editData.name || ""} onChange={(e) => setEditData({ ...editData, name: e.target.value })} className="text-sm" />
                    ) : (
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0"><Package className="h-4 w-4 text-muted" /></div>
                        <div><p className="font-medium text-black text-sm">{product.name}</p><p className="text-xs text-muted">{product.petType === "DOG" ? "🐕" : "🐈"} {product.slug}</p></div>
                      </div>
                    )}
                  </td>
                  <td className="px-5 py-4"><span className="text-sm text-muted">{product.category === "FOOD" ? "מזון" : product.category === "TREATS" ? "חטיפים" : product.category === "LITTER" ? "חול" : product.category}</span></td>
                  <td className="px-5 py-4">
                    {editing === product.id ? (
                      <Input type="number" value={editData.price || 0} onChange={(e) => setEditData({ ...editData, price: parseFloat(e.target.value) })} className="text-sm w-24" />
                    ) : (
                      <span className="text-sm font-medium text-black">{formatPrice(product.price)}</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    {editing === product.id ? (
                      <Input type="number" value={editData.stock || 0} onChange={(e) => setEditData({ ...editData, stock: parseInt(e.target.value) })} className="text-sm w-20" />
                    ) : (
                      <span className={`text-sm font-medium ${product.stock < 50 ? "text-red-600" : product.stock < 100 ? "text-amber-600" : "text-black"}`}>{product.stock}</span>
                    )}
                  </td>
                  <td className="px-5 py-4">
                    {editing === product.id ? (
                      <Input type="number" value={editData.subscriptionDiscount || 0} onChange={(e) => setEditData({ ...editData, subscriptionDiscount: parseFloat(e.target.value) })} className="text-sm w-16" />
                    ) : (
                      <span className="text-sm text-muted">{product.subscriptionDiscount}%</span>
                    )}
                  </td>
                  <td className="px-5 py-4"><Badge variant={product.isActive ? "success" : "default"}>{product.isActive ? "פעיל" : "מושבת"}</Badge></td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      {editing === product.id ? (
                        <>
                          <button onClick={() => saveEdit(product.slug)} className="p-2 text-emerald-600 hover:text-emerald-700 transition-colors"><Save className="h-4 w-4" /></button>
                          <button onClick={() => setEditing(null)} className="p-2 text-muted hover:text-black transition-colors"><X className="h-4 w-4" /></button>
                        </>
                      ) : (
                        <>
                          <button onClick={() => startEdit(product)} className="p-2 text-muted hover:text-black transition-colors"><Pencil className="h-4 w-4" /></button>
                          <button onClick={() => deleteProduct(product.slug, product.id)} className="p-2 text-muted hover:text-red-600 transition-colors"><Trash2 className="h-4 w-4" /></button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
