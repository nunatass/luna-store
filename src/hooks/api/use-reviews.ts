import { config } from '@/common/config';
import { ResponseData, Review } from '@/common/types';
import { API } from '@/lib/axios';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

const BASE_PATH = '/reviews';

const keys = {
  all: ['reviews'],
  byProduct: (productId: string) => [...keys.all, 'products', productId],
  byId: (id: string) => [...keys.all, 'byId', id],
};

type CreateReviewRequest = {
  email: string;
  name: string;
  rating: number;
  comment: string;
  productId: string;
};

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (review: CreateReviewRequest) => {
      const res = await API.post(BASE_PATH, review);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: keys.all,
      });
    },
  });
}

export function useReviewsByProduct(productId: string) {
  return useInfiniteQuery<ResponseData<Review[]>>({
    queryKey: keys.byProduct(productId),
    queryFn: async ({ pageParam: page = 0 }) => {
      const res = await API.get(`${BASE_PATH}/products/${productId}`, {
        params: {
          page,
          limit: config.reviewPageLimit,
        },
      });
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      if (
        !lastPage ||
        lastPage.totalPages === 0 ||
        lastPage.currentPage + 1 === lastPage.totalPages
      ) {
        return undefined;
      }
      return lastPage.currentPage + 1;
    },
    getPreviousPageParam: (firstPage) => {
      if (firstPage.currentPage <= 1) {
        return undefined;
      }
      return firstPage.currentPage - 1;
    },
    initialPageParam: 0,
  });
}
