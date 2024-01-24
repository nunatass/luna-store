import { Header } from '@/components/layouts/headers/header';
import { FAQsArea } from '@/components/layouts/pages/faqs/faqs-area';
import { Wrapper } from '@/components/layouts/wrapper';
import { SEO } from '@/components/seo';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export default function FAQsPage() {
  return (
    <Wrapper>
      <SEO pageTitle="FAQs US" />
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
