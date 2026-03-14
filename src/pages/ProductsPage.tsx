import { useCallback, useState } from "react";
import type { Product, ProductsResponse } from "../api/types";
import { useDebounce } from "../hooks/useDebounce";
import { Table } from "../components/Table";
import { PageHeader } from "../components/PageHeader";
import { TableToolbar } from "../components/TableToolbar";
import { useToast } from "../hooks/useToast";
import { useTableQuery } from "../hooks/useTableQuery";
import { TablePagination } from "../components/TablePagination";
import { PageProgressBar } from "../components/PageProgressBar";
import { PageTableLayout } from "../components/PageTableLayout";
import { NewProductDialog } from "../components/NewProductDialog";
import RefreshIcon from "../assets/ArrowsClockwise.svg?react";
import PlusCircle from "../assets/PlusCircle.svg?react";

const PAGE_SIZE = 20;

export const ProductsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { setToast, toastJsx } = useToast();
  const {
    data,
    sortBy,
    setOrder,
    order,
    setSortBy,
    setSearch,
    page,
    setPage,
    isLoading,
    refetch,
  } = useTableQuery<ProductsResponse>({
    apiUrl: "/products/search",
    queryKey: "products",
    limit: PAGE_SIZE,
  });

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

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      setPage(1);
    },
    [setSearch, setPage],
  );

  const handleSearchDebounced = useDebounce(handleSearch);

  return (
    <div className="h-screen overflow-hidden bg-gray-50 flex flex-col gap-[30px] pt-[20px]">
      {toastJsx}

      <PageProgressBar isLoading={isLoading} />

      <PageHeader title="Товары" onSearch={handleSearchDebounced} />

      <PageTableLayout
        header={
          <TableToolbar
            title="Все позиции"
            actions={[
              <button
                key="refresh"
                onClick={() => {
                  setPage(1);
                  refetch();
                }}
                className="p-[10px] hover:bg-gray-100 border border-[var(--color-gray-2)] rounded rounded-[8px] cursor-pointer"
              >
                <RefreshIcon className="w-[22px] h-[22px]" />
              </button>,
              <button
                key="add"
                className="flex items-center gap-[15px] bg-[#242EDB] text-[var(--color-soft-green)] px-5 py-[10px] rounded rounded-[6px] hover:bg-blue-700 cursor-pointer"
                onClick={() => setIsDialogOpen(true)}
              >
                <PlusCircle className="w-[22px] h-[22px]" /> Добавить
              </button>,
            ]}
          />
        }
        body={
          <Table<Product>
            data={data?.products || []}
            columns={[
              { name: "[checkbox]" },
              { name: "title", label: "Наименование" },
              { name: "brand", label: "Вендор" },
              { name: "sku", label: "Артикул" },
              { name: "rating", label: "Оценка", sortable: true },
              { name: "price", label: "Цена, ₽", sortable: true },
              { name: "[actions]" },
            ]}
            onSort={handleSort}
          />
        }
        footer={
          <TablePagination
            limit={PAGE_SIZE}
            page={page}
            setPage={setPage}
            total={data?.total}
          />
        }
      />

      <NewProductDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSuccess={(name: string) => {
          setToast(`Товар "${name}" успешно добавлен!`);
        }}
      />
    </div>
  );
};
