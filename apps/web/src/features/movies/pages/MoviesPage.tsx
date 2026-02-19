import { use, useMemo } from "react";

import { getMoviesResource } from "../../../lib/resources";
import { MoviesToolbar } from "../components/MoviesToolbar";
import { MoviesGrid } from "../components/MoviesGrid";
import { MoviesPagination } from "../components/MoviesPagination";
import { useMoviesPageState } from "../hooks/useMoviesPageState";
import { compareMovies, toggleSortState } from "../utils/sort";
import { buildMoviesBackPath } from "../utils/searchParams";

const ITEMS_PER_PAGE = 12;

export default function MoviesPage() {
  const movies = use(getMoviesResource());

  const { queryInput, setQueryInput, debouncedQuery, paging, sort, setSort } = useMoviesPageState(ITEMS_PER_PAGE);

  const filteredMovies = useMemo(() => {
    if (!debouncedQuery) return movies;
    const needle = debouncedQuery.toLowerCase();
    return movies.filter((movie) => movie.title.toLowerCase().includes(needle));
  }, [debouncedQuery, movies]);

  const orderedMovies = useMemo(() => {
    if (!sort) return filteredMovies;
    return [...filteredMovies].sort((a, b) => compareMovies(a, b, sort));
  }, [filteredMovies, sort]);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(orderedMovies.length / ITEMS_PER_PAGE)),
    [orderedMovies.length]
  );

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
