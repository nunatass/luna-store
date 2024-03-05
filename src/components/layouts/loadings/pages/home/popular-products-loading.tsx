import { Skeleton } from '@/components/ui/skeleton';

export function PopularProductsLoading() {
  return (
    <div className="flax-wrap flex gap-4">
      {Array.from({ length: 8 }, (_, i) => (
        <Skeleton
          key={i}
          className="h-60 w-40 rounded-none  sm:h-[400px] sm:w-64 md:h-96 md:w-80 lg:h-[400px]"
        />
      ))}
    </div>
  );
}
