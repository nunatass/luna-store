'use client';
import type { Product } from '@/common/types';
import { CartIcon, QuickViewIcon, WishlistIcon } from '@/components/icons';
import { PreviewProductModal } from '@/components/modals/preview-product-modal';
import { useCart } from '@/hooks/use-cart';
import { useModal } from '@/hooks/use-modal';
import { useWishlist } from '@/hooks/use-whishlist';
import { formatPrice } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useCallback } from 'react';
const cartAnimationVariants = {
  initial: { y: 10, opacity: 0, color: 'black' },
  animate: { y: 0, opacity: 1, color: '#be844c' },
  exit: { y: 10, opacity: 0, color: 'black' },
};

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

export const ProductSliderItem = ({ product }: ProductSliderItemProps) => {
  const { setIsOpen: setIsPreviewModalOpen, setChildren } = useModal();

  const { addProduct: addCartProduct, products: cartProducts } = useCart();
  const { addProduct: addWishlistProduct } = useWishlist();

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

  const handleWishlistProduct = (product: Product) => {
    addWishlistProduct({
      id: product.id,
      media: product.medias[0].url,
      price: product.prices[0].value,
      title: product.title,
      orderQuantity: 1,
      discount: product.prices[0].discount,
    });
  };

  const handleOpenPreviewModal = useCallback(() => {
    setChildren(<PreviewProductModal productId={product.id} />);
    setIsPreviewModalOpen(true);
  }, [setIsPreviewModalOpen, product.id, setChildren]);
  return (
    <>
      <motion.div
        {...animationsProps}
        className="relative flex h-96 w-full min-w-72 flex-col overflow-hidden bg-white px-8 pb-8 text-center sm:w-80"
      >
        <Link className="h-full w-full" href={`/products/${product.id}`}>
          <div
            className="z-0 h-full w-full scale-110 bg-white bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${imageUrlPrefix}/${product.medias[0].url})`,
            }}
          />
        </Link>
        <motion.div
          variants={optionsAnimationVariants}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="absolute left-4 top-4 z-10 flex flex-col gap-2"
        >
          <AnimatePresence>
            {isAddedToCart ? (
              <motion.div {...animationsProps}>
                <Link href="/cart" className="flex items-center gap-2">
                  <motion.div
                    {...optionHoverAnimation}
                    className="flex h-8 w-8 items-center justify-center rounded-full shadow-sm ring-1 ring-gray-400 md:flex md:h-11 md:w-11 "
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
                  className="flex h-8 w-8 items-center justify-center rounded-full shadow-sm ring-1 ring-gray-400 md:flex md:h-11 md:w-11"
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
          <motion.button
            type="button"
            {...animationsProps}
            className="flex items-center gap-2"
            onClick={handleOpenPreviewModal}
          >
            <motion.div
              {...optionHoverAnimation}
              className="flex h-8 w-8 items-center justify-center rounded-full shadow-sm ring-1 ring-gray-400 md:flex md:h-11 md:w-11"
            >
              <QuickViewIcon />
            </motion.div>
            <motion.div
              variants={tooltipAnimationVariants}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className=" rounded-xl bg-black px-2 py-0.5 text-xs font-medium text-white"
            >
              Quick View
            </motion.div>
          </motion.button>
          <motion.button
            type="button"
            {...animationsProps}
            onClick={() => handleWishlistProduct(product)}
            className="flex items-center gap-2"
          >
            <motion.div
              {...optionHoverAnimation}
              className="flex h-8 w-8 items-center justify-center rounded-full shadow-sm ring-1 ring-gray-400 md:flex md:h-11 md:w-11"
            >
              <WishlistIcon />
            </motion.div>

            <motion.div
              variants={tooltipAnimationVariants}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className=" rounded-xl bg-black px-2 py-0.5 text-xs font-medium text-white"
            >
              Add To Wishlist
            </motion.div>
          </motion.button>
        </motion.div>

        <div className="z-10 flex flex-col gap-1 font-medium">
          <h3 className="text-md transition-all  duration-300 ease-in-out hover:text-[#be844c]">
            <Link href={`/products/${product.id}`}>{product.title}</Link>
          </h3>
          <div className="tp-category-price-wrapper-4 ">
            <span className="font-base transition-all duration-300 ease-in-out hover:text-[#be844c]">
              ${formatPrice(product.prices[0].value)}
            </span>
            <motion.div
              variants={cartAnimationVariants}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="absolute bottom-6 left-0 flex w-full items-center justify-center bg-white py-1"
            >
              {isAddedToCart ? (
                <Link href="/cart" className="flex items-center gap-2">
                  <CartIcon /> View Cart
                </Link>
              ) : (
                <button
                  onClick={() => handleAddProduct(product)}
                  className="flex items-center gap-2"
                >
                  <CartIcon /> Add to Cart
                </button>
              )}
            </motion.div>
          </div>
        </div>
        {product.prices[0].discount > 0 && (
          <span className="absolute right-2 top-2 bg-black p-1 text-xs text-white">
            -{product.prices[0].discount}%
          </span>
        )}
      </motion.div>
    </>
  );
};
