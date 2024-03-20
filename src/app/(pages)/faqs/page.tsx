import { Header } from '@/components/layouts/headers/header';
import { FAQsArea } from '@/components/layouts/pages/faqs/faqs-area';
import { Wrapper } from '@/components/layouts/wrapper';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export const metadata = {
  title: 'FAQs | Stella Stone',
  description:
    'Explore our FAQ page for quick answers to all your questions. From shipping queries to product details, find clarity and guidance effortlessly.',
};

export default function FAQsPage() {
  return (
    <Wrapper>
      <Header secondary />
      <div className="mt-32">
        <Breadcrumb
          title="Frequently Asked Questions"
          label="Frequently Asked Questions"
        />
      </div>
      <FAQsArea />
    </Wrapper>
  );
}
