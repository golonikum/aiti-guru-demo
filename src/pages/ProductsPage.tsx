import { useCallback, useState } from "react";
import type { Product, ProductsResponse } from "@/api/types";
import { useDebounce } from "@/hooks/useDebounce";
import { Table } from "@/components/Table";
import { PageHeader } from "@/components/PageHeader";
import { TableToolbar } from "@/components/TableToolbar";
import { useToast } from "@/hooks/useToast";
import { useTableQuery } from "@/hooks/useTableQuery";
import { TablePagination } from "@/components/TablePagination";
import { PageProgressBar } from "@/components/PageProgressBar";
import { PageTableLayout } from "@/components/PageTableLayout";
import { NewProductDialog } from "@/components/NewProductDialog";
import RefreshIcon from "@/assets/ArrowsClockwise.svg?react";
import PlusCircle from "@/assets/PlusCircle.svg?react";
import {
  ActionsRenderer,
  BrandRenderer,
  PriceRenderer,
  RatingRenderer,
  SkuRenderer,
  TitleRenderer,
} from "@/components/Table/renderers";

const PAGE_SIZE = 20;

export const ProductsPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { setToast, toastJsx } = useToast();
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const { data, setSearch, page, setPage, isLoading, refetch, handleSort } =
    useTableQuery<ProductsResponse>({
      apiUrl: "/products/search",
      queryKey: "products",
      limit: PAGE_SIZE,
    });

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

  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(e.target.value);
      setPage(1);
    },
    [setSearch, setPage],
  );

  const handleRefresh = useCallback(() => {
    setPage(1);
    refetch();
  }, [setPage, refetch]);

  const handleSearchDebounced = useDebounce(handleSearch);

  return (
    <div className="h-screen overflow-hidden bg-gray-102 flex flex-col gap-[30px] pt-[20px]">
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
                onClick={handleRefresh}
                className="p-[10px] hover:bg-gray-100 border border-gray-101 rounded rounded-[8px] cursor-pointer"
              >
                <RefreshIcon className="w-[22px] h-[22px]" />
              </button>,
              <button
                key="add"
                className="font-['Manrope'] flex items-center gap-[15px] bg-blue-700 text-gray-50 px-5 py-[10px] rounded rounded-[6px] hover:bg-blue-700 cursor-pointer"
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
              {
                name: "title",
                label: "Наименование",
                align: "left",
                ColumnRenderer: TitleRenderer,
              },
              { name: "brand", label: "Вендор", ColumnRenderer: BrandRenderer },
              { name: "sku", label: "Артикул", ColumnRenderer: SkuRenderer },
              {
                name: "rating",
                label: "Оценка",
                sortable: true,
                ColumnRenderer: RatingRenderer,
              },
              {
                name: "price",
                label: "Цена, ₽",
                sortable: true,
                ColumnRenderer: PriceRenderer,
              },
              { name: "[actions]", ColumnRenderer: ActionsRenderer },
            ]}
            onSort={handleSort}
            onSelectRow={onSelectItem}
            onSelectAll={onSelectAll}
            selectedIds={selectedIds}
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
