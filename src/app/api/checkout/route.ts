import { CartProduct } from '@/common/types';
import { stripe, determineShippingOptions } from '@/lib/stripe';
import { NextRequest, NextResponse } from 'next/server';

const imageUrlPrefix = process.env.NEXT_PUBLIC_CLOUDFLARE_FILE_URL_START;
const successUrl = process.env.NEXT_PUBLIC_STRIPE_SUCCESS_REDIRECT;
const failUrl = process.env.NEXT_PUBLIC_STRIPE_FAIL_REDIRECT;

export async function POST(req: NextRequest) {
  const order = await req.json();
  let total = 0;

  const lineItems = order.items.map((item: CartProduct) => {
    total += item.price * (100 - item.discount) * item.orderQuantity;
    return {
      price_data: {
        currency: 'USD',
        product_data: {
          images: [`${imageUrlPrefix}/${item.media}`],
          name: item.title,
        },
        unit_amount: (item.price * (100 - item.discount)) / 100,
      },
      quantity: item.orderQuantity,
    };
  });

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      shipping_options: determineShippingOptions(total, order.shippingMethod),
      mode: 'payment',
      billing_address_collection: 'required',
      invoice_creation: { enabled: true },
      success_url: successUrl,
      cancel_url: failUrl,
    });
    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: 'Error creating checkout session' });
  }
}
