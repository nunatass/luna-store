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

  const { data, isPending, isError } = useQuery<ResponseData>({
    queryKey: ['currency'],
    queryFn: async () => {
      const storedCurrency = localStorage.getItem('currency');
      if (storedCurrency !== null) {
        return JSON.parse(storedCurrency);
      }
      const response = await API.get('https://ipapi.co/json', { baseURL: '' });
      return response.data;
    },
  });

  if (isError || isPending) {
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
