import Link from "next/link";
import Container from "@/components/ui/Container";
import { FOOTER_LINKS } from "@/lib/constants";
import { Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-400">
      <Container>
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                <span className="text-black font-bold text-sm">P</span>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">Pawsome</span>
            </div>
            <p className="text-sm leading-relaxed">
              תזונה פרימיום שנוצרה באהבה עבור בני המשפחה הפרוותיים שלכם.
              מאושר על ידי וטרינרים, מרכיבים טבעיים.
            </p>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-white" />
              <span>hello@pawsome.co.il</span>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">חנות</h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">החברה</h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">תמיכה</h3>
            <ul className="space-y-2.5">
              {FOOTER_LINKS.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-wrap items-center justify-center gap-8 text-xs text-gray-500">
            <span>מאושר ע״י וטרינרים</span>
            <span className="text-gray-700">|</span>
            <span>משלוח חינם מעל ₪200</span>
            <span className="text-gray-700">|</span>
            <span>אחריות 30 יום</span>
            <span className="text-gray-700">|</span>
            <span>משלוחים בכל רחבי ישראל בלבד</span>
          </div>
        </div>

        <div className="border-t border-gray-800 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Pawsome. כל הזכויות שמורות.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-gray-300 transition-colors">מדיניות פרטיות</Link>
            <Link href="/terms" className="hover:text-gray-300 transition-colors">תנאי שימוש</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
