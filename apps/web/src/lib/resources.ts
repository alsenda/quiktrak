import type { Movie } from "@quiktrak/contract";

import { fetchMovieById, fetchMovies } from "./api";

let moviesPromise: Promise<Movie[]> | null = null;
const movieByIdPromiseMap = new Map<string, Promise<Movie | null>>();

export const getMoviesResource = (): Promise<Movie[]> => {
  moviesPromise ??= fetchMovies();

  return moviesPromise;
};

export const getMovieByIdResource = (id: string): Promise<Movie | null> => {
  if (!id) {
    return Promise.resolve(null);
  }

  const existingPromise = movieByIdPromiseMap.get(id);

  if (existingPromise) {
    return existingPromise;
  }

  const nextPromise = fetchMovieById(id);

  movieByIdPromiseMap.set(id, nextPromise);

  return nextPromise;
};