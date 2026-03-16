import { useCallback } from "react";
import { useDebounce } from "@/shared/lib/hooks";

interface UseSearchProductsProps {
  onSearch: (query: string) => void;
  debounceMs?: number;
}

export const useSearchProducts = ({
  onSearch,
  debounceMs = 300,
}: UseSearchProductsProps) => {
  const handleSearch = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onSearch(e.target.value);
    },
    [onSearch],
  );

  const handleSearchDebounced = useDebounce(handleSearch, debounceMs);

  return {
    handleSearch: handleSearchDebounced,
  };
};
