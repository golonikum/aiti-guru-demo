import type { Product } from "@/api/types";

export const SkuRenderer = ({ record }: { record: Product }) => (
  <span className="font-['Open_Sans'] text-black">{record.sku}</span>
);
