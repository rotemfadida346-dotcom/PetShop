import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import ProductGrid from "@/components/product/ProductGrid";
import { getFeaturedProducts } from "@/lib/db/products";
import { getFeaturedProducts as getMockFeatured } from "@/lib/mock-data";
import { Truck, ShieldCheck, Leaf, Heart, Star, ArrowLeft } from "lucide-react";

export default async function HomePage() {
  let featuredProducts: Parameters<typeof ProductGrid>[0]["products"];
  try {
    featuredProducts = await getFeaturedProducts();
  } catch {
    featuredProducts = getMockFeatured();
  }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-brand-50 via-orange-50 to-amber-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-brand-200/30 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl" />
        </div>
        <Container>
          <div className="relative py-20 md:py-28 lg:py-36">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1]">
                🩺 פרימיום לחיות המחמד{" "}
                <span className="text-brand-500">שלכם</span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-lg leading-relaxed">
                מבחר מוצרים איכותיים: מזון, חטיפים, צעצועים, מיטות, כלובים ומגרדות
              </p>

              <p className="mt-3 text-base text-gray-500 font-medium">
                הירשמו למנוי לחיסכון של עד 10% על כל הזמנה עם משלוח חינם
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/shop">
                  <Button size="lg">
                    לחנות
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/quiz">
                  <Button variant="outline" size="lg">מצא את ההתאמה 🔍</Button>
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-1.5">
                  <Truck className="h-4 w-4 text-brand-500" />
                  <span>משלוח חינם מעל ₪200</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-brand-500" />
                  <span>אחריות 30 יום</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Trust Bar */}
      <section className="bg-white border-y border-gray-100 py-8">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: "מאושר ע״י וטרינרים", desc: "פותח עם תזונאים וטרינריים", color: "text-emerald-500" },
              { icon: Leaf, title: "מרכיבים טבעיים", desc: "ללא צבעים, טעמים או חומרים משמרים מלאכותיים", color: "text-green-500" },
              { icon: Truck, title: "משלוח חינם", desc: "בהזמנות מעל ₪200", color: "text-brand-500" },
              { icon: Heart, title: "אחריות שביעות רצון", desc: "החזר כספי תוך 30 יום", color: "text-rose-500" },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gray-50 rounded-2xl mb-3">
                  <item.icon className={`h-6 w-6 ${item.color}`} />
                </div>
                <h3 className="font-bold text-gray-900 text-sm">{item.title}</h3>
                <p className="text-xs text-muted mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Shop by Pet */}
      <section className="section-padding bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="section-heading">קנו לפי חיית מחמד</h2>
            <p className="section-subheading mx-auto mt-3">גלו תזונה פרימיום המותאמת לצרכים הייחודיים של חיית המחמד שלכם.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/shop?pet=DOG" className="group relative bg-gradient-to-br from-dog-50 to-orange-50 rounded-3xl p-8 md:p-12 overflow-hidden border border-dog-200/50 hover:shadow-xl hover:shadow-dog-200/30 hover:-translate-y-1 transition-all duration-300">
              <span className="text-6xl mb-4 block group-hover:scale-110 transition-transform duration-300">🐕</span>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-2">לכלבים</h3>
              <p className="text-gray-600 mb-4">מזון, חטיפים ותוספים פרימיום לכל גזע ושלב חיים.</p>
              <span className="inline-flex items-center gap-1.5 text-dog-600 font-bold text-sm group-hover:gap-2.5 transition-all">
                מוצרים לכלבים <ArrowLeft className="h-4 w-4" />
              </span>
            </Link>

            <Link href="/shop?pet=CAT" className="group relative bg-gradient-to-br from-cat-50 to-violet-50 rounded-3xl p-8 md:p-12 overflow-hidden border border-cat-200/50 hover:shadow-xl hover:shadow-cat-200/30 hover:-translate-y-1 transition-all duration-300">
              <span className="text-6xl mb-4 block group-hover:scale-110 transition-transform duration-300">🐈</span>
              <h3 className="text-2xl font-extrabold text-gray-900 mb-2">לחתולים</h3>
              <p className="text-gray-600 mb-4">ממזון גורמה ועד חול טבעי, הכל מה שהחתול שלכם ראוי לו.</p>
              <span className="inline-flex items-center gap-1.5 text-cat-600 font-bold text-sm group-hover:gap-2.5 transition-all">
                מוצרים לחתולים <ArrowLeft className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-surface">
        <Container>
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="section-heading">רבי מכר 🔥</h2>
              <p className="section-subheading mt-2">המוצרים הנבחרים ביותר על ידי אלפי בעלי חיות מחמד.</p>
            </div>
            <Link href="/shop" className="hidden md:inline-flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors">
              הצג הכל <ArrowLeft className="h-4 w-4" />
            </Link>
          </div>
          <ProductGrid products={featuredProducts} />
          <div className="mt-8 text-center md:hidden">
            <Link href="/shop"><Button variant="outline">הצג את כל המוצרים</Button></Link>
          </div>
        </Container>
      </section>

      {/* Subscription CTA */}
      <section className="section-padding bg-gradient-to-r from-brand-500 via-brand-600 to-orange-500 text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-60 h-60 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white/10 rounded-full blur-2xl" />
        </div>
        <Container size="md">
          <div className="text-center relative">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">מנוי וחיסכון עד 10% על כל הזמנה</h2>
            <p className="mt-4 text-lg text-white/80 max-w-xl mx-auto">
              לעולם לא תיגמרו מהמוצרים האהובים על חיית המחמד שלכם. קבעו לוח זמנים, חסכו בכל הזמנה, עצרו או בטלו בכל עת.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm font-medium">
              {[{ n: "1", t: "בחרו מוצרים" }, { n: "2", t: "קבעו לוח זמנים" }, { n: "3", t: "חסכו בכל משלוח" }].map((s) => (
                <div key={s.n} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><span className="font-extrabold">{s.n}</span></div>
                  <span>{s.t}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/subscriptions">
                <Button size="lg" className="bg-white text-brand-700 hover:bg-brand-50 shadow-lg">התחילו לחסוך עכשיו</Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Quiz CTA */}
      <section className="section-padding bg-white">
        <Container size="md">
          <div className="bg-gradient-to-br from-brand-50 to-amber-50 rounded-3xl p-8 md:p-16 text-center border border-brand-100">
            <span className="text-5xl mb-4 block">🔍</span>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">לא בטוחים מה לקנות?</h2>
            <p className="mt-4 text-lg text-gray-600 max-w-md mx-auto">
              ענו על השאלון הקצר שלנו וקבלו המלצות מוצרים מותאמות אישית לחיית המחמד שלכם.
            </p>
            <div className="mt-8">
              <Link href="/quiz"><Button size="lg">לשאלון <ArrowLeft className="h-4 w-4" /></Button></Link>
            </div>
            <p className="mt-4 text-sm text-gray-400">לוקח פחות מ-2 דקות</p>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-surface">
        <Container>
          <div className="text-center mb-12">
            <h2 className="section-heading">חיות מחמד מאושרות, בעלים מרוצים 💛</h2>
            <p className="section-subheading mx-auto mt-3">אל תסמכו רק על המילה שלנו.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "שרה מ.", pet: "אמא לגולדן רטריבר 🐕", quote: "הפרווה של הכלב שלי מעולם לא נראתה כל כך טוב! הפורמולה עם הסלמון היא מהפכה. בנוסף, המנוי עושה את זה כל כך קל.", rating: 5 },
              { name: "יעקב ר.", pet: "אבא ל-2 חתולים 🐈", quote: "סוף סוף מצאתי חול שבאמת שולט בריח. הגיבוש מדהים והאבק כמעט לא קיים. שני החתולים שלי התחילו להשתמש בו מיד.", rating: 5 },
              { name: "אמילי ק.", pet: "אמא לגור 🐶", quote: "הפורמולה לגורים הייתה מושלמת ללברדור הגדל שלנו. הוא פשוט אוהב את שעת האוכל. המשלוח האוטומטי אומר שאף פעם לא צריך לדאוג.", rating: 5 },
            ].map((review) => (
              <div key={review.name} className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed">&ldquo;{review.quote}&rdquo;</p>
                <div className="mt-6 pt-4 border-t border-gray-100">
                  <p className="font-bold text-gray-900">{review.name}</p>
                  <p className="text-sm text-muted">{review.pet}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
