'use client';

import { CheckoutProduct } from '@/common/types';
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
import * as pixel from '@/lib/fpixel';
import { formatPrice } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import TiktokPixel from 'tiktok-pixel';
import * as z from 'zod';

const freeShippingTrashHolder =
  Number(process.env.NEXT_PUBLIC_SHIPPING_THRESHOLD) || 6000;

const standardShippingPrice =
  Number(process.env.NEXT_PUBLIC_SHIPPING_STANDARD) || 299;

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
    description: '7-10 business days',
  },
  standard: {
    id: 'standard',
    label: 'Shipping',
    value: standardShippingPrice,
    description: '7-10 business days',
  },
};

const FormSchema = z.object({
  shippingMethod: z.enum(['free', 'standard', 'fast']),
});

export function CartShippingPriceForm() {
  const router = useRouter();

  const { getTotal, products } = useCart();

  const [method, setMethod] = useState('standard');
  const { total, totalWithDiscount } = getTotal();
  const { mutate: handleOrderCheckout, isPending } = useOrderCheckout();
  const { symbol } = useCurrency();

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
    setMethod(selectedMethod);
    form.setValue('shippingMethod', selectedMethod);
  }, [setMethod, totalWithDiscount, method, form]);

  async function onSubmit() {
    pixel.event('Go to Checkout');
    TiktokPixel.track('GoToCheckout', {
      content_type: 'go to checkout',
    });
    handleOrderCheckout(
      {
        products: products.map((product) => ({
          productId: product.id,
          media: product.media,
          quantity: product.orderQuantity,
          variantId: product.variant?.id,
        })) as CheckoutProduct[],
        referralId: window?.tolt_referral,
      },
      {
        onSuccess: async ({ clientSecret }) => {
          router.push(`/checkout/${clientSecret}`);
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
                  {`Free shipping on purchases over ${symbol}60`}
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
                  {totalWithDiscount >= freeShippingTrashHolder ? (
                    <FormItem
                      key="free"
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value="free" />
                      </FormControl>
                      <FormLabel className="flex flex-col gap-2">
                        <div className="flex gap-2 font-normal">
                          {shippingMethods['free'].label}:
                          <p className="font-semibold">
                            {symbol}
                            {formatPrice(shippingMethods['free'].value)}
                          </p>
                        </div>
                        <p className="text-xs text-gray-800">
                          {shippingMethods['free'].description}
                        </p>
                      </FormLabel>
                    </FormItem>
                  ) : (
                    <FormItem
                      key="standard"
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem value="standard" />
                      </FormControl>
                      <FormLabel className="flex flex-col gap-2">
                        <div className="flex gap-2 font-normal">
                          {shippingMethods['standard'].label}:
                          <p className="font-semibold">
                            {symbol}
                            {formatPrice(shippingMethods['standard'].value)}
                          </p>
                        </div>
                        <p className="text-xs text-gray-800">
                          {shippingMethods['standard'].description}
                        </p>
                      </FormLabel>
                    </FormItem>
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
