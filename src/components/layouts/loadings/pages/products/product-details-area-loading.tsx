import { Skeleton } from '@/components/ui/skeleton';

export function ProductDetailsAreaLoading() {
  return (
    <section className="container pb-20 pt-8">
      <div className="flex flex-col gap-14 md:flex-row xl:gap-20">
        <Skeleton className=" h-[400px] sm:h-[500px] sm:w-[85%] md:w-[50vw] lg:h-[600px] lg:w-[500px] xl:w-[580px]" />

        <div className="flex w-full flex-col gap-4 md:w-[40%]">
          <div className="flex flex-col gap-4">
            <Skeleton className="h-5 w-[70%]" />
            <Skeleton className="h-4 w-[50%]" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="w-30 h-4" />
          </div>

          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[70%]" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-[60%]" />
          </div>

          <div className="flex flex-col gap-4">
            <Skeleton className="h-14 w-full rounded-none" />
            <Skeleton className="h-14 w-full rounded-none" />
          </div>

          <div className="flex flex-col gap-4">
            <Skeleton className="h-5 w-[50%]" />
            <Skeleton className="h-4 w-[50%]" />
            <Skeleton className="h-24 w-full rounded-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
