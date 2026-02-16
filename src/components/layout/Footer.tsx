import Link from "next/link";
import Container from "@/components/ui/Container";
import { FOOTER_LINKS } from "@/lib/constants";
import { Mail, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="bg-accent/10 border-b border-border py-4">
        <Container>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-body-sm font-medium text-accent">
            <span>🚚 משלוח חינם מעל ₪200</span>
            <span>✅ אחריות 30 יום</span>
            <span>🇮🇱 משלוחים בכל רחבי ישראל</span>
            <span>🔒 תשלום מאובטח</span>
          </div>
        </Container>
      </div>
      <Container>
        <div className="py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="space-y-4">
            <div className="flex items-center gap-2.5"><div className="w-8 h-8 bg-accent rounded-xl flex items-center justify-center"><span className="text-text-inverse font-bold text-sm">P</span></div><span className="text-lg font-extrabold text-text-primary">Pawsome</span></div>
            <p className="text-body-sm text-text-secondary leading-relaxed">חנות חיות מחמד חכמה עם מבחר מוצרים איכותיים שנבחרו בקפידה — לכלבים ולחתולים.</p>
            <div className="flex items-center gap-2 text-body-sm text-text-secondary"><Mail className="h-4 w-4 text-accent" /><span>hello@pawsome.co.il</span></div>
          </div>
          {[{ title: "חנות", links: FOOTER_LINKS.shop }, { title: "החברה", links: FOOTER_LINKS.company }, { title: "תמיכה", links: FOOTER_LINKS.support }].map((sec) => (
            <div key={sec.title}><h3 className="text-text-primary font-semibold mb-3 text-body-sm uppercase tracking-wider">{sec.title}</h3><ul className="space-y-2">{sec.links.map((l) => <li key={l.href}><Link href={l.href} className="text-body-sm text-text-secondary hover:text-accent transition-colors">{l.label}</Link></li>)}</ul></div>
          ))}
        </div>
        <div className="border-t border-border py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted">
          <p className="flex items-center gap-1">&copy; {new Date().getFullYear()} Pawsome. נוצר עם <Heart className="h-3 w-3 text-accent fill-accent" /> לחיות מחמד.</p>
          <div className="flex items-center gap-4"><Link href="/privacy" className="hover:text-accent transition-colors">פרטיות</Link><Link href="/terms" className="hover:text-accent transition-colors">תנאים</Link></div>
        </div>
      </Container>
    </footer>
  );
}
