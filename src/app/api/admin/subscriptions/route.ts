import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const subscriptions = await prisma.subscription.findMany({
      include: {
        product: { select: { name: true } },
        user: { select: { name: true, email: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 50,
    });

    return NextResponse.json({ subscriptions });
  } catch (error) {
    console.error("Subscriptions error:", error);
    return NextResponse.json({ subscriptions: [] });
  }
}
