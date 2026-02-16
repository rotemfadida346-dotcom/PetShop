"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { formatPrice, calculateSubscriptionPrice, getShippingCost } from "@/lib/utils";
import { Lock, CreditCard, ShoppingBag, ShieldCheck, ArrowRight, Truck, CheckCircle2, Package } from "lucide-react";
import Link from "next/link";

export default function IsraeliCheckoutForm() {
  const items = useCartStore((s) => s.items);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const clearCart = useCartStore((s) => s.clearCart);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const subtotal = getSubtotal();
  const shipping = getShippingCost(subtotal);
  const total = subtotal + shipping;

  async function handleCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const orderId = `ORD-${Date.now()}`;
    clearCart();
    router.push(`/checkout/success?orderId=${orderId}`);
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center py-20">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-text-primary mb-2">העגלה ריקה</h2>
          <p className="text-text-secondary mb-8">הוסיפו מוצרים לפני שתמשיכו לתשלום.</p>
          <Link href="/shop"><Button size="lg">לחנות</Button></Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleCheckout} className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Info */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm">1</div>
              <h2 className="text-xl font-bold text-text-primary">פרטי התקשרות</h2>
            </div>
            <div className="space-y-4">
              <Input 
                id="fullName" 
                label="שם מלא *" 
                type="text" 
                placeholder="ישראל ישראלי" 
                required 
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  id="email" 
                  label="אימייל *" 
                  type="email" 
                  placeholder="israel@example.com" 
                  required 
                />
                <Input 
                  id="phone" 
                  label="טלפון נייד *" 
                  type="tel" 
                  placeholder="050-1234567" 
                  required 
                />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm">2</div>
              <h2 className="text-xl font-bold text-text-primary">כתובת למשלוח</h2>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-5 flex items-start gap-2">
              <Truck className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-sm text-blue-900">
                <strong>משלוחים בישראל בלבד.</strong> זמן אספקה: 3-5 ימי עסקים לכל הארץ.
              </p>
            </div>
            <div className="space-y-4">
              <Input 
                id="city" 
                label="עיר *" 
                placeholder="תל אביב" 
                required 
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <Input 
                    id="street" 
                    label="רחוב *" 
                    placeholder="רחוב הרצל" 
                    required 
                  />
                </div>
                <Input 
                  id="houseNumber" 
                  label="מספר בית *" 
                  placeholder="10" 
                  required 
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input 
                  id="apartment" 
                  label="דירה / קומה (אופציונלי)" 
                  placeholder="דירה 5" 
                />
                <Input 
                  id="zipcode" 
                  label="מיקוד (אופציונלי)" 
                  placeholder="6100000" 
                />
              </div>
              <Input 
                id="notes" 
                label="הערות למשלוח (אופציונלי)" 
                placeholder="קומה 3, ללא מעלית" 
              />
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-full bg-accent text-white flex items-center justify-center font-bold text-sm">3</div>
              <h2 className="text-xl font-bold text-text-primary">אמצעי תשלום</h2>
            </div>
            
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-5 mb-5">
              <div className="flex items-start gap-3">
                <CreditCard className="h-6 w-6 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-green-900 mb-1">תשלום מאובטח בכרטיס אשראי</h3>
                  <p className="text-sm text-green-800 mb-3">
                    התשלום מעובד דרך ספק תשלומים ישראלי מוסדר. פרטי האשראי מוצפנים ולא נשמרים באתר.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 border border-gray-300">Visa</span>
                    <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 border border-gray-300">Mastercard</span>
                    <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 border border-gray-300">American Express</span>
                    <span className="px-3 py-1 bg-white rounded-full text-xs font-medium text-gray-700 border border-gray-300">ישראכרט</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-green-600" />
                <span>תשלום מאובטח ומוצפן SSL</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-green-600" />
                <span>אין שמירת פרטי כרטיס אשראי באתר</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span>עמלה תיגבה רק לאחר אישור ההזמנה</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
            <Link href="/cart" className="w-full sm:w-auto">
              <Button variant="ghost" type="button" className="w-full">
                <ArrowRight className="h-4 w-4" />
                חזרה לעגלה
              </Button>
            </Link>
            <Button 
              type="submit" 
              size="lg" 
              isLoading={isLoading} 
              className="flex-1 bg-gradient-to-r from-accent to-accent-400 hover:from-accent-400 hover:to-accent text-white font-bold text-lg py-6"
            >
              <Lock className="h-5 w-5" />
              {isLoading ? "מעבד הזמנה..." : `שלם ${formatPrice(total)} ₪`}
            </Button>
          </div>

          {/* Trust Footer */}
          <div className="text-center text-sm text-gray-500 space-y-1 pt-4">
            <p>בלחיצה על &quot;שלם&quot;, אתם מאשרים את תנאי השימוש ומדיניות הפרטיות</p>
            <p className="flex items-center justify-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              <span>תשלום מאובטח 100% • ללא התחייבות • ביטול חופשי</span>
            </p>
          </div>
        </div>

        {/* Order Summary - Sticky Sidebar */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-5 flex items-center gap-2">
              <Package className="h-5 w-5" />
              סיכום הזמנה
            </h2>
            
            {/* Products List */}
            <div className="space-y-3 mb-5 max-h-[300px] overflow-y-auto">
              {items.map((item) => {
                const price = item.isSubscription 
                  ? calculateSubscriptionPrice(item.price, item.subscriptionDiscount) 
                  : item.price;
                return (
                  <div key={item.id} className="flex justify-between text-sm bg-white/5 rounded-lg p-3">
                    <div className="flex-1">
                      <p className="text-white font-medium line-clamp-1">{item.name}</p>
                      <p className="text-gray-400 text-xs">כמות: {item.quantity}</p>
                    </div>
                    <span className="text-white font-bold shrink-0 mr-2">
                      {formatPrice(price * item.quantity)}
                    </span>
                  </div>
                );
              })}
            </div>
            
            <hr className="border-gray-700 mb-5" />
            
            {/* Pricing Breakdown */}
            <div className="space-y-3 text-sm mb-5">
              <div className="flex justify-between text-gray-300">
                <span>סכום ביניים</span>
                <span className="font-medium text-white">{formatPrice(subtotal)}</span>
              </div>
              
              {/* Visual Shipping */}
              <div className="bg-white/5 rounded-lg p-3 border border-white/10">
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
                        className="bg-gradient-to-r from-accent-400 to-accent h-full transition-all"
                        style={{ width: `${Math.min((subtotal / 200) * 100, 100)}%` }}
                      />
                    </div>
                    <p className="text-xs text-accent">
                      עוד {formatPrice(200 - subtotal)} למשלוח חינם
                    </p>
                  </div>
                )}
                
                {shipping === 0 && (
                  <p className="text-xs text-emerald-400">
                    ✅ קיבלתם משלוח חינם!
                  </p>
                )}
              </div>
            </div>
            
            <hr className="border-gray-700 mb-4" />
            
            {/* Total */}
            <div className="flex justify-between items-center text-lg">
              <span className="font-bold text-white">סה״כ לתשלום</span>
              <span className="font-bold text-white text-2xl">{formatPrice(total)}</span>
            </div>

            {/* Trust Badges */}
            <div className="mt-6 pt-5 border-t border-gray-700 space-y-2 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>תשלום מאובטח ומוצפן</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4 text-emerald-400" />
                <span>משלוח מהיר לכל הארץ</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>החזרות תוך 30 יום</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
