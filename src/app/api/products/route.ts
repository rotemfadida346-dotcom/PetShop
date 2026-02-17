import { NextRequest, NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { getProducts, createProduct } from "@/lib/db/products";
import { filterProducts as filterMock } from "@/lib/mock-data";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const params = {
    pet: searchParams.get("pet") || undefined,
    category: searchParams.get("category") || undefined,
    subscription: searchParams.get("subscription") || undefined,
    search: searchParams.get("search") || undefined,
    sort: searchParams.get("sort") || undefined,
    page: parseInt(searchParams.get("page") || "1", 10),
    limit: parseInt(searchParams.get("limit") || "12", 10),
  };

  try {
    const result = await getProducts(params);
    return NextResponse.json(result);
  } catch {
    // Fallback to mock data
    const products = filterMock({
      pet: params.pet,
      category: params.category,
      search: params.search,
      sort: params.sort,
    });
    return NextResponse.json({
      products,
      total: products.length,
      page: 1,
      limit: products.length,
      totalPages: 1,
    });
  }
}

interface ImageInput {
  url: string;
  alt: string;
  position: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Handle images array - convert to Prisma create format
    const productData: Record<string, unknown> = { ...body };
    if (body.images && Array.isArray(body.images)) {
      productData.images = {
        create: (body.images as ImageInput[]).map((img: ImageInput) => ({
          url: img.url,
          alt: img.alt || "",
          position: img.position || 0,
        }))
      };
    }
    
    const product = await createProduct(productData as Prisma.ProductCreateInput);
    return NextResponse.json({ product }, { status: 201 });
  } catch (error) {
    console.error("Create product error:", error);
    const message = error instanceof Error ? error.message : "Failed to create product";
    return NextResponse.json(
      { error: message },
      { status: 400 }
    );
  }
}
