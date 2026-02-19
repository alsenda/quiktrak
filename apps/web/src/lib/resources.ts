import type { Movie } from "@quiktrak/contract";
import { fetchMovieById, fetchMovies } from "./api";

let moviesPromise: Promise<Movie[]> | null = null;
const movieByIdPromiseMap = new Map<string, Promise<Movie | null>>();

export const getMoviesResource = (): Promise<Movie[]> =>
  (moviesPromise ??= fetchMovies());

export const getMovieByIdResource = (id: string): Promise<Movie | null> => {
  if (!id) return Promise.resolve(null);

  let p = movieByIdPromiseMap.get(id);
  if (!p) {
    p = fetchMovieById(id);
    movieByIdPromiseMap.set(id, p);
  }
  return p;
};
