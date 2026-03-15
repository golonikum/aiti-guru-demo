import { ArrowUpDown } from "lucide-react";
import type { TableItemType, TableProps } from "./types";
import clsx from "clsx";
import { isCheckboxColumnName } from "./utils";

export const Table = <T extends TableItemType>({
  data,
  columns,
  onSort,
  selectedIds,
  onSelectAll,
  onSelectRow,
}: TableProps<T>) => {
  const allSelected = !!data?.length && selectedIds.length === data?.length;

  return (
    <div className="flex-1 overflow-auto">
      <table className="w-full text-left text-sm table-fixed text-[16px]">
        <thead className="sticky top-0 z-10 bg-white text-gray-600 shadow-sm">
          <tr className="text-gray-401 h-[73px]">
            {columns.map((column) => {
              const isCheckbox = isCheckboxColumnName(column.name as string);
              const {
                sortable,
                align = "center",
                width = "min-w-[40px]",
              } = column;

              return (
                <th
                  className={clsx(
                    "p-4 font-['Manrope']",
                    `text-${align}`,
                    width,
                    sortable && "cursor-pointer",
                    isCheckbox && "w-10",
                  )}
                  key={column.name as string}
                  onClick={sortable ? () => onSort(column.name) : undefined}
                >
                  {isCheckbox ? (
                    <input
                      type="checkbox"
                      className="input-checkbox align-middle"
                      checked={allSelected}
                      onChange={onSelectAll}
                    />
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
        <tbody className="divide-y divide-gray-200">
          {data?.map((record) => (
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
                      <>
                        <input
                          type="checkbox"
                          className="input-checkbox align-middle"
                          checked={selected}
                          onChange={() => onSelectRow?.(record.id)}
                        />
                        {selected && (
                          <div className="absolute left-0 top-0 h-full w-[3px] bg-blue-800" />
                        )}
                      </>
                    ) : Renderer ? (
                      <Renderer record={record} />
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
      {!data.length && (
        <div className="h-[calc(100%-73px)] text-[20px] text-gray-402 w-full flex flex-col items-center justify-center">
          Ничего не найдено
        </div>
      )}
    </div>
  );
};
