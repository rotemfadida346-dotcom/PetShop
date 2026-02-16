import { Metadata } from "next";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { formatPrice } from "@/lib/utils";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { Plus, Pencil, Eye, Package } from "lucide-react";

export const metadata: Metadata = {
  title: "Manage Products - Admin",
  description: "View and manage your product catalog.",
};

export default function AdminProductsPage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-stone-900">Products</h1>
        <Button size="sm">
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stone-100 bg-stone-50">
                <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-5 py-3">
                  Product
                </th>
                <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-5 py-3">
                  Category
                </th>
                <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-5 py-3">
                  Pet
                </th>
                <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-5 py-3">
                  Price
                </th>
                <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-5 py-3">
                  Stock
                </th>
                <th className="text-left text-xs font-medium text-stone-500 uppercase tracking-wider px-5 py-3">
                  Status
                </th>
                <th className="text-right text-xs font-medium text-stone-500 uppercase tracking-wider px-5 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {MOCK_PRODUCTS.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-stone-50 transition-colors"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center shrink-0">
                        <Package className="h-4 w-4 text-stone-400" />
                      </div>
                      <div>
                        <p className="font-medium text-stone-900 text-sm line-clamp-1">
                          {product.name}
                        </p>
                        <p className="text-xs text-stone-500">
                          SKU: {product.slug}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm text-stone-600">
                      {product.category.charAt(0) +
                        product.category.slice(1).toLowerCase()}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm">
                      {product.petType === "DOG" ? "🐕" : "🐈"}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-medium text-stone-900">
                      {formatPrice(product.price)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`text-sm font-medium ${
                        product.stock < 50
                          ? "text-red-600"
                          : product.stock < 100
                          ? "text-amber-600"
                          : "text-stone-900"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <Badge
                      variant={product.isActive ? "success" : "default"}
                    >
                      {product.isActive ? "Active" : "Draft"}
                    </Badge>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/product/${product.slug}`}
                        className="p-2 text-stone-400 hover:text-stone-700 transition-colors"
                        title="View"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <button
                        className="p-2 text-stone-400 hover:text-stone-700 transition-colors"
                        title="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
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
