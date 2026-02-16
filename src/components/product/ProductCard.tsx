"use client";

import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import { ShoppingBag, Star } from "lucide-react";

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

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block bg-white rounded-2xl overflow-hidden border border-border hover:border-gray-300 hover:shadow-lg transition-all duration-300"
    >
      <div className="relative aspect-square bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center text-gray-300">
          <div className="text-center">
            <ShoppingBag className="h-12 w-12 mx-auto mb-2 opacity-30" />
            <p className="text-xs opacity-50">{product.name}</p>
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
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          {product.isFeatured && <Badge variant="warning">רב מכר</Badge>}
          {hasDiscount && <Badge variant="danger">-{discountPercent}%</Badge>}
          {product.subscriptionDiscount > 0 && (
            <Badge variant="success">חסכו {product.subscriptionDiscount}% במנוי</Badge>
          )}
        </div>
        <div className="absolute top-3 left-3">
          <span className="text-lg">{product.petType === "DOG" ? "🐕" : "🐈"}</span>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-3.5 w-3.5 fill-black text-black" />
          ))}
          <span className="text-xs text-muted mr-1">(4.8)</span>
        </div>
        <h3 className="font-semibold text-black group-hover:text-muted transition-colors line-clamp-1">{product.name}</h3>
        {product.shortDesc && <p className="text-sm text-muted line-clamp-2">{product.shortDesc}</p>}
        <div className="flex items-baseline gap-2 pt-1">
          <span className="text-lg font-bold text-black">{formatPrice(product.price)}</span>
          {hasDiscount && <span className="text-sm text-muted line-through">{formatPrice(product.compareAt!)}</span>}
        </div>
      </div>
    </Link>
  );
}
