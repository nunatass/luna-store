'use client';

import { InstagramImageCard } from '@/components/ui/instagram-image-card';
import { instagramMenuData } from '@/data/instagram-data';

import { useMenuData } from '@/hooks/use-menu-data';
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
      if (menu.homes) {
        return (
          <MenuItem
            key={menu.title}
            link={menu.link}
            title={menu.title}
            hasDropdown
            secondary={secondary}
            className="group/menu-home"
          >
            <div className="invisible absolute top-14 z-10 h-max w-[80%] bg-white opacity-0  shadow-sm transition-all delay-200 duration-300 ease-in-out md:group-hover/menu-home:visible md:group-hover/menu-home:-translate-y-3 md:group-hover/menu-home:opacity-100 ">
              <div className="flex items-center justify-center gap-3 p-5 ">
                {instagramMenuData.map((item) => (
                  <InstagramImageCard
                    key={item.id}
                    image={item.img}
                    link={item.link}
                  />
                ))}
              </div>
            </div>
          </MenuItem>
        );
      }
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
            <ul className="transform-all invisible absolute left-0 top-14 z-10 flex  h-max justify-between bg-white px-8  py-5 font-normal text-black opacity-0 shadow-sm delay-200 duration-300 ease-in-out group-hover/menu-products:-translate-y-3 md:group-hover/menu-products:visible md:group-hover/menu-products:opacity-100 lg:w-[80%]">
              {menu?.productPages?.map((product) => (
                <li key={product.title} className="flex flex-col gap-2.5">
                  <span className="font-medium">{product.title}</span>
                  <ul className="flex flex-col gap-2 text-sm">
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
