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
      <section className="relative bg-gray-50 overflow-hidden">
        <Container>
          <div className="relative py-20 md:py-32 lg:py-40">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-6 text-sm font-medium text-black border border-border">
                <ShieldCheck className="h-4 w-4" />
                מאושר על ידי וטרינרים
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black leading-[1.1]">
                מזון פרימיום שחיות המחמד שלכם{" "}
                <span className="text-muted">באמת יאהבו</span>
              </h1>

              <p className="mt-6 text-lg md:text-xl text-muted max-w-lg leading-relaxed">
                מרכיבים טבעיים, מאושר על ידי וטרינרים. הירשמו למנוי וחסכו עד 10% על כל הזמנה עם משלוח חינם.
              </p>

              <p className="mt-3 text-sm text-muted-dark font-medium">
                📦 משלוחים בכל רחבי ישראל בלבד
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/shop">
                  <Button size="lg">
                    לחנות
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/quiz">
                  <Button variant="outline" size="lg">מצא את ההתאמה</Button>
                </Link>
              </div>

              <div className="mt-10 flex items-center gap-6 text-sm text-muted">
                <div className="flex items-center gap-1.5">
                  <Truck className="h-4 w-4 text-black" />
                  <span>משלוח חינם מעל ₪200</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-black" />
                  <span>אחריות 30 יום</span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Trust Bar */}
      <section className="bg-white border-y border-border py-8">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: "מאושר ע״י וטרינרים", desc: "פותח עם תזונאים וטרינריים" },
              { icon: Leaf, title: "מרכיבים טבעיים", desc: "ללא צבעים, טעמים או חומרים משמרים מלאכותיים" },
              { icon: Truck, title: "משלוח חינם", desc: "בהזמנות מעל ₪200" },
              { icon: Heart, title: "אחריות שביעות רצון", desc: "החזר כספי תוך 30 יום" },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <item.icon className="h-8 w-8 text-black mx-auto mb-3" />
                <h3 className="font-semibold text-black text-sm">{item.title}</h3>
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
            <Link href="/shop?pet=DOG" className="group relative bg-gray-50 rounded-2xl p-8 md:p-12 overflow-hidden border border-border hover:border-gray-300 hover:shadow-lg transition-all duration-300">
              <span className="text-5xl mb-4 block">🐕</span>
              <h3 className="text-2xl font-bold text-black mb-2">לכלבים</h3>
              <p className="text-muted mb-4">מזון, חטיפים ותוספים פרימיום לכל גזע ושלב חיים.</p>
              <span className="inline-flex items-center gap-1 text-black font-medium text-sm group-hover:gap-2 transition-all">
                מוצרים לכלבים <ArrowLeft className="h-4 w-4" />
              </span>
            </Link>

            <Link href="/shop?pet=CAT" className="group relative bg-gray-50 rounded-2xl p-8 md:p-12 overflow-hidden border border-border hover:border-gray-300 hover:shadow-lg transition-all duration-300">
              <span className="text-5xl mb-4 block">🐈</span>
              <h3 className="text-2xl font-bold text-black mb-2">לחתולים</h3>
              <p className="text-muted mb-4">ממזון גורמה ועד חול טבעי, הכל מה שהחתול שלכם ראוי לו.</p>
              <span className="inline-flex items-center gap-1 text-black font-medium text-sm group-hover:gap-2 transition-all">
                מוצרים לחתולים <ArrowLeft className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-gray-50">
        <Container>
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="section-heading">רבי מכר</h2>
              <p className="section-subheading mt-2">המוצרים הנבחרים ביותר על ידי אלפי בעלי חיות מחמד.</p>
            </div>
            <Link href="/shop" className="hidden md:inline-flex items-center gap-1 text-sm font-medium text-black hover:text-muted transition-colors">
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
      <section className="section-padding bg-black text-white">
        <Container size="md">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">מנוי וחיסכון עד 10% על כל הזמנה</h2>
            <p className="mt-4 text-lg text-gray-400 max-w-xl mx-auto">
              לעולם לא תיגמרו מהמוצרים האהובים על חיית המחמד שלכם. קבעו לוח זמנים, חסכו בכל הזמנה, עצרו או בטלו בכל עת.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-8 text-sm">
              {[{ n: "1", t: "בחרו מוצרים" }, { n: "2", t: "קבעו לוח זמנים" }, { n: "3", t: "חסכו בכל משלוח" }].map((s) => (
                <div key={s.n} className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center"><span className="font-bold">{s.n}</span></div>
                  <span>{s.t}</span>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link href="/shop">
                <Button variant="secondary" size="lg" className="bg-white text-black hover:bg-gray-100">התחילו לחסוך עכשיו</Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Quiz CTA */}
      <section className="section-padding bg-white">
        <Container size="md">
          <div className="bg-gray-50 rounded-2xl p-8 md:p-16 text-center border border-border">
            <span className="text-4xl mb-4 block">🔍</span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black">לא בטוחים מה לקנות?</h2>
            <p className="mt-4 text-lg text-muted max-w-md mx-auto">
              ענו על השאלון הקצר שלנו וקבלו המלצות מוצרים מותאמות אישית לחיית המחמד שלכם.
            </p>
            <div className="mt-8">
              <Link href="/quiz"><Button size="lg">לשאלון <ArrowLeft className="h-4 w-4" /></Button></Link>
            </div>
            <p className="mt-4 text-sm text-muted">לוקח פחות מ-2 דקות</p>
          </div>
        </Container>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-gray-50">
        <Container>
          <div className="text-center mb-12">
            <h2 className="section-heading">חיות מחמד מאושרות, בעלים מרוצים</h2>
            <p className="section-subheading mx-auto mt-3">אל תסמכו רק על המילה שלנו.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "שרה מ.", pet: "אמא לגולדן רטריבר", quote: "הפרווה של הכלב שלי מעולם לא נראתה כל כך טוב! הפורמולה עם הסלמון היא מהפכה. בנוסף, המנוי עושה את זה כל כך קל.", rating: 5 },
              { name: "יעקב ר.", pet: "אבא ל-2 חתולים", quote: "סוף סוף מצאתי חול שבאמת שולט בריח. הגיבוש מדהים והאבק כמעט לא קיים. שני החתולים שלי התחילו להשתמש בו מיד.", rating: 5 },
              { name: "אמילי ק.", pet: "אמא לגור", quote: "הפורמולה לגורים הייתה מושלמת ללברדור הגדל שלנו. הוא פשוט אוהב את שעת האוכל. המשלוח האוטומטי אומר שאף פעם לא צריך לדאוג.", rating: 5 },
            ].map((review) => (
              <div key={review.name} className="bg-white rounded-2xl p-8 border border-border">
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-black text-black" />
                  ))}
                </div>
                <p className="text-muted leading-relaxed">&ldquo;{review.quote}&rdquo;</p>
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="font-semibold text-black">{review.name}</p>
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
