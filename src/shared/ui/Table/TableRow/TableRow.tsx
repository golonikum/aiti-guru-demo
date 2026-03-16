import type { TableRowProps } from "./types";
import type { TableItemType } from "../types";
import { CheckboxColumn, isCheckboxColumnName } from "../CheckboxColumn";
import clsx from "clsx";

export const TableRow = <T extends TableItemType>({
  columns,
  record,
  selectedIds,
  onSelectRow,
}: TableRowProps<T>) => {
  return (
    <tr key={record.id} className="hover:bg-gray-102 h-[71px]">
      {columns.map((column) => {
        const name = column.name as string;
        const isCheckbox = isCheckboxColumnName(name);
        const Renderer = column.ColumnRenderer;
        const align = column.align || "center";
        const selected = selectedIds.includes(record.id);

        return (
          <td
            className={clsx(
              "relative p-4",
              `text-${align}`,
              column.width,
              isCheckbox && "w-10",
            )}
            key={name}
          >
            {isCheckbox ? (
              <CheckboxColumn
                checked={selected}
                onChange={() => onSelectRow?.(record.id)}
              />
            ) : Renderer ? (
              <Renderer record={record} />
            ) : (
              (record[name] as React.ReactNode)
            )}
          </td>
        );
      })}
    </tr>
  );
};
