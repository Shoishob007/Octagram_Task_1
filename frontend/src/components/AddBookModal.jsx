/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";

const AddBookModal = ({ isOpen, onClose, fetchBooks, book }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publishedDate: "",
    genre: "",
    stock: 0,
    price: 0,
    coverImage: null,
  });

  useEffect(() => {
    if (book) {
      setFormData({
        title: book.title,
        author: book.author,
        publishedDate: book.publishedDate
          ? new Date(book.publishedDate).toISOString().split("T")[0]
          : "",
        genre: book.genre,
        stock: book.stock,
        coverImage: null,
      });
    } else {
      setFormData({
        title: "",
        author: "",
        publishedDate: "",
        genre: "",
        stock: 0,
        coverImage: null,
      });
    }
  }, [book]);

  const handleFileChange = (e) => {
    setFormData({ ...formData, coverImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, author, publishedDate, genre, stock, coverImage, price } =
      formData;
    const bookData = new FormData();
    bookData.append("title", title);
    bookData.append("author", author);
    bookData.append("publishedDate", publishedDate);
    bookData.append("genre", genre);
    bookData.append("stock", stock);
    bookData.append("price", price);
    if (coverImage) {
      bookData.append("coverImage", coverImage);
    }

    try {
      if (book) {
        await axios.put(
          `http://localhost:3000/api/books/${book._id}`,
          bookData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await axios.post("http://localhost:3000/api/books", bookData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }
      fetchBooks();
      onClose();
    } catch (error) {
      console.error("Error saving book:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg md:w-96 w-64">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {book ? "Edit Book" : "Add Book"}
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="border rounded px-2 py-1 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Author</label>
            <input
              type="text
"
              value={formData.author}
              onChange={(e) =>
                setFormData({ ...formData, author: e.target.value })
              }
              className="border rounded px-2 py-1 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Published Date</label>
            <input
              type="date"
              value={formData.publishedDate}
              onChange={(e) =>
                setFormData({ ...formData, publishedDate: e.target.value })
              }
              className="border rounded px-2 py-1 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Genre</label>
            <input
              type="text"
              value={formData.genre}
              onChange={(e) =>
                setFormData({ ...formData, genre: e.target.value })
              }
              className="border rounded px-2 py-1 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Stock</label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  stock: parseInt(e.target.value),
                })
              }
              className="border rounded px-2 py-1 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Stock</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  price: parseFloat(e.target.value),
                })
              }
              className="border rounded px-2 py-1 w-full"
              required
            />
          </div>
          <div className="mb-4 relative">
            <label htmlFor="coverImage" className="block text-gray-700">
              Cover Image
            </label>
            <div className="mt-1 flex items-center">
              <label className="cursor-pointer bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition-colors duration-300">
                <span>Choose a file</span>
                <input
                  id="coverImage"
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept="image/*"
                />
              </label>
              <span className="ml-2">
                {formData.coverImage
                  ? formData.coverImage.name
                  : "No file selected"}
              </span>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="button"
              onClick={onClose}
              className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-emerald-500 text-white px-4 py-2 rounded"
            >
              {book ? "Edit Book" : "Add Book"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBookModal;
