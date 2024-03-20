import { API } from '@/lib/axios';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const res = await API.get(`/collections/${params?.id}`);

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${res.data?.title} | Stella Stone`,
    description:
      'Elevate your style with our stunning jewelry collection. Discover elegance and sophistication in every piece.',
    openGraph: {
      images: [
        `https://pub-2815e42a47aa405db2fb0aeb816612b8.r2.dev/1bc5650f-8e12-4aad-9095-6e9397a26d99`,
        ...previousImages,
      ],
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
