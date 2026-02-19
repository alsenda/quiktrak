import {
  favoriteToggleResponseSchema,
  healthResponseSchema,
  movieListSchema,
  movieSchema
} from "@quiktrak/contract";
import cors from "cors";
import express, { type Express, type Response } from "express";

import { movies } from "./data/movies.js";

const sendValidated = <T>(res: Response, schema: { parse: (value: unknown) => T }, payload: unknown): Response => {
  try {
    return res.json(schema.parse(payload));
  } catch {
    return res.status(500).json({ message: "Contract validation failed" });
  }
};

export const createApp = (): Express => {
  const app = express();
  const favorites = new Set<string>();

  app.use(cors());
  app.use(express.json());

  app.get("/api/health", (_req, res) => {
    return sendValidated(res, healthResponseSchema, { status: "ok" });
  });

  app.get("/api/movies", (_req, res) => {
    return sendValidated(res, movieListSchema, movies);
  });

  app.get("/api/movies/:id", (req, res) => {
    const movie = movies.find((item) => item.id === req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    return sendValidated(res, movieSchema, movie);
  });

  app.post("/api/favorites/:id", (req, res) => {
    const movie = movies.find((item) => item.id === req.params.id);

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    if (favorites.has(movie.id)) {
      favorites.delete(movie.id);
    } else {
      favorites.add(movie.id);
    }

    return sendValidated(res, favoriteToggleResponseSchema, {
      id: movie.id,
      favorite: favorites.has(movie.id)
    });
  });

  app.use("*", (_req, res) => {
    return res.status(404).json({ message: "Not found" });
  });

  return app;
};