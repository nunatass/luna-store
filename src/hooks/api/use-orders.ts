import { CartProduct, ShippingMethod } from '@/common/types';
import { API } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const BASE_PATH = '/orders';

const keys = {
  all: ['orders'],
  byId: (id: string) => [...keys.all, 'byId', id],
};

type OrderCheckoutRequest = {
  payload: {
    items: CartProduct[];
    shippingMethod: ShippingMethod;
  };
  token: string;
};

type createOrderRequest = {
  status: 'CHECKOUT' | 'PAYED' | 'SENT' | 'DONE';
  phone: string;
  address: string;
  email: string;
  total: number;
  products: [
    {
      productId: string;
      quantity: number;
    },
  ];
};

export function useOrderCheckout() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderCheckoutRequest: OrderCheckoutRequest) => {
      const res = await API.post('/api/checkout', orderCheckoutRequest, {
        baseURL: '',
      });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['checkout'],
      });
    },

    onError: (err) => {
      console.log(err);
    },
  });
}

export function useUpdateOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (cresteOrderRequest: createOrderRequest) => {
      const res = await API.put(`${BASE_PATH}/`, cresteOrderRequest);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: keys.all,
      });
    },
  });
}
