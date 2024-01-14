import { Delivery, Discount, Refund, Support } from '@/components/icons';

export const feature_data = [
  {
    icon: <Delivery />,
    title: 'Free Delivery',
    subtitle: 'Orders from all item',
  },
  {
    icon: <Refund />,
    title: 'Return & Refund',
    subtitle: 'Money back guarantee',
  },
  {
    icon: <Discount />,
    title: 'Member Discount',
    subtitle: 'One every order over $140',
  },
  {
    icon: <Support />,
    title: 'Support 24/7',
    subtitle: 'Contact us 24 hours a day',
  },
];

export const FeatureArea = () => {
  return (
    <section className="container">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 place-items-center md:divide-x-2">
        {feature_data.map((item) => (
          <div
            key={item.title}
            className="w-max flex flex-col sm:flex-row items-center text-center sm:text-left sm:items-start gap-2 lg:px-6 md:px-2"
          >
            <span className="my-auto text-[#bd844c] ">{item.icon}</span>
            <div className="text-sm text-gray-500">
              <h3 className="text-gray-900 font-medium text-base">
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
