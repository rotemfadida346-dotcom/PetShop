import { Metadata } from "next";
import Container from "@/components/ui/Container";
import ProductGrid from "@/components/product/ProductGrid";
import ShopFilters from "@/components/shop/ShopFilters";
import { filterProducts } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Shop All Products",
  description:
    "Browse our full collection of premium dog and cat food, treats, litter, and more. Subscribe and save up to 15%.",
};

interface ShopPageProps {
  searchParams: {
    pet?: string;
    category?: string;
    search?: string;
    sort?: string;
  };
}

export default function ShopPage({ searchParams }: ShopPageProps) {
  const products = filterProducts(searchParams);

  const title = searchParams.pet
    ? searchParams.pet === "DOG"
      ? "Dog Products"
      : "Cat Products"
    : "All Products";

  return (
    <div className="bg-white">
      {/* Page Header */}
      <div className="bg-stone-50 border-b border-stone-100">
        <Container>
          <div className="py-10 md:py-16">
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-stone-900">
              {title}
            </h1>
            <p className="mt-2 text-stone-500">
              {products.length} product{products.length !== 1 ? "s" : ""}
            </p>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-8 md:py-12">
          {/* Filters */}
          <ShopFilters
            currentPet={searchParams.pet}
            currentCategory={searchParams.category}
            currentSort={searchParams.sort}
          />

          {/* Products */}
          {products.length > 0 ? (
            <ProductGrid products={products} />
          ) : (
            <div className="text-center py-20">
              <p className="text-5xl mb-4">🔍</p>
              <h2 className="text-xl font-semibold text-stone-900 mb-2">
                No products found
              </h2>
              <p className="text-stone-500">
                Try adjusting your filters or browse all products.
              </p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
