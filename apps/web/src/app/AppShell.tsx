import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export const AppShell = ({ children }: Props) => {
  return (
    <BrowserRouter>
      <main className="app-shell">
        <h1>Movie Catalog</h1>
        {children}
      </main>
    </BrowserRouter>
  );
};