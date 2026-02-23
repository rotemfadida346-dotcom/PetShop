"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { CheckCircle, Package, ArrowLeft, Mail, Truck, Clock, MessageCircle, Phone } from "lucide-react";

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId") || "ORD-XXXXX";
  const total = searchParams.get("total") || "0";
  const isPhoneOrder = searchParams.get("phone") === "true";

  return (
    <div className="bg-gradient-to-b from-green-50 via-white to-gray-50 min-h-screen">
      <Container size="md">
        <div className="py-12 md:py-20">
          {/* Success Icon & Title */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6">
              {isPhoneOrder ? <Phone className="h-16 w-16 text-green-600" /> : <CheckCircle className="h-16 w-16 text-green-600" />}
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-3">
              {isPhoneOrder ? "פרטי ההזמנה נשמרו! 📞" : "ההזמנה התקבלה בהצלחה! 🎉"}
            </h1>
            <p className="text-lg text-text-secondary mb-2">
              {isPhoneOrder 
                ? "עכשיו התקשר אלינו להשלמת ההזמנה ולקבלת ייעוץ אישי"
                : "תודה רבה על ההזמנה. אנחנו כבר עובדים על זה!"
              }
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
          {isPhoneOrder ? (
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8 mb-8 border-2 border-emerald-300 shadow-lg max-w-2xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <Phone className="h-10 w-10 text-emerald-600" />
                <h2 className="text-2xl font-bold text-text-primary">השלב הבא - התקשר אלינו!</h2>
              </div>
              
              <div className="text-center mb-6">
                <a 
                  href="tel:0509555350"
                  className="inline-block bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold py-5 px-10 rounded-xl transition-colors shadow-xl text-2xl"
                >
                  <Phone className="h-6 w-6 inline ml-2" />
                  050-9555350
                </a>
                <p className="text-sm text-emerald-700 mt-3 font-medium">לחץ להתקשרות מיידית</p>
              </div>

              <div className="space-y-4 bg-white rounded-lg p-5 border border-emerald-200">
                <h3 className="font-bold text-text-primary flex items-center gap-2 mb-3">
                  <Clock className="h-5 w-5 text-emerald-600" />
                  מה יקרה בשיחה?
                </h3>
                <div className="space-y-3 text-sm text-text-secondary">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">1</span>
                    <p><strong className="text-text-primary">נאשר את פרטי ההזמנה</strong> - נוודא שהכל נכון</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">2</span>
                    <p><strong className="text-text-primary">נספק ייעוץ מקצועי</strong> - נוודא שבחרת נכון</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">3</span>
                    <p><strong className="text-text-primary">נשלים את התשלום</strong> - בכרטיס אשראי בטלפון</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0">4</span>
                    <p><strong className="text-text-primary">נשלח את ההזמנה</strong> - המוצרים בדרך אליך!</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <h4 className="font-bold text-blue-900 mb-2 text-sm">שעות פעילות:</h4>
                <div className="text-sm text-blue-800 space-y-1">
                  <p>🕐 <strong>ימים א׳-ה׳:</strong> 9:00 - 18:00</p>
                  <p>🕐 <strong>יום ו׳:</strong> 9:00 - 13:00</p>
                  <p>🕐 <strong>מוצ״ש:</strong> מצאת השבת - 22:00</p>
                </div>
              </div>
            </div>
          ) : (
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
          )}

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
              <a href="tel:0509555350" className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors">
                <p className="text-sm text-gray-300 mb-1">טלפון</p>
                <p className="font-bold text-xl" dir="ltr">050-9555350</p>
              </a>
              <a href="mailto:support@pawstory.com" className="bg-white/10 hover:bg-white/20 rounded-lg p-4 transition-colors">
                <p className="text-sm text-gray-300 mb-1">אימייל</p>
                <p className="font-bold">support@pawstory.com</p>
              </a>
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
