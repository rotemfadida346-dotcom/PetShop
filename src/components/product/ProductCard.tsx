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
    brand?: string | null;
    rating?: number | null;
    reviewCount?: number | null;
    badges?: string[];
    stockQuantity?: number | null;
    stock?: number;
    images: { url: string; alt?: string | null }[];
  };
}

function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.compareAt && product.compareAt > product.price;
  const discountPercent = hasDiscount ? Math.round((1 - product.price / product.compareAt!) * 100) : 0;
  const isDog = product.petType === "DOG";
  const inStock = (product.stock || 0) > 0;
  const lowStock = inStock && (product.stockQuantity || product.stock || 0) < 10;

  return (
    <Link href={`/product/${product.slug}`} className="group block bg-white rounded-2xl overflow-hidden border border-gray-200 hover:border-accent/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-5xl opacity-20 group-hover:scale-110 group-hover:opacity-30 transition-all duration-500">{isDog ? "🐕" : "🐈"}</span>
        </div>
        {product.images[0] && <Image src={product.images[0].url} alt={product.images[0].alt || product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw" />}
        
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
            -{discountPercent}%
          </div>
        )}
        
        {/* Product Badges */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          {product.badges && product.badges.map((badge, idx) => (
            <span key={idx} className="text-[10px] font-bold px-2 py-1 rounded-full bg-accent text-white shadow-lg whitespace-nowrap">
              {badge}
            </span>
          ))}
        </div>
        
        {/* Quick View Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white font-bold text-sm bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
            צפייה מהירה
          </span>
        </div>
      </div>
      
      <div className="p-4 space-y-2.5">
        {/* Brand */}
        {product.brand && (
          <div className="text-xs font-semibold text-accent uppercase tracking-wide">
            {product.brand}
          </div>
        )}
        
        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1.5">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`h-3.5 w-3.5 ${i < Math.floor(product.rating!) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`} 
                />
              ))}
            </div>
            <span className="text-xs font-medium text-text-primary">{product.rating}</span>
            {product.reviewCount && (
              <span className="text-[11px] text-text-muted">({product.reviewCount})</span>
            )}
          </div>
        )}
        
        {/* Product Name */}
        <h3 className="font-bold text-text-primary group-hover:text-accent transition-colors line-clamp-2 leading-snug min-h-[2.5rem]">
          {product.name}
        </h3>
        
        {/* Short Description */}
        {product.shortDesc && (
          <p className="text-xs text-text-secondary line-clamp-2 leading-relaxed">
            {product.shortDesc}
          </p>
        )}
        
        {/* Stock Info */}
        {lowStock && inStock && (
          <div className="flex items-center gap-1.5 text-xs">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
            <span className="text-amber-600 font-medium">
              נותרו רק {product.stockQuantity || product.stock} במלאי
            </span>
          </div>
        )}
        
        {!inStock && (
          <div className="flex items-center gap-1.5 text-xs">
            <span className="w-2 h-2 rounded-full bg-red-400"></span>
            <span className="text-red-600 font-medium">אזל מהמלאי</span>
          </div>
        )}
        
        {/* Pricing */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-extrabold text-text-primary">{formatPrice(product.price)}</span>
              {hasDiscount && (
                <span className="text-sm text-text-muted line-through">{formatPrice(product.compareAt!)}</span>
              )}
            </div>
            {product.subscriptionDiscount > 0 && (
              <span className="text-[10px] text-emerald-600 font-medium">
                מנוי: {formatPrice(product.price * (1 - product.subscriptionDiscount / 100))}
              </span>
            )}
          </div>
          <div className="p-2.5 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-colors">
            <ShoppingBag className="h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default memo(ProductCard);
