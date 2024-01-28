'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

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
import Link from 'next/link';
import { useState } from 'react';

const shippingMethods = [
  {
    id: 'free',
    label: 'Free shipping',
    value: 0,
  },
  {
    id: 'standard',
    label: 'Standard shipping',
    value: 2.99,
  },
  {
    id: 'fast',
    label: 'Fast shipping',
    value: 5.0,
  },
];

const FormSchema = z.object({
  type: z.enum(['free', 'standard', 'fast'], {
    required_error: 'You need to select a shipping method',
  }),
});

export function CartShippingPriceForm() {
  const [shipCost, setShipCost] = useState(0);

  const { getTotal } = useCart();

  const total = getTotal().total + shipCost;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit() {
    // TODO: hanle submitted
  }

  function handleShippingMethodChange(value: string) {
    setShipCost(() => {
      return shippingMethods.filter((method) => method.id === value)[0].value;
    });
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
                  defaultValue={shippingMethods[0].label}
                  className="flex flex-col space-y-1"
                >
                  {shippingMethods.map((shippingMethod) => (
                    <FormItem
                      key={shippingMethod.id}
                      className="flex items-center space-x-3 space-y-0"
                    >
                      <FormControl>
                        <RadioGroupItem
                          id={shippingMethod.id}
                          value={shippingMethod.label}
                        />
                      </FormControl>
                      <FormLabel className="flex gap-2 font-normal">
                        {shippingMethod.label}
                        <p className="text-normal text-blue-500">
                          ${shippingMethod.value.toFixed(2)}
                        </p>
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2 py-2">
          <div className="flex items-center justify-between text-xl font-medium">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
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
