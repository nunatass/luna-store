import { Skeleton } from '@/components/ui/skeleton';

export function PopularProductsLoading() {
  return (
    <div className="flex gap-8">
      {Array.from({ length: 8 }, (_, i) => (
        <Skeleton
          className="rounded-nonesm:w-80 h-96 w-full min-w-72"
          key={i}
        />
      ))}
    </div>
  );
}
