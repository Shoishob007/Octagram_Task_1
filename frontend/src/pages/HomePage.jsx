/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/books");
        console.log(response);
        const { data } = response;
        console.log(data);
        console.log(data.coverImage);
        if (response.data && Array.isArray(response.data)) {
          setBooks(data);
          const itemsPerPage = 6;
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

  return (
    <div className="container">
      <h1>All Books</h1>
      <div className="row">
        {books.map((book) => (
          <div key={book._id} className="col-md-4 mb-3">
            <div className="card">
              <img
                src={book.coverImage}
                className="card-img-top"
                alt={book.title}
              />
              <div className="card-body">
                <h5 className="card-title">{book.title}</h5>
                <p className="card-text">Author: {book.author}</p>
                <p className="card-text">Genre: {book.genre}</p>
              </div>
            </div>
          </div>
        ))}
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
