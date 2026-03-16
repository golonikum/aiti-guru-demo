import type { FC } from "react";
import { SearchInput } from "./SearchInput";
import { useSearchProducts } from "../model/useSearchProducts";
import type { SearchProductsProps } from "../model/types";

export const SearchProducts: FC<SearchProductsProps> = ({
  onSearch,
  debounceMs = 300,
  placeholder = "Найти",
  className = "",
}) => {
  const { handleSearch } = useSearchProducts({ onSearch, debounceMs });

  return (
    <SearchInput
      placeholder={placeholder}
      onChange={handleSearch}
      className={className}
    />
  );
};
