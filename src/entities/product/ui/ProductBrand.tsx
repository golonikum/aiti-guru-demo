import type { FC } from "react";
import type { ProductRendererProps } from "../model/types";

export const ProductBrand: FC<ProductRendererProps> = ({ record }) => {
  return (
    <span className="font-['Open_Sans'] text-black font-bold">
      {record.sku}
    </span>
  );
};
