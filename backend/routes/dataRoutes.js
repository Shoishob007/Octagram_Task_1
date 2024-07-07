const express = require('express');
const router = express.Router();
const {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
} = require('../controllers/bookController');
const upload = require('../middleware/upload');


router.get('/', getAllBooks);

router.post('/books', upload.single('coverImage'), createBook);

router.get('/books/:bookId', upload.single('coverImage'), getBookById);

router.delete('/books/:bookId', deleteBook);

router.put('/books/:bookId', updateBook);



module.exports = router;
