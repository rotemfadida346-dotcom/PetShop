"use client";

import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/store/cart";
import Container from "@/components/ui/Container";
import { ShoppingBag, Menu, X, Search, User } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const itemCount = useCartStore((s) => s.getItemCount());

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      {/* Promo bar */}
      <div className="bg-gradient-to-r from-brand-500 to-brand-600 text-white text-center text-xs py-2 px-4 font-medium">
        <p>🐾 משלוח חינם בהזמנות מעל ₪200 | מנוי וחיסכון עד 10% על כל הזמנה 🐾</p>
      </div>

      <Container>
        <nav className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Mobile menu */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 -mr-2 text-gray-500 hover:text-gray-900 transition-colors"
            aria-label="תפריט"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 bg-brand-500 rounded-xl flex items-center justify-center shadow-md shadow-brand-500/20 group-hover:shadow-lg group-hover:shadow-brand-500/30 transition-shadow">
              <span className="text-white font-bold text-base">P</span>
            </div>
            <span className="text-xl font-extrabold text-gray-900 tracking-tight">Pawsome</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-gray-500 hover:text-brand-600 hover:bg-brand-50 px-3 py-2 rounded-lg transition-all"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button className="hidden sm:flex p-2.5 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-all" aria-label="חיפוש">
              <Search className="h-5 w-5" />
            </button>
            <Link href="/account" className="hidden sm:flex p-2.5 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-all" aria-label="חשבון">
              <User className="h-5 w-5" />
            </Link>
            <Link href="/cart" className="relative p-2.5 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-all" aria-label="עגלה">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute top-0.5 left-0.5 bg-brand-500 text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center shadow-sm">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </Container>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100">
          <Container>
            <div className="py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-base font-medium text-gray-600 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-all">
                  {link.label}
                </Link>
              ))}
              <hr className="my-2 border-gray-100" />
              <Link href="/account" onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 text-base font-medium text-gray-600 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-all">
                החשבון שלי
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
