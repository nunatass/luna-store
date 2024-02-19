'use client';

import Image from 'next/image';
import Link from 'next/link';

import logoLight from '@/assets/img/logo/logo-white.svg';
import logoDark from '@/assets/img/logo/logo.svg';
import {
  CartTwoIcon,
  MenuIcon,
  SearchIcon,
  WishlistIcon,
} from '@/components/icons';
import { useCart } from '@/hooks/use-cart';
import { useSticky } from '@/hooks/use-sticky';
import { useWishlist } from '@/hooks/use-whishlist';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { SidePanel } from '../side-panel';
import { Menus } from './components/menu';
import { SearchBar } from './components/search-bar';
import { SideCart } from './components/side-cart';
import { SideMenu } from './components/side-menu';
import { SideWishlist } from './components/side-wishlist';

const quantityAnimationVariants = {
  hide: { opacity: 0, scale: 0 },
  show: { opacity: 1, scale: 1 },
};

type HeaderProps = {
  secondary?: boolean;
};

export const Header = ({ secondary }: HeaderProps) => {
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isSideCartOpen, setIsSideCartOpen] = useState(false);
  const [isSideWishlistOpen, setIsSideWishlistOpen] = useState(false);
  const { getTotal } = useCart();
  const { products } = useWishlist();
  const { sticky } = useSticky();
  const { quantity } = getTotal();

  return (
    <>
      <div
        className={cn(
          'inline-flex w-full  flex-nowrap justify-end overflow-hidden bg-black py-2 text-sm text-white [mask-image:_linear-gradient(to_right,transparent_100,_black_128px,_black_calc(100%-200px),transparent_100%)]',
          pathname === '/' && 'bg-white text-black'
        )}
      >
        <ul
          className="flex w-full animate-infinite-scroll items-center justify-between [&_li]:mx-8 "
          aria-hidden="true"
        >
          <li />
          <li className="shink-0 whitespace-nowrap">
            Free stander delivery on purchases of +$99
          </li>
        </ul>
      </div>

      <div className="relative z-20">
        <header className="absolute left-0 right-0 top-0">
          <div
            className={cn(
              'flex w-full items-center justify-between gap-20 border-b-[1px] border-[#b7a687] bg-transparent px-4 py-4 sm:px-6 md:px-10 lg:px-24',
              sticky &&
                'fixed -top-24 left-0 z-30 translate-y-24 border-0 bg-white shadow-md transition-all duration-700 ease-in-out',
              secondary && 'border-0 bg-white shadow-md'
            )}
          >
            <div>
              <Link href="/">
                <Image
                  className={cn('block', (sticky || secondary) && 'hidden')}
                  src={logoLight}
                  alt="logo"
                  loading="eager"
                />
                <Image
                  className={cn('hidden', (sticky || secondary) && 'block')}
                  src={logoDark}
                  alt="logo"
                  loading="eager"
                />
              </Link>
            </div>
            <div className="flex items-center lg:w-full">
              <div
                className={cn(
                  'hidden w-full text-white/80 lg:block',
                  (sticky || secondary) && 'text-black'
                )}
              >
                <Menus secondary={secondary} />
              </div>
              <div
                className={cn(
                  'flex h-full items-center justify-end gap-5 text-white',
                  (sticky || secondary) && 'text-black'
                )}
              >
                <div className="">
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    type="button"
                    aria-label="search button"
                  >
                    <SearchIcon />
                  </button>
                </div>
                <div className="relative">
                  <button
                    aria-label="wishlist"
                    onClick={() => setIsSideWishlistOpen(true)}
                  >
                    <WishlistIcon aria-label="wishlist icon" />
                    <motion.div
                      variants={quantityAnimationVariants}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      animate={products.length ? 'show' : 'hide'}
                      initial="hide"
                      className={cn(
                        'absolute -right-1/2 -top-1/2  flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-black',
                        (sticky || secondary) && 'bg-[#bd844c] text-white'
                      )}
                    >
                      {products.length}
                    </motion.div>
                  </button>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setIsSideCartOpen(true)}
                    type="button"
                    aria-label="cart button"
                  >
                    <CartTwoIcon aria-label="cart icon" />
                    <motion.div
                      variants={quantityAnimationVariants}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      initial="hide"
                      animate={quantity ? 'show' : 'hide'}
                      className={cn(
                        'absolute -right-1/2 -top-1/2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-black',
                        (sticky || secondary) && 'bg-[#bd844c] text-white'
                      )}
                    >
                      {quantity}
                    </motion.div>
                  </button>
                </div>
                <div className="block lg:hidden">
                  <button
                    onClick={() => setIsSideMenuOpen(true)}
                    type="button"
                    aria-label="menu button"
                  >
                    <MenuIcon aria-label="menu icon" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        <SearchBar
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
        />

        <SidePanel isOpen={isSideCartOpen} setIsOpen={setIsSideCartOpen}>
          <SideCart isOpen={isSideCartOpen} setIsOpen={setIsSideCartOpen} />
        </SidePanel>

        <SidePanel isOpen={isSideMenuOpen} setIsOpen={setIsSideMenuOpen}>
          <SideMenu isOpen={isSideMenuOpen} setIsOpen={setIsSideMenuOpen} />
        </SidePanel>

        <SidePanel
          isOpen={isSideWishlistOpen}
          setIsOpen={setIsSideWishlistOpen}
        >
          <SideWishlist
            isOpen={isSideWishlistOpen}
            setIsOpen={setIsSideWishlistOpen}
          />
        </SidePanel>
      </div>
    </>
  );
};
