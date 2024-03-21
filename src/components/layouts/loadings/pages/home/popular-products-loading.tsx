import { Skeleton } from '@/components/ui/skeleton';

export function PopularProductsLoading() {
  return (
    <div className="flex gap-8">
      {Array.from({ length: 8 }, (_, i) => (
        <Skeleton
          className="h-96 w-full min-w-72 rounded-none sm:w-80"
          key={i}
        />
      ))}
    </div>
  );
}
