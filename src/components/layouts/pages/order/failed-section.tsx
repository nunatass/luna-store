'use client';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import * as pixel from '@/lib/fpixel';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';
import TiktokPixel from 'tiktok-pixel';

export function FailedSection() {
  useEffect(() => {
    pixel.event('Order Failed');
    TiktokPixel.track('OrderFailed', {
      content_type: 'Order Failed',
    });
  }, []);
  return (
    <section className="container flex h-screen flex-col justify-center">
      <Breadcrumb title="Order Failed" label="Order Failed" />
      <div className="-mt-40 flex h-full w-full flex-col items-center justify-center  gap-8">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-12 w-12 text-gray-800" />
          <div className="flex flex-col">
            <span>Ooops</span>
            <span className="text-lg font-semibold">
              we couldn&apos;t process your payment. Please try again.
            </span>
          </div>
        </div>
        <Button asChild size="sm">
          <Link href="/cart"> Go to Cart</Link>
        </Button>
      </div>
    </section>
  );
}
