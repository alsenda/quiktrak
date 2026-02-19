import { use, useOptimistic } from "react";
import { Link, useParams } from "react-router-dom";

import { toggleFavorite } from "../lib/api";
import { getMovieByIdResource } from "../lib/resources";

const MovieDetailPage = () => {
  const { id = "" } = useParams();
  const movie = use(getMovieByIdResource(id));
  const [isFavorite, setIsFavoriteOptimistic] = useOptimistic(false, (_state, next: boolean) => next);

  if (!movie) {
    return (
      <article>
        <h2>Movie not found</h2>
        <p>The requested movie does not exist.</p>
        <Link to="/movies">Back to movies</Link>
      </article>
    );
  }

  return (
    <article>
      <h2>{movie.title}</h2>
      <p>
        {movie.year} · Rating {movie.rating}
      </p>
      <p>{movie.description}</p>
      <img src={movie.imageUrl} alt={movie.title} width={320} />
      <p>
        <button
          type="button"
          onClick={async () => {
            const nextOptimistic = !isFavorite;
            setIsFavoriteOptimistic(nextOptimistic);

            try {
              const response = await toggleFavorite(movie.id);
              setIsFavoriteOptimistic(response.favorite);
            } catch {
              setIsFavoriteOptimistic(!nextOptimistic);
            }
          }}
        >
          {isFavorite ? "Unfavorite" : "Favorite"}
        </button>
      </p>
      <p>
        <Link to="/movies">Back to movies</Link>
      </p>
    </article>
  );
};

export default MovieDetailPage;