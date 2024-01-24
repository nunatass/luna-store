import { Header } from '@/components/layouts/headers/header';
import { ContactArea } from '@/components/layouts/pages/contact/contact-area';
import { ContactMap } from '@/components/layouts/pages/contact/contact-map';
import { Wrapper } from '@/components/layouts/wrapper';
import { SEO } from '@/components/seo';
import { Breadcrumb } from '@/components/ui/breadcrumb';

export default function ContactPage() {
  return (
    <Wrapper>
      <SEO pageTitle="Contact US" />
      <Header secondary />
      <div className="mt-32">
        <Breadcrumb title="Keep In Touch with Us" label="Contact Us" />
      </div>
      <ContactArea />
      <ContactMap />
    </Wrapper>
  );
}
