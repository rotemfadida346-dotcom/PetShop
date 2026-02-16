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
      orders,
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
      prisma.order.findMany({
        select: { total: true, shipping: true, createdAt: true },
      }),
    ]);

    // Calculate real revenue from actual orders
    const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);
    const freeShippingOrders = orders.filter((o) => o.shipping === 0).length;
    const paidShippingOrders = orders.filter((o) => o.shipping > 0).length;

    // Calculate real monthly revenue from orders
    const monthLabels = ["ינו", "פבר", "מרץ", "אפר", "מאי", "יונ", "יול", "אוג", "ספט", "אוק", "נוב", "דצמ"];
    const monthlyRevenue = monthLabels.map((month, i) => {
      const monthOrders = orders.filter((o) => new Date(o.createdAt).getMonth() === i);
      return { month, revenue: monthOrders.reduce((sum, o) => sum + o.total, 0) };
    });

    // Calculate real category breakdown from products
    const categories = new Map<string, { count: number; revenue: number }>();
    const catLabels: Record<string, string> = {
      FOOD: "מזון", TREATS: "חטיפים", LITTER: "חול",
      SUPPLEMENTS: "תוספים", TOYS: "צעצועים", ACCESSORIES: "אביזרים",
    };
    for (const p of products) {
      const label = catLabels[p.category] || p.category;
      const existing = categories.get(label) || { count: 0, revenue: 0 };
      categories.set(label, { count: existing.count + 1, revenue: existing.revenue });
    }
    const categoryBreakdown = Array.from(categories.entries()).map(([category, data]) => ({
      category,
      count: data.count,
      revenue: data.revenue,
    }));

    // Real MRR from active subscriptions
    const activeSubs = await prisma.subscription.findMany({
      where: { status: "ACTIVE" },
      select: { pricePerDelivery: true },
    });
    const monthlyRecurring = activeSubs.reduce((sum, s) => sum + s.pricePerDelivery, 0);

    return NextResponse.json({
      overview: {
        totalProducts,
        activeProducts,
        totalOrders,
        totalSubscriptions,
        activeSubscriptions,
        totalRevenue,
        monthlyRecurring,
        freeShippingOrders,
        paidShippingOrders,
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
