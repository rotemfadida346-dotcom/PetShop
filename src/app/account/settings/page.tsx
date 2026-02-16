import { Metadata } from "next";
import Container from "@/components/ui/Container";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { ArrowLeft, Save } from "lucide-react";

export const metadata: Metadata = {
  title: "Account Settings",
  description: "Update your account information and preferences.",
};

export default function SettingsPage() {
  return (
    <div className="bg-stone-50 min-h-screen">
      <Container size="md">
        <div className="py-8 md:py-12">
          <Link
            href="/account"
            className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-stone-900 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Account
          </Link>

          <h1 className="text-3xl font-bold text-stone-900 tracking-tight mb-8">
            Account Settings
          </h1>

          <div className="space-y-8">
            {/* Profile */}
            <div className="bg-white rounded-xl border border-stone-200 p-6">
              <h2 className="text-lg font-semibold text-stone-900 mb-4">
                Profile
              </h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    id="firstName"
                    label="First Name"
                    defaultValue="John"
                  />
                  <Input
                    id="lastName"
                    label="Last Name"
                    defaultValue="Doe"
                  />
                </div>
                <Input
                  id="email"
                  label="Email"
                  type="email"
                  defaultValue="john@example.com"
                />
                <Input
                  id="phone"
                  label="Phone"
                  type="tel"
                  defaultValue="(555) 555-5555"
                />
                <Button size="sm">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>

            {/* Password */}
            <div className="bg-white rounded-xl border border-stone-200 p-6">
              <h2 className="text-lg font-semibold text-stone-900 mb-4">
                Change Password
              </h2>
              <div className="space-y-4">
                <Input
                  id="currentPassword"
                  label="Current Password"
                  type="password"
                />
                <Input
                  id="newPassword"
                  label="New Password"
                  type="password"
                />
                <Input
                  id="confirmPassword"
                  label="Confirm New Password"
                  type="password"
                />
                <Button size="sm" variant="secondary">
                  Update Password
                </Button>
              </div>
            </div>

            {/* Notifications */}
            <div className="bg-white rounded-xl border border-stone-200 p-6">
              <h2 className="text-lg font-semibold text-stone-900 mb-4">
                Notification Preferences
              </h2>
              <div className="space-y-3">
                {[
                  {
                    id: "orderUpdates",
                    label: "Order updates",
                    desc: "Get notified about order status changes",
                  },
                  {
                    id: "subscriptionReminders",
                    label: "Subscription reminders",
                    desc: "Reminders before upcoming deliveries",
                  },
                  {
                    id: "promotions",
                    label: "Promotions & deals",
                    desc: "Special offers and new product alerts",
                  },
                  {
                    id: "petTips",
                    label: "Pet care tips",
                    desc: "Helpful articles and nutrition guides",
                  },
                ].map((item) => (
                  <label
                    key={item.id}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-stone-50 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      defaultChecked
                      className="mt-0.5 h-4 w-4 rounded border-stone-300 text-amber-600 focus:ring-amber-500"
                    />
                    <div>
                      <p className="font-medium text-stone-900 text-sm">
                        {item.label}
                      </p>
                      <p className="text-xs text-stone-500">{item.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-white rounded-xl border border-red-200 p-6">
              <h2 className="text-lg font-semibold text-red-700 mb-2">
                Danger Zone
              </h2>
              <p className="text-sm text-stone-500 mb-4">
                Permanently delete your account and all associated data. This
                action cannot be undone.
              </p>
              <Button variant="danger" size="sm">
                Delete Account
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
