import { StaticImageData } from 'next/image';

import charmCollectionBanner from '@/assets/img/collections/banner-charm-collection.webp';
import perlCollectionBanner from '@/assets/img/collections/banner-perl-collection.webp';
import popularCollectionBanner from '@/assets/img/collections/banner-popular-collection.webp';
import silverCollectionBanner from '@/assets/img/collections/banner-silver-collection.webp';
import sunCollectionBanner from '@/assets/img/collections/banner-sun-collection.webp';
import twistedCollectionBanner from '@/assets/img/collections/banner-twisted-collection.webp';

type CollectionItem = {
  description: string;
  image: StaticImageData;
};

type CollectionsBanner = {
  [collectionName: string]: CollectionItem;
};

export const collectionsBanner: CollectionsBanner = {
  'Popular Products': {
    description:
      'Discover our most popular jewelery in our top list, where our beloved favorites have been collected, and be inspired by the best of our collections that follow the latest trends and timeless classics.',
    image: popularCollectionBanner,
  },
  'Pearls Collection': {
    description:
      'Explore the elegance and timeless beauty of our Pearls Collection, where each piece showcases the lustrous allure of pearls, adding a touch of sophistication and refinement to your jewelry ensemble.',
    image: perlCollectionBanner,
  },
  'Sunlight Collection': {
    description:
      "Let yourself be enchanted by our brilliant Sun collection, where the shining sun motif captures the essence of the sun's glow and spreads joy and warmth in your jewelery, creating a unique and beautiful expression.",
    image: sunCollectionBanner,
  },
  'Silver Collection': {
    description:
      'Indulge in the brilliance of our Silver Collection, featuring stunning pieces crafted from sterling silver, each designed to exude elegance and style, making them perfect for both everyday wear and special occasions.',
    image: silverCollectionBanner,
  },
  'Twisted Collection': {
    description:
      'Twist collection Dive into our enchanting Twisted collection, where the artful and twisted design brings a sense of lightness and dynamism to your jewelery',
    image: twistedCollectionBanner,
  },
  'Charm Collection': {
    description:
      'Discover the whimsical and personalized charm of our Charm Collection, where each charm tells a unique story and allows you to express your individuality and creativity through your jewelry.',
    image: charmCollectionBanner,
  },
};
