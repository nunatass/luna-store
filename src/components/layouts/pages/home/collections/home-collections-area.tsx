'use client';
import { ArrowRightLongIcon } from '@/components/icons';
import CollectionsLoading from '@/components/layouts/loadings/pages/home/collections-loading';
import { Button } from '@/components/ui/button';
import { useCollections } from '@/hooks/api/use-collections';
import Link from 'next/link';
import { HomeCollectionsItem } from './components/home-collections-item';

const imageUrlPrefix = process.env.NEXT_PUBLIC_CLOUDFLARE_FILE_URL_START;

export const HomeCollectionsArea = () => {
  const { data: collections, isPending, isError } = useCollections();

  if (isPending) {
    return <CollectionsLoading />;
  }

  if (!isPending && isError) {
    return null;
  }

  const romanceCollection = collections.find(
    (collection) => collection.title === 'Romance'
  );
  const initialCollection = collections.find(
    (collection) => collection.title === 'Initial Pendant Pendant'
  );

  const piercingCollection = collections.find(
    (collection) => collection.title === 'Piercings & Huggies'
  );

  const bestSellers = collections.find(
    (collection) => collection.title === 'Best Sellers'
  );

  if (
    !initialCollection ||
    !romanceCollection ||
    !piercingCollection ||
    !bestSellers
  ) {
    return null;
  }

  return (
    <section className="container">
      <div className="grid grid-cols-1 gap-6 py-16 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-2">
        <div className="sm:col-span-2 md:row-start-1">
          <HomeCollectionsItem
            className="md:h-full"
            image={bestSellers.medias[0].url}
            title={bestSellers.title}
            link={`/collections/${bestSellers.id}`}
          />
        </div>
        <div>
          <HomeCollectionsItem
            className="md:h-full"
            image={piercingCollection.medias[0].url}
            title={piercingCollection.title}
            link={`/collections/${piercingCollection.id}`}
          />
        </div>
        <div>
          <HomeCollectionsItem
            className="md:h-full"
            image={initialCollection.medias[0].url}
            title={initialCollection.title}
            link={`/collections/${initialCollection.id}`}
          />
        </div>
        <Link
          className="relative mt-6 flex h-[470px] w-full justify-between overflow-hidden bg-black px-14 py-14 sm:col-span-2 sm:h-[494px] md:col-span-2 md:row-span-2 md:row-start-1 md:mr-6 md:mt-0 md:h-[600px]"
          href={`/collections/${romanceCollection.id}`}
        >
          <div
            className="absolute left-0 top-0 z-0 h-full w-full bg-cover bg-[1%] bg-no-repeat transition-all duration-300 ease-in-out hover:scale-110"
            style={{
              backgroundImage: `url(${imageUrlPrefix}/${romanceCollection.medias[0].url})`,
            }}
          />
          <div className="z-10 flex w-max flex-col justify-end text-black">
            <span className="text-base">Collection</span>
            <h3 className="text-4xl uppercase">
              <Link href="/shop">{romanceCollection.title}</Link>
            </h3>
            <Button className="mt-2" asChild>
              <Link
                href={`/collections/${romanceCollection.id}`}
                className="flex items-center justify-center gap-2"
              >
                Shop Now <ArrowRightLongIcon />
              </Link>
            </Button>
          </div>
        </Link>
      </div>
    </section>
  );
};
