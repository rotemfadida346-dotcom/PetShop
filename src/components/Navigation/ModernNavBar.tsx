"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Percent,
  Dog,
  Cat,
  Rabbit,
  Bird,
  Fish,
  ShoppingBag,
  Phone,
  Heart,
  User,
  Menu,
  X,
} from "lucide-react";
import { useCartStore } from "@/store/cart";
import { formatPrice } from "@/lib/utils";
import ComingSoonModal from "@/components/Modals/ComingSoonModal";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  color: string;
  isActive: boolean;
}

const navItems: NavItem[] = [
  {
    label: "ראשי",
    href: "/",
    icon: <Home size={24} />,
    color: "hover:bg-primary-green/10 hover:text-primary-green",
    isActive: true,
  },
  {
    label: "מבצעים",
    href: "/subscriptions",
    icon: <Percent size={24} />,
    color: "hover:bg-error/10 hover:text-error",
    isActive: true,
  },
  {
    label: "כלבים",
    href: "/shop?pet=DOG",
    icon: <Dog size={24} />,
    color: "hover:bg-amber-50 hover:text-amber-600",
    isActive: true,
  },
  {
    label: "חתולים",
    href: "/shop?pet=CAT",
    icon: <Cat size={24} />,
    color: "hover:bg-purple-50 hover:text-purple-600",
    isActive: true,
  },
  {
    label: "מכרסמים",
    href: "/rodents",
    icon: <Rabbit size={24} />,
    color: "hover:bg-orange-50 hover:text-orange-600",
    isActive: false,
  },
  {
    label: "ציפורים",
    href: "/birds",
    icon: <Bird size={24} />,
    color: "hover:bg-sky-50 hover:text-sky-600",
    isActive: false,
  },
  {
    label: "דגים",
    href: "/fish",
    icon: <Fish size={24} />,
    color: "hover:bg-blue-50 hover:text-blue-600",
    isActive: false,
  },
];

