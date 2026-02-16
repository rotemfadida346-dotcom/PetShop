import { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { CheckCircle, Package, ArrowLeft } from "lucide-react";

export const metadata: Metadata = { title: "ההזמנה אושרה" };

export default function CheckoutSuccessPage() {
  return (
    <div className="bg-white min-h-screen">
      <Container size="sm">
        <div className="py-20 text-center">
          <CheckCircle className="h-16 w-16 text-emerald-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-textPrimary mb-3">ההזמנה אושרה!</h1>
          <p className="text-lg text-textSecondary mb-8 max-w-md mx-auto">תודה על ההזמנה. נשלח לכם אימייל אישור עם פרטי מעקב בקרוב.</p>
          <div className="bg-background rounded-2xl p-8 mb-8 border border-gray-200 max-w-md mx-auto">
            <Package className="h-10 w-10 text-textPrimary mx-auto mb-3" />
            <h2 className="font-semibold text-textPrimary mb-1">מה קורה עכשיו?</h2>
            <ul className="text-sm text-textSecondary space-y-2 text-right mt-4">
              <li className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-gray-100 text-textPrimary text-xs font-bold flex items-center justify-center shrink-0">1</span>
                נכין את ההזמנה שלכם למשלוח
              </li>
              <li className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-gray-100 text-textPrimary text-xs font-bold flex items-center justify-center shrink-0">2</span>
                תקבלו מספר מעקב באימייל
              </li>
              <li className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-gray-100 text-textPrimary text-xs font-bold flex items-center justify-center shrink-0">3</span>
                המוצרים האהובים מגיעים עד הדלת!
              </li>
            </ul>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/account/orders"><Button variant="outline">ההזמנות שלי</Button></Link>
            <Link href="/shop"><Button>המשך קניות <ArrowLeft className="h-4 w-4" /></Button></Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
