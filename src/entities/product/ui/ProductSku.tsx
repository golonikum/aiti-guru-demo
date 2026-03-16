import type { FC } from "react";
import type { ProductRendererProps } from "../model/types";

export const ProductSku: FC<ProductRendererProps> = ({ record }) => {
  return <span className="font-['Open_Sans'] text-black">{record.sku}</span>;
};
