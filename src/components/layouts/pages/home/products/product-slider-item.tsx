//import { useDispatch, useSelector } from "react-redux";
// internal
//import { handleProductModal } from "@/redux/features/productModalSlice";
//import { add_cart_product } from "@/redux/features/cartSlice";
//import { add_to_wishlist } from "@/redux/features/wishlist-slice";
//import { notifyError } from "@/utils/toast";

import { AddCart, Cart, QuickView, Wishlist } from '@/components/icons';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

const cartAnimationVariants = {
  initial: { y: 10, opacity: 0, color: 'black' },
  animate: { y: 0, opacity: 1, color: '#be844c' },
  exit: { y: 10, opacity: 0, color: 'black' },
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
  _id: string;
  title: string;
  price: number;
  img: string;
  // status: string;
};

export const ProductSliderItem = ({
  _id,
  title,
  price,
  img,
  // status,
}: ProductSliderItemProps) => {
  // const { cart_products } = useSelector((state) => state.cart);
  // const { wishlist } = useSelector((state) => state.wishlist);
  const isAddedToCart = true; //cart_products.some((prd) => prd._id === _id);
  //const isAddedToWishlist = wishlist.some((prd) => prd._id === _id);
  // const dispatch = useDispatch();

  // handle add product
  // const handleAddProduct = (prd) => {
  //   if (prd.status === 'out-of-stock') {
  //     notifyError(`This product out-of-stock`);
  //   } else {
  //     dispatch(add_cart_product(prd));
  //   }
  // };
  // handle wishlist product
  // const handleWishlistProduct = (prd) => {
  //   dispatch(add_to_wishlist(prd));
  // };
  return (
    <motion.div
      {...animationsProps}
      className="w-full h-96 text-center bg-white min-w-72 max-w-sm flex flex-col pb-8 relative overflow-hidden px-8"
    >
      <Link className="w-full h-full" href={`/product-details/${_id}`}>
        <div
          className="w-full h-full bg-no-repeat bg-contain bg-white scale-125 z-0 bg-center"
          style={{ backgroundImage: `url(${img})` }}
        />
      </Link>
      <motion.div
        variants={optionsAnimationVariants}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="flex flex-col z-10 absolute right-4 top-4 gap-2"
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
                  className="ring-1 ring-gray-300 p-2 text-gray-4"
                >
                  <Cart />
                </motion.div>
                <motion.span
                  variants={tooltipAnimationVariants}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className=" bg-black text-white py-0.5 px-2 rounded-xl text-xs font-medium"
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
              //onClick={() => handleAddProduct(product)}
              className="flex flex-row-reverse items-center gap-2"
            >
              <motion.div
                {...optionHoverAnimation}
                className="ring-1 ring-gray-300 p-2 text-gray-4"
              >
                <Cart />
              </motion.div>
              <motion.div
                variants={tooltipAnimationVariants}
                className=" bg-black text-white py-0.5 px-2 rounded-xl text-xs font-medium"
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

          // onClick={() => dispatch(handleProductModal(product))}
        >
          <motion.div
            {...optionHoverAnimation}
            className="ring-1 ring-gray-300 p-2 text-gray-4"
          >
            <QuickView />
          </motion.div>
          <motion.div
            variants={tooltipAnimationVariants}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className=" bg-black text-white py-0.5 px-2 rounded-xl text-xs font-medium"
          >
            Quick View
          </motion.div>
        </motion.button>
        <motion.button
          type="button"
          {...animationsProps}
          // onClick={() => handleWishlistProduct(product)}
          className="flex flex-row-reverse items-center gap-2"
        >
          <motion.div
            {...optionHoverAnimation}
            className="ring-1 ring-gray-300 p-2 text-gray-4"
          >
            <Wishlist />
          </motion.div>

          <motion.div
            variants={tooltipAnimationVariants}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className=" bg-black text-white py-0.5 px-2 rounded-xl text-xs font-medium"
          >
            Add To Wishlist
          </motion.div>
        </motion.button>
      </motion.div>

      <div className="font-medium flex flex-col gap-1 z-10">
        <h3 className="text-xl hover:text-[#be844c]  transition-all duration-300 ease-in-out">
          <Link href={`/product-details/${_id}`}>{title}</Link>
        </h3>
        <div className="tp-category-price-wrapper-4 ">
          <span className="font-base hover:text-[#be844c] transition-all duration-300 ease-in-out">
            ${price.toFixed(2)}
          </span>
          <motion.div
            variants={cartAnimationVariants}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="absolute bottom-6 left-0 py-1 bg-white w-full flex items-center justify-center"
          >
            {isAddedToCart ? (
              <Link href="/cart" className="flex gap-2 items-center">
                <AddCart /> View Cart
              </Link>
            ) : (
              <button
                // onClick={() => handleAddProduct(product)}
                className="flex gap-2 items-center"
              >
                <AddCart /> Add to Cart
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};