export default function ModernNavBar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [comingSoonModal, setComingSoonModal] = useState<{
    isOpen: boolean;
    category: string;
    icon: React.ReactNode;
  }>({
    isOpen: false,
    category: "",
    icon: null,
  });

  const count = useCartStore((s) => s.getItemCount());
  const subtotal = useCartStore((s) => s.getSubtotal());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (item: NavItem) => {
    if (!item.isActive) {
      setComingSoonModal({
        isOpen: true,
        category: item.label,
        icon: item.icon,
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* Coming Soon Modal */}
      <ComingSoonModal
        isOpen={comingSoonModal.isOpen}
        onClose={() => setComingSoonModal({ isOpen: false, category: "", icon: null })}
        category={comingSoonModal.category}
        icon={comingSoonModal.icon}
      />

      {/* Top Bar */}
      <div className="bg-gradient-to-r from-primary-green to-primary-blue text-white">
        <div className="container mx-auto flex items-center justify-between px-4 py-2 text-sm">
          <a
            href="tel:0509555350"
            className="flex items-center gap-2 font-bold transition-opacity hover:opacity-80"
          >
            <Phone size={16} />
            <span>050-9555350</span>
          </a>

          <span className="hidden md:block text-xs">שעות פעילות: א׳-ה׳ 9:00-18:00 | ו׳ 9:00-13:00</span>

          <div className="flex items-center gap-4">
            <Link href="/auth/signin" className="transition-opacity hover:opacity-80 font-medium">
              התחבר
            </Link>
            <Link href="/auth/signup" className="transition-opacity hover:opacity-80 font-medium">
              הרשם
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`sticky top-0 z-40 bg-white transition-all duration-300 ${
          isScrolled ? "shadow-lg" : "shadow-md"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-green to-primary-blue rounded-xl flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                <svg viewBox="0 0 100 100" className="w-8 h-8">
                  <path d="M50 20c-8 0-15 7-15 15s7 15 15 15 15-7 15-15-7-15-15-15z" fill="white"/>
                  <circle cx="35" cy="30" r="8" fill="white" opacity="0.8"/>
                  <circle cx="65" cy="30" r="8" fill="white" opacity="0.8"/>
                  <circle cx="25" cy="45" r="6" fill="white" opacity="0.6"/>
                  <circle cx="75" cy="45" r="6" fill="white" opacity="0.6"/>
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-extrabold bg-gradient-to-r from-primary-green to-primary-blue bg-clip-text text-transparent">
                  PawStory
                </h1>
                <span className="text-[10px] text-text-secondary">החנות הפרימיום לחיות מחמד</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden items-center gap-1 lg:flex">
              {navItems.map((item) => {
                const isActive = pathname === item.href;

                if (item.isActive) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={`group relative flex flex-col items-center gap-1.5 rounded-xl px-4 py-3 transition-all duration-200 ${
                        item.color
                      } ${
                        isActive
                          ? "bg-primary-green/10 text-primary-green"
                          : "text-text-primary hover:scale-105"
                      }`}
                    >
                      <div className="transition-transform group-hover:-translate-y-0.5">
                        {item.icon}
                      </div>
                      <span className="text-sm font-medium">{item.label}</span>
                      {isActive && (
                        <div className="absolute bottom-0 left-1/2 h-1 w-8 -translate-x-1/2 rounded-full bg-primary-green" />
                      )}
                    </Link>
                  );
                }

                return (
                  <button
                    key={item.label}
                    onClick={() => handleNavClick(item)}
                    className={`group relative flex flex-col items-center gap-1.5 rounded-xl px-4 py-3 transition-all duration-200 ${item.color} text-text-primary hover:scale-105`}
                  >
                    <span className="absolute left-1/2 top-1 -translate-x-1/2 rounded-full bg-warning px-2 py-0.5 text-[10px] font-bold text-yellow-900 shadow-sm">
                      בקרוב
                    </span>
                    <div className="transition-transform group-hover:-translate-y-0.5 mt-4">
                      {item.icon}
                    </div>
                    <span className="text-sm font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              <Link href="/wishlist" className="hidden md:flex items-center gap-2 px-4 py-2 border-2 border-primary-green text-primary-green rounded-full hover:bg-primary-green hover:text-white transition-all relative">
                <Heart className="h-4 w-4" />
              </Link>

              <Link
                href="/cart"
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-green to-primary-blue text-white rounded-full hover:shadow-lg hover:shadow-primary-green/30 transition-all relative"
              >
                <ShoppingBag size={20} />
                {count > 0 && (
                  <>
                    <span className="hidden sm:inline font-bold">{count}</span>
                    <span className="hidden md:inline text-sm">{formatPrice(subtotal)}</span>
                    <span className="absolute -top-2 -right-2 bg-warning text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                      {count}
                    </span>
                  </>
                )}
              </Link>

              <button
                className="rounded-lg p-2 text-text-primary transition-colors hover:bg-gray-100 lg:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="תפריט"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="border-t border-gray-200 bg-white lg:hidden">
            <div className="container mx-auto px-4 py-4">
              <div className="grid grid-cols-2 gap-3">
                {navItems.map((item) => {
                  const isActive = pathname === item.href;

                  if (item.isActive) {
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`relative flex flex-col items-center gap-2 rounded-xl p-4 transition-all ${
                          item.color
                        } ${
                          isActive
                            ? "bg-primary-green/10 text-primary-green"
                            : "text-text-primary"
                        }`}
                      >
                        {item.icon}
                        <span className="text-sm font-medium">{item.label}</span>
                      </Link>
                    );
                  }

                  return (
                    <button
                      key={item.label}
                      onClick={() => handleNavClick(item)}
                      className={`relative flex flex-col items-center gap-2 rounded-xl p-4 transition-all ${item.color} text-text-primary`}
                    >
                      <span className="absolute left-2 top-2 rounded-full bg-warning px-2 py-0.5 text-[10px] font-bold text-yellow-900">
                        בקרוב
                      </span>
                      {item.icon}
                      <span className="text-sm font-medium">{item.label}</span>
                    </button>
                  );
                })}
              </div>
              
              {/* Mobile Auth Links */}
              <div className="mt-4 pt-4 border-t border-gray-200 flex gap-3">
                <Link
                  href="/auth/signin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 text-center px-4 py-3 border-2 border-primary-green text-primary-green rounded-xl font-bold hover:bg-primary-green hover:text-white transition-all"
                >
                  <User className="h-4 w-4 inline ml-2" />
                  התחבר
                </Link>
                <Link
                  href="/auth/signup"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex-1 text-center px-4 py-3 bg-gradient-to-r from-primary-green to-primary-blue text-white rounded-xl font-bold hover:shadow-lg transition-all"
                >
                  הרשם
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
