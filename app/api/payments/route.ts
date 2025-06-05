import { getData } from "@/lib/db";
import { handlecheckoutsessioncompleted } from "@/lib/payments";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (req: NextRequest) => {
    try {
        const payload = await req.text();
        const sig = req.headers.get("stripe-signature");

        if (!sig) {
            console.error('No Stripe signature found in request headers');
            return NextResponse.json({ error: "No signature found" }, { status: 400 });
        }

        const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;
        if (!endpointSecret) {
            console.error('STRIPE_WEBHOOK_SECRET is not configured');
            return NextResponse.json({ error: "Webhook secret not configured" }, { status: 500 });
        }

        let event;
        try {
            event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
        } catch (err) {
            console.error('Error constructing webhook event:', err);
            return NextResponse.json({ error: "Webhook signature verification failed" }, { status: 400 });
        }

        switch (event.type) {
            case 'checkout.session.completed':
                try {
                    const sessionId = event.data.object.id;
                    const session = await stripe.checkout.sessions.retrieve(sessionId, {
                        expand: ['line_items', 'customer']
                    });
                    
                    if (!session.line_items?.data.length) {
                        console.error('No line items found in session');
                        return NextResponse.json({ error: "No line items in session" }, { status: 400 });
                    }

                    await handlecheckoutsessioncompleted({ session, stripe });
                } catch (err) {
                    console.error('Error processing checkout session:', err);
                    return NextResponse.json({ error: "Failed to process checkout session", details: err instanceof Error ? err.message : 'Unknown error' }, { status: 500 });
                }
                break;

            case "customer.subscription.deleted":
                const subscription = event.data.object;
                // Handle subscription deletion if needed
                break;

            default:
                // Silently handle unprocessed event types
        }

        return NextResponse.json({
            status: "success",
            message: "Webhook processed successfully",
        });
    } catch (err) {
        console.error('Error processing webhook:', err);
        return NextResponse.json(
            { error: "Failed to process webhook", details: err instanceof Error ? err.message : 'Unknown error' },
            { status: 500 }
        );
    }
}