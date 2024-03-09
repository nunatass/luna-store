'use client';

import type { CartProduct } from '@/common/types';
import { formatPriceWithDiscount } from '@/lib/utils';
import { ColumnDef } from '@tanstack/react-table';
import { CartProductCell } from './cart-product-cell';
import { CartProductQuantityCell } from './cart-product-quantity-cell';
import { CartRemoveProductCell } from './cart-remove-product-cell';

export const columns: ColumnDef<CartProduct>[] = [
  {
    header: 'Product',
    cell: ({ row }) => <CartProductCell {...row.original} />,
  },
  {
    header: 'Price',
    cell: ({ row }) => (
      <p>
        $
        {
          formatPriceWithDiscount(
            row.original.price * row.original.orderQuantity,
            row.original.discount
          ).price
        }
      </p>
    ),
  },
  {
    header: 'Quantity',
    cell: ({ row }) => <CartProductQuantityCell id={row.original.id} />,
  },
  {
    id: 'action',
    cell: ({ row }) => <CartRemoveProductCell id={row.original.id} />,
  },
];
