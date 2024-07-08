const express = require('express');
const router = express.Router();
const {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
    toggleWishlist
} = require('../controllers/bookController');
const upload = require('../middleware/upload');

router.get('/', getAllBooks);

router.post('/books', upload.single('coverImage'), createBook);

router.get('/books/:bookId', getBookById);

router.delete('/books/:bookId', deleteBook);

router.put('/books/:bookId', upload.single('coverImage'), updateBook);

router.put('/:bookId/toggle-wishlist', toggleWishlist);

module.exports = router;
