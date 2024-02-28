'use client';
import CollectionsLoading from '@/components/layouts/loadings/pages/home/collections-loading';
import { useCollections } from '@/hooks/api/use-collections';
import Link from 'next/link';

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
      <div className="grid grid-cols-1 gap-6 py-16 md:grid-cols-2">
        <Link
          className="relative mt-6 flex h-[360px] w-full justify-between overflow-hidden bg-black px-14 py-14 md:h-[500px]"
          aria-label="collection"
          href={`/collections/${romanceCollection.id}`}
        >
          <div
            className="absolute left-0 top-0 z-0 h-full w-full bg-cover bg-[1%] bg-no-repeat transition-all duration-300 ease-in-out hover:scale-110"
            style={{
              backgroundImage: `url(${imageUrlPrefix}/${bestSellers.medias[0].url})`,
            }}
          />
          <div className="z-10 flex w-max flex-col justify-end text-black">
            <span className="text-base">Collection</span>
            <h3 className="text-4xl uppercase">{romanceCollection.title}</h3>
          </div>
        </Link>
        <Link
          className="relative mt-6 flex h-[360px] w-full justify-between overflow-hidden bg-black px-14 py-14 md:h-[500px]"
          aria-label="collection"
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
            <h3 className="text-4xl uppercase">{romanceCollection.title}</h3>
          </div>
        </Link>
      </div>
    </section>
  );
};
