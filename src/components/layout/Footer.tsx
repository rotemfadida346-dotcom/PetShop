import Link from "next/link";
import Container from "@/components/ui/Container";
import { FOOTER_LINKS } from "@/lib/constants";
import { Mail, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="bg-accent text-white py-4">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-sm font-medium">
            <span>🩺 מאושר ע״י וטרינרים</span><span>🚚 משלוח חינם מעל ₪200</span><span>✅ אחריות 30 יום</span><span>🇮🇱 משלוחים בכל רחבי ישראל</span>
          </div>
        </Container>
      </div>
      <Container>
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center"><span className="text-white font-bold text-base">P</span></div>
              <span className="text-xl font-extrabold text-textPrimary tracking-tight">Pawsome</span>
            </div>
            <p className="text-sm text-textSecondary leading-relaxed">תזונה פרימיום שנוצרה באהבה עבור בני המשפחה הפרוותיים שלכם.</p>
            <div className="flex items-center gap-3 text-sm text-textSecondary"><Mail className="h-4 w-4 text-accent" /><span>hello@pawsome.co.il</span></div>
          </div>
          <div><h3 className="text-textPrimary font-semibold mb-4">חנות</h3><ul className="space-y-2.5">{FOOTER_LINKS.shop.map((l) => <li key={l.href}><Link href={l.href} className="text-sm text-textSecondary hover:text-accent transition-colors">{l.label}</Link></li>)}</ul></div>
          <div><h3 className="text-textPrimary font-semibold mb-4">החברה</h3><ul className="space-y-2.5">{FOOTER_LINKS.company.map((l) => <li key={l.href}><Link href={l.href} className="text-sm text-textSecondary hover:text-accent transition-colors">{l.label}</Link></li>)}</ul></div>
          <div><h3 className="text-textPrimary font-semibold mb-4">תמיכה</h3><ul className="space-y-2.5">{FOOTER_LINKS.support.map((l) => <li key={l.href}><Link href={l.href} className="text-sm text-textSecondary hover:text-accent transition-colors">{l.label}</Link></li>)}</ul></div>
        </div>
        <div className="border-t border-border py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-textMuted">
          <p className="flex items-center gap-1">&copy; {new Date().getFullYear()} Pawsome. נוצר עם <Heart className="h-3 w-3 text-accent fill-accent" /> לחיות מחמד.</p>
          <div className="flex items-center gap-4"><Link href="/privacy" className="hover:text-accent transition-colors">מדיניות פרטיות</Link><Link href="/terms" className="hover:text-accent transition-colors">תנאי שימוש</Link></div>
        </div>
      </Container>
    </footer>
  );
}
