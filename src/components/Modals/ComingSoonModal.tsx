"use client";

import React from "react";
import { X, Sparkles, Bell } from "lucide-react";

interface ComingSoonModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string;
  icon: React.ReactNode;
}

export default function ComingSoonModal({
  isOpen,
  onClose,
  category,
  icon,
}: ComingSoonModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed left-1/2 top-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2">
        <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl animate-fade-in">
          {/* Decorative Background */}
          <div className="absolute right-0 top-0 h-32 w-32 -translate-y-8 translate-x-8 rounded-full bg-gradient-to-br from-primary-green/20 to-primary-blue/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-32 w-32 translate-x-[-50%] translate-y-8 rounded-full bg-gradient-to-tr from-purple-400/20 to-pink-600/20 blur-3xl" />

          {/* Content */}
          <div className="relative p-8">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute left-4 top-4 rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
              aria-label="סגור"
            >
              <X size={20} />
            </button>

            {/* Icon */}
            <div className="mb-6 flex justify-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-secondary-lightGreen to-secondary-softBlue text-primary-green">
                {icon}
              </div>
            </div>

            {/* Title */}
            <div className="mb-3 flex items-center justify-center gap-2">
              <Sparkles className="text-warning" size={24} />
              <h2 className="text-2xl font-bold text-text-primary">בקרוב!</h2>
              <Sparkles className="text-warning" size={24} />
            </div>

            {/* Message */}
            <p className="mb-6 text-center text-text-secondary">
              מוצרים עבור <span className="font-bold text-primary-green">{category}</span>{" "}
              יהיו זמינים בקרוב מאוד!
            </p>

            {/* Features List */}
            <div className="mb-6 space-y-3 rounded-xl bg-secondary-cream p-4 border border-gray-200">
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-success" />
                <p className="text-sm text-text-primary">מגוון רחב של מוצרי איכות</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-success" />
                <p className="text-sm text-text-primary">מחירים מיוחדים ללקוחות רשומים</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-success" />
                <p className="text-sm text-text-primary">משלוח מהיר לכל הארץ</p>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 rounded-xl border-2 border-gray-200 px-4 py-3 font-medium text-text-primary transition-all hover:border-gray-300 hover:bg-gray-50"
              >
                סגור
              </button>
              <button className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-primary-green to-primary-blue px-4 py-3 font-medium text-white shadow-md transition-all hover:scale-105 hover:shadow-lg">
                <Bell size={18} />
                <span>עדכנו אותי</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
