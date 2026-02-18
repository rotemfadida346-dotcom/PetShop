import { Metadata } from "next";
import Container from "@/components/ui/Container";
import { RotateCcw, CheckCircle2, XCircle, Package, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "מדיניות החזרות",
  description: "מידע על החזרת מוצרים, החזרים כספיים ותהליך ההחזרה ב-PawStory.",
};

export default function ReturnsPage() {
  return (
    <div className="bg-card min-h-screen">
      <section className="bg-surface border-b border-border">
        <Container size="md">
          <div className="py-12 md:py-16">
            <div className="text-center">
              <RotateCcw className="h-12 w-12 text-accent mx-auto mb-4" />
              <h1 className="text-3xl md:text-4xl font-bold text-text-primary">מדיניות החזרות</h1>
              <p className="mt-3 text-text-secondary max-w-xl mx-auto">
                לא מרוצים? אין בעיה. יש לכם 30 יום להחזיר מוצרים — ללא שאלות.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <Container size="md">
        <div className="py-12 md:py-16 space-y-12">
          {/* 30-Day Guarantee */}
          <section className="bg-gradient-to-br from-accent-200 to-accent-400 rounded-2xl p-8 md:p-12 text-white text-center">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl font-bold mb-4">🛡️ אחריות 30 יום</h2>
              <p className="text-lg text-white/90 leading-relaxed">
                אנחנו מאמינים במוצרים שלנו. אם חיית המחמד שלכם לא מרוצה מהמוצר, 
                תוכלו להחזיר אותו תוך 30 יום וקבל החזר כספי מלא.
              </p>
            </div>
          </section>

          {/* What Can Be Returned */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-text-primary">מה אפשר להחזיר?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle2 className="h-6 w-6 text-green-600" />
                  <h3 className="font-bold text-green-900">ניתן להחזרה ✅</h3>
                </div>
                <ul className="space-y-2 text-green-800 text-sm">
                  <li>• מוצרים שלא נפתחו באריזה המקורית</li>
                  <li>• מוצרים שנקנו ב-30 הימים האחרונים</li>
                  <li>• מוצרים במצב חדש ותקין</li>
                  <li>• צעצועים, אביזרים ומיטות שלא שומשו</li>
                  <li>• מוצרים שהתקבלו פגומים או שגויים</li>
                </ul>
              </div>

              <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <XCircle className="h-6 w-6 text-red-600" />
                  <h3 className="font-bold text-red-900">לא ניתן להחזרה ❌</h3>
                </div>
                <ul className="space-y-2 text-red-800 text-sm">
                  <li>• מזון או חטיפים שנפתחו (מטעמי בריאות)</li>
                  <li>• מוצרים מותאמים אישית או במיוחד</li>
                  <li>• מוצרים שנפגעו כתוצאה משימוש</li>
                  <li>• מוצרים ללא האריזה המקורית</li>
                  <li>• מוצרים שנקנו במבצע &quot;חיסול מלאי&quot;</li>
                </ul>
              </div>
            </div>

            <div className="bg-accent/5 rounded-xl p-5 border border-accent/20">
              <p className="text-text-primary">
                💡 <strong>חריג:</strong> אם המוצר הגיע פגום, שגוי או פג תוקף — אפשר להחזיר גם אם נפתח!
              </p>
            </div>
          </section>

          {/* Return Process */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-text-primary">תהליך ההחזרה</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { 
                  step: "1", 
                  title: "צרו קשר", 
                  desc: "שלחו מייל ל-hello@pawsome.co.il עם מספר הזמנה",
                  icon: Package 
                },
                { 
                  step: "2", 
                  title: "אישור", 
                  desc: "נשלח לכם תווית משלוח חזרה תוך 24 שעות",
                  icon: CheckCircle2 
                },
                { 
                  step: "3", 
                  title: "שליחה", 
                  desc: "אורזו את המוצר ושלחו עם התווית שקיבלתם",
                  icon: RotateCcw 
                },
                { 
                  step: "4", 
                  title: "החזר כספי", 
                  desc: "תקבלו החזר תוך 5-7 ימי עסקים",
                  icon: Clock 
                },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 bg-accent text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                    {item.step}
                  </div>
                  <h3 className="font-semibold text-text-primary mb-2">{item.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Refund Info */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-text-primary">החזרים כספיים</h2>
            
            <div className="bg-surface rounded-2xl p-8 border border-border space-y-5">
              <div>
                <h3 className="font-semibold text-text-primary mb-2">כמה זמן לוקח החזר?</h3>
                <p className="text-text-secondary leading-relaxed">
                  ברגע שנקבל את המוצר חזרה, נעבד את ההחזר תוך 2-3 ימי עסקים. 
                  הכסף יחזור לאותו אמצעי תשלום ששימש לרכישה תוך 5-7 ימי עסקים נוספים.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-text-primary mb-2">האם יש עמלת החזרה?</h3>
                <p className="text-text-secondary leading-relaxed">
                  <strong className="text-text-primary">לא!</strong> אין עמלת החזרה. אם המוצר פגום או שגוי, אנחנו גם משלמים את עלות המשלוח חזרה.
                  אם פשוט לא התאים לכם, תצטרכו לשלם רק את עלות המשלוח חזרה (כ-₪25).
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-text-primary mb-2">מה עם עלות המשלוח המקורי?</h3>
                <ul className="text-text-secondary space-y-2 mr-5">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                    <span>אם המוצר פגום או שגוי: נחזיר גם את עלות המשלוח</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                    <span>אם שינתם דעה: עלות המשלוח לא מוחזרת</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Exchanges */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-text-primary">החלפות</h2>
            
            <div className="bg-surface rounded-2xl p-8 border border-border">
              <p className="text-text-secondary leading-relaxed mb-4">
                כרגע אנחנו לא מציעים החלפות ישירות. אם רוצים מוצר אחר, תוכלו:
              </p>
              <ol className="space-y-3 mr-5 text-text-secondary">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-accent shrink-0">1.</span>
                  <span>להחזיר את המוצר המקורי וקבל החזר כספי מלא</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-accent shrink-0">2.</span>
                  <span>להזמין את המוצר החדש שרוצים באתר</span>
                </li>
              </ol>
              <p className="text-sm text-text-muted mt-5">
                💡 זה מבטיח שתקבלו את המוצר החדש מהר ככל האפשר!
              </p>
            </div>
          </section>

          {/* Damaged or Wrong Items */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-text-primary">קיבלתם מוצר פגום או שגוי?</h2>
            
            <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8">
              <h3 className="font-bold text-red-900 mb-4 text-lg">אנחנו מצטערים מאוד! 😔</h3>
              <p className="text-red-800 mb-5 leading-relaxed">
                אם המוצר שקיבלתם פגום, שגוי או לא במצב מושלם — זו האחריות שלנו ונתקן את זה מיד.
              </p>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-red-900">מה לעשות:</h4>
                <ol className="space-y-2 text-red-800 mr-5">
                  <li>1. צלמו תמונות של המוצר והאריזה</li>
                  <li>2. שלחו אימייל ל-<a href="mailto:hello@pawsome.co.il" className="underline font-medium">hello@pawsome.co.il</a> תוך 48 שעות</li>
                  <li>3. נשלח לכם החלפה בחינם או נבצע החזר כספי מלא + עלות המשלוח</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Subscription Returns */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-text-primary">החזרות על מנויים</h2>
            
            <div className="bg-surface rounded-2xl p-8 border border-border">
              <p className="text-text-secondary leading-relaxed mb-4">
                מנויים פועלים קצת אחרת:
              </p>
              <ul className="space-y-3 text-text-secondary">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span>אפשר להחזיר את המשלוח הראשון אם לא התאים (תוך 30 יום)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span>אפשר לבטל את המנוי בכל עת — ללא עמלות</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                  <span>משלוחים שכבר נשלחו לא ניתנים להחזר (אלא אם פגומים)</span>
                </li>
              </ul>
            </div>
          </section>

          {/* Contact Info */}
          <div className="bg-gradient-to-br from-accent-200 to-accent-400 rounded-2xl p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-3">צריכים עזרה עם החזרה?</h3>
            <p className="text-white/90 mb-6 max-w-xl mx-auto">
              צוות השירות שלנו כאן לעזור לכם בכל שלב!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:hello@pawsome.co.il">
                <button className="px-8 py-3 bg-white text-accent-200 rounded-lg font-semibold hover:bg-white/90 transition-colors shadow-xl">
                  שלחו מייל
                </button>
              </a>
              <a href="/contact">
                <button className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-colors">
                  צרו קשר
                </button>
              </a>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
