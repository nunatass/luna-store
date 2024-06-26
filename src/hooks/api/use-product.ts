import { config } from '@/common/config';
import { Product, ResponseData } from '@/common/types';
import { API } from '@/lib/axios';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

const BASE_PATH = '/products';

export const keys = {
  all: ['products'],
  bySearchTerm: (searchTerm: string) => [...keys.all, 'searchTerm', searchTerm],
  byCategory: (category: string) => [...keys.all, 'category', category],
  byId: (id: string) => [...keys.all, 'byId', id],
  byTitle: (title: string) => [...keys.all, 'byTitle', title],
};

type CreateProductRequest = {
  title: string;
  description: string;
  category: { id: string };
  medias: string[];
  prices: string[];
};

type UpdateProductRequest = {
  id: string;
  title: string;
  description: string;
  category: { id: string };
  medias: string[];
  prices: string[];
};

export function useCreateProduct() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (product: CreateProductRequest) => {
      const res = await API.post(BASE_PATH, product);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: keys.all,
      });
    },
  });
}

export function useProducts(searchTerm = '', categoryId = '', discount = 0) {
  const params =
    (searchTerm && {
      searchTerm,
    }) ||
    (categoryId && {
      categoryId,
    }) ||
    (discount && {
      discount,
    });

  const { data, ...other } = useInfiniteQuery<ResponseData<Product[]>>({
    queryKey:
      (searchTerm && keys.bySearchTerm(searchTerm)) ||
      (categoryId && keys.byCategory(categoryId)) ||
      keys.all,
    queryFn: async ({ pageParam: page = 0 }) => {
      const res = await API.get(BASE_PATH, {
        params: {
          page,
          limit: config.pageLimit,
          ...params,
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

  return {
    ...other,
    data: data?.pages.flatMap((page) => page.data) || [],
  };
}

export function useProductById(id: string) {
  return useQuery<Product>({
    queryKey: keys.byId(id),
    queryFn: async () => {
      const res = await API.get(`${BASE_PATH}/${id}`);
      return res.data;
    },
  });
}

export function useProductByTitle(title: string) {
  return useQuery<Product>({
    queryKey: keys.byTitle(title),
    queryFn: async () => {
      const res = await API.get(
        `${BASE_PATH}/8966586c-6d2e-4910-9855-29c34d77efb1`,
        {
          params: {
            title,
          },
        }
      );
      return res.data;
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const res = await API.delete(`${BASE_PATH}/${id}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: keys.all,
      });
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updatedProduct: UpdateProductRequest) => {
      const res = await API.put(
        `${BASE_PATH}/${updatedProduct.id}`,
        updatedProduct
      );
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: keys.all,
      });
    },
  });
}
