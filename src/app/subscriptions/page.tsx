import { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import ProductGrid from "@/components/product/ProductGrid";
import { getProducts } from "@/lib/db/products";
import { filterProducts as filterMock } from "@/lib/mock-data";
import {
  RefreshCw,
  Truck,
  Pause,
  ArrowLeft,
  Check,
  ShieldCheck,
  Calendar,
  Percent,
} from "lucide-react";

export const metadata: Metadata = {
  title: "מנויים - חסכו עד 15%",
  description: "הירשמו למנוי וקבלו את המוצרים האהובים ישירות עד הדלת. חסכו עד 15%, משלוח חינם, עצרו או בטלו בכל עת.",
};

export default async function SubscriptionsPage() {
  let products: Parameters<typeof ProductGrid>[0]["products"] = [];

  try {
    const result = await getProducts({ subscription: "true", limit: 12 });
    products = result.products;
  } catch {
    products = filterMock({}).filter((p) => p.subscriptionDiscount > 0);
  }

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="bg-black text-white">
        <Container>
          <div className="py-16 md:py-24 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 mb-6 text-sm font-medium">
              <RefreshCw className="h-4 w-4" />
              מנוי וחיסכון
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
              לעולם לא תיגמרו מהמוצרים האהובים
            </h1>
            <p className="mt-6 text-lg text-gray-400 max-w-xl mx-auto leading-relaxed">
              הירשמו למנוי, בחרו תדירות משלוח, וחסכו עד 15% על כל הזמנה. משלוח חינם, ללא התחייבות.
            </p>
            <div className="mt-8">
              <a href="#products">
                <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                  צפו במוצרים למנוי
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </a>
            </div>
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="section-padding bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="section-heading">איך זה עובד?</h2>
            <p className="section-subheading mx-auto mt-3">שלושה צעדים פשוטים לחיסכון מתמשך</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: "1",
                icon: Check,
                title: "בחרו מוצרים",
                desc: "בחרו את המוצרים שחיית המחמד שלכם אוהבת מתוך המגוון שלנו.",
              },
              {
                step: "2",
                icon: Calendar,
                title: "קבעו תדירות",
                desc: "בחרו משלוח כל שבועיים, 4 שבועות, או 6 שבועות — מה שמתאים לכם.",
              },
              {
                step: "3",
                icon: Percent,
                title: "חסכו בכל משלוח",
                desc: "קבלו הנחה אוטומטית של עד 15% על כל משלוח מנוי.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-xl font-bold">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-black mb-2">{item.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="section-padding bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="section-heading">למה כדאי להירשם למנוי?</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Percent, title: "חסכון עד 15%", desc: "הנחה אוטומטית על כל משלוח מנוי" },
              { icon: Truck, title: "משלוח חינם", desc: "משלוח חינם על כל הזמנות מנוי" },
              { icon: Pause, title: "גמישות מלאה", desc: "עצרו, דלגו או בטלו בכל עת — ללא התחייבות" },
              { icon: ShieldCheck, title: "ללא הפתעות", desc: "אותו מחיר, אותה איכות, בכל משלוח" },
            ].map((item) => (
              <div key={item.title} className="text-center p-6 bg-gray-50 rounded-2xl border border-border hover:shadow-md transition-shadow">
                <item.icon className="h-8 w-8 text-black mx-auto mb-3" />
                <h3 className="font-semibold text-black mb-1">{item.title}</h3>
                <p className="text-xs text-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Frequency Options */}
      <section className="section-padding bg-gray-50">
        <Container size="md">
          <div className="text-center mb-10">
            <h2 className="section-heading">בחרו את התדירות שלכם</h2>
            <p className="section-subheading mx-auto mt-3">אפשר לשנות בכל עת</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { weeks: 2, label: "כל שבועיים", desc: "למשפחות עם חיות מחמד גדולות או מספר חיות" },
              { weeks: 4, label: "כל 4 שבועות", desc: "הפופולרי ביותר — מתאים לרוב חיות המחמד", popular: true },
              { weeks: 6, label: "כל 6 שבועות", desc: "לחיות מחמד קטנות או צריכה נמוכה" },
            ].map((opt) => (
              <div
                key={opt.weeks}
                className={`relative p-6 rounded-2xl border-2 text-center transition-all ${
                  opt.popular ? "border-black bg-white shadow-md" : "border-border bg-white hover:border-gray-300"
                }`}
              >
                {opt.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-black text-white text-xs font-bold px-3 py-1 rounded-full">
                    הכי פופולרי
                  </span>
                )}
                <RefreshCw className="h-6 w-6 text-black mx-auto mb-3" />
                <h3 className="text-lg font-bold text-black">{opt.label}</h3>
                <p className="text-xs text-muted mt-2">{opt.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Products */}
      <section id="products" className="section-padding bg-white">
        <Container>
          <div className="text-center mb-10">
            <h2 className="section-heading">מוצרים זמינים למנוי</h2>
            <p className="section-subheading mx-auto mt-3">
              בחרו מוצר, עברו לדף המוצר, ובחרו באופציית ״מנוי וחיסכון״
            </p>
          </div>

          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="text-center py-12">
              <p className="text-muted">אין מוצרים זמינים למנוי כרגע.</p>
            </div>
          )}
        </Container>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-gray-50">
        <Container size="md">
          <h2 className="section-heading text-center mb-10">שאלות נפוצות על מנויים</h2>

          <div className="space-y-4 max-w-2xl mx-auto">
            {[
              { q: "איך מבטלים מנוי?", a: "אפשר לבטל בכל עת דרך דף החשבון שלכם. אין התחייבות ואין עמלת ביטול." },
              { q: "אפשר לשנות את תדירות המשלוח?", a: "כן! ניתן לשנות מכל שבועיים ועד כל 6 שבועות ישירות מדף המנויים בחשבון." },
              { q: "מה ההנחה על מנויים?", a: "ההנחה משתנה לפי מוצר — בין 10% ל-15% על כל משלוח מנוי." },
              { q: "אפשר להשהות מנוי זמנית?", a: "בוודאי! ניתן להשהות מנוי ולחדש אותו בכל עת שנוח לכם." },
              { q: "האם המשלוח באמת חינם?", a: "כן, כל הזמנות מנוי נהנות ממשלוח חינם בכל רחבי ישראל." },
            ].map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl border border-border p-5">
                <h3 className="font-semibold text-black mb-2">{faq.q}</h3>
                <p className="text-sm text-muted leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="section-padding bg-black text-white">
        <Container size="sm">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">מוכנים להתחיל לחסוך?</h2>
            <p className="mt-4 text-gray-400 max-w-md mx-auto">
              בחרו מוצר, הירשמו למנוי, ותתחילו ליהנות ממשלוח אוטומטי עם הנחה.
            </p>
            <div className="mt-8">
              <Link href="/shop?subscription=true">
                <Button size="lg" className="bg-white text-black hover:bg-gray-100">
                  לחנות — מוצרים למנוי
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
