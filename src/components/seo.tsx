import type { Metadata } from 'next';

type SEOProps = {
  pageTitle?: string;
  description?: string;
  image?: string;
};

export async function generateMetadata({
  pageTitle,
  description,
  image,
}: SEOProps): Promise<Metadata> {
  return {
    title: pageTitle ?? 'Stella Store Jewelry',
    description:
      description ??
      'Discover exquisite craftsmanship and timeless elegance at our online jewelry store. Explore our stunning pieces, meticulously designed to complement every occasion and elevate your unique sense of beauty. Shop now and indulge in luxury that lasts a lifetime.',
    openGraph: {
      images: [
        `https://pub-2815e42a47aa405db2fb0aeb816612b8.r2.dev/1b9e6059-1a36-4aee-b75f-6b69372bbf12/${image}` ??
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
}

export const SEO = ({ pageTitle }: SEOProps) => {
  pageTitle;
  return null;
};
