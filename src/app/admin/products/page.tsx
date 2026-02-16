import { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { Plus, Pencil, Eye, Package } from "lucide-react";

export const metadata: Metadata = { title: "ניהול מוצרים" };

export default function AdminProductsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-black">מוצרים</h1>
        <Button size="sm"><Plus className="h-4 w-4" />הוסף מוצר</Button>
      </div>
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="border-b border-border bg-gray-50">
              <th className="text-right text-xs font-medium text-muted uppercase tracking-wider px-5 py-3">מוצר</th>
              <th className="text-right text-xs font-medium text-muted uppercase tracking-wider px-5 py-3">קטגוריה</th>
              <th className="text-right text-xs font-medium text-muted uppercase tracking-wider px-5 py-3">חיה</th>
              <th className="text-right text-xs font-medium text-muted uppercase tracking-wider px-5 py-3">מחיר</th>
              <th className="text-right text-xs font-medium text-muted uppercase tracking-wider px-5 py-3">מלאי</th>
              <th className="text-right text-xs font-medium text-muted uppercase tracking-wider px-5 py-3">סטטוס</th>
              <th className="text-left text-xs font-medium text-muted uppercase tracking-wider px-5 py-3">פעולות</th>
            </tr></thead>
            <tbody className="divide-y divide-border">
              {(MOCK_PRODUCTS as readonly { id: string; name: string; slug: string; price: number; petType: string; category: string; stock: number; isActive: boolean }[]).map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-5 py-4"><div className="flex items-center gap-3"><div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center shrink-0"><Package className="h-4 w-4 text-muted" /></div><div><p className="font-medium text-black text-sm line-clamp-1">{product.name}</p><p className="text-xs text-muted">{product.slug}</p></div></div></td>
                  <td className="px-5 py-4"><span className="text-sm text-muted">{product.category === "FOOD" ? "מזון" : product.category === "TREATS" ? "חטיפים" : product.category === "LITTER" ? "חול" : product.category}</span></td>
                  <td className="px-5 py-4"><span className="text-sm">{product.petType === "DOG" ? "🐕" : "🐈"}</span></td>
                  <td className="px-5 py-4"><span className="text-sm font-medium text-black">{formatPrice(product.price)}</span></td>
                  <td className="px-5 py-4"><span className={`text-sm font-medium ${product.stock < 50 ? "text-red-600" : product.stock < 100 ? "text-amber-600" : "text-black"}`}>{product.stock}</span></td>
                  <td className="px-5 py-4"><Badge variant={product.isActive ? "success" : "default"}>{product.isActive ? "פעיל" : "טיוטה"}</Badge></td>
                  <td className="px-5 py-4"><div className="flex items-center justify-end gap-1"><Link href={`/product/${product.slug}`} className="p-2 text-gray-400 hover:text-black transition-colors"><Eye className="h-4 w-4" /></Link><button className="p-2 text-gray-400 hover:text-black transition-colors"><Pencil className="h-4 w-4" /></button></div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
