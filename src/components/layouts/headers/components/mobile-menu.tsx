import { mobile_menu } from '@/data/menu-data';
import Image from 'next/image';
import Link from 'next/link';
// import ProductItem from "../products/electronics/product-item";
// import ErrorMsg from "./error-msg";
// import { HomeNewArrivalPrdLoader } from "../loader";
// import { useGetProductTypeQuery } from "@/redux/features/productApi";
// internal
import insta_1 from '@/assets/img/instagram/4/instagram-1.jpg';
import insta_3 from '@/assets/img/instagram/4/instagram-3.jpg';
import insta_4 from '@/assets/img/instagram/4/instagram-4.jpg';
import insta_6 from '@/assets/img/instagram/4/instagram-6.jpg';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { InstagramIcon } from 'lucide-react';

// instagram data
const instagram_data = [
  { id: 1, link: 'https://www.instagram.com/', img: insta_1 },
  { id: 2, link: 'https://www.instagram.com/', img: insta_3 },
  { id: 3, link: 'https://www.instagram.com/', img: insta_4 },
  { id: 4, link: 'https://www.instagram.com/', img: insta_6 },
];
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
        {mobile_menu.map((menu, i) => (
          <ul key={i}>
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
                  <AccordionContent className="w-full grid  grid-cols-2 gap-2">
                    {instagram_data.map((item, i) => (
                      <div key={i} className="relative group">
                        <Image
                          src={item.img}
                          alt="instagram img"
                          className="max-w h-full relative"
                        />
                        <div className="w-full h-full bg-black absolute top-0 right-0 opacity-0 group-hover:opacity-25 ease-in-out transition-all duration-300" />
                        <div className="absolute z-20 top-1/2 left-1/2 bg-white w-14 h-14 -translate-x-1/2 -translate-y-[calc(50% - 40px)] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300 shadow-sm transform-all ease-in-out hover:bg-[#821f40] hover:text-white text-black group-hover:-translate-y-[20px] ">
                          <a
                            href={item.link}
                            target="_blank"
                            aria-label="instagram link"
                          >
                            <InstagramIcon
                              className="w-4 h-4"
                              aria-label="instagram icon"
                            />
                          </a>
                        </div>
                      </div>
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
                <AccordionItem key={i} value={menu.title} className="border-0">
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
