import Link from "next/link";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-card min-h-screen flex items-center">
      <Container size="sm">
        <div className="text-center py-20">
          <p className="text-6xl mb-6">🐾</p>
          <h1 className="text-4xl font-bold text-textPrimary mb-3">העמוד לא נמצא</h1>
          <p className="text-lg text-muted mb-8 max-w-md mx-auto">נראה שהעמוד הזה יצא לטיול. בואו נחזיר אתכם למסלול.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/"><Button size="lg"><ArrowRight className="h-4 w-4" />חזרה לדף הבית</Button></Link>
            <Link href="/shop"><Button variant="outline" size="lg">עיינו במוצרים</Button></Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
