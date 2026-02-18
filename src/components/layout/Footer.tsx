import Link from "next/link";
import Container from "@/components/ui/Container";
import { FOOTER_LINKS } from "@/lib/constants";
import { Mail, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black border-t border-gray-800">
      <div className="bg-accent/10 border-b border-gray-800 py-4">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-body-sm font-medium text-accent">
            <span>🇮🇱 משלוחים בישראל בלבד</span>
            <span>📦 משלוח חינם מעל ₪200</span>
            <span>✅ החזרות תוך 30 יום</span>
            <span>🔒 תשלום מאובטח 100%</span>
          </div>
        </Container>
      </div>
      <Container>
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5"><div className="w-8 h-8 bg-accent rounded-xl flex items-center justify-center"><span className="text-white font-bold text-sm">P</span></div><span className="text-lg font-extrabold text-white">PawStory</span></div>
            <p className="text-sm text-gray-300 leading-relaxed">
              חנות ישראלית למוצרי חיות מחמד איכותיים. 
              שירות אישי, משלוחים מהירים עד הבית, וצוות תמיכה שזמין בשבילכם.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <Mail className="h-4 w-4 text-accent" />
                <a href="mailto:hello@pawsome.co.il" className="hover:text-accent transition-colors">hello@pawsome.co.il</a>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-300">
                <span className="h-4 w-4 text-accent">📞</span>
                <a href="tel:0509555350" className="hover:text-accent transition-colors font-bold" dir="ltr">050-9555350</a>
              </div>
            </div>
          </div>
          {[{ title: "חנות", links: FOOTER_LINKS.shop }, { title: "החברה", links: FOOTER_LINKS.company }, { title: "תמיכה ומידע", links: [...FOOTER_LINKS.support, { href: "/shipping", label: "משלוחים" }, { href: "/returns", label: "החזרות" }] }].map((sec) => (
            <div key={sec.title}><h3 className="text-white font-semibold mb-3 text-sm uppercase tracking-wider">{sec.title}</h3><ul className="space-y-2">{sec.links.map((l) => <li key={l.href}><Link href={l.href} className="text-sm text-gray-300 hover:text-accent transition-colors">{l.label}</Link></li>)}</ul></div>
          ))}
        </div>
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col items-center gap-4 mb-4">
            <p className="text-center text-gray-400 text-sm max-w-2xl">
              <strong className="text-white">PawStory</strong> — חנות ישראלית למוצרי חיות מחמד איכותיים. 
              אנחנו מאמינים בשירות אישי, משלוחים מהירים, ומוצרים שנבחרו בקפידה לחיות המחמד האהובות עליכם. 
              כל הזמנה מטופלת באהבה ובמקצועיות. 🐾
            </p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-gray-500">
            <p className="flex items-center gap-1">&copy; {new Date().getFullYear()} PawStory. נוצר עם <Heart className="h-3 w-3 text-accent fill-accent" /> לחיות מחמד בישראל.</p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="hover:text-accent transition-colors">מדיניות פרטיות</Link>
              <Link href="/terms" className="hover:text-accent transition-colors">תנאי שימוש</Link>
              <Link href="/shipping" className="hover:text-accent transition-colors">משלוחים</Link>
              <Link href="/returns" className="hover:text-accent transition-colors">החזרות</Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
