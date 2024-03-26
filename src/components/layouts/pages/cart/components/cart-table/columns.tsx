'use client';

import type { CartProduct } from '@/common/types';
import { ColumnDef } from '@tanstack/react-table';
import CartPriceCell from './cart-price-cell';
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
    cell: ({ row }) => <CartPriceCell {...row.original} />,
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
