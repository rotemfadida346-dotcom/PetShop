import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [
      totalProducts,
      activeProducts,
      totalOrders,
      totalSubscriptions,
      activeSubscriptions,
      products,
    ] = await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { isActive: true } }),
      prisma.order.count(),
      prisma.subscription.count(),
      prisma.subscription.count({ where: { status: "ACTIVE" } }),
      prisma.product.findMany({
        where: { isActive: true },
        select: { id: true, name: true, price: true, stock: true, petType: true, category: true },
        orderBy: { stock: "asc" },
        take: 10,
      }),
    ]);

    // Mock revenue data for demo (in production, aggregate from orders)
    const monthlyRevenue = [
      { month: "ינו", revenue: 12400 },
      { month: "פבר", revenue: 15800 },
      { month: "מרץ", revenue: 13200 },
      { month: "אפר", revenue: 18400 },
      { month: "מאי", revenue: 16800 },
      { month: "יונ", revenue: 21200 },
      { month: "יול", revenue: 19600 },
      { month: "אוג", revenue: 24800 },
      { month: "ספט", revenue: 22400 },
      { month: "אוק", revenue: 28600 },
      { month: "נוב", revenue: 32400 },
      { month: "דצמ", revenue: 38200 },
    ];

    const categoryBreakdown = [
      { category: "מזון", count: 5, revenue: 128000 },
      { category: "חטיפים", count: 3, revenue: 42000 },
      { category: "חול", count: 1, revenue: 18000 },
      { category: "תוספים", count: 1, revenue: 8000 },
    ];

    return NextResponse.json({
      overview: {
        totalProducts,
        activeProducts,
        totalOrders,
        totalSubscriptions,
        activeSubscriptions,
        totalRevenue: 274800,
        monthlyRecurring: activeSubscriptions * 145,
        freeShippingOrders: 124,
        paidShippingOrders: 32,
      },
      monthlyRevenue,
      categoryBreakdown,
      topProducts: products,
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json({ error: "שגיאת שרת" }, { status: 500 });
  }
}
