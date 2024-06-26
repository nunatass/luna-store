import { Footer } from '@/components/layouts/footer';
import { Modal } from '@/components/layouts/modal';
import { BackToTopButton } from '@/components/ui/back-to-top-button';
import { GoogleAnalytics } from '@next/third-parties/google';
import { Analytics } from '@vercel/analytics/react';
import { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { Toaster } from 'sonner';

import FacebookPixel from '@/components/facebook-pixel';

import { HydrationZustand } from '@/components/hydration-zustand';
import TanstackQueryProvider from '@/components/providers/tanstack-query-provider';
import { ToasterProvider } from '@/components/providers/toaster-provider';
import { ToaltAffiliated } from '@/components/toalt-affiliated';
import './globals.css';

const googleAnalyticsId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID as string;

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
});

const americana = Montserrat({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-americana',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.stellastone.store'),
  title: 'Stella Stone Jewelry',
  description:
    'Explore our extensive collection of high-quality jewelry. Our pieces are crafted for durability, ensuring they maintain their original color without fading. Designed to withstand water, sweat, irritation, and perfume, our jewelry offers lasting beauty and resilience.',
  other: {
    ['fb:app_id']: '971685314153862',
  },
  icons: {
    icon: {
      url: '/favicon.png',
      type: 'image/png',
    },
    shortcut: { url: '/favicon.png', type: 'image/png' },
  },
  openGraph: {
    title: 'Stella Stone Jewelry',
    url: 'https://www.stellastone.store',
    type: 'website',
    description:
      'Explore our extensive collection of high-quality jewelry. Our pieces are crafted for durability, ensuring they maintain their original color without fading. Designed to withstand water, sweat, irritation, and perfume, our jewelry offers lasting beauty and resilience.',
    images: [
      {
        url: 'https://pub-2815e42a47aa405db2fb0aeb816612b8.r2.dev/098878e13cceb0c222e969ea26df5063_x800.jpg',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Stella Stone Jewelry',
    description:
      'Discover exquisite craftsmanship and timeless elegance at our online jewelry store. Explore our stunning pieces, meticulously designed to complement every occasion and elevate your unique sense of beauty. Shop now and indulge in luxury that lasts a lifetime.',
    images: [
      'https://pub-2815e42a47aa405db2fb0aeb816612b8.r2.dev/098878e13cceb0c222e969ea26df5063_x800.jpg',
    ],
  },
  keywords: [
    'Stella Stone',
    'Stella Store',
    'Stella Stone Store',
    'jewelry store',
    'Stella jewelry store',
    'Stella Stone jewelry store',
    'Stella Stone store',
    'jewelry',
    'bracelets',
    'necklaces',
    'rings',
    'earrings',
    'style',
    'Stunning Jewelry',
    'Fine Jewelry',
    'Handcrafted Jewelry',
    'Gold Jewelry',
    'Fashion Accessories',
    'Luxury Jewelry',
    'Affordable Elegance',
    'Anniversary Gifts',
    'Personalized Jewelry',
    'Timeless Classics',
    'Unique Jewelry Pieces',
    'Dazzling Earrings',
    'Elegant Bracelets',
    'BE YOU, WEARING US.',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta property="fb:app_id" content="971685314153862" />
        <meta
          name="p:domain_verify"
          content="69b6a2a16737740c63c0d73c7f1f1347"
        />
      </head>
      <body className={`${inter.variable} ${americana.variable} font-inter`}>
        <TanstackQueryProvider>
          <HydrationZustand>
            <ToasterProvider>
              <Toaster
                position="bottom-center"
                expand={false}
                toastOptions={{ duration: 1500 }}
                className=""
              />
            </ToasterProvider>
            <div className="relative">
              <Modal />
              <main id="main">{children}</main>
              <BackToTopButton className="z-[10]" />
              <Footer />
            </div>
          </HydrationZustand>
        </TanstackQueryProvider>
        <Analytics mode={'production'} />
        <FacebookPixel />
        <ToaltAffiliated />
      </body>
      <GoogleAnalytics gaId={googleAnalyticsId} />
    </html>
  );
}
