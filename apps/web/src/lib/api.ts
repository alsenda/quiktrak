import { movieListSchema, movieSchema, type Movie } from "@quiktrak/contract";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3001";

const fetchJson = async (path: string): Promise<unknown> => {
  const response = await fetch(`${API_BASE_URL}${path}`);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return response.json();
};

export const fetchMovies = async (): Promise<Movie[]> => {
  const payload = await fetchJson("/api/movies");

  return movieListSchema.parse(payload);
};

export const fetchMovieById = async (id: string): Promise<Movie | null> => {
  const response = await fetch(`${API_BASE_URL}/api/movies/${id}`);

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return movieSchema.parse(await response.json());
};