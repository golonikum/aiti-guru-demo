import { useCallback, useState } from "react";
import { useProducts } from "@/entities/product";

export const useProductsList = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("title");
  const [order, setOrder] = useState<"asc" | "desc">("asc");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const { data, isLoading, refetch } = useProducts({
    search,
    page,
    limit: 20,
    sortBy,
    order,
  });

  const handleSort = useCallback(
    (field: string) => {
      setPage(1);
      if (sortBy === field) {
        setOrder(order === "asc" ? "desc" : "asc");
      } else {
        setSortBy(field);
        setOrder("asc");
      }
    },
    [sortBy, order],
  );

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      setPage(1);
    },
    [],
  );

  const handleRefresh = useCallback(() => {
    setPage(1);
    refetch();
  }, [refetch]);

  const onSelectItem = useCallback((id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  }, []);

  const onSelectAll = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const select = e.target.checked;
      setSelectedIds(
        select ? (data?.products || []).map((item) => item.id) : [],
      );
    },
    [data],
  );

  return {
    data,
    isLoading,
    search,
    setSearch,
    page,
    setPage,
    sortBy,
    order,
    handleSort,
    handleSearch,
    handleRefresh,
    selectedIds,
    setSelectedIds,
    onSelectItem,
    onSelectAll,
    refetch,
  };
};
