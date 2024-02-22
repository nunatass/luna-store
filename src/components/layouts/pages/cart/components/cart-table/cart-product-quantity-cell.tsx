'use client';
import { Button } from '@/components/ui/button';
import { useCart } from '@/hooks/use-cart';
import { cn } from '@/lib/utils';
import { MinusIcon, PlusIcon } from 'lucide-react';

type CartProductQuantityCellProps = {
  id: string;
};

export const CartProductQuantityCell = ({
  id,
}: CartProductQuantityCellProps) => {
  const { getQuantity, addQuantity, removeQuantity } = useCart();
  const quantity = getQuantity(id);

  function handleAddQuantity(id: string) {
    addQuantity(id);
  }

  function handleRemoveQuantity(id: string) {
    removeQuantity(id);
  }

  return (
    <div className="flex w-max items-center justify-center gap-2 overflow-hidden ring-[1px] ring-gray-300">
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          'hover:text-[#be844c]',
          quantity === 1 && 'text-gray-400'
        )}
        disabled={quantity === 1}
        onClick={() => handleRemoveQuantity(id)}
      >
        <MinusIcon className="h-4 w-4" />
      </Button>
      <p className="flex items-center justify-center bg-transparent">
        {quantity}
      </p>
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          'hover:text-[#be844c]',
          quantity === 20 && 'text-gray-400'
        )}
        disabled={quantity === 20}
        onClick={() => handleAddQuantity(id)}
      >
        <PlusIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};
