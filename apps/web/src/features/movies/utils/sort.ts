import type { Movie } from "@quiktrak/contract";

export type SortField = "title" | "year" | "rating";
export type SortDirection = "asc" | "desc";
export type SortState = { field: SortField; direction: SortDirection } | null;

export function isSortField(value: string | null): value is SortField {
  return value === "title" || value === "year" || value === "rating";
}

export function isSortDirection(value: string | null): value is SortDirection {
  return value === "asc" || value === "desc";
}

export function toggleSortState(current: SortState, field: SortField): SortState {
  if (!current || current.field !== field) return { field, direction: "desc" };
  if (current.direction === "desc") return { field, direction: "asc" };
  return null;
}

export function sortLabel(field: SortField, label: string, sort: SortState): string {
  if (!sort || sort.field !== field) return `${label} ↓`;
  if (sort.direction === "desc") return `${label} ↑`;
  return `${label} ×`;
}

export function compareMovies(left: Movie, right: Movie, sort: SortState): number {
  if (!sort) return 0;

  const direction = sort.direction === "desc" ? -1 : 1;

  if (sort.field === "title") return left.title.localeCompare(right.title) * direction;
  if (sort.field === "year") return (left.year - right.year) * direction;
  return (left.rating - right.rating) * direction;
}
