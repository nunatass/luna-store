'use client';

import { CartProduct, CheckoutProduct } from '@/common/types';
import { CloseTwoIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useOrderCheckout } from '@/hooks/api/use-orders';
import { useCart } from '@/hooks/use-cart';
import * as pixel from '@/lib/fpixel';
import {
  cn,
  formatPrice,
  formatPriceWithDiscount,
  stringToId,
} from '@/lib/utils';
import { GiftIcon, Loader } from 'lucide-react';

import { useCurrency } from '@/hooks/use-currency';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { ProductQuantity } from '../../pages/products/product-details/product-quantity';

const emptyCartAnimationVariants = {
  show: { opacity: 1 },
  hide: { opacity: 0 },
};

const itemProductAnimationProps = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: {
    type: 'spring',
    bounce: 0.25,
    duration: 0.5,
  },
  layout: true,
};

type SideMenuProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

const renderEmptyDiv = () => (
  <motion.div {...itemProductAnimationProps} key="empty-div" />
);

const imageUrlPrefix = process.env.NEXT_PUBLIC_CLOUDFLARE_FILE_URL_START;

export const SideCart = ({ setIsOpen }: SideMenuProps) => {
  const pathname = usePathname();
  const router = useRouter();

  const { symbol } = useCurrency();
  const { products, getTotal, removeProduct, addQuantity, removeQuantity } =
    useCart();
  const { mutate: handleOrderCheckout, isPending } = useOrderCheckout();

  const handleRemoveProduct = (productId: string) => {
    removeProduct(productId);
  };

  const handleCloseSideCart = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleCheckout = async () => {
    pixel.event('Go to Checkout');
    handleOrderCheckout(
      {
        products: products.map((product) => ({
          productId: product.id,
          media: product.media,
          quantity: product.orderQuantity,
          variantId: product.variant?.id,
        })) as CheckoutProduct[],
      },
      {
        onSuccess: async ({ clientSecret }) => {
          if (pathname.includes('/checkout/')) {
            router.replace(`/checkout/${clientSecret}`);
          } else {
            router.push(`/checkout/${clientSecret}`);
          }
        },
      }
    );
  };

  const renderProductItem = (product: CartProduct) => {
    if (product.giftAmount === 0) {
      return (
        <motion.div
          {...itemProductAnimationProps}
          className="relative z-40 flex w-full items-start gap-2 bg-white py-4"
        >
          <div className="border-[1px] border-gray-200">
            <Link
              href={`/products/${stringToId(product.title)}`}
              aria-label="product link"
            >
              <Image
                src={`${imageUrlPrefix}/${product.media}`}
                width={70}
                height={60}
                alt="product img"
                className="h-20 w-24"
              />
            </Link>
          </div>
          <div className="w-full">
            <h5 className="font-semibold transition-all duration-300 ease-in-out ">
              <Link
                className="text-sm"
                href={`/products/${stringToId(product.title)}`}
                aria-label={product.title}
              >
                {product.title}
              </Link>
            </h5>
            <div className="w-full">
              {product.discount > 0 ? (
                <div className="flex w-full items-center gap-2">
                  <span className="text-left text-sm">
                    {symbol}
                    {
                      formatPriceWithDiscount(
                        product.price * product.orderQuantity,
                        product.discount
                      ).price
                    }
                  </span>

                  <span className="text-right text-sm text-gray-600  line-through">
                    {symbol}
                    {formatPrice(product.price * product.orderQuantity)}
                  </span>
                </div>
              ) : (
                <span className="text-sm">
                  {symbol}
                  {formatPrice(product.price * product.orderQuantity)}
                </span>
              )}
              <div className="flex w-full items-end justify-between">
                <span className="-mt-2 text-[12px] text-gray-700">
                  {product?.variant?.label}
                </span>
                <ProductQuantity
                  className="mt-1.5 h-8 w-20"
                  setQuantity={(value) => {
                    if (value > product.orderQuantity) {
                      addQuantity(product.id);
                    } else {
                      removeQuantity(product.id);
                    }
                  }}
                  quantity={product.orderQuantity}
                />
              </div>
            </div>
          </div>
          <Button
            onClick={() => handleRemoveProduct(product.id)}
            variant="link"
            size="icon"
            className="absolute right-0 top-2 py-0 text-gray-600"
          >
            <CloseTwoIcon />
          </Button>
        </motion.div>
      );
    }
    return (
      <>
        {product.orderQuantity > product.giftAmount! && (
          <motion.div
            {...itemProductAnimationProps}
            className="relative z-40 flex w-full items-start gap-2 bg-white py-4"
          >
            <div className="border-[1px] border-gray-200">
              <Link
                href={`/products/${stringToId(product.title)}`}
                aria-label="product link"
              >
                <Image
                  src={`${imageUrlPrefix}/${product.media}`}
                  width={70}
                  height={60}
                  alt="product img"
                  className="h-20 w-24"
                />
              </Link>
            </div>
            <div className="w-full">
              <h5 className="font-semibold transition-all duration-300 ease-in-out ">
                <Link
                  className="text-sm"
                  href={`/products/${stringToId(product.title)}`}
                  aria-label={product.title}
                >
                  {product.title}
                </Link>
              </h5>
              <div className="w-full">
                {product.discount > 0 ? (
                  <div className="flex w-full items-center gap-2">
                    <span className="text-left text-sm">
                      {symbol}
                      {
                        formatPriceWithDiscount(
                          product.price * product.orderQuantity,
                          product.discount
                        ).price
                      }
                    </span>

                    <span className="text-right text-sm text-gray-600  line-through">
                      {symbol}
                      {formatPrice(product.price * product.orderQuantity)}
                    </span>
                  </div>
                ) : (
                  <span className="text-sm">
                    {symbol}
                    {formatPrice(
                      product.price *
                        (product.orderQuantity - product.giftAmount!)
                    )}
                  </span>
                )}
                <div className="flex w-full items-end justify-between">
                  <span className="-mt-2 text-[12px] text-gray-700">
                    {product?.variant?.label}
                  </span>
                  <ProductQuantity
                    className="mt-1.5 h-8 w-20"
                    setQuantity={(value) => {
                      if (value > product.orderQuantity - product.giftAmount!) {
                        addQuantity(product.id);
                      } else {
                        removeQuantity(product.id);
                      }
                    }}
                    quantity={product.orderQuantity - product.giftAmount!}
                  />
                </div>
              </div>
            </div>
            <Button
              onClick={() => handleRemoveProduct(product.id)}
              variant="link"
              size="icon"
              className="absolute right-0 top-2 py-0 text-gray-600"
            >
              <CloseTwoIcon />
            </Button>
          </motion.div>
        )}
        <motion.div
          {...itemProductAnimationProps}
          className="relative z-40 flex w-full items-start gap-2 bg-white py-4"
        >
          <div className="border-[1px] border-gray-200">
            <Link
              href={`/products/${stringToId(product.title)}`}
              aria-label="product link"
            >
              <Image
                src={`${imageUrlPrefix}/${product.media}`}
                width={70}
                height={60}
                alt="product img"
                className="h-20 w-24"
              />
            </Link>
          </div>
          <div className="w-full">
            <h5 className="font-semibold transition-all duration-300 ease-in-out ">
              <Link
                className="text-sm"
                href={`/products/${stringToId(product.title)}`}
                aria-label={product.title}
              >
                {product.title}
              </Link>
            </h5>
            <div className="flex w-full gap-2">
              <span className="text-sm">
                {symbol}
                {formatPrice(0)}
              </span>
              <span className="flex h-5 items-center justify-center gap-2 rounded bg-[#669e5cee] px-1 py-0.5 text-xs text-white">
                GIFT
                <GiftIcon className="h-4 w-4" />
              </span>
            </div>
            <div className="flex w-full items-end justify-between">
              <span className="-mt-1 text-[12px] text-gray-700">
                {product?.variant?.label}
              </span>
              <ProductQuantity
                className="mt-1.5 h-8 w-20"
                setQuantity={(value) => {
                  if (value > product.giftAmount!) {
                    addQuantity(product.id);
                  } else {
                    removeQuantity(product.id);
                  }
                }}
                quantity={product.giftAmount!}
              />
            </div>
          </div>
          <Button
            onClick={() => handleRemoveProduct(product.id)}
            variant="link"
            size="icon"
            className="absolute right-0 top-2 py-0 text-gray-600"
          >
            <CloseTwoIcon />
          </Button>
        </motion.div>
      </>
    );
  };

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between p-8">
      <div className="scrollbar-hide h-full w-full overflow-x-hidden overflow-y-scroll">
        <div className=" flex w-full items-center justify-between border-b-[0.5px] bg-white pb-4">
          <h4 className="text-xl font-semibold">Shopping cart</h4>
          <Button
            onClick={handleCloseSideCart}
            aria-label="button close cart"
            className="z-30 flex h-12 w-12  items-center justify-center bg-gray-200 text-black md:h-8 md:w-8 md:hover:bg-gray-200"
          >
            <div className="transition-all duration-300 ease-in-out md:hover:rotate-90">
              <CloseTwoIcon aria-label="close icon" />
            </div>
          </Button>
        </div>

        <div
          className={cn(
            'flex w-full items-center  justify-center',
            products.length > 0 && 'items-start  justify-start'
          )}
        >
          {products.length > 0 && (
            <div className="bg-30 flex w-full flex-col divide-y-[1px] bg-white pb-72 sm:pb-56">
              <div className="w-full bg-[#669e5cee] p-4 text-center text-sm text-white">
                Buy 2, Get Any 3rd Free - code added automatically
              </div>
              {products.map((product, index) => (
                <div key={product.id}>
                  {index === products.length
                    ? renderEmptyDiv()
                    : renderProductItem(product)}
                </div>
              ))}
            </div>
          )}
          <AnimatePresence>
            {products.length === 0 && (
              <motion.div
                variants={emptyCartAnimationVariants}
                initial="hide"
                animate={products.length > 0 ? 'hide' : 'show'}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="flex h-[60vh] w-full flex-col items-center justify-center gap-2"
              >
                <p className="text-base font-normal">Your Cart is empty</p>
                {pathname !== '/products' && (
                  <Button
                    asChild
                    aria-label="button go to products"
                    variant="outline"
                    size="lg"
                    className="md:hover:border-black md:hover:bg-black md:hover:text-white"
                  >
                    <Link href="/products" aria-label="go to products">
                      Go to products
                    </Link>
                  </Button>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="mb-8 flex h-72 w-full flex-col gap-4 border-t-[0.5px] bg-white pt-2 sm:h-auto">
        <div className="flex items-center justify-between">
          <h4 className="text-md font-medium">Subtotal:</h4>
          <span className="text-md font-medium">
            {symbol}
            {formatPrice(getTotal().totalWithDiscount)}
          </span>
        </div>
        <div className="flex w-full flex-col gap-2">
          <Button
            asChild
            className="flex w-full items-center"
            size="lg"
            onClick={handleCloseSideCart}
            disabled={products.length === 0}
          >
            <Link
              href="/cart"
              aria-label="cart"
              onClick={() => {
                pixel.event('Go to cart');
              }}
            >
              View cart
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="flex w-full items-center gap-4"
            onClick={handleCheckout}
            disabled={products.length === 0}
          >
            Checkout
            {isPending && <Loader className="h-5 w-5 animate-spin" />}
          </Button>
        </div>
      </div>
    </div>
  );
};
