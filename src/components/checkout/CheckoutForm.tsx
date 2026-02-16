"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import {
  formatPrice,
  calculateSubscriptionPrice,
} from "@/lib/utils";
import {
  Lock,
  CreditCard,
  ShoppingBag,
  ShieldCheck,
  ArrowLeft,
} from "lucide-react";
import Link from "next/link";

export default function CheckoutForm() {
  const items = useCartStore((s) => s.items);
  const getSubtotal = useCartStore((s) => s.getSubtotal);
  const clearCart = useCartStore((s) => s.clearCart);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const subtotal = getSubtotal();
  const shipping = subtotal >= 49 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  async function handleCheckout(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            productId: item.productId,
            name: item.name,
            price: item.isSubscription
              ? calculateSubscriptionPrice(item.price, item.subscriptionDiscount)
              : item.price,
            quantity: item.quantity,
            isSubscription: item.isSubscription,
            intervalWeeks: item.intervalWeeks,
          })),
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        // For demo, simulate success
        clearCart();
        router.push("/checkout/success");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      // For demo, simulate success
      clearCart();
      router.push("/checkout/success");
    } finally {
      setIsLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingBag className="h-16 w-16 text-stone-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-stone-900 mb-2">
          Your cart is empty
        </h2>
        <p className="text-stone-500 mb-8">
          Add some products before checking out.
        </p>
        <Link href="/shop">
          <Button size="lg">Browse Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleCheckout}>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
        {/* Left: Form */}
        <div className="lg:col-span-3 space-y-8">
          {/* Contact */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200">
            <h2 className="text-lg font-semibold text-stone-900 mb-4">
              Contact Information
            </h2>
            <div className="space-y-4">
              <Input
                id="email"
                label="Email"
                type="email"
                placeholder="you@email.com"
                required
              />
              <Input
                id="phone"
                label="Phone (optional)"
                type="tel"
                placeholder="(555) 555-5555"
              />
            </div>
          </div>

          {/* Shipping */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200">
            <h2 className="text-lg font-semibold text-stone-900 mb-4">
              Shipping Address
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  id="firstName"
                  label="First Name"
                  placeholder="John"
                  required
                />
                <Input
                  id="lastName"
                  label="Last Name"
                  placeholder="Doe"
                  required
                />
              </div>
              <Input
                id="address1"
                label="Address"
                placeholder="123 Main St"
                required
              />
              <Input
                id="address2"
                label="Apartment, suite, etc. (optional)"
                placeholder="Apt 4B"
              />
              <div className="grid grid-cols-3 gap-4">
                <Input id="city" label="City" placeholder="New York" required />
                <Input id="state" label="State" placeholder="NY" required />
                <Input id="zip" label="ZIP Code" placeholder="10001" required />
              </div>
            </div>
          </div>

          {/* Payment info */}
          <div className="bg-white rounded-2xl p-6 border border-stone-200">
            <h2 className="text-lg font-semibold text-stone-900 mb-4">
              Payment
            </h2>
            <div className="bg-stone-50 rounded-xl p-6 text-center border border-stone-200">
              <CreditCard className="h-8 w-8 text-stone-400 mx-auto mb-3" />
              <p className="text-sm text-stone-600 mb-1">
                You&apos;ll be redirected to Stripe&apos;s secure checkout to complete
                payment.
              </p>
              <p className="text-xs text-stone-400">
                We accept Visa, Mastercard, AMEX, Apple Pay, and Google Pay.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/cart">
              <Button variant="ghost" type="button">
                <ArrowLeft className="h-4 w-4" />
                Back to Cart
              </Button>
            </Link>
            <Button type="submit" size="lg" isLoading={isLoading} className="flex-1">
              <Lock className="h-4 w-4" />
              Pay {formatPrice(total)}
            </Button>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-2">
          <div className="sticky top-32 bg-white rounded-2xl p-6 border border-stone-200">
            <h2 className="text-lg font-semibold text-stone-900 mb-4">
              Order Summary
            </h2>

            {/* Items */}
            <div className="space-y-3 mb-6">
              {items.map((item) => {
                const price = item.isSubscription
                  ? calculateSubscriptionPrice(
                      item.price,
                      item.subscriptionDiscount
                    )
                  : item.price;

                return (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-stone-600 line-clamp-1 pr-2">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="text-stone-900 font-medium shrink-0">
                      {formatPrice(price * item.quantity)}
                    </span>
                  </div>
                );
              })}
            </div>

            <hr className="border-stone-200 mb-4" />

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-stone-500">Subtotal</span>
                <span className="text-stone-900">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Shipping</span>
                <span className="text-stone-900">
                  {shipping === 0 ? "Free" : formatPrice(shipping)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Tax (est.)</span>
                <span className="text-stone-900">{formatPrice(tax)}</span>
              </div>
              <hr className="border-stone-200" />
              <div className="flex justify-between text-base font-bold">
                <span>Total</span>
                <span>{formatPrice(total)}</span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-stone-500">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>SSL encrypted & secure checkout</span>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
