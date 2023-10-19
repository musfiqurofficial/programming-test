import React from "react";

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  currentPage: number;
  onPageChange: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  itemsPerPage,
  totalItems,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers: (number | "...")[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    if (currentPage <= 5) {
      for (let i = 1; i <= 6; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...");
      pageNumbers.push(totalPages);
    } else if (currentPage >= totalPages - 4) {
      pageNumbers.push(1);
      pageNumbers.push("...");
      for (let i = totalPages - 5; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      pageNumbers.push("...");
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        pageNumbers.push(i);
      }
      pageNumbers.push("...");
      pageNumbers.push(totalPages);
    }
  }

  return (
    <div>
      <nav
        aria-label="Pagination"
        className="inline-flex -space-x-px rounded-md shadow-sm dark:bg-gray-800 dark:text-gray-100"
      >
        <button
          type="button"
          className="inline-flex items-center px-2 py-2 text-sm font-semibold border rounded-l-md dark:border-gray-700"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <span className="sr-only">Previous</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>

        {pageNumbers.map((pageNumber, index) => (
          <button
            key={index}
            type="button"
            aria-current={currentPage === pageNumber ? "page" : undefined}
            className={`inline-flex items-center px-4 py-2 text-sm text-[#0D6EFD] font-semibold border ${
              currentPage === pageNumber
                ? "bg-[#0D6EFD] !text-white"
                : "dark:border-gray-700"
            }`}
            onClick={() =>
              typeof pageNumber === "number" && onPageChange(pageNumber)
            }
            disabled={pageNumber === "..."}
          >
            {pageNumber}
          </button>
        ))}
        <button
          type="button"
          className="inline-flex items-center px-2 py-2 text-sm font-semibold border rounded-r-md dark:border-gray-700"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(totalItems / itemsPerPage)}
        >
          <span className="sr-only">Next</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            className="w-5 h-5"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </nav>
    </div>
  );
};

export default Pagination;
