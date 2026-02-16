"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

const CATEGORIES = [
  { title: "מזון", icon: "🍖", desc: "מזון איכותי ובריא לכלבים ולחתולים", href: "/shop?category=FOOD", bg: "from-[#1A3330] to-[#0F2220]", accent: "text-[#5CB8A4]", btn: "bg-[#5CB8A4]/15 hover:bg-[#5CB8A4]/25 text-[#5CB8A4]" },
  { title: "חטיפים", icon: "🦴", desc: "חטיפים טעימים לאילוף ולפינוק", href: "/shop?category=TREATS", bg: "from-[#2D1C1C] to-[#1E1212]", accent: "text-[#E88080]", btn: "bg-[#E88080]/15 hover:bg-[#E88080]/25 text-[#E88080]" },
  { title: "צעצועים", icon: "🎾", desc: "משחקים שישמחו כל חיית מחמד", href: "/shop?category=TOYS", bg: "from-[#2A2610] to-[#1C1A0A]", accent: "text-[#E8C84A]", btn: "bg-[#E8C84A]/15 hover:bg-[#E8C84A]/25 text-[#E8C84A]" },
  { title: "מיטות", icon: "🛏️", desc: "מיטות נוחות ומעוצבות", href: "/shop?category=ACCESSORIES", bg: "from-[#1F1A2D] to-[#141020]", accent: "text-[#B48AE8]", btn: "bg-[#B48AE8]/15 hover:bg-[#B48AE8]/25 text-[#B48AE8]" },
  { title: "חול לחתולים", icon: "🧹", desc: "חול טבעי עם שליטה בריחות", href: "/shop?category=LITTER", bg: "from-[#152530] to-[#0D1820]", accent: "text-[#5DADE2]", btn: "bg-[#5DADE2]/15 hover:bg-[#5DADE2]/25 text-[#5DADE2]" },
  { title: "מגרדות", icon: "🐾", desc: "מגרדות ועמדות טיפוס לחתולים", href: "/shop?category=ACCESSORIES", bg: "from-[#2A2018] to-[#1C1610]", accent: "text-[#E8A87C]", btn: "bg-[#E8A87C]/15 hover:bg-[#E8A87C]/25 text-[#E8A87C]" },
];

export default function CategoryCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
      {CATEGORIES.map((c) => (
        <Link key={c.title} href={c.href} className={`group bg-gradient-to-br ${c.bg} rounded-2xl p-6 border border-white/5 hover:border-white/10 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 overflow-hidden relative`}>
          <div className="absolute -top-8 -left-8 w-24 h-24 bg-white/[0.03] rounded-full blur-2xl" />
          <div className="relative space-y-3">
            <span className="text-3xl block group-hover:scale-110 transition-transform duration-300">{c.icon}</span>
            <h3 className={`text-lg font-extrabold ${c.accent}`}>{c.title}</h3>
            <p className="text-body-sm text-text-secondary leading-relaxed">{c.desc}</p>
            <span className={`inline-flex items-center gap-1.5 ${c.btn} px-3.5 py-1.5 rounded-lg text-body-sm font-bold transition-all`}>
              לצפייה <ArrowLeft className="h-3.5 w-3.5 group-hover:translate-x-[-2px] transition-transform" />
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
}
