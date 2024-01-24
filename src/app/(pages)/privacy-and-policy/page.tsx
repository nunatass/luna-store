import { Header } from '@/components/layouts/headers/header';
import { PrivacyAndPolicyArea } from '@/components/layouts/pages/privacy-and-policy/privacy-and-policy-area';

import { Wrapper } from '@/components/layouts/wrapper';
import { SEO } from '@/components/seo';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export default function PolicyAndPrivacy() {
  return (
    <Wrapper>
      <SEO pageTitle="Policy and Privacy" />
      <Header secondary />
      <div className="mt-32">
        <Breadcrumb title="Policy And Privacy" label="Policy And Privacy" />
      </div>
      <PrivacyAndPolicyArea />
    </Wrapper>
  );
}
