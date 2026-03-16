import type { FC } from "react";
import { Table } from "@/shared/ui/Table";
import { TablePagination } from "@/shared/ui/TablePagination";
import { TableToolbar } from "@/shared/ui/TableToolbar";
import { PageTableLayout } from "@/shared/ui/PageTableLayout";
import {
  ProductTitle,
  ProductPrice,
  ProductBrand,
  ProductSku,
  ProductRating,
  ProductActions,
  type Product,
} from "@/entities/product";
import type { ProductsListProps } from "../model/types";
import { ProductsRefreshButton } from "@/features/products-refresh";
import { AddProduct } from "@/features/add-product";

const PAGE_SIZE = 20;

export const ProductsList: FC<ProductsListProps> = ({
  onSelectAll,
  onSelectRow,
  onSort,
  data,
  onRefresh,
  onEdit,
  onDelete,
  selectedIds,
  setPage,
  page,
  onAddSuccess,
  isLoading,
}) => {
  return (
    <PageTableLayout
      header={
        <TableToolbar
          title="Все позиции"
          actions={[
            <ProductsRefreshButton onRefresh={onRefresh} />,
            <AddProduct onSuccess={onAddSuccess} />,
          ]}
        />
      }
      body={
        <Table<Product>
          data={data?.products || []}
          isLoading={isLoading}
          columns={[
            { name: "[checkbox]" },
            {
              name: "title",
              label: "Наименование",
              align: "left",
              ColumnRenderer: ProductTitle,
            },
            { name: "brand", label: "Вендор", ColumnRenderer: ProductBrand },
            { name: "sku", label: "Артикул", ColumnRenderer: ProductSku },
            {
              name: "rating",
              label: "Оценка",
              sortable: true,
              ColumnRenderer: ProductRating,
            },
            {
              name: "price",
              label: "Цена, ₽",
              sortable: true,
              ColumnRenderer: ProductPrice,
            },
            {
              name: "[actions]",
              ColumnRenderer: (props) => (
                <ProductActions
                  record={props.record}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ),
            },
          ]}
          onSort={onSort}
          onSelectRow={onSelectRow}
          onSelectAll={onSelectAll}
          selectedIds={selectedIds}
        />
      }
      footer={
        <TablePagination
          limit={PAGE_SIZE}
          page={page}
          setPage={setPage}
          total={data?.total || 0}
        />
      }
    />
  );
};
