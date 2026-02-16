import { Metadata } from "next";
import Container from "@/components/ui/Container";
import ProductGrid from "@/components/product/ProductGrid";
import ShopFilters from "@/components/shop/ShopFilters";
import Pagination from "@/components/shop/Pagination";
import { getProducts } from "@/lib/db/products";
import { filterProducts as filterMock } from "@/lib/mock-data";

export const metadata: Metadata = { title: "חנות" };

interface ShopPageProps { searchParams: { pet?: string; category?: string; subscription?: string; search?: string; sort?: string; page?: string } }

export default async function ShopPage({ searchParams }: ShopPageProps) {
  const page = Math.max(1, parseInt(searchParams.page || "1", 10));
  let products: Parameters<typeof ProductGrid>[0]["products"] = [];
  let totalPages = 1, total = 0;
  try {
    const r = await getProducts({ pet: searchParams.pet, category: searchParams.category, subscription: searchParams.subscription, search: searchParams.search, sort: searchParams.sort || "featured", page, limit: 12 });
    products = r.products; totalPages = r.totalPages; total = r.total;
  } catch { const m = filterMock(searchParams); products = m; total = m.length; }

  const isDog = searchParams.pet === "DOG";
  const isCat = searchParams.pet === "CAT";
  const title = isDog ? "מוצרים לכלבים 🐕" : isCat ? "מוצרים לחתולים 🐈" : "כל המוצרים";

  return (
    <div className="bg-background min-h-screen">
      <div className={`border-b border-border ${isDog ? "bg-gradient-to-b from-dog-50 to-background" : isCat ? "bg-gradient-to-b from-cat-50 to-background" : "bg-gradient-to-b from-accent-50 to-background"}`}>
        <Container><div className="py-10 md:py-14"><h1 className="text-heading-xl text-textPrimary">{title}</h1><p className="mt-2 text-textMuted text-body-lg">{total} מוצרים</p></div></Container>
      </div>
      <Container>
        <div className="py-8 md:py-10">
          <ShopFilters currentPet={searchParams.pet} currentCategory={searchParams.category} currentSubscription={searchParams.subscription} currentSort={searchParams.sort} />
          {products.length > 0 ? (<><ProductGrid products={products} />{totalPages > 1 && <Pagination currentPage={page} totalPages={totalPages} />}</>) : (
            <div className="text-center py-20"><p className="text-6xl mb-4">🔍</p><h2 className="text-xl font-bold text-textPrimary mb-2">לא נמצאו מוצרים</h2><p className="text-textSecondary">נסו לשנות את הסינון.</p></div>
          )}
        </div>
      </Container>
    </div>
  );
}
