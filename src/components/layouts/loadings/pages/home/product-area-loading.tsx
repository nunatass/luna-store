import { Skeleton } from '@/components/ui/skeleton';

export function ProductAreaLoading() {
  return (
    <div className="mt-12 flex w-full flex-wrap gap-8">
      {Array.from({ length: 8 }, (_, i) => (
        <Skeleton
          className="h-72 w-40 max-w-80 rounded-none  sm:w-64 md:h-96"
          key={i}
        />
      ))}
    </div>
  );
}
