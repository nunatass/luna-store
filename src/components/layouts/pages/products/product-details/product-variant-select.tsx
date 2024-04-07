import { Variant } from '@/common/types';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

type ProductVariantSelectProps = {
  variants: Variant[];
  onSelectChange: (value: Variant) => void;
  showSelectError?: boolean;
  errorMessage?: boolean;
  className?: string;
};

export function ProductVariantSelect({
  variants,
  onSelectChange,
  showSelectError,
  errorMessage,
  className,
}: ProductVariantSelectProps) {
  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      <Select
        onValueChange={(value) => {
          const variant = variants?.find((v) => v.id === value);
          onSelectChange(variant!);
        }}
      >
        <SelectTrigger
          className={cn('w-full', showSelectError && 'border-red-500')}
        >
          <SelectValue className="text-black" placeholder="Select Size" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sizes</SelectLabel>
            {variants?.map((variant) => (
              <SelectItem key={variant.id} value={variant.id}>
                {variant.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
      {showSelectError && (
        <span className="text-sm text-red-500">
          {errorMessage ?? 'Select Size'}
        </span>
      )}
    </div>
  );
}
