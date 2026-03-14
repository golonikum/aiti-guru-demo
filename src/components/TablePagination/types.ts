export interface TablePaginationProps {
  limit: number;
  page: number;
  total?: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
