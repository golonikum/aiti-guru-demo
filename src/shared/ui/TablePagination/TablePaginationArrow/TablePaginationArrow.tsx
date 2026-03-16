import type { FC } from "react";
import type { TablePaginationArrowProps } from "./types";
import CaretLeft from "@/shared/assets/CaretLeft.svg?react";
import CaretRight from "@/shared/assets/CaretRight.svg?react";

export const TablePaginationArrow: FC<TablePaginationArrowProps> = ({
  dir,
  disabled,
  onClick,
}) => {
  const Chevron = dir === "left" ? CaretLeft : CaretRight;

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="disabled:opacity-30 cursor-pointer text-gray-401"
    >
      <Chevron className="w-5 h-5" />
    </button>
  );
};
