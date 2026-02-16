import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getProductBySlug } from "@/lib/db/products";
import { getProductBySlug as getMockProduct } from "@/lib/mock-data";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const product = await getProductBySlug(params.slug);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ product });
  } catch {
    const product = getMockProduct(params.slug);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json({ product });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json();
    const existing = await prisma.product.findUnique({
      where: { slug: params.slug },
    });
    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    const product = await prisma.product.update({
      where: { slug: params.slug },
      data: body,
      include: {
        images: { orderBy: { position: "asc" } },
        faqs: { orderBy: { position: "asc" } },
      },
    });
    return NextResponse.json({ product });
  } catch (error) {
    console.error("Update product error:", error);
    const message = error instanceof Error ? error.message : "Failed to update product";
    return NextResponse.json(
      { error: message },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const existing = await prisma.product.findUnique({
      where: { slug: params.slug },
    });
    if (!existing) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    await prisma.product.update({
      where: { slug: params.slug },
      data: { isActive: false },
    });
    return NextResponse.json({ message: "Product deleted" });
  } catch (error) {
    console.error("Delete product error:", error);
    const message = error instanceof Error ? error.message : "Failed to delete product";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
