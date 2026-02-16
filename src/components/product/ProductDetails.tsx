"use client";

import { useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { formatPrice, calculateSubscriptionPrice, cn } from "@/lib/utils";
import { SUBSCRIPTION_INTERVALS } from "@/lib/constants";
import Toast from "@/components/ui/Toast";
import {
  ShoppingBag,
  Star,
  Check,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Minus,
  Plus,
  CircleAlert,
} from "lucide-react";

interface ProductDetailsProps {
  product: {
    id: string;
    name: string;
    slug: string;
    description: string;
    benefits?: string | null;
    ingredients?: string | null;
    whoIsFor?: string | null;
    shortDesc?: string | null;
    price: number;
    compareAt?: number | null;
    petType: string;
    category: string;
    subscriptionDiscount: number;
    isFeatured: boolean;
    stock: number;
    images: { url: string; alt?: string | null }[];
    faqs: { id: string; question: string; answer: string }[];
  };
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [purchaseType, setPurchaseType] = useState<"onetime" | "subscription">(
    "onetime"
  );
  const [intervalWeeks, setIntervalWeeks] = useState(4);
  const [quantity, setQuantity] = useState(1);
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);

  const addItem = useCartStore((s) => s.addItem);

  const inStock = product.stock > 0;
  const lowStock = product.stock > 0 && product.stock <= 10;

  const subscriptionPrice = calculateSubscriptionPrice(
    product.price,
    product.subscriptionDiscount
  );
  const currentPrice =
    purchaseType === "subscription" ? subscriptionPrice : product.price;
  const hasDiscount =
    product.compareAt && product.compareAt > product.price;

  function handleAddToCart() {
    if (!inStock) return;
    addItem({
      id: `${product.id}-${purchaseType}-${intervalWeeks}`,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0]?.url || "",
      quantity,
      isSubscription: purchaseType === "subscription",
      intervalWeeks: purchaseType === "subscription" ? intervalWeeks : undefined,
      subscriptionDiscount: product.subscriptionDiscount,
    });
    setShowToast(true);
  }

  const benefitsList = product.benefits?.split("\n").filter(Boolean) || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Left: Image */}
      <div className="space-y-4">
        <div className="relative aspect-square bg-stone-50 rounded-2xl overflow-hidden border border-stone-100">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-stone-300">
              <ShoppingBag className="h-20 w-20 mx-auto mb-3 opacity-30" />
              <p className="text-sm opacity-50">{product.name}</p>
            </div>
          </div>
          {product.images[0] && (
            <Image
              src={product.images[0].url}
              alt={product.images[0].alt || product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          )}

          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isFeatured && (
              <Badge variant="warning">Bestseller</Badge>
            )}
            {hasDiscount && (
              <Badge variant="danger">
                Save {Math.round((1 - product.price / product.compareAt!) * 100)}%
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Right: Product Info */}
      <div className="space-y-6">
        {/* Title & Rating */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge>
              {product.petType === "DOG" ? "🐕 Dog" : "🐈 Cat"} /{" "}
              {product.category.charAt(0) + product.category.slice(1).toLowerCase()}
            </Badge>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-stone-900 tracking-tight">
            {product.name}
          </h1>
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-amber-400 text-amber-400"
                />
              ))}
            </div>
            <span className="text-sm text-stone-500">
              4.8 out of 5 (127 reviews)
            </span>
          </div>
        </div>

        {/* Stock indicator */}
        {lowStock && (
          <div className="flex items-center gap-2 text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-sm">
            <CircleAlert className="h-4 w-4 shrink-0" />
            <span>Only {product.stock} left in stock — order soon!</span>
          </div>
        )}
        {!inStock && (
          <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-sm">
            <CircleAlert className="h-4 w-4 shrink-0" />
            <span>Currently out of stock</span>
          </div>
        )}

        {/* Description */}
        <p className="text-stone-600 leading-relaxed">{product.description}</p>

        {/* Purchase Type Selector */}
        <div className="space-y-3">
          {/* One-time */}
          <button
            onClick={() => setPurchaseType("onetime")}
            className={cn(
              "w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all text-left",
              purchaseType === "onetime"
                ? "border-amber-500 bg-amber-50"
                : "border-stone-200 hover:border-stone-300"
            )}
          >
            <div className="flex items-center gap-3">
              <div
                className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                  purchaseType === "onetime"
                    ? "border-amber-500"
                    : "border-stone-300"
                )}
              >
                {purchaseType === "onetime" && (
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                )}
              </div>
              <div>
                <p className="font-medium text-stone-900">One-time purchase</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-lg text-stone-900">
                {formatPrice(product.price)}
              </p>
              {hasDiscount && (
                <p className="text-sm text-stone-400 line-through">
                  {formatPrice(product.compareAt!)}
                </p>
              )}
            </div>
          </button>

          {/* Subscription */}
          <button
            onClick={() => setPurchaseType("subscription")}
            className={cn(
              "w-full p-4 rounded-xl border-2 transition-all text-left",
              purchaseType === "subscription"
                ? "border-amber-500 bg-amber-50"
                : "border-stone-200 hover:border-stone-300"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                    purchaseType === "subscription"
                      ? "border-amber-500"
                      : "border-stone-300"
                  )}
                >
                  {purchaseType === "subscription" && (
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-stone-900">
                      Subscribe & Save
                    </p>
                    <Badge variant="success">
                      -{product.subscriptionDiscount}%
                    </Badge>
                  </div>
                  <p className="text-sm text-stone-500 mt-0.5">
                    Free shipping. Pause or cancel anytime.
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-lg text-emerald-700">
                  {formatPrice(subscriptionPrice)}
                </p>
                <p className="text-sm text-stone-400 line-through">
                  {formatPrice(product.price)}
                </p>
              </div>
            </div>

            {/* Interval selector */}
            {purchaseType === "subscription" && (
              <div className="mt-4 ml-8 flex flex-wrap gap-2">
                {SUBSCRIPTION_INTERVALS.map((interval) => (
                  <button
                    key={interval.weeks}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setIntervalWeeks(interval.weeks);
                    }}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                      intervalWeeks === interval.weeks
                        ? "bg-amber-600 text-white"
                        : "bg-white border border-stone-200 text-stone-600 hover:border-amber-300"
                    )}
                  >
                    {interval.label}
                  </button>
                ))}
              </div>
            )}
          </button>
        </div>

        {/* Quantity & Add to Cart */}
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-stone-200 rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-3 text-stone-500 hover:text-stone-900 transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-4 py-2 font-medium text-stone-900 min-w-[3rem] text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-3 text-stone-500 hover:text-stone-900 transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <Button
            onClick={handleAddToCart}
            size="lg"
            className="flex-1"
            disabled={!inStock}
          >
            <ShoppingBag className="h-5 w-5" />
            {inStock
              ? `Add to Cart — ${formatPrice(currentPrice * quantity)}`
              : "Out of Stock"}
          </Button>
        </div>

        {/* Trust signals */}
        <div className="grid grid-cols-3 gap-4 py-4 border-t border-stone-100">
          <div className="text-center">
            <Truck className="h-5 w-5 text-amber-600 mx-auto mb-1" />
            <p className="text-xs text-stone-500">Free Shipping $49+</p>
          </div>
          <div className="text-center">
            <RotateCcw className="h-5 w-5 text-amber-600 mx-auto mb-1" />
            <p className="text-xs text-stone-500">30-Day Returns</p>
          </div>
          <div className="text-center">
            <ShieldCheck className="h-5 w-5 text-amber-600 mx-auto mb-1" />
            <p className="text-xs text-stone-500">Vet Approved</p>
          </div>
        </div>

        {/* Benefits */}
        {benefitsList.length > 0 && (
          <div className="pt-4 border-t border-stone-100">
            <h3 className="text-lg font-semibold text-stone-900 mb-3">
              Benefits
            </h3>
            <ul className="space-y-2">
              {benefitsList.map((benefit, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-stone-600">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Ingredients */}
        {product.ingredients && (
          <div className="pt-4 border-t border-stone-100">
            <h3 className="text-lg font-semibold text-stone-900 mb-3">
              Ingredients
            </h3>
            <p className="text-sm text-stone-600 leading-relaxed">
              {product.ingredients}
            </p>
          </div>
        )}

        {/* Who Is This For */}
        {product.whoIsFor && (
          <div className="pt-4 border-t border-stone-100">
            <h3 className="text-lg font-semibold text-stone-900 mb-3">
              Who Is This For?
            </h3>
            <p className="text-stone-600 leading-relaxed">{product.whoIsFor}</p>
          </div>
        )}

        {/* FAQ */}
        {product.faqs.length > 0 && (
          <div className="pt-4 border-t border-stone-100">
            <h3 className="text-lg font-semibold text-stone-900 mb-3">
              Frequently Asked Questions
            </h3>
            <div className="space-y-2">
              {product.faqs.map((faq) => (
                <div
                  key={faq.id}
                  className="border border-stone-200 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() =>
                      setOpenFaq(openFaq === faq.id ? null : faq.id)
                    }
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-stone-50 transition-colors"
                  >
                    <span className="font-medium text-stone-900 pr-4">
                      {faq.question}
                    </span>
                    {openFaq === faq.id ? (
                      <ChevronUp className="h-5 w-5 text-stone-400 shrink-0" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-stone-400 shrink-0" />
                    )}
                  </button>
                  {openFaq === faq.id && (
                    <div className="px-4 pb-4">
                      <p className="text-stone-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Toast notification */}
      <Toast
        message={`${product.name} added to cart!`}
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
}
