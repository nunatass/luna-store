export type Category = {
  name: string;
  id: string;
  total: number;
};

export type Price = {
  id: string;
  value: number;
  discount: number;
  label: string;
};

export type User = {
  id: string;
  name: string;
};

export type Review = {
  id: string;
  email: string;
  name: string;
  rating: number;
  comment: string;
  createdAt: string;
  user: User;
};

export type ImageItem = { img: string; size: number; id: string };

export type Media = {
  id: string;
  url: string;
  ownerId: string;
};
export type Product = {
  id: string;
  title: string;
  description: string;
  category: Category;
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

export type CartProduct = {
  id: string;
  discount: number;
  title: string;
  price: number;
  orderQuantity: number;
  media: string;
};

export type ShippingMethod = 'free' | 'standard' | 'fast';
