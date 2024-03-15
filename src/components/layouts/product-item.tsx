'use client';
import type { Product } from '@/common/types';
import { CartIcon } from '@/components/icons';
import { useCart } from '@/hooks/use-cart';
import { formatPrice, formatPriceWithDiscount } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

// const cartAnimationVariants = {
//   initial: { y: 10, opacity: 0 },
//   animate: { y: 0, opacity: 1 },
//   exit: { y: 10, opacity: 0 },
// };

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

export const ProductItem = ({ product }: ProductSliderItemProps) => {
  const { addProduct: addCartProduct, products: cartProducts } = useCart();
  // const { addProduct: addWishlistProduct, products: wishListProducts } =
  //   useWishlist();
  // const { setIsOpen: setIsPreviewModalOpen, setChildren } = useModal();

  const isAddedToCart = cartProducts.some(
    (cartProduct) => cartProduct.id === product.id
  );
  // const isAddedToWishlist = wishListProducts.some(
  //   (wishListProduct) => wishListProduct.id === product.id
  // );

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

  // const handleAddWishlistProduct = (product: Product) => {
  //   addWishlistProduct({
  //     id: product.id,
  //     media: product.medias[0].url,
  //     price: product.prices[0].value,
  //     title: product.title,
  //     orderQuantity: 1,
  //     discount: product.prices[0].discount,
  //   });
  // };

  // const handleOpenPreviewModal = useCallback(() => {
  //   setChildren(<PreviewProductModal productId={product.id} />);
  //   setIsPreviewModalOpen(true);
  // }, [setIsPreviewModalOpen, product.id, setChildren]);
  return (
    <Link
      className="relative"
      href={`/products/${product.id}`}
      aria-label="product item"
    >
      <motion.div
        {...animationsProps}
        className="relative flex h-60 w-40 flex-col overflow-hidden bg-[#f6f6f6] text-center transition-all duration-300 ease-in-out sm:h-[400px] sm:w-64 md:h-96 md:w-80 lg:h-[400px]"
      >
        <div className="group relative h-[70%] sm:h-[80%]">
          <Image
            src={`${imageUrlPrefix}/${product.medias[0].url}`}
            alt="product img"
            className="w-full object-cover transition-all duration-300 ease-in-out hover:scale-110 group-hover:opacity-0"
            fill
            // width={284}
            // height={352}
            priority
          />
          <Image
            src={`${imageUrlPrefix}/${product.medias[1].url}`}
            alt="product img"
            className="absolute left-0  top-0 w-full scale-95  object-cover opacity-0 transition-all duration-300 ease-in-out group-hover:scale-110 group-hover:opacity-100"
            // width={284}
            // height={352}
            fill
            priority
          />
        </div>
        <motion.div
          variants={optionsAnimationVariants}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          className="absolute left-4 top-4 z-10 hidden flex-col gap-2 sm:flex"
        >
          <AnimatePresence>
            {isAddedToCart ? (
              <motion.div {...animationsProps}>
                <div
                  onClick={() => redirect('/cart')}
                  aria-label="cart"
                  className="flex items-center gap-2"
                >
                  <motion.div
                    {...optionHoverAnimation}
                    className="text-gray-4 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm"
                  >
                    <CartIcon />
                  </motion.div>
                  <motion.span
                    variants={tooltipAnimationVariants}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className=" rounded-xl bg-black px-2 py-0.5 text-xs font-medium text-white "
                  >
                    View Cart
                  </motion.span>
                </div>
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
                  className="rounded-xl bg-black px-2 py-0.5 text-xs font-medium text-white"
                >
                  Add to Cart
                </motion.div>
              </motion.button>
            )}
          </AnimatePresence>
          {/* <motion.button
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
          </motion.button> */}
          {/* <motion.button
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
              {isAddedToWishlist ? 'Added to Wishlist' : 'Add To Wishlist'}
            </motion.div>
          </motion.button> */}
        </motion.div>

        <div className="z-10 flex h-[30%] flex-col gap-1 bg-white px-2 py-4 font-medium sm:h-[20%]">
          <h3 className="text-left transition-all duration-300 ease-in-out sm:mb-2">
            <span
              className="text-xs sm:text-sm"
              aria-label={product.title}
              // href={`/products/${product.id}`}
            >
              {product.title}
            </span>
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

              {product.prices[0].discount > 0 && (
                <span className="sm:font-base w-full text-right text-sm text-xs text-gray-600  line-through transition-all duration-300 ease-in-out sm:mb-2">
                  ${formatPrice(product.prices[0].value)}
                </span>
              )}
            </div>
            {/* <motion.div
              variants={cartAnimationVariants}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="absolute bottom-4 left-0 flex w-full items-center justify-end  px-2 py-1  text-xs sm:text-base"
            >
              {isAddedToCart ? (
                <Link
                  href="/cart"
                  className="flex items-center gap-2 bg-white text-sm"
                >
                  <CartIcon /> View Cart
                </Link>
              ) : (
                <button
                  onClick={() => handleAddProduct(product)}
                  className="flex items-center gap-2 bg-white text-sm"
                >
                  <CartIcon /> Add to Cart
                </button>
              )}
            </motion.div> */}
          </div>
        </div>
        {product.prices[0].discount > 0 && (
          <span className="absolute right-2 top-2 bg-black p-1 text-xs text-white">
            {product.prices[0].discount}% OFF
          </span>
        )}
      </motion.div>
    </Link>
  );
};
