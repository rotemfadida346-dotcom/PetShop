"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { Star, ShoppingBag } from "lucide-react";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    slug: string;
    shortDesc?: string | null;
    price: number;
    compareAt?: number | null;
    petType: string;
    category: string;
    subscriptionDiscount: number;
    isFeatured: boolean;
    images: { url: string; alt?: string | null }[];
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.compareAt && product.compareAt > product.price;
  const isDog = product.petType === "DOG";
  const categoryLabel = product.category === "FOOD" ? "מזון" : product.category === "TREATS" ? "חטיפים" : product.category === "LITTER" ? "חול" : product.category;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block bg-card rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-300"
    >
      {/* Image */}
      <div className={`relative aspect-[4/3] overflow-hidden ${isDog ? "bg-gradient-to-br from-dog-50 to-orange-50" : "bg-gradient-to-br from-cat-50 to-violet-50"}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-5xl block mb-2 opacity-30 group-hover:scale-110 transition-transform duration-500">{isDog ? "🐕" : "🐈"}</span>
            <p className={`text-xs font-medium opacity-30 ${isDog ? "text-dog-600" : "text-cat-600"}`}>{categoryLabel}</p>
          </div>
        </div>
        {product.images[0] && (
          <Image src={product.images[0].url} alt={product.images[0].alt || product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" />
        )}

        {/* Badges row */}
        <div className="absolute top-3 right-3 flex gap-1.5">
          {product.subscriptionDiscount > 0 && (
            <span className="bg-accent text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">מנוי</span>
          )}
        </div>

        {/* Pet type pill */}
        <div className="absolute bottom-3 right-3">
          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-sm ${isDog ? "bg-dog-100/90 text-dog-600" : "bg-cat-100/90 text-cat-600"}`}>
            {isDog ? "🐕 כלבים" : "🐈 חתולים"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2.5">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          ))}
          <span className="text-xs text-textMuted mr-1.5">(4.8)</span>
        </div>

        <h3 className="font-bold text-textPrimary group-hover:text-accent transition-colors line-clamp-1 text-[15px]">{product.name}</h3>

        {product.shortDesc && (
          <p className="text-sm text-textSecondary line-clamp-2 leading-relaxed">{product.shortDesc}</p>
        )}

        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-textPrimary">{formatPrice(product.price)}</span>
            {hasDiscount && (
              <span className="text-sm text-textMuted line-through">{formatPrice(product.compareAt!)}</span>
            )}
          </div>
          <div className="p-2 rounded-xl bg-accent-50 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
            <ShoppingBag className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
