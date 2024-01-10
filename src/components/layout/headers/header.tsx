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
import { SideMenu } from '../side-menu';
import { Menus } from './components/menu';

// import SearchBar from './header-com/search-bar';
// import OffCanvas from '@/components/common/off-canvas';
// import CartMiniSidebar from '@/components/common/cart-mini-sidebar';
// import useCartInfo from '@/hooks/use-cart-info';
// import { openCartMini } from '@/redux/features/cartSlice';

export const Header = () => {
  // const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [sideMenuOpen, setSideMenuOpen] = useState(false);
  // const { wishlist } = useSelector((state) => state.wishlist);
  // const { quantity } = useCartInfo();
  const { sticky } = useSticky();
  // const dispatch = useDispatch();

  return (
    <>
      <header>
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: sticky ? 96 : 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          className={cn(
            'bg-[#AB9774] w-full flex items-center py-4 lg:px-20 px-14 justify-between gap-20 border-b-[1px] border-[#b7a687]',
            sticky &&
              'fixed left-0 -top-24 z-[99] bg-white shadow-md border-0 opacity-0'
          )}
        >
          <div className="logo">
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
                <button
                  // onClick={() => setIsSearchOpen(true)}
                  type="button"
                  className=""
                >
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
                  // onClick={() => dispatch(openCartMini())}
                  type="button"
                  className=""
                >
                  <CartTwo />
                  <span className="">{/* {quantity} */}</span>
                </button>
              </div>
              <div className="lg:hidden block">
                <button
                  onClick={() => setSideMenuOpen(true)}
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

      {/* search bar start */}
      {/* <SearchBar isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} /> */}
      {/* search bar end */}

      {/* cart mini sidebar start */}
      {/* <CartMiniSidebar /> */}
      {/* cart mini sidebar end */}

      {/* off canvas start */}
      <SideMenu
        isMenuOpen={sideMenuOpen}
        setIsMenuOpen={setSideMenuOpen}
        categoryType="beauty"
      />
      {/* off canvas end */}
    </>
  );
};
