export type Review = {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  rating: number;
  thumbnail: string;
  description?: string;
  discountPercentage?: number;
  images?: string[];
  brand?: string;
  category?: string;
  stock?: number;
  tags?: string[];
  sku?: string;
  warrantyInformation?: string;
  shippingInformation?: string;
  returnPolicy?: string;
  reviews?: Review[];
};
