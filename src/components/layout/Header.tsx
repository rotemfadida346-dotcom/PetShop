"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { useCartStore } from "@/store/cart";
import Container from "@/components/ui/Container";
import { ShoppingBag, Menu, X, Search, User, Shield } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export default function Header() {
  const [open, setOpen] = useState(false);
  const count = useCartStore((s) => s.getItemCount());
  
  const toggleMenu = useCallback(() => setOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-accent/90 backdrop-blur-sm text-text-inverse text-center text-xs py-2 px-4 font-medium tracking-wide">
        🐾 משלוח חינם בהזמנות מעל ₪200 &nbsp;|&nbsp; מנוי וחיסכון עד 10% 🐾
      </div>
      <div className="bg-bg-warm/80 backdrop-blur-xl border-b border-border">
        <Container>
          <nav className="flex items-center justify-between h-16 lg:h-[68px]">
            <button onClick={toggleMenu} className="lg:hidden p-2 -mr-2 text-text-muted hover:text-text-primary transition-colors" aria-label="תפריט">
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 bg-accent rounded-xl flex items-center justify-center shadow-lg shadow-accent/20 group-hover:shadow-accent/40 transition-shadow"><span className="text-text-inverse font-bold">P</span></div>
              <span className="text-xl font-extrabold text-text-primary tracking-tight">Pawsome</span>
            </Link>
            <div className="hidden lg:flex items-center gap-0.5">
              {NAV_LINKS.map((l) => <Link key={l.href} href={l.href} className="text-body-sm font-medium text-text-secondary hover:text-accent px-3 py-2 rounded-lg transition-colors">{l.label}</Link>)}
            </div>
            <div className="flex items-center gap-0.5">
              <Link href="/admin" className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-text-muted hover:text-accent rounded-lg transition-colors"><Shield className="h-3.5 w-3.5" /><span className="hidden md:inline">ניהול</span></Link>
              <button className="hidden sm:flex p-2 text-text-muted hover:text-accent rounded-lg transition-colors"><Search className="h-[18px] w-[18px]" /></button>
              <Link href="/account" className="hidden sm:flex p-2 text-text-muted hover:text-accent rounded-lg transition-colors"><User className="h-[18px] w-[18px]" /></Link>
              <Link href="/cart" className="relative p-2 text-text-muted hover:text-accent rounded-lg transition-colors">
                <ShoppingBag className="h-[18px] w-[18px]" />
                {count > 0 && <span className="absolute top-0 left-0 bg-accent text-text-inverse text-[10px] font-bold rounded-full min-w-[17px] h-[17px] flex items-center justify-center">{count}</span>}
              </Link>
            </div>
          </nav>
        </Container>
        {open && (
          <div className="lg:hidden border-t border-border">
            <Container>
              <div className="py-3 space-y-0.5">
                {NAV_LINKS.map((l) => <Link key={l.href} href={l.href} onClick={closeMenu} className="block px-4 py-2.5 text-body font-medium text-text-secondary hover:text-accent hover:bg-surface rounded-xl transition-all">{l.label}</Link>)}
              </div>
            </Container>
          </div>
        )}
      </div>
    </header>
  );
}
