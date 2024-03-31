import { Header } from '@/components/layouts/headers/header';
import { PrivacyAndPolicyArea } from '@/components/layouts/pages/privacy-and-policy/privacy-and-policy-area';

import { Wrapper } from '@/components/layouts/wrapper';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export const metadata = {
  title: 'Policy and Privacy | Stella Stone',
  description:
    'Discover our Policy and Privacy page, your gateway to understanding our commitment to your security and rights. Uncover how we safeguard your information and ensure a trusted experience',
};

export default function PolicyAndPrivacy() {
  return (
    <Wrapper>
      <Header secondary />
      <div className="mt-36">
        <Breadcrumb title="Policy And Privacy" label="Policy And Privacy" />
      </div>
      <PrivacyAndPolicyArea />
    </Wrapper>
  );
}
