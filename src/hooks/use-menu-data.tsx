import { Category, Collection } from '@/common/types';
import { CartIcon, CartTwoIcon, EmailIcon } from '@/components/icons';
import { Newspaper, TicketIcon, TruckIcon } from 'lucide-react';
import { ReactNode, useCallback, useMemo } from 'react';
import { useCategories } from './api/use-categories';
import { useCollections } from './api/use-collections';

type MegaMenu = {
  title: string;
  link: string;
};

export type MenuItem = {
  id: number;
  title: string;
  link: string;
  homes?: boolean;
  icon?: ReactNode;
  products?: boolean;
  isSingleLink?: boolean;
  hasSubMenu?: boolean;
  homePages?: { img: string; title: string; link: string }[];
  productPages?: {
    title: string;
    link: string;
    megaMenus: MegaMenu[];
  }[];
  subMenus?: MegaMenu[];
};

export function useMenuData() {
  const {
    data: categories,
    isPending: isCategoriesPending,
    isError: isCategoriesError,
  } = useCategories();

  const {
    data: collections,
    isPending: isCollectionsPending,
    isError: isCollectionsError,
  } = useCollections();

  const mappedCategories = useMemo(() => {
    if (isCategoriesPending) {
      return [{ title: 'loading...', link: '' }];
    } else {
      return [
        { title: 'All Products', link: '/products' },
        ...categories.map((category) => ({
          title: category.name,
          link: '/',
        })),
      ];
    }
  }, [categories, isCategoriesPending]);

  const productMenuData = useCallback(
    () => ({
      id: 2,
      products: true,
      title: 'Products',
      link: '/products',
      productPages: [
        {
          title: 'Category',
          link: '/products',
          megaMenus: isCategoriesPending
            ? [{ title: 'loading...', link: '' }]
            : categories?.slice(0, 4).map((category: Category) => ({
                title: category.name,
                link: `/products?category=${category.name.toLocaleLowerCase()}`,
              })),
        },
        {
          title: 'Discounted Products',
          link: '/',
          megaMenus: [{ title: '30% Off', link: '/product-details' }],
        },
        {
          title: 'Collections',
          link: '/',
          megaMenus: isCollectionsPending
            ? [{ title: 'loading...', link: '' }]
            : collections?.slice(0, 4).map((collection: Collection) => ({
                title: collection.title,
                link: `/collections/${collection.id}`,
              })),
        },
      ],
    }),
    [categories, collections, isCollectionsPending, isCategoriesPending]
  );

  const menuData: MenuItem[] = [
    {
      id: 1,
      homes: true,
      title: 'Home',
      link: '/',
      homePages: [],
    },
    productMenuData(),
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

  const mobileMenuData: MenuItem[] = [
    {
      id: 1,
      homes: true,
      title: 'Home',
      link: '/',
      homePages: [],
    },
    {
      id: 2,
      hasSubMenu: true,
      title: 'Products',
      link: '/products',
      icon: <CartTwoIcon />,
      subMenus: mappedCategories,
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

  if (isCategoriesError || isCollectionsError) {
    return { menuData: null };
  }

  return { menuData, mobileMenuData };
}