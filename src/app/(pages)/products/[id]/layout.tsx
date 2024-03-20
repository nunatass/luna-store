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
        images: [
          {
            url: `https://pub-2815e42a47aa405db2fb0aeb816612b8.r2.dev/${res.data?.medias?.[1].url}`,
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
