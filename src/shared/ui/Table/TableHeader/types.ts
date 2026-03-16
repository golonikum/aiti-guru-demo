import type { TableItemType, TableColumn } from "../types";

export interface TableHeaderProps<T extends TableItemType> {
  columns: TableColumn<T>[];
  onSelectAll?: (e: React.ChangeEvent<HTMLInputElement, Element>) => void;
  allSelected?: boolean;
  onSort?: (col: keyof T) => void;
}
