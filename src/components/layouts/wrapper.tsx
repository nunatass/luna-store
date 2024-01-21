import { cn } from '@/lib/utils';

//import { ToastContainer } from "react-toastify";

// internal
//import BackToTopCom from "@/components/common/back-to-top";
//import ProductModal from "@/components/common/product-modal";
// import {
//   get_cart_products,
//   initialOrderQuantity,
// } from "@/redux/features/cartSlice";
// import { get_wishlist_products } from "@/redux/features/wishlist-slice";
// import { get_compare_products } from "@/redux/features/compareSlice";
// import useAuthCheck from "@/hooks/use-auth-check";
// import Loader from "@/components/loader/loader";
type WrapperProps = {
  children: React.ReactNode;
  className?: string;
};
export const Wrapper = ({ children, className }: WrapperProps) => {
  // const { productItem } = useSelector((state) => state.productModal);
  // const dispatch = useDispatch();
  // const authChecked = useAuthCheck();
  // useEffect(() => {
  //   dispatch(get_cart_products());
  //   dispatch(get_wishlist_products());
  //   dispatch(get_compare_products());
  //   dispatch(initialOrderQuantity());
  // }, [dispatch]);
  // return !authChecked ? (
  //   <div
  //     className="d-flex align-items-center justify-content-center"
  //     style={{ height: '100vh' }}
  //   >
  //     <Loader spinner="fade" loading={!authChecked} />
  //   </div>
  // ) : (
  //   <div id="wrapper">
  //     {children}
  //     <BackToTopCom />
  //     <ToastContainer />
  //     {/* product modal start */}
  //     {productItem && <ProductModal />}
  //     {/* product modal end */}
  //   </div>
  // );
  return (
    <main className={cn('h-max min-h-screen overflow-x-hidden', className)}>
      {children}
    </main>
  );
};
