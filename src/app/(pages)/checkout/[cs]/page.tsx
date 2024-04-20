'use client';

import { Header } from '@/components/layouts/headers/header';
import { Wrapper } from '@/components/layouts/wrapper';
import * as pixel from '@/lib/fpixel';
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect } from 'react';
import TiktokPixel from 'tiktok-pixel';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

type CheckoutPageProps = {
  params: { cs: string };
};

export default function CheckoutPage({ params }: CheckoutPageProps) {
  useEffect(() => {
    pixel.event('Checkout page');
    TiktokPixel.track('CheckoutPage', {
      content_type: 'Checkout page',
      content_id: 'go to checkout',
    });
  }, []);

  return (
    <Wrapper className="bg-[#f2f2f2]">
      <Header secondary />
      <div className="py-24">
        <div id="checkout">
          <EmbeddedCheckoutProvider
            stripe={stripePromise}
            options={{ clientSecret: params.cs }}
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
