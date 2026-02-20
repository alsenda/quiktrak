import { use } from "react";

import { getMoviesResource } from "../../../lib/resources";
import { MoviesToolbar } from "../components/MoviesToolbar";
import { MoviesGrid } from "../components/MoviesGrid";
import { MoviesPagination } from "../components/MoviesPagination";
import { useMoviesPageState } from "../hooks/useMoviesPageState";
import { compareMovies, SortState, toggleSortState } from "../utils/sort";
import { buildMoviesBackPath } from "../utils/searchParams";
import { Movie } from "../../../../../../packages/contract/src/schema";

const ITEMS_PER_PAGE = 12;

const getFilteredMovies = (movies: Movie[], debouncedQuery: string): Movie[] => {
  if (!debouncedQuery) return movies;
  const needle = debouncedQuery.toLowerCase();
  return movies.filter((movie) => movie.title.toLowerCase().includes(needle));
};

const getOrderedMovies = (movies: Movie[], sort: SortState): Movie[] => {
  if (!sort) return movies;
  return [...movies].sort((a, b) => compareMovies(a, b, sort));
};

export default function MoviesPage() {
  const movies = use(getMoviesResource());

  const { queryInput, setQueryInput, debouncedQuery, paging, sort, setSort } = useMoviesPageState(ITEMS_PER_PAGE);
  const orderedMovies = getOrderedMovies(getFilteredMovies(movies, debouncedQuery), sort);
  const totalPages = Math.max(1, Math.ceil(orderedMovies.length / ITEMS_PER_PAGE));

  const safeCurrentPage = Math.min(paging.currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
  const paginatedMovies = orderedMovies.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const backPath = buildMoviesBackPath({
    debouncedQuery,
    page: safeCurrentPage,
    sort
  });

  return (
    <section className="movies-page">
      <MoviesToolbar
        queryInput={queryInput}
        onQueryChange={setQueryInput}
        sort={sort}
        onToggleSort={(field) => setSort((current) => toggleSortState(current, field))}
      />

      <MoviesGrid movies={paginatedMovies} backPath={backPath} />

      <MoviesPagination
        currentPage={safeCurrentPage}
        totalPages={totalPages}
        onPrevious={() => paging.setCurrentPage((p) => Math.max(p - 1, 1))}
        onNext={() => paging.setCurrentPage((p) => Math.min(p + 1, totalPages))}
      />
    </section>
  );
}
