import { Metadata } from "next";
import Container from "@/components/ui/Container";
import CartContent from "@/components/cart/CartContent";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Review your cart and proceed to checkout.",
};

export default function CartPage() {
  return (
    <div className="bg-white min-h-screen">
      <Container>
        <div className="py-8 md:py-12">
          <h1 className="text-3xl font-bold text-stone-900 tracking-tight mb-8">
            Shopping Cart
          </h1>
          <CartContent />
        </div>
      </Container>
    </div>
  );
}
