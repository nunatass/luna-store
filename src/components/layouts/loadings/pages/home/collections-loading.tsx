import { Skeleton } from '@/components/ui/skeleton';

export default function CollectionsLoading() {
  return (
    <section className="container">
      <div className="grid grid-cols-1 gap-6 py-16 sm:grid-cols-2 md:grid-cols-4 md:grid-rows-2">
        <div className="sm:col-span-2 md:row-start-1">
          <Skeleton className="h-64 w-full" />
        </div>
        <div>
          <Skeleton className="h-64 w-full" />
        </div>
        <div>
          <Skeleton className="h-64 w-full" />
        </div>
        <Skeleton className="relative mt-6 flex h-[470px] w-full px-14 py-14 sm:col-span-2 sm:h-[494px] md:col-span-2 md:row-span-2 md:row-start-1 md:mr-6 md:mt-0 md:h-[600px]" />
      </div>
    </section>
  );
}
