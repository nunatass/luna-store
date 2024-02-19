import { config } from '@/common/config';
import { Collection, ResponseData } from '@/common/types';
import { API } from '@/lib/axios';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

const BASE_PATH = '/collections';

const keys = {
  all: ['collections'],
  byId: (id: string) => [...keys.all, 'byId', id],
};

type CreateCollectionRequest = {
  title: string;
  subtitle: string;
  medias: string[];
  products: string[];
};

type UpdateCollectionRequest = {
  id: string;
  title: string;
  subtitle: string;
  medias: string[];
  products: string[];
};

export function useCreateCollections() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (collection: CreateCollectionRequest) => {
      const res = await API.post(BASE_PATH, collection);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: keys.all,
      });
    },
  });
}

export function useCollections() {
  const { data, ...other } = useInfiniteQuery<ResponseData<Collection[]>>({
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

export function useDeleteCollection() {
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

export function useUpdateCollection() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (updateCollectionRequest: UpdateCollectionRequest) => {
      const res = await API.put(
        `${BASE_PATH}/${updateCollectionRequest.id}`,
        updateCollectionRequest
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

export function useCollectionById(id: string) {
  return useQuery<Collection>({
    queryKey: keys.byId(id),
    queryFn: async () => {
      const res = await API.get(`${BASE_PATH}/${id}`);
      return res.data;
    },
  });
}
