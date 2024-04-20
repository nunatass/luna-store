import { CartProduct } from '@/common/types';
import { SuccessOrderEmail } from '@/components/emails-templates/success-order-email';
import { Resend } from 'resend';
import { findGiftProducts } from './utils';

const resend = new Resend(process.env.RESEND_API_KEY);

type SendSuccessOrderEmailProps = {
  email: string;
  address: string;
  name: string;
  order: {
    items: CartProduct[];
    id: string;
    total: number;
  };
};

export const sendSuccessOrderEmail = async ({
  email,
  address,
  name,
  order,
}: SendSuccessOrderEmailProps) => {
  const orderWithGift = findGiftProducts(order.items);
  order.items = orderWithGift;
  const { data, error } = await resend.emails.send({
    from: 'Stella Stone <support@stellastone.store>',
    to: [email],
    subject: 'Your Order is Completed',
    react: SuccessOrderEmail({ address, name, order }),
  });

  return { data, error };
};

type SendContactUsEmailProps = {
  name: string;
  email: string;
  message: string;
};

export const sendContactUsEmail = async ({
  name,
  email,
  message,
}: SendContactUsEmailProps) => {
  const { data, error } = await resend.emails.send({
    from: 'Costumer Contact <support@stellastone.store>',
    to: ['support@stellastone.store'],
    subject: `Costumer Contact - ${name}`,
    text: `Costumer Contact - ${email}
        Costumer name - ${name}
        
        ${message}
    `,
  });

  return { data, error };
};
