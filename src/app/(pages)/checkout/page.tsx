'use client';

import { Header } from '@/components/layouts/headers/header';
import { Wrapper } from '@/components/layouts/wrapper';
import * as pixel from '@/lib/fpixel';
import { useSearchParams } from 'next/navigation';

import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function CheckoutPage() {
  pixel.event('Checkout Page');
  const searchParams = useSearchParams();

  const clientSecret = searchParams.get('cs');
  return (
    <Wrapper className="bg-white">
      <Header secondary />
      <div className="py-24">
        <div id="checkout">
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{ clientSecret }}
          >
            <div className="pt-20">
              <EmbeddedCheckout />
            </div>
          </EmbeddedCheckoutProvider>
        </div>
      </div>
    </Wrapper>
  );
}
