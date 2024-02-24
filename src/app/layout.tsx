import { Footer } from '@/components/layouts/footer';
import { Modal } from '@/components/layouts/modal';
import { BackToTopButton } from '@/components/ui/back-to-top-button';
import { Metadata } from 'next';
import { Charm, Inter, Oregano } from 'next/font/google';
import { Toaster } from 'sonner';
import { DiscountBanner } from '@/components/layouts/headers/discount-banner';

import { HydrationZustand } from '@/components/hydration-zustand';
import TanstackQueryProvider from '@/components/providers/tanstack-query-provider';
import './globals.css';

const charm = Charm({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-charm',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
});

const oregano = Oregano({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-oregano',
});

export const metadata: Metadata = {
  title: 'Stella Store',
  description: 'jewelry store',
  icons: {
    icon: {
      url: '/favicon.png',
      type: 'image/png',
    },
    shortcut: { url: '/favicon.png', type: 'image/png' },
  },
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${charm.variable} ${inter.variable} ${oregano.variable} font-inter`}
      >
        <TanstackQueryProvider>
          <HydrationZustand>
            <Toaster
              position="bottom-right"
              expand={false}
              toastOptions={{ duration: 1500 }}
              className=""
            />
            <div className="relative">
              <DiscountBanner />
              <Modal />
              {children}
              <BackToTopButton />
              <Footer />
            </div>
          </HydrationZustand>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
