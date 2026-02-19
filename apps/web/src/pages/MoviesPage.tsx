import { use, useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { getMoviesResource } from "../lib/resources";

const MoviesPage = () => {
  const ITEMS_PER_PAGE = 12;
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("query") ?? "";
  const initialPageParam = Number(searchParams.get("page") ?? "1");
  const initialPage = Number.isInteger(initialPageParam) && initialPageParam > 0 ? initialPageParam : 1;
  const movies = use(getMoviesResource());
  const [query, setQuery] = useState(initialQuery);
  const [debouncedQuery, setDebouncedQuery] = useState(initialQuery);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const debounceTimeoutRef = useRef<number | null>(null);
  const previousDebouncedQueryRef = useRef(initialQuery);

  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current !== null) {
        window.clearTimeout(debounceTimeoutRef.current);
      }
    };
  }, []);

  const filteredMovies = movies.filter((movie) => {
    if (!debouncedQuery) {
      return true;
    }

    return movie.title.toLowerCase().includes(debouncedQuery.toLowerCase());
  });

  const totalPages = Math.max(1, Math.ceil(filteredMovies.length / ITEMS_PER_PAGE));

  useEffect(() => {
    if (previousDebouncedQueryRef.current !== debouncedQuery) {
      setCurrentPage(1);
      previousDebouncedQueryRef.current = debouncedQuery;
    }
  }, [debouncedQuery]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    const nextSearchParams = new URLSearchParams();

    if (debouncedQuery) {
      nextSearchParams.set("query", debouncedQuery);
    }

    if (currentPage > 1) {
      nextSearchParams.set("page", String(currentPage));
    }

    setSearchParams(nextSearchParams, { replace: true });
  }, [currentPage, debouncedQuery, setSearchParams]);

  const paginatedMovies = filteredMovies.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <section className="movies-page">
      <div className="movies-page__tools">
        <div className="movie-search-form">
          <label className="visually-hidden" htmlFor="movie-search">
            Search movies
          </label>
          <input
            id="movie-search"
            type="search"
            placeholder="Search movies..."
            value={query}
            onChange={(event) => {
              setQuery(event.currentTarget.value);
            }}
            onKeyDown={(event) => {
              const element = event.currentTarget;

              if (debounceTimeoutRef.current !== null) {
                window.clearTimeout(debounceTimeoutRef.current);
              }

              debounceTimeoutRef.current = window.setTimeout(() => {
                setDebouncedQuery(element.value.trim());
              }, 300);
            }}
          />
        </div>
      </div>

      <ul className="movie-grid">
        {paginatedMovies.map((movie) => (
          <li className="movie-card" key={movie.id}>
            <Link
              to={`/movies/${movie.id}`}
              state={{
                from:
                  currentPage > 1 || debouncedQuery
                    ? `/movies?${new URLSearchParams({
                      ...(debouncedQuery ? { query: debouncedQuery } : {}),
                      ...(currentPage > 1 ? { page: String(currentPage) } : {})
                    }).toString()}`
                    : "/movies"
              }}
            >
              <img loading="lazy" src={movie.imageUrl} alt={movie.title} />
              <h3>{movie.title}</h3>
              <p>
                {movie.year} · Rating {movie.rating}
              </p>
              <p className="movie-card__qualities">Watch in 480p 720p 1080p</p>
            </Link>
          </li>
        ))}
      </ul>

      {totalPages > 1 ? (
        <nav className="pagination" aria-label="Movies pagination">
          <button
            className="pagination__button"
            type="button"
            disabled={currentPage === 1}
            onClick={() => {
              setCurrentPage((previousPage) => Math.max(previousPage - 1, 1));
            }}
          >
            Previous
          </button>
          <p className="pagination__status">
            Page {currentPage} of {totalPages}
          </p>
          <button
            className="pagination__button"
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => {
              setCurrentPage((previousPage) => Math.min(previousPage + 1, totalPages));
            }}
          >
            Next
          </button>
        </nav>
      ) : null}
    </section>
  );
};

export default MoviesPage;