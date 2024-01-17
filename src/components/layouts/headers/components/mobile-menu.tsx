import { instagramMenuData } from '@/data/instagram-data';
import { mobileMenuData } from '@/data/menu-data';

import Link from 'next/link';
// import ProductItem from "../products/electronics/product-item";
// import ErrorMsg from "./error-msg";
// import { HomeNewArrivalPrdLoader } from "../loader";
// import { useGetProductTypeQuery } from "@/redux/features/productApi";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { InstagramImageCard } from '@/components/ui/instagram-image-card';

export const MobileMenus = () => {
  //const [isActiveMenu, setIsActiveMenu] = useState('');

  // const { data: products, isError, isLoading } = useGetProductTypeQuery({
  //   type: 'electronics',
  //   query: 'new=true'
  // });

  // decide what to render
  // const content = null;

  // if (isLoading) {
  //   content = (
  //     <HomeNewArrivalPrdLoader loading={isLoading} />
  //   );
  // }

  // if (!isLoading && isError) {
  //   content = <ErrorMsg msg="There was an error" />;
  // }

  // if (!isLoading && !isError && products?.data?.length === 0) {
  //   content = <ErrorMsg msg="No Products found!" />;
  // }

  // if (!isLoading && !isError && products?.data?.length > 0) {
  //   const product_items = products.data;

  //   content = (
  //     <div className="row">
  //       {product_items.slice(0, 4).map((item) => (
  //         <div key={item._id} className="col-md-3">
  //           <ProductItem product={item} />
  //         </div>
  //       ))}
  //     </div>
  //   );
  // } else {
  //   // If there are no products or an error occurs, set content to an empty array
  //   content = [];
  // }

  // handleOpenSubMenu
  // const handleOpenSubMenu = (title) => {
  //   if(title === isActiveMenu){
  //     setIsActiveMenu("")
  //   }
  //   else {
  //     setIsActiveMenu(title)
  //   }
  // }
  return (
    <>
      <nav className="tp-main-menu-content">
        {mobileMenuData.map((menu) => (
          <ul key={menu.id}>
            {menu.homes ? (
              <Accordion
                type="single"
                collapsible
                className="w-full h-full px-4"
              >
                <AccordionItem value="item-1" className="border-0">
                  <AccordionTrigger className="font-normal hover:text-blue-500">
                    Home
                  </AccordionTrigger>
                  <AccordionContent className="w-full grid grid-cols-2 gap-2">
                    {instagramMenuData.map((item) => (
                      <InstagramImageCard
                        key={item.id}
                        link={item.link}
                        image={item.img}
                      />
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : menu.sub_menu ? (
              <Accordion
                type="single"
                collapsible
                className="w-full h-full px-4"
              >
                <AccordionItem
                  key={menu.title}
                  value={menu.title}
                  className="border-0"
                >
                  <AccordionTrigger className="font-normal hover:text-blue-500">
                    {menu.title}
                  </AccordionTrigger>
                  <AccordionContent className="font-normal flex flex-col gap-4 divide-y">
                    {menu.sub_menus.map((subMenu) => (
                      <Link
                        key={subMenu.title}
                        href={subMenu.link}
                        className="pt-4 hover:text-blue-500"
                        aria-label="menu link"
                      >
                        {subMenu.title}
                      </Link>
                    ))}
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <li key={menu.id} className="px-4 pt-4 hover:text-blue-500">
                <Link href={menu.link} aria-label="menu link">
                  {menu.title}
                </Link>
              </li>
            )}
          </ul>
        ))}
      </nav>
    </>
  );
};
