'use client';

import { Header } from '@/components/layouts/headers/header';
import { Wrapper } from '@/components/layouts/wrapper';
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

type CheckoutPageProps = {
  params: { cs: string };
};
export default function CheckoutPage({ params }: CheckoutPageProps) {
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
