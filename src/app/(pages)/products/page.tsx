import { Header } from '@/components/layouts/headers/header';
import { ProductsArea } from '@/components/layouts/pages/products/products-area';
import { Wrapper } from '@/components/layouts/wrapper';

export const metadata = {
  title: 'Products | Stella Stone',
  description:
    'Discover our Policy and Privacy page, your gateway to understanding our commitment to your security and rights. Uncover how we safeguard your information and ensure a trusted experience',
  openGraph: {
    images: [
      'https://pub-2815e42a47aa405db2fb0aeb816612b8.r2.dev/1a18b1bf-d78d-48e0-ba7d-92ea42aba859',
    ],
  },
};

export default function ProductsPage() {
  return (
    <Wrapper className="bg-white">
      <Header secondary />
      <ProductsArea />
    </Wrapper>
  );
}
