import { Metadata } from "next";
import Container from "@/components/ui/Container";
import Link from "next/link";
import {
  Package,
  RefreshCw,
  MapPin,
  Settings,
  ArrowRight,
  LogOut,
} from "lucide-react";

export const metadata: Metadata = {
  title: "My Account",
  description: "Manage your orders, subscriptions, and account settings.",
};

const ACCOUNT_LINKS = [
  {
    href: "/account/orders",
    icon: Package,
    title: "Orders",
    desc: "Track and view your order history",
  },
  {
    href: "/account/subscriptions",
    icon: RefreshCw,
    title: "Subscriptions",
    desc: "Manage delivery schedules, pause or cancel",
  },
  {
    href: "/account/addresses",
    icon: MapPin,
    title: "Addresses",
    desc: "Manage your shipping addresses",
  },
  {
    href: "/account/settings",
    icon: Settings,
    title: "Settings",
    desc: "Update email, password, and preferences",
  },
];

export default function AccountPage() {
  return (
    <div className="bg-stone-50 min-h-screen">
      <Container size="lg">
        <div className="py-8 md:py-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-stone-900 tracking-tight">
                My Account
              </h1>
              <p className="text-stone-500 mt-1">
                Welcome back! Manage your orders and preferences.
              </p>
            </div>
            <Link
              href="/auth/signin"
              className="text-sm text-stone-500 hover:text-stone-900 flex items-center gap-1 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </Link>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl p-6 border border-stone-200">
              <p className="text-sm text-stone-500">Total Orders</p>
              <p className="text-3xl font-bold text-stone-900 mt-1">12</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-stone-200">
              <p className="text-sm text-stone-500">Active Subscriptions</p>
              <p className="text-3xl font-bold text-amber-600 mt-1">2</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-stone-200">
              <p className="text-sm text-stone-500">Total Saved</p>
              <p className="text-3xl font-bold text-emerald-600 mt-1">$47.80</p>
            </div>
          </div>

          {/* Navigation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ACCOUNT_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group bg-white rounded-xl p-6 border border-stone-200 hover:border-amber-200 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-stone-50 group-hover:bg-amber-50 transition-colors">
                      <link.icon className="h-5 w-5 text-stone-600 group-hover:text-amber-600 transition-colors" />
                    </div>
                    <div>
                      <h2 className="font-semibold text-stone-900">
                        {link.title}
                      </h2>
                      <p className="text-sm text-stone-500 mt-0.5">
                        {link.desc}
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-stone-300 group-hover:text-amber-500 transition-colors shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
