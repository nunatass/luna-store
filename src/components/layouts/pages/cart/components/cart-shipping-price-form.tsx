'use client';

import { ShippingMethod } from '@/common/types';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useOrderCheckout } from '@/hooks/api/use-orders';
import { useCart } from '@/hooks/use-cart';
import { useCurrency } from '@/hooks/use-currency';
import { formatPrice } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { loadStripe } from '@stripe/stripe-js';
import crypto from 'crypto';
import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import * as z from 'zod';

const freeShippingTrashHolder =
  Number(process.env.NEXT_PUBLIC_SHIPPING_THRESHOLD) || 6000;

const standardShippingPrice =
  Number(process.env.NEXT_PUBLIC_SHIPPING_STANDARD) || 299;

const checkoutHashPassword = process.env
  .NEXT_PUBLIC_CHECK_HASH_PASSWORD as string;

const fastShippingPrice = Number(process.env.NEXT_PUBLIC_SHIPPING_FAST) || 499;

type ShippingMethods = {
  [key: string]: {
    id: string;
    label: string;
    value: number;
    description: string;
  };
};

const shippingMethods: ShippingMethods = {
  free: {
    id: 'free',
    label: 'Free shipping',
    value: 0,
    description: '5-10 business days',
  },
  standard: {
    id: 'standard',
    label: 'Standard shipping',
    value: standardShippingPrice,
    description: '5-10 business days',
  },
  fast: {
    id: 'fast',
    label: 'Fast shipping',
    value: fastShippingPrice,
    description: '3-5 business days',
  },
};

const FormSchema = z.object({
  shippingMethod: z.enum(['free', 'standard', 'fast']),
});

export function CartShippingPriceForm() {
  const { getTotal, products } = useCart();

  const [method, setMethod] = useState('standard');
  const { total, totalWithDiscount } = getTotal();
  const { mutate: handleOrderCheckout, isPending } = useOrderCheckout();
  const { symbol, currency } = useCurrency();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      shippingMethod:
        totalWithDiscount > freeShippingTrashHolder ? 'free' : 'standard',
    },
  });

  useEffect(() => {
    const selectedMethod =
      totalWithDiscount > freeShippingTrashHolder ? 'free' : 'standard';
    if (method !== 'fast') {
      setMethod(selectedMethod);
      form.setValue('shippingMethod', selectedMethod);
    }
  }, [setMethod, totalWithDiscount, method, form]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
    );

    if (!stripe) throw new Error('Stripe failed to initialize.');
    const payload = {
      items: products,
      shippingMethod: data.shippingMethod,
      currency,
    };

    const token = crypto
      .createHmac('sha256', checkoutHashPassword)
      .update(JSON.stringify(payload))
      .digest('hex');

    handleOrderCheckout(
      {
        payload,
        token,
      },
      {
        onSuccess: async ({ sessionId }) => {
          const stripeError = await stripe.redirectToCheckout({ sessionId });

          if (stripeError) {
            toast.error('Problem redirecting to checkout');
          }
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full w-full flex-col justify-between py-2"
      >
        <FormField
          control={form.control}
          name="shippingMethod"
          render={({ field }) => (
            <FormItem>
              <div className="mb-4 flex flex-col gap-0.5">
                <FormLabel className="text-lg">Shipping Methods</FormLabel>
                <p className="text-[13px] text-gray-800">
                  {`Free stander delivery on purchases of +${symbol}60`}
                </p>
              </div>

              <FormControl>
                <RadioGroup
                  onValueChange={(value) => {
                    setMethod(value);
                    field.onChange(value);
                  }}
                  defaultValue={field.value}
                  value={form.getValues().shippingMethod}
                  className="flex flex-col space-y-2"
                >
                  {Object.keys(shippingMethods).map(
                    (methodKey: keyof typeof shippingMethods) => {
                      const method = methodKey as ShippingMethod;
                      return (
                        <FormItem
                          key={method}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem
                              value={method}
                              disabled={
                                (method === 'free' &&
                                  totalWithDiscount <
                                    freeShippingTrashHolder) ||
                                (method === 'standard' &&
                                  totalWithDiscount > freeShippingTrashHolder)
                              }
                            />
                          </FormControl>
                          <FormLabel className="flex flex-col gap-2">
                            <div className="flex gap-2 font-normal">
                              {shippingMethods[method].label}:
                              <p className="font-semibold">
                                {symbol}
                                {formatPrice(shippingMethods[method].value)}
                              </p>
                            </div>
                            <p className="text-xs text-gray-800">
                              {shippingMethods[method].description}
                            </p>
                          </FormLabel>
                        </FormItem>
                      );
                    }
                  )}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-2.5 flex flex-col gap-2 py-2">
          <div className="flex items-center justify-between text-xl font-medium">
            <span>Total</span>
            <div className="flex flex-col items-center justify-center">
              <span>
                {symbol}
                {formatPrice(
                  totalWithDiscount +
                    shippingMethods[form.getValues().shippingMethod].value
                )}
              </span>
              {formatPrice(
                totalWithDiscount +
                  shippingMethods[form.getValues().shippingMethod].value
              ) !==
                formatPrice(
                  total + shippingMethods[form.getValues().shippingMethod].value
                ) && (
                <span className="text-sm font-normal line-through">
                  {symbol}
                  {formatPrice(
                    total +
                      shippingMethods[form.getValues().shippingMethod].value
                  )}
                </span>
              )}
            </div>
          </div>
          <Button className="flex w-full items-center  gap-4">
            Proceed to Checkout
            {isPending && <Loader className="h-5 w-5 animate-spin" />}
          </Button>
        </div>
      </form>
    </Form>
  );
}
