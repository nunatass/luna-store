import { Price } from '@/common/types';
import { Button } from '@/components/ui/button';
import { cn, formatPrice, formatPriceWithDiscount } from '@/lib/utils';
import { useCallback, useMemo } from 'react';

type PriceBundleProps = {
  prices: Price[];
  selectedPrice: Price;
  onSelectChange: (select: Price) => void;
};
export function PriceBundle({
  prices,
  onSelectChange,
  selectedPrice,
}: PriceBundleProps) {
  const renderPrice = useMemo(() => {
    if (prices[0].discount > 0) {
      return (
        <>
          <span className="text-base	line-through">
            ${formatPrice(prices[0].value)}
          </span>
          <span className="text-2xl font-medium text-black">
            $
            {formatPriceWithDiscount(prices[0].value, prices[0].discount).price}
          </span>
        </>
      );
    }

    return (
      <span className="text-2xl font-medium text-black">
        ${formatPrice(prices[0].value)}
      </span>
    );
  }, [prices]);

  const handleSelectPrice = useCallback((price: Price) => {
    onSelectChange(price);
  }, []);

  if (prices.length > 1) {
    return (
      <div className="flex w-full flex-col gap-6">
        {prices.map((price, index) => (
          <Button
            variant="ghost"
            className={cn(
              'relative flex h-16 w-full items-center px-4 ring-2 ring-primary/60',
              price.id === selectedPrice.id && 'ring-[3px] ring-[#bd844c]'
            )}
            key={price.id}
            onClick={() => {
              handleSelectPrice(price);
            }}
          >
            <div className="flex w-full justify-between">
              <div className="flex flex-col gap-2">
                <span className="text-lg font-semibold">{price.label}</span>
                <span className="text-sm">
                  Saved $
                  {
                    formatPriceWithDiscount(price.value, price.discount)
                      .diference
                  }
                </span>
              </div>
              <div className="flex flex-col items-end gap-2">
                <span className="text-lg font-semibold">
                  ${formatPriceWithDiscount(price.value, price.discount).price}
                </span>
                <span className="text-sm line-through">
                  ${formatPrice(price.value)}
                </span>
              </div>
            </div>
            <div
              className={cn(
                'absolute -top-4 right-2 hidden rounded bg-[#bd844c] px-2 text-white',
                index === 1 && 'block'
              )}
            >
              Most Popular
            </div>
          </Button>
        ))}
      </div>
    );
  }

  return <div className="flex items-center gap-2">{renderPrice}</div>;
}