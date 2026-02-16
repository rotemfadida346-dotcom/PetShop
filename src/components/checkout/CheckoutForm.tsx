"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { formatPrice, calculateSubscriptionPrice, getShippingCost } from "@/lib/utils";
import { Lock, CreditCard, ShoppingBag, ShieldCheck, ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function CheckoutForm() {
  const items = useCartStore((s) => s.items);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const clearCart = useCartStore((s) => s.clearCart);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"paypal" | "tranzila">("tranzila");

  const subtotal = getSubtotal();
  const shipping = getShippingCost(subtotal);
  const total = subtotal + shipping;

  async function handleCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentMethod,
          items: items.map((item) => ({
            productId: item.productId, name: item.name,
            price: item.isSubscription ? calculateSubscriptionPrice(item.price, item.subscriptionDiscount) : item.price,
            quantity: item.quantity, isSubscription: item.isSubscription, intervalWeeks: item.intervalWeeks,
          })),
        }),
      });
      const data = await response.json();
      if (data.url) { window.location.href = data.url; }
      else { clearCart(); router.push("/checkout/success"); }
    } catch {
      clearCart();
      router.push("/checkout/success");
    } finally {
      setIsLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingBag className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-textPrimary mb-2">העגלה ריקה</h2>
        <p className="text-textSecondary mb-8">הוסיפו מוצרים לפני שתמשיכו לתשלום.</p>
        <Link href="/shop"><Button size="lg">לחנות</Button></Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleCheckout}>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        <div className="lg:col-span-3 space-y-8">
          {/* Contact */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-textPrimary mb-4">פרטי התקשרות</h2>
            <div className="space-y-4">
              <Input id="email" label="אימייל" type="email" placeholder="you@email.com" required />
              <Input id="phone" label="טלפון" type="tel" placeholder="050-1234567" required />
            </div>
          </div>

          {/* Shipping */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-textPrimary mb-4">כתובת למשלוח</h2>
            <p className="text-sm text-textSecondary mb-4">📦 משלוחים בכל רחבי ישראל בלבד</p>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input id="firstName" label="שם פרטי" placeholder="ישראל" required />
                <Input id="lastName" label="שם משפחה" placeholder="ישראלי" required />
              </div>
              <Input id="address1" label="כתובת" placeholder="רחוב הרצל 1" required />
              <Input id="address2" label="דירה / קומה (אופציונלי)" placeholder="דירה 4" />
              <div className="grid grid-cols-2 gap-4">
                <Input id="city" label="עיר" placeholder="תל אביב" required />
                <Input id="zip" label="מיקוד" placeholder="6100000" required />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-textPrimary mb-4">אמצעי תשלום</h2>
            <div className="space-y-3">
              <button type="button" onClick={() => setPaymentMethod("tranzila")}
                className={cn("w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-right", paymentMethod === "tranzila" ? "border-accent bg-background" : "border-gray-200 hover:border-gray-300")}>
                <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0", paymentMethod === "tranzila" ? "border-accent" : "border-gray-300")}>
                  {paymentMethod === "tranzila" && <div className="w-2.5 h-2.5 rounded-full bg-black" />}
                </div>
                <div>
                  <p className="font-medium text-textPrimary">כרטיס אשראי (Tranzila)</p>
                  <p className="text-sm text-textSecondary">ויזה, מאסטרקארד, אמריקן אקספרס</p>
                </div>
                <CreditCard className="h-5 w-5 text-textSecondary mr-auto" />
              </button>

              <button type="button" onClick={() => setPaymentMethod("paypal")}
                className={cn("w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-right", paymentMethod === "paypal" ? "border-accent bg-background" : "border-gray-200 hover:border-gray-300")}>
                <div className={cn("w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0", paymentMethod === "paypal" ? "border-accent" : "border-gray-300")}>
                  {paymentMethod === "paypal" && <div className="w-2.5 h-2.5 rounded-full bg-black" />}
                </div>
                <div>
                  <p className="font-medium text-textPrimary">PayPal</p>
                  <p className="text-sm text-textSecondary">תשלום מאובטח דרך PayPal</p>
                </div>
                <span className="font-bold text-blue-600 text-sm mr-auto">PayPal</span>
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/cart">
              <Button variant="ghost" type="button"><ArrowRight className="h-4 w-4" />חזרה לעגלה</Button>
            </Link>
            <Button type="submit" size="lg" isLoading={isLoading} className="flex-1">
              <Lock className="h-4 w-4" />
              שלם {formatPrice(total)}
            </Button>
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-2">
          <div className="sticky top-32 bg-white rounded-2xl p-6 border border-gray-200">
            <h2 className="text-lg font-semibold text-textPrimary mb-4">סיכום הזמנה</h2>
            <div className="space-y-3 mb-6">
              {items.map((item) => {
                const price = item.isSubscription ? calculateSubscriptionPrice(item.price, item.subscriptionDiscount) : item.price;
                return (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-textSecondary line-clamp-1 pl-2">{item.name} x{item.quantity}</span>
                    <span className="text-textPrimary font-medium shrink-0">{formatPrice(price * item.quantity)}</span>
                  </div>
                );
              })}
            </div>
            <hr className="border-gray-200 mb-4" />
            <div className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-textSecondary">סכום ביניים</span><span className="text-textPrimary">{formatPrice(subtotal)}</span></div>
              <div className="flex justify-between"><span className="text-textSecondary">משלוח</span><span className="text-textPrimary">{shipping === 0 ? "חינם" : formatPrice(shipping)}</span></div>
              <hr className="border-gray-200" />
              <div className="flex justify-between text-base font-bold"><span>סה״כ</span><span>{formatPrice(total)}</span></div>
            </div>
            <div className="mt-6 flex items-center gap-2 text-xs text-textSecondary">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>תשלום מוצפן ומאובטח SSL</span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
