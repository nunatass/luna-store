import { CartProduct } from '@/common/types';
import SuccessOrderEmail from '@/emails/success-order-email';
import { Resend } from 'resend';

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
  const { data, error } = await resend.emails.send({
    from: 'Stella Stone <support@stellastone.store>',
    to: [email],
    subject: 'Your Order is Completed',
    react: SuccessOrderEmail({ address, name, order }),
  });

  return { data, error };
};
