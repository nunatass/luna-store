'use client';
import type { Product } from '@/common/types';
import { CartIcon } from '@/components/icons';
import { useCart } from '@/hooks/use-cart';
import { formatPrice, formatPriceWithDiscount } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const optionsAnimationVariants = {
  initial: { x: -10, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -10, opacity: 0 },
};

const optionHoverAnimation = {
  whileHover: {
    backgroundColor: 'black',
    color: 'white',
  },
  transition: { duration: 0.4, ease: 'easeInOut' },
};

const tooltipAnimationVariants = {
  initial: { x: 10, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 10, opacity: 0 },
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

export const ProductRecommendationItem = ({
  product,
}: ProductSliderItemProps) => {
  const { addProduct: addCartProduct, products: cartProducts } = useCart();

  const isAddedToCart = cartProducts.some(
    (cardProduct) => cardProduct.id === product.id
  );

  const handleAddProduct = (product: Product) => {
    addCartProduct({
      id: product.id,
      media: product.medias[0].url,
      price: product.prices[0].value,
      title: product.title,
      orderQuantity: 1,
      discount: product.prices[0].discount,
    });
  };

  return (
    <>
      <motion.div
        {...animationsProps}
        className="relative flex h-96 w-full min-w-72 flex-col overflow-hidden bg-[#f6f6f6] text-center sm:w-80"
      >
        <Link
          className="relative h-full w-full"
          href={`/products/${product.id}`}
          aria-label="product-item"
        >
          <Image
            fill
            alt="product image"
            className="object-cover"
            src={`${imageUrlPrefix}/${product.medias[0].url}`}
          />
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
                  <motion.div
                    {...optionHoverAnimation}
                    className="flex h-8 w-8 items-center justify-center rounded-full shadow-sm ring-1 ring-black md:flex md:h-11 md:w-11 "
                  >
                    <CartIcon />
                  </motion.div>
                  <motion.span
                    variants={tooltipAnimationVariants}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className=" rounded-xl bg-black px-2 py-0.5 text-xs font-medium text-white"
                  >
                    View Cart
                  </motion.span>
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
                <motion.div
                  {...optionHoverAnimation}
                  className="flex h-8 w-8 items-center justify-center rounded-full shadow-sm ring-1 ring-black md:flex md:h-11 md:w-11"
                >
                  <CartIcon />
                </motion.div>
                <motion.div
                  variants={tooltipAnimationVariants}
                  className=" rounded-xl bg-black px-2 py-0.5 text-xs font-medium text-white"
                >
                  Add to Cart
                </motion.div>
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="z-10 flex flex-col gap-2 px-2 py-2 font-medium">
          <h3 className="text-left transition-all duration-300 ease-in-out">
            <Link
              className="text-sm"
              href={`/products/${product.id}`}
              aria-label={product.title}
            >
              {product.title}
            </Link>
          </h3>
          <div className="w-full">
            <div className="flex w-full items-center justify-between">
              <span className="sm:font-base w-full text-left text-sm transition-all duration-300  ease-in-out sm:mb-2">
                $
                {
                  formatPriceWithDiscount(
                    product.prices[0].value,
                    product.prices[0].discount
                  ).price
                }
              </span>

              <span className="sm:font-base w-full text-right text-sm text-xs text-gray-600  line-through transition-all duration-300 ease-in-out sm:mb-2">
                ${formatPrice(product.prices[0].value)}
              </span>
            </div>
          </div>
        </div>
        {product.prices[0].discount > 0 && (
          <span className="absolute right-2 top-2 bg-black p-1 text-xs text-white">
            {product.prices[0].discount}% OFF
          </span>
        )}
      </motion.div>
    </>
  );
};