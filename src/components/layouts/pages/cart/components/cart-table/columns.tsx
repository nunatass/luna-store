'use client';

import type { Product } from '@/common/types';
import { ColumnDef } from '@tanstack/react-table';
import { CartProductCell } from './cart-product-cell';
import { CartProductQuantityCell } from './cart-product-quantity-cell';
import { CartRemoveProductCell } from './cart-remove-product-cell';

export const columns: ColumnDef<Product>[] = [
  {
    header: 'Product',
    cell: ({ row }) => <CartProductCell {...row.original} />,
  },
  {
    header: 'Price',
    cell: ({ row }) => <p>${row.original.price.toFixed(2)}</p>,
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
