'use client';
import CollectionsLoading from '@/components/layouts/loadings/pages/home/collections-loading';
import { useCollections } from '@/hooks/api/use-collections';
import Image from 'next/image';
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

  const collectionOne = collections.find(
    (collection) => collection.subtitle === 'collectionOne'
  );

  const collectionTow = collections.find(
    (collection) => collection.subtitle === 'collectionTow'
  );

  if (!collectionOne || !collectionTow) {
    return null;
  }

  return (
    <section className="container">
      <div className="grid grid-cols-1 gap-6 py-16 md:grid-cols-2">
        <Link
          className="relative mt-6 flex h-[360px] w-full justify-between overflow-hidden bg-gray-400/20 px-14 py-14 md:h-[500px]"
          aria-label="collection"
          href={`/collections/${collectionOne.id}`}
        >
          <Image
            fill
            alt="collection image"
            className="object-cover transition-all duration-300 ease-in-out hover:scale-110"
            src={`${imageUrlPrefix}/${collectionOne.medias[0].url}`}
          />
          <div className="z-10 flex w-max flex-col justify-end text-black">
            <span className="text-base">Collection</span>
            <h3 className="text-2xl md:text-4xl md:uppercase ">
              {collectionOne.title}
            </h3>
          </div>
        </Link>
        <Link
          className="relative mt-6 flex h-[360px] w-full justify-between overflow-hidden bg-gray-400/20 px-14 py-14 md:h-[500px]"
          aria-label="collection"
          href={`/collections/${collectionTow.id}`}
        >
          <Image
            fill
            alt="collection image"
            className="object-cover transition-all duration-300 ease-in-out hover:scale-110"
            src={`${imageUrlPrefix}/${collectionTow.medias[0].url}`}
          />
          <div className="z-10 flex w-max flex-col justify-end text-black">
            <span className="text-base">New Collection</span>
            <h3 className="text-2xl md:text-4xl md:uppercase ">
              {collectionTow.title}
            </h3>
          </div>
        </Link>
      </div>
    </section>
  );
};
