import { Metadata } from "next";
import Container from "@/components/ui/Container";
import { Truck, Package, MapPin, Clock, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "מדיניות משלוחים",
  description: "מידע על משלוחים, עלויות, זמני אספקה ומעקב הזמנות ב-PawStory.",
};

export default function ShippingPage() {
  return (
    <div className="bg-card min-h-screen">
      <section className="bg-surface border-b border-border">
        <Container size="md">
          <div className="py-12 md:py-16">
            <div className="text-center">
              <Truck className="h-12 w-12 text-accent mx-auto mb-4" />
              <h1 className="text-3xl md:text-4xl font-bold text-text-primary">מדיניות משלוחים</h1>
              <p className="mt-3 text-text-secondary max-w-xl mx-auto">
                כל מה שצריך לדעת על משלוחים, זמני אספקה ומעקב הזמנות.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Container size="md">
        <div className="py-12 md:py-16 space-y-12">
          {/* Shipping Costs */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-text-primary">עלויות משלוח</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-gradient-to-br from-accent-200 to-accent-400 rounded-2xl p-8 text-white border-2 border-accent-300 shadow-lg">
                <CheckCircle2 className="h-8 w-8 mb-4" />
                <h3 className="text-2xl font-bold mb-2">משלוח חינם 🎉</h3>
                <p className="text-lg mb-1">בהזמנות מעל ₪200</p>
                <p className="text-white/80 text-sm">לכל רחבי ישראל</p>
              </div>

              <div className="bg-surface rounded-2xl p-8 border border-border">
                <Package className="h-8 w-8 text-text-primary mb-4" />
                <h3 className="text-2xl font-bold text-text-primary mb-2">משלוח רגיל</h3>
                <p className="text-lg text-text-primary mb-1">₪25</p>
                <p className="text-text-secondary text-sm">בהזמנות מתחת ל-₪200</p>
              </div>
            </div>

            <div className="bg-accent/5 rounded-xl p-5 border border-accent/20">
              <p className="text-text-primary font-medium">
                💡 <strong>טיפ:</strong> מנויים מקבלים משלוח חינם על כל הזמנה — ללא מינימום!
              </p>
            </div>
          </section>

          {/* Delivery Times */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-text-primary">זמני אספקה</h2>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-surface rounded-xl p-6 border border-border">
                <Clock className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-text-primary mb-2">משלוח רגיל</h3>
                  <p className="text-text-secondary">3-5 ימי עסקים לכל רחבי ישראל</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-surface rounded-xl p-6 border border-border">
                <MapPin className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-text-primary mb-2">אזורים מרוחקים</h3>
                  <p className="text-text-secondary">5-7 ימי עסקים (אילת, הנגב, הגליל העליון)</p>
                </div>
              </div>

              <div className="flex items-start gap-4 bg-surface rounded-xl p-6 border border-border">
                <CheckCircle2 className="h-6 w-6 text-accent shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-text-primary mb-2">משלוח מהיר</h3>
                  <p className="text-text-secondary">הזמנות שמבוצעות לפני 12:00 בצהריים נשלחות באותו יום עסקים</p>
                </div>
              </div>
            </div>
          </section>

          {/* Shipping Process */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-text-primary">תהליך המשלוח</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { step: "1", title: "הזמנה", desc: "אתם מבצעים הזמנה באתר" },
                { step: "2", title: "אישור", desc: "אנחנו מאשרים ומעבדים את ההזמנה" },
                { step: "3", title: "אריזה", desc: "אנחנו אורזים ושולחים תוך 24 שעות" },
                { step: "4", title: "משלוח", desc: "ההזמנה בדרך אליכם עם מעקב" },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-text-primary mb-2">{item.title}</h3>
                  <p className="text-sm text-text-secondary">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Order Tracking */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-text-primary">מעקב אחר הזמנה</h2>
            
            <div className="bg-surface rounded-2xl p-8 border border-border space-y-4">
              <p className="text-text-secondary leading-relaxed">
                ברגע שההזמנה שלך נשלחת, תקבלו אימייל עם מספר מעקב ולינק למעקב בזמן אמת.
              </p>
              
              <div className="space-y-3">
                <h3 className="font-semibold text-text-primary">איך לעקוב:</h3>
                <ul className="space-y-2 text-text-secondary mr-5">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>היכנסו לדף <strong className="text-text-primary">החשבון שלי</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>לחצו על <strong className="text-text-primary">ההזמנות שלי</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>בחרו את ההזמנה ותראו את סטטוס המשלוח</span>
                  </li>
                </ul>
              </div>

              <p className="text-sm text-text-muted">
                אפשר גם להשתמש במספר המעקב שקיבלתם באימייל כדי לעקוב באתר חברת השליחויות.
              </p>
            </div>
          </section>

          {/* Shipping Partners */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-text-primary">שותפי משלוח</h2>
            <p className="text-text-secondary">
              אנחנו עובדים עם חברות שילוח מובילות בישראל כדי להבטיח משלוח מהיר ובטוח:
            </p>
            <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {["דואר ישראל", "UPS", "FedEx", "DHL"].map((company) => (
                <li
                  key={company}
                  className="bg-surface rounded-xl p-4 border border-border text-center font-semibold text-text-primary"
                >
                  {company}
                </li>
              ))}
            </ul>
          </section>

          {/* International Shipping */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-text-primary">משלוחים בינלאומיים</h2>
            <div className="bg-surface rounded-2xl p-8 border border-border">
              <p className="text-text-secondary leading-relaxed">
                כרגע אנחנו משלחים רק בתוך ישראל. אנחנו עובדים על הרחבת השירות לחו״ל בקרוב! 
                הירשמו לניוזלטר שלנו כדי להתעדכן כשנתחיל למשלוח בינלאומי.
              </p>
            </div>
          </section>

          {/* Delivery Issues */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-text-primary">בעיות במשלוח</h2>
            
            <div className="space-y-4">
              <div className="bg-surface rounded-xl p-6 border border-border">
                <h3 className="font-semibold text-text-primary mb-3">החבילה איחרה</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  אם עברו יותר מ-7 ימי עסקים ולא קיבלתם את החבילה, צרו קשר במייל <a href="mailto:hello@pawsome.co.il" className="text-accent hover:underline">hello@pawsome.co.il</a> עם מספר ההזמנה ונברר מה קרה.
                </p>
              </div>

              <div className="bg-surface rounded-xl p-6 border border-border">
                <h3 className="font-semibold text-text-primary mb-3">החבילה הגיעה פגומה</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  אם החבילה הגיעה פגומה או שהמוצר נפגע, צלמו תמונות ושלחו לנו תוך 48 שעות. נשלח החלפה בחינם או נבצע החזר כספי מלא.
                </p>
              </div>

              <div className="bg-surface rounded-xl p-6 border border-border">
                <h3 className="font-semibold text-text-primary mb-3">לא הייתי בבית</h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  השליח ישאיר הודעה ותוכלו לתאם משלוח חוזר או לאסוף מנקודת חלוקה קרובה. פרטים יהיו במספר המעקב.
                </p>
              </div>
            </div>
          </section>

          {/* Contact CTA */}
          <div className="bg-gradient-to-br from-accent-200 to-accent-400 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-3">יש שאלות נוספות על משלוחים?</h3>
            <p className="text-white/90 mb-6 max-w-xl mx-auto">
              צוות השירות שלנו כאן כדי לעזור!
            </p>
            <a href="/contact">
              <button className="px-8 py-3 bg-white text-accent-200 rounded-lg font-semibold hover:bg-white/90 transition-colors shadow-xl">
                צרו קשר
              </button>
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
