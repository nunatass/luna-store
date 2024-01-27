'use client';

import { Slider } from '@/components/ui/slider';
import { useFilter } from '@/hooks/use-filter';

type PriceFilterProps = {
  handleChanges: (value: number) => void;
  maxValue: number;
  minValue: number;
  step: number;
};

export const PriceFilter = ({
  handleChanges,
  maxValue = 100,
  minValue = 0,
  step = 1,
}: PriceFilterProps) => {
  const { filterPrice } = useFilter();
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-lg font-medium">Price Filter</h3>
      <Slider
        defaultValue={[filterPrice]}
        max={maxValue}
        min={minValue}
        step={step}
        onValueChange={(values) => handleChanges(values[0])}
        value={[filterPrice]}
      />
      <div className="flex w-full justify-between">
        <span className="text-md text-gray-600">${minValue}</span>
        <span className="text-md text-gray-600">${filterPrice}</span>
      </div>
    </div>
  );
};
