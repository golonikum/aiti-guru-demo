import PlusCircle from "@/shared/assets/PlusCircle.svg?react";
import type { FC } from "react";

interface AddProductButtonProps {
  onClick: () => void;
  className?: string;
}

export const AddProductButton: FC<AddProductButtonProps> = ({
  onClick,
  className = "",
}) => {
  return (
    <button
      className={`font-['Manrope'] flex items-center gap-[15px] bg-blue-700 text-gray-50 px-5 py-[10px] rounded rounded-[6px] hover:bg-blue-700 cursor-pointer ${className}`}
      onClick={onClick}
    >
      <PlusCircle className="w-[22px] h-[22px]" /> Добавить
    </button>
  );
};
