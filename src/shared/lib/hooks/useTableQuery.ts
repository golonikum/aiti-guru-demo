import { useQuery } from "@tanstack/react-query";
import { useCallback, useState } from "react";
import type { PageResponse } from "@/shared/api/types";
import { api } from "@/shared/api/api";

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

  const handleSort = useCallback(
    (field: string) => {
      setPage(1);

      if (sortBy === field) setOrder(order === "asc" ? "desc" : "asc");
      else {
        setSortBy(field);
        setOrder("asc");
      }
    },
    [sortBy, order, setSortBy, setOrder, setPage],
  );

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
    page,
    setPage,
    handleSort,
  };
};
