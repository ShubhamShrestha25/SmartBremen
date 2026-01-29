"use client";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  itemsPerPage,
  onItemsPerPageChange,
  totalItems,
}) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show first page
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      // Show pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      // Always show last page
      if (!pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  if (totalPages <= 1) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 my-4">
      {/* Items per page selector */}
      <div className="flex items-center gap-2 text-sm text-gray-600">
        <span>Show</span>
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="border border-gray-300 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#6BEE32]"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
        <span>per page</span>
      </div>

      {/* Page info */}
      <div className="text-sm text-gray-600">
        Showing {startItem}-{endItem} of {totalItems} items
      </div>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {/* Previous button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`p-2 rounded border ${
            currentPage === 1
              ? "border-gray-200 text-gray-300 cursor-not-allowed"
              : "border-gray-300 text-gray-600 hover:bg-gray-100"
          }`}
        >
          <FaChevronLeft className="text-xs" />
        </button>

        {/* Page numbers */}
        {getPageNumbers().map((page, index) =>
          page === "..." ? (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 text-sm border rounded transition-colors ${
                currentPage === page
                  ? "border-[#6BEE32] bg-[#6BEE32] text-white"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          )
        )}

        {/* Next button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`p-2 rounded border ${
            currentPage === totalPages
              ? "border-gray-200 text-gray-300 cursor-not-allowed"
              : "border-gray-300 text-gray-600 hover:bg-gray-100"
          }`}
        >
          <FaChevronRight className="text-xs" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
