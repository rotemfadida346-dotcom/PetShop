"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Save, Check, Globe, Truck, Languages, CreditCard } from "lucide-react";

export default function AdminSettings() {
  const [freeThreshold, setFreeThreshold] = useState(200);
  const [shippingCost, setShippingCost] = useState(25);
  const [saved, setSaved] = useState(false);

  function handleSave() { setSaved(true); setTimeout(() => setSaved(false), 2000); }

  return (
    <div>
      <h1 className="text-heading-lg text-text-primary mb-6">הגדרות אתר</h1>

      <div className="space-y-6">
        {/* Shipping */}
        <div className="bg-card rounded-2xl border border-card-border p-6">
          <div className="flex items-center gap-3 mb-4"><Truck className="h-5 w-5 text-accent" /><h2 className="text-heading-md text-text-primary">משלוחים</h2></div>
          <div className="space-y-4 max-w-md">
            <Input label="סף משלוח חינם (₪)" type="number" value={freeThreshold} onChange={(e) => setFreeThreshold(parseInt(e.target.value))} />
            <Input label="עלות משלוח קבועה (₪)" type="number" value={shippingCost} onChange={(e) => setShippingCost(parseInt(e.target.value))} />
            <p className="text-body-sm text-text-muted">הזמנות מתחת ל-₪{freeThreshold} ישלמו ₪{shippingCost} משלוח.</p>
          </div>
        </div>

        {/* Region */}
        <div className="bg-card rounded-2xl border border-card-border p-6">
          <div className="flex items-center gap-3 mb-4"><Globe className="h-5 w-5 text-accent" /><h2 className="text-heading-md text-text-primary">אזור ומטבע</h2></div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-surface rounded-xl p-4 border border-border">
              <p className="text-xs text-text-muted uppercase tracking-wider mb-1">מדינה</p>
              <p className="text-body-sm font-bold text-text-primary flex items-center gap-1.5">🇮🇱 ישראל בלבד</p>
            </div>
            <div className="bg-surface rounded-xl p-4 border border-border">
              <p className="text-xs text-text-muted uppercase tracking-wider mb-1">מטבע</p>
              <p className="text-body-sm font-bold text-text-primary">₪ שקל ישראלי (ILS)</p>
            </div>
            <div className="bg-surface rounded-xl p-4 border border-border">
              <p className="text-xs text-text-muted uppercase tracking-wider mb-1">שפה</p>
              <p className="text-body-sm font-bold text-text-primary flex items-center gap-1.5"><Languages className="h-4 w-4" /> עברית (RTL)</p>
            </div>
          </div>
        </div>

        {/* Payment */}
        <div className="bg-card rounded-2xl border border-card-border p-6">
          <div className="flex items-center gap-3 mb-4"><CreditCard className="h-5 w-5 text-accent" /><h2 className="text-heading-md text-text-primary">תשלומים</h2></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-surface rounded-xl p-4 border border-border">
              <p className="text-body-sm font-bold text-text-primary mb-1">Tranzila</p>
              <p className="text-xs text-text-muted">כרטיסי אשראי ישראליים — ויזה, מאסטרקארד, אמקס</p>
              <span className="inline-block mt-2 text-xs text-accent font-medium">פעיל ✓</span>
            </div>
            <div className="bg-surface rounded-xl p-4 border border-border">
              <p className="text-body-sm font-bold text-text-primary mb-1">PayPal</p>
              <p className="text-xs text-text-muted">תשלום בינלאומי מאובטח</p>
              <span className="inline-block mt-2 text-xs text-accent font-medium">פעיל ✓</span>
            </div>
          </div>
        </div>

        {/* Store Info */}
        <div className="bg-card rounded-2xl border border-card-border p-6">
          <h2 className="text-heading-md text-text-primary mb-4">פרטי החנות</h2>
          <div className="space-y-4 max-w-md">
            <Input label="שם החנות" defaultValue="Pawsome" />
            <Input label="אימייל" defaultValue="hello@pawsome.co.il" />
            <Input label="טלפון" defaultValue="03-1234567" />
          </div>
        </div>

        {/* Categories */}
        <div className="bg-card rounded-2xl border border-card-border p-6">
          <h2 className="text-heading-md text-text-primary mb-4">קטגוריות</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              { icon: "🍖", name: "מזון" },
              { icon: "🦴", name: "חטיפים" },
              { icon: "🎾", name: "צעצועים" },
              { icon: "🛏️", name: "מיטות / אביזרים" },
              { icon: "🧹", name: "חול" },
              { icon: "💊", name: "תוספים" },
            ].map((c) => (
              <div key={c.name} className="bg-surface rounded-xl p-3 border border-border flex items-center gap-2">
                <span className="text-lg">{c.icon}</span>
                <span className="text-body-sm font-medium text-text-primary">{c.name}</span>
              </div>
            ))}
          </div>
        </div>

        <Button onClick={handleSave} size="lg">
          {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
          {saved ? "נשמר בהצלחה!" : "שמור הגדרות"}
        </Button>
      </div>
    </div>
  );
}
