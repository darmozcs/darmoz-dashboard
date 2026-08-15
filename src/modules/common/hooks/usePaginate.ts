import { useCallback, useState } from "react";

interface UsePaginateOptions {
  initialPage?: number;
  initialLimit?: number;
}

interface UsePaginateReturn {
  page: number;
  limit: number;
  setPage: (page: number) => void;
  changeLimit: (limit: number) => void;
}

export const usePaginate = ({
  initialPage = 1,
  initialLimit = 10,
}: UsePaginateOptions = {}): UsePaginateReturn => {
  const [page, setPage] = useState(initialPage);
  const [limit, setLimit] = useState(initialLimit);

  const handleSetPage = useCallback((newPage: number) => {
    setPage(newPage);
  }, []);

  const handleChangeLimit = useCallback((newLimit: number) => {
    setLimit(newLimit);
    setPage(1);
  }, []);

  return {
    page,
    limit,
    setPage: handleSetPage,
    changeLimit: handleChangeLimit,
  };
};
