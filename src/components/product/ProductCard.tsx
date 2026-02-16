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
  const discountPercent = hasDiscount ? Math.round((1 - product.price / product.compareAt!) * 100) : 0;
  const isDog = product.petType === "DOG";

  const categoryLabel = product.category === "FOOD" ? "מזון" : product.category === "TREATS" ? "חטיפים" : product.category === "LITTER" ? "חול" : product.category;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block rounded-2xl overflow-hidden border border-gray-100 bg-white hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image area with warm colored background */}
      <div className={`relative aspect-[4/3] overflow-hidden ${isDog ? "bg-gradient-to-br from-dog-50 to-orange-50" : "bg-gradient-to-br from-cat-50 to-violet-50"}`}>
        {/* Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <span className="text-5xl block mb-2 opacity-40 group-hover:scale-110 transition-transform duration-500">
              {isDog ? "🐕" : "🐈"}
            </span>
            <p className={`text-xs font-medium opacity-40 ${isDog ? "text-dog-600" : "text-cat-600"}`}>{categoryLabel}</p>
          </div>
        </div>

        {product.images[0] && (
          <Image
            src={product.images[0].url}
            alt={product.images[0].alt || product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        )}

        {/* Top badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          {product.isFeatured && (
            <span className="bg-brand-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
              רב מכר 🔥
            </span>
          )}
          {hasDiscount && (
            <span className="bg-red-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-sm">
              -{discountPercent}%
            </span>
          )}
        </div>

        {/* Pet type pill */}
        <div className="absolute bottom-3 right-3">
          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${isDog ? "bg-dog-100 text-dog-600" : "bg-cat-100 text-cat-600"}`}>
            {isDog ? "🐕 כלבים" : "🐈 חתולים"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2.5">
        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          ))}
          <span className="text-xs text-muted mr-1.5">(4.8)</span>
        </div>

        {/* Name */}
        <h3 className="font-bold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-1 text-[15px]">
          {product.name}
        </h3>

        {/* Description */}
        {product.shortDesc && (
          <p className="text-sm text-muted line-clamp-2 leading-relaxed">{product.shortDesc}</p>
        )}

        {/* Price */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-gray-900">{formatPrice(product.price)}</span>
            {hasDiscount && (
              <span className="text-sm text-muted line-through">{formatPrice(product.compareAt!)}</span>
            )}
          </div>
          <div className={`p-2 rounded-xl transition-colors ${isDog ? "bg-dog-50 text-dog-500 group-hover:bg-dog-100" : "bg-cat-50 text-cat-500 group-hover:bg-cat-100"}`}>
            <ShoppingBag className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
