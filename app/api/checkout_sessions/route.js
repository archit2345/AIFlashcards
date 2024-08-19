// api/checkout_sessions/route.js
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const { plan, userEmail } = await request.json();

  let session;
  if (plan === 'premium') {
    session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'subscription',
      line_items: [
        {
          price: process.env.NEXT_PUBLIC_STRIPE_PREMIUM_PRICE_ID,
          quantity: 1,
        },
      ],
      customer_email: userEmail,
      success_url: `${process.env.NEXT_PUBLIC_URL}/result/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}`,
    });
  } else if (plan === 'basic') {
    return NextResponse.json({message: "Basic plan selected succcessfully."});
  } else {
    return NextResponse.json({ error: "Invalid plan selected." }, { status: 400 });
  }

  return NextResponse.json({ id: session.id });
}

