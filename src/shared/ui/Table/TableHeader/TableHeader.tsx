import clsx from "clsx";
import type { TableItemType } from "../types";
import type { TableHeaderProps } from "./types";
import { CheckboxColumn, isCheckboxColumnName } from "../CheckboxColumn";
import { useSearchParams } from "react-router-dom";
import { getSortIcon } from "./utils";

export const TableHeader = <T extends TableItemType>({
  columns,
  allSelected,
  onSelectAll,
  onSort,
}: TableHeaderProps<T>) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortField = (searchParams.get("sort") as keyof T) || "id";
  const sortOrder = (searchParams.get("order") as "asc" | "desc") || "asc";

  return (
    <thead className="sticky top-0 z-10 bg-white text-gray-600 shadow-sm">
      <tr className="text-gray-401 h-[73px]">
        {columns.map((column) => {
          const name = column.name as string;
          const SortIcon = getSortIcon({ name, sortField, sortOrder });
          const isCheckbox = isCheckboxColumnName(name);
          const { sortable, align = "center", width = "min-w-[40px]" } = column;

          return (
            <th
              className={clsx(
                "p-4 font-['Manrope']",
                `text-${align}`,
                width,
                sortable && "cursor-pointer",
                isCheckbox && "w-10",
              )}
              key={name}
              onClick={
                sortable
                  ? () => {
                      const newOrder =
                        sortField === name && sortOrder === "asc"
                          ? "desc"
                          : "asc";
                      setSearchParams(
                        { sort: name, order: newOrder },
                        { replace: true },
                      );
                      onSort?.(column.name);
                    }
                  : undefined
              }
            >
              {isCheckbox ? (
                <CheckboxColumn
                  checked={allSelected}
                  onChange={onSelectAll}
                  isHeader
                />
              ) : (
                <>
                  {column.label}{" "}
                  {sortable ? (
                    <SortIcon
                      className={clsx(
                        "inline w-4 h-4",
                        name === sortField && "text-black",
                      )}
                    />
                  ) : null}
                </>
              )}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};
