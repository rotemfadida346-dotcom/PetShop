import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import ProductGrid from "@/components/product/ProductGrid";
import CategoryCards from "@/components/home/CategoryCards";
import { getFeaturedProducts } from "@/lib/db/products";
import { getFeaturedProducts as getMockFeatured } from "@/lib/mock-data";
import { Truck, ShieldCheck, Star, ArrowLeft, MessageCircle, MapPin, RefreshCw } from "lucide-react";

export default async function HomePage() {
  let featuredProducts: Parameters<typeof ProductGrid>[0]["products"];
  try { featuredProducts = await getFeaturedProducts(); }
  catch { featuredProducts = getMockFeatured(); }

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-bg via-bg-warm to-accent-50" />
        <div className="absolute inset-0"><div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/5 rounded-full blur-3xl" /></div>
        <Container>
          <div className="relative py-20 md:py-28 lg:py-36">
            <div className="max-w-2xl space-y-6">
              <h1 className="text-heading-hero md:text-5xl lg:text-6xl text-text-primary leading-[1.1]">
                כל מה שחיית המחמד שלכם צריכה —{" "}<span className="text-accent">במקום אחד</span>
              </h1>
              <p className="text-body-lg text-text-secondary max-w-lg">
                מבחר מוצרים איכותיים שנבחרו בקפידה: מזון, חטיפים, צעצועים, מיטות, כלובים, מגרדות ואביזרים — לכלבים ולחתולים.
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <Link href="/shop"><Button size="lg">לחנות <ArrowLeft className="h-4 w-4" /></Button></Link>
                <Link href="/quiz"><Button variant="outline" size="lg">התאמה אישית 🔍</Button></Link>
              </div>
              <div className="flex items-center gap-5 text-body-sm text-text-muted pt-2">
                <span className="flex items-center gap-1.5"><Truck className="h-4 w-4 text-accent" /> משלוח חינם מעל ₪200</span>
                <span className="flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-accent" /> אחריות 30 יום</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Trust Section - Above the Fold */}
      <section className="relative bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 py-16 md:py-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        <Container>
          <div className="relative">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">למה לקנות אצלנו?</h2>
              <p className="text-gray-300 text-lg">חנות ישראלית מקומית שדואגת לחיות המחמד שלכם</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  icon: MapPin, 
                  title: "משלוחים בישראל בלבד", 
                  desc: "שירות מקומי, אמין ומהיר לכל רחבי הארץ. אנחנו כאן בשבילכם.",
                  highlight: "🇮🇱"
                },
                { 
                  icon: Truck, 
                  title: "משלוח חינם מעל ₪200", 
                  desc: "חיסכון משמעותי על כל הזמנה. ככל שתזמינו יותר, תחסכו יותר.",
                  highlight: "📦"
                },
                { 
                  icon: MessageCircle, 
                  title: "שירות לקוחות אנושי", 
                  desc: "צוות ישראלי זמין בוואטסאפ ומייל. אנשים אמיתיים, לא בוטים.",
                  highlight: "👋"
                },
                { 
                  icon: RefreshCw, 
                  title: "החזרות פשוטות תוך 30 יום", 
                  desc: "לא מתאים? אין בעיה. מדיניות החזרות ברורה וללא סיבוכים.",
                  highlight: "✅"
                },
              ].map((item) => (
                <div key={item.title} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-all duration-300 hover:border-accent/30 group">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-accent/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      <item.icon className="h-7 w-7 text-accent" />
                    </div>
                    <span className="text-3xl">{item.highlight}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-300 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-gray-400 text-sm max-w-2xl mx-auto">
                אנחנו חנות ישראלית קטנה עם שירות אישי. כל הזמנה מטופלת בקפידה, 
                וצוות השירות שלנו זמין לכל שאלה. <strong className="text-white">אתם לא לבד בתהליך.</strong>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Pet cards */}
      <section className="py-12 md:py-16 bg-bg">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { href: "/shop?pet=DOG", emoji: "🐕", title: "לכלבים", desc: "מזון, חטיפים, צעצועים ואביזרים לכל גזע.", bg: "bg-dog-bg", color: "text-dog-text" },
              { href: "/shop?pet=CAT", emoji: "🐈", title: "לחתולים", desc: "מזון, חול, מגרדות וצעצועים לכל חתול.", bg: "bg-cat-bg", color: "text-cat-text" },
            ].map((p) => (
              <Link key={p.href} href={p.href} className={`group ${p.bg} rounded-2xl p-6 md:p-8 border border-border hover:border-accent/30 hover:-translate-y-1 transition-all duration-300 flex items-center gap-5`}>
                <span className="text-5xl group-hover:scale-110 transition-transform duration-300 shrink-0">{p.emoji}</span>
                <div>
                  <h3 className={`text-xl font-extrabold ${p.color} mb-1`}>{p.title}</h3>
                  <p className="text-body-sm text-text-secondary mb-2">{p.desc}</p>
                  <span className="inline-flex items-center gap-1 text-accent font-bold text-body-sm group-hover:gap-2 transition-all">לחנות <ArrowLeft className="h-3.5 w-3.5" /></span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Categories */}
      <section className="section-padding bg-surface">
        <Container>
          <div className="text-center mb-10 space-y-2"><h2 className="section-heading">קנו לפי קטגוריה</h2><p className="section-sub mx-auto">מזון, צעצועים, מיטות, כלובים, מגרדות — הכל כאן.</p></div>
          <CategoryCards />
        </Container>
      </section>

      {/* Featured */}
      <section className="section-padding bg-bg">
        <Container>
          <div className="flex items-end justify-between mb-10">
            <div className="space-y-2"><h2 className="section-heading">הנבחרים שלנו</h2><p className="section-sub">המוצרים הפופולריים ביותר בקרב הלקוחות.</p></div>
            <Link href="/shop" className="hidden md:inline-flex items-center gap-1.5 text-body-sm font-bold text-accent hover:text-accent-400 transition-colors">הצג הכל <ArrowLeft className="h-4 w-4" /></Link>
          </div>
          <ProductGrid products={featuredProducts} />
          <div className="mt-8 text-center md:hidden"><Link href="/shop"><Button variant="outline">הצג את כל המוצרים</Button></Link></div>
        </Container>
      </section>

      {/* Subscription */}
      <section className="section-padding bg-gradient-to-br from-accent-200 via-accent to-accent-400 text-white relative overflow-hidden">
        <div className="absolute inset-0"><div className="absolute -top-16 -right-16 w-72 h-72 bg-white/5 rounded-full blur-3xl" /></div>
        <Container size="md">
          <div className="text-center relative space-y-5">
            <h2 className="text-heading-xl text-white">מנוי וחיסכון — עד 10% על כל הזמנה</h2>
            <p className="text-body-lg text-white/70 max-w-xl mx-auto">בחרו מוצרים, קבעו תדירות, והמוצרים מגיעים עד הדלת. עצרו או בטלו בכל עת.</p>
            <div><Link href="/subscriptions"><Button size="lg" className="bg-white text-accent-200 hover:bg-white/90 shadow-xl">התחילו לחסוך</Button></Link></div>
          </div>
        </Container>
      </section>

      {/* Quiz */}
      <section className="section-padding bg-bg">
        <Container size="md">
          <div className="bg-card rounded-3xl p-8 md:p-14 text-center border border-card-border">
            <span className="text-5xl mb-3 block">🔍</span>
            <h2 className="text-heading-lg text-text-primary">לא בטוחים מה מתאים?</h2>
            <p className="mt-3 text-body-lg text-text-secondary max-w-md mx-auto">ענו על כמה שאלות קצרות ונתאים לכם מוצרים בדיוק לפי חיית המחמד שלכם.</p>
            <div className="mt-6"><Link href="/quiz"><Button size="lg">לשאלון <ArrowLeft className="h-4 w-4" /></Button></Link></div>
          </div>
        </Container>
      </section>

      {/* Reviews */}
      <section className="section-padding bg-surface">
        <Container>
          <div className="text-center mb-10 space-y-2"><h2 className="section-heading">לקוחות ממליצים</h2><p className="section-sub mx-auto">מה הלקוחות שלנו אומרים.</p></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              { name: "שרה מ.", pet: "🐕 גולדן רטריבר", q: "הפרווה של הכלב שלי מעולם לא נראתה כל כך טוב. המוצרים באיכות מדהימה והמשלוח הגיע מהר." },
              { name: "יעקב ר.", pet: "🐈 2 חתולים", q: "סוף סוף מצאתי חנות שבאמת מבינה חתולים. החול, המגרדת והמזון — הכל מושלם." },
              { name: "אמילי ק.", pet: "🐶 גור לברדור", q: "המנוי חוסך לי כסף וזמן. המוצרים מגיעים בזמן והאיכות תמיד גבוהה." },
            ].map((r) => (
              <div key={r.name} className="bg-card rounded-2xl p-7 border border-card-border hover:border-accent/20 transition-colors">
                <div className="flex items-center gap-0.5 mb-3">{[...Array(5)].map((_, i) => <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />)}</div>
                <p className="text-text-secondary leading-relaxed text-body-sm">&ldquo;{r.q}&rdquo;</p>
                <div className="mt-5 pt-4 border-t border-card-border"><p className="font-bold text-text-primary text-body-sm">{r.name}</p><p className="text-xs text-text-muted">{r.pet}</p></div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
