export type Product = {
  id: number;
  title: string;
  price: number;
  category?: string;
  description?: string;
  images?: string[];
  brand: string;
  sku: string;
  rating: number;
};

export interface PageResponse {
  total: number;
  skip: number;
  limit: number;
}
export interface ProductsResponse extends PageResponse {
  products: Product[];
}

export interface ApiError {
  response?: {
    data?: {
      message: string;
    };
  };
}
