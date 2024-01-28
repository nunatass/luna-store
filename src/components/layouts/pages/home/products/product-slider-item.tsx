'use client';
import type { CartProduct } from '@/common/types';
import { CartIcon, QuickViewIcon, WishlistIcon } from '@/components/icons';
import { PreviewProductModal } from '@/components/modals/preview-product-modal';
import { useCart } from '@/hooks/use-cart';
import { useModal } from '@/hooks/use-modal';
import { useWishlist } from '@/hooks/use-whishlist';
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
  id: string;
  title: string;
  price: number;
  img: string;
};

export const ProductSliderItem = ({
  id,
  title,
  price,
  img,
}: ProductSliderItemProps) => {
  const product = { id, title, price, img, discount: 0, orderQuantity: 1 };
  const { setIsOpen: setIsPreviewModalOpen, setChildren } = useModal();

  const { addProduct: addCartProduct, products: cartProducts } = useCart();
  const { addProduct: addWishlistProduct } = useWishlist();

  const isAddedToCart = cartProducts.some((product) => product.id === id);

  const handleAddProduct = (product: CartProduct) => {
    addCartProduct(product);
  };

  const handleWishlistProduct = (product: CartProduct) => {
    addWishlistProduct(product);
  };

  const handleOpenPreviewModal = useCallback(() => {
    setChildren(<PreviewProductModal productId={id} />);
    setIsPreviewModalOpen(true);
  }, [setIsPreviewModalOpen, id]);
  return (
    <>
      <motion.div
        {...animationsProps}
        className="relative flex h-96 w-full min-w-72 max-w-sm flex-col overflow-hidden bg-white px-8 pb-8 text-center"
      >
        <Link className="h-full w-full" href={`/products/${id}`}>
          <div
            className="z-0 h-full w-full scale-125 bg-white bg-contain bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${img})` }}
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
          <h3 className="text-xl transition-all  duration-300 ease-in-out hover:text-[#be844c]">
            <Link href={`/products/${id}`}>{title}</Link>
          </h3>
          <div className="tp-category-price-wrapper-4 ">
            <span className="font-base transition-all duration-300 ease-in-out hover:text-[#be844c]">
              ${price.toFixed(2)}
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
      </motion.div>
    </>
  );
};
