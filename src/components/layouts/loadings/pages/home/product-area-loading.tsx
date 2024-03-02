import { Skeleton } from '@/components/ui/skeleton';

export function ProductAreaLoading() {
  return (
    <div className="mt-12 flex w-full flex-wrap gap-8">
      {Array.from({ length: 8 }, (_, i) => (
        <Skeleton
          className="h-60 sm:h-[400px] md:h-96 lg:h-[400px] w-40 sm:w-64 md:w-80 flex-col rounded-none"
          key={i}
        />
      ))}
    </div>
  );
}
