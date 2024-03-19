import { Header } from '@/components/layouts/headers/header';
import { ReturnAndRefoundArea } from '@/components/layouts/pages/return-and-refound/return-and-refound-area';
import { Wrapper } from '@/components/layouts/wrapper';
import { SEO } from '@/components/seo';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export default function ReturnAndRefoundPage() {
  return (
    <Wrapper>
      <SEO
        pageTitle="Return and Refound"
        description="Ease your mind with our hassle-free return and refund page. Enjoy seamless processes and transparent policies, ensuring satisfaction with every purchase."
      />
      <Header secondary />
      <div className="mt-32">
        <Breadcrumb title="Return & Refound" label="Return and Refound" />
      </div>
      <ReturnAndRefoundArea />
    </Wrapper>
  );
}
