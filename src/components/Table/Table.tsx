import { ArrowUpDown } from "lucide-react";
import type { TableItemType, TableProps } from "./types";
import clsx from "clsx";
import { isCheckboxColumnName } from "./utils";

export const Table = <T extends TableItemType>({
  data,
  columns,
  onSort,
}: TableProps<T>) => {
  return (
    <div className="flex-1 overflow-auto">
      <table className="w-full text-left text-sm table-fixed min-w-full">
        <thead className="sticky top-0 z-10 bg-white text-gray-600 shadow-sm">
          <tr className="text-[var(--color-gray-3)]">
            {columns.map((column) => {
              const isCheckbox = isCheckboxColumnName(column.name as string);
              const { sortable } = column;

              return (
                <th
                  className={clsx(
                    "p-4",
                    sortable && "cursor-pointer",
                    isCheckbox && "w-10",
                  )}
                  key={column.name as string}
                  onClick={sortable ? () => onSort(column.name) : undefined}
                >
                  {isCheckbox ? (
                    <input type="checkbox" className="input-checkbox" />
                  ) : (
                    <>
                      {column.label}{" "}
                      {sortable ? (
                        <ArrowUpDown size={14} className="inline" />
                      ) : null}
                    </>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E2E2E2]">
          {data?.map((record) => (
            <tr key={record.id} className="hover:bg-gray-50">
              {columns.map((column) => {
                const name = column.name as string;
                const isCheckbox = isCheckboxColumnName(name);

                return (
                  <td className={clsx("p-4", isCheckbox && "w-10")} key={name}>
                    {isCheckbox ? (
                      <input type="checkbox" className="input-checkbox" />
                    ) : (
                      (record[name] as React.ReactNode)
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
