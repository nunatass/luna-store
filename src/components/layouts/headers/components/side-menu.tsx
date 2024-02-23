import { CloseTwoIcon } from '@/components/icons/close-two';
import Image from 'next/image';
import Link from 'next/link';
import { MobileMenus } from './mobile-menu';

import logo from '@/assets/img/logo/logo-dark.svg';

type SideMenuProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export function SideMenu({ setIsOpen }: SideMenuProps) {
  return (
    <div className="flex h-full w-full flex-col justify-between gap-8 p-6">
      <div className="flex items-center justify-between">
        <Link href="/" aria-label="home">
          <Image src={logo} alt="logo" className="w-44" />
        </Link>

        <button
          aria-label="close button"
          onClick={() => setIsOpen(false)}
          className="z-50 flex h-8 w-8 items-center justify-center bg-gray-200"
        >
          <div className="transition-all duration-300 ease-in-out hover:rotate-90">
            <CloseTwoIcon aria-label="close icon" />
          </div>
        </button>
      </div>
      <div className="flex h-full flex-col">
        <div className="tp-main-menu-mobile fix d-lg-none mb-40 h-full ">
          <MobileMenus />
        </div>
        <span className="item-center flex justify-center text-sm">
          <p>
            © {new Date().getFullYear()} Stella Stone. All Rights Reserved.
          </p>
        </span>
      </div>
    </div>
  );
}
