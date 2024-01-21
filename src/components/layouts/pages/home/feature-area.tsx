import {
  DeliveryIcon,
  DiscountIcon,
  RefundIcon,
  SupportIcon,
} from '@/components/icons';

export const feature_data = [
  {
    icon: <DeliveryIcon />,
    title: 'Free Delivery',
    subtitle: 'Orders from all item',
  },
  {
    icon: <RefundIcon />,
    title: 'Return & Refund',
    subtitle: 'Money back guarantee',
  },
  {
    icon: <DiscountIcon />,
    title: 'Member Discount',
    subtitle: 'One every order over $140',
  },
  {
    icon: <SupportIcon />,
    title: 'Support 24/7',
    subtitle: 'Contact us 24 hours a day',
  },
];

export const FeatureArea = () => {
  return (
    <section className="container">
      <div className="grid grid-cols-2 place-items-center gap-4 pt-8 md:grid-cols-4 md:divide-x-2">
        {feature_data.map((item) => (
          <div
            key={item.title}
            className="flex w-max flex-col items-center gap-2 text-center sm:flex-row sm:items-start sm:text-left md:px-2 lg:px-6"
          >
            <span className="my-auto text-[#bd844c] ">{item.icon}</span>
            <div className="text-sm text-gray-500">
              <h3 className="text-base font-medium text-gray-900">
                {item.title}
              </h3>
              <p>{item.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
