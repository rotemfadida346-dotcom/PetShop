import { NextRequest, NextResponse } from "next/server";
import { getProductBySlug } from "@/lib/mock-data";

// In production, use Prisma queries:
// import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const product = getProductBySlug(params.slug);

  if (!product) {
    return NextResponse.json(
      { error: "Product not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({ product });
}
