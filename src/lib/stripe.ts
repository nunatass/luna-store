import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
  typescript: true,
});

const freeShippingThreshold =
  Number(process.env.NEXT_PUBLIC_SHIPPING_THRESHOLD) || 6000;

const standardShippingPrice =
  Number(process.env.NEXT_PUBLIC_SHIPPING_STANDARD) || 299;

const fastShippingPrice = Number(process.env.NEXT_PUBLIC_SHIPPING_FAST) || 499;

export const determineShippingOptions = (
  totalAmount: number,
  shippingMethod: 'fast' | 'standard' | 'free',
  currency: string
) => {
  if (shippingMethod === 'fast') {
    return [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: fastShippingPrice,
            currency,
          },
          display_name: 'Fast shipping',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 3,
            },
            maximum: {
              unit: 'business_day',
              value: 5,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0,
            currency,
          },
          display_name: 'Free shipping',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 5,
            },
            maximum: {
              unit: 'business_day',
              value: 10,
            },
          },
        },
      },
    ];
  }

  if (totalAmount >= freeShippingThreshold) {
    return [
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: 0,
            currency,
          },
          display_name: 'Free shipping',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 5,
            },
            maximum: {
              unit: 'business_day',
              value: 10,
            },
          },
        },
      },
      {
        shipping_rate_data: {
          type: 'fixed_amount',
          fixed_amount: {
            amount: fastShippingPrice,
            currency,
          },
          display_name: 'Fast shipping',
          delivery_estimate: {
            minimum: {
              unit: 'business_day',
              value: 3,
            },
            maximum: {
              unit: 'business_day',
              value: 5,
            },
          },
        },
      },
    ];
  }

  return [
    {
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: {
          amount: standardShippingPrice,
          currency,
        },
        display_name: 'Standard shipping',
        delivery_estimate: {
          minimum: {
            unit: 'business_day',
            value: 5,
          },
          maximum: {
            unit: 'business_day',
            value: 10,
          },
        },
      },
    },
    {
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: {
          amount: fastShippingPrice,
          currency,
        },
        display_name: 'Fast shipping',
        delivery_estimate: {
          minimum: {
            unit: 'business_day',
            value: 3,
          },
          maximum: {
            unit: 'business_day',
            value: 5,
          },
        },
      },
    },
  ];
};
