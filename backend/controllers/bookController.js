const Book = require('../models/Books');

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.bookId);
        res.json(book);
    } catch (err) {
        res.json({ message: err });
    }
};

const createBook = async (req, res) => {
    const bookData = {
        title: req.body.title,
        author: req.body.author,
        publishedDate: req.body.publishedDate,
        genre: req.body.genre,
        stock: req.body.stock,
        wishlist: req.body.wishlist
    };

    if (req.file) {
        bookData.coverImage = `uploads/${req.file.filename}`;
    }

    const book = new Book(bookData);

    try {
        const savedBook = await book.save();
        res.json(savedBook);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        book.title = req.body.title || book.title;
        book.author = req.body.author || book.author;
        book.publishedDate = req.body.publishedDate || book.publishedDate;
        book.genre = req.body.genre || book.genre;
        book.stock = req.body.stock || book.stock;

        if (req.file) {
            book.coverImage = `uploads/${req.file.filename}`;
        }

        const updatedBook = await book.save();
        res.json(updatedBook);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteBook = async (req, res) => {
    try {
        const book = await Book.findById(req.params.bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        await Book.findByIdAndDelete(req.params.bookId);
        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        console.error('Error in deleteBook:', err);
        res.status(500).json({ message: err.message });
    }
};

const toggleWishlist = async (req, res) => {
    try {
        const book = await Book.findById(req.params.bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        book.wishlist = !book.wishlist;

        const updatedBook = await book.save();
        res.json(updatedBook);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    toggleWishlist
};