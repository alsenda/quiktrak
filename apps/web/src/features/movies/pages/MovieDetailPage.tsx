import { use } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import { getMovieByIdResource } from "../../../lib/resources";

const MovieDetailPage = () => {
  const { id = "" } = useParams();
  const location = useLocation();
  const backTo =
    typeof location.state === "object" &&
      location.state !== null &&
      "from" in location.state &&
      typeof location.state.from === "string"
      ? location.state.from
      : "/movies";
  const movie = use(getMovieByIdResource(id));

  if (!movie) {
    return (
      <article>
        <h2>Movie not found</h2>
        <p>The requested movie does not exist.</p>
        <Link to={backTo}>Back to movies</Link>
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
        <Link to={backTo}>Back to movies</Link>
      </p>
    </article>
  );
};

export default MovieDetailPage;