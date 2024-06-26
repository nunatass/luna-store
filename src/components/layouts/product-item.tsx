'use client';

import type { Product } from '@/common/types';
import { BoltIcon, CartIcon } from '@/components/icons';
import { useCart } from '@/hooks/use-cart';
import { useCurrency } from '@/hooks/use-currency';
import * as pixel from '@/lib/fpixel';
import { formatPrice, formatPriceWithDiscount, stringToId } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import TiktokPixel from 'tiktok-pixel';

const imageUrlPrefix = process.env.NEXT_PUBLIC_CLOUDFLARE_FILE_URL_START;

const sellingFastString = process.env.NEXT_PUBLIC_SELLING_FAST as string;
const soldOut = process.env.NEXT_PUBLIC_SOLD_OUT as string;

const sellingFast = sellingFastString?.split(',') || [];

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

export const ProductItem = ({ product }: ProductSliderItemProps) => {
  const { symbol } = useCurrency();

  const {
    addProduct: addCartProduct,
    products: cartProducts,
    setSideCartOpen,
  } = useCart();

  const isAddedToCart = cartProducts.some(
    (cartProduct) => cartProduct.id === product.id
  );

  const handleAddProduct = (product: Product) => {
    addCartProduct({
      id: product.id,
      media: product.medias[1].url,
      price: product.prices[0].value,
      title: product.title,
      orderQuantity: 1,
      variant: product?.variants?.[0],
      discount: product.prices[0].discount,
      giftAmount: 0,
    });
    setSideCartOpen(true);
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
    <motion.div
      {...animationsProps}
      className="group relative flex h-60 w-40 flex-col overflow-hidden bg-[#f2f2f2] text-center transition-all duration-300 ease-in-out sm:h-[400px] sm:w-64 md:h-96 md:w-80 lg:h-[400px]"
    >
      <Link
        href={`/products/${stringToId(product.title)}`}
        aria-label="product item"
        className=" group relative h-[70%] w-full sm:h-[80%]"
      >
        <Image
          src={`${imageUrlPrefix}/${product.medias[1].url}`}
          alt="product img"
          className="w-full object-cover transition-all duration-300 ease-in-out hover:scale-110 group-hover:opacity-0"
          fill
          loading="lazy"
        />
        <Image
          src={`${imageUrlPrefix}/${product.medias[0].url}`}
          alt="product img"
          className="absolute left-0  top-0 w-full scale-95  object-cover opacity-0 transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-100"
          fill
          loading="lazy"
        />
      </Link>

      <motion.div
        variants={optionsAnimationVariants}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="absolute left-4 top-4 z-10 hidden flex-col gap-2 sm:flex"
      >
        <AnimatePresence>
          {isAddedToCart ? (
            <motion.button {...animationsProps}>
              <Link
                href="/cart"
                aria-label="cart"
                className="flex cursor-pointer items-center gap-2"
              >
                <div className="text-gray-4 flex h-11 w-11 items-center justify-center rounded-full bg-black text-white opacity-0 shadow-sm group-hover:opacity-100">
                  <CartIcon />
                </div>
                <span className="rounded-xl bg-black px-2 py-0.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                  View Cart
                </span>
              </Link>
            </motion.button>
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
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black text-white opacity-0 shadow-sm group-hover:opacity-100 md:flex md:h-11 md:w-11">
                <CartIcon />
              </div>
              <div className="rounded-xl bg-black px-2 py-0.5 text-xs font-medium text-white opacity-0 group-hover:opacity-100">
                Add to Cart
              </div>
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>

      <Link
        href={`/products/${stringToId(product.title)}`}
        aria-label="product item"
        className="z-10 flex h-[30%] flex-col gap-1 bg-white px-2 py-4 font-medium sm:h-[20%]"
      >
        <h2 className="text-left transition-all duration-300 ease-in-out sm:mb-2">
          <span
            className="line-clamp-1 text-xs sm:text-sm"
            aria-label={product.title}
          >
            {product.title}
          </span>
        </h2>
        <div className="w-full">
          <div className="flex w-full items-center gap-2.5">
            <span className="sm:font-base sm:mb text-left text-sm  transition-all duration-300 ease-in-out">
              {symbol}
              {
                formatPriceWithDiscount(
                  product.prices[0].value,
                  product.prices[0].discount
                ).price
              }
            </span>

            {product.prices[0].discount > 0 && (
              <span className="text-right text-sm text-xs  text-red-700 line-through transition-all duration-300 ease-in-out sm:text-[13px]">
                {symbol}
                {formatPrice(product.prices[0].value)}
              </span>
            )}
          </div>
        </div>
      </Link>
      {soldOut.includes(product?.id) && (
        <span className="absolute right-2 top-2 flex items-center gap-1.5 bg-red-200 p-1 text-xs uppercase text-black shadow">
          Sold out
        </span>
      )}

      {!soldOut.includes(product?.id) && product.prices[0].discount > 0 && (
        <span className="absolute right-2 top-2 bg-black p-1 text-xs text-white">
          {product.prices[0].discount}% off
        </span>
      )}
      {!soldOut.includes(product?.id) &&
        product.prices[0].discount === 0 &&
        sellingFast.includes(product?.id) && (
          <span className="absolute right-2 top-2 flex items-center gap-1.5 bg-white p-1 text-xs uppercase text-black shadow">
            Selling Fast <BoltIcon className="h-3 w-3 " />
          </span>
        )}
    </motion.div>
  );
};
