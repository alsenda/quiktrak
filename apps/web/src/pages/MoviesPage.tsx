import { use, useActionState } from "react";
import { Link } from "react-router-dom";

import { getMoviesResource } from "../lib/resources";

type SearchState = {
  query: string;
};

const initialSearchState: SearchState = { query: "" };

const MoviesPage = () => {
  const movies = use(getMoviesResource());
  const [searchState, submitSearchAction] = useActionState(
    async (_state: SearchState, formData: FormData): Promise<SearchState> => {
      const query = String(formData.get("query") ?? "").trim();

      return { query };
    },
    initialSearchState
  );

  const filteredMovies = movies.filter((movie) => {
    if (!searchState.query) {
      return true;
    }

    return movie.title.toLowerCase().includes(searchState.query.toLowerCase());
  });

  return (
    <section>
      <h2>Movies</h2>
      <form action={submitSearchAction}>
        <label htmlFor="movie-search">Search movies</label>
        <input id="movie-search" name="query" type="search" defaultValue={searchState.query} />
        <button type="submit">Search</button>
      </form>

      <ul>
        {filteredMovies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            <p>
              {movie.year} · Rating {movie.rating}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default MoviesPage;