import { Header } from '@/components/layouts/headers/header';
import HomeReviewArea from '@/components/layouts/pages/home/home-review-area';
import { ProductsArea } from '@/components/layouts/pages/products/products-area';
import { Wrapper } from '@/components/layouts/wrapper';

export const metadata = {
  title: 'Products | Stella Stone',
  description:
    'Explore our extensive collection of high-quality jewelry. Our pieces are crafted for durability, ensuring they maintain their original color without fading. Designed to withstand water, sweat, irritation, and perfume, our jewelry offers lasting beauty and resilience.',
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
      <HomeReviewArea />
    </Wrapper>
  );
}
