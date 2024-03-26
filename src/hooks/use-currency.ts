import { API } from '@/lib/axios';
import { useQuery } from '@tanstack/react-query';

type Currency = {
  currency: string;
  symbol: string;
};

type ResponseData = {
  currency: string;
  continent_code?: string;
};

const defaultCurrency: Currency = {
  currency: 'USD',
  symbol: '$',
};

const EuroCurrency: Currency = {
  currency: 'EUR',
  symbol: '€',
};

const GBPCurrency: Currency = {
  currency: 'GBP',
  symbol: '£',
};

export function useCurrency(): Currency {
  const { data, isPending, isError } = useQuery<ResponseData>({
    queryKey: ['currency'],
    queryFn: async () => {
      const response = await API.get('https://ipapi.co/json', { baseURL: '' });
      return response.data;
    },
  });

  if (isError || isPending) {
    return defaultCurrency;
  }

  if (data?.currency === 'USA') {
    return defaultCurrency;
  }

  if (data?.currency === 'EUR') {
    return EuroCurrency;
  }

  if (data?.currency === 'GBP') {
    return GBPCurrency;
  }

  if (
    data?.currency !== 'USA' &&
    data?.currency !== 'EUR' &&
    data?.currency !== 'GBP'
  ) {
    if (data?.continent_code !== 'EU') {
      return defaultCurrency;
    }

    return EuroCurrency;
  }

  return defaultCurrency;
}
