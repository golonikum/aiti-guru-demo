import type { TableColumn, TableItemType } from "../types";

export interface TableRowProps<T extends TableItemType> {
  columns: TableColumn<T>[];
  record: T;
  selectedIds: number[];
  onSelectRow?: (id: number) => void;
}
