export interface TablePaginationProps {
  limit: number;
  page: number;
  total?: number;
  setPage: (page: number) => void;
}
