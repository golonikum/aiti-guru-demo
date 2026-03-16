import clsx from "clsx";
import type { ProductRendererProps } from "../model/types";
import type { FC } from "react";

export const ProductRating: FC<ProductRendererProps> = ({ record }) => {
  const isLow = record.rating < 3;

  return (
    <span className="font-['Open_Sans'] text-black">
      <span className={clsx(isLow && "text-red-500")}>{record.rating}</span>/5
    </span>
  );
};
