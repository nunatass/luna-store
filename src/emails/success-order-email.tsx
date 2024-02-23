import { CartProduct } from '@/common/types';
import { AskQuestionIcon, CartTwoIcon } from '@/components/icons';
import { formatPrice, formatPriceWithDiscount } from '@/lib/utils';
import {
  Body,
  Button,
  Font,
  Head,
  Html,
  Img,
  Link,
  Tailwind,
} from '@react-email/components';
import { CheckCircle2 } from 'lucide-react';

type SuccessOrderEmailProps = {
  name: string;
  address: string;
  order: {
    items: CartProduct[];
    id: string;
    total: number;
  };
};

const imageUrlPrefix =
  process.env.NEXT_PUBLIC_CLOUDFLARE_FILE_URL_START ||
  'https://pub-2815e42a47aa405db2fb0aeb816612b8.r2.dev';

export default function SuccessOrderEmail({
  name,
  address,
  order,
}: SuccessOrderEmailProps) {
  return (
    <Html>
      <Tailwind
        config={{
          theme: {
            extend: {
              colors: {
                gray: {
                  '200': '#e5e7eb',
                  '500': '#6b7280',
                  '600': '#4b5563',
                },
              },
            },
          },
        }}
      >
        <Head>
          <Font
            fontFamily="Inter"
            fallbackFontFamily="Verdana"
            webFont={{
              url: 'https://rsms.me/inter/inter.css',
              format: 'woff2',
            }}
            fontWeight={400}
            fontStyle="normal"
          />
        </Head>
        <Body className="relative">
          <Img
            src={`${imageUrlPrefix}/b29a2a77-4d3a-408f-8c52-acabc8159d5c`}
            alt="logo"
            width={180}
            className="absolute left-8 top-10 object-cover"
          />
          <section className="container flex h-full flex-col justify-center gap-y-8 bg-white py-20 font-sans md:flex-row">
            <div className="w-full px-8">
              <h3 className="text-lg font-semibold sm:text-2xl">
                Order Completed
              </h3>
              <div className="flex flex-col gap-8">
                <div className="mt-10 flex items-center gap-2">
                  <CheckCircle2 className="h-12 w-12 text-gray-800" />
                  <div className="flex flex-col text-sm sm:text-base">
                    <div>
                      Order: #
                      <span className="text-sm uppercase sm:text-base">
                        {order.id}
                      </span>
                    </div>
                    <span className="text-sm font-semibold sm:text-lg">
                      Thank You {name}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col border-[1px] border-gray-200 p-6 text-gray-500">
                  <span className="text-lg font-semibold text-black">
                    Order Updates
                  </span>
                  <span className="">
                    You will receive email notifications regarding the status of
                    your order and any shipping updates. Please keep an eye on
                    your inbox for further information.
                  </span>
                </div>

                <div className="flex w-full flex-col border-[1px] border-gray-200">
                  <div className="flex gap-8 border-b p-6">
                    <span className="font-medium text-gray-600">
                      Shipping Address:
                    </span>
                    <span className="text-sm font-bold">{address}</span>
                  </div>
                  <div className="h-[1px] w-[80%] bg-gray-200" />
                  <div className="flex gap-8 p-6">
                    <span className="font-medium text-gray-600">
                      Payment Method:
                    </span>
                    <span className="text-sm font-bold">Stripe</span>
                  </div>
                </div>

                <div className="flex h-max w-full flex-wrap items-center gap-x-8 gap-y-2">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <AskQuestionIcon />
                    <span>Need help?</span>
                    <Button
                      href="https://stellastone.store/contact"
                      className="font-semibold text-black transition-all duration-300 ease-in-out hover:text-[#bd844c] hover:underline"
                    >
                      Contact Us
                    </Button>
                  </div>
                  <Button
                    href="https://stellastone.store/products"
                    className="text-md mt-4 inline-flex h-9  w-max items-center justify-center whitespace-nowrap bg-black px-3 font-normal text-white ring-offset-background transition-all duration-300 ease-in-out hover:bg-[#bd844c]/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                  >
                    Continue Shipping
                  </Button>
                </div>
              </div>
            </div>
            <div className="hidden h-[700px] w-[1px] bg-gray-200 md:block" />
            <div className="w-[90vw] px-8 md:w-full">
              <div className="flex items-center gap-2">
                <CartTwoIcon />
                <h3 className="text-2xl font-semibold">Your Order</h3>
              </div>

              <div className="flex flex-col justify-center gap-10">
                {order?.items.map((product) => (
                  <>
                    <div
                      className="flex items-center gap-2 pt-8"
                      key={product.id}
                    >
                      <Link
                        href={`https://stellastone.store/products/${product.id}`}
                        aria-label="product item"
                      >
                        <div className="item-center flex h-20 w-20 justify-center bg-gray-200">
                          <Img
                            src={`${imageUrlPrefix}/${product.media}`}
                            alt="product img"
                            width={80}
                            height={80}
                            className="object-cover"
                          />
                        </div>
                      </Link>
                      <div className="flex flex-col gap-2 text-sm text-black sm:text-base">
                        <Button
                          href={`https://stellastone.store/products/${product.id}`}
                          className=" text-center text-base font-medium text-black hover:text-[#bd844c]"
                        >
                          {product.title}
                        </Button>
                        <div className="flex items-start gap-4">
                          <span className="text-sm">
                            Qtd: {product.orderQuantity}
                          </span>
                          <span className="font-semibold">
                            $
                            {Number(
                              formatPriceWithDiscount(
                                product.price,
                                product.discount
                              ).price
                            ) * product.orderQuantity}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="h-[1px] w-full bg-gray-200" />
                  </>
                ))}
                <div>
                  <div className="flex items-center justify-between py-4 font-semibold">
                    <span>Total:</span>
                    <span className="mr-10 md:mr-0">
                      ${formatPrice(order?.total)}
                    </span>
                  </div>
                  <span className="text-[12px] text-gray-500">
                    The total price displayed does not include the shipping
                    cost.
                  </span>
                </div>
              </div>
            </div>
          </section>
        </Body>
      </Tailwind>
    </Html>
  );
}
