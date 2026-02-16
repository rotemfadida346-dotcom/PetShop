"use client";

import { useCartStore } from "@/store/cart";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import {
  formatPrice,
  calculateSubscriptionPrice,
  getSubscriptionIntervalLabel,
} from "@/lib/utils";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  RefreshCw,
  ShieldCheck,
  Truck,
  Lock,
} from "lucide-react";

export default function CartContent() {
  const items = useCartStore((s) => s.items);
  const removeItem = useCartStore((s) => s.removeItem);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const getSubtotal = useCartStore((s) => s.getSubtotal);

  const subtotal = getSubtotal();
  const shipping = subtotal >= 49 ? 0 : 5.99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <ShoppingBag className="h-16 w-16 text-stone-300 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-stone-900 mb-2">
          Your cart is empty
        </h2>
        <p className="text-stone-500 mb-8">
          Looks like you haven&apos;t added anything yet.
        </p>
        <Link href="/shop">
          <Button size="lg">
            Browse Products
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
      {/* Cart Items */}
      <div className="lg:col-span-2 space-y-4">
        {items.map((item) => {
          const itemPrice = item.isSubscription
            ? calculateSubscriptionPrice(item.price, item.subscriptionDiscount)
            : item.price;

          return (
            <div
              key={item.id}
              className="flex gap-4 p-4 bg-white border border-stone-200 rounded-xl"
            >
              {/* Image placeholder */}
              <div className="w-24 h-24 bg-stone-50 rounded-lg flex items-center justify-center shrink-0 border border-stone-100">
                <ShoppingBag className="h-8 w-8 text-stone-300" />
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-medium text-stone-900 line-clamp-1">
                      {item.name}
                    </h3>
                    {item.isSubscription && (
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="success">
                          <RefreshCw className="h-3 w-3 mr-1" />
                          Subscription
                        </Badge>
                        <span className="text-xs text-stone-500">
                          {getSubscriptionIntervalLabel(item.intervalWeeks!)}
                        </span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1 text-stone-400 hover:text-red-500 transition-colors shrink-0"
                    aria-label="Remove item"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-3">
                  {/* Quantity */}
                  <div className="flex items-center border border-stone-200 rounded-lg">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity - 1)
                      }
                      className="p-2 text-stone-500 hover:text-stone-900 transition-colors"
                      aria-label="Decrease"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="px-3 text-sm font-medium text-stone-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                      className="p-2 text-stone-500 hover:text-stone-900 transition-colors"
                      aria-label="Increase"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="font-semibold text-stone-900">
                      {formatPrice(itemPrice * item.quantity)}
                    </p>
                    {item.isSubscription && (
                      <p className="text-xs text-stone-400 line-through">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Order Summary */}
      <div className="lg:col-span-1">
        <div className="sticky top-32 bg-stone-50 rounded-2xl p-6 border border-stone-200">
          <h2 className="text-lg font-semibold text-stone-900 mb-4">
            Order Summary
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-stone-500">Subtotal</span>
              <span className="text-stone-900 font-medium">
                {formatPrice(subtotal)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-stone-500">Shipping</span>
              <span className="text-stone-900 font-medium">
                {shipping === 0 ? (
                  <span className="text-emerald-600">Free</span>
                ) : (
                  formatPrice(shipping)
                )}
              </span>
            </div>
            {shipping > 0 && (
              <p className="text-xs text-amber-600">
                Add {formatPrice(49 - subtotal)} more for free shipping
              </p>
            )}
            <hr className="border-stone-200" />
            <div className="flex justify-between text-base">
              <span className="font-semibold text-stone-900">Total</span>
              <span className="font-bold text-stone-900">
                {formatPrice(total)}
              </span>
            </div>
          </div>

          <div className="mt-6 space-y-3">
            <Link href="/checkout">
              <Button fullWidth size="lg">
                <Lock className="h-4 w-4" />
                Proceed to Checkout
              </Button>
            </Link>
            <Link href="/shop" className="block">
              <Button variant="ghost" fullWidth>
                Continue Shopping
              </Button>
            </Link>
          </div>

          {/* Trust signals */}
          <div className="mt-6 pt-4 border-t border-stone-200 space-y-2">
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>Secure checkout with Stripe</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <Truck className="h-4 w-4 text-emerald-600" />
              <span>Free shipping on orders $49+</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
