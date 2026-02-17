import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import ProductGrid from "@/components/product/ProductGrid";
import CategoryCards from "@/components/home/CategoryCards";
import { getFeaturedProducts } from "@/lib/db/products";
import { getFeaturedProducts as getMockFeatured } from "@/lib/mock-data";
import { Truck, ShieldCheck, Star, ArrowLeft, MessageCircle, MapPin, RefreshCw } from "lucide-react";

// Revalidate this page every 60 seconds
export const revalidate = 60;

export default async function HomePage() {
  let featuredProducts: Parameters<typeof ProductGrid>[0]["products"];
  try { featuredProducts = await getFeaturedProducts(); }
  catch { featuredProducts = getMockFeatured(); }

  return (
    <>
      {/* Hero - Mobile-First */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-accent/10 rounded-full blur-3xl" />
        </div>
        <Container>
          <div className="relative py-16 md:py-24 lg:py-32">
            <div className="max-w-3xl mx-auto text-center md:text-right">
              <div className="inline-block mb-4 px-4 py-2 bg-accent/10 rounded-full">
                <span className="text-sm font-bold text-accent">🇮🇱 החנות הפרימיום לחיות מחמד בישראל</span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold text-text-primary leading-tight mb-6">
                כל מה שחיית המחמד שלכם צריכה —{" "}
                <span className="text-accent block md:inline">במקום אחד</span>
              </h1>
              <p className="text-base md:text-lg lg:text-xl text-text-secondary max-w-2xl mx-auto md:mx-0 mb-8 leading-relaxed">
                מבחר מוצרים פרימיום שנבחרו בקפידה: מזון איכותי, חטיפים בריאים, צעצועים מעוצבים ואביזרים חכמים — לכלבים ולחתולים. 
                <strong className="text-text-primary"> משלוחים מהירים לכל הארץ.</strong>
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 mb-6">
                <Link href="/shop" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent-400 text-white font-bold px-8">
                    לחנות
                    <ArrowLeft className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/quiz" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-2">
                    התאמה אישית 🔍
                  </Button>
                </Link>
              </div>
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 text-sm text-text-muted pt-2">
                <span className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-accent" />
                  <span className="font-medium">משלוח חינם מעל ₪200</span>
                </span>
                <span className="hidden sm:inline text-gray-300">•</span>
                <span className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-accent" />
                  <span className="font-medium">אחריות 30 יום</span>
                </span>
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

      {/* Pet cards - Mobile Optimized */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-gray-50">
        <Container>
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-2">קנו לפי סוג חיית המחמד</h2>
            <p className="text-text-secondary">מוצרים מותאמים במיוחד לכלבים או לחתולים</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {[
              { 
                href: "/shop?pet=DOG", 
                emoji: "🐕", 
                title: "מוצרים לכלבים", 
                desc: "מזון פרימיום, חטיפים בריאים, צעצועים מעוררי עניין ואביזרים חכמים", 
                bg: "bg-gradient-to-br from-amber-50 to-orange-50", 
                border: "border-amber-200",
                color: "text-amber-900",
                products: "200+ מוצרים"
              },
              { 
                href: "/shop?pet=CAT", 
                emoji: "🐈", 
                title: "מוצרים לחתולים", 
                desc: "מזון מאוזן, חול מתגבש איכותי, מגרדות יציבות וצעצועים מרתקים", 
                bg: "bg-gradient-to-br from-purple-50 to-pink-50", 
                border: "border-purple-200",
                color: "text-purple-900",
                products: "150+ מוצרים"
              },
            ].map((p) => (
              <Link 
                key={p.href} 
                href={p.href} 
                className={`group ${p.bg} rounded-2xl p-6 md:p-8 border-2 ${p.border} hover:shadow-xl hover:-translate-y-1 transition-all duration-300 touch-target`}
              >
                <div className="flex items-start gap-4 md:gap-5">
                  <span className="text-5xl md:text-6xl group-hover:scale-110 transition-transform duration-300 shrink-0">{p.emoji}</span>
                  <div className="flex-1">
                    <h3 className={`text-xl md:text-2xl font-extrabold ${p.color} mb-2`}>{p.title}</h3>
                    <p className="text-sm md:text-base text-text-secondary mb-3 leading-relaxed">{p.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-text-muted bg-white rounded-full px-3 py-1">
                        {p.products}
                      </span>
                      <span className="inline-flex items-center gap-1 text-accent font-bold text-sm group-hover:gap-2 transition-all">
                        לחנות <ArrowLeft className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary mb-3">
              למה לקוחות בוחרים ב-Pawsome?
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              אנחנו לא רק חנות - אנחנו שותפים שלכם לטיפול בחיות המחמד
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 md:p-8 border-2 border-green-200">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-bold text-text-primary mb-2">מוצרים פרימיום בלבד</h3>
              <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                כל מוצר עובר בדיקה קפדנית ונבחר על ידי מומחי תזונה לחיות מחמד. רק הטוב ביותר נכנס לחנות שלנו.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 md:p-8 border-2 border-blue-200">
              <div className="text-4xl mb-4">🇮🇱</div>
              <h3 className="text-xl font-bold text-text-primary mb-2">חנות ישראלית 100%</h3>
              <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                שירות בעברית, משלוחים מהירים לכל הארץ, ותמיכה מקומית שמבינה את הצרכים שלכם. אנחנו כאן בשבילכם.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 md:p-8 border-2 border-purple-200">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-text-primary mb-2">חיסכון עם מנוי</h3>
              <p className="text-sm md:text-base text-text-secondary leading-relaxed">
                הירשמו למנוי וחסכו עד 15% על כל הזמנה. משלוח חינם תמיד, ואפשר לבטל בכל רגע.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Categories */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <Container>
          <div className="text-center mb-10 space-y-2">
            <h2 className="section-heading">קנו לפי קטגוריה</h2>
            <p className="section-sub mx-auto">מזון פרימיום, חטיפים בריאים, צעצועים מעוררי עניין ואביזרים חכמים</p>
          </div>
          <CategoryCards />
        </Container>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white border-y border-gray-200">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col md:flex-row items-center gap-3 text-center md:text-right">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center shrink-0">
                <span className="text-2xl">🔒</span>
              </div>
              <div>
                <h3 className="font-bold text-text-primary text-sm">תשלום מאובטח</h3>
                <p className="text-xs text-text-muted">SSL 256 bit</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-3 text-center md:text-right">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                <span className="text-2xl">✅</span>
              </div>
              <div>
                <h3 className="font-bold text-text-primary text-sm">אחריות 30 יום</h3>
                <p className="text-xs text-text-muted">החזר מלא</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-3 text-center md:text-right">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center shrink-0">
                <span className="text-2xl">🚚</span>
              </div>
              <div>
                <h3 className="font-bold text-text-primary text-sm">משלוח מהיר</h3>
                <p className="text-xs text-text-muted">1-3 ימי עסקים</p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-3 text-center md:text-right">
              <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
                <span className="text-2xl">🇮🇱</span>
              </div>
              <div>
                <h3 className="font-bold text-text-primary text-sm">חנות ישראלית</h3>
                <p className="text-xs text-text-muted">שירות בעברית</p>
              </div>
            </div>
          </div>
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

      {/* Subscription - Mobile Optimized */}
      <section className="section-padding bg-gradient-to-br from-accent-200 via-accent to-accent-400 text-white relative overflow-hidden">
        <div className="absolute inset-0"><div className="absolute -top-16 -right-16 w-72 h-72 bg-white/5 rounded-full blur-3xl" /></div>
        <Container size="md">
          <div className="text-center relative space-y-6">
            <div className="text-4xl md:text-5xl mb-4">🔄</div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
              מנוי וחיסכון — עד 15% על כל הזמנה
            </h2>
            <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed px-4">
              בחרו את המוצרים האהובים על חיית המחמד שלכם, קבעו תדירות נוחה, והמוצרים יגיעו אוטומטית עד הדלת. 
              <strong className="text-white"> משלוח חינם, ללא התחייבות.</strong> עצרו או בטלו בכל עת - בלחיצת כפתור.
            </p>
            <div className="pt-2">
              <Link href="/subscriptions">
                <Button size="lg" className="bg-white text-accent hover:bg-gray-50 shadow-2xl font-bold px-8 w-full sm:w-auto">
                  התחילו לחסוך עכשיו
                </Button>
              </Link>
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-white/80 pt-4">
              <span>✓ ללא התחייבות</span>
              <span className="hidden sm:inline">•</span>
              <span>✓ ביטול בקליק</span>
              <span className="hidden sm:inline">•</span>
              <span>✓ משלוח חינם תמיד</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Quiz - Mobile Optimized */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <Container size="md">
          <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6 md:p-12 lg:p-14 text-center border-2 border-gray-200 shadow-lg">
            <span className="text-5xl md:text-6xl mb-4 block">🔍</span>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              לא בטוחים מה המוצר המתאים?
            </h2>
            <p className="text-base md:text-lg text-text-secondary max-w-xl mx-auto leading-relaxed mb-6">
              ענו על 5 שאלות קצרות ונמצא לכם את המוצרים המושלמים בדיוק לפי הצרכים של חיית המחמד שלכם. 
              <strong className="text-text-primary"> זה לוקח רק 2 דקות!</strong>
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/quiz" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent-400 font-bold px-8">
                  התחילו את השאלון
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
            </div>
            <p className="text-sm text-text-muted mt-4">💡 חינם לחלוטין • ללא התחייבות</p>
          </div>
        </Container>
      </section>

      {/* Reviews - Enhanced with Photos */}
      <section className="section-padding bg-surface">
        <Container>
          <div className="text-center mb-12 space-y-2">
            <h2 className="section-heading">לקוחות מרוצים משתפים</h2>
            <p className="section-sub mx-auto">למעלה מ-5,000 בעלי חיות מחמד סומכים עלינו</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                name: "שרה מ.", 
                pet: "גולדן רטריבר - לוקי",
                image: "S",
                bg: "bg-gradient-to-br from-pink-100 to-purple-100",
                q: "הפרווה של לוקי מעולם לא נראתה כל כך טוב! המזון הפרימיום שקניתי כאן באמת עשה פלאים. גם השירות היה מצוין - קיבלתי ייעוץ אישי בבחירת המוצרים המתאימים." 
              },
              { 
                name: "דוד ל.", 
                pet: "חתולה פרסית - מיה",
                image: "D",
                bg: "bg-gradient-to-br from-blue-100 to-cyan-100",
                q: "סוף סוף מצאתי חנות שבאמת מבינה חתולים! החול המתגבש, המגרדת האיכותית והמזון הפרימיום - מיה מאושרת והבית נקי. ממליץ בחום!" 
              },
              { 
                name: "רחל כ.", 
                pet: "לברדור שוקולד - צ'רלי",
                image: "R",
                bg: "bg-gradient-to-br from-amber-100 to-orange-100",
                q: "המנוי החודשי הוא פשוט גאוני! חוסך לי המון זמן וכסף. המשלוחים מגיעים בדיוק בזמן, והאיכות תמיד מעולה. צ'רלי מתרגש בכל פעם שהחבילה מגיעה 😊" 
              },
            ].map((r) => (
              <div key={r.name} className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-accent/30 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-full ${r.bg} flex items-center justify-center text-2xl font-bold text-gray-700 shrink-0`}>
                    {r.image}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1 mb-1">
                      {[...Array(5)].map((_, i) => <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />)}
                    </div>
                    <p className="font-bold text-text-primary">{r.name}</p>
                    <p className="text-sm text-text-muted">{r.pet}</p>
                  </div>
                </div>
                <p className="text-text-secondary leading-relaxed text-sm">&ldquo;{r.q}&rdquo;</p>
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
                    <span>✓</span> לקוח מאומת
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          {/* Additional Social Proof */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-6 bg-white rounded-xl px-8 py-4 border border-gray-200">
              <div className="text-center">
                <p className="text-2xl font-bold text-text-primary">5,000+</p>
                <p className="text-xs text-text-muted">לקוחות מרוצים</p>
              </div>
              <div className="w-px h-10 bg-gray-200"></div>
              <div className="text-center">
                <p className="text-2xl font-bold text-text-primary">4.9/5</p>
                <p className="text-xs text-text-muted">דירוג ממוצע</p>
              </div>
              <div className="w-px h-10 bg-gray-200"></div>
              <div className="text-center">
                <p className="text-2xl font-bold text-text-primary">98%</p>
                <p className="text-xs text-text-muted">ממליצים לחברים</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
