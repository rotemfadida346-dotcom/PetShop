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
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border">
      <div className="bg-black text-white text-center text-xs py-2 px-4">
        <p>משלוח חינם בהזמנות מעל ₪200 | מנוי וחיסכון עד 15%</p>
      </div>

      <Container>
        <nav className="flex items-center justify-between h-16 lg:h-20">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 -mr-2 text-muted hover:text-black transition-colors"
            aria-label="תפריט"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">P</span>
            </div>
            <span className="text-xl font-bold text-black tracking-tight">Pawsome</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted hover:text-black transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button className="hidden sm:flex p-2 text-muted hover:text-black transition-colors" aria-label="חיפוש">
              <Search className="h-5 w-5" />
            </button>
            <Link href="/account" className="hidden sm:flex p-2 text-muted hover:text-black transition-colors" aria-label="חשבון">
              <User className="h-5 w-5" />
            </Link>
            <Link href="/cart" className="relative p-2 text-muted hover:text-black transition-colors" aria-label="עגלה">
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -left-0.5 bg-black text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </Container>

      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-border">
          <Container>
            <div className="py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 text-base font-medium text-muted hover:text-black hover:bg-gray-50 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <hr className="my-2 border-border" />
              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 text-base font-medium text-muted hover:text-black hover:bg-gray-50 rounded-lg transition-colors"
              >
                החשבון שלי
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
