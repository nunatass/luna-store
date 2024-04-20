'use client';

import { AskQuestionIcon, CartTwoIcon } from '@/components/icons';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { formatPrice, formatPriceWithDiscount, stringToId } from '@/lib/utils';
import { CheckCircle2, GiftIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import TiktokPixel from 'tiktok-pixel';

const imageUrlPrefix = process.env.NEXT_PUBLIC_CLOUDFLARE_FILE_URL_START;

export function SuccessSection() {
  const [isInitialRender, setIsInitialRender] = useState(true);
  const { products, getTotal, removeAll } = useCart();
  const { totalWithDiscount } = getTotal();
  const [productData] = useState(products);
  const [total] = useState(totalWithDiscount);

  const searchParams = useSearchParams();

  const orderId = searchParams.get('orderId');

  useEffect(() => {
    if (isInitialRender) {
      if (products.length === 0 || !orderId) {
        redirect('/order');
      }
      setIsInitialRender(false);
      removeAll();
      TiktokPixel.track('OrderCompleted', {
        content_type: 'Order Success',
        content_id: 'Order Success',
      });
    }
  }, [isInitialRender, removeAll, products.length, orderId]);

  return (
    <div className="flex flex-col gap-8">
      <div className="container">
        <Breadcrumb title="Order Completed" label="Order Completed" />
      </div>

      <section className="container flex h-full flex-col justify-center gap-y-8 divide-x md:flex-row">
        <div className="w-full px-8">
          <div className="flex flex-col gap-8">
            <div className="mt-10 flex items-center gap-2">
              <CheckCircle2 className="h-12 w-12 text-gray-800" />
              <div className="flex flex-col">
                <div>
                  Order: #<span className="uppercase">{orderId}</span>
                </div>
                <span className="text-lg font-semibold">Thank You</span>
              </div>
            </div>

            <div className="flex flex-col border p-6 text-gray-500">
              <span className="text-lg font-semibold text-black">
                Order Updates
              </span>
              <span className="">
                You wil receive your order and shipping updates via email!
              </span>
            </div>
            <div className="flex w-full flex-wrap items-center justify-between gap-y-2">
              <div className="flex items-center gap-1 text-sm text-gray-500">
                <AskQuestionIcon />
                <span>Need help?</span>
                <Link
                  href="/contact"
                  aria-label="contact us"
                  className="font-semibold text-black md:hover:underline"
                >
                  Contact Us
                </Link>
              </div>
              <Button asChild size="sm">
                <Link href="/products" aria-label="continue shipping">
                  Continue Shipping
                </Link>
              </Button>
            </div>
          </div>
        </div>
        <div className="w-full px-8">
          <div className="flex items-center gap-2">
            <CartTwoIcon />
            <h1 className="text-2xl font-semibold">Your Order</h1>
          </div>

          <div className="flex flex-col justify-center gap-10 divide-y">
            {productData.map((product) => (
              <div className="flex items-center gap-2 pt-8" key={product.id}>
                <Link
                  href={`/products/${stringToId(product.title)}`}
                  aria-label="product item"
                >
                  <div className="item-center flex h-20 w-20 justify-center bg-gray-200">
                    <Image
                      src={`${imageUrlPrefix}/${product.media}`}
                      alt="product img"
                      width={80}
                      height={80}
                      priority
                      className="object-cover"
                    />
                  </div>
                </Link>
                <div className="ml-2 flex flex-col gap-2">
                  <Link
                    href={`/products/${stringToId(product.title)}`}
                    aria-label="product item"
                    className="text-left text-base font-medium"
                  >
                    {product.title}
                  </Link>
                  <div className="flex items-start justify-between">
                    <span className="text-sm">
                      Qtd: {product.orderQuantity}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <span className="font-semibold">
                      $
                      {Number(
                        formatPriceWithDiscount(product.price, product.discount)
                          .price
                      ) *
                        (product.orderQuantity - product.giftAmount!)}
                    </span>
                    {product.discount > 0 && (
                      <span className="line-through	">
                        $
                        {Number(
                          formatPriceWithDiscount(
                            product.price,
                            product.discount
                          ).price
                        ) * product.orderQuantity}
                      </span>
                    )}
                  </div>
                  <span className="-mt-2 text-[12px] text-gray-700">
                    {product?.variant?.label}
                  </span>
                  {product.giftAmount! > 0 && (
                    <span className="flex h-5 w-20 items-center justify-center gap-2 rounded bg-[#669e5cee] px-1 py-0.5 text-sm text-white">
                      {`${product.giftAmount!} GIFT`}

                      <GiftIcon className="h-4 w-4" />
                    </span>
                  )}
                </div>
              </div>
            ))}
            <div>
              <div className="flex items-center justify-between py-4 font-semibold">
                <span>Total:</span>
                <span>${formatPrice(total)}</span>
              </div>
              <span className="text-sm text-gray-500">
                The total price displayed does not include the shipping cost.
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
