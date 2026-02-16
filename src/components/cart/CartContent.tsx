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
        <ShoppingBag className="h-16 w-16 text-textMuted mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-textPrimary mb-2">העגלה ריקה</h2>
        <p className="text-textSecondary mb-8">נראה שעוד לא הוספתם מוצרים.</p>
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
              <div className="w-24 h-24 bg-background rounded-lg flex items-center justify-center shrink-0 border border-border">
                <ShoppingBag className="h-8 w-8 text-textMuted" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-medium text-textPrimary line-clamp-1">{item.name}</h3>
                    {item.isSubscription && (
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="success"><RefreshCw className="h-3 w-3 ml-1" />מנוי</Badge>
                        <span className="text-xs text-textSecondary">{getSubscriptionIntervalLabel(item.intervalWeeks!)}</span>
                      </div>
                    )}
                  </div>
                  <button onClick={() => removeItem(item.id)} className="p-1 text-textMuted hover:text-red-500 transition-colors shrink-0" aria-label="הסר">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <div className="flex items-center border border-border rounded-lg">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 text-textSecondary hover:text-textPrimary transition-colors" aria-label="הפחת"><Minus className="h-3.5 w-3.5" /></button>
                    <span className="px-3 text-sm font-medium text-textPrimary">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 text-textSecondary hover:text-textPrimary transition-colors" aria-label="הגדל"><Plus className="h-3.5 w-3.5" /></button>
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-textPrimary">{formatPrice(itemPrice * item.quantity)}</p>
                    {item.isSubscription && <p className="text-xs text-textSecondary line-through">{formatPrice(item.price * item.quantity)}</p>}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="lg:col-span-1">
        <div className="sticky top-32 bg-background rounded-2xl p-6 border border-border">
          <h2 className="text-lg font-semibold text-textPrimary mb-4">סיכום הזמנה</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between"><span className="text-textSecondary">סכום ביניים</span><span className="text-textPrimary font-medium">{formatPrice(subtotal)}</span></div>
            <div className="flex justify-between">
              <span className="text-textSecondary">משלוח</span>
              <span className="text-textPrimary font-medium">{shipping === 0 ? <span className="text-emerald-600">חינם</span> : formatPrice(shipping)}</span>
            </div>
            {shipping > 0 && <p className="text-xs text-textPrimary font-medium">הוסיפו {formatPrice(200 - subtotal)} למשלוח חינם</p>}
            <hr className="border-border" />
            <div className="flex justify-between text-base"><span className="font-semibold text-textPrimary">סה״כ</span><span className="font-bold text-textPrimary">{formatPrice(total)}</span></div>
          </div>
          <div className="mt-6 space-y-3">
            <Link href="/checkout"><Button fullWidth size="lg"><Lock className="h-4 w-4" />לתשלום</Button></Link>
            <Link href="/shop" className="block"><Button variant="ghost" fullWidth>המשך קניות</Button></Link>
          </div>
          <div className="mt-6 pt-4 border-t border-border space-y-2">
            <div className="flex items-center gap-2 text-xs text-textSecondary"><ShieldCheck className="h-4 w-4 text-emerald-600" /><span>תשלום מאובטח</span></div>
            <div className="flex items-center gap-2 text-xs text-textSecondary"><Truck className="h-4 w-4 text-emerald-600" /><span>משלוח חינם בהזמנות מעל ₪200</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
