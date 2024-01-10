import { Header } from '@/components/layout/headers/header';
import Wrapper from '@/components/layout/wrapper';
import { SEO } from '@/components/seo';

export default function Home() {
  return (
    <Wrapper>
      <SEO pageTitle="Home" />
      <Header />
      <div className="h-screen"></div>
      <div className="h-screen"></div>
    </Wrapper>
  );
}
