import { Metadata } from "next";
import Container from "@/components/ui/Container";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ArrowRight, Save } from "lucide-react";

export const metadata: Metadata = { title: "הגדרות חשבון" };

export default function SettingsPage() {
  return (
    <div className="bg-surface min-h-screen">
      <Container size="md">
        <div className="py-8 md:py-12">
          <Link href="/account" className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary mb-6 transition-colors"><ArrowRight className="h-4 w-4" />חזרה לחשבון</Link>
          <h1 className="text-3xl font-bold text-text-primary tracking-tight mb-8">הגדרות חשבון</h1>
          <div className="space-y-8">
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold text-text-primary mb-4">פרופיל</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4"><Input id="firstName" label="שם פרטי" defaultValue="ישראל" /><Input id="lastName" label="שם משפחה" defaultValue="ישראלי" /></div>
                <Input id="email" label="אימייל" type="email" defaultValue="israel@example.com" />
                <Input id="phone" label="טלפון" type="tel" defaultValue="050-1234567" />
                <Button size="sm"><Save className="h-4 w-4" />שמור שינויים</Button>
              </div>
            </div>
            <div className="bg-card rounded-xl border border-border p-6">
              <h2 className="text-lg font-semibold text-text-primary mb-4">שינוי סיסמה</h2>
              <div className="space-y-4">
                <Input id="currentPassword" label="סיסמה נוכחית" type="password" />
                <Input id="newPassword" label="סיסמה חדשה" type="password" />
                <Input id="confirmPassword" label="אישור סיסמה חדשה" type="password" />
                <Button size="sm" variant="secondary">עדכן סיסמה</Button>
              </div>
            </div>
            <div className="bg-card rounded-xl border border-red-200 p-6">
              <h2 className="text-lg font-semibold text-red-700 mb-2">אזור מסוכן</h2>
              <p className="text-sm text-text-secondary mb-4">מחיקת החשבון וכל הנתונים המשויכים. פעולה זו אינה הפיכה.</p>
              <Button variant="danger" size="sm">מחק חשבון</Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
