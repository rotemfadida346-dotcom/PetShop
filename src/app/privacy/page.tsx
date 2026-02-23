import { Metadata } from "next";
import Container from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "מדיניות פרטיות",
  description: "מדיניות הפרטיות של PawStory - איך אנחנו אוספים, משתמשים ומגנים על המידע האישי שלכם.",
};

export default function PrivacyPage() {
  return (
    <div className="bg-card min-h-screen">
      <section className="bg-surface border-b border-border">
        <Container size="md">
          <div className="py-12 md:py-16">
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary">מדיניות פרטיות</h1>
            <p className="mt-3 text-text-secondary">עודכן לאחרונה: {new Date().toLocaleDateString('he-IL')}</p>
          </div>
        </Container>
      </section>

      <Container size="md">
        <div className="py-12 md:py-16 space-y-10">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text-primary">1. מבוא</h2>
            <p className="text-text-secondary leading-relaxed">
              ב-PawStory, אנחנו מחויבים להגן על הפרטיות שלכם. מדיניות פרטיות זו מסבירה איך אנחנו אוספים, משתמשים, חולקים ומגנים על המידע האישי שלכם כאשר אתם משתמשים באתר שלנו.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text-primary">2. מידע שאנחנו אוספים</h2>
            <div className="space-y-3 text-text-secondary leading-relaxed">
              <p><strong className="text-text-primary">מידע אישי:</strong> שם, כתובת אימייל, כתובת למשלוח, פרטי תשלום.</p>
              <p><strong className="text-text-primary">מידע על חיית המחמד:</strong> סוג חיית המחמד, גיל, גודל, העדפות תזונה (אם מספקים דרך השאלון).</p>
              <p><strong className="text-text-primary">נתוני שימוש:</strong> כתובת IP, סוג דפדפן, דפים שביקרתם, זמן ותאריך הביקור.</p>
              <p><strong className="text-text-primary">עוגיות (Cookies):</strong> אנחנו משתמשים בעוגיות כדי לשפר את חוויית המשתמש, לעקוב אחר העגלה ולנתח נתוני תנועה.</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text-primary">3. איך אנחנו משתמשים במידע</h2>
            <ul className="list-disc list-inside space-y-2 text-text-secondary leading-relaxed mr-4">
              <li>לעבד הזמנות ולספק את המוצרים שלכם</li>
              <li>לשלוח עדכוני הזמנה ואישורים</li>
              <li>לשפר את האתר והשירותים שלנו</li>
              <li>לשלוח מבצעים וחדשות שיווקיות (אם הסכמתם)</li>
              <li>למנוע הונאה ולאבטח את האתר</li>
              <li>לציית לחובות חוקיות</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text-primary">4. שיתוף מידע עם צדדים שלישיים</h2>
            <p className="text-text-secondary leading-relaxed">
              אנחנו לא מוכרים או משכירים את המידע האישי שלכם. אנחנו עשויים לשתף מידע עם:
            </p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary leading-relaxed mr-4">
              <li><strong className="text-text-primary">ספקי שירות:</strong> כמו Stripe (עיבוד תשלומים), Vercel (אירוח), Supabase (מסד נתונים)</li>
              <li><strong className="text-text-primary">שותפי משלוח:</strong> כדי לספק את ההזמנות שלכם</li>
              <li><strong className="text-text-primary">גורמי אכיפת חוק:</strong> אם נדרש על פי חוק</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text-primary">5. אבטחת מידע</h2>
            <p className="text-text-secondary leading-relaxed">
              אנחנו משתמשים באמצעי אבטחה סטנדרטיים בתעשייה כולל הצפנת SSL, אחסון מאובטח במסדי נתונים, ועיבוד תשלומים מאובטח דרך Stripe. עם זאת, שום שיטת העברה דרך האינטרנט אינה מאובטחת ב-100%.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text-primary">6. הזכויות שלכם</h2>
            <p className="text-text-secondary leading-relaxed">יש לכם זכות:</p>
            <ul className="list-disc list-inside space-y-2 text-text-secondary leading-relaxed mr-4">
              <li>לגשת למידע האישי שלכם</li>
              <li>לתקן מידע לא מדויק</li>
              <li>לבקש מחיקת המידע שלכם</li>
              <li>להסיר הסכמה לשיווק</li>
              <li>להתנגד לעיבוד המידע שלכם</li>
            </ul>
            <p className="text-text-secondary leading-relaxed mt-3">
              כדי לממש את הזכויות שלכם, צרו קשר במייל: <a href="mailto:privacy@pawstory.com" className="text-accent hover:underline">privacy@pawstory.com</a>
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text-primary">7. שמירת מידע</h2>
            <p className="text-text-secondary leading-relaxed">
              אנחנו שומרים את המידע האישי שלכם כל עוד החשבון שלכם פעיל או כל עוד נדרש כדי לספק לכם שירותים. אנחנו עשויים לשמור מידע גם כדי לציית לחובות חוקיות.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text-primary">8. עוגיות (Cookies)</h2>
            <p className="text-text-secondary leading-relaxed">
              האתר שלנו משתמש בעוגיות כדי לשפר את חוויית הגלישה שלכם. אתם יכולים לבחר לבטל עוגיות בהגדרות הדפדפן שלכם, אך זה עלול להשפיע על פונקציונליות האתר.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text-primary">9. שינויים במדיניות הפרטיות</h2>
            <p className="text-text-secondary leading-relaxed">
              אנחנו עשויים לעדכן את מדיניות הפרטיות מעת לעת. נודיע לכם על שינויים משמעותיים דרך האתר או במייל.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold text-text-primary">10. צרו קשר</h2>
            <p className="text-text-secondary leading-relaxed">
              אם יש לכם שאלות או דאגות לגבי מדיניות הפרטיות, צרו קשר:
            </p>
            <div className="bg-surface rounded-xl p-6 border border-border">
              <p className="text-text-primary"><strong>PawStory</strong></p>
              <p className="text-text-secondary mt-2">אימייל: <a href="mailto:support@pawstory.com" className="text-accent hover:underline">support@pawstory.com</a></p>
            </div>
          </section>
        </div>
      </Container>
    </div>
  );
}
