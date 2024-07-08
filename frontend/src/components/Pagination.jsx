/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// Pagination.jsx
import React from "react";
import { BiChevronLeft, BiChevronRight } from "react-icons/bi";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav aria-label="Page navigation" className="mt-8 flex justify-center">
      <ul className="flex space-x-2">
        <li
          className={`page-item ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <button
            className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-800 transition-colors duration-300"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            <BiChevronLeft className="text-xl" />
          </button>
        </li>
        {[...Array(totalPages)].map((_, index) => (
          <li
            key={index}
            className={`page-item ${
              currentPage === index + 1
                ? " text-gray-900 font-extrabold font-sans"
                : "bg-white text-gray-900"
            } px-4 py-2 rounded-lg cursor-pointer`}
            onClick={() => onPageChange(index + 1)}
          >
            {index + 1}
          </li>
        ))}
        <li
          className={`page-item ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <button
            className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-800 transition-colors duration-300"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            <BiChevronRight className="text-xl" />
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
