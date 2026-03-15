import type { Product } from "@/api/types";

export const BrandRenderer = ({ record }: { record: Product }) => (
  <span className="font-['Open_Sans'] text-black font-bold">{record.sku}</span>
);
