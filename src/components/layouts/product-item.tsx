'use client';
import type { CartProduct } from '@/common/types';
import { CartIcon, QuickViewIcon, WishlistIcon } from '@/components/icons';
import { useCart } from '@/hooks/use-cart';
import { useModal } from '@/hooks/use-modal';
import { useWishlist } from '@/hooks/use-whishlist';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback } from 'react';
import { PreviewProductModal } from '../modals/preview-product-modal';

const cartAnimationVariants = {
  initial: { y: 10, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 10, opacity: 0 },
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
  // whileTap: 'animate',
  exit: 'exit',
};

type ProductSliderItemProps = {
  id: string;
  title: string;
  price: number;
  img: string;
  status: string;
  tags: string[];
};

export const ProductItem = ({
  id,
  title,
  price,
  img,
  tags,
  status,
}: ProductSliderItemProps) => {
  const product = { id, title, price, img, discount: 0, orderQuantity: 1 };
  const { addProduct: addCartProduct, products: cartProducts } = useCart();
  const { addProduct: addWishlistProduct } = useWishlist();
  const { setIsOpen: setIsPreviewModalOpen, setChildren } = useModal();

  const isAddedToCart = cartProducts.some((product) => product.id === id);
  // const isAddedToWishlist = wishListProducts.some((product) => product.id === id);

  const handleAddProduct = (product: CartProduct) => {
    addCartProduct(product);
  };

  const handleAddWishlistProduct = (product: CartProduct) => {
    addWishlistProduct(product);
  };

  const handleOpenPreviewModal = useCallback(() => {
    setChildren(<PreviewProductModal productId={id} />);
    setIsPreviewModalOpen(true);
  }, [setIsPreviewModalOpen, id]);
  return (
    <div className="relative">
      <motion.div
        {...animationsProps}
        className="relative flex h-max w-40 max-w-80 flex-col bg-[#f6f6f6] text-center sm:w-full"
      >
        <Link href={`/products/${id}`}>
          <Image
            src={img}
            alt="product img"
            className="transition-all duration-300 ease-out hover:scale-110"
            width={284}
            height={352}
          />
        </Link>

        <div className="tp-product-badge">
          {status === 'out-of-stock' && <span className="">out-stock</span>}
        </div>
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
                    className="text-gray-4 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm"
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
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm md:flex md:h-11 md:w-11"
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
            onClick={handleOpenPreviewModal}
            className="hidden items-center gap-2 text-white md:flex"
          >
            <motion.div
              {...optionHoverAnimation}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-black shadow-sm md:flex md:h-11 md:w-11"
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
            onClick={() => handleAddWishlistProduct(product)}
            className="flex items-center gap-2"
          >
            <motion.div
              {...optionHoverAnimation}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm md:flex md:h-11 md:w-11"
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

        <div className="z-10 flex flex-col gap-1 bg-white py-4 text-left font-medium">
          <h3 className="text-md transition-all duration-300 ease-in-out ">
            <Link href={`/products/${id}`}>{title}</Link>
          </h3>

          <div className="text-sm font-normal">
            <p>{tags[0]}</p>
          </div>

          <div className="tp-category-price-wrapper-4 ">
            <span className="sm:font-base text-sm transition-all duration-300 ease-in-out">
              ${price.toFixed(2)}
            </span>
            <motion.div
              variants={cartAnimationVariants}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="absolute bottom-4 right-4 flex w-full items-center justify-end"
            >
              {isAddedToCart ? (
                <Link
                  href="/cart"
                  className="flex items-center gap-2 text-[#be844c]"
                >
                  <CartIcon /> View Cart
                </Link>
              ) : (
                <button
                  onClick={() => handleAddProduct(product)}
                  className="flex items-center gap-2 text-[#be844c]"
                >
                  <CartIcon /> Add to Cart
                </button>
              )}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
