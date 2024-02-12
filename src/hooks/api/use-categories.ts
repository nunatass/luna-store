import { config } from '@/common/config';
import { Category, ResponseData } from '@/common/types';
import { API } from '@/lib/axios';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

const BASE_PATH = '/categories';

const keys = {
  all: ['category'],
  byId: (id: string) => [...keys.all, 'byId', id],
  page: (page: number, limit: number) => [...keys.all, 'page', { page, limit }],
};

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (category: { name: string }) => {
      const res = await API.post(BASE_PATH, category);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: keys.all,
      });
    },
  });
}

export function useCategories() {
  const { data, ...other } = useInfiniteQuery<ResponseData<Category[]>>({
    queryKey: keys.all,
    queryFn: async ({ pageParam: page = 0 }) => {
      const res = await API.get(BASE_PATH, {
        params: {
          page,
          limit: config.pageLimit,
        },
      });
      return res.data;
    },
    getNextPageParam: (lastPage) => {
      if (
        !lastPage ||
        lastPage.totalPages === 0 ||
        lastPage.currentPage === lastPage.totalPages
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
    data: data?.pages.flatMap((page) => page.data) || [],
    ...other,
  };
}

export function useDeleteCategory() {
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

export function useUpdateCategory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ name, id }: Category) => {
      const res = await API.put(`${BASE_PATH}/${id}`, { name });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: keys.all,
      });
    },
  });
}
