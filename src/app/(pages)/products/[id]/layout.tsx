import { API } from '@/lib/axios';
import { idToString } from '@/lib/utils';
import { Metadata } from 'next';

type Props = {
  params: { id: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    const res = await API.get(
      `/products/8966586c-6d2e-4910-9855-29c34d77efb1`,
      {
        params: {
          title: idToString(params?.id),
        },
      }
    );
    return {
      metadataBase: new URL('https://www.stellastone.store'),
      title: `${res.data?.title} | Stella Stone`,
      description: res.data?.description,
      openGraph: {
        title: `${res.data?.title} | Stella Stone`,
        description: res.data?.description,
        url: 'https://www.stellastone.store',
        type: 'website',
        images: [
          {
            url: `https://pub-2815e42a47aa405db2fb0aeb816612b8.r2.dev/${res.data?.medias?.[1].url}`,
            alt: `${res.data?.title}`,
            width: 800,
            height: 600,
          },
        ],
      },

      twitter: {
        card: 'summary_large_image',
        title: `${res.data?.title} | Stella Stone`,
        description: res.data?.description,
        images: [
          `https://pub-2815e42a47aa405db2fb0aeb816612b8.r2.dev/${res.data?.medias?.[1].url}`,
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
      ],
    };
  } catch (error: unknown) {
    return {
      title: 'Product not found with this id',
    };
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
