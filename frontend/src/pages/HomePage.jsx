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
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/");
        const { data } = response;
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
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const openModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const handleDelete = async (bookId) => {
    try {
      await axios.delete(`http://localhost:3000/api/books/${bookId}`);
      const updatedBooks = books.filter((book) => book._id !== bookId);
      setBooks(updatedBooks);
      setTotalPages(Math.ceil(updatedBooks.length / 8));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };

  return (
    <div className="container mx-auto p-4 relative">
      <h1 className="text-4xl font-bold text-center mb-8">All Books</h1>
      <div className="fixed bottom-10 right-10 mb-4 z-50 hover:scale-105 transition duration-200">
        <button
          onClick={() => openModal(null)}
          className="bg-blue-800 text-white px-2 py-2 rounded-full flex items-center "
        >
          <BiPlus className="w-8 h-8" />
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {books.slice((currentPage - 1) * 8, currentPage * 8).map((book) => (
          <div
            key={book._id}
            className="relative group border-2 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300"
          >
            <img
              src={`http://localhost:3000/${book.coverImage}`}
              className="w-full h-60 cover"
              alt={book.title}
            />
            <div className="p-4 bg-white relative">
              <h5 className="text-xl font-bold mb-2">{book.title}</h5>
              <p className="text-gray-700 mb-1">Author: {book.author}</p>
              <p className="text-gray-700 mb-1">Genre: {book.genre}</p>
              <div className="flex gap-20">
                <p
                  className={`text-md font-semibold ${
                    book.stock === 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  Stock: {book.stock}
                </p>
                <p className="text-gray-700 mb-1 font-semibold">
                  {" "}
                  {book.price}
                </p>
              </div>
              <button
                className="absolute top-2 right-2 bg-white p-1 rounded-full hover:bg-blue-900 transition-colors duration-300"
                onClick={() => openModal(book)}
              >
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
        <AddBookModal
          isOpen={isModalOpen}
          onClose={closeModal}
          fetchBooks={() => setBooks(books)}
          book={selectedBook}
        />
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
