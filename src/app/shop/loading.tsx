import Container from "@/components/ui/Container";
import { ProductCardSkeleton } from "@/components/ui/Loading";

export default function ShopLoading() {
  return (
    <div className="bg-bg min-h-screen">
      <div className="border-b border-border bg-gradient-to-b from-surface to-bg">
        <Container>
          <div className="py-10 md:py-14">
            <div className="h-10 bg-gray-200 rounded w-1/3 animate-pulse"></div>
            <div className="mt-2 h-6 bg-gray-200 rounded w-1/4 animate-pulse"></div>
          </div>
        </Container>
      </div>
      <Container>
        <div className="py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
