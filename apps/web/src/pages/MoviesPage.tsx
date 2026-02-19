import { use } from "react";
import { Link } from "react-router-dom";

import { getMoviesResource } from "../lib/resources";

const MoviesPage = () => {
  const movies = use(getMoviesResource());

  return (
    <section>
      <h2>Movies</h2>
      <ul>
        {movies.map((movie) => (
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