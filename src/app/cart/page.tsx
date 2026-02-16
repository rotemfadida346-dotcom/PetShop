import { Metadata } from "next";
import Container from "@/components/ui/Container";
import CartContent from "@/components/cart/CartContent";

export const metadata: Metadata = {
  title: "עגלת קניות",
  description: "בדקו את העגלה שלכם והמשיכו לתשלום.",
};

export default function CartPage() {
  return (
    <div className="bg-card min-h-screen">
      <Container>
        <div className="py-8 md:py-12">
          <h1 className="text-3xl font-bold text-textPrimary tracking-tight mb-8">עגלת קניות</h1>
          <CartContent />
        </div>
      </Container>
    </div>
  );
}
