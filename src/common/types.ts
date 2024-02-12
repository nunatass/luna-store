export type Category = {
  name: string;
  id: string;
};

export type Price = {
  id: string;
  value: number;
  discount: number;
  label: string;
};

export type Review = {
  id: string;
  productId: string;
  comment: string;
  rating: number;
  createdAt: string;
};

export type ImageItem = { img: string; size: number; id: string };

export type Media = {
  id: string;
  url: string;
  ownerId: string;
};

export type CartProduct = {
  id: string;
  title: string;
  price: number;
  media: string;
  discount: number;
  orderQuantity: number;
};

export type Product = {
  id: string;
  title: string;
  description: string;
  category: Category;
  reviews: Review[];
  prices: Price[];
  medias: Media[];
};

export type Collection = {
  id: string;
  title: string;
  subtitle: string;
  medias: Media[];
  products: Product[];
};

export type ResponseData<T> = {
  totalItems: number;
  data: T;
  totalPages: number;
  currentPage: number;
};
