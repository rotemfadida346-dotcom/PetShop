"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const CATEGORIES = [
  {
    title: "מזון",
    icon: "🍖",
    description: "מזון איכותי ובריא לחיות המחמד שלכם",
    href: "/shop?category=FOOD",
    bg: "bg-gradient-to-br from-[#2ABAA0] to-[#22A08A]",
    textColor: "text-white",
    btnClass: "bg-white/20 hover:bg-white/30 text-white",
  },
  {
    title: "חטיפים",
    icon: "🦴",
    description: "חטיפים טעימים לאילוף ולפינוק יומיומי",
    href: "/shop?category=TREATS",
    bg: "bg-gradient-to-br from-[#F08080] to-[#D96C6C]",
    textColor: "text-white",
    btnClass: "bg-white/20 hover:bg-white/30 text-white",
  },
  {
    title: "צעצועים",
    icon: "🎾",
    description: "משחקים שיעשו את החברים שלכם מאושרים",
    href: "/shop?category=TOYS",
    bg: "bg-gradient-to-br from-[#FFD966] to-[#F0C84D]",
    textColor: "text-gray-900",
    btnClass: "bg-black/10 hover:bg-black/20 text-gray-900",
  },
  {
    title: "מיטות",
    icon: "🛏️",
    description: "מיטה נוחה ומעוצבת לכל חיית מחמד",
    href: "/shop?category=ACCESSORIES",
    bg: "bg-gradient-to-br from-[#8B7EC8] to-[#7468B0]",
    textColor: "text-white",
    btnClass: "bg-white/20 hover:bg-white/30 text-white",
  },
  {
    title: "חול לחתולים",
    icon: "🧹",
    description: "חול טבעי עם שליטה מעולה בריחות",
    href: "/shop?category=LITTER",
    bg: "bg-gradient-to-br from-[#5DADE2] to-[#4A9BD9]",
    textColor: "text-white",
    btnClass: "bg-white/20 hover:bg-white/30 text-white",
  },
  {
    title: "מגרדות",
    icon: "🐾",
    description: "מגרדות ועמדות טיפוס לחתולים שאוהבים לגרד",
    href: "/shop?category=ACCESSORIES",
    bg: "bg-gradient-to-br from-[#E8A87C] to-[#D4956A]",
    textColor: "text-white",
    btnClass: "bg-white/20 hover:bg-white/30 text-white",
  },
];

export default function CategoryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
      {CATEGORIES.map((cat) => (
        <Link
          key={cat.title}
          href={cat.href}
          className={`group relative ${cat.bg} rounded-xl p-6 md:p-7 shadow-md hover:shadow-xl hover:scale-[1.03] transition-all duration-300 overflow-hidden`}
        >
          {/* Decorative circle */}
          <div className="absolute -top-6 -left-6 w-28 h-28 bg-white/10 rounded-full blur-xl" />
          <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-black/5 rounded-full blur-xl" />

          <div className="relative">
            {/* Icon */}
            <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform duration-300">
              {cat.icon}
            </span>

            {/* Title */}
            <h3 className={`text-xl md:text-2xl font-extrabold ${cat.textColor} mb-1.5`}>
              {cat.title}
            </h3>

            {/* Description */}
            <p className={`text-sm ${cat.textColor} opacity-85 leading-relaxed mb-4`}>
              {cat.description}
            </p>

            {/* CTA Button */}
            <span className={`inline-flex items-center gap-1.5 ${cat.btnClass} px-4 py-2 rounded-lg text-sm font-bold transition-all duration-200`}>
              לצפייה
              <ArrowLeft className="h-3.5 w-3.5 group-hover:translate-x-[-3px] transition-transform" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
