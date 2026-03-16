import type { FC } from "react";

export type TableItemType = Partial<Record<string, unknown>> & { id: number };

export type CheckboxColumnName = "[checkbox]";
export type ActionsColumnName = "[actions]";

export interface TableColumn<T extends TableItemType> {
  name: keyof T | CheckboxColumnName | ActionsColumnName;
  label?: string;
  sortable?: boolean;
  ColumnRenderer?: FC<{ record: T }>;
  align?: "left" | "center" | "right";
  width?: string;
}

export interface TableProps<T extends TableItemType> {
  data: T[];
  columns: TableColumn<T>[];
  onSort: (col: keyof T) => void;
  onSelectRow?: (id: number) => void;
  onSelectAll?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedIds: Array<number>;
  isLoading?: boolean;
}
