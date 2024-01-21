'use client';
import type { Product } from '@/common/types';
import { CartIcon, QuickViewIcon, WishlistIcon } from '@/components/icons';
import { useCart } from '@/hooks/use-cart';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

const cartAnimationVariants = {
  initial: { y: 10, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: 10, opacity: 0 },
};

const optionsAnimationVariants = {
  initial: { x: 10, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: 10, opacity: 0 },
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
  whileTap: 'animate',
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
  const { addProduct, products } = useCart();
  // const { wishlist } = useSelector((state) => state.wishlist);
  const isAddedToCart = products.some((product) => product.id === id);
  //const isAddedToWishlist = wishlist.some((prd) => prd.id === id);

  // handle add product
  const handleAddProduct = (product: Product) => {
    addProduct(product);
  };

  // TODO: handle add wishlist
  // handle wishlist product
  // const handleWishlistProduct = (prd) => {
  //   dispatch(add_to_wishlist(prd));
  // };
  return (
    <motion.div
      {...animationsProps}
      className="relative flex h-max w-40 max-w-80 flex-col bg-[#f6f6f6] text-center sm:w-full"
    >
      <Link href={`/product-details/${id}`}>
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
        className="absolute right-4 top-4 z-10 hidden flex-col gap-2 sm:flex"
      >
        <AnimatePresence>
          {isAddedToCart ? (
            <motion.div {...animationsProps}>
              <Link
                href="/cart"
                className="flex flex-row-reverse items-center gap-2"
              >
                <motion.div
                  {...optionHoverAnimation}
                  className="text-gray-4 p-2 ring-1 ring-gray-300"
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
              className="flex flex-row-reverse items-center gap-2"
            >
              <motion.div
                {...optionHoverAnimation}
                className="text-gray-4 p-2 ring-1 ring-gray-300"
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
          className="flex flex-row-reverse items-center gap-2"

          //TODO onClick={() => dispatch(handleProductModal(product))}
        >
          <motion.div
            {...optionHoverAnimation}
            className="text-gray-4 p-2 ring-1 ring-gray-300"
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
          //TODO onClick={() => handleWishlistProduct(product)}
          className="flex flex-row-reverse items-center gap-2"
        >
          <motion.div
            {...optionHoverAnimation}
            className="text-gray-4 p-2 ring-1 ring-gray-300"
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
        <h3 className="text-xs transition-all duration-300 ease-in-out sm:text-xl">
          <Link href={`/product-details/${id}`}>{title}</Link>
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
            className="absolute bottom-4 left-0 flex w-full items-center justify-start bg-white py-1"
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
  );
};
