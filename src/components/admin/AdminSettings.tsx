"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Save, Check } from "lucide-react";

export default function AdminSettings() {
  const [freeShippingThreshold, setFreeShippingThreshold] = useState(200);
  const [shippingCost, setShippingCost] = useState(25);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-black mb-6">הגדרות אתר</h1>

      <div className="space-y-8">
        {/* Shipping */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-black mb-4">הגדרות משלוח</h2>
          <div className="space-y-4 max-w-md">
            <Input
              id="freeShippingThreshold"
              label="סף משלוח חינם (₪)"
              type="number"
              value={freeShippingThreshold}
              onChange={(e) => setFreeShippingThreshold(parseInt(e.target.value))}
            />
            <Input
              id="shippingCost"
              label="עלות משלוח קבועה (₪)"
              type="number"
              value={shippingCost}
              onChange={(e) => setShippingCost(parseInt(e.target.value))}
            />
            <p className="text-sm text-muted">הזמנות מתחת ל-₪{freeShippingThreshold} ישלמו ₪{shippingCost} משלוח.</p>
          </div>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-black mb-4">קטגוריות</h2>
          <div className="space-y-2">
            {["מזון", "חטיפים", "חול", "תוספים", "צעצועים", "אביזרים"].map((cat) => (
              <div key={cat} className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
                <span className="text-sm font-medium text-black">{cat}</span>
                <span className="text-xs text-muted">פעיל</span>
              </div>
            ))}
          </div>
        </div>

        {/* Store Info */}
        <div className="bg-white rounded-xl border border-border p-6">
          <h2 className="text-lg font-semibold text-black mb-4">פרטי החנות</h2>
          <div className="space-y-4 max-w-md">
            <Input id="storeName" label="שם החנות" defaultValue="Pawsome" />
            <Input id="storeEmail" label="אימייל חנות" defaultValue="hello@pawsome.co.il" />
            <Input id="storePhone" label="טלפון" defaultValue="03-1234567" />
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
