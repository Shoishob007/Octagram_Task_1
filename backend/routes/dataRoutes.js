const express = require('express');
const router = express.Router();
const {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
} = require('../controllers/bookController');

router.get('/', getAllBooks);

router.post('/books', createBook);

router.get('/books/:bookId', getBookById);

router.delete('/books/:bookId', deleteBook);

router.put('/books/:bookId', updateBook);



module.exports = router;
