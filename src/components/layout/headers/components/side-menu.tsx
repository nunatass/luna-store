import { CloseTwo } from '@/components/icons/close-two';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown, MenuIcon } from 'lucide-react';
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
    <div className="w-full h-full flex flex-col p-6 gap-8 justify-between">
      <div className="flex items-center justify-between">
        <Link href="/">
          <Image src={logo} alt="logo" />
        </Link>

        <button
          onClick={() => setIsOpen(false)}
          className="flex items-center justify-center h-8 w-8 bg-gray-200 hover:bg-blue-500 hover:text-white transition-all duration-500 ease-in-out"
        >
          <CloseTwo />
        </button>
      </div>
      <div className="h-full flex flex-col">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="flex items-center justify-between w-full px-4 py-3 bg-blue-500 text-white hover:bg-blue-500/90 transition-all duration-500 ease-in-out hover:no-underline font-normal">
              <MenuIcon />
              All Categories
            </AccordionTrigger>
            <AccordionContent>
              Yes. It adheres to the WAI-ARIA design pattern.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="tp-main-menu-mobile fix d-lg-none mb-40 h-full ">
          <MobileMenus />
        </div>
        <div className="flex py-4 border-t-[1.5px] items-center justify-between text-slate-600 font-medium text-sm w-full self-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex gap-2 items-center">
                Currency: USD
                <ChevronDown className="h-4 w-4" />
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
              <div className="flex gap-2 items-center">
                <Image src={language_img} alt="language-flag" />
                English
                <ChevronDown className="h-4 w-4" />
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
