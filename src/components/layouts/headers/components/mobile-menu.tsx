import { instagramMenuData } from '@/data/instagram-data';

import Link from 'next/link';

import { HomeIcon } from '@/components/icons';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { InstagramImageCard } from '@/components/ui/instagram-image-card';
import { MenuItem, useMenuData } from '@/hooks/use-menu-data';

export const MobileMenus = () => {
  const { mobileMenuData } = useMenuData();

  const renderMenu = (menu: MenuItem) => {
    if (menu?.homes) {
      return (
        <Accordion type="single" collapsible className="h-full w-full px-4">
          <AccordionItem value="item-1" className="border-0">
            <AccordionTrigger className="font-normal hover:text-blue-500">
              <div className="flex gap-2">
                <HomeIcon />
                Home
              </div>
            </AccordionTrigger>
            <AccordionContent className="grid w-full grid-cols-2 gap-2">
              {instagramMenuData.map((item) => (
                <InstagramImageCard
                  key={item.id}
                  link={item.link}
                  image={item.img}
                />
              ))}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      );
    } else if (menu?.hasSubMenu) {
      return (
        <Accordion type="single" collapsible className="h-full w-full px-4">
          <AccordionItem
            key={menu.title}
            value={menu.title}
            className="border-0"
          >
            <AccordionTrigger className="font-normal hover:text-blue-500">
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
                  className="pt-4 hover:text-blue-500"
                  aria-label="menu link"
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
        <li key={menu?.id} className="p-4 hover:text-blue-500">
          <Link href={menu?.link} aria-label="menu link">
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
