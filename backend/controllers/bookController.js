const Book = require('../models/Books');

const getAllBooks = async (req, res) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        res.json({ message: err });
    }
}

const getBookById = async (req, res) => {
    try {
        const book = await Book.findById(req.params.bookId);
        res.json(book);
    } catch (err) {
        res.json({ message: err });
    }
};

const createBook = async (req, res) => {
    const book = new Book({
        title: req.body.title,
        author: req.body.author,
        publishedDate: req.body.publishedDate,
        genre: req.body.genre,
        summary: req.body.summary
    });

    try {
        const savedBook = await book.save();
        res.json(savedBook);
    } catch (err) {
        res.json({ message: err });
    }
};

const updateBook = async (req, res) => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.bookId,
            req.body,
            { new: true }
        );
        res.json(updatedBook);
    } catch (err) {
        res.json({ message: err });
    }
};

const deleteBook = async (req, res) => {
    try {
        const removedBook = await Book.findByIdAndRemove(req.params.bookId);
        res.json(removedBook);
    } catch (err) {
        res.json({ message: err });
    }
};

module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};