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

type ProductVariantSelectProps = {
  variants: Variant[];
  onSelectChange: (value: Variant) => void;
};

export function ProductVariantSelect({
  variants,
  onSelectChange,
}: ProductVariantSelectProps) {
  return (
    <Select
      onValueChange={(value) => {
        const variant = variants?.find((v) => v.id === value);
        onSelectChange(variant!);
      }}
    >
      <SelectTrigger className="w-full">
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
  );
}
