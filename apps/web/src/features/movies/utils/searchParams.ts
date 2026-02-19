import type { SortState } from "./sort";
import { buildQueryString, toPositiveIntOrDefault } from "../../../shared/utils/urlSearchParams";
import { isSortDirection, isSortField } from "./sort";

export type MoviesUrlState = {
  query: string;
  page: number;
  sort: SortState;
};

export function readMoviesUrlState(searchParams: URLSearchParams): MoviesUrlState {
  const query = searchParams.get("query") ?? "";
  const page = toPositiveIntOrDefault(searchParams.get("page"), 1);

  const sortFieldParam = searchParams.get("sortField");
  const sortDirectionParam = searchParams.get("sortDirection");

  const field = isSortField(sortFieldParam) ? sortFieldParam : null;
  const direction = isSortDirection(sortDirectionParam) ? sortDirectionParam : null;

  const sort = field && direction ? { field, direction } : null;

  return { query, page, sort };
}

export function writeMoviesUrlState(state: {
  debouncedQuery: string;
  page: number;
  sort: SortState;
}): URLSearchParams {
  const params = new URLSearchParams();

  if (state.debouncedQuery) params.set("query", state.debouncedQuery);
  if (state.page > 1) params.set("page", String(state.page));

  if (state.sort) {
    params.set("sortField", state.sort.field);
    params.set("sortDirection", state.sort.direction);
  }

  return params;
}

export function buildMoviesBackPath(state: {
  debouncedQuery: string;
  page: number;
  sort: SortState;
}): string {
  const params = writeMoviesUrlState(state);
  return `/movies${buildQueryString(params)}`;
}
