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
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

type shippingMethodsType = 'free' | 'standard' | 'fast';

interface ShippingMethod {
  id: string;
  label: string;
  value: number;
}

interface ShippingMethods {
  [key: string]: ShippingMethod;
}

const shippingMethods: ShippingMethods = {
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
  shippingMethod: z.enum(['free', 'standard', 'fast']),
});

export function CartShippingPriceForm() {
  const { getTotal } = useCart();
  const { total, totalWithDiscount } = getTotal();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      shippingMethod: totalWithDiscount > 9900 ? 'free' : 'standard',
    },
  });

  useEffect(() => {
    const method = totalWithDiscount > 9900 ? 'free' : 'standard';
    if (form.getValues().shippingMethod !== 'fast') {
      form.setValue('shippingMethod', method);
    }
  }, [form, totalWithDiscount]);

  function onSubmit() {
    // TODO: handle submitted
    //console.log(data);
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
            <FormItem className="">
              <FormLabel>Shipping</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  value={form.getValues().shippingMethod}
                  className="flex flex-col space-y-1"
                >
                  {Object.keys(shippingMethods).map(
                    (methodKey: keyof typeof shippingMethods) => {
                      const method = methodKey as shippingMethodsType;
                      return (
                        <FormItem
                          key={method}
                          className="flex items-center space-x-3 space-y-0"
                        >
                          <FormControl>
                            <RadioGroupItem value={method} />
                          </FormControl>
                          <FormLabel className="flex gap-2 font-normal">
                            {shippingMethods[method].label}
                            <p className="font-semibold">
                              ${formatPrice(shippingMethods[method].value)}
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
        <div className="flex flex-col gap-2 py-2">
          <div className="flex items-center justify-between text-xl font-medium">
            <span>Total</span>
            <div className="flex flex-col items-center justify-center">
              <span>
                $
                {formatPrice(
                  totalWithDiscount +
                    shippingMethods[form.getValues('shippingMethod')].value
                )}
              </span>
              <span className="text-sm font-normal line-through">
                $
                {formatPrice(
                  total +
                    shippingMethods[form.getValues('shippingMethod')].value
                )}
              </span>
            </div>
          </div>
          <Button className="w-full">
            {/* <Link href="/checkout" className="tp-cart-checkout-btn w-100"> */}
            Proceed to Checkout
            {/* </Link> */}
          </Button>
        </div>
      </form>
    </Form>
  );
}
