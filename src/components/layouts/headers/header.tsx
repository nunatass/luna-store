'use client';

import Image from 'next/image';
import Link from 'next/link';

import logoDark from '@/assets/img/logo/logo-dark.svg';
import logoLight from '@/assets/img/logo/logo.webp';
import { CartTwoIcon, MenuIcon, SearchIcon } from '@/components/icons';
import { useCart } from '@/hooks/use-cart';
import { useSticky } from '@/hooks/use-sticky';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { SidePanel } from '../side-panel';
import { Menus } from './components/menu';
import { SearchBar } from './components/search-bar';
import { SideCart } from './components/side-cart';
import { SideMenu } from './components/side-menu';
import { DiscountBanner } from './discount-banner';

const quantityAnimationVariants = {
  hide: { opacity: 0, scale: 0 },
  show: { opacity: 1, scale: 1 },
};

type HeaderProps = {
  secondary?: boolean;
};

export const Header = ({ secondary }: HeaderProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const { isSideCartOpen, setSideCartOpen } = useCart();
  const { getTotal } = useCart();
  const { sticky } = useSticky();
  const { quantity } = getTotal();

  return (
    <>
      <div className="relative z-[999]">
        <div className="fixed top-0 z-[999]">
          <DiscountBanner />
        </div>
        <header className="absolute left-0 right-0 top-10">
          <div
            className={cn(
              'flex w-full items-center justify-between gap-10 border-b-[1px] border-white/20 bg-transparent px-4 py-4 sm:gap-20 sm:px-6 md:px-10 lg:px-24',
              sticky &&
                'fixed -top-[60px] left-0 z-30 translate-y-24 border-0 bg-white shadow-md transition-all duration-700 ease-in-out',
              secondary && 'border-0 bg-white shadow-md'
            )}
          >
            <h1 className="sh w-36 md:w-44" aria-label="Stella Stone Store">
              <Link href="/" aria-label="home">
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
            </h1>
            <div className="flex items-center lg:w-full">
              <div
                className={cn(
                  'hidden w-full text-white lg:block',
                  (sticky || secondary) && 'text-black'
                )}
              >
                <Menus secondary={secondary} />
              </div>
              <div
                className={cn(
                  'flex h-full items-center justify-end  text-white lg:gap-5',
                  (sticky || secondary) && 'text-black'
                )}
              >
                <div className="">
                  <button
                    onClick={() => setIsSearchOpen(true)}
                    type="button"
                    aria-label="search button"
                    className="h-12 w-12 bg-transparent md:h-8 md:w-8"
                  >
                    <SearchIcon />
                  </button>
                </div>
                <div className="relative">
                  <button
                    onClick={() => setSideCartOpen(true)}
                    type="button"
                    className="h-12 w-12 bg-transparent lg:h-8 lg:w-8"
                    aria-label="cart button"
                  >
                    <CartTwoIcon aria-label="cart icon" />
                    <motion.div
                      variants={quantityAnimationVariants}
                      transition={{ duration: 0.4, ease: 'easeInOut' }}
                      initial="hide"
                      animate={quantity ? 'show' : 'hide'}
                      className={cn(
                        'absolute right-[20px] top-0 flex h-6  w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-black lg:-right-[5px] lg:top-[-5px]',
                        (sticky || secondary) && 'bg-[#bd844c] text-white'
                      )}
                    >
                      {quantity}
                    </motion.div>
                  </button>
                </div>
                <div className="block lg:hidden">
                  <button
                    className="h-12 w-12 bg-transparent"
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

        <SidePanel isOpen={isSideCartOpen} setIsOpen={setSideCartOpen}>
          <SideCart isOpen={isSideCartOpen} setIsOpen={setSideCartOpen} />
        </SidePanel>

        <SidePanel isOpen={isSideMenuOpen} setIsOpen={setIsSideMenuOpen}>
          <SideMenu isOpen={isSideMenuOpen} setIsOpen={setIsSideMenuOpen} />
        </SidePanel>
      </div>
    </>
  );
};
