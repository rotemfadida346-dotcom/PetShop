"use client";

import { useEffect, useState } from "react";
import { formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Plus, Pencil, Trash2, Save, X, Tag, ChevronUp } from "lucide-react";

interface Product {
  id: string; name: string; slug: string; price: number; compareAt: number | null;
  stock: number; petType: string; category: string; isActive: boolean;
  isFeatured: boolean; subscriptionDiscount: number; description: string;
  shortDesc: string | null; benefits: string | null; ingredients: string | null;
}

const EMPTY_NEW: Partial<Product> & { name: string; price: number; stock: number; description: string } = {
  name: "", price: 0, compareAt: null, stock: 0, petType: "DOG",
  category: "FOOD", description: "", shortDesc: "", benefits: "",
  ingredients: "", subscriptionDiscount: 10,
};

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Product>>({});
  const [loading, setLoading] = useState(true);
  const [showNew, setShowNew] = useState(false);
  const [newProduct, setNewProduct] = useState({ ...EMPTY_NEW });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/products?limit=50")
      .then((r) => r.json())
      .then((data) => { setProducts(data.products || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  function startEdit(product: Product) {
    setEditing(product.id);
    setEditData({ name: product.name, price: product.price, compareAt: product.compareAt, stock: product.stock, subscriptionDiscount: product.subscriptionDiscount });
  }

  async function saveEdit(slug: string) {
    try {
      const payload = { ...editData };
      if (!payload.compareAt || payload.compareAt <= (payload.price || 0)) payload.compareAt = null;
      const res = await fetch(`/api/products/${slug}`, { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (res.ok) { const { product } = await res.json(); setProducts(products.map((p) => (p.id === editing ? { ...p, ...product } : p))); }
    } catch (e) { console.error(e); }
    setEditing(null);
  }

  async function deleteProduct(slug: string, id: string) {
    if (!confirm("האם למחוק מוצר זה?")) return;
    try { await fetch(`/api/products/${slug}`, { method: "DELETE" }); setProducts(products.filter((p) => p.id !== id)); }
    catch (e) { console.error(e); }
  }

  async function createProduct() {
    if (!newProduct.name.trim()) return alert("שם מוצר נדרש");
    if (newProduct.price <= 0) return alert("מחיר חייב להיות גדול מ-0");
    setSaving(true);
    try {
      const slug = newProduct.name.toLowerCase().replace(/[^\w\sא-ת]/g, "").replace(/\s+/g, "-").replace(/^-+|-+$/g, "") || `product-${Date.now()}`;
      const payload = {
        name: newProduct.name,
        slug,
        price: newProduct.price,
        compareAt: newProduct.compareAt && newProduct.compareAt > newProduct.price ? newProduct.compareAt : undefined,
        stock: newProduct.stock,
        petType: newProduct.petType,
        category: newProduct.category,
        description: newProduct.description || newProduct.name,
        shortDesc: newProduct.shortDesc || null,
        benefits: newProduct.benefits || null,
        ingredients: newProduct.ingredients || null,
        subscriptionDiscount: newProduct.subscriptionDiscount || 0,
        isActive: true,
        isFeatured: false,
        tags: [],
      };
      const res = await fetch("/api/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (res.ok) {
        const { product } = await res.json();
        setProducts([product, ...products]);
        setNewProduct({ ...EMPTY_NEW });
        setShowNew(false);
      } else {
        const err = await res.json();
        alert(err.error || "שגיאה ביצירת מוצר");
      }
    } catch (e) { console.error(e); alert("שגיאה ביצירת מוצר"); }
    setSaving(false);
  }

  if (loading) return <div className="py-20 text-center text-textSecondary">טוען מוצרים...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-textPrimary">מוצרים ({products.length})</h1>
        <Button size="sm" onClick={() => setShowNew(!showNew)}>
          {showNew ? <><ChevronUp className="h-4 w-4" />סגור</> : <><Plus className="h-4 w-4" />הוסף מוצר</>}
        </Button>
      </div>

      {/* New Product Form */}
      {showNew && (
        <div className="bg-card rounded-xl border border-accent-200 shadow-lg p-6 mb-6">
          <h2 className="text-lg font-bold text-textPrimary mb-4 flex items-center gap-2">
            <Plus className="h-5 w-5 text-accent" />
            מוצר חדש
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="שם מוצר *" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} placeholder="למשל: מזון יבש לכלבים" />
            <Input label="תיאור קצר" value={newProduct.shortDesc || ""} onChange={(e) => setNewProduct({ ...newProduct, shortDesc: e.target.value })} placeholder="משפט אחד שמתאר את המוצר" />
            <Input label="מחיר (₪) *" type="number" value={newProduct.price || ""} onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })} placeholder="0" />
            <Input label="מחיר לפני הנחה (₪)" type="number" value={newProduct.compareAt || ""} onChange={(e) => setNewProduct({ ...newProduct, compareAt: e.target.value ? parseFloat(e.target.value) : null })} placeholder="ריק = ללא הנחה" />
            <Input label="מלאי" type="number" value={newProduct.stock || ""} onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) || 0 })} placeholder="0" />
            <Input label="הנחת מנוי (%)" type="number" value={newProduct.subscriptionDiscount || ""} onChange={(e) => setNewProduct({ ...newProduct, subscriptionDiscount: parseFloat(e.target.value) || 0 })} placeholder="10" />

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-textPrimary">סוג חיה</label>
              <select value={newProduct.petType} onChange={(e) => setNewProduct({ ...newProduct, petType: e.target.value })}
                className="block w-full rounded-xl border border-border bg-card px-4 py-2.5 text-textPrimary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20">
                <option value="DOG">🐕 כלב</option>
                <option value="CAT">🐈 חתול</option>
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-semibold text-textPrimary">קטגוריה</label>
              <select value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                className="block w-full rounded-xl border border-border bg-card px-4 py-2.5 text-textPrimary focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20">
                <option value="FOOD">מזון</option>
                <option value="TREATS">חטיפים</option>
                <option value="LITTER">חול</option>
                <option value="SUPPLEMENTS">תוספים</option>
                <option value="TOYS">צעצועים</option>
                <option value="ACCESSORIES">אביזרים</option>
              </select>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-textPrimary">תיאור מלא</label>
              <textarea value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} placeholder="תיאור מפורט של המוצר..." rows={3}
                className="block w-full rounded-xl border border-border bg-card px-4 py-2.5 text-textPrimary placeholder:text-textMuted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 resize-y" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-textPrimary">יתרונות (שורה חדשה לכל יתרון)</label>
              <textarea value={newProduct.benefits || ""} onChange={(e) => setNewProduct({ ...newProduct, benefits: e.target.value })} placeholder="יתרון ראשון&#10;יתרון שני&#10;יתרון שלישי" rows={3}
                className="block w-full rounded-xl border border-border bg-card px-4 py-2.5 text-textPrimary placeholder:text-textMuted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 resize-y" />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-textPrimary">רכיבים</label>
              <textarea value={newProduct.ingredients || ""} onChange={(e) => setNewProduct({ ...newProduct, ingredients: e.target.value })} placeholder="רשימת רכיבים מופרדת בפסיקים" rows={2}
                className="block w-full rounded-xl border border-border bg-card px-4 py-2.5 text-textPrimary placeholder:text-textMuted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20 resize-y" />
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <Button onClick={createProduct} isLoading={saving}><Save className="h-4 w-4" />צור מוצר</Button>
            <Button variant="ghost" onClick={() => { setShowNew(false); setNewProduct({ ...EMPTY_NEW }); }}><X className="h-4 w-4" />ביטול</Button>
          </div>
        </div>
      )}

      {/* Tip */}
      <div className="bg-accent-50 border border-accent-200 rounded-xl p-4 mb-6 flex items-start gap-3">
        <Tag className="h-5 w-5 text-accent-700 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-accent-800">איך לשים הנחה על מוצר?</p>
          <p className="text-sm text-accent-700 mt-0.5">לחצו על עריכה ← הכניסו את המחיר המקורי בעמודת ״מחיר לפני הנחה״. ההנחה תופיע אוטומטית בחנות.</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-surface">
                <th className="text-right text-xs font-medium text-textSecondary uppercase px-4 py-3">מוצר</th>
                <th className="text-right text-xs font-medium text-textSecondary uppercase px-4 py-3">קטגוריה</th>
                <th className="text-right text-xs font-medium text-textSecondary uppercase px-4 py-3">מחיר</th>
                <th className="text-right text-xs font-medium text-textSecondary uppercase px-4 py-3">לפני הנחה</th>
                <th className="text-right text-xs font-medium text-textSecondary uppercase px-4 py-3">הנחה</th>
                <th className="text-right text-xs font-medium text-textSecondary uppercase px-4 py-3">מלאי</th>
                <th className="text-right text-xs font-medium text-textSecondary uppercase px-4 py-3">סטטוס</th>
                <th className="text-left text-xs font-medium text-textSecondary uppercase px-4 py-3">פעולות</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {products.map((product) => {
                const hasDiscount = product.compareAt && product.compareAt > product.price;
                const discountPercent = hasDiscount ? Math.round((1 - product.price / product.compareAt!) * 100) : 0;

                return (
                  <tr key={product.id} className="hover:bg-surface transition-colors">
                    <td className="px-4 py-4">
                      {editing === product.id ? (
                        <Input value={editData.name || ""} onChange={(e) => setEditData({ ...editData, name: e.target.value })} className="text-sm" />
                      ) : (
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-card-hover rounded-lg flex items-center justify-center shrink-0">
                            <span className="text-lg">{product.petType === "DOG" ? "🐕" : "🐈"}</span>
                          </div>
                          <div>
                            <p className="font-semibold text-textPrimary text-sm">{product.name}</p>
                            <p className="text-xs text-textMuted">{product.slug}</p>
                          </div>
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-4"><span className="text-sm text-textSecondary">{product.category === "FOOD" ? "מזון" : product.category === "TREATS" ? "חטיפים" : product.category === "LITTER" ? "חול" : product.category}</span></td>
                    <td className="px-4 py-4">
                      {editing === product.id ? (
                        <Input type="number" value={editData.price || 0} onChange={(e) => setEditData({ ...editData, price: parseFloat(e.target.value) })} className="text-sm w-24" />
                      ) : (
                        <span className="text-sm font-bold text-textPrimary">{formatPrice(product.price)}</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      {editing === product.id ? (
                        <Input type="number" value={editData.compareAt || ""} onChange={(e) => setEditData({ ...editData, compareAt: e.target.value ? parseFloat(e.target.value) : null })} placeholder="—" className="text-sm w-24" />
                      ) : (
                        <span className="text-sm text-textMuted">{hasDiscount ? <span className="line-through">{formatPrice(product.compareAt!)}</span> : "—"}</span>
                      )}
                    </td>
                    <td className="px-4 py-4">{hasDiscount ? <Badge variant="danger">-{discountPercent}%</Badge> : <span className="text-xs text-gray-300">—</span>}</td>
                    <td className="px-4 py-4">
                      {editing === product.id ? (
                        <Input type="number" value={editData.stock || 0} onChange={(e) => setEditData({ ...editData, stock: parseInt(e.target.value) })} className="text-sm w-20" />
                      ) : (
                        <span className={`text-sm font-medium ${product.stock < 50 ? "text-red-600" : product.stock < 100 ? "text-amber-600" : "text-textPrimary"}`}>{product.stock}</span>
                      )}
                    </td>
                    <td className="px-4 py-4"><Badge variant={product.isActive ? "success" : "default"}>{product.isActive ? "פעיל" : "מושבת"}</Badge></td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {editing === product.id ? (
                          <>
                            <button onClick={() => saveEdit(product.slug)} className="p-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all" title="שמור"><Save className="h-4 w-4" /></button>
                            <button onClick={() => setEditing(null)} className="p-2 text-textMuted hover:text-gray-700 hover:bg-card-hover rounded-lg transition-all" title="ביטול"><X className="h-4 w-4" /></button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => startEdit(product)} className="p-2 text-textMuted hover:text-accent hover:bg-accent-50 rounded-lg transition-all" title="עריכה"><Pencil className="h-4 w-4" /></button>
                            <button onClick={() => deleteProduct(product.slug, product.id)} className="p-2 text-textMuted hover:text-red-600 hover:bg-red-50 rounded-lg transition-all" title="מחיקה"><Trash2 className="h-4 w-4" /></button>
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
