'use client';

import type { Product } from '@/common/types';
import { CartIcon } from '@/components/icons';
import { useCart } from '@/hooks/use-cart';
import { useCurrency } from '@/hooks/use-currency';
import * as pixel from '@/lib/fpixel';
import { formatPrice, formatPriceWithDiscount, stringToId } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import TiktokPixel from 'tiktok-pixel';

const optionsAnimationVariants = {
  initial: { x: -10, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -10, opacity: 0 },
};

const animationsProps = {
  initial: 'initial',
  animate: 'initial',
  whileHover: 'animate',
  exit: 'exit',
};

type ProductSliderItemProps = {
  product: Product;
};

const imageUrlPrefix = process.env.NEXT_PUBLIC_CLOUDFLARE_FILE_URL_START;

export const ProductSliderItem = ({ product }: ProductSliderItemProps) => {
  const { symbol } = useCurrency();

  const { addProduct: addCartProduct, products: cartProducts } = useCart();

  const isAddedToCart = cartProducts.some(
    (cardProduct) => cardProduct.id === product.id
  );

  const handleAddProduct = (product: Product) => {
    addCartProduct({
      id: product.id,
      media: product.medias[1].url,
      price: product.prices[0].value,
      title: product.title,
      orderQuantity: 1,
      discount: product.prices[0].discount,
      giftAmount: 0,
      variant: product?.variants?.[0],
    });
    pixel.event('add product to cart', {
      productName: product.title,
    });
    TiktokPixel.track('AddToCart', {
      content_type: 'product',
      quantity: 1,
      content_name: product.title,
      content_id: product.id,
    });
  };

  return (
    <>
      <motion.div
        {...animationsProps}
        className="group relative flex h-96 w-full min-w-72 flex-col overflow-hidden bg-white text-center sm:w-80"
      >
        <Link
          className="relative h-full w-full"
          href={`/products/${stringToId(product.title)}`}
          aria-label="product-item"
        >
          <div className="group relative h-full overflow-hidden">
            <Image
              fill
              alt="product image"
              className="object-cover transition-all duration-300 ease-in-out hover:scale-110 group-hover:opacity-0"
              loading="lazy"
              src={`${imageUrlPrefix}/${product.medias[1].url}`}
            />
            <Image
              src={`${imageUrlPrefix}/${product.medias[0].url}`}
              alt="product img"
              className="absolute left-0 top-0 w-full  object-cover opacity-0 transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-100"
              fill
              loading="lazy"
            />
          </div>
        </Link>
        <motion.div
          variants={optionsAnimationVariants}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="absolute left-4 top-4 z-10 hidden flex-col gap-2 sm:flex"
        >
          <AnimatePresence>
            {isAddedToCart ? (
              <motion.div {...animationsProps}>
                <Link href="/cart" className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white opacity-0 shadow-sm ring-1 ring-black group-hover:opacity-100 md:flex md:h-11 md:w-11">
                    <CartIcon />
                  </div>
                  <span className=" rounded-xl bg-black px-2 py-0.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                    View Cart
                  </span>
                </Link>
              </motion.div>
            ) : (
              <motion.button
                {...animationsProps}
                transition={{
                  duration: 5,
                  stiffness: 100,
                  type: 'spring',
                }}
                type="button"
                onClick={() => handleAddProduct(product)}
                className="flex items-center gap-2"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white opacity-0 shadow-sm ring-1 ring-black group-hover:opacity-100 md:flex md:h-11 md:w-11">
                  <CartIcon />
                </div>
                <div className="rounded-xl bg-black px-2 py-0.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                  Add to Cart
                </div>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="z-10 flex flex-col gap-2 px-2 py-2 font-medium">
          <h2 className="text-left transition-all duration-300 ease-in-out">
            <Link
              className="text-sm"
              href={`/products/${stringToId(product.title)}`}
              aria-label={product.title}
            >
              {product.title}
            </Link>
          </h2>
          <div className="w-full">
            <div className="flex w-full items-center justify-between">
              <span className="sm:font-base w-full text-left text-sm transition-all duration-300  ease-in-out sm:mb-2">
                {symbol}
                {
                  formatPriceWithDiscount(
                    product.prices[0].value,
                    product.prices[0].discount
                  ).price
                }
              </span>

              {product.prices[0].discount > 0 && (
                <span className="sm:font-base w-full text-right text-sm text-xs text-gray-600  line-through transition-all duration-300 ease-in-out sm:mb-2">
                  {symbol}
                  {formatPrice(product.prices[0].value)}
                </span>
              )}
            </div>
          </div>
        </div>
        {product.prices[0].discount > 0 && (
          <span className="absolute right-2 top-2 bg-black p-1 text-xs text-white">
            {product.prices[0].discount}% off
          </span>
        )}
      </motion.div>
    </>
  );
};
