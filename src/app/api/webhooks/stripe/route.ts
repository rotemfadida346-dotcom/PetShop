import { NextRequest, NextResponse } from "next/server";

// In production, uncomment:
// import { stripe } from "@/lib/stripe";
// import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  // In production, parse body and verify Stripe signature
  // const body = await request.text();
  // const signature = request.headers.get("stripe-signature") as string;

  /*
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      await prisma.order.create({
        data: {
          email: session.customer_details?.email || "",
          status: "PROCESSING",
          subtotal: (session.amount_subtotal || 0) / 100,
          total: (session.amount_total || 0) / 100,
          stripeSessionId: session.id,
          stripePaymentId: session.payment_intent as string,
          shippingName: session.shipping_details?.name,
          shippingLine1: session.shipping_details?.address?.line1,
          shippingCity: session.shipping_details?.address?.city,
          shippingState: session.shipping_details?.address?.state,
          shippingZip: session.shipping_details?.address?.postal_code,
          shippingCountry: session.shipping_details?.address?.country,
        },
      });
      break;
    }

    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted":
    case "invoice.payment_succeeded":
    case "invoice.payment_failed":
      // Handle subscription and payment events
      break;
  }
  */

  void request;

  return NextResponse.json({ received: true });
}
