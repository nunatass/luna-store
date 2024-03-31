import contactImage from '@/assets/img/contact/contact.webp';
import { Header } from '@/components/layouts/headers/header';
import { ContactArea } from '@/components/layouts/pages/contact/contact-area';
import { Wrapper } from '@/components/layouts/wrapper';
import Image from 'next/image';

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
      <div className="container relative mt-20 pt-8">
        <Image
          src={contactImage}
          alt="contact image"
          width={350}
          height={300}
          className="mt-8 h-[300px] w-full object-cover"
          unoptimized
        />
        <div className="absolute -left-2 bottom-6 ml-8 flex flex-col gap-4 text-white sm:left-6">
          <h1 className="text-3xl font-medium md:text-4xl">
            Keep In Touch With Us
          </h1>
          <p className="max-w-[400px] text-xs sm:text-sm">
            If you need help with an order, questions about our products or
            something else entirely, you can contact us here.
          </p>
        </div>
      </div>
      <ContactArea />
    </Wrapper>
  );
}
