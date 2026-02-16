import { Metadata } from "next";
import Container from "@/components/ui/Container";
import IsraeliCheckoutForm from "@/components/checkout/IsraeliCheckoutForm";

export const metadata: Metadata = {
  title: "תשלום מאובטח",
  description: "השלימו את הרכישה בצורה מאובטחת - משלוחים בישראל בלבד.",
};

export default function CheckoutPage() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-8 md:py-12">
      <Container size="lg">
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary text-center mb-2">תשלום מאובטח</h1>
          <p className="text-text-secondary text-center">כמה פרטים אחרונים ומסיימים! 🎉</p>
        </div>
        <IsraeliCheckoutForm />
      </Container>
    </div>
  );
}
