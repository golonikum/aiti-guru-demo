import type { Product } from "@/api/types";
import { getCategoryInRussian } from "@/utils/getCategoryInRussian";

export const TitleRenderer = ({ record }: { record: Product }) => (
  <div className="font-['Manrope'] flex items-center gap-[18px] h-full w-full truncate">
    <div className="w-12 h-12 rounded-[8px] bg-gray-300" />
    <div className="flex flex-col flex-1 h-full w-full truncate">
      <p className="font-bold text-gray-800 truncate">{record.title}</p>
      <p className="text-gray-401 truncate">
        {getCategoryInRussian(record.category)}
      </p>
    </div>
  </div>
);
