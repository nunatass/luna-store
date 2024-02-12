import { Skeleton } from '@/components/ui/skeleton';

export function ProductAreaLoading() {
  return (
    <div className="mt-12 flex flex-wrap gap-8">
      {Array.from({ length: 8 }, (_, i) => (
        <Skeleton
          className="h-96 w-40 max-w-80 rounded-none sm:w-full xl:w-72"
          key={i}
        />
      ))}
    </div>
  );
}
