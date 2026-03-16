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
  thumbnail: string;
};

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductRendererProps {
  record: Product;
}
