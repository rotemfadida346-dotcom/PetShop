import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const productWithRelations = {
  images: { orderBy: { position: "asc" as const } },
  faqs: { orderBy: { position: "asc" as const } },
};

export type ProductListItem = Prisma.ProductGetPayload<{
  include: { images: true };
}>;

export type ProductDetail = Prisma.ProductGetPayload<{
  include: { images: true; faqs: true };
}>;

interface FilterParams {
  pet?: string;
  category?: string;
  subscription?: string;
  search?: string;
  sort?: string;
  page?: number;
  limit?: number;
}

export async function getProducts(params: FilterParams = {}) {
  const { pet, category, subscription, search, sort, page = 1, limit = 12 } = params;

  const where: Prisma.ProductWhereInput = { isActive: true };

  if (pet) where.petType = pet as Prisma.EnumPetTypeFilter;
  if (category) where.category = category as Prisma.EnumProductCategoryFilter;
  if (subscription === "true") {
    where.subscriptionDiscount = { gt: 0 };
    where.tags = { has: "subscription" };
  }
  if (search) {
    where.OR = [
      { name: { contains: search, mode: "insensitive" } },
      { shortDesc: { contains: search, mode: "insensitive" } },
      { description: { contains: search, mode: "insensitive" } },
      { tags: { has: search.toLowerCase() } },
    ];
  }

  let orderBy: Prisma.ProductOrderByWithRelationInput = { createdAt: "desc" };
  if (sort === "price-asc") orderBy = { price: "asc" };
  else if (sort === "price-desc") orderBy = { price: "desc" };
  else if (sort === "name") orderBy = { name: "asc" };
  else if (sort === "featured") orderBy = { isFeatured: "desc" };

  const [products, total] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { images: { orderBy: { position: "asc" } } },
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.product.count({ where }),
  ]);

  return {
    products,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
  };
}

export async function getProductBySlug(slug: string): Promise<ProductDetail | null> {
  return prisma.product.findUnique({
    where: { slug, isActive: true },
    include: productWithRelations,
  });
}

export async function getFeaturedProducts(limit = 8): Promise<ProductListItem[]> {
  return prisma.product.findMany({
    where: { isActive: true, isFeatured: true },
    include: { images: { orderBy: { position: "asc" } } },
    take: limit,
  });
}

export async function getRelatedProducts(
  productId: string,
  petType: string,
  limit = 4
): Promise<ProductListItem[]> {
  return prisma.product.findMany({
    where: {
      isActive: true,
      petType: petType as Prisma.EnumPetTypeFilter,
      id: { not: productId },
    },
    include: { images: { orderBy: { position: "asc" } } },
    take: limit,
  });
}

export async function createProduct(data: Prisma.ProductCreateInput) {
  return prisma.product.create({ data, include: productWithRelations });
}

export async function updateProduct(id: string, data: Prisma.ProductUpdateInput) {
  return prisma.product.update({ where: { id }, data, include: productWithRelations });
}

export async function deleteProduct(id: string) {
  return prisma.product.update({ where: { id }, data: { isActive: false } });
}
