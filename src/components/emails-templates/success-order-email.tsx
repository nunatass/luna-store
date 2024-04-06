import { CartProduct } from '@/common/types';
import { formatPrice, formatPriceWithDiscount, stringToId } from '@/lib/utils';

type SuccessOrderEmailProps = {
  name: string;
  address: string;
  order: {
    items: CartProduct[];
    id: string;
    total: number;
  };
};

import {
  Body,
  Button,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

export const SuccessOrderEmail = ({
  name,
  address,
  order,
}: SuccessOrderEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Your arder is Completed</Preview>
      <Tailwind>
        <Body className="w-full bg-white pb-44 font-sans">
          <Container className="w-screen">
            <Heading className="text-[24px] font-semibold text-black ">
              Order Completed
            </Heading>
            <Text className="text-[14px] leading-[24px] text-black">
              Order: #<strong>{order?.id}</strong>
            </Text>
            <span className="text-sm font-semibold">
              Thank You {name?.slice(0)}!
            </span>

            <div className="mt-[20px] border border-solid border-[#eaeaea] p-[20px]">
              <Text className="p-0 text-lg font-semibold text-black">
                Order Updates
              </Text>
              <Text className="text-sm">
                You will receive email notifications regarding the status of
                your order and any shipping updates. Please keep an eye on your
                inbox for further information.
              </Text>
            </div>

            <div className="mt-[20px] border border-solid border-[#eaeaea]">
              <div className="border-b border-solid border-transparent border-b-[#eaeaea] p-6">
                <span className="font-medium text-gray-600">
                  Shipping Address:
                </span>
                <span className="ml-2 text-sm font-bold ">{address}</span>
              </div>
              <div className="p-6">
                <span className="font-medium text-gray-600">
                  Payment Method:
                </span>
                <span className="ml-2 text-sm font-bold">Stripe</span>
              </div>
            </div>

            <Section>
              <Row className="mt-4 w-full" align="left">
                <Column>
                  <span className="text-sm text-gray-500">
                    <span>Need help?</span>
                    <Button
                      href="https://stellastone.store/contact"
                      className="ml-2 font-semibold text-black"
                    >
                      Contact Us
                    </Button>
                  </span>
                </Column>
                <Column align="right">
                  <Button
                    href="https://stellastone.store/products"
                    className=" ml-[12px] bg-[#000000] px-5 py-3 text-center text-[12px] font-semibold text-white no-underline"
                  >
                    Continue Shipping
                  </Button>
                </Column>
              </Row>
            </Section>
            <Section className="mt-[44px] w-full">
              <Heading className="text-2xl font-semibold">Your Order</Heading>
              <Row className="w-full">
                <Column className="w-full">
                  {order?.items.map((product) => (
                    <Section
                      key={product?.id}
                      className="w-full border-b border-solid border-transparent border-b-[#eaeaea] py-6"
                    >
                      <Row align="left">
                        <Column align="left">
                          <Link
                            href={`https://stellastone.store/products/${stringToId(product.title)}`}
                            aria-label="product item"
                          >
                            <Img
                              src={`https://pub-2815e42a47aa405db2fb0aeb816612b8.r2.dev/${product?.media}`}
                              alt="product img"
                              width={140}
                              height={140}
                              className="bg-[#eaeaea] object-cover"
                            />
                          </Link>
                        </Column>

                        <Column
                          align="right"
                          className="ml-[12px] w-full text-[10px] text-black"
                        >
                          <Button
                            href={`https://stellastone.store/products/${stringToId(product.title)}`}
                            className=" w-full text-center text-base font-medium text-black"
                          >
                            {product?.title}
                          </Button>
                          <Text className="">
                            <span className="text-sm">
                              Qtd: {product?.orderQuantity}
                            </span>
                          </Text>
                          <Text>
                            <span className="font-semibold">
                              $
                              {Number(
                                formatPriceWithDiscount(
                                  product?.price,
                                  product?.discount
                                ).price
                              ) *
                                (product.orderQuantity - product.giftAmount!)}
                            </span>
                          </Text>
                          <Text>
                            <span className="line-through	">
                              $
                              {Number(
                                formatPriceWithDiscount(
                                  product.price,
                                  product.discount
                                ).price
                              ) * product.orderQuantity}
                            </span>
                          </Text>
                          <Text>
                            <span className="text-sm">
                              {product?.variant?.label}
                            </span>
                          </Text>
                          <Text>
                            {product.giftAmount && (
                              <span className="flex h-5 w-20 items-center justify-center gap-2 rounded bg-[#669e5cee] px-1 py-0.5 text-sm text-white">
                                {`${product.giftAmount!} GIFT`}
                              </span>
                            )}
                          </Text>
                        </Column>
                      </Row>
                    </Section>
                  ))}
                  <Section>
                    <Row className="py-4 font-semibold">
                      <Column>Total:</Column>
                      <Column className="mr-10" align="right">
                        ${formatPrice(order?.total)}
                      </Column>
                    </Row>
                    <span className="text-[12px] text-gray-500">
                      The total price displayed does not include the shipping
                      cost.
                    </span>
                  </Section>
                </Column>
              </Row>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default SuccessOrderEmail;
