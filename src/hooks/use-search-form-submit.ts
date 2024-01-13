import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';

export const useSearchFormSubmit = () => {
  const router = useRouter();
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if (searchText) {
        let route = `/search?searchText=${searchText}`;

        if (category && category !== 'Select Category') {
          route += `&productType=${category}`;
          setCategory('');
        }

        router.push(route, { scroll: false });
        setSearchText('');
      } else {
        router.push(`/`, { scroll: false });
        setSearchText('');
        setCategory('');
      }
    },
    [category, router, searchText]
  );

  return {
    searchText,
    category,
    setSearchText,
    setCategory,
    handleSubmit,
  };
};
