"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { formatPrice, calculateSubscriptionPrice } from "@/lib/utils";
import { 
  Lock, CreditCard, ShoppingBag, ShieldCheck, ArrowRight, 
  CheckCircle, Truck, Zap, Package, Minus, Plus, Tag, X 
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type ShippingType = "standard" | "express";
type PaymentMethod = "credit-card" | "bit" | "paybox";

export default function EnhancedCheckoutForm() {
  const items = useCartStore((s) => s.items);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const clearCart = useCartStore((s) => s.clearCart);
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(false);
  const [shippingType, setShippingType] = useState<ShippingType>("standard");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("credit-card");
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const [promoError, setPromoError] = useState("");

  const subtotal = getSubtotal();
  const shippingCost = subtotal >= 200 ? 0 : (shippingType === "express" ? 45 : 25);
  const discount = appliedPromo ? appliedPromo.discount : 0;
  const total = subtotal + shippingCost - discount;

  // Demo promo codes
  const promoCodes: Record<string, number> = {
    "WELCOME10": 20,
    "FIRST15": 30,
    "VIP20": 40,
  };

  function applyPromoCode() {
    const code = promoCode.toUpperCase().trim();
    if (promoCodes[code]) {
      setAppliedPromo({ code, discount: promoCodes[code] });
      setPromoError("");
    } else {
      setPromoError("קוד קופון לא תקין");
      setAppliedPromo(null);
    }
  }

  function removePromo() {
    setAppliedPromo(null);
    setPromoCode("");
    setPromoError("");
  }

  async function handleCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    const orderId = `ORD-${Date.now()}`;
    clearCart();
    router.push(`/checkout/success?orderId=${orderId}&total=${total}`);
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
    <form onSubmit={handleCheckout} className="max-w-7xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8 bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div className="flex flex-col items-center flex-1">
            <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold mb-2">
              <CheckCircle className="h-5 w-5" />
            </div>
            <span className="text-sm font-medium text-emerald-600">סל קניות</span>
          </div>
          <div className="flex-1 h-1 bg-emerald-500 -mt-8"></div>
          <div className="flex flex-col items-center flex-1">
            <div className="w-10 h-10 rounded-full bg-accent text-white flex items-center justify-center font-bold mb-2">
              2
            </div>
            <span className="text-sm font-bold text-accent">פרטים ותשלום</span>
          </div>
          <div className="flex-1 h-1 bg-gray-200 -mt-8"></div>
          <div className="flex flex-col items-center flex-1">
            <div className="w-10 h-10 rounded-full bg-gray-200 text-gray-500 flex items-center justify-center font-bold mb-2">
              3
            </div>
            <span className="text-sm text-gray-500">אישור</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Contact Information */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-text-primary mb-5 flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold">1</div>
              פרטי יצירת קשר
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input id="firstName" label="שם פרטי *" type="text" placeholder="ישראל" required />
                <Input id="lastName" label="שם משפחה *" type="text" placeholder="ישראלי" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input id="phone" label="טלפון נייד *" type="tel" placeholder="050-123-4567" required />
                <Input id="email" label="דוא״ל *" type="email" placeholder="example@example.com" required />
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-text-primary mb-5 flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold">2</div>
              כתובת לשליחה
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-5 flex items-start gap-2">
              <Truck className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
              <p className="text-sm text-blue-900">
                <strong>משלוחים בישראל בלבד</strong> • זמן אספקה משתנה לפי סוג המשלוח
              </p>
            </div>
            <div className="space-y-4">
              <Input id="address" label="כתובת מלאה *" placeholder="רחוב הרצל 10, דירה 5" required />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input id="city" label="עיר *" placeholder="תל אביב" required />
                <Input id="zipcode" label="מיקוד (אופציונלי)" placeholder="6100000" />
              </div>
              <div className="form-group">
                <label htmlFor="notes" className="block text-sm font-medium text-text-primary mb-2">
                  הערות למשלוח (אופציונלי)
                </label>
                <textarea
                  id="notes"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent"
                  rows={3}
                  placeholder="הערות מיוחדות למשלוח (קומה, שער וכו')"
                />
              </div>
            </div>
          </div>

          {/* Shipping Options */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-text-primary mb-5 flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold">3</div>
              אפשרויות משלוח
            </h2>
            <div className="space-y-3">
              <button
                type="button"
                onClick={() => setShippingType("standard")}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all",
                  shippingType === "standard" ? "border-accent bg-accent/5" : "border-gray-200 hover:border-gray-300"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                    shippingType === "standard" ? "border-accent" : "border-gray-300"
                  )}>
                    {shippingType === "standard" && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                  </div>
                  <Truck className="h-5 w-5 text-gray-600" />
                  <div className="text-right">
                    <p className="font-bold text-text-primary">משלוח רגיל</p>
                    <p className="text-sm text-text-secondary">3-5 ימי עסקים</p>
                  </div>
                </div>
                <span className="font-bold text-text-primary">{subtotal >= 200 ? "חינם!" : "₪25"}</span>
              </button>

              <button
                type="button"
                onClick={() => setShippingType("express")}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all",
                  shippingType === "express" ? "border-accent bg-accent/5" : "border-gray-200 hover:border-gray-300"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-5 h-5 rounded-full border-2 flex items-center justify-center",
                    shippingType === "express" ? "border-accent" : "border-gray-300"
                  )}>
                    {shippingType === "express" && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                  </div>
                  <Zap className="h-5 w-5 text-amber-500" />
                  <div className="text-right">
                    <p className="font-bold text-text-primary">משלוח מהיר</p>
                    <p className="text-sm text-text-secondary">1-2 ימי עסקים</p>
                  </div>
                </div>
                <span className="font-bold text-text-primary">₪45</span>
              </button>

              {subtotal >= 200 && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  <p className="text-sm text-emerald-700 font-medium">
                    🎉 קיבלתם משלוח חינם! ההזמנה שלכם מעל ₪200
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-text-primary mb-5 flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold">4</div>
              אמצעי תשלום
            </h2>
            
            <div className="space-y-3 mb-6">
              <button
                type="button"
                onClick={() => setPaymentMethod("credit-card")}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all",
                  paymentMethod === "credit-card" ? "border-accent bg-accent/5" : "border-gray-200 hover:border-gray-300"
                )}
              >
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0",
                  paymentMethod === "credit-card" ? "border-accent" : "border-gray-300"
                )}>
                  {paymentMethod === "credit-card" && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                </div>
                <CreditCard className="h-6 w-6 text-gray-600" />
                <div className="flex-1 text-right">
                  <p className="font-bold text-text-primary">כרטיס אשראי</p>
                  <p className="text-sm text-text-secondary">ויזא, מאסטרקארד, אמריקן אקספרס</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("bit")}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all",
                  paymentMethod === "bit" ? "border-accent bg-accent/5" : "border-gray-200 hover:border-gray-300"
                )}
              >
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0",
                  paymentMethod === "bit" ? "border-accent" : "border-gray-300"
                )}>
                  {paymentMethod === "bit" && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                </div>
                <span className="text-2xl">📱</span>
                <div className="flex-1 text-right">
                  <p className="font-bold text-text-primary">Bit</p>
                  <p className="text-sm text-text-secondary">תשלום מיידי דרך האפליקציה</p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod("paybox")}
                className={cn(
                  "w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all",
                  paymentMethod === "paybox" ? "border-accent bg-accent/5" : "border-gray-200 hover:border-gray-300"
                )}
              >
                <div className={cn(
                  "w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0",
                  paymentMethod === "paybox" ? "border-accent" : "border-gray-300"
                )}>
                  {paymentMethod === "paybox" && <div className="w-2.5 h-2.5 rounded-full bg-accent" />}
                </div>
                <span className="text-2xl">🏪</span>
                <div className="flex-1 text-right">
                  <p className="font-bold text-text-primary">PayBox</p>
                  <p className="text-sm text-text-secondary">תשלום בנקאי מאובטח</p>
                </div>
              </button>
            </div>

            {/* Credit Card Form */}
            {paymentMethod === "credit-card" && (
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <ShieldCheck className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                    <div className="text-sm text-green-800">
                      <p className="font-bold mb-1">תשלום מאובטח 100%</p>
                      <p>כל פרטי הכרטיס מוצפנים ולא נשמרים באתר. העמלה תיגבה רק לאחר אישור ההזמנה.</p>
                    </div>
                  </div>
                </div>
                
                <Input 
                  id="cardNumber" 
                  label="מספר כרטיס *" 
                  type="text" 
                  placeholder="1234 5678 9012 3456"
                  required 
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input 
                    id="expiryDate" 
                    label="תאריך תוקף *" 
                    type="text" 
                    placeholder="MM/YY"
                    required 
                  />
                  <Input 
                    id="cvv" 
                    label="CVV *" 
                    type="text" 
                    placeholder="123"
                    required 
                  />
                </div>
                <Input 
                  id="cardHolder" 
                  label="שם בעל הכרטיס *" 
                  type="text" 
                  placeholder="כפי שמופיע על הכרטיס"
                  required 
                />
              </div>
            )}

            {paymentMethod === "bit" && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center mt-4">
                <span className="text-5xl mb-3 block">📱</span>
                <p className="text-sm text-blue-900 mb-2">
                  <strong>תועברו לאפליקציית Bit</strong> להשלמת התשלום
                </p>
                <p className="text-xs text-blue-700">
                  לאחר לחיצה על &quot;השלמת הזמנה&quot;, תפתח אפליקציית Bit אוטומטית
                </p>
              </div>
            )}

            {paymentMethod === "paybox" && (
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6 text-center mt-4">
                <span className="text-5xl mb-3 block">🏪</span>
                <p className="text-sm text-purple-900 mb-2">
                  <strong>תשלום בנקאי מאובטח דרך PayBox</strong>
                </p>
                <p className="text-xs text-purple-700">
                  תועברו לדף תשלום מאובטח של PayBox
                </p>
              </div>
            )}
          </div>

          {/* Terms & Newsletter */}
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" required className="mt-1 w-5 h-5 text-accent rounded border-gray-300 focus:ring-accent" />
              <span className="text-sm text-text-secondary">
                אני מסכים/ה ל<Link href="/terms" className="text-accent font-medium hover:underline">תנאי השימוש</Link> ול<Link href="/privacy" className="text-accent font-medium hover:underline">מדיניות הפרטיות</Link> *
              </span>
            </label>
            
            <label className="flex items-start gap-3 cursor-pointer">
              <input type="checkbox" className="mt-1 w-5 h-5 text-accent rounded border-gray-300 focus:ring-accent" />
              <span className="text-sm text-text-secondary">
                אני מעוניין/ת לקבל עדכונים על מבצעים ומוצרים חדשים (אופציונלי)
              </span>
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
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
              {isLoading ? "מעבד הזמנה..." : `השלמת הזמנה - ${formatPrice(total)}`}
            </Button>
          </div>

          <p className="text-center text-sm text-gray-500">
            🔒 תשלום מאובטח ומוצפן SSL • ללא התחייבות • ביטול חופשי
          </p>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border border-gray-700 shadow-xl text-white">
            <h3 className="text-xl font-bold mb-5 flex items-center gap-2">
              <Package className="h-5 w-5" />
              סיכום הזמנה
            </h3>
            
            {/* Products List with Quantity Controls */}
            <div className="space-y-4 mb-5 max-h-[300px] overflow-y-auto">
              {items.map((item) => {
                const price = item.isSubscription 
                  ? calculateSubscriptionPrice(item.price, item.subscriptionDiscount) 
                  : item.price;
                return (
                  <div key={item.id} className="bg-white/10 rounded-lg p-3">
                    <div className="flex gap-3 mb-2">
                      <div className="w-16 h-16 bg-white/5 rounded-lg flex items-center justify-center shrink-0">
                        <ShoppingBag className="h-6 w-6 text-white/50" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-white text-sm line-clamp-2 mb-1">{item.name}</h4>
                        <p className="text-xs text-gray-400">{formatPrice(price)} × {item.quantity}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 bg-white/5 rounded-lg">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-white/10 rounded transition-colors"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="text-sm font-bold px-2">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-white/10 rounded transition-colors"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <span className="font-bold text-lg">{formatPrice(price * item.quantity)}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Promo Code */}
            <div className="mb-5">
              {!appliedPromo ? (
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="קוד קופון"
                      className="flex-1 px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    <button
                      type="button"
                      onClick={applyPromoCode}
                      className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg font-medium transition-colors"
                    >
                      החל
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-xs text-red-400">{promoError}</p>
                  )}
                  <p className="text-xs text-gray-400">
                    💡 קודים לדוגמה: WELCOME10, FIRST15, VIP20
                  </p>
                </div>
              ) : (
                <div className="bg-emerald-500/20 border border-emerald-500/30 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-emerald-400" />
                    <span className="text-sm font-medium text-emerald-400">
                      {appliedPromo.code} הוחל! -{formatPrice(appliedPromo.discount)}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={removePromo}
                    className="text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            <hr className="border-gray-700 mb-5" />
            
            {/* Pricing Breakdown */}
            <div className="space-y-3 text-sm mb-5">
              <div className="flex justify-between text-gray-300">
                <span>סכום ביניים</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              
              <div className="flex justify-between text-gray-300">
                <span>משלוח {shippingType === "express" && "(מהיר)"}</span>
                {shippingCost === 0 ? (
                  <span className="text-emerald-400 font-bold">חינם! 🎉</span>
                ) : (
                  <span className="font-medium">{formatPrice(shippingCost)}</span>
                )}
              </div>

              {appliedPromo && (
                <div className="flex justify-between text-emerald-400">
                  <span>הנחה ({appliedPromo.code})</span>
                  <span className="font-bold">-{formatPrice(appliedPromo.discount)}</span>
                </div>
              )}
            </div>
            
            <hr className="border-gray-700 mb-4" />
            
            {/* Total */}
            <div className="flex justify-between items-center text-lg mb-5">
              <span className="font-bold">סכום לתשלום</span>
              <span className="font-bold text-3xl text-accent">{formatPrice(total)}</span>
            </div>

            {/* Security Badges */}
            <div className="pt-4 border-t border-gray-700 space-y-2 text-xs text-gray-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>תשלום מאובטח SSL 256 bit</span>
              </div>
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-emerald-400" />
                <span>אין שמירת פרטי כרטיס באתר</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-400" />
                <span>החזרות תוך 30 יום</span>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-gray-700 flex items-center justify-center gap-3">
              <div className="px-3 py-1 bg-white/10 rounded text-xs font-bold">SSL</div>
              <div className="px-3 py-1 bg-white/10 rounded text-xs font-bold">PCI DSS</div>
              <div className="px-3 py-1 bg-white/10 rounded text-xs font-bold">🇮🇱 IL</div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
