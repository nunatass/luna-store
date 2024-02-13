import { Skeleton } from '@/components/ui/skeleton';

export function ProductsAreaLoading() {
  return Array.from({ length: 8 }, (_, i) => (
    <Skeleton key={i} className="h-96 w-40 max-w-80 rounded-none sm:w-full" />
  ));
}
