import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-white min-h-screen flex items-center">
      <Container size="sm">
        <div className="text-center py-20">
          <p className="text-6xl mb-6">🐾</p>
          <h1 className="text-4xl font-bold text-stone-900 mb-3">
            Page Not Found
          </h1>
          <p className="text-lg text-stone-500 mb-8 max-w-md mx-auto">
            Looks like this page has gone on a walk. Let&apos;s get you back on
            track.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <Button size="lg">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <Link href="/shop">
              <Button variant="outline" size="lg">
                Browse Products
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
