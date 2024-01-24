export type Category = {
  name: string;
  id: string;
};

export type Review = {
  id: string;
  productId: string;
  comment: string;
  rating: number;
  createdAt: string;
};

export type ImageItem = { img: string; size: number; id: string };

export type CartProduct = {
  id: string;
  title: string;
  price: number;
  img: string;
  discount: number;
  orderQuantity: number;
};

export type Product = {
  category: Category;
  id: string;
  img: string;
  title: string;
  discount: number;
  reviews: Review[];
  description: string;
  imageURLs: ImageItem[];
  price: number;
};
