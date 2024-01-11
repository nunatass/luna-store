import { menu_data } from '@/data/menu-data';
import Image from 'next/image';
// import OfferCouponArea from "@/components/offerHeader/OfferCouponArea";
// import { useGetProductTypeQuery } from "@/redux/features/productApi";
// import { HomeNewArrivalPrdLoader } from "@/components/loader";
// import ErrorMsg from "@/components/common/error-msg";
// import ProductItem from "@/components/products/electronics/product-item";

// internal
import insta_1 from '@/assets/img/instagram/4/instagram-1.jpg';
import insta_3 from '@/assets/img/instagram/4/instagram-3.jpg';
import insta_4 from '@/assets/img/instagram/4/instagram-4.jpg';
import insta_6 from '@/assets/img/instagram/4/instagram-6.jpg';
import { InstagramIcon } from 'lucide-react';
import Link from 'next/link';
import { MenuItem } from './menu-item';

// instagram data
const instagram_data = [
  { id: 1, link: 'https://www.instagram.com/', img: insta_1 },
  { id: 2, link: 'https://www.instagram.com/', img: insta_3 },
  { id: 3, link: 'https://www.instagram.com/', img: insta_4 },
  { id: 4, link: 'https://www.instagram.com/', img: insta_6 },
];
export const Menus = () => {
  // const { data: products, isError, isLoading } = useGetProductTypeQuery({
  //   type: 'electronics',
  //   query: 'new=true'
  // });

  // decide what to render
  // let content = null;

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

  return (
    <nav className="max-w">
      <ul className="flex gap-8 font-medium relative w-full">
        {menu_data.map((menu) =>
          menu.homes ? (
            <MenuItem
              key={menu.id}
              link={menu.link}
              title={menu.title}
              hasDropdown
              className="group/menu-home"
            >
              <div className="absolute bg-white top-14 z-10 shadow-sm h-max w-[80%] opacity-0  invisible group-hover/menu-home:opacity-100 group-hover/menu-home:visible duration-300 transform-all ease-in-out group-hover/menu-home:-translate-y-3 delay-200 ">
                <div className="flex items-center justify-center p-5 gap-3 ">
                  {instagram_data.map((item, i) => (
                    <div key={i} className="relative group">
                      <Image
                        src={item.img}
                        alt="instagram img"
                        className="max-w h-full relative"
                      />
                      <div className="w-full h-full bg-black absolute top-0 right-0 opacity-0 group-hover:opacity-25 ease-in-out transition-all duration-300" />
                      <div className="absolute z-20 top-1/2 left-1/2 bg-white w-14 h-14 -translate-x-1/2 -translate-y-[calc(50% - 40px)] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300 shadow-sm transform-all ease-in-out hover:bg-[#821f40] hover:text-white text-black group-hover:-translate-y-[20px] ">
                        <a href={item.link} target="_blank" className="">
                          <InstagramIcon className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </MenuItem>
          ) : menu.products ? (
            <MenuItem
              key={menu.id}
              link={menu.link}
              title={menu.title}
              hasDropdown
              className="group/menu-products"
            >
              <ul className="absolute bg-white top-14 left-0 z-10 px-8 py-5  shadow-sm h-max xl:w-[80%] opacity-0  invisible group-hover/menu-products:opacity-100 group-hover/menu-products:visible duration-300 transform-all ease-in-out group-hover/menu-products:-translate-y-3 delay-200 flex text-black font-normal justify-between">
                {menu.product_pages.map((product, i) => (
                  <li key={i} className="flex flex-col gap-2.5">
                    <Link
                      href={product.link}
                      className="font-medium hover:text-[#be844c]"
                    >
                      {product.title}
                    </Link>
                    <ul className="text-sm flex flex-col gap-2">
                      {product.mega_menus.map((menu, i) => (
                        <li key={i} className="hover:text-[#be844c]">
                          <Link href={menu.link}>{menu.title}</Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </MenuItem>
          ) : menu.sub_menu ? (
            <MenuItem
              key={menu.id}
              link={menu.link}
              title={menu.title}
              hasDropdown
              className="group/sub_menu"
            >
              <ul className="absolute bg-white top-14 z-10 px-8 py-6 shadow-sm h-max opacity-0  invisible group-hover/sub_menu:opacity-100 group-hover/sub_menu:visible duration-300 transform-all ease-in-out group-hover/sub_menu:-translate-y-3 delay-200 flex flex-col text-black justify-between gap-2.5 text-sm font-normal">
                {menu.sub_menus.map((b, i) => (
                  <li key={i} className="hover:text-[#be844c]">
                    <Link href={b.link}>{b.title}</Link>
                  </li>
                ))}
              </ul>
            </MenuItem>
          ) : (
            <MenuItem key={menu.id} link={menu.link} title={menu.title} />
          )
        )}
      </ul>
    </nav>
  );
};
