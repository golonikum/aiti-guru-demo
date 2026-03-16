export interface SearchProductsProps {
  onSearch: (query: string) => void;
  debounceMs?: number;
  placeholder?: string;
  className?: string;
}
