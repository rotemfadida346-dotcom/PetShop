"use client";

import Link from "next/link";
import { useState, useCallback } from "react";
import { useCartStore } from "@/store/cart";
import Container from "@/components/ui/Container";
import { ShoppingBag, Menu, X, Search, Phone, Clock, Heart, User, LogIn, UserPlus, LogOut, Package as PackageIcon, RefreshCw, Settings } from "lucide-react";
import { NAV_LINKS } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const count = useCartStore((s) => s.getItemCount());
  const subtotal = useCartStore((s) => s.getSubtotal());
  
  // TODO: Replace with real auth check from NextAuth
  const isLoggedIn = false; // Will be dynamic when connected to auth
  const userName = "ישראל";
  
  const toggleMenu = useCallback(() => setOpen(prev => !prev), []);
  const closeMenu = useCallback(() => setOpen(false), []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg shadow-accent/10">
      {/* Top Bar - Green/Blue Gradient */}
      <div className="bg-gradient-to-r from-primary-green to-primary-blue text-white text-sm py-2 px-4">
        <Container>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <a href="tel:0509555350" className="flex items-center gap-2 font-bold bg-white/20 px-3 py-1 rounded-full hover:bg-white/30 transition-colors">
                <Phone className="h-3.5 w-3.5" />
                050-9555350
              </a>
              <span className="hidden md:flex items-center gap-2 text-xs">
                <Clock className="h-3.5 w-3.5" />
                שעות פעילות: א׳-ה׳ 9:00-18:00 | ו׳ 9:00-13:00
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/track-order" className="text-xs hover:underline">מעקב הזמנה</Link>
            </div>
          </div>
        </Container>
      </div>

      {/* Main Header */}
      <div className="bg-white border-b border-gray-200">
        <Container>
          <div className="grid grid-cols-3 gap-6 items-center py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-green to-primary-blue rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <svg viewBox="0 0 100 100" className="w-7 h-7">
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
                <span className="text-[10px] text-text-secondary">החנות הפרימיום לחיות המחמד</span>
              </div>
            </Link>

            {/* Search */}
            <div className="hidden lg:block">
              <div className="relative">
                <div className="flex bg-secondary-cream border-2 border-secondary-lightGreen rounded-full overflow-hidden focus-within:border-primary-green focus-within:shadow-lg focus-within:shadow-primary-green/20 transition-all">
                  <input
                    type="text"
                    placeholder="חפש מוצרים, מזון, צעצועים ועוד..."
                    className="flex-1 px-5 py-3 bg-transparent text-sm outline-none"
                    onFocus={() => setSearchOpen(true)}
                    onBlur={() => setTimeout(() => setSearchOpen(false), 200)}
                  />
                  <button className="bg-gradient-to-r from-primary-green to-primary-blue text-white px-6 hover:from-accent-forest hover:to-accent-navy transition-all">
                    <Search className="h-4 w-4" />
                  </button>
                </div>
                {searchOpen && (
                  <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border border-gray-200 p-3">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-accent-mint text-accent-forest rounded-full text-xs cursor-pointer hover:bg-primary-green hover:text-white transition-colors">מזון כלבים</span>
                      <span className="px-3 py-1 bg-accent-mint text-accent-forest rounded-full text-xs cursor-pointer hover:bg-primary-green hover:text-white transition-colors">צעצועים לחתולים</span>
                      <span className="px-3 py-1 bg-accent-mint text-accent-forest rounded-full text-xs cursor-pointer hover:bg-primary-green hover:text-white transition-colors">רויאל קנין</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Admin Link - PROMINENT PURPLE BUTTON */}
            <Link href="/admin/login" className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-full hover:shadow-lg hover:shadow-purple-500/40 transition-all font-bold">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="hidden lg:inline">ניהול</span>
            </Link>

            {/* User Account, Cart & Wishlist */}
            <div className="flex items-center gap-2 justify-end">
              {/* User Account - Prominent */}
              <div className="relative hidden md:block">
                {isLoggedIn ? (
                  <>
                    <button
                      onClick={() => setUserMenuOpen(!userMenuOpen)}
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-accent-forest to-primary-blue text-white rounded-full hover:shadow-lg hover:shadow-primary-green/30 transition-all font-medium"
                    >
                      <User className="h-4 w-4" />
                      <span className="hidden lg:inline">שלום, {userName}</span>
                      <X className={`h-3 w-3 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {userMenuOpen && (
                      <div className="absolute left-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border-2 border-gray-200 overflow-hidden z-50">
                        <div className="p-3 bg-gradient-to-r from-secondary-lightGreen to-secondary-softBlue">
                          <p className="font-bold text-text-primary">החשבון שלי</p>
                          <p className="text-xs text-text-secondary">{userName}</p>
                        </div>
                        <div className="p-2">
                          <Link href="/account" className="flex items-center gap-3 px-4 py-3 hover:bg-secondary-cream rounded-lg transition-colors" onClick={() => setUserMenuOpen(false)}>
                            <User className="h-4 w-4 text-primary-green" />
                            <span className="text-sm font-medium">הפרופיל שלי</span>
                          </Link>
                          <Link href="/account/orders" className="flex items-center gap-3 px-4 py-3 hover:bg-secondary-cream rounded-lg transition-colors" onClick={() => setUserMenuOpen(false)}>
                            <PackageIcon className="h-4 w-4 text-primary-blue" />
                            <span className="text-sm font-medium">ההזמנות שלי</span>
                          </Link>
                          <Link href="/account/subscriptions" className="flex items-center gap-3 px-4 py-3 hover:bg-secondary-cream rounded-lg transition-colors" onClick={() => setUserMenuOpen(false)}>
                            <RefreshCw className="h-4 w-4 text-success" />
                            <span className="text-sm font-medium">המנויים שלי</span>
                          </Link>
                          <Link href="/account/settings" className="flex items-center gap-3 px-4 py-3 hover:bg-secondary-cream rounded-lg transition-colors" onClick={() => setUserMenuOpen(false)}>
                            <Settings className="h-4 w-4 text-text-secondary" />
                            <span className="text-sm font-medium">הגדרות</span>
                          </Link>
                          <hr className="my-2 border-gray-200" />
                          <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 rounded-lg transition-colors text-error">
                            <LogOut className="h-4 w-4" />
                            <span className="text-sm font-medium">התנתק</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link href="/auth/signin">
                      <button className="flex items-center gap-2 px-4 py-2 border-2 border-primary-green text-primary-green rounded-full hover:bg-primary-green hover:text-white transition-all font-bold">
                        <LogIn className="h-4 w-4" />
                        <span className="hidden lg:inline">התחבר</span>
                      </button>
                    </Link>
                    <Link href="/auth/signup">
                      <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-green to-primary-blue text-white rounded-full hover:shadow-lg hover:shadow-primary-green/30 transition-all font-bold">
                        <UserPlus className="h-4 w-4" />
                        <span className="hidden lg:inline">הרשם</span>
                      </button>
                    </Link>
                  </div>
                )}
              </div>

              {/* Wishlist */}
              <Link href="/wishlist" className="hidden md:flex items-center gap-2 px-4 py-2 border-2 border-primary-green text-primary-green rounded-full hover:bg-primary-green hover:text-white transition-all relative">
                <Heart className="h-4 w-4" />
                <span className="absolute -top-2 -right-2 bg-warning text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">7</span>
              </Link>
              
              {/* Cart */}
              <Link href="/cart" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-green to-primary-blue text-white rounded-full hover:shadow-lg hover:shadow-primary-green/30 transition-all relative">
                <ShoppingBag className="h-4 w-4" />
                {count > 0 && (
                  <>
                    <span className="hidden sm:inline font-bold">{count}</span>
                    <span className="hidden md:inline text-sm">{formatPrice(subtotal)}</span>
                    <span className="absolute -top-2 -right-2 bg-warning text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{count}</span>
                  </>
                )}
              </Link>
              
              {/* Mobile Menu Toggle */}
              <button onClick={toggleMenu} className="lg:hidden p-2 text-text-primary">
                {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </Container>
      </div>

      {/* Navigation - Light Green/Blue Gradient */}
      <div className="hidden lg:block bg-gradient-to-r from-secondary-lightGreen to-secondary-softBlue">
        <Container>
          <nav className="flex items-center justify-around py-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center gap-2 px-4 py-2 text-text-primary font-semibold rounded-full hover:bg-white hover:text-primary-green hover:shadow-lg transition-all"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/quiz"
              className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-primary-green to-primary-blue text-white font-bold rounded-full hover:shadow-xl hover:shadow-primary-green/40 transition-all"
            >
              ✨ התאמה אישית
            </Link>
          </nav>
        </Container>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <Container>
            <div className="py-3 space-y-1">
              {/* User Section - Mobile */}
              {isLoggedIn ? (
                <div className="mb-4 pb-4 border-b border-gray-200">
                  <p className="px-4 py-2 font-bold text-text-primary">שלום, {userName}</p>
                  <Link href="/account" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 text-text-primary font-medium hover:bg-secondary-cream hover:text-primary-green rounded-xl transition-all">
                    <User className="h-4 w-4" />
                    החשבון שלי
                  </Link>
                  <Link href="/account/orders" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 text-text-primary font-medium hover:bg-secondary-cream hover:text-primary-green rounded-xl transition-all">
                    <PackageIcon className="h-4 w-4" />
                    ההזמנות שלי
                  </Link>
                  <Link href="/account/subscriptions" onClick={closeMenu} className="flex items-center gap-3 px-4 py-3 text-text-primary font-medium hover:bg-secondary-cream hover:text-primary-green rounded-xl transition-all">
                    <RefreshCw className="h-4 w-4" />
                    המנויים שלי
                  </Link>
                </div>
              ) : (
                <div className="mb-4 pb-4 border-b border-gray-200 space-y-2">
                  <Link href="/auth/signin" onClick={closeMenu}>
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-primary-green text-primary-green rounded-xl font-bold hover:bg-primary-green hover:text-white transition-all">
                      <LogIn className="h-5 w-5" />
                      התחבר לחשבון
                    </button>
                  </Link>
                  <Link href="/auth/signup" onClick={closeMenu}>
                    <button className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-primary-green to-primary-blue text-white rounded-xl font-bold hover:shadow-lg transition-all">
                      <UserPlus className="h-5 w-5" />
                      הרשם עכשיו
                    </button>
                  </Link>
                </div>
              )}
              
              {/* Navigation Links */}
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={closeMenu}
                  className="block px-4 py-3 text-text-primary font-medium hover:bg-secondary-cream hover:text-primary-green rounded-xl transition-all"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
