import { Metadata } from 'next';

type SEOProps = {
  pageTitle: string;
};

export const metadata: Metadata = {
  title: 'Stella Store',
  description: 'Stella Store Products',
  keywords: [
    'jewelry store',
    'jewelry',
    'bracelets',
    'necklaces',
    'rings',
    'earrings',
    'style',
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

export const SEO = ({ pageTitle }: SEOProps) => {
  pageTitle;
  return <></>;
};
