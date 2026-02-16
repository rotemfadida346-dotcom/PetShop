"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import ProductGrid from "@/components/product/ProductGrid";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { ArrowRight, ArrowLeft, Sparkles } from "lucide-react";

interface QuizState { petType: "DOG" | "CAT" | null; petName: string; petAge: string; petSize: string; sensitivities: string[] }
const STEPS = ["petType", "petName", "petAge", "petSize", "sensitivities", "results"] as const;

export default function QuizFlow() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizState>({ petType: null, petName: "", petAge: "", petSize: "", sensitivities: [] });
  const currentStep = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;

  function nextStep() { if (step < STEPS.length - 1) setStep(step + 1); }
  function prevStep() { if (step > 0) setStep(step - 1); }

  function getRecommendations() {
    let products = MOCK_PRODUCTS.filter((p) => p.petType === answers.petType);
    if (answers.petAge === "puppy" || answers.petAge === "kitten") {
      const young = products.filter((p) => p.tags.includes("puppy") || p.tags.includes("growth"));
      if (young.length > 0) products = young;
    }
    if (answers.petAge === "senior") {
      const senior = products.filter((p) => p.tags.includes("senior") || p.tags.includes("gentle"));
      if (senior.length > 0) products = senior;
    }
    if (answers.sensitivities.includes("grain")) {
      const gf = products.filter((p) => p.tags.includes("grain-free"));
      if (gf.length > 0) products = gf;
    }
    return products.slice(0, 4);
  }

  function canProceed(): boolean {
    switch (currentStep) {
      case "petType": return answers.petType !== null;
      case "petAge": return answers.petAge !== "";
      case "petSize": return answers.petSize !== "";
      default: return true;
    }
  }

  return (
    <div>
      {currentStep !== "results" && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2"><span className="text-sm font-medium text-text-secondary">שלב {step + 1} מתוך {STEPS.length - 1}</span><span className="text-sm text-text-secondary">{Math.round(progress)}%</span></div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden"><div className="h-full bg-black rounded-full transition-all duration-500" style={{ width: `${progress}%` }} /></div>
        </div>
      )}

      <div className="bg-card rounded-2xl p-8 md:p-12 border border-border shadow-sm">
        {currentStep === "petType" && (
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">איזו חיית מחמד יש לכם?</h2>
            <p className="text-text-secondary mb-8">נמצא את המוצרים המושלמים לחבר הפרוותי שלכם.</p>
            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              {(["DOG", "CAT"] as const).map((type) => (
                <button key={type} onClick={() => setAnswers({ ...answers, petType: type })} className={cn("p-8 rounded-2xl border-2 transition-all text-center hover:shadow-md", answers.petType === type ? "border-black bg-surface shadow-md" : "border-border hover:border-gray-300")}>
                  <span className="text-5xl block mb-3">{type === "DOG" ? "🐕" : "🐈"}</span>
                  <span className="font-semibold text-text-primary text-lg">{type === "DOG" ? "כלב" : "חתול"}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === "petName" && (
          <div className="text-center max-w-md mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">איך קוראים ל{answers.petType === "DOG" ? "כלב" : "חתול"} שלכם?</h2>
            <p className="text-text-secondary mb-8">זה עוזר לנו להתאים את החוויה. (אופציונלי)</p>
            <input type="text" value={answers.petName} onChange={(e) => setAnswers({ ...answers, petName: e.target.value })} placeholder={answers.petType === "DOG" ? "למשל: רקס" : "למשל: מיצי"} className="w-full text-center text-2xl font-medium border-b-2 border-border pb-3 focus:border-black focus:outline-none transition-colors bg-transparent" />
          </div>
        )}

        {currentStep === "petAge" && (
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">בן כמה {answers.petName || (answers.petType === "DOG" ? "הכלב" : "החתול")} שלכם?</h2>
            <p className="text-text-secondary mb-8">הגיל קובע את הצרכים התזונתיים.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
              {(answers.petType === "DOG" ? [{ value: "puppy", label: "גור", desc: "מתחת לשנה" }, { value: "adult", label: "בוגר", desc: "1-7 שנים" }, { value: "senior", label: "מבוגר", desc: "7+ שנים" }] : [{ value: "kitten", label: "גור", desc: "מתחת לשנה" }, { value: "adult", label: "בוגר", desc: "1-7 שנים" }, { value: "senior", label: "מבוגר", desc: "7+ שנים" }]).map((opt) => (
                <button key={opt.value} onClick={() => setAnswers({ ...answers, petAge: opt.value })} className={cn("p-4 rounded-xl border-2 transition-all text-center", answers.petAge === opt.value ? "border-black bg-surface" : "border-border hover:border-gray-300")}>
                  <p className="font-semibold text-text-primary">{opt.label}</p><p className="text-sm text-text-secondary">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === "petSize" && (
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">מה הגודל של {answers.petName || (answers.petType === "DOG" ? "הכלב" : "החתול")} שלכם?</h2>
            <p className="text-text-secondary mb-8">זה עוזר לנו להמליץ על מנות מתאימות.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
              {[{ value: "small", label: "קטן", desc: answers.petType === "DOG" ? "מתחת ל-10 ק״ג" : "מתחת ל-4 ק״ג" }, { value: "medium", label: "בינוני", desc: answers.petType === "DOG" ? "10-25 ק״ג" : "4-6 ק״ג" }, { value: "large", label: "גדול", desc: answers.petType === "DOG" ? "מעל 25 ק״ג" : "מעל 6 ק״ג" }].map((opt) => (
                <button key={opt.value} onClick={() => setAnswers({ ...answers, petSize: opt.value })} className={cn("p-4 rounded-xl border-2 transition-all text-center", answers.petSize === opt.value ? "border-black bg-surface" : "border-border hover:border-gray-300")}>
                  <p className="font-semibold text-text-primary">{opt.label}</p><p className="text-sm text-text-secondary">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {currentStep === "sensitivities" && (
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">רגישויות או בעיות?</h2>
            <p className="text-text-secondary mb-8">סמנו את כל מה שרלוונטי. (אופציונלי)</p>
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
              {[{ value: "grain", label: "רגישות לגלוטן" }, { value: "digestion", label: "בעיות עיכול" }, { value: "skin", label: "עור ופרווה" }, { value: "weight", label: "ניהול משקל" }, { value: "joints", label: "תמיכה במפרקים" }, { value: "dental", label: "בריאות השיניים" }].map((opt) => {
                const isSelected = answers.sensitivities.includes(opt.value);
                return (
                  <button key={opt.value} onClick={() => setAnswers({ ...answers, sensitivities: isSelected ? answers.sensitivities.filter((s) => s !== opt.value) : [...answers.sensitivities, opt.value] })}
                    className={cn("p-3 rounded-xl border-2 transition-all text-sm font-medium", isSelected ? "border-black bg-surface text-text-primary" : "border-border text-text-secondary hover:border-gray-300")}>
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {currentStep === "results" && (
          <div>
            <div className="text-center mb-10">
              <Sparkles className="h-10 w-10 text-text-primary mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">{answers.petName ? `ההמלצות המושלמות ל${answers.petName}!` : "הנה ההמלצות שלכם!"}</h2>
              <p className="text-text-secondary">בהתבסס על התשובות שלכם, אנחנו חושבים ש{answers.petName || "חיית המחמד שלכם"} יאהבו את אלה:</p>
            </div>
            <ProductGrid products={getRecommendations()} columns={2} />
            <div className="text-center mt-8">
              <Button variant="outline" onClick={() => { setStep(0); setAnswers({ petType: null, petName: "", petAge: "", petSize: "", sensitivities: [] }); }}>מלאו שוב את השאלון</Button>
            </div>
          </div>
        )}

        {currentStep !== "results" && (
          <div className="flex items-center justify-between mt-10">
            <Button variant="ghost" onClick={prevStep} disabled={step === 0} className={step === 0 ? "invisible" : ""}><ArrowRight className="h-4 w-4" />הקודם</Button>
            <Button onClick={nextStep} disabled={!canProceed()}>{step === STEPS.length - 2 ? "הצג תוצאות" : "הבא"}<ArrowLeft className="h-4 w-4" /></Button>
          </div>
        )}
      </div>
    </div>
  );
}
