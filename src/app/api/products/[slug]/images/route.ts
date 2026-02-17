import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

interface ImageInput {
  url: string;
  alt: string;
  position: number;
}

export async function POST(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json();
    const { images } = body as { images: ImageInput[] };

    // Find product
    const product = await prisma.product.findUnique({
      where: { slug: params.slug },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Delete existing images
    await prisma.productImage.deleteMany({
      where: { productId: product.id },
    });

    // Create new images
    if (images && Array.isArray(images)) {
      await prisma.productImage.createMany({
        data: images.map((img: ImageInput, index: number) => ({
          productId: product.id,
          url: img.url,
          alt: img.alt || "",
          position: img.position ?? index,
        })),
      });
    }

    // Return updated product with images
    const updatedProduct = await prisma.product.findUnique({
      where: { id: product.id },
      include: {
        images: { orderBy: { position: "asc" } },
      },
    });

    return NextResponse.json({ product: updatedProduct });
  } catch (error) {
    console.error("Update images error:", error);
    const message = error instanceof Error ? error.message : "Failed to update images";
    return NextResponse.json(
      { error: message },
      { status: 400 }
    );
  }
}
