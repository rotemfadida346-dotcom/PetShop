import { Metadata } from "next";
import { notFound } from "next/navigation";
import Container from "@/components/ui/Container";
import ProductDetails from "@/components/product/ProductDetails";
import ProductGrid from "@/components/product/ProductGrid";
import { getProductBySlug, getRelatedProducts, ProductDetail } from "@/lib/db/products";
import {
  getProductBySlug as getMockProduct,
  MOCK_PRODUCTS,
} from "@/lib/mock-data";

interface ProductPageProps {
  params: { slug: string };
}

type ProductLike = ProductDetail | ReturnType<typeof getMockProduct>;

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  let product: ProductLike;
  try {
    product = await getProductBySlug(params.slug);
  } catch {
    product = getMockProduct(params.slug);
  }

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.name,
    description: product.shortDesc || product.description?.slice(0, 160),
    openGraph: {
      title: product.name,
      description: product.shortDesc || product.description?.slice(0, 160),
      images: product.images?.[0] ? [{ url: product.images[0].url }] : [],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  let product: ProductLike;
  let relatedProducts: Parameters<typeof ProductGrid>[0]["products"] = [];

  try {
    product = await getProductBySlug(params.slug);
    if (product) {
      relatedProducts = await getRelatedProducts(
        product.id,
        product.petType,
        4
      );
    }
  } catch {
    product = getMockProduct(params.slug);
    if (product) {
      relatedProducts = MOCK_PRODUCTS.filter(
        (p) => p.petType === product!.petType && p.id !== product!.id
      ).slice(0, 4);
    }
  }

  if (!product) {
    notFound();
  }

  return (
    <div className="bg-white">
      <Container>
        <div className="py-8 md:py-12">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-stone-500 mb-8">
            <a href="/" className="hover:text-stone-900 transition-colors">
              Home
            </a>
            <span>/</span>
            <a href="/shop" className="hover:text-stone-900 transition-colors">
              Shop
            </a>
            <span>/</span>
            <a
              href={`/shop?pet=${product.petType}`}
              className="hover:text-stone-900 transition-colors"
            >
              {product.petType === "DOG" ? "Dogs" : "Cats"}
            </a>
            <span>/</span>
            <span className="text-stone-900 font-medium truncate">
              {product.name}
            </span>
          </nav>

          {/* Product Details */}
          <ProductDetails product={product} />
        </div>
      </Container>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="bg-stone-50 section-padding">
          <Container>
            <h2 className="section-heading mb-8">You May Also Like</h2>
            <ProductGrid products={relatedProducts} />
          </Container>
        </section>
      )}
    </div>
  );
}
