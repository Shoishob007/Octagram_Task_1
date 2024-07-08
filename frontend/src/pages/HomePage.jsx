/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import { BiEdit, BiTrash, BiPlus } from "react-icons/bi";
import AddBookModal from "../components/AddBookModal";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/");
        console.log(response);
        const { data } = response;
        console.log(data);
        console.log(data[0].coverImage);
        if (response.data && Array.isArray(response.data)) {
          setBooks(data);
          const itemsPerPage = 8;
          setTotalPages(Math.ceil(data.length / itemsPerPage));
        } else {
          console.error(
            "Invalid data structure returned from server:",
            response.data
          );
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
    return fetchBooks;
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto p-4 relative">
      <h1 className="text-4xl font-bold text-center mb-8">All Books</h1>
      <div className="fixed bottom-10 right-10 mb-4">
        <button
          onClick={openModal}
          className="bg-blue-800 text-white px-2 py-2 rounded-full flex items-center"
        >
          <BiPlus className="w-8 h-8" />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {books.slice((currentPage - 1) * 8, currentPage * 8).map((book) => (
          <div
            key={book._id}
            className="relative group border rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <img
              src={`http://localhost:3000/${book.coverImage}`}
              className="w-full h-60 cover"
              alt={book.title}
            />
            <button className="absolute top-2 right-2 bg-white p-1 rounded-full hover:bg-red-500 transition-colors duration-300">
              <svg
                className="w-6 h-6 text-red-500 hover:text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </button>
            <div className="p-4 bg-white relative">
              <h5 className="text-xl font-bold mb-2">{book.title}</h5>
              <p className="text-gray-700 mb-1">Author: {book.author}</p>
              <p className="text-gray-700 mb-1">Genre: {book.genre}</p>
              <p
                className={`text-md font-semibold ${
                  book.stock === 0 ? "text-red-500" : "text-green-500"
                }`}
              >
                Stock: {book.stock}
              </p>
              <button className="absolute top-2 right-2 bg-white p-1 rounded-full hover:bg-blue-900 transition-colors duration-300">
                <BiEdit className="w-6 h-6 text-blue-700 hover:text-white" />
              </button>
              <button
                className="absolute bg-white top-10 right-2 p-1 rounded-full hover:bg-red-500 transition-colors duration-300"
                onClick={() => handleDelete(book._id)}
              >
                <BiTrash className="w-6 h-6 text-red-500 hover:text-white" />
              </button>
            </div>
          </div>
        ))}

        <AddBookModal isOpen={isModalOpen} onClose={closeModal} fetchBooks />
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Home;
