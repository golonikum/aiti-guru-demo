import clsx from "clsx";
import type { Product } from "@/api/types";

export const RatingRenderer = ({ record }: { record: Product }) => {
  const isLow = record.rating < 3;

  return (
    <span className="font-['Open_Sans'] text-black">
      <span className={clsx(isLow && "text-red-500")}>{record.rating}</span>/5
    </span>
  );
};
