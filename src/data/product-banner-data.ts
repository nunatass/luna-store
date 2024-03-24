import braceletsBanner from '@/assets/img/collections/banner-twisted-collection.webp';
import allProductBanner from '@/assets/img/products/all-products.webp';
import earringsBanner from '@/assets/img/products/banner-earrings.webp';
import necklacesBanner from '@/assets/img/products/banner-necklaces.webp';
import ringsBanner from '@/assets/img/products/banner-rings.webp';
import { StaticImageData } from 'next/image';

type ProductsItem = {
  description: string;
  image: StaticImageData;
};

type ProductsBanner = {
  [collectionName: string]: ProductsItem;
};

export const productsBanner: ProductsBanner = {
  earrings: {
    description:
      "Explore our stunning earrings, where you'll find everything from bold statement pieces to elegant and subtle designs that add extraordinary detail to your ears and complete your look with style and finesse.",
    image: earringsBanner,
  },

  rings: {
    description:
      'Explore our rings that allow you to create your own unique look. Choose elegant and feminine designs or go for a more raw and chunky style. Let our rings be your personal expression.',
    image: ringsBanner,
  },

  necklaces: {
    description:
      'Dive into our magical necklace collection, featuring a wealth of beautiful designs, from subtle and simple necklaces to eye-catching and sophisticated pendants that create a beautiful frame around your neck.',
    image: necklacesBanner,
  },

  bracelets: {
    description:
      'Discover our range of bracelets, where you will find everything from classic and timeless designs to modern and artistic creations that allow you to create your own unique look and express your individuality',
    image: braceletsBanner,
  },

  all: {
    image: allProductBanner,
    description:
      'Discover our large selection of quality jewellery, all our jewelery is durable and does not rub off on the colour. They also withstand water, sweat, irritation and perfume.',
  },
};
