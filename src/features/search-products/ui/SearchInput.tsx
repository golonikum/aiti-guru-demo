import { Search } from "lucide-react";
import type { FC } from "react";

interface SearchInputProps {
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const SearchInput: FC<SearchInputProps> = ({
  placeholder = "Найти",
  onChange,
  className = "",
}) => {
  return (
    <div className={`relative max-w-[1023px] ${className}`}>
      <Search
        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        size={18}
      />
      <input
        className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-md focus:outline-none focus:ring-2 ring-blue-500"
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};
