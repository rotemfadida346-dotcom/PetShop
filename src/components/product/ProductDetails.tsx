"use client";

import { useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Toast from "@/components/ui/Toast";
import { formatPrice, calculateSubscriptionPrice, cn } from "@/lib/utils";
import { SUBSCRIPTION_INTERVALS } from "@/lib/constants";
import {
  ShoppingBag, Star, Check, Truck, RotateCcw, ShieldCheck,
  ChevronDown, ChevronUp, Minus, Plus, CircleAlert,
} from "lucide-react";

interface ProductDetailsProps {
  product: {
    id: string; name: string; slug: string; description: string;
    benefits?: string | null; ingredients?: string | null; whoIsFor?: string | null;
    shortDesc?: string | null; price: number; compareAt?: number | null;
    petType: string; category: string; subscriptionDiscount: number;
    isFeatured: boolean; stock: number;
    images: { url: string; alt?: string | null }[];
    faqs: { id: string; question: string; answer: string }[];
  };
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [purchaseType, setPurchaseType] = useState<"onetime" | "subscription">("onetime");
  const [intervalWeeks, setIntervalWeeks] = useState(4);
  const [quantity, setQuantity] = useState(1);
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const inStock = product.stock > 0;
  const lowStock = product.stock > 0 && product.stock <= 10;
  const subscriptionPrice = calculateSubscriptionPrice(product.price, product.subscriptionDiscount);
  const currentPrice = purchaseType === "subscription" ? subscriptionPrice : product.price;
  const hasDiscount = product.compareAt && product.compareAt > product.price;
  const benefitsList = product.benefits?.split("\n").filter(Boolean) || [];

  function handleAddToCart() {
    if (!inStock) return;
    addItem({
      id: `${product.id}-${purchaseType}-${intervalWeeks}`,
      productId: product.id, name: product.name, price: product.price,
      image: product.images[0]?.url || "", quantity,
      isSubscription: purchaseType === "subscription",
      intervalWeeks: purchaseType === "subscription" ? intervalWeeks : undefined,
      subscriptionDiscount: product.subscriptionDiscount,
    });
    setShowToast(true);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Image */}
      <div>
        <div className="relative aspect-square bg-gray-50 rounded-2xl overflow-hidden border border-border">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-300">
              <ShoppingBag className="h-20 w-20 mx-auto mb-3 opacity-30" />
              <p className="text-sm opacity-50">{product.name}</p>
            </div>
          </div>
          {product.images[0] && (
            <Image src={product.images[0].url} alt={product.images[0].alt || product.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
          )}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            {product.isFeatured && <Badge variant="warning">רב מכר</Badge>}
            {hasDiscount && <Badge variant="danger">חסכו {Math.round((1 - product.price / product.compareAt!) * 100)}%</Badge>}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-6">
        <div>
          <Badge>{product.petType === "DOG" ? "🐕 כלב" : "🐈 חתול"} / {product.category === "FOOD" ? "מזון" : product.category === "TREATS" ? "חטיפים" : product.category === "LITTER" ? "חול" : product.category.toLowerCase()}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-black tracking-tight mt-2">{product.name}</h1>
          <div className="flex items-center gap-2 mt-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-black text-black" />)}
            </div>
            <span className="text-sm text-muted">4.8 מתוך 5 (127 ביקורות)</span>
          </div>
        </div>

        {lowStock && (
          <div className="flex items-center gap-2 text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 text-sm">
            <CircleAlert className="h-4 w-4 shrink-0" />
            <span>נשארו רק {product.stock} במלאי — הזמינו בהקדם!</span>
          </div>
        )}
        {!inStock && (
          <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 rounded-lg px-3 py-2 text-sm">
            <CircleAlert className="h-4 w-4 shrink-0" />
            <span>אזל מהמלאי</span>
          </div>
        )}

        <p className="text-muted leading-relaxed">{product.description}</p>

        {/* Purchase Type */}
        <div className="space-y-3">
          <button onClick={() => setPurchaseType("onetime")} className={cn("w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all text-right", purchaseType === "onetime" ? "border-black bg-gray-50" : "border-border hover:border-gray-300")}>
            <div className="flex items-center gap-3">
              <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", purchaseType === "onetime" ? "border-black" : "border-gray-300")}>
                {purchaseType === "onetime" && <div className="w-2.5 h-2.5 rounded-full bg-black" />}
              </div>
              <p className="font-medium text-black">רכישה חד פעמית</p>
            </div>
            <div className="text-left">
              <p className="font-bold text-lg text-black">{formatPrice(product.price)}</p>
              {hasDiscount && <p className="text-sm text-muted line-through">{formatPrice(product.compareAt!)}</p>}
            </div>
          </button>

          <button onClick={() => setPurchaseType("subscription")} className={cn("w-full p-4 rounded-xl border-2 transition-all text-right", purchaseType === "subscription" ? "border-black bg-gray-50" : "border-border hover:border-gray-300")}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center", purchaseType === "subscription" ? "border-black" : "border-gray-300")}>
                  {purchaseType === "subscription" && <div className="w-2.5 h-2.5 rounded-full bg-black" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-black">מנוי וחיסכון</p>
                    <Badge variant="success">-{product.subscriptionDiscount}%</Badge>
                  </div>
                  <p className="text-sm text-muted mt-0.5">משלוח חינם. עצרו או בטלו בכל עת.</p>
                </div>
              </div>
              <div className="text-left">
                <p className="font-bold text-lg text-emerald-700">{formatPrice(subscriptionPrice)}</p>
                <p className="text-sm text-muted line-through">{formatPrice(product.price)}</p>
              </div>
            </div>
            {purchaseType === "subscription" && (
              <div className="mt-4 mr-8 flex flex-wrap gap-2">
                {SUBSCRIPTION_INTERVALS.map((interval) => (
                  <button key={interval.weeks} type="button" onClick={(e) => { e.stopPropagation(); setIntervalWeeks(interval.weeks); }}
                    className={cn("px-3 py-1.5 rounded-lg text-sm font-medium transition-colors", intervalWeeks === interval.weeks ? "bg-black text-white" : "bg-white border border-border text-muted hover:border-gray-400")}>
                    {interval.label}
                  </button>
                ))}
              </div>
            )}
          </button>
        </div>

        {/* Quantity & Add to Cart */}
        <div className="flex items-center gap-4">
          <div className="flex items-center border border-border rounded-lg">
            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 text-muted hover:text-black transition-colors" aria-label="הפחת כמות"><Minus className="h-4 w-4" /></button>
            <span className="px-4 py-2 font-medium text-black min-w-[3rem] text-center">{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)} className="p-3 text-muted hover:text-black transition-colors" aria-label="הגדל כמות"><Plus className="h-4 w-4" /></button>
          </div>
          <Button onClick={handleAddToCart} size="lg" className="flex-1" disabled={!inStock}>
            <ShoppingBag className="h-5 w-5" />
            {inStock ? `הוסף לעגלה — ${formatPrice(currentPrice * quantity)}` : "אזל מהמלאי"}
          </Button>
        </div>

        {/* Trust */}
        <div className="grid grid-cols-3 gap-4 py-4 border-t border-border">
          <div className="text-center"><Truck className="h-5 w-5 text-black mx-auto mb-1" /><p className="text-xs text-muted">משלוח חינם מעל ₪200</p></div>
          <div className="text-center"><RotateCcw className="h-5 w-5 text-black mx-auto mb-1" /><p className="text-xs text-muted">החזרה תוך 30 יום</p></div>
          <div className="text-center"><ShieldCheck className="h-5 w-5 text-black mx-auto mb-1" /><p className="text-xs text-muted">מאושר ע״י וטרינרים</p></div>
        </div>

        {/* Benefits */}
        {benefitsList.length > 0 && (
          <div className="pt-4 border-t border-border">
            <h3 className="text-lg font-semibold text-black mb-3">יתרונות</h3>
            <ul className="space-y-2">
              {benefitsList.map((b, i) => (
                <li key={i} className="flex items-start gap-2"><Check className="h-5 w-5 text-emerald-500 shrink-0 mt-0.5" /><span className="text-muted">{b}</span></li>
              ))}
            </ul>
          </div>
        )}

        {/* Ingredients */}
        {product.ingredients && (
          <div className="pt-4 border-t border-border">
            <h3 className="text-lg font-semibold text-black mb-3">רכיבים</h3>
            <p className="text-sm text-muted leading-relaxed">{product.ingredients}</p>
          </div>
        )}

        {/* Who Is This For */}
        {product.whoIsFor && (
          <div className="pt-4 border-t border-border">
            <h3 className="text-lg font-semibold text-black mb-3">למי זה מתאים?</h3>
            <p className="text-muted leading-relaxed">{product.whoIsFor}</p>
          </div>
        )}

        {/* FAQ */}
        {product.faqs.length > 0 && (
          <div className="pt-4 border-t border-border">
            <h3 className="text-lg font-semibold text-black mb-3">שאלות נפוצות</h3>
            <div className="space-y-2">
              {product.faqs.map((faq) => (
                <div key={faq.id} className="border border-border rounded-xl overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)} className="w-full flex items-center justify-between p-4 text-right hover:bg-gray-50 transition-colors">
                    <span className="font-medium text-black pl-4">{faq.question}</span>
                    {openFaq === faq.id ? <ChevronUp className="h-5 w-5 text-muted shrink-0" /> : <ChevronDown className="h-5 w-5 text-muted shrink-0" />}
                  </button>
                  {openFaq === faq.id && <div className="px-4 pb-4"><p className="text-muted leading-relaxed">{faq.answer}</p></div>}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Toast message={`${product.name} נוסף לעגלה!`} isVisible={showToast} onClose={() => setShowToast(false)} />
    </div>
  );
}
