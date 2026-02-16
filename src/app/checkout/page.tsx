import { Metadata } from "next";
import Container from "@/components/ui/Container";
import CheckoutForm from "@/components/checkout/CheckoutForm";

export const metadata: Metadata = {
  title: "תשלום",
  description: "השלימו את הרכישה בצורה מאובטחת.",
};

export default function CheckoutPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Container size="lg">
        <div className="py-8 md:py-12">
          <h1 className="text-3xl font-bold text-black tracking-tight mb-8">תשלום</h1>
          <CheckoutForm />
        </div>
      </Container>
    </div>
  );
}
