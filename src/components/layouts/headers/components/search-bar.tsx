'use client';

import { SearchIcon } from '@/components/icons';
import { AnimatePresence, motion } from 'framer-motion';

import { useSearchFormSubmit } from '@/hooks/use-search-form-submit';
import Overlay from '../../overlay';

type SearchBarProps = {
  isSearchOpen: boolean;
  setIsSearchOpen: (isOpen: boolean) => void;
};

export const SearchBar = ({
  isSearchOpen,
  setIsSearchOpen,
}: SearchBarProps) => {
  const { setSearchText, setCategory, handleSubmit, searchText } =
    useSearchFormSubmit();

  const handleCategory = (value: string) => {
    setCategory(value);
  };

  const categories = ['electronics', 'fashion', 'beauty', 'jewelry'];
  const searchBarAnimation = {
    initial: { y: '-100%' },
    animate: { y: '0' },
    exit: { y: '-100%' },
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  };
  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {isSearchOpen && (
          <motion.section
            className="fixed left-0 top-0 z-[9999] w-full bg-white px-10 py-10  shadow-sm"
            {...searchBarAnimation}
          >
            <div className="flex flex-col gap-4">
              <form onSubmit={handleSubmit}>
                <div className="flex px-4 ring-1 ring-gray-200">
                  <input
                    onChange={(e) => setSearchText(e.target.value)}
                    value={searchText}
                    type="text"
                    placeholder="Search for product..."
                    className="h-full w-full py-4 outline-none"
                    aria-label="input search text"
                  />
                  <button
                    type="submit"
                    className="text-gray-400 hover:text-black"
                    aria-label="search button"
                  >
                    <SearchIcon aria-label="search icon" />
                  </button>
                </div>
                <div className="mt-4 text-sm">
                  <span>Search by : </span>
                  {categories.map((category, i) => (
                    <a
                      key={category}
                      onClick={() => handleCategory(category)}
                      className="cursor-pointer text-gray-700 transition-all hover:text-[#be844c]"
                      aria-label="category"
                    >
                      {category}
                      {i < categories.length - 1 && ', '}
                    </a>
                  ))}
                </div>
              </form>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <Overlay setIsOpen={setIsSearchOpen} isOpen={isSearchOpen} />
    </>
  );
};
