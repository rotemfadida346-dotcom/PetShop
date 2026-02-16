import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import ProductGrid from "@/components/product/ProductGrid";
import CategoryCards from "@/components/home/CategoryCards";
import { getFeaturedProducts } from "@/lib/db/products";
import { getFeaturedProducts as getMockFeatured } from "@/lib/mock-data";
import { Truck, ShieldCheck, Leaf, Heart, Star, ArrowLeft } from "lucide-react";

export default async function HomePage() {
  let featuredProducts: Parameters<typeof ProductGrid>[0]["products"];
  try { featuredProducts = await getFeaturedProducts(); }
  catch { featuredProducts = getMockFeatured(); }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-surface to-accent-50">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
        </div>
        <Container>
          <div className="relative py-20 md:py-28 lg:py-36">
            <div className="max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-textPrimary leading-[1.1]">
                🩺 פרימיום לחיות המחמד{" "}<span className="text-accent">שלכם</span>
              </h1>
              <p className="mt-6 text-body-lg text-textSecondary max-w-lg leading-relaxed">מבחר מוצרים איכותיים: מזון, חטיפים, צעצועים, מיטות, כלובים ומגרדות</p>
              <p className="mt-3 text-base text-textMuted font-medium">הירשמו למנוי לחיסכון של עד 10% על כל הזמנה עם משלוח חינם</p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Link href="/shop"><Button size="lg">לחנות <ArrowLeft className="h-4 w-4" /></Button></Link>
                <Link href="/quiz"><Button variant="outline" size="lg">מצא את ההתאמה 🔍</Button></Link>
              </div>
              <div className="mt-10 flex items-center gap-6 text-sm text-textSecondary">
                <div className="flex items-center gap-1.5"><Truck className="h-4 w-4 text-accent" /><span>משלוח חינם מעל ₪200</span></div>
                <div className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-accent" /><span>אחריות 30 יום</span></div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Trust Bar */}
      <section className="bg-surface border-y border-border py-10">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: "מאושר ע״י וטרינרים", desc: "פותח עם תזונאים וטרינריים" },
              { icon: Leaf, title: "מרכיבים טבעיים", desc: "ללא צבעים, טעמים או חומרים משמרים מלאכותיים" },
              { icon: Truck, title: "משלוח חינם", desc: "בהזמנות מעל ₪200" },
              { icon: Heart, title: "אחריות שביעות רצון", desc: "החזר כספי תוך 30 יום" },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-2xl mb-3"><item.icon className="h-6 w-6 text-accent" /></div>
                <h3 className="font-bold text-textPrimary text-sm">{item.title}</h3>
                <p className="text-xs text-textMuted mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Pet Cards */}
      <section className="py-12 md:py-16 bg-background">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <Link href="/shop?pet=DOG" className="group bg-card rounded-xl p-6 md:p-8 border border-border hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1 transition-all duration-300 flex items-center gap-5">
              <span className="text-5xl group-hover:scale-110 transition-transform duration-300 shrink-0">🐕</span>
              <div>
                <h3 className="text-xl font-extrabold text-textPrimary mb-1">לכלבים</h3>
                <p className="text-sm text-textSecondary mb-2">מזון, חטיפים ותוספים פרימיום לכל גזע.</p>
                <span className="inline-flex items-center gap-1 text-accent font-bold text-sm group-hover:gap-2 transition-all">לחנות <ArrowLeft className="h-3.5 w-3.5" /></span>
              </div>
            </Link>
            <Link href="/shop?pet=CAT" className="group bg-card rounded-xl p-6 md:p-8 border border-border hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 hover:-translate-y-1 transition-all duration-300 flex items-center gap-5">
              <span className="text-5xl group-hover:scale-110 transition-transform duration-300 shrink-0">🐈</span>
              <div>
                <h3 className="text-xl font-extrabold text-textPrimary mb-1">לחתולים</h3>
                <p className="text-sm text-textSecondary mb-2">מזון גורמה, חול טבעי ומגרדות.</p>
                <span className="inline-flex items-center gap-1 text-accent font-bold text-sm group-hover:gap-2 transition-all">לחנות <ArrowLeft className="h-3.5 w-3.5" /></span>
              </div>
            </Link>
          </div>
        </Container>
      </section>

      {/* Category Cards */}
      <section className="section-padding bg-surface">
        <Container>
          <div className="text-center mb-12">
            <h2 className="section-heading">קנו לפי קטגוריה</h2>
            <p className="section-subheading mx-auto mt-3">כל מה שחיית המחמד שלכם צריכה, במקום אחד.</p>
          </div>
          <CategoryCards />
        </Container>
      </section>

      {/* Featured Products */}
      <section className="section-padding bg-background">
        <Container>
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="section-heading">הנבחרים שלנו</h2>
              <p className="section-subheading mt-2">המוצרים הנבחרים ביותר על ידי אלפי בעלי חיות מחמד.</p>
            </div>
            <Link href="/shop" className="hidden md:inline-flex items-center gap-1.5 text-sm font-bold text-accent hover:text-accent-600 transition-colors">הצג הכל <ArrowLeft className="h-4 w-4" /></Link>
          </div>
          <ProductGrid products={featuredProducts} />
          <div className="mt-8 text-center md:hidden"><Link href="/shop"><Button variant="outline">הצג את כל המוצרים</Button></Link></div>
        </Container>
      </section>

      {/* Subscription CTA */}
      <section className="section-padding bg-gradient-to-r from-accent-200 via-accent to-accent-400 text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-60 h-60 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white/5 rounded-full blur-2xl" />
        </div>
        <Container size="md">
          <div className="text-center relative">
            <h2 className="text-heading-xl text-white">מנוי וחיסכון עד 10% על כל הזמנה</h2>
            <p className="mt-4 text-body-lg text-white/70 max-w-xl mx-auto">לעולם לא תיגמרו מהמוצרים האהובים. קבעו לוח זמנים, חסכו בכל הזמנה, עצרו או בטלו בכל עת.</p>
            <div className="mt-8"><Link href="/subscriptions"><Button size="lg" className="bg-white text-accent-700 hover:bg-gray-100 shadow-lg">התחילו לחסוך עכשיו</Button></Link></div>
          </div>
        </Container>
      </section>

      {/* Quiz CTA */}
      <section className="section-padding bg-background">
        <Container size="md">
          <div className="bg-card rounded-2xl p-8 md:p-16 text-center shadow-lg border border-border">
            <span className="text-5xl mb-4 block">🔍</span>
            <h2 className="text-heading-lg text-textPrimary">לא בטוחים מה לקנות?</h2>
            <p className="mt-4 text-body-lg text-textSecondary max-w-md mx-auto">ענו על השאלון הקצר שלנו וקבלו המלצות מותאמות אישית.</p>
            <div className="mt-8"><Link href="/quiz"><Button size="lg">לשאלון <ArrowLeft className="h-4 w-4" /></Button></Link></div>
            <p className="mt-4 text-sm text-textMuted">לוקח פחות מ-2 דקות</p>
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
              { name: "שרה מ.", pet: "🐕 גולדן רטריבר", quote: "הפרווה של הכלב שלי מעולם לא נראתה כל כך טוב! הפורמולה עם הסלמון היא מהפכה.", rating: 5 },
              { name: "יעקב ר.", pet: "🐈 2 חתולים", quote: "סוף סוף מצאתי חול שבאמת שולט בריח. שני החתולים שלי התחילו להשתמש בו מיד.", rating: 5 },
              { name: "אמילי ק.", pet: "🐶 גור לברדור", quote: "הפורמולה לגורים הייתה מושלמת. הוא פשוט אוהב את שעת האוכל.", rating: 5 },
            ].map((r) => (
              <div key={r.name} className="bg-card rounded-xl p-8 border border-border hover:border-accent/30 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center gap-0.5 mb-4">{[...Array(r.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}</div>
                <p className="text-textSecondary leading-relaxed">&ldquo;{r.quote}&rdquo;</p>
                <div className="mt-6 pt-4 border-t border-border"><p className="font-bold text-textPrimary">{r.name}</p><p className="text-sm text-textMuted">{r.pet}</p></div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
