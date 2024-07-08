/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import axios from "axios";

const AddBookModal = ({ isOpen, onClose, fetchBooks }) => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    publishedDate: "",
    genre: "",
    stock: 0,
    coverImage: null,
  });

  const handleFileChange = (e) => {
    setFormData({ ...formData, coverImage: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, author, publishedDate, genre, stock, coverImage } = formData;

    const newBookData = new FormData();
    newBookData.append("title", title);
    newBookData.append("author", author);
    newBookData.append("publishedDate", publishedDate);
    newBookData.append("genre", genre);
    newBookData.append("stock", stock);
    if (coverImage) {
      newBookData.append("coverImage", coverImage);
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/books",
        newBookData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Book added:", response.data);
      fetchBooks();
      onClose();
      setFormData({
        title: "",
        author: "",
        publishedDate: "",
        genre: "",
        stock: 0,
        coverImage: null,
      });
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg md:w-96 w-64">
            <h2 className="text-2xl font-bold mb-4 text-center">
              Add New Book
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
                  type="text"
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
                  Add Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddBookModal;
