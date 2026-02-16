"use client";

import Link from "next/link";
import { useState } from "react";
import { useCartStore } from "@/store/cart";
import Container from "@/components/ui/Container";
import {
  ShoppingBag,
  Menu,
  X,
  Search,
  User,
} from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const itemCount = useCartStore((s) => s.getItemCount());

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-stone-100">
      {/* Top bar */}
      <div className="bg-stone-800 text-white text-center text-xs py-2 px-4">
        <p>
          Free shipping on orders over $49 | Subscribe & save up to 15%
        </p>
      </div>

      <Container>
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 -ml-2 text-stone-600 hover:text-stone-900"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="ml-2 text-xl font-bold text-stone-900 tracking-tight">
                Pawsome
              </span>
            </div>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <button className="hidden sm:flex p-2 text-stone-600 hover:text-stone-900 transition-colors" aria-label="Search">
              <Search className="h-5 w-5" />
            </button>
            <Link
              href="/account"
              className="hidden sm:flex p-2 text-stone-600 hover:text-stone-900 transition-colors"
              aria-label="Account"
            >
              <User className="h-5 w-5" />
            </Link>
            <Link
              href="/cart"
              className="relative p-2 text-stone-600 hover:text-stone-900 transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-amber-500 text-white text-[10px] font-bold rounded-full h-4.5 w-4.5 flex items-center justify-center min-w-[18px] h-[18px]">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </Container>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-stone-100">
          <Container>
            <div className="py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2.5 text-base font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-50 rounded-lg transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <hr className="my-2 border-stone-100" />
              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2.5 text-base font-medium text-stone-600 hover:text-stone-900 hover:bg-stone-50 rounded-lg transition-colors"
              >
                My Account
              </Link>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
