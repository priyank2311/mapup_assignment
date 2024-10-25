import React, { useState, useEffect } from 'react';

const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
  const [maxPagesToShow, setMaxPagesToShow] = useState(10); // Default to 10 pages

  // Adjust maxPagesToShow based on screen size
  useEffect(() => {
    const updateMaxPagesToShow = () => {
      if (window.innerWidth < 480) {
        setMaxPagesToShow(3); // Show only 3 pages on very small screens
      } else if (window.innerWidth < 768) {
        setMaxPagesToShow(5); // Show 5 pages on small screens
      } else {
        setMaxPagesToShow(10); // Default to 10 pages on larger screens
      }
    };

    updateMaxPagesToShow();
    window.addEventListener('resize', updateMaxPagesToShow);

    return () => {
      window.removeEventListener('resize', updateMaxPagesToShow);
    };
  }, []);

  const pageNumbers = [];
  const startPage = Math.floor((currentPage - 1) / maxPagesToShow) * maxPagesToShow + 1;
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center space-x-2 my-4">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
      >
        Previous
      </button>

      {/* Page Numbers */}
      {pageNumbers.map(page => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`px-3 py-1 rounded ${
            page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-300 hover:bg-gray-400'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
