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
import { useCart } from '@/hooks/use-cart';
import { formatPrice } from '@/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

type ShippingMethodsType = 'free' | 'standard' | 'fast';

const shippingMethods = {
  free: {
    id: 'free',
    label: 'Free shipping',
    value: 0,
  },
  standard: {
    id: 'standard',
    label: 'Standard shipping',
    value: 299,
  },
  fast: {
    id: 'fast',
    label: 'Fast shipping',
    value: 500,
  },
};

const FormSchema = z.object({
  type: z.enum(['free', 'standard', 'fast'], {
    required_error: 'You need to select a shipping method',
  }),
});

export function CartShippingPriceForm() {
  const [shipCost, setShipCost] = useState(shippingMethods.standard.value);

  const { getTotal } = useCart();
  const { total, totalWithDiscount } = getTotal();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit() {
    // TODO: handle submitted
  }

  function handleShippingMethodChange(method: ShippingMethodsType) {
    setShipCost(shippingMethods[method]?.value);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex h-full w-full flex-col justify-between py-2"
      >
        <FormField
          control={form.control}
          name="type"
          render={() => (
            <FormItem className="">
              <FormLabel>Shipping</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={handleShippingMethodChange}
                  defaultValue={'standard'}
                  className="flex flex-col space-y-1"
                >
                  {Object.entries(shippingMethods).map(
                    ([method, { label, value, id }]) => (
                      <FormItem
                        key={method}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem id={method} value={id} />
                        </FormControl>
                        <FormLabel className="flex gap-2 font-normal">
                          {label}
                          <p className="text-normal text-blue-500">
                            ${formatPrice(value)}
                          </p>
                        </FormLabel>
                      </FormItem>
                    )
                  )}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2 py-2">
          <div className="flex items-center justify-between text-xl font-medium">
            <span>Total</span>
            <div className="flex flex-col items-center justify-center">
              <span> ${formatPrice(totalWithDiscount + shipCost)}</span>
              <span className="text-sm font-normal line-through">
                ${formatPrice(total + shipCost)}
              </span>
            </div>
          </div>
          <Button className="w-full">
            <Link href="/checkout" className="tp-cart-checkout-btn w-100">
              Proceed to Checkout
            </Link>
          </Button>
        </div>
      </form>
    </Form>
  );
}
