import { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { CheckCircle, Package, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "Your order has been placed successfully.",
};

export default function CheckoutSuccessPage() {
  return (
    <div className="bg-white min-h-screen">
      <Container size="sm">
        <div className="py-20 text-center">
          <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-6" />

          <h1 className="text-3xl font-bold text-stone-900 mb-3">
            Order Confirmed!
          </h1>
          <p className="text-lg text-stone-600 mb-8 max-w-md mx-auto">
            Thank you for your order. We&apos;ll send you a confirmation email
            with tracking details soon.
          </p>

          <div className="bg-stone-50 rounded-2xl p-8 mb-8 border border-stone-200 max-w-md mx-auto">
            <Package className="h-10 w-10 text-amber-600 mx-auto mb-3" />
            <h2 className="font-semibold text-stone-900 mb-1">
              What happens next?
            </h2>
            <ul className="text-sm text-stone-600 space-y-2 text-left mt-4">
              <li className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center shrink-0">
                  1
                </span>
                We&apos;ll prepare your order for shipment
              </li>
              <li className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center shrink-0">
                  2
                </span>
                You&apos;ll receive a tracking number via email
              </li>
              <li className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center justify-center shrink-0">
                  3
                </span>
                Your pet&apos;s favorites arrive at your door!
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/account/orders">
              <Button variant="outline">View My Orders</Button>
            </Link>
            <Link href="/shop">
              <Button>
                Continue Shopping
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
