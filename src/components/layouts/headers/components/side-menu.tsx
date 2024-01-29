import { CloseTwoIcon } from '@/components/icons/close-two';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { MobileMenus } from './mobile-menu';

import language_img from '@/assets/img/icon/language-flag.png';
import logo from '@/assets/img/logo/logo.svg';

type SideMenuProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
};

export function SideMenu({ setIsOpen }: SideMenuProps) {
  return (
    <div className="flex h-full w-full flex-col justify-between gap-8 p-6">
      <div className="flex items-center justify-between">
        <Link href="/" aria-label="home">
          <Image src={logo} alt="logo" />
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
        <div className="flex w-full items-center justify-between self-end border-t-[1.5px] py-4 text-sm font-medium text-slate-600">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2">
                Currency: USD
                <ChevronDown className="h-4 w-4" aria-label="chevron icon" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Currency: USD</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
              // value={position}
              // onValueChange={setPosition}
              >
                <DropdownMenuRadioItem value="usd">$ USD</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="eur">€ EUR</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center gap-2">
                <Image src={language_img} alt="language-flag" />
                English
                <ChevronDown className="h-4 w-4" aria-label="chevron icon" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>English</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuRadioGroup
              // value={position}
              // onValueChange={setPosition}
              >
                <DropdownMenuRadioItem value="sp">
                  Spanish
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="pt">
                  Portuguese
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="en">
                  English
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}
