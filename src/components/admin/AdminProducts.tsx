"use client";

import { useEffect, useState } from "react";
import { formatPrice, cn } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import ImageUploadManager from "./ImageUploadManager";
import { Plus, Pencil, Trash2, Save, X, Tag, ChevronUp, Package, Image as ImageIcon } from "lucide-react";

interface Product {
  id: string; name: string; slug: string; price: number; compareAt: number | null;
  stock: number; petType: string; category: string; isActive: boolean;
  isFeatured: boolean; subscriptionDiscount: number; description: string;
  shortDesc: string | null; benefits: string | null; ingredients: string | null;
}

const CATEGORIES = [
  { value: "ALL", label: "הכל", icon: "📦" },
  { value: "FOOD", label: "מזון", icon: "🍖" },
  { value: "TREATS", label: "חטיפים", icon: "🦴" },
  { value: "TOYS", label: "צעצועים", icon: "🎾" },
  { value: "LITTER", label: "חול", icon: "🧹" },
  { value: "ACCESSORIES", label: "אביזרים / מיטות", icon: "🛏️" },
  { value: "SUPPLEMENTS", label: "תוספים", icon: "💊" },
];

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editing, setEditing] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<Product>>({});
  const [editingImages, setEditingImages] = useState<string | null>(null);
  const [editImagesData, setEditImagesData] = useState<Array<{url: string; alt: string; position: number}>>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("ALL");
  const [showNew, setShowNew] = useState(false);
  const [newProduct, setNewProduct] = useState(makeEmpty("FOOD"));
  const [newProductImages, setNewProductImages] = useState<Array<{url: string; alt: string; position: number}>>([]);
  const [newProductWeights, setNewProductWeights] = useState<Array<{id: string; weight: string; unit: string; price: number; compareAt: number | null; stock: number; isDefault: boolean}>>([]);
  const [saving, setSaving] = useState(false);

  function makeEmpty(category: string) {
    return { name: "", price: 0, compareAt: null as number | null, stock: 0, petType: "DOG", category, description: "", shortDesc: "", benefits: "", ingredients: "", subscriptionDiscount: 10 };
  }

  useEffect(() => {
    fetch("/api/products?limit=100")
      .then((r) => r.json())
      .then((data) => { setProducts(data.products || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = activeCategory === "ALL" ? products : products.filter((p) => p.category === activeCategory);

  const categoryCounts = CATEGORIES.map((c) => ({
    ...c,
    count: c.value === "ALL" ? products.length : products.filter((p) => p.category === c.value).length,
  }));

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

  async function startEditImages(slug: string) {
    setEditingImages(slug);
    // Fetch product with images
    try {
      const res = await fetch(`/api/products/${slug}`);
      const { product } = await res.json();
      setEditImagesData(product.images || []);
    } catch (e) {
      console.error(e);
      setEditImagesData([]);
    }
  }

  async function saveImages(slug: string) {
    setSaving(true);
    try {
      const res = await fetch(`/api/products/${slug}/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ images: editImagesData }),
      });
      if (res.ok) {
        alert("התמונות עודכנו בהצלחה!");
        setEditingImages(null);
      } else {
        alert("שגיאה בעדכון תמונות");
      }
    } catch (e) {
      console.error(e);
      alert("שגיאה בעדכון תמונות");
    }
    setSaving(false);
  }

  function openNewInCategory(cat: string) {
    const actualCat = cat === "ALL" ? "FOOD" : cat;
    setNewProduct(makeEmpty(actualCat));
    setNewProductImages([]);
    setNewProductWeights([]);
    setShowNew(true);
  }

  async function createProduct() {
    if (!newProduct.name.trim()) return alert("שם מוצר נדרש");
    if (newProduct.price <= 0) return alert("מחיר חייב להיות גדול מ-0");
    setSaving(true);
    try {
      const slug = newProduct.name.toLowerCase().replace(/[^\w\sא-ת]/g, "").replace(/\s+/g, "-").replace(/^-+|-+$/g, "") || `product-${Date.now()}`;
      const payload = {
        name: newProduct.name, slug, price: newProduct.price,
        compareAt: newProduct.compareAt && newProduct.compareAt > newProduct.price ? newProduct.compareAt : undefined,
        stock: newProduct.stock, petType: newProduct.petType, category: newProduct.category,
        description: newProduct.description || newProduct.name, shortDesc: newProduct.shortDesc || null,
        benefits: newProduct.benefits || null, ingredients: newProduct.ingredients || null,
        subscriptionDiscount: newProduct.subscriptionDiscount || 0, isActive: true, isFeatured: false, tags: [],
        images: newProductImages,
      };
      const res = await fetch("/api/products", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (res.ok) {
        const { product } = await res.json();
        setProducts([product, ...products]);
        setNewProduct(makeEmpty(newProduct.category));
        setNewProductImages([]);
        setShowNew(false);
        setActiveCategory(newProduct.category);
      } else { const err = await res.json(); alert(err.error || "שגיאה ביצירת מוצר"); }
    } catch { alert("שגיאה ביצירת מוצר"); }
    setSaving(false);
  }

  const catLabel = (val: string) => CATEGORIES.find((c) => c.value === val)?.label || val;

  if (loading) return <div className="py-20 text-center text-text-secondary">טוען מוצרים...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-heading-lg text-text-primary">מוצרים ({products.length})</h1>
        <Button size="lg" onClick={() => { if (showNew) { setShowNew(false); } else { openNewInCategory(activeCategory); } }} className="font-bold">
          {showNew ? <><ChevronUp className="h-4 w-4" />סגור טופס</> : <><Plus className="h-5 w-5" />הוסף מוצר חדש</>}
        </Button>
      </div>

      {/* Image Management Help Banner */}
      {!showNew && (
        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-2xl p-6 mb-6 shadow-lg">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
              <ImageIcon className="h-7 w-7" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold mb-2">🎨 ניהול תמונות מוצרים - קל ופשוט!</h3>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center font-bold">1</span>
                  <span><strong>מוצר חדש:</strong> לחץ &quot;הוסף מוצר&quot; למעלה → גלול למטה → ראה &quot;📸 תמונות המוצר&quot;</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center font-bold">2</span>
                  <span><strong>מוצר קיים:</strong> לחץ על הכפתור הכחול 🖼️ בטבלה למטה (עמודת &quot;פעולות&quot;)</span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-6 h-6 bg-white/30 rounded-full flex items-center justify-center font-bold">3</span>
                  <span><strong>הוספה מהירה:</strong> לחץ על כפתור צבעוני (ירוק/סגול/אדום) לתמונת placeholder מיידית!</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {categoryCounts.map((c) => (
          <button key={c.value} onClick={() => { setActiveCategory(c.value); setShowNew(false); }}
            className={cn("flex items-center gap-2 px-4 py-2.5 rounded-xl text-body-sm font-semibold transition-all duration-200",
              activeCategory === c.value ? "bg-accent/15 text-accent ring-1 ring-accent/30" : "bg-surface text-text-secondary hover:bg-surface-hover hover:text-accent")}>
            <span>{c.icon}</span>
            <span>{c.label}</span>
            <span className={cn("text-[11px] px-1.5 py-0.5 rounded-full", activeCategory === c.value ? "bg-accent/20 text-accent" : "bg-surface-light text-text-muted")}>{c.count}</span>
          </button>
        ))}
      </div>

      {/* New Product Form */}
      {showNew && (
        <div className="bg-card rounded-2xl border border-accent/20 shadow-lg p-6 mb-6">
          <h2 className="text-heading-md text-text-primary mb-1 flex items-center gap-2">
            <Plus className="h-5 w-5 text-accent" />
            מוצר חדש בקטגוריית {catLabel(newProduct.category)}
          </h2>
          <p className="text-body-sm text-text-muted mb-5">מלאו את הפרטים והמוצר יופיע בחנות מיד לאחר השמירה.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="שם מוצר *" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} placeholder="למשל: צעצוע לעיסה לכלבים" />
            <Input label="תיאור קצר" value={newProduct.shortDesc || ""} onChange={(e) => setNewProduct({ ...newProduct, shortDesc: e.target.value })} placeholder="משפט אחד שמתאר את המוצר" />
            <Input label="מחיר (₪) *" type="number" value={newProduct.price || ""} onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) || 0 })} />
            <Input label="מחיר לפני הנחה (₪)" type="number" value={newProduct.compareAt || ""} onChange={(e) => setNewProduct({ ...newProduct, compareAt: e.target.value ? parseFloat(e.target.value) : null })} placeholder="ריק = ללא הנחה" />
            <Input label="מלאי" type="number" value={newProduct.stock || ""} onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) || 0 })} />
            <Input label="הנחת מנוי (%)" type="number" value={newProduct.subscriptionDiscount || ""} onChange={(e) => setNewProduct({ ...newProduct, subscriptionDiscount: parseFloat(e.target.value) || 0 })} />
            <div>
              <label className="mb-1.5 block text-body-sm font-semibold text-text-primary">סוג חיה</label>
              <select value={newProduct.petType} onChange={(e) => setNewProduct({ ...newProduct, petType: e.target.value })} className="block w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-text-primary focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/15">
                <option value="DOG">🐕 כלב</option><option value="CAT">🐈 חתול</option>
              </select>
            </div>
            <div>
              <label className="mb-1.5 block text-body-sm font-semibold text-text-primary">קטגוריה</label>
              <select value={newProduct.category} onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })} className="block w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-text-primary focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/15">
                {CATEGORIES.filter((c) => c.value !== "ALL").map((c) => <option key={c.value} value={c.value}>{c.icon} {c.label}</option>)}
              </select>
            </div>
          </div>

          <div className="mt-4 space-y-4">
            <div><label className="mb-1.5 block text-body-sm font-semibold text-text-primary">תיאור מלא</label>
              <textarea value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} placeholder="תיאור מפורט של המוצר..." rows={3} className="block w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/15 resize-y" /></div>
            <div><label className="mb-1.5 block text-body-sm font-semibold text-text-primary">יתרונות (שורה לכל יתרון)</label>
              <textarea value={newProduct.benefits || ""} onChange={(e) => setNewProduct({ ...newProduct, benefits: e.target.value })} placeholder={"יתרון ראשון\nיתרון שני\nיתרון שלישי"} rows={3} className="block w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/15 resize-y" /></div>
            <div><label className="mb-1.5 block text-body-sm font-semibold text-text-primary">רכיבים</label>
              <textarea value={newProduct.ingredients || ""} onChange={(e) => setNewProduct({ ...newProduct, ingredients: e.target.value })} placeholder="רשימת רכיבים" rows={2} className="block w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-text-primary placeholder:text-text-muted focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/15 resize-y" /></div>
          </div>

          {/* ============== IMAGE MANAGER - IMPOSSIBLE TO MISS ============== */}
          <div className="mt-8 mb-8">
            {/* GIANT ATTENTION-GRABBING HEADER */}
            <div className="bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 text-white rounded-2xl p-8 mb-6 shadow-2xl border-4 border-yellow-500">
              <div className="text-center">
                <div className="text-6xl mb-4">📸🎨🖼️</div>
                <h2 className="text-4xl font-black mb-3 drop-shadow-lg">
                  תמונות המוצר - לחץ כאן! ⬇️
                </h2>
                <p className="text-xl font-bold mb-2">
                  לחץ על הכפתורים הצבעוניים למטה להוספת תמונות!
                </p>
                <p className="text-lg opacity-90">
                  ירוק = מזון כלבים | סגול = מזון חתולים | אדום = צעצועים
                </p>
              </div>
            </div>

            {/* THE ACTUAL IMAGE MANAGER */}
            <div className="bg-white rounded-2xl p-8 border-4 border-blue-500 shadow-xl">
              <ImageUploadManager 
                images={newProductImages} 
                onChange={setNewProductImages}
                productName={newProduct.name}
              />
            </div>
            
            {/* Image Count Display */}
            {newProductImages.length > 0 && (
              <div className="mt-4 bg-green-50 border-2 border-green-500 rounded-xl p-4 text-center">
                <p className="text-lg font-bold text-green-700">
                  ✅ הוספת {newProductImages.length} תמונות - מעולה!
                </p>
              </div>
            )}
          </div>

          {/* ============== WEIGHT VARIANTS MANAGER ============== */}
          <div className="mt-8 mb-8">
            <div className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 text-white rounded-2xl p-8 mb-6 shadow-2xl border-4 border-purple-500">
              <div className="text-center">
                <div className="text-6xl mb-4">⚖️📦🏷️</div>
                <h2 className="text-4xl font-black mb-3 drop-shadow-lg">
                  משקלים ומחירים - כאן! ⬇️
                </h2>
                <p className="text-xl font-bold mb-2">
                  הוסף משקלים שונים למוצר (3.6 ק״ג, 7.3 ק״ג וכו׳)
                </p>
                <p className="text-lg opacity-90">
                  כל משקל עם מחיר משלו!
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 border-4 border-purple-500 shadow-xl">
              <WeightVariantsManager
                variants={newProductWeights}
                onChange={setNewProductWeights}
              />
            </div>
          </div>

          <div className="mt-8 pt-6 border-t-2 border-gray-300 flex items-center gap-3">
            <Button onClick={createProduct} isLoading={saving} size="lg" className="font-bold">
              <Save className="h-4 w-4" />
              {newProductImages.length > 0 
                ? `צור מוצר עם ${newProductImages.length} תמונות`
                : "צור מוצר (ללא תמונות)"
              }
            </Button>
            <Button variant="ghost" onClick={() => {
              setShowNew(false);
              setNewProductImages([]);
            }}><X className="h-4 w-4" />ביטול</Button>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="space-y-3 mb-6">
        <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-4 flex items-start gap-3">
          <ImageIcon className="h-6 w-6 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-blue-900 mb-1">📸 איך להוסיף תמונות למוצרים?</p>
            <p className="text-sm text-blue-800">
              <strong>מוצר חדש:</strong> לחץ &quot;הוסף מוצר&quot; → גלול למטה לסקציה &quot;תמונות מוצר&quot; → לחץ כפתור צבעוני
              <br />
              <strong>מוצר קיים:</strong> לחץ על הכפתור הכחול 🖼️ בעמודת &quot;פעולות&quot;
            </p>
          </div>
        </div>
        
        <div className="bg-accent/5 border border-accent/15 rounded-xl p-4 flex items-start gap-3">
          <Tag className="h-5 w-5 text-accent shrink-0 mt-0.5" />
          <div>
            <p className="text-body-sm font-semibold text-accent">איך לשים הנחה?</p>
            <p className="text-body-sm text-text-secondary mt-0.5">עריכה → הכניסו מחיר מקורי בעמודת ״לפני הנחה״ → ההנחה מופיעה אוטומטית.</p>
          </div>
        </div>
      </div>

      {/* Empty state */}
      {filtered.length === 0 ? (
        <div className="bg-card rounded-2xl border border-card-border p-12 text-center">
          <Package className="h-12 w-12 text-text-muted mx-auto mb-3" />
          <h3 className="text-heading-md text-text-primary mb-1">אין מוצרים בקטגוריה זו</h3>
          <p className="text-body-sm text-text-secondary mb-4">לחצו למטה כדי להוסיף מוצר חדש.</p>
          <Button size="sm" onClick={() => openNewInCategory(activeCategory)}><Plus className="h-4 w-4" />הוסף מוצר ל{catLabel(activeCategory)}</Button>
        </div>
      ) : (
        <div className="bg-card rounded-2xl border border-card-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="text-right text-xs font-medium text-text-muted uppercase px-4 py-3">מוצר</th>
                  <th className="text-right text-xs font-medium text-text-muted uppercase px-4 py-3">קטגוריה</th>
                  <th className="text-right text-xs font-medium text-text-muted uppercase px-4 py-3">מחיר</th>
                  <th className="text-right text-xs font-medium text-text-muted uppercase px-4 py-3">לפני הנחה</th>
                  <th className="text-right text-xs font-medium text-text-muted uppercase px-4 py-3">הנחה</th>
                  <th className="text-right text-xs font-medium text-text-muted uppercase px-4 py-3">מלאי</th>
                  <th className="text-right text-xs font-medium text-text-muted uppercase px-4 py-3">סטטוס</th>
                  <th className="text-left text-xs font-medium text-text-muted uppercase px-4 py-3">פעולות (🖼️ = תמונות)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((product) => {
                  const hasDiscount = product.compareAt && product.compareAt > product.price;
                  const discountPercent = hasDiscount ? Math.round((1 - product.price / product.compareAt!) * 100) : 0;

                  return (
                    <tr key={product.id} className="hover:bg-surface-hover transition-colors">
                      <td className="px-4 py-4">
                        {editing === product.id ? (
                          <Input value={editData.name || ""} onChange={(e) => setEditData({ ...editData, name: e.target.value })} className="text-sm" />
                        ) : (
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-surface-light rounded-lg flex items-center justify-center shrink-0"><span className="text-lg">{product.petType === "DOG" ? "🐕" : "🐈"}</span></div>
                            <div><p className="font-semibold text-text-primary text-body-sm">{product.name}</p><p className="text-xs text-text-muted">{product.slug}</p></div>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-4"><span className="text-body-sm text-text-secondary">{catLabel(product.category)}</span></td>
                      <td className="px-4 py-4">
                        {editing === product.id ? <Input type="number" value={editData.price || 0} onChange={(e) => setEditData({ ...editData, price: parseFloat(e.target.value) })} className="text-sm w-24" />
                          : <span className="text-body-sm font-bold text-text-primary">{formatPrice(product.price)}</span>}
                      </td>
                      <td className="px-4 py-4">
                        {editing === product.id ? <Input type="number" value={editData.compareAt || ""} onChange={(e) => setEditData({ ...editData, compareAt: e.target.value ? parseFloat(e.target.value) : null })} placeholder="—" className="text-sm w-24" />
                          : <span className="text-body-sm text-text-muted">{hasDiscount ? <span className="line-through">{formatPrice(product.compareAt!)}</span> : "—"}</span>}
                      </td>
                      <td className="px-4 py-4">{hasDiscount ? <Badge variant="danger">-{discountPercent}%</Badge> : <span className="text-xs text-text-muted">—</span>}</td>
                      <td className="px-4 py-4">
                        {editing === product.id ? <Input type="number" value={editData.stock || 0} onChange={(e) => setEditData({ ...editData, stock: parseInt(e.target.value) })} className="text-sm w-20" />
                          : <span className={`text-body-sm font-medium ${product.stock < 50 ? "text-red-400" : product.stock < 100 ? "text-amber-400" : "text-text-primary"}`}>{product.stock}</span>}
                      </td>
                      <td className="px-4 py-4"><Badge variant={product.isActive ? "success" : "default"}>{product.isActive ? "פעיל" : "מושבת"}</Badge></td>
                      <td className="px-4 py-4">
                        <div className="flex items-center justify-end gap-1">
                          {editing === product.id ? (
                            <><button onClick={() => saveEdit(product.slug)} className="p-2 text-accent hover:bg-accent/10 rounded-lg transition-all" title="שמור"><Save className="h-4 w-4" /></button>
                              <button onClick={() => setEditing(null)} className="p-2 text-text-muted hover:bg-surface-hover rounded-lg transition-all" title="ביטול"><X className="h-4 w-4" /></button></>
                          ) : (
                            <>
                              <button 
                                onClick={() => startEditImages(product.slug)} 
                                className="p-2.5 text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 hover:border-blue-300 rounded-lg transition-all font-medium" 
                                title="ערוך תמונות - לחץ כאן!"
                              >
                                <ImageIcon className="h-5 w-5" />
                              </button>
                              <button onClick={() => startEdit(product)} className="p-2 text-text-muted hover:text-accent hover:bg-accent/10 rounded-lg transition-all" title="עריכה"><Pencil className="h-4 w-4" /></button>
                              <button onClick={() => deleteProduct(product.slug, product.id)} className="p-2 text-text-muted hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all" title="מחיקה"><Trash2 className="h-4 w-4" /></button>
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
      )}

      {/* Edit Images Modal */}
      {editingImages && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4 overflow-y-auto" onClick={() => setEditingImages(null)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-text-primary flex items-center gap-2">
                  <ImageIcon className="h-6 w-6 text-accent" />
                  ניהול תמונות מוצר
                </h2>
                <p className="text-sm text-text-secondary mt-1">
                  {products.find(p => p.slug === editingImages)?.name}
                </p>
              </div>
              <button
                onClick={() => setEditingImages(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              <ImageUploadManager
                images={editImagesData}
                onChange={setEditImagesData}
                productName={products.find(p => p.slug === editingImages)?.name}
              />
              
              <div className="mt-6 pt-6 border-t border-gray-200 flex items-center gap-3">
                <Button 
                  onClick={() => saveImages(editingImages)} 
                  isLoading={saving}
                  className="bg-accent hover:bg-accent-400"
                >
                  <Save className="h-4 w-4" />
                  שמור {editImagesData.length} תמונות
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={() => setEditingImages(null)}
                >
                  ביטול
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
