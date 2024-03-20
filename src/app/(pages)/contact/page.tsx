import { Header } from '@/components/layouts/headers/header';
import { ContactArea } from '@/components/layouts/pages/contact/contact-area';
import { Wrapper } from '@/components/layouts/wrapper';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export const metadata = {
  title: 'Contact US | Stella Stone',
  description:
    'For any questions regarding our products or for assistance with your order, please email us and you will receive a response within 1-3 business days.',
  openGraph: {
    images: [
      'https://pub-2815e42a47aa405db2fb0aeb816612b8.r2.dev/098878e13cceb0c222e969ea26df5063_x800.jpg',
    ],
  },
};

export default function ContactPage() {
  return (
    <Wrapper>
      <Header secondary />
      <div className="mt-32">
        <Breadcrumb title="Keep In Touch With Us" label="Contact Us" />
      </div>
      <ContactArea />
    </Wrapper>
  );
}
