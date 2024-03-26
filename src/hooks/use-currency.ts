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
  let currency: Currency = defaultCurrency;

  const storedCurrency = localStorage.getItem('currency');
  if (storedCurrency !== null) {
    currency = JSON.parse(storedCurrency);
  }

  const { data, isFetching, isError } = useQuery<ResponseData>({
    queryKey: ['currency'],
    queryFn: async () => {
      const response = await API.get('https://ipapi.co/json', { baseURL: '' });
      return response.data;
    },
  });

  if (isError || isFetching) {
    return currency;
  }

  if (data?.currency === 'EUR') {
    currency = EuroCurrency;
  } else if (data?.currency === 'GBP') {
    currency = GBPCurrency;
  } else if (data?.currency !== 'USA' && data?.continent_code !== 'EU') {
    currency = defaultCurrency;
  }

  localStorage.setItem('currency', JSON.stringify(currency));

  return currency;
}
