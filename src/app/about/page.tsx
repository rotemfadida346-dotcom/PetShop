import { Metadata } from "next";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { Heart, Leaf, ShieldCheck, Award, ArrowLeft, Truck } from "lucide-react";

export const metadata: Metadata = { title: "הסיפור שלנו" };

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-20 md:py-32">
        <Container size="md">
          <div className="text-center">
            <div className="inline-block mb-6">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-xl">P</span>
                </div>
                <span className="text-3xl font-extrabold text-text-primary">PawStory</span>
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary mb-6">
              החנות הפרימיום לחיות מחמד בישראל
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
              אנחנו מאמינים שחיות המחמד שלכם מגיע להן הטוב ביותר. 
              כל מוצר בחנות שלנו נבחר בקפידה מתוך אהבה אמיתית לחיות ורצון לתת להן את החיים הכי טובים.
            </p>
          </div>
        </Container>
      </section>

      {/* Our Story */}
      <section className="section-padding bg-white">
        <Container size="md">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-text-primary mb-6 text-center">הסיפור שלנו 📖</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-text-secondary leading-relaxed mb-4">
                הכל התחיל כשאני, המייסד של PawStory, חיפשתי מזון איכותי ללוקי - הגולדן רטריבר האהוב שלי. 
                הבנתי שבישראל חסר מקום אחד שבו אפשר למצוא מוצרים פרימיום באמת, עם שירות אישי ומקצועי.
              </p>
              <p className="text-text-secondary leading-relaxed mb-4">
                אחרי חודשים של מחקר, פגישות עם וטרינרים ותזונאים, ובדיקת עשרות מותגים - 
                פתחנו את PawStory בשנת 2024. החזון היה פשוט: <strong className="text-text-primary">לייבא ולהנגיש את המוצרים הטובים ביותר לבעלי חיות מחמד בישראל.</strong>
              </p>
              <p className="text-text-secondary leading-relaxed mb-4">
                היום, אנחנו גאים לשרת למעלה מ-5,000 משפחות בכל רחבי הארץ. 
                כל מוצר שאנחנו מוכרים עבר בדיקה קפדנית, וצוות השירות שלנו זמין לייעץ ולתמוך בכל שלב.
              </p>
              <p className="text-text-secondary leading-relaxed">
                אנחנו לא סתם חנות אינטרנט - <strong className="text-text-primary">אנחנו קהילה של אנשים שאוהבים חיות מחמד</strong> ורוצים לתת להן את החיים הכי טובים שאפשר. 🐾
              </p>
            </div>
          </div>
        </Container>
      </section>
      {/* Our Values */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">הערכים שלנו</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">מה שמניע אותנו כל יום</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { 
                icon: Award, 
                emoji: "🏆",
                title: "איכות ללא פשרות", 
                desc: "כל מוצר נבחר בקפידה ונבדק לפני הוספה לחנות. רק המיטב מהמיטב." 
              }, 
              { 
                icon: Heart, 
                emoji: "🤝",
                title: "שירות אישי", 
                desc: "אנחנו כאן לייעץ ולעזור בבחירת המוצרים המתאימים לחיית המחמד שלכם." 
              }, 
              { 
                icon: Leaf, 
                emoji: "🌱",
                title: "בריאות ורווחה", 
                desc: "מתמחים במוצרים שתורמים לבריאות ולאושר של חיות המחמד." 
              }, 
              { 
                icon: ShieldCheck, 
                emoji: "✨",
                title: "שקיפות מלאה", 
                desc: "כל מוצר מגיע עם מידע מפורט על רכיבים, מקור וייצור." 
              }
            ].map((v) => (
              <div key={v.title} className="text-center bg-white rounded-2xl p-8 border border-gray-200 hover:border-accent/30 hover:shadow-lg transition-all">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mx-auto mb-5">
                  <span className="text-4xl">{v.emoji}</span>
                </div>
                <h3 className="text-xl font-bold text-text-primary mb-3">{v.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      {/* Why Choose Us */}
      <section className="section-padding bg-white">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">למה לבחור ב-PawStory?</h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">אנחנו לא רק חנות - אנחנו שותפים בטיפול בחיות המחמד שלכם</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold text-text-primary mb-3">מוצרים נבחרים בקפידה</h3>
              <p className="text-text-secondary leading-relaxed">
                כל מוצר עובר בדיקה קפדנית של צוות המומחים שלנו. 
                אנחנו עובדים רק עם מותגים שעומדים בסטנדרטים הגבוהים ביותר של איכות ובטיחות.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
              <div className="text-4xl mb-4">💬</div>
              <h3 className="text-2xl font-bold text-text-primary mb-3">ייעוץ מקצועי בחינם</h3>
              <p className="text-text-secondary leading-relaxed">
                הצוות שלנו כולל יועצי תזונה לחיות מחמד. 
                נשמח לעזור לכם לבחור את המוצרים המתאימים ביותר לחיית המחמד שלכם - ללא עלות.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 border-2 border-purple-200">
              <div className="text-4xl mb-4">📦</div>
              <h3 className="text-2xl font-bold text-text-primary mb-3">משלוחים מהירים לכל הארץ</h3>
              <p className="text-text-secondary leading-relaxed">
                אנחנו עובדים עם שירותי המשלוח הטובים ביותר בישראל. 
                רוב ההזמנות מגיעות תוך 1-3 ימי עסקים, ואנחנו תמיד זמינים למעקב.
              </p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border-2 border-amber-200">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-2xl font-bold text-text-primary mb-3">אחריות ושקט נפשי</h3>
              <p className="text-text-secondary leading-relaxed">
                לא מתאים? לא בעיה. יש לכם 30 יום להחזיר כל מוצר - ללא שאלות, ללא סיבוכים. 
                הרווחה של חיית המחמד שלכם היא העדיפות שלנו.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-gradient-to-b from-gray-50 to-white">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-3">במספרים</h2>
            <p className="text-text-secondary">הנתונים מדברים בעד עצמם</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { value: "5,000+", label: "לקוחות מרוצים בכל הארץ", emoji: "👥" }, 
              { value: "15,000+", label: "משלוחים הושלמו", emoji: "📦" }, 
              { value: "4.9/5", label: "דירוג ממוצע", emoji: "⭐" }, 
              { value: "98%", label: "שביעות רצון לקוחות", emoji: "❤️" }
            ].map((stat) => (
              <div key={stat.label} className="text-center bg-white rounded-2xl p-6 border border-gray-200">
                <div className="text-3xl mb-2">{stat.emoji}</div>
                <p className="text-3xl md:text-4xl font-bold text-accent mb-2">{stat.value}</p>
                <p className="text-sm text-text-secondary leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      {/* Team Section */}
      <section className="section-padding bg-white">
        <Container size="md">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-3">הצוות שלנו</h2>
            <p className="text-text-secondary">אנשים שחיים ונושמים חיות מחמד</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-blue-700">
                מ
              </div>
              <h3 className="font-bold text-text-primary mb-1">מיכל ש.</h3>
              <p className="text-sm text-accent font-medium mb-2">מייסדת ומנכ״לית</p>
              <p className="text-sm text-text-secondary">בעלת 3 כלבים ויועצת תזונה מוסמכת לחיות מחמד</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-green-700">
                ד
              </div>
              <h3 className="font-bold text-text-primary mb-1">דניאל כ.</h3>
              <p className="text-sm text-accent font-medium mb-2">מנהל שירות לקוחות</p>
              <p className="text-sm text-text-secondary">בעל 2 חתולים ו-15 שנות ניסיון בתחום חיות המחמד</p>
            </div>
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center mx-auto mb-4 text-3xl font-bold text-purple-700">
                ר
              </div>
              <h3 className="font-bold text-text-primary mb-1">רונית מ.</h3>
              <p className="text-sm text-accent font-medium mb-2">מנהלת מוצר</p>
              <p className="text-sm text-text-secondary">בעלת כלבה ומומחית לבחירת מוצרים איכותיים</p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <Container size="sm">
          <div className="text-center">
            <div className="text-5xl mb-6">🐾</div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              מוכנים להצטרף למשפחת PawStory?
            </h2>
            <p className="text-lg text-gray-300 max-w-md mx-auto mb-8">
              הצטרפו לאלפי בעלי חיות מחמד שכבר נהנים ממוצרים איכותיים ושירות מעולה. 
              נסו ללא סיכון עם אחריות 30 יום.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/shop">
                <Button size="lg" className="bg-accent hover:bg-accent-400 text-white w-full sm:w-auto">
                  לחנות
                  <ArrowLeft className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/quiz">
                <Button variant="outline" size="lg" className="border-gray-500 text-white hover:bg-white/10 w-full sm:w-auto">
                  לשאלון ההתאמה
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-green-400" />
                אחריות 30 יום
              </span>
              <span className="flex items-center gap-1.5">
                <Truck className="h-4 w-4 text-green-400" />
                משלוח חינם מעל ₪200
              </span>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
