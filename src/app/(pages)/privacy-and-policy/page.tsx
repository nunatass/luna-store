import { Header } from '@/components/layouts/headers/header';
import { PrivacyAndPolicyArea } from '@/components/layouts/pages/privacy-and-policy/privacy-and-policy-area';

import { Wrapper } from '@/components/layouts/wrapper';
import { SEO } from '@/components/seo';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export default function PolicyAndPrivacy() {
  return (
    <Wrapper>
      <SEO
        pageTitle="Policy and Privacy"
        description="Discover our Policy and Privacy page, your gateway to understanding our commitment to your security and rights. Uncover how we safeguard your information and ensure a trusted experience"
      />
      <Header secondary />
      <div className="mt-32">
        <Breadcrumb title="Policy And Privacy" label="Policy And Privacy" />
      </div>
      <PrivacyAndPolicyArea />
    </Wrapper>
  );
}
