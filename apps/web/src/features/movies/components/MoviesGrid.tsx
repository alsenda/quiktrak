import type { Movie } from "@quiktrak/contract";
import { Link } from "react-router-dom";

type Props = {
  movies: Movie[];
  backPath: string;
};

export function MoviesGrid({ movies, backPath }: Props) {
  return (
    <ul className="movie-grid">
      {movies.map((movie) => (
        <li className="movie-card" key={movie.id}>
          <Link
            to={`/movies/${movie.id}`}
            state={{
              from: backPath
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
  );
}
