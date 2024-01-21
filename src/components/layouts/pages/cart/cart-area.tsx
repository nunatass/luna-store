'use client';

import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { TrashIcon } from '@/components/icons';
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

const emptyCartAnimationVariants = {
  show: { opacity: 1 },
  hide: { opacity: 0 },
};

export const CartArea = () => {
  const { removeAll, removeProduct, products } = useCart();

  // handle remove all products
  const handleClearProducts = () => {
    removeAll();
  };

  const handleRemoveProduct = (productId: string) => {
    removeProduct(productId);
  };
  return (
    <section className="container min-h-[70vh] items-center justify-center pb-20 pt-8">
      <AnimatePresence>
        {products.length === 0 && (
          <motion.div
            variants={emptyCartAnimationVariants}
            initial="hide"
            animate={products.length > 0 ? 'hide' : 'show'}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="flex h-[50vh] w-full flex-col items-center justify-center gap-6 text-center"
          >
            <h3 className="text-lg font-bold md:text-3xl">
              No Cart Items Found
            </h3>
            <Button asChild>
              <Link href="/shop">Continue Shipping</Link>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
      {products.length > 0 && (
        <div className="flex h-full w-full flex-col items-start gap-8 lg:flex-row">
          <div className="flex w-full flex-col gap-4">
            <div className="hidden sm:block">
              <CartDataTable columns={columns} data={products} />
            </div>
            <div className="sm:hidden">
              {products.length > 0 && (
                <div className="flex w-full flex-col divide-y-[1px]">
                  {products.map((product, index) => (
                    <AnimatePresence key={index} initial>
                      {index === products.length ? (
                        <motion.div
                          {...itemProductAnimationProps}
                          key="empty-div"
                        />
                      ) : (
                        <motion.div
                          {...itemProductAnimationProps}
                          key={product.id}
                          className="flex w-full items-center justify-between gap-2 py-4"
                        >
                          <div className="flex w-full items-center justify-center border-[1px] bg-gray-200">
                            <Link
                              href={`/product-details/${product.id}`}
                              aria-label="product link"
                            >
                              <Image
                                src={product.img}
                                width={100}
                                height={100}
                                alt="product img"
                                className=""
                              />
                            </Link>
                          </div>
                          <div className="w-full">
                            <h5 className="text-md font-semibold transition-all duration-300 ease-in-out hover:text-blue-500">
                              <Link href={`/product-details/${product.id}`}>
                                {product.title}
                              </Link>
                            </h5>
                            <div className="w-full">
                              {product.discount > 0 ? (
                                <span className="">
                                  $
                                  {(
                                    Number(product.price) -
                                    (Number(product.price) *
                                      Number(product.discount)) /
                                      100
                                  ).toFixed(2)}
                                </span>
                              ) : (
                                <span className="text-sm font-semibold text-blue-500">
                                  ${product.price.toFixed(2)}
                                </span>
                              )}
                              <span className="text-sm font-medium text-gray-600">
                                x{product.orderQuantity}
                              </span>
                            </div>
                          </div>
                          <div className="w-full">
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
                        </motion.div>
                      )}
                    </AnimatePresence>
                  ))}
                </div>
              )}
            </div>
            <div className="">
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
