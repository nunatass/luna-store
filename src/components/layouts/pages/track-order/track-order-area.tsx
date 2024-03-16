'use client';

import { Button } from '@/components/ui/button';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z.object({
  trackId: z.string().trim(),
});

export function TrackOrderArea() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  // on submit
  const onSubmit = (data: { trackId: string }) => {
    window.open(
      `https://parcelsapp.com/en/tracking/${data.trackId}`,
      '_target'
    );
  };

  return (
    <section className="container mt-8 flex h-[70vh] flex-col items-center justify-center gap-12 md:mt-0">
      <div className="flex flex-row bg-white px-10 py-12 drop-shadow-md">
        <div className="flex flex-col gap-4">
          <p className="text-sm">
            Thank you for choosing StellaStone! We understand how important it
            is for you to stay updated on the status of your order.
            <br /> To track your order, simply enter your track order code
            bellow.
          </p>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex w-full flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="trackId"
                render={({ field }) => (
                  <FormItem className="flex w-full flex-col">
                    <FormLabel>Track Code</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Track Code"
                        className="rounded-none"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full px-14">
                Track Order
              </Button>
            </form>
          </Form>
          <div className="flex gap-2 text-gray-400">
            <p className="text-sm">
              If you come across any difficulties or require assistance, feel
              free to reach out to our dedicated customer support team.
              <br />
              Should you not have a tracking code, simply get in{' '}
              <Link
                className="text-black underline"
                href="/contact"
                aria-label="contact"
              >
                touch with us
              </Link>
              , including your order number, and we&apos;ll promptly resend it
              to you via email.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
