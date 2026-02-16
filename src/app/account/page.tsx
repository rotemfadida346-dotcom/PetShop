import { Metadata } from "next";
import Container from "@/components/ui/Container";
import Link from "next/link";
import { Package, RefreshCw, MapPin, Settings, ArrowLeft, LogOut } from "lucide-react";

export const metadata: Metadata = { title: "החשבון שלי" };

const ACCOUNT_LINKS = [
  { href: "/account/orders", icon: Package, title: "הזמנות", desc: "עקבו אחרי ההזמנות שלכם" },
  { href: "/account/subscriptions", icon: RefreshCw, title: "מנויים", desc: "נהלו לוחות זמנים, עצרו או בטלו" },
  { href: "/account/addresses", icon: MapPin, title: "כתובות", desc: "נהלו כתובות משלוח" },
  { href: "/account/settings", icon: Settings, title: "הגדרות", desc: "עדכנו אימייל, סיסמה והעדפות" },
];

export default function AccountPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Container size="lg">
        <div className="py-8 md:py-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-black tracking-tight">החשבון שלי</h1>
              <p className="text-muted mt-1">ברוכים הבאים! נהלו את ההזמנות וההעדפות שלכם.</p>
            </div>
            <Link href="/auth/signin" className="text-sm text-muted hover:text-black flex items-center gap-1 transition-colors">
              <LogOut className="h-4 w-4" />התנתק
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl p-6 border border-border"><p className="text-sm text-muted">סה״כ הזמנות</p><p className="text-3xl font-bold text-black mt-1">12</p></div>
            <div className="bg-white rounded-xl p-6 border border-border"><p className="text-sm text-muted">מנויים פעילים</p><p className="text-3xl font-bold text-black mt-1">2</p></div>
            <div className="bg-white rounded-xl p-6 border border-border"><p className="text-sm text-muted">סה״כ חסכתם</p><p className="text-3xl font-bold text-emerald-600 mt-1">₪180</p></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ACCOUNT_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className="group bg-white rounded-xl p-6 border border-border hover:border-gray-300 hover:shadow-md transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-gray-50 group-hover:bg-gray-100 transition-colors"><link.icon className="h-5 w-5 text-muted group-hover:text-black transition-colors" /></div>
                    <div><h2 className="font-semibold text-black">{link.title}</h2><p className="text-sm text-muted mt-0.5">{link.desc}</p></div>
                  </div>
                  <ArrowLeft className="h-5 w-5 text-gray-300 group-hover:text-black transition-colors shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
