import { ArrowDown, ArrowUp, ArrowUpDown } from "lucide-react";
import type { TableItemType } from "../types";

export const getSortIcon = <T extends TableItemType>({
  name,
  sortField,
  sortOrder,
}: {
  name: string;
  sortField: keyof T;
  sortOrder: string;
}) => {
  if (name !== sortField) {
    return ArrowUpDown;
  } else {
    if (sortOrder === "asc") {
      return ArrowUp;
    } else {
      return ArrowDown;
    }
  }
};
