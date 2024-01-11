'use client';

import { Search } from '@/components/icons';
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
            className="w-full px-10 py-10 bg-white fixed top-0 left-0 z-50  shadow-sm"
            {...searchBarAnimation}
          >
            <div className="flex flex-col gap-4">
              <form onSubmit={handleSubmit}>
                <div className="flex ring-1 ring-gray-200 px-4">
                  <input
                    onChange={(e) => setSearchText(e.target.value)}
                    value={searchText}
                    type="text"
                    placeholder="Search for product..."
                    className="w-full h-full py-4 outline-none"
                  />
                  <button
                    type="submit"
                    className="text-gray-400 hover:text-black"
                  >
                    <Search />
                  </button>
                </div>
                <div className="mt-4 text-sm">
                  <span>Search by : </span>
                  {categories.map((category, i) => (
                    <a
                      key={category}
                      onClick={() => handleCategory(category)}
                      className="cursor-pointer hover:text-[#be844c] transition-all text-gray-700"
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
