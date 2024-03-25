import Link from 'next/link';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { MenuItem, useMenuData } from '@/hooks/use-menu-data';

type MobileMenusProps = {
  onClose?: () => void;
};

export const MobileMenus = ({ onClose }: MobileMenusProps) => {
  const { mobileMenuData } = useMenuData();

  const renderMenu = (menu: MenuItem) => {
    if (menu?.hasSubMenu) {
      return (
        <Accordion type="single" collapsible className="h-full w-full px-4">
          <AccordionItem
            key={menu.title}
            value={menu.title}
            className="border-0"
          >
            <AccordionTrigger className="font-normal hover:text-[#be844c]">
              <div className="flex gap-2">
                {menu.icon}
                {menu.title}
              </div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col gap-4 divide-y font-normal">
              {menu?.subMenus?.map((subMenu) => (
                <Link
                  key={subMenu.title}
                  href={subMenu.link}
                  className="pt-4 hover:text-[#be844c]"
                  aria-label={subMenu.title}
                  onClick={onClose}
                >
                  {subMenu.title}
                </Link>
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    } else {
      return (
        <li key={menu?.id} className="p-4 hover:text-[#be844c]">
          <Link href={menu?.link} aria-label={menu.title} onClick={onClose}>
            <div className="flex gap-2">
              {menu.icon}
              {menu.title}
            </div>
          </Link>
        </li>
      );
    }
  };

  return (
    <nav className="tp-main-menu-content">
      {mobileMenuData?.map((menu) => (
        <ul key={menu?.id}>{renderMenu(menu!)}</ul>
      ))}
    </nav>
  );
};
