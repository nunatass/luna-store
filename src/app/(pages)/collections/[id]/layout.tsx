import { API } from '@/lib/axios';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const res = await API.get(`/collections/${params?.id}`);

    const previousImages = (await parent).openGraph?.images || [];

    return {
      metadataBase: new URL('https://www.stellastone.store'),
      title: `${res.data?.title} | Stella Stone`,
      description:
        'Elevate your style with our stunning jewelry collection. Discover elegance and sophistication in every piece.',

      openGraph: {
        title: `${res.data?.title} | Stella Stone`,
        description:
          'Elevate your style with our stunning jewelry collection. Discover elegance and sophistication in every piece.',
        images: [
          {
            url: `https://pub-2815e42a47aa405db2fb0aeb816612b8.r2.dev/1bc5650f-8e12-4aad-9095-6e9397a26d99`,
          },
        ],
      },

      twitter: {
        card: 'summary_large_image',
        title: `${res.data?.title} | Stella Stone`,
        description:
          'Elevate your style with our stunning jewelry collection. Discover elegance and sophistication in every piece.',
        images: [
          `https://pub-2815e42a47aa405db2fb0aeb816612b8.r2.dev/1bc5650f-8e12-4aad-9095-6e9397a26d99`,
          ...previousImages,
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
