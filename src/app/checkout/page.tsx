import { Metadata } from "next";
import Container from "@/components/ui/Container";
import EnhancedCheckoutForm from "@/components/checkout/EnhancedCheckoutForm";

export const metadata: Metadata = {
  title: "השלמת הזמנה - תשלום מאובטח",
  description: "השלימו את הרכישה בצורה מאובטחת - בחרו אמצעי תשלום והשלימו את ההזמנה.",
};

export default function CheckoutPage() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-8 md:py-12">
      <Container size="lg">
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-2">השלמת הזמנה</h1>
          <p className="text-text-secondary">כמה פרטים אחרונים ומסיימים את התהליך 🎉</p>
        </div>
        <EnhancedCheckoutForm />
      </Container>
    </div>
  );
}
