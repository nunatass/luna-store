import { Header } from '@/components/layouts/headers/header';
import { ReturnAndRefoundArea } from '@/components/layouts/pages/return-and-refound/return-and-refound-area';
import { Wrapper } from '@/components/layouts/wrapper';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export const metadata = {
  title: 'Return and Refound | Stella Stone',
  description:
    'Ease your mind with our hassle-free return and refund page. Enjoy seamless processes and transparent policies, ensuring satisfaction with every purchase.',
};

export default function ReturnAndRefoundPage() {
  return (
    <Wrapper>
      <Header secondary />
      <div className="mt-36">
        <Breadcrumb title="Return & Refound" label="Return and Refound" />
      </div>
      <ReturnAndRefoundArea />
    </Wrapper>
  );
}
