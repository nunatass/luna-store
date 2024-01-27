import { Header } from '@/components/layouts/headers/header';
import { TermsAndConditionsArea } from '@/components/layouts/pages/terms-and-conditions/terms-and-conditions-area';
import { Wrapper } from '@/components/layouts/wrapper';
import { SEO } from '@/components/seo';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export default function TermsAndConditionsPage() {
  return (
    <Wrapper>
      <SEO pageTitle="Return and Refound" />
      <Header secondary />
      <div className="mt-32">
        <Breadcrumb title="Terms of Services" label="Terms of Services" />
      </div>
      <TermsAndConditionsArea />
    </Wrapper>
  );
}
