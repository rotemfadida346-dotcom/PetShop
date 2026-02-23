"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import { ChevronDown, Package, Truck, RefreshCw, CreditCard, ShieldCheck, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const FAQ_CATEGORIES = [
  {
    id: "orders",
    title: "הזמנות",
    icon: Package,
    questions: [
      {
        q: "איך אני עוקב אחרי ההזמנה שלי?",
        a: "לאחר שההזמנה שלך נשלחה, תקבל אימייל עם מספר מעקב. תוכל גם לעקוב אחרי ההזמנה דרך דף החשבון שלך תחת 'ההזמנות שלי'.",
      },
      {
        q: "אפשר לשנות או לבטל הזמנה?",
        a: "כן, אבל רק תוך 24 שעות מביצוע ההזמנה. צרו קשר במייל support@pawstory.com או התקשרו אלינו מיד.",
      },
      {
        q: "קיבלתי מוצר פגום או שגוי. מה עושים?",
        a: "אנחנו מצטערים לשמוע! צרו קשר איתנו תוך 48 שעות מקבלת המוצר ונשלח לכם החלפה בחינם או נבצע החזר כספי מלא.",
      },
    ],
  },
  {
    id: "shipping",
    title: "משלוחים",
    icon: Truck,
    questions: [
      {
        q: "כמה זמן לוקח משלוח?",
        a: "משלוחים לוקחים 3-5 ימי עסקים לכל רחבי ישראל. הזמנות שמבוצעות לפני השעה 12:00 בצהריים יישלחו באותו יום עסקים.",
      },
      {
        q: "האם יש משלוח חינם?",
        a: "כן! משלוח חינם בהזמנות מעל ₪200. הזמנות מתחת ל-₪200 עולות ₪25 למשלוח.",
      },
      {
        q: "האם אתם משלחים לכל הארץ?",
        a: "כן, אנחנו משלחים לכל רחבי ישראל, כולל איזורים מרוחקים. זמני משלוח עשויים להשתנות בהתאם לאזור.",
      },
    ],
  },
  {
    id: "subscriptions",
    title: "מנויים",
    icon: RefreshCw,
    questions: [
      {
        q: "איך עובדת אופציית 'מנוי וחיסכון'?",
        a: "בוחרים מוצר, מסמנים 'מנוי', בוחרים תדירות (2, 4 או 6 שבועות) ומקבלים 10% הנחה על כל משלוח. משלוח חינם, ואפשר לבטל בכל עת.",
      },
      {
        q: "אפשר לבטל מנוי?",
        a: "בהחלט! אפשר לבטל, להשהות או לשנות את המנוי בכל עת דרך דף החשבון. אין עמלות ביטול ואין התחייבות.",
      },
      {
        q: "אפשר לשנות את תדירות המנוי?",
        a: "כן, תוכלו לשנות מכל שבועיים ל-4 שבועות או 6 שבועות ולהפך — ישירות מדף המנויים בחשבון שלכם.",
      },
      {
        q: "מה קורה אם אני רוצה לדלג על משלוח אחד?",
        a: "בעיה! פשוט כנסו לדף המנויים והקליקו 'דלג על משלוח הבא'. המשלוח הבא יגיע לפי התדירות שהגדרתם.",
      },
    ],
  },
  {
    id: "payments",
    title: "תשלומים",
    icon: CreditCard,
    questions: [
      {
        q: "אילו אמצעי תשלום אתם מקבלים?",
        a: "אנחנו מקבלים כרטיסי אשראי (Visa, Mastercard, American Express), Apple Pay, Google Pay ו-PayPal דרך Stripe.",
      },
      {
        q: "האם התשלום מאובטח?",
        a: "כן! כל התשלומים מעובדים בצורה מאובטחת דרך Stripe עם הצפנת SSL. אנחנו לא שומרים פרטי כרטיס אשראי בשרתים שלנו.",
      },
      {
        q: "מתי אני אחויב?",
        a: "אתם מחויבים ברגע ביצוע ההזמנה. במקרה של מנוי, תחויבו אוטומטית לפני כל משלוח לפי התדירות שהגדרתם.",
      },
    ],
  },
  {
    id: "returns",
    title: "החזרות",
    icon: ShieldCheck,
    questions: [
      {
        q: "מה מדיניות ההחזרות?",
        a: "יש לכם 30 יום להחזיר מוצרים. המוצר חייב להיות במצב חדש, לא נפתח ובאריזה המקורית. נחזיר לכם את התשלום תוך 5-7 ימי עסקים.",
      },
      {
        q: "מי משלם את עלות ההחזרה?",
        a: "אם המוצר פגום או שגוי, אנחנו נשלם. אם פשוט לא התאים לכם, תצטרכו לשלם את עלות המשלוח חזרה.",
      },
      {
        q: "איך מחזירים מוצר?",
        a: "צרו קשר במייל support@pawstory.com עם מספר ההזמנה. נשלח לכם תווית משלוח ותוכלו לשלוח את המוצר דרך הדואר או שליח.",
      },
    ],
  },
  {
    id: "products",
    title: "מוצרים",
    icon: HelpCircle,
    questions: [
      {
        q: "איך אני יודע איזה מזון מתאים לחיית המחמד שלי?",
        a: "מלאו את השאלון ההתאמה האישית שלנו! זה לוקח 2 דקות ונמצא לכם מוצרים מותאמים בדיוק לחיית המחמד שלכם.",
      },
      {
        q: "המוצרים שלכם אורגניים?",
        a: "חלק מהמוצרים שלנו כן אורגניים. תוכלו לסנן לפי 'אורגני' בדף החנות או לחפש את התג 'organic' בדף המוצר.",
      },
      {
        q: "האם המוצרים בטוחים לחיות עם אלרגיות?",
        a: "יש לנו מגוון מוצרים ללא גלוטן, ללא דגנים וללא מרכיבים אלרגניים נפוצים. חפשו תגים כמו 'grain-free' או 'hypoallergenic'.",
      },
    ],
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-right hover:bg-surface transition-colors"
      >
        <span className="font-semibold text-text-primary">{question}</span>
        <ChevronDown
          className={cn(
            "h-5 w-5 text-text-muted transition-transform shrink-0 mr-3",
            isOpen && "rotate-180"
          )}
        />
      </button>
      {isOpen && (
        <div className="px-6 py-4 bg-surface border-t border-border">
          <p className="text-text-secondary leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState("orders");

  return (
    <div className="bg-card min-h-screen">
      <section className="bg-gradient-to-b from-gray-50 to-white border-b border-border">
        <Container size="md">
          <div className="py-12 md:py-16 text-center px-4">
            <div className="text-4xl md:text-5xl mb-4">💬</div>
            <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">שאלות נפוצות</h1>
            <p className="text-base md:text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
              מצאו תשובות לשאלות הנפוצות ביותר. אם לא מצאתם תשובה - 
              <a href="/contact" className="text-accent font-medium hover:underline"> צרו קשר ונשמח לעזור</a>
            </p>
          </div>
        </Container>
      </section>

      <Container>
        <div className="py-12 md:py-16">
          {/* Category Pills */}
          <div className="flex flex-wrap gap-3 mb-10 justify-center">
            {FAQ_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all text-sm",
                  activeCategory === cat.id
                    ? "bg-accent text-text-inverse shadow-lg shadow-accent/20"
                    : "bg-surface text-text-secondary hover:bg-surface border border-border"
                )}
              >
                <cat.icon className="h-4 w-4" />
                {cat.title}
              </button>
            ))}
          </div>

          {/* FAQ Content */}
          <div className="max-w-3xl mx-auto">
            {FAQ_CATEGORIES.filter((cat) => cat.id === activeCategory).map((cat) => (
              <div key={cat.id} className="space-y-4">
                {cat.questions.map((faq, idx) => (
                  <FAQItem key={idx} question={faq.q} answer={faq.a} />
                ))}
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-16 max-w-2xl mx-auto text-center bg-surface rounded-2xl p-8 border border-border">
            <h3 className="text-xl font-bold text-text-primary mb-2">לא מצאתם תשובה?</h3>
            <p className="text-text-secondary mb-5">
              צרו קשר ונשמח לעזור בכל שאלה נוספת!
            </p>
            <a href="/contact">
              <button className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-text-inverse rounded-lg font-semibold hover:bg-accent/90 transition-colors">
                צרו קשר
              </button>
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
