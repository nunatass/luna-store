import { CartProduct, ShippingMethod } from '@/common/types';
import { API } from '@/lib/axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';

// const BASE_PATH = '/orders';

const keys = {
  all: ['orders'],
  byId: (id: string) => [...keys.all, 'byId', id],
};

type OrderCheckoutRequest = {
  items: CartProduct[];
  shippingMethod: ShippingMethod;
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
