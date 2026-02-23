"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { ArrowRight, ArrowLeft, Phone, MessageCircle, Star, ShoppingBag } from "lucide-react";
import { formatPrice } from "@/lib/utils";

interface WizardData {
  petName: string;
  petType: "DOG" | "CAT" | null;
  breed: string;
  age: "puppy" | "adult" | "senior" | null;
  weight: string;
  activityLevel: "low" | "medium" | "high" | null;
  healthIssues: string[];
  currentFood: string;
  currentIssues: string[];
  goals: string[];
  firstName: string;
  email: string;
  phone: string;
}

const BREEDS = {
  DOG: ["פודל מיניאטורי", "יורקשייר טרייר", "צ'יוואווה", "גולדן רטריבר", "לברדור", "גרמן שפרד", "שיצו", "מלטז", "ביגל", "בול דוג", "אחר"],
  CAT: ["פרסי", "סיאמי", "מיין קון", "ברמזי", "בריטי קצר שיער", "רגדול", "ספינקס", "חתול רחוב", "אחר"],
};

export default function PersonalConsultationWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [data, setData] = useState<WizardData>({
    petName: "",
    petType: null,
    breed: "",
    age: null,
    weight: "",
    activityLevel: null,
    healthIssues: [],
    currentFood: "",
    currentIssues: [],
    goals: [],
    firstName: "",
    email: "",
    phone: "",
  });

  const totalSteps = 5;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  function updateData(key: keyof WizardData, value: string | string[] | null) {
    setData({ ...data, [key]: value });
  }

  function toggleArrayItem(key: keyof WizardData, value: string) {
    const current = data[key] as string[];
    if (current.includes(value)) {
      updateData(key, current.filter(v => v !== value));
    } else {
      updateData(key, [...current, value]);
    }
  }

  function nextStep() {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function prevStep() {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function handleSubmit() {
    setShowResults(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function getRecommendations() {
    return MOCK_PRODUCTS.filter(p => p.petType === data.petType).slice(0, 3);
  }

  if (showResults) {
    const recommendations = getRecommendations();
    
    return (
      <div className="space-y-12 animate-fade-in">
        {/* Results Header */}
        <div className="text-center bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-12 border-2 border-emerald-200">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
            ההמלצות האישיות שלך מוכנות, {data.firstName}!
          </h1>
          <p className="text-lg text-text-secondary">
            בהתבסס על הפרטים שמסרת עבור {data.petName}
          </p>
        </div>

        {/* Recommendations */}
        <div className="space-y-6">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
              המוצרים המומלצים במיוחד עבור {data.petName}
            </h2>
            <p className="text-text-secondary">נבחרו בקפידה על ידי המומחים שלנו</p>
          </div>

          {recommendations.map((product, idx) => (
            <div key={product.id} className={cn(
              "bg-white rounded-2xl p-6 border-2 transition-all hover:shadow-lg",
              idx === 0 ? "border-accent shadow-lg" : "border-gray-200"
            )}>
              {idx === 0 && (
                <div className="inline-block bg-gradient-to-r from-accent to-accent-400 text-white px-4 py-2 rounded-full text-sm font-bold mb-4">
                  ✨ ההמלצה הראשונה שלנו
                </div>
              )}
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-48 h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center shrink-0">
                  <ShoppingBag className="h-16 w-16 text-gray-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-text-primary mb-2">{product.name}</h3>
                  <p className="text-text-secondary mb-4">{product.shortDesc}</p>
                  <div className="space-y-2 mb-4">
                    <p className="font-bold text-text-primary">למה זה מושלם עבור {data.petName}:</p>
                    <ul className="space-y-1 text-sm text-text-secondary mr-5">
                      {product.benefits?.split('\n').slice(0, 3).map((b, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-emerald-500 shrink-0">✓</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-text-primary">{formatPrice(product.price)}</span>
                      {product.compareAt && (
                        <span className="text-lg text-text-muted line-through">{formatPrice(product.compareAt)}</span>
                      )}
                    </div>
                    {idx === 0 && (
                      <span className="text-sm font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                        חיסכון של 10% ללקוחות חדשים!
                      </span>
                    )}
                  </div>
                  <button className="mt-4 w-full md:w-auto bg-accent hover:bg-accent-400 text-white font-bold py-3 px-8 rounded-lg transition-colors">
                    הוסף לסל
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Personal Care Plan */}
        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border-2 border-blue-200">
          <h2 className="text-2xl font-bold text-text-primary mb-6 text-center">
            תוכנית טיפוח אישית עבור {data.petName} 📋
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 border border-blue-200">
              <div className="text-4xl mb-3">🍽️</div>
              <h3 className="font-bold text-text-primary mb-2">תזונה יומית</h3>
              <p className="text-sm text-text-secondary">
                {data.weight ? `${Math.round(Number(data.weight) * 30)}` : "120"} גרם מזון יבש, פעמיים ביום (בוקר וערב)
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-blue-200">
              <div className="text-4xl mb-3">🧴</div>
              <h3 className="font-bold text-text-primary mb-2">טיפוח שבועי</h3>
              <p className="text-sm text-text-secondary">
                הברשה 2-3 פעמים בשבוע, רחצה כל 6-8 שבועות
              </p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-blue-200">
              <div className="text-4xl mb-3">🦴</div>
              <h3 className="font-bold text-text-primary mb-2">חטיפים ופינוקים</h3>
              <p className="text-sm text-text-secondary">
                עד 10% מהקלוריות היומיות, רצוי חטיפי שיניים
              </p>
            </div>
          </div>
        </div>

        {/* Follow-up Options */}
        <div className="bg-white rounded-2xl p-8 border border-gray-200">
          <h2 className="text-2xl font-bold text-text-primary mb-6 text-center">
            מעקב ותמיכה מתמשכת 🤝
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
              <Phone className="h-8 w-8 text-purple-600 mb-3" />
              <h3 className="font-bold text-text-primary mb-2">ייעוץ טלפוני חינם</h3>
              <p className="text-sm text-text-secondary mb-4">
                נתאם שיחה עם המומחה שלנו תוך 24 שעות
              </p>
              <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                תיאום שיחה
              </button>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
              <MessageCircle className="h-8 w-8 text-green-600 mb-3" />
              <h3 className="font-bold text-text-primary mb-2">מעקב בוואטסאפ</h3>
              <p className="text-sm text-text-secondary mb-4">
                שאלות, תמונות, עדכונים - אנחנו כאן בשבילך
              </p>
              <a href="https://wa.me/972501234567" target="_blank" rel="noopener noreferrer" className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg transition-colors text-center">
                הצטרף לוואטסאפ
              </a>
            </div>
          </div>
        </div>

        {/* Restart Button */}
        <div className="text-center">
          <button
            onClick={() => {
              setShowResults(false);
              setCurrentStep(0);
              setData({
                petName: "", petType: null, breed: "", age: null, weight: "",
                activityLevel: null, healthIssues: [], currentFood: "",
                currentIssues: [], goals: [], firstName: "", email: "", phone: ""
              });
            }}
            className="text-accent hover:text-accent-400 font-medium"
          >
            מלא שאלון חדש
          </button>
        </div>
      </div>
    );
  }

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return data.petName && data.petType;
      case 1:
        return data.age && data.weight;
      case 2:
        return data.activityLevel !== null;
      case 3:
        return true;
      case 4:
        return data.firstName && data.email && data.goals.length > 0;
      default:
        return false;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-3xl p-8 md:p-12 mb-12 text-center border-2 border-accent/20">
        <div className="text-5xl mb-4">🐾</div>
        <h1 className="text-3xl md:text-4xl font-bold text-text-primary mb-4">
          התאמה אישית לחיית המחמד שלך
        </h1>
        <p className="text-lg text-text-secondary mb-6 max-w-2xl mx-auto">
          קבל המלצות מותאמות אישית ממומחי התזונה והטיפוח שלנו
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="flex items-center gap-2 text-sm font-medium text-text-primary bg-white rounded-lg px-3 py-2 border border-gray-200">
            <span className="text-emerald-500">✓</span>
            ייעוץ חינם
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-text-primary bg-white rounded-lg px-3 py-2 border border-gray-200">
            <span className="text-emerald-500">✓</span>
            המלצות מדויקות
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-text-primary bg-white rounded-lg px-3 py-2 border border-gray-200">
            <span className="text-emerald-500">✓</span>
            תוכנית אישית
          </div>
          <div className="flex items-center gap-2 text-sm font-medium text-text-primary bg-white rounded-lg px-3 py-2 border border-gray-200">
            <span className="text-emerald-500">✓</span>
            מעקב מתמשך
          </div>
        </div>
      </div>

      {/* Enhanced Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-bold text-text-primary">שלב {currentStep + 1} מתוך {totalSteps}</span>
          <span className="text-sm font-semibold text-primary-green">{Math.round(progress)}% הושלם</span>
        </div>
        
        {/* Progress Bar */}
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-gradient-to-r from-primary-green to-primary-blue transition-all duration-500 ease-in-out"
            style={{ width: `${progress}%` }}
            role="progressbar"
            aria-valuenow={currentStep + 1}
            aria-valuemin={1}
            aria-valuemax={totalSteps}
          />
        </div>

        {/* Step Dots */}
        <div className="mt-3 flex justify-between">
          {Array.from({ length: totalSteps }, (_, i) => (
            <div
              key={i}
              className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
                i <= currentStep ? 'bg-primary-green' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Wizard Content */}
      <div className="bg-white rounded-2xl p-6 md:p-10 border border-gray-200 shadow-lg min-h-[500px]">
        {/* Step 1: Basic Info */}
        {currentStep === 0 && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
                בוא נכיר את חיית המחמד שלך 👋
              </h2>
              <p className="text-text-secondary">ספר לנו על החבר הפרוותי שלך</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-text-primary mb-3">
                איך קוראים לחיית המחמד שלך?
              </label>
              <input
                type="text"
                value={data.petName}
                onChange={(e) => updateData("petName", e.target.value)}
                placeholder="למשל: מקס, מיה, צ'רלי..."
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-accent focus:outline-none text-lg"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-text-primary mb-3">
                איזה סוג חיית מחמד יש לך?
              </label>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "DOG", icon: "🐕", label: "כלב" },
                  { value: "CAT", icon: "🐱", label: "חתול" },
                ].map((pet) => (
                  <button
                    key={pet.value}
                    type="button"
                    onClick={() => updateData("petType", pet.value)}
                    className={cn(
                      "flex flex-col items-center gap-3 p-6 rounded-xl border-2 transition-all hover:shadow-md",
                      data.petType === pet.value
                        ? "border-accent bg-accent/5 shadow-md"
                        : "border-gray-300 hover:border-gray-400"
                    )}
                  >
                    <span className="text-5xl">{pet.icon}</span>
                    <span className="font-bold text-text-primary text-lg">{pet.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {data.petType && (
              <div className="animate-fade-in">
                <label className="block text-sm font-bold text-text-primary mb-3">
                  איזה גזע?
                </label>
                <select
                  value={data.breed}
                  onChange={(e) => updateData("breed", e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-accent focus:outline-none"
                >
                  <option value="">בחר גזע...</option>
                  {BREEDS[data.petType].map((breed) => (
                    <option key={breed} value={breed}>{breed}</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Age & Size */}
        {currentStep === 1 && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
                גיל ומשקל 📏
              </h2>
              <p className="text-text-secondary">נתונים אלו חיוניים לבחירת המזון והמוצרים הנכונים</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-text-primary mb-3">
                כמה בן/בת {data.petName || "חיית המחמד"}?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: "puppy", icon: "🍼", label: data.petType === "DOG" ? "גור" : "גורה", desc: "עד שנה" },
                  { value: "adult", icon: "💪", label: "בוגר/ת", desc: "1-7 שנים" },
                  { value: "senior", icon: "👴", label: "מבוגר/ת", desc: "7+ שנים" },
                ].map((age) => (
                  <button
                    key={age.value}
                    type="button"
                    onClick={() => updateData("age", age.value)}
                    className={cn(
                      "flex items-center gap-4 p-5 rounded-xl border-2 transition-all hover:shadow-md text-right",
                      data.age === age.value
                        ? "border-accent bg-accent/5 shadow-md"
                        : "border-gray-300 hover:border-gray-400"
                    )}
                  >
                    <span className="text-4xl">{age.icon}</span>
                    <div>
                      <p className="font-bold text-text-primary">{age.label}</p>
                      <p className="text-sm text-text-secondary">{age.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-text-primary mb-3">
                כמה שוקל/ת {data.petName || "חיית המחמד"}?
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={data.weight}
                  onChange={(e) => updateData("weight", e.target.value)}
                  placeholder="משקל"
                  className="flex-1 px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-accent focus:outline-none text-lg"
                  min="0"
                  step="0.1"
                />
                <span className="text-lg font-bold text-text-primary px-4 py-3 bg-gray-100 rounded-lg border-2 border-gray-300">
                  ק״ג
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Health & Activity */}
        {currentStep === 2 && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
                בריאות ופעילות 🏃
              </h2>
              <p className="text-text-secondary">כדי להתאים את המוצרים בצורה מיטבית</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-text-primary mb-3">
                מה רמת הפעילות של {data.petName || "חיית המחמד"}?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { value: "low", icon: "😴", label: "נמוכה", desc: "בעיקר בבית" },
                  { value: "medium", icon: "🚶", label: "בינונית", desc: "הליכות יומיות" },
                  { value: "high", icon: "🏃", label: "גבוהה", desc: "ריצות ואימונים" },
                ].map((level) => (
                  <button
                    key={level.value}
                    type="button"
                    onClick={() => updateData("activityLevel", level.value)}
                    className={cn(
                      "flex items-center gap-4 p-5 rounded-xl border-2 transition-all hover:shadow-md text-right",
                      data.activityLevel === level.value
                        ? "border-accent bg-accent/5 shadow-md"
                        : "border-gray-300 hover:border-gray-400"
                    )}
                  >
                    <span className="text-4xl">{level.icon}</span>
                    <div>
                      <p className="font-bold text-text-primary">{level.label}</p>
                      <p className="text-sm text-text-secondary">{level.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-text-primary mb-3">
                יש בעיות בריאות מיוחדות? (אפשר לבחור מספר)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { value: "sensitive-stomach", label: "קיבה רגישה" },
                  { value: "allergies", label: "אלרגיות מזון" },
                  { value: "skin-issues", label: "בעיות עור" },
                  { value: "weight-management", label: "ניהול משקל" },
                  { value: "dental-health", label: "בריאות שיניים" },
                  { value: "none", label: "אין בעיות" },
                ].map((issue) => (
                  <label
                    key={issue.value}
                    className={cn(
                      "flex items-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all",
                      data.healthIssues.includes(issue.value)
                        ? "border-accent bg-accent/5"
                        : "border-gray-300 hover:border-gray-400"
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={data.healthIssues.includes(issue.value)}
                      onChange={() => toggleArrayItem("healthIssues", issue.value)}
                      className="w-5 h-5 text-accent rounded border-gray-300"
                    />
                    <span className="text-sm font-medium text-text-primary">{issue.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Current Situation */}
        {currentStep === 3 && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
                המצב הנוכחי 🔍
              </h2>
              <p className="text-text-secondary">ספר לנו על המוצרים שאתה משתמש בהם כיום</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-text-primary mb-3">
                איזה מזון {data.petName || "חיית המחמד"} אוכל/ת כיום?
              </label>
              <input
                type="text"
                value={data.currentFood}
                onChange={(e) => updateData("currentFood", e.target.value)}
                placeholder="שם המותג הנוכחי (אופציונלי)"
                className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-accent focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-text-primary mb-3">
                מה החיסרונות הגדולים ביותר במצב הנוכחי?
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { value: "expensive", label: "יקר מדי" },
                  { value: "poor-quality", label: "איכות לא טובה" },
                  { value: "doesnt-like", label: "לא אוהב את הטעם" },
                  { value: "hard-to-find", label: "קשה להשיג" },
                  { value: "no-variety", label: "חוסר מגוון" },
                  { value: "no-issues", label: "מרוצה מהמצב" },
                ].map((issue) => (
                  <label
                    key={issue.value}
                    className={cn(
                      "flex items-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all",
                      data.currentIssues.includes(issue.value)
                        ? "border-accent bg-accent/5"
                        : "border-gray-300 hover:border-gray-400"
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={data.currentIssues.includes(issue.value)}
                      onChange={() => toggleArrayItem("currentIssues", issue.value)}
                      className="w-5 h-5 text-accent rounded border-gray-300"
                    />
                    <span className="text-sm font-medium text-text-primary">{issue.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Goals & Contact */}
        {currentStep === 4 && (
          <div className="space-y-8 animate-fade-in">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-text-primary mb-3">
                המטרות שלך 🎯
              </h2>
              <p className="text-text-secondary">מה הכי חשוב לך לשפר?</p>
            </div>

            <div>
              <label className="block text-sm font-bold text-text-primary mb-3">
                מה המטרות העיקריות שלך? (בחר לפחות אחת)
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {[
                  { value: "better-health", label: "🌟 שיפור בריאות כללית" },
                  { value: "better-coat", label: "✨ פרווה יפה ובריאה" },
                  { value: "weight-control", label: "⚖️ ניהול משקל" },
                  { value: "more-energy", label: "⚡ יותר אנרגיה" },
                  { value: "digestive", label: "🦴 בריאות עיכול" },
                  { value: "convenience", label: "📦 נוחות ומשלוחים" },
                ].map((goal) => (
                  <label
                    key={goal.value}
                    className={cn(
                      "flex items-center gap-2 p-4 rounded-lg border-2 cursor-pointer transition-all",
                      data.goals.includes(goal.value)
                        ? "border-accent bg-accent/5"
                        : "border-gray-300 hover:border-gray-400"
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={data.goals.includes(goal.value)}
                      onChange={() => toggleArrayItem("goals", goal.value)}
                      className="w-5 h-5 text-accent rounded border-gray-300"
                    />
                    <span className="text-sm font-medium text-text-primary">{goal.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border-2 border-gray-200">
              <label className="block text-sm font-bold text-text-primary mb-4">
                איך נוכל להיות איתך בקשר לגבי ההמלצות? 📧
              </label>
              <div className="space-y-3">
                <input
                  type="text"
                  value={data.firstName}
                  onChange={(e) => updateData("firstName", e.target.value)}
                  placeholder="שם פרטי *"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-accent focus:outline-none"
                  required
                />
                <input
                  type="email"
                  value={data.email}
                  onChange={(e) => updateData("email", e.target.value)}
                  placeholder="דוא״ל *"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-accent focus:outline-none"
                  required
                />
                <input
                  type="tel"
                  value={data.phone}
                  onChange={(e) => updateData("phone", e.target.value)}
                  placeholder="טלפון (אופציונלי)"
                  className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 focus:border-accent focus:outline-none"
                />
              </div>
              <p className="text-xs text-text-muted mt-3">
                💡 נשתמש בפרטים אלו רק כדי לשלוח לך את ההמלצות האישיות. לא נשלח ספאם.
              </p>
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-10 pt-6 border-t border-gray-200">
          <Button
            type="button"
            variant="ghost"
            onClick={prevStep}
            disabled={currentStep === 0}
            className={currentStep === 0 ? "invisible" : ""}
          >
            <ArrowRight className="h-4 w-4" />
            חזרה
          </Button>
          
          {currentStep < totalSteps - 1 ? (
            <Button
              type="button"
              onClick={nextStep}
              disabled={!canProceed()}
              size="lg"
              className="font-bold"
            >
              הבא
              <ArrowLeft className="h-4 w-4" />
            </Button>
          ) : (
            <Button
              type="button"
              onClick={handleSubmit}
              disabled={!canProceed()}
              size="lg"
              className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 font-bold"
            >
              קבל המלצות אישיות!
              <Star className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
