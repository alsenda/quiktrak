import type { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

type Props = {
  children: ReactNode;
};

export const AppShell = ({ children }: Props) => {
  return (
    <BrowserRouter>
      <div className="site-layout">
        <header className="site-header">
          <div className="site-header__main">
            <div className="site-header__main-container">
              <p className="site-logo">movie catalog</p>
            </div>
          </div>
        </header>

        <main className="app-shell">{children}</main>

        <footer className="site-footer">
          <p>
            Designed by alsenda
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
};