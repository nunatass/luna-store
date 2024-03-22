import { CartProduct } from '@/common/types';
import { API } from '@/lib/axios';
import { determineShippingOptions, stripe } from '@/lib/stripe';
import crypto from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

const imageUrlPrefix = process.env.NEXT_PUBLIC_CLOUDFLARE_FILE_URL_START;
const successUrl = process.env.NEXT_PUBLIC_STRIPE_SUCCESS_REDIRECT;
const failUrl = process.env.NEXT_PUBLIC_STRIPE_FAIL_REDIRECT;
const checkoutHashPassword = process.env
  .NEXT_PUBLIC_CHECK_HASH_PASSWORD as string;

export async function POST(req: NextRequest) {
  const order = await req.json();
  const hash = crypto
    .createHmac('sha256', checkoutHashPassword)
    .update(JSON.stringify(order.payload))
    .digest('hex');

  if (hash !== order?.token) {
    console.log('Invalid payload');
    return NextResponse.json({ error: 'Invalid payload', status: 400 });
  }

  let total = 0;
  const lineItems = order?.payload?.items.map((item: CartProduct) => {
    total +=
      Math.round((item.price * (100 - item.discount)) / 100) *
      item.orderQuantity;

    return {
      price_data: {
        currency: 'USD',
        product_data: {
          images: [`${imageUrlPrefix}/${item.media}`],
          name: item.title,
        },
        unit_amount: Math.round((item.price * (100 - item.discount)) / 100),
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
    total: total,
    products: order?.payload.items.map((item: CartProduct) => ({
      productId: item.id,
      quantity: item.orderQuantity,
      variantId: item.variant?.id,
    })),
  });

  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const session = await stripe.checkout.sessions.create({
      line_items: lineItems,
      shipping_options: determineShippingOptions(
        total,
        order?.payload.shippingMethod
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
