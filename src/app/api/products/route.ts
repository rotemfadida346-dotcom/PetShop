import { NextRequest, NextResponse } from "next/server";
import { filterProducts } from "@/lib/mock-data";

// In production, use Prisma queries:
// import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pet = searchParams.get("pet") || undefined;
  const category = searchParams.get("category") || undefined;
  const search = searchParams.get("search") || undefined;
  const sort = searchParams.get("sort") || undefined;

  const products = filterProducts({ pet, category, search, sort });

  return NextResponse.json({ products, total: products.length });
}
