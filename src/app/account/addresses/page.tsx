import { Metadata } from "next";
import Container from "@/components/ui/Container";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { ArrowRight, MapPin, Plus, Pencil, Trash2 } from "lucide-react";

export const metadata: Metadata = { title: "הכתובות שלי" };

const MOCK_ADDRESSES = [
  { id: "1", label: "בית", firstName: "ישראל", lastName: "ישראלי", line1: "רחוב הרצל 1", line2: "דירה 4", city: "תל אביב", zip: "6100000", isDefault: true },
  { id: "2", label: "עבודה", firstName: "ישראל", lastName: "ישראלי", line1: "שד׳ רוטשילד 22", line2: "קומה 3", city: "תל אביב", zip: "6688218", isDefault: false },
];

export default function AddressesPage() {
  return (
    <div className="bg-surface min-h-screen">
      <Container size="lg">
        <div className="py-8 md:py-12">
          <Link href="/account" className="inline-flex items-center gap-1 text-sm text-muted hover:text-textPrimary mb-6 transition-colors"><ArrowRight className="h-4 w-4" />חזרה לחשבון</Link>
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-textPrimary tracking-tight">הכתובות שלי</h1>
            <Button size="sm"><Plus className="h-4 w-4" />הוסף כתובת</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MOCK_ADDRESSES.map((addr) => (
              <div key={addr.id} className="bg-card rounded-xl border border-border p-6">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted" />
                    <span className="font-semibold text-textPrimary">{addr.label}</span>
                    {addr.isDefault && <Badge variant="success">ברירת מחדל</Badge>}
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 text-textMuted hover:text-textPrimary transition-colors"><Pencil className="h-4 w-4" /></button>
                    <button className="p-1.5 text-textMuted hover:text-red-500 transition-colors"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
                <div className="text-sm text-muted space-y-0.5">
                  <p>{addr.firstName} {addr.lastName}</p>
                  <p>{addr.line1}</p>
                  {addr.line2 && <p>{addr.line2}</p>}
                  <p>{addr.city}, {addr.zip}</p>
                </div>
                {!addr.isDefault && <button className="mt-4 text-sm text-textPrimary hover:text-muted font-medium transition-colors">הגדר כברירת מחדל</button>}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
