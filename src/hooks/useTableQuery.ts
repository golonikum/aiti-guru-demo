import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import type { PageResponse } from "../api/types";
import { api } from "../api/api";

export const useTableQuery = <T extends PageResponse>({
  queryKey,
  apiUrl,
  limit = 20,
}: {
  queryKey: string;
  apiUrl: string;
  limit?: number;
}) => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("title");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const { data, isLoading, refetch } = useQuery<T>({
    queryKey: [queryKey, search, page, sortBy, order],
    queryFn: async () => {
      const skip = (page - 1) * limit;
      const res = await api.get(
        `${apiUrl}?q=${search}&limit=${limit}&skip=${skip}&sortBy=${sortBy}&order=${order}`,
      );
      return res.data;
    },
  });

  return {
    data,
    isLoading,
    refetch,
    search,
    setSearch,
    sortBy,
    setSortBy,
    order,
    setOrder,
    page,
    setPage,
  };
};
