import { Header } from '@/components/layouts/headers/header';
import { SizeGuideArea } from '@/components/layouts/pages/size-guide/size-guide-area';
import { Wrapper } from '@/components/layouts/wrapper';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export const metadata = {
  title: 'Size Guide | Stella Stone',
  description:
    'Find your perfect fit with confidence using our comprehensive size guide page. From apparel to footwear, unlock the key to comfortable and flattering attire tailored just for you.',
};

export default function SizeGuidePage() {
  return (
    <Wrapper className="bg-white">
      <Header secondary />
      <div className="mt-32">
        <Breadcrumb title="Size Guide" label="" />
      </div>
      <SizeGuideArea />
    </Wrapper>
  );
}
