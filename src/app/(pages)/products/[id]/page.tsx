import { Product } from '@/common/types';
import { Header } from '@/components/layouts/headers/header';
import { ProductDetailsArea } from '@/components/layouts/pages/products/product-details/product-details-area';
import { Wrapper } from '@/components/layouts/wrapper';
import { SEO } from '@/components/seo';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { productData } from '@/data/products-data';

type ProductPageProps = {
  params: { id: string };
};

export default function ProductPage({ params }: ProductPageProps) {
  const product = productData.data.find(
    (product) => product.id === params.id
  ) as unknown as Product;
  // const { data: product, isLoading, isError } = useGetProductQuery(query.id);
  // decide what to render
  let content = null;
  // if (isLoading) {
  //   content = <PrdDetailsLoader loading={isLoading}/>;
  // }
  // if (!isLoading && isError) {
  //   content = <ErrorMsg msg="There was an error" />;
  // }
  if (/*!isLoading && !isError &&*/ product) {
    content = <ProductDetailsArea productItem={product} />;
  }
  return (
    <Wrapper>
      <SEO pageTitle="Product details" />
      <Header secondary />
      <div className="mt-32">
        <Breadcrumb title={product?.title} label={product?.category.name} />
      </div>
      {content}
    </Wrapper>
  );
}
