import { CloseTwoIcon } from '@/components/icons/close-two';
import Image from 'next/image';
import Link from 'next/link';
import { MobileMenus } from './mobile-menu';

import logo from '@/assets/img/logo/logo-dark.svg';
import { Button } from '@/components/ui/button';

type SideMenuProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export function SideMenu({ setIsOpen }: SideMenuProps) {
  return (
    <div className="flex h-full w-full flex-col justify-between gap-8 overscroll-none p-6	">
      <div className="flex items-center justify-between">
        <Link href="/" aria-label="home">
          <Image src={logo} alt="logo" className="w-44" />
        </Link>

        <Button
          aria-label="close button"
          onClick={() => setIsOpen(false)}
          className="z-50 flex h-12 w-12  items-center justify-center bg-gray-200 text-black md:h-8 md:w-8 md:hover:bg-gray-200"
        >
          <div className="transition-all duration-300 ease-in-out md:hover:rotate-90">
            <CloseTwoIcon aria-label="close icon" />
          </div>
        </Button>
      </div>
      <div className="flex h-full flex-col">
        <div className=" mb-40 h-full ">
          <MobileMenus onClose={() => setIsOpen(false)} />
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
