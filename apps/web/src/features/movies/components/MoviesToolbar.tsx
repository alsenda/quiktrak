import type { SortField, SortState } from "../utils/sort";
import { sortLabel } from "../utils/sort";

type Props = {
  queryInput: string;
  onQueryChange: (next: string) => void;
  sort: SortState;
  onToggleSort: (field: SortField) => void;
};

export function MoviesToolbar({ queryInput, onQueryChange, sort, onToggleSort }: Props) {
  return (
    <div className="movies-page__tools">
      <div className="movie-search-form">
        <label className="visually-hidden" htmlFor="movie-search">
          Search movies
        </label>
        <input
          id="movie-search"
          type="search"
          placeholder="Search movies..."
          value={queryInput}
          onChange={(event) => onQueryChange(event.currentTarget.value)}
        />
      </div>

      <div className="sort-controls" role="group" aria-label="Order movies">
        <button className="sort-controls__button" type="button" onClick={() => onToggleSort("title")}>
          {sortLabel("title", "Name", sort)}
        </button>
        <button className="sort-controls__button" type="button" onClick={() => onToggleSort("year")}>
          {sortLabel("year", "Year", sort)}
        </button>
        <button className="sort-controls__button" type="button" onClick={() => onToggleSort("rating")}>
          {sortLabel("rating", "Rating", sort)}
        </button>
      </div>
    </div>
  );
}
