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
  try { const r = await getProducts({ pet: searchParams.pet, category: searchParams.category, subscription: searchParams.subscription, search: searchParams.search, sort: searchParams.sort || "featured", page, limit: 12 }); products = r.products; totalPages = r.totalPages; total = r.total; }
  catch { const m = filterMock(searchParams); products = m; total = m.length; }

  const isDog = searchParams.pet === "DOG";
  const isCat = searchParams.pet === "CAT";
  const title = isDog ? "מוצרים לכלבים 🐕" : isCat ? "מוצרים לחתולים 🐈" : "כל המוצרים";

  return (
    <div className="bg-bg min-h-screen">
      <div className={`border-b border-border ${isDog ? "bg-gradient-to-b from-dog-bg to-bg" : isCat ? "bg-gradient-to-b from-cat-bg to-bg" : "bg-gradient-to-b from-surface to-bg"}`}>
        <Container><div className="py-10 md:py-14"><h1 className="text-heading-xl text-text-primary">{title}</h1><p className="mt-2 text-text-muted text-body-lg">{total} מוצרים</p></div></Container>
      </div>
      <Container>
        <div className="py-8">
          <ShopFilters currentPet={searchParams.pet} currentCategory={searchParams.category} currentSubscription={searchParams.subscription} currentSort={searchParams.sort} />
          {products.length > 0 ? (<><ProductGrid products={products} />{totalPages > 1 && <Pagination currentPage={page} totalPages={totalPages} />}</>) : (
            <div className="text-center py-20"><p className="text-5xl mb-3">🔍</p><h2 className="text-lg font-bold text-text-primary mb-1">לא נמצאו מוצרים</h2><p className="text-text-secondary text-body-sm">נסו לשנות את הסינון.</p></div>
          )}
        </div>
      </Container>
    </div>
  );
}
