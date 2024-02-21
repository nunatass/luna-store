import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

export function FailedSection() {
  return (
    <section className="container flex h-screen flex-col justify-center">
      <h3 className="text-2xl font-semibold">Order Failed</h3>
      <div className="-mt-20 flex h-full w-full flex-col items-center justify-center  gap-8">
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
