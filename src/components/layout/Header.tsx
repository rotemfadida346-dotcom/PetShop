"use client";

import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/store/cart";
import Container from "@/components/ui/Container";
import { ShoppingBag, Menu, X, Search, User, Shield } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const itemCount = useCartStore((s) => s.getItemCount());

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-accent text-white text-center text-xs py-2 px-4 font-medium tracking-wide">
        <p>🐾 משלוח חינם בהזמנות מעל ₪200 | מנוי וחיסכון עד 10% על כל הזמנה 🐾</p>
      </div>
      <div className="bg-surface/95 backdrop-blur-md border-b border-border shadow-lg">
        <Container>
          <nav className="flex items-center justify-between h-16 lg:h-[68px]">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="lg:hidden p-2 -mr-2 text-textMuted hover:text-textPrimary transition-colors" aria-label="תפריט">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center shadow-lg shadow-accent/30 group-hover:shadow-accent/50 transition-shadow">
                <span className="text-white font-bold text-base">P</span>
              </div>
              <span className="text-xl font-extrabold text-textPrimary tracking-tight">Pawsome</span>
            </Link>
            <div className="hidden lg:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm font-medium text-textSecondary hover:text-accent px-3 py-2 rounded-lg transition-colors">{link.label}</Link>
              ))}
            </div>
            <div className="flex items-center gap-1">
              <Link href="/admin" className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-textMuted hover:text-accent rounded-lg transition-colors"><Shield className="h-4 w-4" /><span className="hidden md:inline">ניהול</span></Link>
              <button className="hidden sm:flex p-2.5 text-textMuted hover:text-accent rounded-lg transition-colors" aria-label="חיפוש"><Search className="h-5 w-5" /></button>
              <Link href="/account" className="hidden sm:flex p-2.5 text-textMuted hover:text-accent rounded-lg transition-colors" aria-label="חשבון"><User className="h-5 w-5" /></Link>
              <Link href="/cart" className="relative p-2.5 text-textMuted hover:text-accent rounded-lg transition-colors" aria-label="עגלה">
                <ShoppingBag className="h-5 w-5" />
                {itemCount > 0 && <span className="absolute top-0.5 left-0.5 bg-accent text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center shadow-sm">{itemCount}</span>}
              </Link>
            </div>
          </nav>
        </Container>
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border">
            <Container>
              <div className="py-4 space-y-1">
                {NAV_LINKS.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-base font-medium text-textSecondary hover:text-accent hover:bg-card rounded-xl transition-all">{link.label}</Link>
                ))}
                <hr className="my-2 border-border" />
                <Link href="/account" onClick={() => setMobileMenuOpen(false)} className="block px-4 py-3 text-base font-medium text-textSecondary hover:text-accent hover:bg-card rounded-xl transition-all">החשבון שלי</Link>
              </div>
            </Container>
          </div>
        )}
      </div>
    </header>
  );
}
