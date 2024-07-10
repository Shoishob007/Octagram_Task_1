/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Carousel = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/");
        const { data } = response;
        if (Array.isArray(data)) {
          setBooks(data);
        } else {
          console.error("Invalid data structure returned from server:", data);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    };

    fetchBooks();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
  };

  const handleBrowseBooks = () => {
    navigate("/books");
  };

  return (
    <div className="carousel-container h-screen ">
      <Slider {...settings}>
        {books.map((book) => (
          <div key={book._id} className="carousel-item">
            <div className="carousel-text text-center self-center w-1/2 mt-40 float-left p-4">
              <h2 className="text-2xl font-bold">{book.title}</h2>
              <p className="text-gray-700 mb-2">Author: {book.author}</p>
              <p className="text-gray-700 mb-4">Genre: {book.genre}</p>
              <button
                onClick={handleBrowseBooks}
                className="bg-blue-800 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition duration-200"
              >
                Browse All Books
              </button>
            </div>
            <div className="carousel-image w-1/2 float-left p-6">
              <img
                src={`http://localhost:3000/${book.coverImage}`}
                alt={book.title}
                className="w-80 h-1/2 cover rounded-lg"
              />
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
