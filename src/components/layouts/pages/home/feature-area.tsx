import { DeliveryIcon, RefundIcon } from '@/components/icons';
import { Globe, HeadphonesIcon } from 'lucide-react';

export const feature_data = [
  {
    icon: <DeliveryIcon className="h-6 w-6" />,
    title: 'Fast Delivery',
    subtitle: '2 - 3 days after purchase',
  },
  {
    icon: <RefundIcon className="h-6 w-6" />,
    title: 'Return & Refund',
    subtitle: 'Money back guarantee',
  },
  {
    icon: <Globe className="h-6 w-6 stroke-[1.5px] text-black" />,
    title: 'International',
    subtitle: 'We ship all over the world',
  },
  {
    icon: <HeadphonesIcon className="h-6 w-6 stroke-[1.5px] text-black" />,
    title: 'Support 24/7',
    subtitle: 'Contact us 24 hours a day',
  },
];

export const FeatureArea = () => {
  return (
    <section className="container">
      <div className="grid grid-cols-2 place-items-center gap-4 pt-12 md:grid-cols-4 md:divide-x-2">
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
