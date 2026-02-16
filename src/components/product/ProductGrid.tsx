import ProductCard from "./ProductCard";

interface ProductGridProps {
  products: {
    id: string;
    name: string;
    slug: string;
    shortDesc?: string | null;
    price: number;
    compareAt?: number | null;
    petType: string;
    category: string;
    subscriptionDiscount: number;
    isFeatured: boolean;
    images: { url: string; alt?: string | null }[];
  }[];
  columns?: 2 | 3 | 4;
}

export default function ProductGrid({
  products,
  columns = 4,
}: ProductGridProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
  };

  return (
    <div className={`grid ${gridCols[columns]} gap-6`}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
