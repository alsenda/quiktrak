import { z } from "zod";

export const movieSchema = z.object({
  id: z.string(),
  title: z.string(),
  year: z.number().int(),
  imageUrl: z.string().url(),
  description: z.string(),
  rating: z.number().min(0).max(10)
});

export const movieListSchema = z.array(movieSchema);

export const healthResponseSchema = z.object({
  status: z.literal("ok")
});

export type Movie = z.infer<typeof movieSchema>;
export type MovieListResponse = z.infer<typeof movieListSchema>;
export type HealthResponse = z.infer<typeof healthResponseSchema>;