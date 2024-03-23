'use client';

import menuImage from '@/assets/img/menu.webp';
import { useMenuData } from '@/hooks/use-menu-data';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { MenuItem } from './menu-item';
type MenusProps = {
  secondary?: boolean;
};

export const Menus = ({ secondary }: MenusProps) => {
  const { menuData } = useMenuData();

  const renderMenu = useMemo(() => {
    return menuData?.map((menu) => {
      if (menu.products) {
        return (
          <MenuItem
            key={menu.title}
            link={menu.link}
            title={menu.title}
            hasDropdown
            secondary={secondary}
            className="group/menu-products"
          >
            <ul className="transform-all invisible absolute top-14 z-10 flex h-max min-h-60 w-max -translate-x-8 justify-between gap-x-16 bg-white pb-6 pl-8 pr-6 pt-4 font-normal text-black opacity-0 shadow-sm delay-200 duration-300 ease-in-out group-hover/menu-products:-translate-y-3 md:group-hover/menu-products:visible  md:group-hover/menu-products:opacity-100">
              {menu?.productPages?.map((product) => (
                <li key={product.title} className="flex flex-col gap-2.5">
                  <span className="font-medium">{product.title}</span>
                  <ul className="flex flex-col gap-4 text-sm">
                    {product.megaMenus.map((menu) => (
                      <li key={menu.title} className="md:hover:text-[#be844c]">
                        <Link href={menu.link} aria-label={menu.title}>
                          {menu.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
              {menu.title === 'Jewelry' && (
                <Link
                  href="/collections/9e9b574e-1daf-48e6-b767-71c9350f6bbc"
                  className="relative"
                >
                  <Image
                    src={menuImage}
                    alt="menu image"
                    width={300}
                    height={300}
                  />
                  <span className="absolute bottom-4 left-4 text-2xl text-white">
                    Popular Products
                  </span>
                </Link>
              )}
            </ul>
          </MenuItem>
        );
      }
      if (menu.hasSubMenu) {
        return (
          <MenuItem
            key={menu.title}
            link={menu.link}
            title={menu.title}
            hasDropdown
            secondary={secondary}
            className="group/sub_menu"
          >
            <ul className="transform-all invisible absolute top-14 z-10 flex h-max flex-col justify-between  gap-2.5 bg-white px-8 py-6 text-sm font-normal text-black opacity-0 shadow-sm delay-200 duration-300 ease-in-out md:group-hover/sub_menu:visible md:group-hover/sub_menu:-translate-y-3 md:group-hover/sub_menu:opacity-100">
              {menu?.subMenus?.map((subMenu) => (
                <li key={subMenu.title} className="md:hover:text-[#be844c]">
                  <Link href={subMenu.link} aria-label={subMenu.title}>
                    {subMenu.title}
                  </Link>
                </li>
              ))}
            </ul>
          </MenuItem>
        );
      }
      return (
        <MenuItem
          key={menu.title}
          link={menu.link}
          title={menu.title}
          secondary={secondary}
        />
      );
    });
  }, [secondary, menuData]);

  return (
    <nav className="max-w">
      <ul className="relative flex w-full gap-8 font-medium">{renderMenu}</ul>
    </nav>
  );
};
