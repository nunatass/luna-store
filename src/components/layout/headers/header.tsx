'use client';

import Image from 'next/image';
import Link from 'next/link';

//import { useDispatch, useSelector } from 'react-redux';
// internal
import logo_white from '@/assets/img/logo/logo-white.svg';
import logo_dark from '@/assets/img/logo/logo.svg';
import { CartTwo, Menu, Search, Wishlist } from '@/components/icons';
import { useSticky } from '@/hooks/use-sticky';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { SidePanel } from '../side-panel';
import { Menus } from './components/menu';
import { SearchBar } from './components/search-bar';
import { SideCart } from './components/side-cart';
import { SideMenu } from './components/side-menu';

// import SearchBar from './header-com/search-bar';
// import OffCanvas from '@/components/common/off-canvas';
// import CartMiniSidebar from '@/components/common/cart-mini-sidebar';
// import useCartInfo from '@/hooks/use-cart-info';
// import { openCartMini } from '@/redux/features/cartSlice';

export const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isSideCartOpen, setIsSideCartOpen] = useState(false);
  // const { wishlist } = useSelector((state) => state.wishlist);
  // const { quantity } = useCartInfo();
  const { sticky } = useSticky();
  //const dispatch = useDispatch();

  return (
    <div className="relative">
      <header>
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: sticky ? 96 : 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className={cn(
            'bg-[#AB9774] w-full flex items-center py-4 px-4 sm:px-6 md:px-10 lg:px-20 justify-between gap-20 border-b-[1px] border-[#b7a687]',
            sticky &&
              'fixed left-0 -top-24 z-20 bg-white shadow-md border-0 opacity-0'
          )}
        >
          <div className="">
            <Link href="/">
              <Image
                className={cn('block', sticky && 'hidden')}
                src={logo_white}
                alt="logo"
              />
              <Image
                className={cn('hidden', sticky && 'block')}
                src={logo_dark}
                alt="logo"
              />
            </Link>
          </div>
          <div className="flex items-center lg:w-full">
            <div
              className={cn(
                'hidden lg:block text-white/80 w-full',
                sticky && 'text-black'
              )}
            >
              <Menus />
            </div>
            <div
              className={cn(
                'flex gap-4 justify-end items-center text-white',
                sticky && 'text-black'
              )}
            >
              <div className="">
                <button onClick={() => setIsSearchOpen(true)} type="button">
                  <Search />
                </button>
              </div>
              <div className="">
                <Link href="/wishlist" className="">
                  <Wishlist />
                  <span className="">{/* {wishlist.length} */}</span>
                </Link>
              </div>
              <div className="">
                <button
                  onClick={() => setIsSideCartOpen(true)}
                  type="button"
                  className=""
                >
                  <CartTwo />
                  <span className="">{/* {quantity} */}</span>
                </button>
              </div>
              <div className="lg:hidden block">
                <button
                  onClick={() => setIsSideMenuOpen(true)}
                  type="button"
                  className=""
                >
                  <Menu />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </header>

      <SearchBar
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={setIsSearchOpen}
      />

      <SidePanel isOpen={isSideCartOpen} setIsOpen={setIsSideCartOpen}>
        <SideCart />
      </SidePanel>

      <SidePanel isOpen={isSideMenuOpen} setIsOpen={setIsSideMenuOpen}>
        <SideMenu isOpen={isSideMenuOpen} setIsOpen={setIsSideMenuOpen} />
      </SidePanel>
    </div>
  );
};
