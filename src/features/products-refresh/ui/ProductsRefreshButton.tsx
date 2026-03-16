import RefreshIcon from "@/shared/assets/ArrowsClockwise.svg?react";
import type { FC } from "react";
import type { ProductsRefreshProps } from "../model/types";

export const ProductsRefreshButton: FC<ProductsRefreshProps> = ({
  onRefresh,
}) => {
  return (
    <button
      onClick={onRefresh}
      className="p-[10px] hover:bg-gray-100 border border-gray-101 rounded rounded-[8px] cursor-pointer"
    >
      <RefreshIcon className="w-[22px] h-[22px]" />
    </button>
  );
};
