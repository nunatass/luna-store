'use client';

import { Header } from '@/components/layouts/headers/header';
import { Wrapper } from '@/components/layouts/wrapper';
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
  const searchParams = useSearchParams();

  const clientSecret = searchParams.get('cs');
  return (
    <Wrapper className="bg-[#f2f2f2]">
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
