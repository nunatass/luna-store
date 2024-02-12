'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { CartProduct } from '@/common/types';
import { TrashIcon } from '@/components/icons';
import { formatPrice } from '@/lib/utils';
import { CartCheckout } from './components/cart-checkout';
import { CartProductQuantityCell } from './components/cart-table/cart-product-quantity-cell';
import { columns } from './components/cart-table/columns';
import { CartDataTable } from './components/cart-table/data-table';

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

const imageUrlPrefix = process.env.NEXT_PUBLIC_CLOUDFLARE_FILE_URL_START;

export const CartArea = () => {
  const { removeAll, removeProduct, products } = useCart();

  // handle remove all products
  const handleClearProducts = () => {
    removeAll();
  };

  const handleRemoveProduct = (productId: string) => {
    removeProduct(productId);
  };

  const renderEmptyDiv = () => (
    <motion.div {...itemProductAnimationProps} key="empty-div" />
  );

  const renderProductItem = (product: CartProduct) => (
    <motion.div
      {...itemProductAnimationProps}
      key={product.id}
      className="flex w-full justify-between gap-2 py-4"
    >
      <div className="flex items-center justify-center border-[1px]">
        <Link href={`/product/${product.id}`} aria-label="product link">
          <Image
            src={`${imageUrlPrefix}/${product.media}`}
            width={100}
            height={100}
            alt="product img"
            className=""
          />
        </Link>
      </div>

      <div className="flex w-full flex-col">
        <h5 className="w-full text-sm font-semibold transition-all duration-300 ease-in-out hover:text-blue-500">
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </h5>
        <div className="w-full">
          {product.discount > 0 ? (
            <span>
              ${formatPrice((product.price * (100 - product.discount)) / 100)}
            </span>
          ) : (
            <span className="text-sm font-semibold text-blue-500">
              ${formatPrice(product.price)}
            </span>
          )}
          <span className="text-sm font-medium text-gray-600">
            x{product.orderQuantity}
          </span>
        </div>
        <div className="mt-2 flex w-full justify-between">
          <div className="flex w-full items-center justify-center">
            <CartProductQuantityCell id={product.id} />
          </div>
          <Button
            onClick={() => handleRemoveProduct(product.id)}
            variant="link"
            size="icon"
            className="mx-4 py-0 text-gray-600 hover:text-red-400"
          >
            <TrashIcon />
          </Button>
        </div>
      </div>
    </motion.div>
  );

  const renderProductItems = () => (
    <div className="flex w-full flex-col divide-y-[1px]">
      {products.map((product, index) => (
        <AnimatePresence key={index} initial>
          {index === products.length
            ? renderEmptyDiv()
            : renderProductItem(product)}
        </AnimatePresence>
      ))}
    </div>
  );

  return (
    <section className="container min-h-[70vh] items-center justify-center pb-20 pt-8">
      {products.length === 0 && (
        <div className="flex h-[50vh] w-full flex-col items-center justify-center gap-6 text-center">
          <h3 className="text-lg font-bold md:text-3xl">No Cart Items Found</h3>
          <Button asChild>
            <Link href="/shop">Continue Shipping</Link>
          </Button>
        </div>
      )}

      {products.length > 0 && (
        <div className="flex h-full w-full flex-col items-start gap-8 lg:flex-row">
          <div className="flex w-full flex-col gap-4">
            <div className="hidden sm:block">
              <CartDataTable columns={columns} data={products} />
            </div>
            <div className="sm:hidden">{renderProductItems()}</div>
            <div>
              <div className="col-xl-6 col-md-8">
                {/* <div className="tp-cart-coupon">
                        <form action="#">
                          <div className="tp-cart-coupon-input-box">
                            <label>Coupon Code:</label>
                            <div className="tp-cart-coupon-input d-flex align-items-center">
                              <input type="text" placeholder="Enter Coupon Code" />
                              <button type="submit">Apply</button>
                            </div>
                          </div>
                        </form>
                      </div> */}
              </div>
              <div className="flex w-full justify-end">
                <Button
                  variant="outline"
                  onClick={handleClearProducts}
                  type="button"
                  className="tp-cart-update-btn"
                >
                  Clear Cart
                </Button>
              </div>
            </div>
          </div>

          <CartCheckout />
        </div>
      )}
    </section>
  );
};
