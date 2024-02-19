import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

export const useSearchFormSubmit = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (searchText) {
        const route = `/search?searchText=${searchText}`;
        router.push(route, { scroll: false });
        setSearchText('');
      } else {
        router.push(`/`, { scroll: false });
        setSearchText('');
      }
    },
    [router, searchText]
  );

  return {
    searchText,
    setSearchText,
    handleSubmit,
  };
};
