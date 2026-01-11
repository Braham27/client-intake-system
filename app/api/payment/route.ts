import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const DEPOSIT_PERCENTAGE = 50;

// Create payment intent for deposit
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { intakeFormId, amount, paymentType = "deposit" } = body;

    if (!intakeFormId || !amount) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get intake form and client info
    const intakeForm = await prisma.intakeForm.findUnique({
      where: { id: intakeFormId },
      include: { client: true },
    });

    if (!intakeForm) {
      return NextResponse.json(
        { success: false, error: "Intake form not found" },
        { status: 404 }
      );
    }

    // Calculate amount
    const depositAmount = paymentType === "deposit" 
      ? Math.round(amount * (DEPOSIT_PERCENTAGE / 100))
      : amount;

    // Create or get Stripe customer
    let stripeCustomerId = intakeForm.client?.stripeCustomerId;

    if (!stripeCustomerId && intakeForm.client) {
      const customer = await stripe.customers.create({
        email: intakeForm.client.email,
        name: `${intakeForm.client.firstName} ${intakeForm.client.lastName}`,
        phone: intakeForm.client.phone || undefined,
        metadata: {
          clientId: intakeForm.client.id,
        },
      });
      stripeCustomerId = customer.id;

      // Save Stripe customer ID
      await prisma.client.update({
        where: { id: intakeForm.client.id },
        data: { stripeCustomerId },
      });
    }

    // Create payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(depositAmount * 100), // Convert to cents
      currency: "usd",
      customer: stripeCustomerId || undefined,
      metadata: {
        intakeFormId,
        paymentType,
        clientId: intakeForm.clientId || "",
      },
      automatic_payment_methods: {
        enabled: true,
      },
      description: paymentType === "deposit"
        ? `Website Project Deposit - ${intakeForm.businessName || "Client"}`
        : `Website Project Payment - ${intakeForm.businessName || "Client"}`,
    });

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        intakeFormId,
        clientId: intakeForm.clientId!,
        amount: depositAmount,
        type: paymentType,
        status: "pending",
        stripePaymentIntentId: paymentIntent.id,
      },
    });

    return NextResponse.json({
      success: true,
      clientSecret: paymentIntent.client_secret,
      paymentId: payment.id,
      amount: depositAmount,
    });
  } catch (error) {
    console.error("Payment error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to create payment" },
      { status: 500 }
    );
  }
}

// Verify payment status
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const paymentIntentId = searchParams.get("payment_intent");
  const paymentId = searchParams.get("payment_id");

  if (!paymentIntentId && !paymentId) {
    return NextResponse.json(
      { success: false, error: "Payment ID required" },
      { status: 400 }
    );
  }

  try {
    if (paymentIntentId) {
      const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      
      // Update payment record
      await prisma.payment.updateMany({
        where: { stripePaymentIntentId: paymentIntentId },
        data: { 
          status: paymentIntent.status === "succeeded" ? "completed" : paymentIntent.status,
          paidAt: paymentIntent.status === "succeeded" ? new Date() : null,
        },
      });

      return NextResponse.json({
        success: true,
        status: paymentIntent.status,
        amount: paymentIntent.amount / 100,
      });
    }

    if (paymentId) {
      const payment = await prisma.payment.findUnique({
        where: { id: paymentId },
      });

      return NextResponse.json({
        success: true,
        payment,
      });
    }
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to verify payment" },
      { status: 500 }
    );
  }
}
