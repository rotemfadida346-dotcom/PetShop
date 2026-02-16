import Link from "next/link";
import Container from "@/components/ui/Container";
import { FOOTER_LINKS } from "@/lib/constants";
import { Mail, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      {/* Trust bar */}
      <div className="bg-brand-500 text-white py-4">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm font-medium">
            <span>🩺 מאושר ע״י וטרינרים</span>
            <span>🚚 משלוח חינם מעל ₪200</span>
            <span>✅ אחריות 30 יום</span>
            <span>🇮🇱 משלוחים בכל רחבי ישראל</span>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-brand-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-base">P</span>
              </div>
              <span className="text-xl font-extrabold text-white tracking-tight">Pawsome</span>
            </div>
            <p className="text-sm leading-relaxed">
              תזונה פרימיום שנוצרה באהבה עבור בני המשפחה הפרוותיים שלכם.
              מאושר על ידי וטרינרים, מרכיבים טבעיים.
            </p>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-brand-400" />
              <span>hello@pawsome.co.il</span>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">חנות</h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.href}><Link href={link.href} className="text-sm hover:text-brand-400 transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">החברה</h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}><Link href={link.href} className="text-sm hover:text-brand-400 transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">תמיכה</h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.href}><Link href={link.href} className="text-sm hover:text-brand-400 transition-colors">{link.label}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p className="flex items-center gap-1">&copy; {new Date().getFullYear()} Pawsome. נוצר עם <Heart className="h-3 w-3 text-brand-400 fill-brand-400" /> לחיות מחמד.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">מדיניות פרטיות</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">תנאי שימוש</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
