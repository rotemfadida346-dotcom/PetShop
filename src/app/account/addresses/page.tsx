import { Metadata } from "next";
import Container from "@/components/ui/Container";
import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { ArrowLeft, MapPin, Plus, Pencil, Trash2 } from "lucide-react";

export const metadata: Metadata = {
  title: "My Addresses",
  description: "Manage your shipping addresses.",
};

const MOCK_ADDRESSES = [
  {
    id: "addr-1",
    label: "Home",
    firstName: "John",
    lastName: "Doe",
    line1: "123 Main Street",
    line2: "Apt 4B",
    city: "New York",
    state: "NY",
    zip: "10001",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "Work",
    firstName: "John",
    lastName: "Doe",
    line1: "456 Business Ave",
    line2: "Suite 200",
    city: "New York",
    state: "NY",
    zip: "10018",
    isDefault: false,
  },
];

export default function AddressesPage() {
  return (
    <div className="bg-stone-50 min-h-screen">
      <Container size="lg">
        <div className="py-8 md:py-12">
          <Link
            href="/account"
            className="inline-flex items-center gap-1 text-sm text-stone-500 hover:text-stone-900 mb-6 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Account
          </Link>

          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-stone-900 tracking-tight">
              My Addresses
            </h1>
            <Button size="sm">
              <Plus className="h-4 w-4" />
              Add Address
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MOCK_ADDRESSES.map((addr) => (
              <div
                key={addr.id}
                className="bg-white rounded-xl border border-stone-200 p-6"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-stone-400" />
                    <span className="font-semibold text-stone-900">
                      {addr.label}
                    </span>
                    {addr.isDefault && (
                      <Badge variant="success">Default</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 text-stone-400 hover:text-stone-700 transition-colors" aria-label="Edit">
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button className="p-1.5 text-stone-400 hover:text-red-500 transition-colors" aria-label="Delete">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                <div className="text-sm text-stone-600 space-y-0.5">
                  <p>
                    {addr.firstName} {addr.lastName}
                  </p>
                  <p>{addr.line1}</p>
                  {addr.line2 && <p>{addr.line2}</p>}
                  <p>
                    {addr.city}, {addr.state} {addr.zip}
                  </p>
                </div>

                {!addr.isDefault && (
                  <button className="mt-4 text-sm text-amber-600 hover:text-amber-700 font-medium transition-colors">
                    Set as Default
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
