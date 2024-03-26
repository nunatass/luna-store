import { Collection, Product } from '@/common/types';
import { API } from '@/lib/axios';
import { stringToId } from '@/lib/utils';

export default async function sitemap() {
  const productsResponse = await API.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/products`,
    {
      params: { page: 0, limit: 100 },
    }
  );

  const collectionsResponse = await API.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/collections`,
    {
      params: { page: 0, limit: 5 },
    }
  );

  const products = productsResponse.data.data.map((product: Product) => {
    return {
      url: `https://www.stellastone.store/products/${stringToId(product.title)}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    };
  });

  const collections = collectionsResponse.data.data.map(
    (collection: Collection) => {
      return {
        url: `https://www.stellastone.store/collections/${collection.id}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      };
    }
  );

  return [
    {
      url: 'https://www.stellastone.store',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: 'https://www.stellastone.store/products',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...products,
    ...collections,
    {
      url: 'https://www.stellastone.store/discounts',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://www.stellastone.store/contact',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://www.stellastone.store/faqs',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://www.stellastone.store/track-order',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://www.stellastone.store/return-and-refound',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://www.stellastone.store/size-guide',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://www.stellastone.store/privacy-and-policy',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: 'https://www.stellastone.store/terms-and-conditions',
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ];
}
