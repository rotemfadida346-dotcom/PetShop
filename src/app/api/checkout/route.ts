import { NextRequest, NextResponse } from "next/server";

// In production, uncomment these:
// import { stripe } from "@/lib/stripe";
// import { prisma } from "@/lib/prisma";

interface CheckoutItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  isSubscription: boolean;
  intervalWeeks?: number;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { items } = body as { items: CheckoutItem[] };

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "No items provided" },
        { status: 400 }
      );
    }

    // Production Stripe Checkout Session:
    /*
    const lineItems = items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
        ...(item.isSubscription && {
          recurring: {
            interval: "week" as const,
            interval_count: item.intervalWeeks || 4,
          },
        }),
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      mode: items.some((i) => i.isSubscription) ? "subscription" : "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
      allow_promotion_codes: true,
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
    });

    return NextResponse.json({ url: session.url });
    */

    // Demo mode: return success URL directly
    return NextResponse.json({
      url: null,
      message: "Demo mode - Stripe not configured. Redirecting to success.",
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
