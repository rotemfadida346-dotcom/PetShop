"use client";

import { useState } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Toast from "@/components/ui/Toast";
import { formatPrice, cn } from "@/lib/utils";
import {
  ShoppingBag, Star, Check, RotateCcw, ShieldCheck,
  ChevronDown, ChevronUp, CircleAlert, Phone,
  Heart, Zap, Play
} from "lucide-react";

interface ProductDetailsProps {
  product: {
    id: string; name: string; slug: string; description: string;
    benefits?: string | null; ingredients?: string | null; whoIsFor?: string | null;
    shortDesc?: string | null; price: number; compareAt?: number | null;
    petType: string; category: string; subscriptionDiscount: number;
    isFeatured: boolean; stock: number;
    brand?: string | null;
    rating?: number | null;
    reviewCount?: number | null;
    badges?: string[];
    stockQuantity?: number | null;
    weight?: number | null;
    weightUnit?: string | null;
    ageRange?: string | null;
    petSize?: string | null;
    nutritionalProtein?: string | null;
    nutritionalFat?: string | null;
    nutritionalFiber?: string | null;
    images: { url: string; alt?: string | null }[];
    faqs: { id: string; question: string; answer: string }[];
  };
}

const FEEDING_GUIDE: Record<number, string> = {
  2: "50 גרם",
  4: "85 גרם",
  6: "115 גרם",
  8: "140 גרם",
  10: "165 גרם",
};

const BULK_PRICING = [
  { qty: 1, label: "אריזה אחת", discount: 0, badge: null },
  { qty: 2, label: "2 אריזות", discount: 10, badge: "חסכו ₪10" },
  { qty: 3, label: "3 אריזות", discount: 30, badge: "חסכו ₪30!" },
];

