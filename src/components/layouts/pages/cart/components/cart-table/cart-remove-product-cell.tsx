'use client';
import { TrashIcon } from '@/components/icons/trash';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';

type CartRemoveProductCellProps = {
  id: string;
};

export const CartRemoveProductCell = ({ id }: CartRemoveProductCellProps) => {
  const { removeProduct } = useCart();

  function handelRemoveProduct(id: string) {
    removeProduct(id);
  }

  return (
    <Button
      variant="ghost"
      className="flex items-center gap-2 hover:text-red-400"
      onClick={() => handelRemoveProduct(id)}
    >
      <TrashIcon /> remove
    </Button>
  );
};
