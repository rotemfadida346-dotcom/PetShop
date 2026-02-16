import { Metadata } from "next";
import Container from "@/components/ui/Container";
import ProductGrid from "@/components/product/ProductGrid";
import ShopFilters from "@/components/shop/ShopFilters";
import Pagination from "@/components/shop/Pagination";
import { getProducts } from "@/lib/db/products";
import { filterProducts as filterMock } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "Shop All Products",
  description:
    "Browse our full collection of premium dog and cat food, treats, litter, and more. Subscribe and save up to 15%.",
};

interface ShopPageProps {
  searchParams: {
    pet?: string;
    category?: string;
    subscription?: string;
    search?: string;
    sort?: string;
    page?: string;
  };
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const page = Math.max(1, parseInt(searchParams.page || "1", 10));

  let products: Parameters<typeof ProductGrid>[0]["products"] = [];
  let totalPages = 1;
  let total = 0;

  try {
    const result = await getProducts({
      pet: searchParams.pet,
      category: searchParams.category,
      subscription: searchParams.subscription,
      search: searchParams.search,
      sort: searchParams.sort || "featured",
      page,
      limit: 12,
    });
    products = result.products;
    totalPages = result.totalPages;
    total = result.total;
  } catch {
    // Fallback to mock data if DB is unavailable
    const mockProducts = filterMock(searchParams);
    products = mockProducts;
    total = mockProducts.length;
  }

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
              {total} product{total !== 1 ? "s" : ""}
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
            currentSubscription={searchParams.subscription}
            currentSort={searchParams.sort}
          />

          {/* Products */}
          {products.length > 0 ? (
            <>
              <ProductGrid products={products} />
              {totalPages > 1 && (
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                />
              )}
            </>
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
