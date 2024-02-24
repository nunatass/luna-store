import { API } from '@/lib/axios';
import { determineShippingOptions, stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';

const imageUrlPrefix = process.env.NEXT_PUBLIC_CLOUDFLARE_FILE_URL_START;
const successUrl = process.env.NEXT_PUBLIC_STRIPE_SUCCESS_REDIRECT;
const failUrl = process.env.NEXT_PUBLIC_STRIPE_FAIL_REDIRECT;

export async function POST(req) {
  const order = await req.json();
  let total = 0;

  const lineItems = order.items.map((item) => {
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

  const res = await API.post('/orders', {
    status: 'CHECKOUT',
    phone: '',
    address: '',
    email: '',
    name: '',
    total: total / 100,
    products: order.items.map((item) => ({
      productId: item.id,
      quantity: item.orderQuantity,
    })),
  });

  try {
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      shipping_options: determineShippingOptions(
        total / 100,
        order.shippingMethod
      ),
      mode: 'payment',
      payment_method_types: ['card', 'paypal'],
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
      invoice_creation: { enabled: true },
      success_url: `${successUrl}&orderId=${res.data.id}`,
      cancel_url: failUrl,
      metadata: {
        id: res.data.id,
      },
    });
    return NextResponse.json({ sessionId: session.id });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: 'Error creating checkout session' });
  }
}
