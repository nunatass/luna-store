'use client';

import { SearchIcon } from '@/components/icons';
import { AnimatePresence, motion } from 'framer-motion';

import { Form, FormControl, FormField, FormItem } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Overlay from '../../overlay';

type SearchBarProps = {
  isSearchOpen: boolean;
  setIsSearchOpen: (isOpen: boolean) => void;
};
const searchBarAnimation = {
  initial: { y: '-100%' },
  animate: { y: '0' },
  exit: { y: '-100%' },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
};

const FormSchema = z.object({
  searchTerm: z.string().min(1, { message: 'Required' }).trim(),
});

export const SearchBar = ({
  isSearchOpen,
  setIsSearchOpen,
}: SearchBarProps) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: { searchTerm: string }) => {
    setIsSearchOpen(false);
    form.reset();
    router.push(`/products?searchTerm=${data.searchTerm}`, { scroll: false });
  };

  return (
    <>
      <AnimatePresence mode="wait" initial={false}>
        {isSearchOpen && (
          <motion.section
            className="fixed left-0 top-0 z-[9999] w-full bg-white px-10 py-10  shadow-sm"
            {...searchBarAnimation}
          >
            <Form {...form}>
              <div className="flex flex-col gap-4">
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <div className="flex overflow-hidden px-4 ring-1 ring-gray-200">
                    <FormField
                      control={form.control}
                      name="searchTerm"
                      render={({ field }) => (
                        <FormItem className="flex w-full flex-col">
                          <FormControl>
                            <Input
                              placeholder="Search for product..."
                              className="h-full w-full rounded-none border-0 py-4 outline-none focus-visible:outline-none focus-visible:ring-0 "
                              aria-label="input search text"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <button
                      type="submit"
                      className="text-gray-400 hover:text-black"
                      aria-label="search button"
                    >
                      <SearchIcon aria-label="search icon" />
                    </button>
                  </div>
                </form>
              </div>
            </Form>
          </motion.section>
        )}
      </AnimatePresence>

      <Overlay setIsOpen={setIsSearchOpen} isOpen={isSearchOpen} />
    </>
  );
};
