import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";

import MovieDetailPage from "../pages/MovieDetailPage";
import MoviesPage from "../pages/MoviesPage";

const movieFixture = {
  id: "tt0111161",
  title: "The Shawshank Redemption",
  year: 1994,
  imageUrl: "https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWI2NTEtODFlN2Q1NmQ4Y2RmXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg",
  description: "Two imprisoned men bond over years of hope.",
  rating: 9.3
};

vi.mock("react", async () => {
  const reactModule = await vi.importActual<typeof import("react")>("react");

  return {
    ...reactModule,
    use: <T,>(value: T): T => value
  };
});

vi.mock("../lib/resources", () => {
  return {
    getMoviesResource: () => [movieFixture],
    getMovieByIdResource: (id: string) =>
      id === "missing" ? null : movieFixture
  };
});

describe("web pages", () => {
  it("renders movie items on list page", async () => {
    render(
      <MemoryRouter>
        <MoviesPage />
      </MemoryRouter>
    );

    expect(await screen.findByText("The Shawshank Redemption")).toBeInTheDocument();
  });

  it("renders movie detail", async () => {
    render(
      <MemoryRouter initialEntries={["/movies/tt0111161"]}>
        <Routes>
          <Route path="/movies/:id" element={<MovieDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(
      await screen.findByRole("heading", { name: "The Shawshank Redemption", level: 2 })
    ).toBeInTheDocument();
  });

  it("handles invalid id", async () => {
    render(
      <MemoryRouter initialEntries={["/movies/missing"]}>
        <Routes>
          <Route path="/movies/:id" element={<MovieDetailPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(await screen.findByRole("heading", { name: "Movie not found" })).toBeInTheDocument();
  });
});