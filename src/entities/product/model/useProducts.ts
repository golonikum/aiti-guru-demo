import { useQuery } from "@tanstack/react-query";
import { api } from "@/shared/api/api";
import type { ProductsResponse } from "./types";

export const useProducts = (params: {
  search?: string;
  page?: number;
  limit?: number;
  sortBy?: string;
  order?: "asc" | "desc";
}) => {
  const { search = "", page = 1, limit = 20, sortBy = "title", order = "asc" } = params;
  const skip = (page - 1) * limit;

  return useQuery<ProductsResponse>({
    queryKey: ["products", search, page, sortBy, order],
    queryFn: async () => {
      const res = await api.get(
        `/products/search?q=${search}&limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`,
      );
      return res.data;
    },
  });
};
