"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import ProductGrid from "@/components/product/ProductGrid";
import { MOCK_PRODUCTS } from "@/lib/mock-data";
import { ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

interface QuizState {
  petType: "DOG" | "CAT" | null;
  petName: string;
  petAge: string;
  petSize: string;
  sensitivities: string[];
}

const STEPS = [
  "petType",
  "petName",
  "petAge",
  "petSize",
  "sensitivities",
  "results",
] as const;

export default function QuizFlow() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizState>({
    petType: null,
    petName: "",
    petAge: "",
    petSize: "",
    sensitivities: [],
  });

  const currentStep = STEPS[step];
  const progress = ((step + 1) / STEPS.length) * 100;

  function nextStep() {
    if (step < STEPS.length - 1) setStep(step + 1);
  }

  function prevStep() {
    if (step > 0) setStep(step - 1);
  }

  function getRecommendations() {
    let products = MOCK_PRODUCTS.filter(
      (p) => p.petType === answers.petType
    );

    if (answers.petAge === "puppy" || answers.petAge === "kitten") {
      const puppyProducts = products.filter(
        (p) => p.tags.includes("puppy") || p.tags.includes("growth")
      );
      if (puppyProducts.length > 0) products = puppyProducts;
    }

    if (answers.petAge === "senior") {
      const seniorProducts = products.filter(
        (p) => p.tags.includes("senior") || p.tags.includes("gentle")
      );
      if (seniorProducts.length > 0) products = seniorProducts;
    }

    if (answers.sensitivities.includes("grain")) {
      const grainFree = products.filter((p) =>
        p.tags.includes("grain-free")
      );
      if (grainFree.length > 0) products = grainFree;
    }

    if (answers.sensitivities.includes("digestion")) {
      const digestive = products.filter(
        (p) =>
          p.tags.includes("gentle") ||
          p.tags.includes("digestion") ||
          p.tags.includes("sensitive")
      );
      if (digestive.length > 0) products = digestive;
    }

    return products.slice(0, 4);
  }

  function canProceed(): boolean {
    switch (currentStep) {
      case "petType":
        return answers.petType !== null;
      case "petName":
        return true; // Optional
      case "petAge":
        return answers.petAge !== "";
      case "petSize":
        return answers.petSize !== "";
      case "sensitivities":
        return true; // Optional
      default:
        return true;
    }
  }

  return (
    <div>
      {/* Progress Bar */}
      {currentStep !== "results" && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-stone-500">
              Step {step + 1} of {STEPS.length - 1}
            </span>
            <span className="text-sm text-stone-400">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-2 bg-stone-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-amber-500 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Steps */}
      <div className="bg-white rounded-3xl p-8 md:p-12 border border-stone-200 shadow-sm">
        {/* Pet Type */}
        {currentStep === "petType" && (
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-3">
              What kind of pet do you have?
            </h2>
            <p className="text-stone-500 mb-8">
              Let&apos;s find the perfect products for your furry friend.
            </p>

            <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
              <button
                onClick={() =>
                  setAnswers({ ...answers, petType: "DOG" })
                }
                className={cn(
                  "p-8 rounded-2xl border-2 transition-all text-center hover:shadow-md",
                  answers.petType === "DOG"
                    ? "border-amber-500 bg-amber-50 shadow-md"
                    : "border-stone-200 hover:border-stone-300"
                )}
              >
                <span className="text-5xl block mb-3">🐕</span>
                <span className="font-semibold text-stone-900 text-lg">
                  Dog
                </span>
              </button>

              <button
                onClick={() =>
                  setAnswers({ ...answers, petType: "CAT" })
                }
                className={cn(
                  "p-8 rounded-2xl border-2 transition-all text-center hover:shadow-md",
                  answers.petType === "CAT"
                    ? "border-amber-500 bg-amber-50 shadow-md"
                    : "border-stone-200 hover:border-stone-300"
                )}
              >
                <span className="text-5xl block mb-3">🐈</span>
                <span className="font-semibold text-stone-900 text-lg">
                  Cat
                </span>
              </button>
            </div>
          </div>
        )}

        {/* Pet Name */}
        {currentStep === "petName" && (
          <div className="text-center max-w-md mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-3">
              What&apos;s your {answers.petType === "DOG" ? "dog" : "cat"}&apos;s name?
            </h2>
            <p className="text-stone-500 mb-8">
              This helps us personalize your experience. (Optional)
            </p>
            <input
              type="text"
              value={answers.petName}
              onChange={(e) =>
                setAnswers({ ...answers, petName: e.target.value })
              }
              placeholder={answers.petType === "DOG" ? "e.g., Buddy" : "e.g., Whiskers"}
              className="w-full text-center text-2xl font-medium border-b-2 border-stone-200 pb-3 focus:border-amber-500 focus:outline-none transition-colors bg-transparent"
            />
          </div>
        )}

        {/* Pet Age */}
        {currentStep === "petAge" && (
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-3">
              How old is {answers.petName || (answers.petType === "DOG" ? "your dog" : "your cat")}?
            </h2>
            <p className="text-stone-500 mb-8">
              Age determines nutritional needs.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
              {(answers.petType === "DOG"
                ? [
                    { value: "puppy", label: "Puppy", desc: "Under 1 year" },
                    { value: "adult", label: "Adult", desc: "1–7 years" },
                    { value: "senior", label: "Senior", desc: "7+ years" },
                  ]
                : [
                    { value: "kitten", label: "Kitten", desc: "Under 1 year" },
                    { value: "adult", label: "Adult", desc: "1–7 years" },
                    { value: "senior", label: "Senior", desc: "7+ years" },
                  ]
              ).map((opt) => (
                <button
                  key={opt.value}
                  onClick={() =>
                    setAnswers({ ...answers, petAge: opt.value })
                  }
                  className={cn(
                    "p-4 rounded-xl border-2 transition-all text-center",
                    answers.petAge === opt.value
                      ? "border-amber-500 bg-amber-50"
                      : "border-stone-200 hover:border-stone-300"
                  )}
                >
                  <p className="font-semibold text-stone-900">{opt.label}</p>
                  <p className="text-sm text-stone-500">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Pet Size */}
        {currentStep === "petSize" && (
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-3">
              What size is {answers.petName || (answers.petType === "DOG" ? "your dog" : "your cat")}?
            </h2>
            <p className="text-stone-500 mb-8">
              This helps us recommend the right portion sizes.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-lg mx-auto">
              {[
                {
                  value: "small",
                  label: "Small",
                  desc:
                    answers.petType === "DOG" ? "Under 25 lbs" : "Under 8 lbs",
                },
                {
                  value: "medium",
                  label: "Medium",
                  desc:
                    answers.petType === "DOG" ? "25–50 lbs" : "8–12 lbs",
                },
                {
                  value: "large",
                  label: "Large",
                  desc:
                    answers.petType === "DOG" ? "50+ lbs" : "12+ lbs",
                },
              ].map((opt) => (
                <button
                  key={opt.value}
                  onClick={() =>
                    setAnswers({ ...answers, petSize: opt.value })
                  }
                  className={cn(
                    "p-4 rounded-xl border-2 transition-all text-center",
                    answers.petSize === opt.value
                      ? "border-amber-500 bg-amber-50"
                      : "border-stone-200 hover:border-stone-300"
                  )}
                >
                  <p className="font-semibold text-stone-900">{opt.label}</p>
                  <p className="text-sm text-stone-500">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Sensitivities */}
        {currentStep === "sensitivities" && (
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-3">
              Any sensitivities or concerns?
            </h2>
            <p className="text-stone-500 mb-8">
              Select all that apply. (Optional)
            </p>

            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
              {[
                { value: "grain", label: "Grain sensitivity" },
                { value: "digestion", label: "Digestive issues" },
                { value: "skin", label: "Skin & coat" },
                { value: "weight", label: "Weight management" },
                { value: "joints", label: "Joint support" },
                { value: "dental", label: "Dental health" },
              ].map((opt) => {
                const isSelected = answers.sensitivities.includes(opt.value);
                return (
                  <button
                    key={opt.value}
                    onClick={() => {
                      const newSensitivities = isSelected
                        ? answers.sensitivities.filter((s) => s !== opt.value)
                        : [...answers.sensitivities, opt.value];
                      setAnswers({
                        ...answers,
                        sensitivities: newSensitivities,
                      });
                    }}
                    className={cn(
                      "p-3 rounded-xl border-2 transition-all text-sm font-medium",
                      isSelected
                        ? "border-amber-500 bg-amber-50 text-amber-700"
                        : "border-stone-200 text-stone-600 hover:border-stone-300"
                    )}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Results */}
        {currentStep === "results" && (
          <div>
            <div className="text-center mb-10">
              <Sparkles className="h-10 w-10 text-amber-500 mx-auto mb-4" />
              <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-3">
                {answers.petName
                  ? `Perfect picks for ${answers.petName}!`
                  : "Here are your recommendations!"}
              </h2>
              <p className="text-stone-500">
                Based on your answers, we think{" "}
                {answers.petName || "your pet"} will love these:
              </p>
            </div>

            <ProductGrid products={getRecommendations()} columns={2} />

            <div className="text-center mt-8">
              <Button
                variant="outline"
                onClick={() => {
                  setStep(0);
                  setAnswers({
                    petType: null,
                    petName: "",
                    petAge: "",
                    petSize: "",
                    sensitivities: [],
                  });
                }}
              >
                Retake Quiz
              </Button>
            </div>
          </div>
        )}

        {/* Navigation */}
        {currentStep !== "results" && (
          <div className="flex items-center justify-between mt-10">
            <Button
              variant="ghost"
              onClick={prevStep}
              disabled={step === 0}
              className={step === 0 ? "invisible" : ""}
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>

            <Button onClick={nextStep} disabled={!canProceed()}>
              {step === STEPS.length - 2 ? "See Results" : "Next"}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