export default function PremiumProductDetails({ product }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [bulkQty, setBulkQty] = useState(1);
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const addItem = useCartStore((s) => s.addItem);

  const stockQty = product.stockQuantity || product.stock;
  const inStock = stockQty > 0;
  const lowStock = inStock && stockQty <= 10;
  const hasDiscount = product.compareAt && product.compareAt > product.price;
  const discountPercent = hasDiscount ? Math.round((1 - product.price / product.compareAt!) * 100) : 0;
  const benefitsList = product.benefits?.split("\n").filter(Boolean) || [];
  const hasNutritionalInfo = product.nutritionalProtein || product.nutritionalFat || product.nutritionalFiber;

  // Bulk pricing calculation
  const bulkOption = BULK_PRICING.find(b => b.qty === bulkQty) || BULK_PRICING[0];
  const bulkTotal = (product.price * bulkQty) - bulkOption.discount;

  // Perfect for tags
  const perfectForTags = [];
  if (product.ageRange) perfectForTags.push(product.ageRange);
  if (product.petSize) perfectForTags.push(product.petSize);
  if (product.petType === "DOG") perfectForTags.push("פומרניאן, יורקשייר, צ'יוואווה");
  
  function handleAddToCart() {
    if (!inStock) return;
    addItem({
      id: `${product.id}-onetime-${Date.now()}`,
      productId: product.id, name: product.name, price: product.price,
      image: product.images[0]?.url || "", quantity: bulkQty,
      isSubscription: false,
      subscriptionDiscount: product.subscriptionDiscount,
    });
    setShowToast(true);
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Image Gallery */}
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl overflow-hidden border-2 border-gray-200 group">
          <div className="absolute inset-0 flex items-center justify-center">
            <ShoppingBag className="h-24 w-24 text-gray-300" />
          </div>
          {product.images[selectedImage] && (
            <Image 
              src={product.images[selectedImage].url} 
              alt={product.images[selectedImage].alt || product.name} 
              fill 
              className="object-cover group-hover:scale-105 transition-transform duration-500" 
              sizes="(max-width: 1024px) 100vw, 50vw" 
              priority 
            />
          )}
          {/* Badges on Image */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            {product.badges && product.badges.map((badge, idx) => (
              <span key={idx} className="text-xs font-bold px-3 py-1.5 rounded-full bg-gradient-to-r from-accent to-accent-400 text-white shadow-lg">
                {badge}
              </span>
            ))}
            {hasDiscount && (
              <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-red-500 text-white shadow-lg">
                -{discountPercent}%
              </span>
            )}
          </div>
        </div>

        {/* Thumbnails */}
        <div className="grid grid-cols-4 gap-3">
          {product.images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={cn(
                "relative aspect-square rounded-lg overflow-hidden border-2 transition-all",
                selectedImage === idx 
                  ? "border-accent shadow-md" 
                  : "border-gray-200 hover:border-gray-300 opacity-70 hover:opacity-100"
              )}
            >
              <Image src={img.url} alt={img.alt || `${product.name} ${idx + 1}`} fill className="object-cover" sizes="150px" />
            </button>
          ))}
          {/* Video Thumbnail */}
          {product.images.length < 4 && (
            <button className="relative aspect-square rounded-lg overflow-hidden border-2 border-gray-200 bg-gradient-to-br from-purple-100 to-pink-100 flex flex-col items-center justify-center hover:border-purple-300 transition-all group">
              <Play className="h-8 w-8 text-purple-600 mb-1 group-hover:scale-110 transition-transform" />
              <span className="text-[10px] font-bold text-purple-600">סרטון</span>
            </button>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-6">
        {/* Header */}
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-3">
            {product.brand && (
              <span className="text-base font-bold text-accent uppercase tracking-wide bg-accent/10 px-3 py-1 rounded-lg">
                {product.brand}
              </span>
            )}
            <Badge className="bg-gray-100 text-text-primary border border-gray-200">
              {product.petType === "DOG" ? "🐕 כלבים" : "🐈 חתולים"}
            </Badge>
          </div>
          
          <h1 className="text-2xl md:text-3xl font-bold text-text-primary leading-tight mb-4">{product.name}</h1>
          
          {/* Rating */}
          {product.rating && (
            <div className="flex items-center gap-3 pb-4 border-b border-gray-200">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating!) ? 'fill-amber-400 text-amber-400' : 'fill-gray-200 text-gray-200'}`} />
                ))}
              </div>
              <span className="text-lg font-bold text-text-primary">{product.rating}</span>
              {product.reviewCount && (
                <>
                  <span className="text-sm text-text-secondary">({product.reviewCount} ביקורות)</span>
                  <a href="#reviews" className="text-sm text-accent font-medium hover:underline">
                    צפה בכל הביקורות
                  </a>
                </>
              )}
            </div>
          )}
        </div>

        {/* Price */}
        <div className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-5 border border-gray-200">
          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-4xl font-bold text-text-primary">{formatPrice(product.price)}</span>
            {hasDiscount && (
              <>
                <span className="text-xl text-text-muted line-through">{formatPrice(product.compareAt!)}</span>
                <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                  חיסכון {discountPercent}%
                </span>
              </>
            )}
          </div>
          {product.weight && (
            <p className="text-sm text-text-secondary">
              משקל: {product.weight} {product.weightUnit} • מחיר ל-{product.weightUnit}: {formatPrice(product.price / product.weight)}
            </p>
          )}
        </div>

        {/* Key Benefits */}
        {benefitsList.length > 0 && (
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
            <h3 className="font-bold text-text-primary mb-4 flex items-center gap-2">
              <Heart className="h-5 w-5 text-blue-600" />
              למה {product.petType === "DOG" ? "כלבים" : "חתולים"} אוהבים את זה?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {benefitsList.slice(0, 4).map((benefit, idx) => (
                <div key={idx} className="flex items-start gap-2 bg-white rounded-lg p-3 border border-blue-100">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
                    {idx === 0 ? <Heart className="h-3 w-3 text-white" /> :
                     idx === 1 ? <Zap className="h-3 w-3 text-white" /> :
                     idx === 2 ? <Check className="h-3 w-3 text-white" /> :
                     <Star className="h-3 w-3 text-white" />}
                  </div>
                  <span className="text-sm text-text-primary leading-snug">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Perfect For */}
        {perfectForTags.length > 0 && (
          <div>
            <h3 className="font-bold text-text-primary mb-3">מושלם עבור:</h3>
            <div className="flex flex-wrap gap-2">
              {perfectForTags.map((tag, idx) => (
                <span key={idx} className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-200">
                  {tag}
                </span>
              ))}
              {benefitsList.length > 4 && benefitsList.slice(4).map((tag, idx) => (
                <span key={`extra-${idx}`} className="px-4 py-2 bg-purple-50 text-purple-700 rounded-full text-sm font-medium border border-purple-200">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Stock Status */}
        {lowStock && inStock && (
          <div className="flex items-center gap-2 text-amber-700 bg-amber-50 border-2 border-amber-300 rounded-lg px-4 py-3 text-sm font-bold">
            <CircleAlert className="h-5 w-5 shrink-0 animate-pulse" />
            <span>⚠️ נשארו רק {stockQty} יחידות במלאי - הזמינו בהקדם!</span>
          </div>
        )}
        {!inStock && (
          <div className="flex items-center gap-2 text-red-700 bg-red-50 border-2 border-red-300 rounded-lg px-4 py-3 text-sm font-bold">
            <CircleAlert className="h-5 w-5 shrink-0" />
            <span>❌ אזל מהמלאי - הירשמו לעדכון כשיחזור</span>
          </div>
        )}
        {inStock && !lowStock && (
          <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 border-2 border-emerald-300 rounded-lg px-4 py-3 text-sm font-bold">
            <Check className="h-5 w-5 shrink-0" />
            <span>✓ במלאי ({stockQty} יחידות) - משלוח מיידי!</span>
          </div>
        )}

        {/* Bulk Pricing Selector */}
        <div className="bg-white rounded-xl p-5 border-2 border-gray-200">
          <label className="block font-bold text-text-primary mb-3">בחר כמות:</label>
          <div className="space-y-2">
            {BULK_PRICING.map((option) => (
              <button
                key={option.qty}
                type="button"
                onClick={() => setBulkQty(option.qty)}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-lg border-2 transition-all",
                  bulkQty === option.qty 
                    ? "border-accent bg-accent/5 shadow-md" 
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                    bulkQty === option.qty ? "border-accent" : "border-gray-300"
                  )}>
                    {bulkQty === option.qty && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-text-primary">{option.label}</p>
                    {option.badge && (
                      <p className="text-xs text-emerald-600 font-medium">{option.badge}</p>
                    )}
                  </div>
                </div>
                <span className="font-bold text-xl text-text-primary">
                  {formatPrice((product.price * option.qty) - option.discount)}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart */}
        <div className="space-y-3">
          <Button 
            onClick={handleAddToCart} 
            size="lg" 
            className="w-full bg-gradient-to-r from-accent to-accent-400 hover:from-accent-400 hover:to-accent font-bold text-lg py-6"
            disabled={!inStock}
          >
            <ShoppingBag className="h-5 w-5" />
            {inStock ? `הוסף לסל - ${formatPrice(bulkTotal)}` : "אזל מהמלאי"}
          </Button>

          {/* Delivery Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-900 mb-2">
              <strong>📦 משלוח מהיר:</strong> הזמנות עד 14:00 מגיעות למחרת
            </p>
            <p className="text-sm text-blue-800">
              <strong>🎯 זמן אספקה:</strong> 1-2 ימי עסקים לכל הארץ
            </p>
          </div>

          {/* Trust Signals */}
          <div className="grid grid-cols-1 gap-2 text-sm">
            <div className="flex items-center gap-2 text-text-secondary">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>מוצר מקורי עם אחריות יצרן</span>
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
              <RotateCcw className="h-4 w-4 text-emerald-600" />
              <span>החזר כספי מלא תוך 30 יום</span>
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
              <Phone className="h-4 w-4 text-emerald-600" />
              <a href="tel:0509555350" className="hover:text-accent transition-colors font-medium">
                תמיכה מקצועית: 050-9555350
              </a>
            </div>
          </div>
        </div>

        {/* Detailed Description */}
        {product.description && (
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-xl font-bold text-text-primary mb-3">תיאור מפורט</h3>
            <p className="text-text-secondary leading-relaxed">{product.description}</p>
          </div>
        )}

        {/* Feeding Guide */}
        {product.category === "FOOD" && (
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-6 border-2 border-amber-200">
            <h3 className="font-bold text-amber-900 mb-4">מדריך האכלה יומי</h3>
            <div className="bg-white rounded-lg overflow-hidden border border-amber-200">
              <table className="w-full text-sm">
                <thead className="bg-amber-100">
                  <tr>
                    <th className="px-4 py-3 text-right font-bold text-amber-900">משקל הכלב</th>
                    <th className="px-4 py-3 text-right font-bold text-amber-900">כמות יומית</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(FEEDING_GUIDE).map(([weight, amount]) => (
                    <tr key={weight} className="border-t border-amber-100">
                      <td className="px-4 py-3 text-text-primary font-medium">{weight} ק״ג</td>
                      <td className="px-4 py-3 text-text-secondary">{amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-amber-700 mt-3">
              💡 יש לחלק למנות קטנות לאורך היום ולהתאים לפי רמת הפעילות
            </p>
          </div>
        )}

        {/* Nutritional Info */}
        {hasNutritionalInfo && (
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-xl font-bold text-text-primary mb-4">מידע תזונתי (ניתוח מובטח)</h3>
            <div className="grid grid-cols-3 gap-4">
              {product.nutritionalProtein && (
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-4 border-2 border-blue-200 text-center">
                  <div className="text-xs text-blue-600 font-medium mb-1">חלבון</div>
                  <div className="text-3xl font-bold text-blue-700">{product.nutritionalProtein}</div>
                  <div className="text-[10px] text-blue-600 mt-1">מינימום</div>
                </div>
              )}
              {product.nutritionalFat && (
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-4 border-2 border-amber-200 text-center">
                  <div className="text-xs text-amber-600 font-medium mb-1">שומן</div>
                  <div className="text-3xl font-bold text-amber-700">{product.nutritionalFat}</div>
                  <div className="text-[10px] text-amber-600 mt-1">מינימום</div>
                </div>
              )}
              {product.nutritionalFiber && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border-2 border-green-200 text-center">
                  <div className="text-xs text-green-600 font-medium mb-1">סיבים</div>
                  <div className="text-3xl font-bold text-green-700">{product.nutritionalFiber}</div>
                  <div className="text-[10px] text-green-600 mt-1">מקסימום</div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Ingredients */}
        {product.ingredients && (
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-xl font-bold text-text-primary mb-3">רכיבים</h3>
            <p className="text-sm text-text-secondary leading-relaxed bg-gray-50 rounded-lg p-4 border border-gray-200">
              {product.ingredients}
            </p>
          </div>
        )}

        {/* FAQs */}
        {product.faqs.length > 0 && (
          <div className="pt-6 border-t border-gray-200">
            <h3 className="text-xl font-bold text-text-primary mb-4">שאלות נפוצות</h3>
            <div className="space-y-2">
              {product.faqs.map((faq) => (
                <div key={faq.id} className="border border-gray-200 rounded-xl overflow-hidden bg-white">
                  <button 
                    onClick={() => setOpenFaq(openFaq === faq.id ? null : faq.id)} 
                    className="w-full flex items-center justify-between p-4 text-right hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-text-primary pr-4">{faq.question}</span>
                    {openFaq === faq.id ? 
                      <ChevronUp className="h-5 w-5 text-accent shrink-0" /> : 
                      <ChevronDown className="h-5 w-5 text-text-secondary shrink-0" />
                    }
                  </button>
                  {openFaq === faq.id && (
                    <div className="px-4 pb-4 bg-gray-50 border-t border-gray-200">
                      <p className="text-text-secondary leading-relaxed">{faq.answer}</p>
                    </div>
                  )}
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
