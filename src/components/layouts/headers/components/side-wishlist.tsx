'use client';
// import RenderCartProgress from './render-cart-progress';
import emptyCartImg from '@/assets/img/product/side-cart/empty-cart.png';
import { CartProduct } from '@/common/types';
import { CloseTwoIcon, TrashIcon } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/hooks/use-whishlist';
import { cn, formatPrice, formatPriceWithDiscount } from '@/lib/utils';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback } from 'react';

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

export const SideWishlist = ({ setIsOpen }: SideMenuProps) => {
  const { products, removeProduct, removeAll } = useWishlist();

  // handle remove product
  const handleRemoveProduct = (productId: string) => {
    removeProduct(productId);
  };

  const handleClearProduct = () => {
    removeAll();
  };

  // handle close cart sidebar
  const handleCloseSideCart = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const renderProductItem = (product: CartProduct) => (
    <motion.div
      {...itemProductAnimationProps}
      key={product.id}
      className="flex w-full items-start gap-2 py-4"
    >
      <div className="border-[1px] border-gray-200">
        <Link href={`/products/${product.id}`} aria-label="product link">
          <Image
            src={`${imageUrlPrefix}/${product.media}`}
            width={70}
            height={60}
            alt="product img"
            className="h-20 w-24"
            priority
          />
        </Link>
      </div>
      <div className="w-full">
        <h5 className="font-semibold transition-all duration-300 ease-in-out hover:text-[#be844c]">
          <Link className="text-sm" href={`/products/${product.id}`}>
            {product.title}
          </Link>
        </h5>
        <div className="w-full">
          {product.discount > 0 ? (
            <span>
              ${formatPriceWithDiscount(product.price, product.discount).price}
            </span>
          ) : (
            <span className="text-sm font-semibold hover:text-[#be844c]">
              ${formatPrice(product.price)}
            </span>
          )}
          <span className="text-sm font-medium text-gray-600">
            x{product.orderQuantity}
          </span>
        </div>
      </div>
      <Button
        onClick={() => handleRemoveProduct(product.id)}
        variant="link"
        size="icon"
        className="py-0 text-gray-600 hover:text-red-400"
      >
        <TrashIcon />
      </Button>
    </motion.div>
  );

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-between p-8">
      <div className="scrollbar-hide h-full w-full overflow-x-hidden overflow-y-scroll">
        <div className="absolute left-0 right-0 top-0 flex w-full items-center justify-between border-b-[0.5px] bg-white p-8 pb-4">
          <h4 className="text-base font-semibold">Your Wishlist</h4>
          <button
            onClick={handleCloseSideCart}
            type="button"
            aria-label="button close cart"
            className="z-50 flex h-8 w-8 items-center justify-center bg-gray-200"
          >
            <div className="transition-all duration-300 ease-in-out hover:rotate-90">
              <CloseTwoIcon aria-label="close icon" />
            </div>
          </button>
        </div>
        <div
          className={cn(
            'flex h-full w-full items-center  justify-center',
            products.length > 0 && 'items-start  justify-start'
          )}
        >
          {products.length > 0 && (
            <div className="flex w-full flex-col divide-y-[1px] pb-72 pt-16 sm:pb-56">
              {products.map((product, index) => (
                <div key={product.id}>
                  {index === products.length
                    ? renderEmptyDiv()
                    : renderProductItem(product)}
                </div>
              ))}
            </div>
          )}

          {/* if no item in cart */}
          <AnimatePresence>
            {products.length === 0 && (
              <motion.div
                variants={emptyCartAnimationVariants}
                initial="hide"
                animate={products.length > 0 ? 'hide' : 'show'}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
                className="-mt-56 flex h-full w-full flex-col items-center justify-center gap-2"
              >
                <Image src={emptyCartImg} alt="empty-cart-img" />
                <p className="text-base font-normal">Your wishlist is empty</p>
                <Button
                  asChild
                  aria-label="button go to shop"
                  variant="outline"
                  size="lg"
                  className="hover:border-black hover:bg-black hover:text-white"
                >
                  <Link href="/products" aria-label="go to shop">
                    Go to products
                  </Link>
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex h-72 w-full flex-col gap-4 border-t-[0.5px] bg-white p-8 pt-4 sm:h-auto">
        <div className="flex w-full flex-col gap-2">
          <Button className="w-full" size="lg" onClick={handleClearProduct}>
            Clear Wishlist
          </Button>
        </div>
      </div>
    </div>
  );
};
