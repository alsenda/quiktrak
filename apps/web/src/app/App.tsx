import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { ErrorBoundary } from "./ErrorBoundary";
import { AppShell } from "./AppShell";

const MoviesPage = lazy(async () => import("../pages/MoviesPage"));
const MovieDetailPage = lazy(async () => import("../pages/MovieDetailPage"));

export const App = () => {
  return (
    <AppShell>
      <ErrorBoundary>
        <Suspense fallback={<p>Loading page...</p>}>
          <Routes>
            <Route path="/" element={<Navigate to="/movies" replace />} />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:id" element={<MovieDetailPage />} />
            <Route path="*" element={<p>Page not found</p>} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </AppShell>
  );
};