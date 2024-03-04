import { InstagramImageCard } from '@/components/ui/instagram-image-card';
import { instagramAreaData } from '@/data/instagram-data';

export const InstagramArea = () => {
  return (
    <section className="container my-20 hidden md:my-28">
      <div className="mb-6 flex flex-col items-center gap-2 md:mb-12">
        <h3 className="text-center text-3xl font-medium sm:text-5xl">Trends</h3>
        <div>
          <p className="text-center text-gray-600">
            Discover stunning jewelry combinations on our Instagram.
          </p>
          <p className="text-center text-gray-600">
            Elevate your style with us.
          </p>
        </div>
      </div>
      <div className="grid w-full grid-cols-2 gap-4 sm:grid-cols-3 md:flex">
        {instagramAreaData.map((item) => (
          <InstagramImageCard key={item.id} link={item.link} image={item.img} />
        ))}
      </div>
    </section>
  );
};
