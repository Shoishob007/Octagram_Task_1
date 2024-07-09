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

    const { title, author, publishedDate, genre, stock, price } = req.body;

    const newBook = new Book({
        title,
        author,
        publishedDate,
        genre,
        stock,
        price,
        coverImage: req.file ? `uploads/${req.file.filename}` : '',
    });

    try {
        const savedBook = await newBook.save();
        res.status(201).json(savedBook);
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
        book.price = req.body.price || book.price;

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

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};