import Head from 'next/head';

type SEOProps = {
  pageTitle: string;
};

export const SEO = ({ pageTitle }: SEOProps) => (
  <Head>
    <title>{pageTitle && `${pageTitle} - Luna Store`}</title>
    <meta httpEquiv="x-ua-compatible" content="ie=edge" />
    <meta name="description" content="You Jewelry store" />
    <meta name="robots" content="noindex, follow" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1, shrink-to-fit=no"
    />
    <link rel="icon" href="/favicon.png" />
  </Head>
);
