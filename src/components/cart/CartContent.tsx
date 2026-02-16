"use client";

import { useCartStore } from "@/store/cart";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { formatPrice, calculateSubscriptionPrice, getSubscriptionIntervalLabel, getShippingCost } from "@/lib/utils";
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, RefreshCw, ShieldCheck, Truck, Lock } from "lucide-react";

export default function CartContent() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const getSubtotal = useCartStore((s) => s.getSubtotal);

  const subtotal = getSubtotal();
  const shipping = getShippingCost(subtotal);
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingBag className="h-16 w-16 text-text-text-secondary mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-text-primary mb-2">העגלה ריקה</h2>
        <p className="text-text-secondary mb-8">נראה שעוד לא הוספתם מוצרים.</p>
        <Link href="/shop"><Button size="lg">לחנות <ArrowLeft className="h-4 w-4" /></Button></Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <div className="lg:col-span-2 space-y-4">
        {items.map((item) => {
          const itemPrice = item.isSubscription ? calculateSubscriptionPrice(item.price, item.subscriptionDiscount) : item.price;
          return (
            <div key={item.id} className="flex gap-4 p-4 bg-card border border-border rounded-xl">
              <div className="w-24 h-24 bg-bg rounded-lg flex items-center justify-center shrink-0 border border-border">
                <ShoppingBag className="h-8 w-8 text-text-text-secondary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-medium text-text-primary line-clamp-1">{item.name}</h3>
                    {item.isSubscription && (
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="success"><RefreshCw className="h-3 w-3 ml-1" />מנוי</Badge>
                        <span className="text-xs text-text-secondary">{getSubscriptionIntervalLabel(item.intervalWeeks!)}</span>
                      </div>
                    )}
                  </div>
                  <button onClick={() => removeItem(item.id)} className="p-1 text-text-text-secondary hover:text-red-500 transition-colors shrink-0" aria-label="הסר">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-border rounded-lg">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 text-text-secondary hover:text-text-primary transition-colors" aria-label="הפחת"><Minus className="h-3.5 w-3.5" /></button>
                    <span className="px-3 text-sm font-medium text-text-primary">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 text-text-secondary hover:text-text-primary transition-colors" aria-label="הגדל"><Plus className="h-3.5 w-3.5" /></button>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-text-primary">{formatPrice(itemPrice * item.quantity)}</p>
                    {item.isSubscription && <p className="text-xs text-text-secondary line-through">{formatPrice(item.price * item.quantity)}</p>}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-32 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
          <h2 className="text-lg font-semibold text-white mb-4">סיכום הזמנה</h2>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-300">סכום ביניים</span>
              <span className="text-white font-medium">{formatPrice(subtotal)}</span>
            </div>
            
            {/* Visual Shipping Calculator */}
            <div className="bg-white/5 rounded-lg p-4 border border-white/10">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-300">משלוח</span>
                {shipping === 0 ? (
                  <span className="text-emerald-400 font-bold flex items-center gap-1">
                    <Truck className="h-4 w-4" />
                    חינם! 🎉
                  </span>
                ) : (
                  <span className="text-white font-medium">{formatPrice(shipping)}</span>
                )}
              </div>
              
              {shipping > 0 && (
                <div className="space-y-2">
                  <div className="w-full bg-gray-700 rounded-full h-2 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-accent-400 to-accent h-full transition-all duration-500"
                      style={{ width: `${Math.min((subtotal / 200) * 100, 100)}%` }}
                    />
                  </div>
                  <p className="text-xs text-accent font-medium">
                    הוסיפו עוד {formatPrice(200 - subtotal)} למשלוח חינם! 📦
                  </p>
                </div>
              )}
              
              {shipping === 0 && (
                <p className="text-xs text-emerald-400 mt-1">
                  ✅ קיבלתם משלוח חינם!
                </p>
              )}
            </div>
            
            <hr className="border-gray-700" />
            <div className="flex justify-between text-base">
              <span className="font-semibold text-white">סה״כ לתשלום</span>
              <span className="font-bold text-white text-xl">{formatPrice(total)}</span>
            </div>
          </div>
          
          <div className="mt-6 space-y-3">
            <Link href="/checkout">
              <Button fullWidth size="lg" className="bg-accent hover:bg-accent-400 text-white font-bold">
                <Lock className="h-4 w-4" />
                מעבר לתשלום מאובטח
              </Button>
            </Link>
            {/* Trust Micro-copy */}
            <div className="text-center text-xs text-gray-400 space-y-1 bg-white/5 rounded-lg p-3">
              <p className="flex items-center justify-center gap-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                תשלום מאובטח ומוצפן
              </p>
              <p className="flex items-center justify-center gap-1.5">
                <Truck className="h-3.5 w-3.5 text-emerald-400" />
                משלוח מהיר לכל הארץ
              </p>
              <p>ללא התחייבות • ביטול חופשי</p>
            </div>
            <Link href="/shop" className="block">
              <Button variant="ghost" fullWidth className="text-gray-300 hover:text-white">
                המשך קניות
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
