import home_4 from '@/assets/img/menu/menu-home-4.jpg';
import { CartIcon, CartTwoIcon, EmailIcon } from '@/components/icons';
import { Newspaper, TicketIcon, TruckIcon } from 'lucide-react';
import { StaticImageData } from 'next/image';
import { ReactNode } from 'react';

type HomePage = {
  img: StaticImageData;
  title: string;
  link: string;
};

type SubMenu = { title: string; link: string };

export type MobileMenu = {
  id: number;
  homes?: boolean;
  title: string;
  link: string;
  homePages?: HomePage[];
  hasSubMenu?: boolean;
  subMenus?: SubMenu[];
  isSingleLink?: boolean;
  icon?: ReactNode;
};

export const menuData = [
  {
    id: 1,
    homes: true,
    title: 'Home',
    link: '/',
    homePages: [
      {
        img: home_4,
        title: 'Jewelry',
        link: '/home-4',
      },
    ],
  },
  {
    id: 2,
    products: true,
    title: 'Products',
    link: '/products',
    productPages: [
      {
        title: 'Category',
        link: '/products',
        megaMenus: [
          { title: 'Rings', link: '/' },
          { title: 'Earring', link: '/' },
          { title: 'Bracelets', link: '/' },
          { title: 'Necklaces', link: '/' },
        ],
      },
      {
        title: 'Discounted Products',
        link: '/',
        megaMenus: [{ title: '30% Off', link: '/product-details' }],
      },
      {
        title: 'Collections',
        link: '/',
        megaMenus: [
          { title: 'Trading summer set', link: '/' },
          { title: 'Tropical set', link: '/' },
          { title: 'New Arrival', link: '/' },
        ],
      },
    ],
  },

  {
    id: 4,
    isSingleLink: true,
    title: 'Coupons',
    link: '/coupon',
  },
  {
    id: 5,
    hasSubMenu: true,
    title: 'Blog',
    link: '/blog',
    subMenus: [
      { title: 'Blog Standard', link: '/' },
      { title: 'Blog Grid', link: '/' },
      { title: 'Blog List', link: '/' },
      { title: 'Blog Details', link: '/' },
      { title: 'Blog Details Full Width', link: '/' },
    ],
  },
  {
    id: 6,
    isSingleLink: true,
    title: 'Contact',
    link: '/contact',
  },
];

// mobile_menu
export const mobileMenuData: MobileMenu[] = [
  {
    id: 1,
    homes: true,
    title: 'Home',
    link: '/',
    homePages: [
      {
        img: home_4,
        title: 'Jewelry',
        link: '/home-4',
      },
    ],
  },
  {
    id: 2,
    hasSubMenu: true,
    title: 'Products',
    link: '/products',
    icon: <CartTwoIcon />,
    subMenus: [
      { title: 'Rings', link: '/' },
      { title: 'Earring', link: '/' },
      { title: 'Bracelets', link: '/' },
      { title: 'Necklaces', link: '/' },
    ],
  },
  {
    id: 3,
    hasSubMenu: true,
    title: 'Blog',
    link: '/blog',
    icon: <Newspaper strokeWidth="1.5px" />,
    subMenus: [
      { title: 'Blog Standard', link: '/' },
      { title: 'Blog Grid', link: '/' },
      { title: 'Blog List', link: '/' },
      { title: 'Blog Details', link: '/' },
      { title: 'Blog Details Full Width', link: '/' },
    ],
  },
  {
    id: 4,
    isSingleLink: true,
    title: 'Shopping Cart',
    link: '/cart',
    icon: <CartIcon />,
  },
  {
    id: 5,
    isSingleLink: true,
    title: 'Coupons',
    link: '/coupon',
    icon: <TicketIcon strokeWidth="1.5px" />,
  },
  {
    id: 6,
    isSingleLink: true,
    title: 'Track Your Order',
    link: '/track-order',
    icon: <TruckIcon strokeWidth="1.5px" />,
  },
  {
    id: 7,
    isSingleLink: true,
    title: 'Contact',
    link: '/contact',
    icon: <EmailIcon />,
  },
];
