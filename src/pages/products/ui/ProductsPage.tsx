import { useCallback } from "react";
import { PageHeader } from "@/shared/ui/PageHeader";
import { useDebounce, useToast } from "@/shared/lib/hooks";
import { ProductsList } from "@/features/products-list";
import { PageProgressBar } from "@/features/page-progress-bar";
import { useProductsList } from "@/features/products-list/model/useProductsList";

export const ProductsPage = () => {
  const { setToast, toastJsx } = useToast();

  const {
    data,
    isLoading,
    handleSearch,
    handleRefresh,
    handleSort,
    onSelectItem,
    onSelectAll,
    page,
    setPage,
    selectedIds,
  } = useProductsList();

  const handleSearchDebounced = useDebounce(handleSearch);

  const handleAddSuccess = useCallback(
    (name: string) => {
      setToast(`Товар "${name}" успешно добавлен!`);
    },
    [setToast],
  );

  return (
    <div className="h-screen overflow-hidden bg-gray-102 flex flex-col gap-[30px] pt-[20px]">
      {toastJsx}

      <PageProgressBar isLoading={isLoading} />

      <PageHeader title="Товары" onSearch={handleSearchDebounced} />

      <ProductsList
        isLoading={isLoading}
        data={data}
        onRefresh={handleRefresh}
        onSort={handleSort}
        onSelectRow={onSelectItem}
        onSelectAll={onSelectAll}
        selectedIds={selectedIds}
        page={page}
        setPage={setPage}
        onAddSuccess={handleAddSuccess}
      />
    </div>
  );
};
