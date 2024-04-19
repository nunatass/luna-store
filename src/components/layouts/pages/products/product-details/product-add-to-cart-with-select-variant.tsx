'use client';

import { Product, Variant } from '@/common/types';
import { CartIcon, CloseTwoIcon } from '@/components/icons';
import Overlay from '@/components/layouts/overlay';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import * as pixel from '@/lib/fpixel';
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';
import TiktokPixel from 'tiktok-pixel';
import { ProductVariantSelect } from './product-variant-select';

type AddToCartWithSelectVariantProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  productItem: Product;
};
const searchBarAnimation = {
  initial: { y: '100%' },
  animate: { y: '0' },
  exit: { y: '100%' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

export const ProductAddToCartWithSelectVariant = ({
  isOpen,
  setIsOpen,
  productItem,
}: AddToCartWithSelectVariantProps) => {
  const [showVariantDisclaimer, setShowVariantDisclaimer] = useState(false);
  const [variant, setVariant] = useState<Variant | undefined>();
  const { addProduct: addCartProduct, setSideCartOpen } = useCart();

  useEffect(() => {
    isOpen
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'auto');
  }, [isOpen]);

  const handleCloseSideCart = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const handleAddProduct = useCallback(() => {
    if (
      (productItem?.variants.length > 0 && variant) ||
      productItem?.variants.length === 0
    ) {
      addCartProduct({
        id: productItem.id,
        discount: productItem.prices[0].discount,
        price: productItem.prices[0].value,
        media: productItem.medias[1].url,
        title: productItem.title,
        orderQuantity: 1,
        variant,
        giftAmount: 0,
      });
      setSideCartOpen(true);
      setIsOpen(false);
      TiktokPixel.track('AddToCart', {
        content_type: 'product',
        quantity: 1,
        content_name: productItem.title,
        content_id: productItem.id,
      });
      pixel.event('add product to cart', {
        productName: productItem.title,
      });
    } else {
      setShowVariantDisclaimer(true);
    }
  }, [
    addCartProduct,
    productItem,
    setShowVariantDisclaimer,
    setSideCartOpen,
    variant,
  ]);

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {isOpen && (
          <motion.section
            className="fixed bottom-0 left-0 z-[9999] h-52 w-full bg-white px-10  py-10 shadow-sm"
            {...searchBarAnimation}
          >
            <div className="flex flex-col justify-between gap-4">
              <div className="flex justify-between">
                <p>Add to cart</p>
                <Button
                  onClick={handleCloseSideCart}
                  aria-label="button close cart"
                  className="flex h-8 w-8  items-center justify-center bg-gray-200 text-black  hover:bg-gray-200"
                >
                  <div className="transition-all duration-300 ease-in-out md:hover:rotate-90">
                    <CloseTwoIcon aria-label="close icon" />
                  </div>
                </Button>
              </div>
              <div className="flex flex-col gap-4">
                {productItem?.variants.length > 0 && (
                  <ProductVariantSelect
                    className="w-full"
                    onSelectChange={(value) => {
                      setVariant(value);
                      setShowVariantDisclaimer(false);
                    }}
                    errorMessage
                    variants={productItem?.variants}
                    showSelectError={showVariantDisclaimer}
                  />
                )}
                <Button
                  onClick={handleAddProduct}
                  size="lg"
                  className="flex w-full gap-2"
                >
                  <CartIcon /> Add To Cart
                </Button>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <Overlay setIsOpen={setIsOpen} isOpen={isOpen} />
    </>
  );
};
