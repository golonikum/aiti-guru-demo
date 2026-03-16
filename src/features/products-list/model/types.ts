import type { Product, ProductsResponse } from "@/entities/product";

export interface ProductsListProps {
  isLoading?: boolean;
  data?: ProductsResponse;
  onRefresh?: () => void;
  onSort: (col: keyof Product) => void;
  onSelectRow: (id: number) => void;
  onSelectAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedIds: number[];
  onEdit?: (product: Product) => void;
  onDelete?: (product: Product) => void;
  page: number;
  setPage: (page: number) => void;
  onAddSuccess: (name: string) => void;
}
