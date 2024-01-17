import { InstagramImageCard } from '@/components/ui/instagram-image-card';
import { instagramAreaData } from '@/data/instagram-data';

export const InstagramArea = () => {
  return (
    <section className="container my-20 md:my-28">
      <div className="flex flex-col items-center mb-6 md:mb-12 gap-2">
        <h3 className="font-medium text-3xl sm:text-5xl text-center">Trends</h3>
        <p className="text-gray-600">
          Discover stunning jewelry combinations on our Instagram. Elevate your
          style with us.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:flex gap-4 w-full">
        {instagramAreaData.map((item) => (
          <InstagramImageCard key={item.id} link={item.link} image={item.img} />
        ))}
      </div>
    </section>
  );
};
