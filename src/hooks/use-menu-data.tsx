import { Category, Collection } from '@/common/types';
import {
  CartIcon,
  CartTwoIcon,
  CollectionIcon,
  EmailIcon,
} from '@/components/icons';
import { TruckIcon } from 'lucide-react';
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
          link: `/products?category=${category.name.toLocaleLowerCase()}`,
        })),
      ];
    }
  }, [categories, isCategoriesPending]);

  const mappedCollections = useMemo(() => {
    if (isCollectionsPending) {
      return [{ title: 'loading...', link: '' }];
    } else {
      return collections?.slice(0, 4).map((collection: Collection) => ({
        title: collection.title,
        link: `/collections/${collection.id}`,
      }));
    }
  }, [collections, isCollectionsPending]);

  const jewelryMenuData = useCallback(
    () => ({
      id: 1,
      products: true,
      title: 'Jewelry',
      link: '/',
      productPages: [
        {
          title: 'Categories',
          link: '/products',
          megaMenus: isCategoriesPending
            ? [{ title: 'loading...', link: '' }]
            : [
                {
                  title: 'All Products',
                  link: `/products`,
                },
                ...(categories ?? []).slice(0, 4).map((category: Category) => ({
                  title: category.name,
                  link: `/products?category=${category.name.toLocaleLowerCase()}`,
                })),
              ],
        },
        {
          title: 'Discounted Products',
          link: '/',
          megaMenus: [{ title: '30% Off', link: '/discounts' }],
        },
      ],
    }),
    [categories, isCategoriesPending]
  );

  const collectionsMenuData = useCallback(
    () => ({
      id: 2,
      products: true,
      title: 'Collections',
      link: '#',
      productPages: [
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
    [collections, isCollectionsPending]
  );

  const menuData: MenuItem[] = [
    jewelryMenuData(),
    collectionsMenuData(),
    {
      id: 6,
      isSingleLink: true,
      title: 'Contact Us',
      link: '/contact',
    },
  ];

  const mobileMenuData: MenuItem[] = [
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
      title: 'Collections',
      link: '/products',
      icon: <CollectionIcon />,
      subMenus: mappedCollections,
    },

    {
      id: 4,
      isSingleLink: true,
      title: 'Shopping Cart',
      link: '/cart',
      icon: <CartIcon />,
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
      title: 'Contact Us',
      link: '/contact',
      icon: <EmailIcon />,
    },
  ];

  if (isCategoriesError || isCollectionsError) {
    return { menuData: null };
  }

  return { menuData, mobileMenuData };
}
