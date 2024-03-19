import { Header } from '@/components/layouts/headers/header';
import { ContactArea } from '@/components/layouts/pages/contact/contact-area';
import { Wrapper } from '@/components/layouts/wrapper';
import { SEO } from '@/components/seo';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export default function ContactPage() {
  return (
    <Wrapper>
      <SEO
        pageTitle="Contact US"
        description="For any questions regarding our products or for assistance with your order, please email us and you will receive a response within 1-3 business days."
      />
      <Header secondary />
      <div className="mt-32">
        <Breadcrumb title="Keep In Touch With Us" label="Contact Us" />
      </div>
      <ContactArea />
      {/* <ContactMap /> */}
    </Wrapper>
  );
}
