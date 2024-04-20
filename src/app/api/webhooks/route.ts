import { Product } from '@/common/types';
import { API } from '@/lib/axios';
import { sendSuccessOrderEmail } from '@/lib/mail';
import { stripe } from '@/lib/stripe';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('Stripe-Signature') as string;

  console.log(signature);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.log(error);
    return new NextResponse(`Webhook Error: ${error}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;
  const address = session?.customer_details?.address;
  const email = session?.customer_details?.email || '';
  const name = session?.customer_details?.name || '';
  const phone = session?.customer_details?.phone || '';
  const orderId = session?.metadata?.orderId;

  const addressComponents = [
    address?.line1,
    address?.line2,
    address?.city,
    address?.state,
    address?.postal_code,
    address?.country,
  ];

  const addressString = addressComponents.filter((c) => c !== null).join(', ');

  if (event.type === 'checkout.session.completed') {
    const res = await API.put(`orders/${orderId}`, {
      status: 'PAYED',
      phone,
      address: addressString,
      email,
      name,
    });
    const order = res.data;
    const { data } = await sendSuccessOrderEmail({
      address: addressString,
      email,
      name,
      order: {
        id: order.id,
        total: order.total,
        items: order.products.map((product: Product) => ({
          id: product.id,
          price: product.prices[0].value,
          discount: product.prices[0].discount,
          title: product.title,
          orderQuantity: 1,
          media: product.medias[1].url,
        })),
      },
    });

    return Response.json(data);
  }

  return new NextResponse(null, { status: 200 });
}
