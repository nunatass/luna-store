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
    <div className="relative z-20">
      <header className="absolute left-0 top-0 right-0">
        <div
          className={cn(
            'flex w-full items-center justify-between gap-20 border-b-[1px] border-[#b7a687] bg-[#AB9774] px-4 py-4 sm:px-6 md:px-10 lg:px-24',
            sticky &&
              'fixed -top-24 left-0 z-30 translate-y-24 border-0 bg-white shadow-md transition-all duration-700 ease-in-out'
          )}
        >
          <div>
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
                'hidden w-full text-white/80 lg:block',
                sticky && 'text-black'
              )}
            >
              <Menus />
            </div>
            <div
              className={cn(
                'flex items-center justify-end gap-4 text-white',
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
              <div className="block lg:hidden">
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
        </div>
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
