import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import type { SortState } from "../utils/sort";
import { useDebouncedValue } from "../../../shared/hooks/useDebouncedValue";
import { readMoviesUrlState, writeMoviesUrlState } from "../utils/searchParams";

export function useMoviesPageState(itemsPerPage: number) {
  const [searchParams, setSearchParams] = useSearchParams();
  const initial = useMemo(() => readMoviesUrlState(searchParams), [searchParams]);

  const [queryInput, setQueryInput] = useState(initial.query);
  const debouncedQuery = useDebouncedValue(queryInput.trim(), 300);

  const [currentPage, setCurrentPage] = useState(initial.page);
  const [sort, setSort] = useState<SortState>(initial.sort);

  // Reset to page 1 when search text changes
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedQuery]);

  // Reset to page 1 when sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [sort]);

  // Keep URL in sync with state
  useEffect(() => {
    const nextParams = writeMoviesUrlState({ debouncedQuery, page: currentPage, sort });
    setSearchParams(nextParams, { replace: true });
  }, [currentPage, debouncedQuery, setSearchParams, sort]);

  const paging = useMemo(
    () => ({
      itemsPerPage,
      currentPage,
      setCurrentPage
    }),
    [currentPage, itemsPerPage]
  );

  return {
    queryInput,
    setQueryInput,
    debouncedQuery,
    paging,
    sort,
    setSort
  };
}
