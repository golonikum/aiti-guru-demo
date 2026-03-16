import type { PageResponse } from "@/shared/api/types";

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

export interface ProductsResponse extends PageResponse {
  products: Product[];
}
