import { Metadata } from "next";
import Container from "@/components/ui/Container";
import ProductGrid from "@/components/product/ProductGrid";
import ShopFilters from "@/components/shop/ShopFilters";
import Pagination from "@/components/shop/Pagination";
import { getProducts } from "@/lib/db/products";
import { filterProducts as filterMock } from "@/lib/mock-data";

export const metadata: Metadata = {
  title: "חנות",
  description: "עיינו בקולקציה המלאה שלנו של מזון פרימיום לכלבים וחתולים, חטיפים, חול ועוד.",
};

interface ShopPageProps {
  searchParams: { pet?: string; category?: string; subscription?: string; search?: string; sort?: string; page?: string };
}

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const page = Math.max(1, parseInt(searchParams.page || "1", 10));
  let products: Parameters<typeof ProductGrid>[0]["products"] = [];
  let totalPages = 1;
  let total = 0;

  try {
    const result = await getProducts({ pet: searchParams.pet, category: searchParams.category, subscription: searchParams.subscription, search: searchParams.search, sort: searchParams.sort || "featured", page, limit: 12 });
    products = result.products;
    totalPages = result.totalPages;
    total = result.total;
  } catch {
    const mockProducts = filterMock(searchParams);
    products = mockProducts;
    total = mockProducts.length;
  }

  const isDog = searchParams.pet === "DOG";
  const isCat = searchParams.pet === "CAT";
  const title = isDog ? "מוצרים לכלבים 🐕" : isCat ? "מוצרים לחתולים 🐈" : "כל המוצרים";

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className={`border-b border-gray-100 ${isDog ? "bg-gradient-to-b from-dog-50 to-white" : isCat ? "bg-gradient-to-b from-cat-50 to-white" : "bg-gradient-to-b from-brand-50 to-white"}`}>
        <Container>
          <div className="py-10 md:py-14">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">{title}</h1>
            <p className="mt-2 text-muted text-lg">{total} מוצרים במגוון קטגוריות</p>
          </div>
        </Container>
      </div>

      <Container>
        <div className="py-8 md:py-10">
          <ShopFilters currentPet={searchParams.pet} currentCategory={searchParams.category} currentSubscription={searchParams.subscription} currentSort={searchParams.sort} />

          {products.length > 0 ? (
            <>
              <ProductGrid products={products} />
              {totalPages > 1 && <Pagination currentPage={page} totalPages={totalPages} />}
            </>
          ) : (
            <div className="text-center py-20">
              <p className="text-6xl mb-4">🔍</p>
              <h2 className="text-xl font-bold text-gray-900 mb-2">לא נמצאו מוצרים</h2>
              <p className="text-muted">נסו לשנות את הסינון או עיינו בכל המוצרים.</p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}
