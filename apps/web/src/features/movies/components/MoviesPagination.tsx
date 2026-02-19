type Props = {
  currentPage: number;
  totalPages: number;
  onPrevious: () => void;
  onNext: () => void;
};

export function MoviesPagination({ currentPage, totalPages, onPrevious, onNext }: Props) {
  if (totalPages <= 1) return null;

  return (
    <nav className="pagination" aria-label="Movies pagination">
      <button className="pagination__button" type="button" disabled={currentPage === 1} onClick={onPrevious}>
        Previous
      </button>
      <p className="pagination__status">
        Page {currentPage} of {totalPages}
      </p>
      <button className="pagination__button" type="button" disabled={currentPage === totalPages} onClick={onNext}>
        Next
      </button>
    </nav>
  );
}
