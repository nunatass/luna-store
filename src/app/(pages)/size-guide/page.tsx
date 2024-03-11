import { Header } from '@/components/layouts/headers/header';
import { SizeGuideArea } from '@/components/layouts/pages/size-guide/size-guide-area';
import { Wrapper } from '@/components/layouts/wrapper';
import { SEO } from '@/components/seo';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export default function SizeGuidePage() {
  return (
    <Wrapper className="bg-white">
      <SEO pageTitle="Size Guide" />
      <Header secondary />
      <div className="mt-32">
        <Breadcrumb title="Size Guide" label="" />
      </div>
      <SizeGuideArea />
    </Wrapper>
  );
}
