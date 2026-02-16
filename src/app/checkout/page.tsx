import { Metadata } from "next";
import Container from "@/components/ui/Container";
import CheckoutForm from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Complete your purchase securely.",
};

export default function CheckoutPage() {
  return (
    <div className="bg-stone-50 min-h-screen">
      <Container size="lg">
        <div className="py-8 md:py-12">
          <h1 className="text-3xl font-bold text-stone-900 tracking-tight mb-8">
            Checkout
          </h1>
          <CheckoutForm />
        </div>
      </Container>
    </div>
  );
}
