import { Metadata } from "next";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { Heart, Leaf, ShieldCheck, Award, ArrowLeft } from "lucide-react";

export const metadata: Metadata = { title: "הסיפור שלנו" };

export default function AboutPage() {
  return (
    <div className="bg-card">
      <section className="bg-surface">
        <Container size="md">
          <div className="py-20 md:py-32 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-text-primary">תזונה שנוצרה באהבה עבור המשפחה הפרוותית שלכם</h1>
            <p className="mt-6 text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">התחלנו את Pawsome עם אמונה פשוטה: כל חיית מחמד ראויה לאוכל טוב כמו מה שהיינו אוכלים בעצמנו. ללא מילויים, ללא קיצורי דרך — רק תזונה פרימיום כנה.</p>
          </div>
        </Container>
      </section>
      <section className="section-padding">
        <Container>
          <div className="text-center mb-16"><h2 className="section-heading">במה אנחנו מאמינים</h2></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[{ icon: Leaf, title: "טבעי קודם", desc: "כל מתכון מתחיל עם מרכיבים אמיתיים ושלמים." }, { icon: ShieldCheck, title: "מאושר ע״י וטרינרים", desc: "כל הפורמולות פותחו עם תזונאים וטרינריים." }, { icon: Heart, title: "אושר חיות מחמד", desc: "אם חיית המחמד שלכם לא אוהבת, נתקן את זה." }, { icon: Award, title: "אובססיה לאיכות", desc: "ייצור בקבוצות קטנות עם בדיקות קפדניות." }].map((v) => (
              <div key={v.title} className="text-center">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-surface mb-4"><v.icon className="h-7 w-7 text-text-primary" /></div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">{v.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="section-padding bg-surface">
        <Container size="md">
          <div className="max-w-2xl mx-auto">
            <h2 className="section-heading mb-6">הסיפור שלנו</h2>
            <p className="text-text-secondary leading-relaxed">Pawsome נולד כשהמייסד שלנו, בעל חיות מחמד ותיק, התעייף מהמחסור באפשרויות מזון פרימיום ושקופות. אחרי חודשים של מחקר ושיתוף פעולה עם תזונאים וטרינריים, יצרנו את המתכון הראשון — והכלבים שלנו השתגעו מזה.</p>
            <p className="text-text-secondary leading-relaxed mt-4">מאז, הרחבנו לשרת גם כלבים וגם חתולים עם קו מוצרים שלם. כל מוצר מיוצר בקבוצות קטנות עם מרכיבים שעומדים בסטנדרטים הקפדניים שלנו.</p>
            <p className="text-text-secondary leading-relaxed mt-4">היום, מעל 10,000 בעלי חיות מחמד סומכים על Pawsome. אנחנו רק מתחילים.</p>
          </div>
        </Container>
      </section>
      <section className="section-padding">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[{ value: "10,000+", label: "בעלי חיות מחמד מרוצים" }, { value: "50,000+", label: "ארוחות שנמסרו" }, { value: "4.8/5", label: "דירוג ממוצע" }, { value: "30 יום", label: "אחריות החזר כספי" }].map((stat) => (
              <div key={stat.label}><p className="text-3xl md:text-4xl font-bold text-text-primary">{stat.value}</p><p className="text-sm text-text-secondary mt-1">{stat.label}</p></div>
            ))}
          </div>
        </Container>
      </section>
      <section className="section-padding bg-black text-white">
        <Container size="sm">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">מוכנים לעשות את המעבר?</h2>
            <p className="mt-4 text-text-text-secondary max-w-md mx-auto">הצטרפו לאלפי בעלי חיות מחמד שסומכים על Pawsome. נסו ללא סיכון עם אחריות 30 יום.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link href="/shop"><Button size="lg" className="bg-card text-text-primary hover:bg-surface-hover-hover">לחנות <ArrowLeft className="h-4 w-4" /></Button></Link>
              <Link href="/quiz"><Button variant="outline" size="lg" className="border-gray-600 text-white hover:bg-surface">לשאלון</Button></Link>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
