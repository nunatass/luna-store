import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
// internal
import { CloseTwo } from '@/components/icons';
// import MobileCategory from '@/layout/headers/header-com/mobile-category';
import contact_img from '@/assets/img/icon/contact.png';
import language_img from '@/assets/img/icon/language-flag.png';
import logo from '@/assets/img/logo/logo.svg';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, MenuIcon } from 'lucide-react';
//import MobileMenus from './mobile-menus';

type SideMenuProp = {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  categoryType: string;
};

export const SideMenu = ({
  isMenuOpen,
  setIsMenuOpen,
  // categoryType = 'electronics',
}: SideMenuProp) => {
  const [isCategoryActive, setIsCategoryActive] = useState(false);
  const [isCurrencyActive, setIsCurrencyActive] = useState(false);
  const [isLanguageActive, setIsLanguageActive] = useState(false);

  // handle language active
  const handleLanguageActive = () => {
    setIsLanguageActive(!isLanguageActive);
    setIsCurrencyActive(false);
  };
  // handle Currency active
  const handleCurrencyActive = () => {
    setIsCurrencyActive(!isCurrencyActive);
    setIsLanguageActive(false);
  };

  const sidebarPanelAnimation = {
    initial: { x: '100%' },
    animate: { x: '0' },
    exit: { x: '100%' },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  };

  const overlayAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: '50%' },
    exit: { opacity: 0 },
    transition: { duration: 0.3, ease: 'easeInOut' },
  };

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {isMenuOpen && (
          <motion.div
            className={cn(
              'h-screen max-w-96 w-full  bg-white z-50 absolute top-0 right-0 shadow-sm'
            )}
            {...sidebarPanelAnimation}
          >
            <div className="flex flex-col p-6 gap-8">
              <div className="flex items-center justify-between ">
                <div className="offcanvas__logo logo">
                  <Link href="/">
                    <Image src={logo} alt="logo" />
                  </Link>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center justify-center h-8 w-8 bg-gray-200 hover:bg-blue-500 hover:text-white transition-all duration-500 ease-in-out"
                >
                  <CloseTwo />
                </button>
              </div>
              <div className="offcanvas__content">
                <div className="offcanvas__category pb-40">
                  <button
                    onClick={() => setIsCategoryActive(!isCategoryActive)}
                    className="flex items-center justify-between w-full px-4 py-3 bg-blue-500 text-white hover:bg-blue-500/90 transition-all duration-500 ease-in-out"
                  >
                    <MenuIcon />
                    All Categories
                    <ChevronDown className="h-5 w-5" />
                  </button>
                  <div className="tp-category-mobile-menu">
                    <nav
                      className={`tp-category-menu-content ${
                        isCategoryActive ? 'active' : ''
                      }`}
                    >
                      {/* <MobileCategory
                        categoryType={categoryType}
                        isCategoryActive={isCategoryActive}
                      /> */}
                    </nav>
                  </div>
                </div>
                <div className="tp-main-menu-mobile fix d-lg-none mb-40">
                  {/* <MobileMenus /> */}
                </div>

                <div className="offcanvas__contact align-items-center d-none">
                  <div className="offcanvas__contact-icon mr-20">
                    <span>
                      <Image src={contact_img} alt="contact_img" />
                    </span>
                  </div>
                  <div className="offcanvas__contact-content">
                    <h3 className="offcanvas__contact-title">
                      <a href="tel:098-852-987">004524865</a>
                    </h3>
                  </div>
                </div>
                <div className="offcanvas__btn">
                  <Link href="/contact" className="tp-btn-2 tp-btn-border-2">
                    Contact Us
                  </Link>
                </div>
              </div>
              <div className="offcanvas__bottom">
                <div className="offcanvas__footer d-flex align-items-center justify-content-between">
                  <div className="offcanvas__currency-wrapper currency">
                    <span
                      onClick={handleCurrencyActive}
                      className="offcanvas__currency-selected-currency tp-currency-toggle"
                      id="tp-offcanvas-currency-toggle"
                    >
                      Currency : USD
                    </span>
                    <ul
                      className={`offcanvas__currency-list tp-currency-list ${
                        isCurrencyActive ? 'tp-currency-list-open' : ''
                      }`}
                    >
                      <li>USD</li>
                      <li>ERU</li>
                      <li>BDT </li>
                      <li>INR</li>
                    </ul>
                  </div>
                  <div className="offcanvas__select language">
                    <div className="offcanvas__lang d-flex align-items-center justify-content-md-end">
                      <div className="offcanvas__lang-img mr-15">
                        <Image src={language_img} alt="language-flag" />
                      </div>
                      <div className="offcanvas__lang-wrapper">
                        <span
                          onClick={handleLanguageActive}
                          className="offcanvas__lang-selected-lang tp-lang-toggle"
                          id="tp-offcanvas-lang-toggle"
                        >
                          English
                        </span>
                        <ul
                          className={`offcanvas__lang-list tp-lang-list ${
                            isLanguageActive ? 'tp-lang-list-open' : ''
                          }`}
                        >
                          <li>Spanish</li>
                          <li>Portugese</li>
                          <li>American</li>
                          <li>Canada</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* // body overlay start */}
      <AnimatePresence mode="wait" initial={false}>
        {isMenuOpen && (
          <motion.div
            onClick={() => setIsMenuOpen(false)}
            {...overlayAnimation}
            className={`h-screen w-full bg-black absolute top-0 right-0 opacity-50 z-30 cursor-close`}
          />
        )}
      </AnimatePresence>
      {/* body overlay end */}
    </>
  );
};
