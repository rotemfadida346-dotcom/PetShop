import { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "תנאי שימוש",
  description: "תנאי השימוש של Pawsome - הכללים וההתחייבויות בעת שימוש באתר ובשירותים שלנו.",
};

export default function TermsPage() {
  return (
    <div className="bg-card min-h-screen">
      <section className="bg-surface border-b border-border">
        <Container size="md">
          <div className="py-12 md:py-16">
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary">תנאי שימוש</h1>
            <p className="mt-3 text-text-secondary">עודכן לאחרונה: {new Date().toLocaleDateString('he-IL')}</p>
          </div>
        </Container>
      </section>

      <Container size="md">
        <div className="py-12 md:py-16 space-y-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text-primary">1. קבלת התנאים</h2>
            <p className="text-text-secondary leading-relaxed">
              באמצעות גישה לאתר Pawsome ושימוש בו, אתם מסכימים להיות מחויבים לתנאי השימוש הללו. אם אינכם מסכימים לתנאים אלו, אנא אל תשתמשו באתר.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text-primary">2. שימוש באתר</h2>
            <div className="space-y-3 text-text-secondary leading-relaxed">
              <p><strong className="text-text-primary">גיל מינימלי:</strong> עליכם להיות בני 18 לפחות כדי לבצע רכישות באתר.</p>
              <p><strong className="text-text-primary">חשבון:</strong> אתם אחראים לשמור על סודיות חשבונכם וסיסמתכם.</p>
              <p><strong className="text-text-primary">שימוש חוקי:</strong> אתם מסכימים להשתמש באתר רק למטרות חוקיות ובהתאם לתנאים אלו.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text-primary">3. מוצרים ותמחור</h2>
            <ul className="list-disc list-inside space-y-2 text-text-secondary leading-relaxed mr-4">
              <li>כל המחירים מוצגים בשקלים חדשים (₪) וכוללים מע״מ</li>
              <li>אנחנו שומרים על הזכות לשנות מחירים בכל עת ללא הודעה מוקדמת</li>
              <li>אנחנו עושים כל מאמץ לתאר ולהציג את המוצרים במדויק ככל האפשר</li>
              <li>אנחנו לא אחראים על טעויות טיפוגרפיות או שגיאות במחירים</li>
              <li>אנחנו שומרים על הזכות לבטל הזמנה אם המחיר שגוי באופן ברור</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text-primary">4. הזמנות ותשלום</h2>
            <div className="space-y-3 text-text-secondary leading-relaxed">
              <p><strong className="text-text-primary">אישור הזמנה:</strong> אתם תקבלו אימייל לאחר ביצוע הזמנה. ההזמנה כפופה לאישור וזמינות.</p>
              <p><strong className="text-text-primary">תשלום:</strong> אנחנו מקבלים תשלומים בכרטיס אשראי דרך Stripe. התשלום מעובד באופן מאובטח.</p>
              <p><strong className="text-text-primary">ביטול הזמנה:</strong> תוכלו לבטל הזמנה עד 24 שעות לאחר ביצועה, לפני שהיא נשלחת.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text-primary">5. משלוח</h2>
            <ul className="list-disc list-inside space-y-2 text-text-secondary leading-relaxed mr-4">
              <li>משלוח חינם בהזמנות מעל ₪200</li>
              <li>עלות משלוח: ₪25 בהזמנות מתחת ל-₪200</li>
              <li>זמן משלוח: 3-5 ימי עסקים בכל רחבי ישראל</li>
              <li>אנחנו לא אחראים על עיכובים שנגרמים על ידי חברות שילוח צד שלישי</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text-primary">6. החזרות והחזרים</h2>
            <div className="space-y-3 text-text-secondary leading-relaxed">
              <p><strong className="text-text-primary">אחריות 30 יום:</strong> תוכלו להחזיר מוצרים עד 30 יום מיום הקבלה.</p>
              <p><strong className="text-text-primary">תנאי החזרה:</strong> המוצר חייב להיות במצב חדש, לא נפתח ובאריזה המקורית.</p>
              <p><strong className="text-text-primary">החזר כספי:</strong> נחזיר את התשלום תוך 5-7 ימי עסקים לאחר קבלת המוצר.</p>
              <p className="text-body-sm text-text-muted">* למידע מפורט, ראו את <a href="/returns" className="text-accent hover:underline">מדיניות ההחזרות</a> המלאה.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text-primary">7. מנויים</h2>
            <ul className="list-disc list-inside space-y-2 text-text-secondary leading-relaxed mr-4">
              <li>מנויים מתחדשים אוטומטית בהתאם לתדירות שבחרתם (2, 4 או 6 שבועות)</li>
              <li>תוכלו לבטל, להשהות או לשנות את המנוי בכל עת דרך דף החשבון</li>
              <li>ביטול מנוי ייכנס לתוקף לאחר המשלוח הנוכחי</li>
              <li>אין עמלות ביטול</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text-primary">8. קניין רוחני</h2>
            <p className="text-text-secondary leading-relaxed">
              כל התוכן באתר, כולל טקסט, גרפיקה, לוגו, תמונות וקוד, הוא רכושה של Pawsome ומוגן על ידי חוקי זכויות יוצרים וקניין רוחני. אינכם רשאים להעתיק, לשכפל או להפיץ תוכן ללא אישור בכתב.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text-primary">9. הגבלת אחריות</h2>
            <p className="text-text-secondary leading-relaxed">
              Pawsome לא תהיה אחראית לנזקים עקיפים, מקריים, מיוחדים או תוצאתיים הנובעים משימוש באתר או מהמוצרים. השימוש באתר הוא על אחריותכם.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text-primary">10. שינויים בתנאים</h2>
            <p className="text-text-secondary leading-relaxed">
              אנחנו שומרים על הזכות לעדכן את תנאי השימוש בכל עת. שינויים ייכנסו לתוקף מיד עם פרסומם באתר. המשך השימוש באתר לאחר שינויים מהווה הסכמה לתנאים החדשים.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text-primary">11. דין ושיפוט</h2>
            <p className="text-text-secondary leading-relaxed">
              תנאים אלו כפופים לחוקי מדינת ישראל. כל סכסוך יידון בבתי המשפט המוסמכים בישראל.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text-primary">12. צרו קשר</h2>
            <p className="text-text-secondary leading-relaxed">
              אם יש לכם שאלות לגבי תנאי השימוש, צרו קשר:
            </p>
            <div className="bg-surface rounded-xl p-6 border border-border">
              <p className="text-text-primary"><strong>Pawsome</strong></p>
              <p className="text-text-secondary mt-2">אימייל: <a href="mailto:hello@pawsome.co.il" className="text-accent hover:underline">hello@pawsome.co.il</a></p>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
