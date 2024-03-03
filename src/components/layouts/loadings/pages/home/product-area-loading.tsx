import { Skeleton } from '@/components/ui/skeleton';

export function ProductAreaLoading() {
  return (
    <div className="mt-12 flex w-full flex-wrap gap-8">
      {Array.from({ length: 8 }, (_, i) => (
        <Skeleton
          className="h-60  w-40 rounded-none sm:h-[400px] sm:w-64 md:h-96 md:w-80 lg:h-[400px]"
          key={i}
        />
      ))}
    </div>
  );
}
