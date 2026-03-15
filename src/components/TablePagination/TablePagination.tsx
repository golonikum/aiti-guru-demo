import type { FC } from "react";
import type { TablePaginationProps } from "./types";
import clsx from "clsx";
import { TablePaginationArrow } from "./TablePaginationArrow";

export const TablePagination: FC<TablePaginationProps> = ({
  limit,
  page,
  setPage,
  total = 0,
}) => {
  const totalPages = Math.ceil(total / limit);
  const buttons = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="py-3 flex justify-between items-center text-gray-500">
      <div>
        {!!total && (
          <>
            <span className="text-gray-403">Показано</span>{" "}
            <span className="text-gray-700">
              {(page - 1) * limit + 1}-{Math.min(page * limit, total || 0)}
            </span>{" "}
            <span className="text-gray-403">из</span>{" "}
            <span className="text-gray-700">{total || 0}</span>
          </>
        )}
      </div>
      {!!total && (
        <div className="flex items-center gap-4">
          <TablePaginationArrow
            disabled={page <= 1}
            onClick={() => setPage((p) => p - 1)}
            dir="left"
          />
          <div className="flex items-center gap-2">
            {buttons.map((b) => (
              <button
                key={b}
                onClick={page !== b ? () => setPage(b) : undefined}
                className={clsx(
                  "flex flex-col justify-center items-center border border-gray-101 rounded-[4px] disabled:opacity-30 w-[30px] h-[30px] text-[14px] font-normal font-['Manrope']",
                  b === page && "bg-indigo-400 text-white",
                  b !== page && "text-gray-403 cursor-pointer",
                )}
              >
                {b}
              </button>
            ))}
          </div>
          <TablePaginationArrow
            disabled={page * limit >= (total || 0)}
            onClick={() => setPage((p) => p + 1)}
            dir="right"
          />
        </div>
      )}
    </div>
  );
};
