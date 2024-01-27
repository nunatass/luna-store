'use client';

import { Button } from '@/components/ui/button';
import { productData } from '@/data/products-data';
import { useFilter } from '@/hooks/use-filter';
import { cn } from '@/lib/utils';
import { useCallback, useMemo } from 'react';
// import { useDispatch } from "react-redux";
// internal
// import ErrorMsg from "@/components/common/error-msg";
// import { useGetShowCategoryQuery } from "@/redux/features/categoryApi";
// import { handleFilterSidebarClose } from "@/redux/features/shop-filter-slice";
// import ShopCategoryLoader from "@/components/loader/shop/shop-category-loader";
type Category = { id: string; name: string; quantity: number };

export const CategoryFilter = () => {
  const { filterCategory, setCategory } = useFilter();

  // const { data: categories, isLoading, isError } = useGetShowCategoryQuery();

  const categories: Category[] = useMemo(() => {
    return productData.data.reduce((result: Category[], product) => {
      const category = product.category;
      const existingCategory = result.find(
        (result) => result.id === category.id
      );

      if (existingCategory) {
        existingCategory.quantity++;
      } else {
        result.push({
          ...category,
          quantity: 1,
        });
      }

      return result;
    }, []);
  }, []);

  const handleSelectCategory = useCallback(
    (name: string) => {
      setCategory(name);
    },
    [setCategory]
  );
  //   // dispatch(handleFilterSidebarClose());
  // };
  // decide what to render
  const renderContent = useCallback(() => {
    // if (isLoading) {
    //   content = <ShopCategoryLoader loading={isLoading}/>;
    // }
    // if (!isLoading && isError) {
    //   content = <ErrorMsg msg="There was an error" />;
    // }
    // if (!isLoading && !isError && categories?.result?.length === 0) {
    //   content = <ErrorMsg msg="No Category found!" />;
    // }

    if (/*!isLoading && !isError && */ categories?.length > 0) {
      return categories.map((item) => (
        <li key={item.id} className="group">
          <Button
            variant="ghost"
            onClick={() => handleSelectCategory(item.name)}
            className={cn(
              'flex w-full items-center justify-between px-1.5 text-sm  text-gray-600 transition-all duration-100 ease-in-out group-hover:bg-white group-hover:text-blue-500',
              filterCategory === item.name && 'font-medium text-blue-500'
            )}
          >
            {item.name}
            <span
              className={cn(
                'rounded-2 flex h-5 min-w-5 items-center justify-center rounded-lg p-1 ring-1 ring-gray-200 transition-all duration-100 ease-in-out group-hover:bg-blue-500 group-hover:text-white group-hover:ring-blue-500',
                filterCategory === item.name &&
                  'bg-blue-500 text-white ring-blue-400'
              )}
            >
              {item.quantity}
            </span>
          </Button>
        </li>
      ));
    }
  }, [filterCategory, categories, handleSelectCategory]);

  return (
    <div className="divide flex flex-col divide-y-[1.5px]">
      <h3 className="text-lg font-medium">Categories</h3>
      <div className="my-2 py-4">
        <ul className="max-h-80 overflow-y-scroll">{renderContent()}</ul>
      </div>
    </div>
  );
};
