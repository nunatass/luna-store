import { Header } from '@/components/layouts/headers/header';
import { FeatureArea } from '@/components/layouts/pages/home/feature-area';
import { JewelryBanner } from '@/components/layouts/pages/home/jewelry-banner';
import { PopularProducts } from '@/components/layouts/pages/home/products/popular-products';
import { ProductsArea } from '@/components/layouts/pages/home/products/products-area';
import type { Metadata } from 'next';

import { Wrapper } from '@/components/layouts/wrapper';

export const metadata: Metadata = {
  title: 'Stella Stone Jewelry',
  description:
    'Discover exquisite craftsmanship and timeless elegance at our online jewelry store. Explore our stunning pieces, meticulously designed to complement every occasion and elevate your unique sense of beauty. Shop now and indulge in luxury that lasts a lifetime.',
  openGraph: {
    images: [
      'https://pub-2815e42a47aa405db2fb0aeb816612b8.r2.dev/098878e13cceb0c222e969ea26df5063_x800.jpg',
    ],
  },

  keywords: [
    'Stella Stone',
    'Stella Store',
    'jewelry store',
    'jewelry',
    'bracelets',
    'necklaces',
    'rings',
    'earrings',
    'style',
    'Stunning Jewelry',
    'Fine Jewelry',
    'Handcrafted Jewelry',
    'Fashion Accessories',
    'Luxury Jewelry',
    'Affordable Elegance',
    'Anniversary Gifts',
    'Personalized Jewelry',
    'Timeless Classics',
    'Unique Jewelry Pieces',
    'Dazzling Earrings',
    'Elegant Bracelets',
  ],

  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
    },
  },
};

export default function HomePage() {
  return (
    <Wrapper className="bg-white">
      {/* <SEO pageTitle="Home" /> */}
      <Header />
      <JewelryBanner />
      <FeatureArea />
      {/* <HomeCollectionsArea /> */}
      <PopularProducts />
      <ProductsArea />
      {/* <InstagramArea /> */}
    </Wrapper>
  );
}
