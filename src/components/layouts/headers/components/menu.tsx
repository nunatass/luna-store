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
      <ul className="relative flex w-full gap-8 font-medium">
        {menu_data.map((menu) =>
          menu.homes ? (
            <MenuItem
              key={menu.id}
              link={menu.link}
              title={menu.title}
              hasDropdown
              className="group/menu-home"
            >
              <div className="invisible absolute top-14 z-10 h-max w-[80%] bg-white opacity-0  shadow-sm transition-all delay-200 duration-300 ease-in-out group-hover/menu-home:visible group-hover/menu-home:-translate-y-3 group-hover/menu-home:opacity-100 ">
                <div className="flex items-center justify-center gap-3 p-5 ">
                  {instagram_data.map((item) => (
                    <div key={item.link} className="group relative">
                      <Image
                        src={item.img}
                        alt="instagram img"
                        className="max-w relative h-full"
                      />
                      <div className="absolute right-0 top-0 h-full w-full bg-black opacity-0 transition-all duration-300 ease-in-out group-hover:opacity-25" />
                      <div className="-translate-y-[calc(50% - 40px)] transform-all absolute left-1/2 top-1/2 z-20 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-white text-black opacity-0 shadow-sm duration-300 ease-in-out hover:bg-[#821f40] hover:text-white group-hover:-translate-y-[20px] group-hover:opacity-100 ">
                        <a href={item.link} target="_blank" className="">
                          <InstagramIcon className="h-4 w-4" />
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
              <ul className="transform-all invisible absolute left-0 top-14 z-10 flex  h-max justify-between bg-white px-8  py-5 font-normal text-black opacity-0 shadow-sm delay-200 duration-300 ease-in-out group-hover/menu-products:visible group-hover/menu-products:-translate-y-3 group-hover/menu-products:opacity-100 xl:w-[80%]">
                {menu.product_pages.map((product, i) => (
                  <li key={i} className="flex flex-col gap-2.5">
                    <Link
                      href={product.link}
                      className="font-medium hover:text-[#be844c]"
                      aria-label="menu link"
                    >
                      {product.title}
                    </Link>
                    <ul className="flex flex-col gap-2 text-sm">
                      {product.mega_menus.map((menu, i) => (
                        <li key={i} className="hover:text-[#be844c]">
                          <Link href={menu.link} aria-label="menu link">
                            {menu.title}
                          </Link>
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
              <ul className="transform-all invisible absolute top-14 z-10 flex h-max flex-col justify-between  gap-2.5 bg-white px-8 py-6 text-sm font-normal text-black opacity-0 shadow-sm delay-200 duration-300 ease-in-out group-hover/sub_menu:visible group-hover/sub_menu:-translate-y-3 group-hover/sub_menu:opacity-100">
                {menu.sub_menus.map((b, i) => (
                  <li key={i} className="hover:text-[#be844c]">
                    <Link href={b.link} aria-label="menu link">
                      {b.title}
                    </Link>
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
