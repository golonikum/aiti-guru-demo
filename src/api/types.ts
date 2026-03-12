export interface Product {
  id: number;
  title: string;
  price: number;
  category?: string;
  description?: string;
  images?: string[];
  brand: string;
  sku: string;
  rating: number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ApiError {
  response?: {
    data?: {
      message: string;
    };
  };
}
