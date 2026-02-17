"use client";

import { memo } from "react";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import { Star, ShoppingBag } from "lucide-react";

interface ProductCardProps {
  product: {
    id: string; name: string; slug: string; shortDesc?: string | null;
    price: number; compareAt?: number | null; petType: string; category: string;
    subscriptionDiscount: number; isFeatured: boolean;
    images: { url: string; alt?: string | null }[];
  };
}

function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.compareAt && product.compareAt > product.price;
  const isDog = product.petType === "DOG";
  const cat = product.category === "FOOD" ? "מזון" : product.category === "TREATS" ? "חטיפים" : product.category === "LITTER" ? "חול" : product.category === "TOYS" ? "צעצועים" : "אביזרים";

  return (
    <Link href={`/product/${product.slug}`} className="group block bg-card rounded-2xl overflow-hidden border border-card-border hover:border-accent/30 hover:shadow-2xl hover:shadow-accent/5 hover:-translate-y-1 transition-all duration-300">
      <div className={`relative aspect-[4/3] overflow-hidden ${isDog ? "bg-dog-bg" : "bg-cat-bg"}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl opacity-30 group-hover:scale-110 group-hover:opacity-40 transition-all duration-500">{isDog ? "🐕" : "🐈"}</span>
        </div>
        {product.images[0] && <Image src={product.images[0].url} alt={product.images[0].alt || product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw" />}
        <div className="absolute bottom-3 right-3">
          <span className={`text-[11px] font-semibold px-2.5 py-1 rounded-full ${isDog ? "bg-dog-bg text-dog-text" : "bg-cat-bg text-cat-text"}`}>
            {isDog ? "🐕 כלבים" : "🐈 חתולים"} · {cat}
          </span>
        </div>
      </div>
      <div className="p-4 space-y-2">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => <Star key={i} className="h-3 w-3 fill-amber-400 text-amber-400" />)}
          <span className="text-[11px] text-text-muted mr-1.5">(4.8)</span>
        </div>
        <h3 className="font-bold text-text-primary group-hover:text-accent transition-colors line-clamp-1">{product.name}</h3>
        {product.shortDesc && <p className="text-body-sm text-text-secondary line-clamp-2">{product.shortDesc}</p>}
        <div className="flex items-center justify-between pt-2 border-t border-card-border">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-extrabold text-text-primary">{formatPrice(product.price)}</span>
            {hasDiscount && <span className="text-body-sm text-text-muted line-through">{formatPrice(product.compareAt!)}</span>}
          </div>
          <div className="p-2 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-text-inverse transition-colors"><ShoppingBag className="h-4 w-4" /></div>
        </div>
      </div>
    </Link>
  );
}

export default memo(ProductCard);
