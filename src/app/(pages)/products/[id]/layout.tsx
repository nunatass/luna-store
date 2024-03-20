import { API } from '@/lib/axios';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const res = await API.get(`/products/${params?.id}`);

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${res.data?.title} | Stella Stone`,
    description: res.data?.description,
    openGraph: {
      images: [
        `https://pub-2815e42a47aa405db2fb0aeb816612b8.r2.dev/${res.data?.medias?.[1].url}`,
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
