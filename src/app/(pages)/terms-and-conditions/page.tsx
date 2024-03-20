import { Header } from '@/components/layouts/headers/header';
import { TermsAndConditionsArea } from '@/components/layouts/pages/terms-and-conditions/terms-and-conditions-area';
import { Wrapper } from '@/components/layouts/wrapper';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export const metadata = {
  title: 'Return and Refound | Stella Stone',
  description:
    'Navigate our Return and Refund policy page for smooth and straightforward processes. Ensuring your satisfaction with hassle-free returns and efficient refunds.',
};

export default function TermsAndConditionsPage() {
  return (
    <Wrapper>
      <Header secondary />
      <div className="mt-32">
        <Breadcrumb title="Terms of Services" label="Terms of Services" />
      </div>
      <TermsAndConditionsArea />
    </Wrapper>
  );
}
