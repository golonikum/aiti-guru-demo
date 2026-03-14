import type { FC } from "react";
import type { TableToolbarProps } from "./types";

export const TableToolbar: FC<TableToolbarProps> = ({ actions, title }) => (
  <div className="flex justify-between items-center">
    <h2 className="font-semibold text-gray-700">{title}</h2>
    <div className="flex gap-2">{actions?.map((action) => action)}</div>
  </div>
);
