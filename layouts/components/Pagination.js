import Link from "next/link";
import React from "react";

const Pagination = ({ section, currentPage, totalPages }) => {
  const indexPageLink = currentPage === 2;
  const hasPrevPage = currentPage > 1;
  const hasNextPage = totalPages > currentPage;

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5;
    let startPage = Math.max(currentPage - Math.floor(maxPagesToShow / 2), 1);
    let endPage = startPage + maxPagesToShow - 1;

    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(totalPages - maxPagesToShow + 1, 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (startPage > 1) {
      if (startPage > 2) {
        pageNumbers.unshift('...');
      }
      pageNumbers.unshift(1);
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push('...');
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <>
      {totalPages > 1 && (
        <nav
          className="mb-4 flex justify-center space-x-4"
          aria-label="Pagination"
        >
          {/* previous */}
          {hasPrevPage ? (
            <Link
              href={
                indexPageLink
                  ? `${section ? "/" + section : "/"}`
                  : `${section ? "/" + section : ""}/page/${currentPage - 1}`
              }
              className="rounded-lg border border-primary px-2 py-2 text-dark"
            >
              <>
                <span className="sr-only">Previous</span>
                <svg
                  className="mt-1 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </>
            </Link>
          ) : (
            <span className="rounded-lg border border-primary px-2 py-2 text-dark">
              <>
                <span className="sr-only">Previous</span>
                <svg
                  className="mt-1 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </>
            </span>
          )}

          {/* page index */}
          {pageNumbers.map((pageNumber, i) => (
            <React.Fragment key={`page-${i}`}>
              {pageNumber === '...' ? (
                <span className="rounded-lg border border-primary px-4 py-2 text-dark">...</span>
              ) : (
                pageNumber === currentPage ? (
                  <span
                    aria-current="page"
                    className={`rounded-lg border border-primary bg-primary px-4 py-2 text-white`}
                  >
                    {pageNumber}
                  </span>
                ) : (
                  <Link
                    href={
                      pageNumber === 1
                        ? `${section ? "/" + section : "/"}`
                        : `${section ? "/" + section : ""}/page/${pageNumber}`
                    }
                    passHref
                    aria-current="page"
                    className={`rounded-lg border border-primary px-4 py-2 text-dark`}
                  >
                    {pageNumber}
                  </Link>
                )
              )}
            </React.Fragment>
          ))}

          {/* next page */}
          {hasNextPage ? (
            <Link
              href={`${section ? "/" + section : ""}/page/${currentPage + 1}`}
              className="rounded-lg border border-primary px-2 py-2 text-dark"
            >
              <>
                <span className="sr-only">Next</span>
                <svg
                  className="mt-1 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </>
            </Link>
          ) : (
            <span className="rounded-lg border border-primary px-2 py-2 text-dark">
              <>
                <span className="sr-only">Next</span>
                <svg
                  className="mt-1 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </>
            </span>
          )}
        </nav>
      )}
    </>
  );
};

export default Pagination;
