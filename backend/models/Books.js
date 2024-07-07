const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    publishedDate: {
        type: Date,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
        default: 0
    },
    coverImage: {
        type: String,
        required: true
    },
    wishlist: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Book', bookSchema);
