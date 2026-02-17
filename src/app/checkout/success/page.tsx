"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { CheckCircle, Package, ArrowLeft, Mail, Truck, Clock, MessageCircle } from "lucide-react";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "ORD-XXXXX";
  const total = searchParams.get("total") || "0";

  return (
    <div className="bg-gradient-to-b from-green-50 via-white to-gray-50 min-h-screen">
      <Container size="md">
        <div className="py-12 md:py-20">
          {/* Success Icon & Title */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
              <CheckCircle className="h-16 w-16 text-green-600" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
              ההזמנה התקבלה בהצלחה! 🎉
            </h1>
            <p className="text-lg text-text-secondary mb-2">
              תודה רבה על ההזמנה. אנחנו כבר עובדים על זה!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 max-w-md mx-auto">
              <div className="bg-gray-100 rounded-lg px-4 py-3 text-center">
                <p className="text-sm text-text-muted mb-1">מספר הזמנה</p>
                <p className="text-lg font-bold text-text-primary">{orderId}</p>
              </div>
              <div className="bg-emerald-50 rounded-lg px-4 py-3 text-center border-2 border-emerald-200">
                <p className="text-sm text-emerald-600 mb-1">סכום ששולם</p>
                <p className="text-lg font-bold text-emerald-700">₪{total}</p>
              </div>
            </div>
          </div>

          {/* What Happens Next */}
          <div className="bg-white rounded-2xl p-8 mb-8 border border-gray-200 shadow-sm max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <Package className="h-8 w-8 text-accent" />
              <h2 className="text-2xl font-bold text-text-primary">מה קורה עכשיו?</h2>
            </div>
            
            <div className="space-y-5">
              <div className="flex items-start gap-4 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="w-10 h-10 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg shrink-0">1</div>
                <div>
                  <h3 className="font-bold text-text-primary mb-1 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    קיבלתם אימייל אישור
                  </h3>
                  <p className="text-sm text-text-secondary">
                    שלחנו לכם אימייל עם כל פרטי ההזמנה. בדקו את תיבת הדואר (ואת תיקיית הספאם).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg shrink-0">2</div>
                <div>
                  <h3 className="font-bold text-text-primary mb-1 flex items-center gap-2">
                    <Package className="h-4 w-4" />
                    אנחנו מכינים את החבילה
                  </h3>
                  <p className="text-sm text-text-secondary">
                    ההזמנה שלכם תיארז בקפידה ותישלח תוך 24 שעות (בימי עסקים).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-lg shrink-0">3</div>
                <div>
                  <h3 className="font-bold text-text-primary mb-1 flex items-center gap-2">
                    <Truck className="h-4 w-4" />
                    החבילה בדרך אליכם
                  </h3>
                  <p className="text-sm text-text-secondary">
                    תקבלו מספר מעקב ותוכלו לעקוב אחרי המשלוח בזמן אמת. זמן אספקה: 3-5 ימי עסקים.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Need Help Section */}
          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 mb-8 text-white max-w-2xl mx-auto">
            <div className="flex items-center gap-3 mb-4">
              <MessageCircle className="h-7 w-7 text-accent" />
              <h2 className="text-2xl font-bold">יש שאלות? אנחנו כאן בשבילכם</h2>
            </div>
            <p className="text-gray-300 mb-5">
              צוות השירות שלנו זמין לכל שאלה, בעיה או בקשה. אנחנו כאן כדי לוודא שאתם מרוצים.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-sm text-gray-300 mb-1">וואטסאפ</p>
                <p className="font-bold" dir="ltr">050-123-4567</p>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <p className="text-sm text-gray-300 mb-1">אימייל</p>
                <p className="font-bold">hello@pawsome.co.il</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
            <Link href="/shop" className="w-full sm:w-auto">
              <Button size="lg" className="w-full bg-accent hover:bg-accent-400">
                המשך קניות
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/account/orders" className="w-full sm:w-auto">
              <Button variant="outline" size="lg" className="w-full">
                ההזמנות שלי
              </Button>
            </Link>
          </div>

          {/* Trust Footer */}
          <div className="text-center mt-10 text-sm text-gray-500 space-y-2">
            <p className="flex items-center justify-center gap-2">
              <Clock className="h-4 w-4" />
              זמן אספקה: 3-5 ימי עסקים לכל הארץ
            </p>
            <p>יש בעיה? ניתן להחזיר מוצרים תוך 30 יום ללא עלות</p>
          </div>
        </div>
      </Container>
    </div>
  );
}
