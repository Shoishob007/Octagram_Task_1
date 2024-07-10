import axios from 'axios';

export const addBook = async (formData, fetchBooks, onClose) => {
  const { title, author, publishedDate, genre, stock, price, coverImage } = formData;
  const bookData = new FormData();
  bookData.append('title', title);
  bookData.append('author', author);
  bookData.append('publishedDate', publishedDate);
  bookData.append('genre', genre);
  bookData.append('stock', stock);
  bookData.append('price', price);
  if (coverImage) {
    bookData.append('coverImage', coverImage);
  }

  try {
    await axios.post('http://localhost:3000/api/books', bookData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    fetchBooks();
    onClose();
  } catch (error) {
    console.error('Error adding book:', error);
  }
};

export const editBook = async (bookId, formData, fetchBooks, onClose) => {
  const { title, author, publishedDate, genre, stock, price, coverImage } = formData;
  const bookData = new FormData();
  bookData.append('title', title);
  bookData.append('author', author);
  bookData.append('publishedDate', publishedDate);
  bookData.append('genre', genre);
  bookData.append('stock', stock);
  bookData.append('price', price);
  if (coverImage) {
    bookData.append('coverImage', coverImage);
  }

  try {
    await axios.put(`http://localhost:3000/api/books/${bookId}`, bookData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    fetchBooks();
    onClose();
  } catch (error) {
    console.error('Error editing book:', error);
  }
};


export const deleteBook = async (bookId, books, setBooks, setTotalPages) => {
    try {
      await axios.delete(`http://localhost:3000/api/books/${bookId}`);
      const updatedBooks = books.filter((book) => book._id !== bookId);
      setBooks(updatedBooks);
      setTotalPages(Math.ceil(updatedBooks.length / 8));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };
