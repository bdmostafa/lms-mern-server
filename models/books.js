const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'book title is required'],
            minlength: [3, 'Title must be 3 char in minimum'],
            maxlength: 10
        },
        description: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 100
        },
        releaseDate: {
            type: Date,
            required: true,
        },
        bookImage: {
            type: File,
            required: true,
        },
        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Librarian',
            required: true
        },
        statusActive: {
            type: Boolean,
        }
        
    },
    {
        timestamps: true
    }
);

const Book = mongoose.model('Book', booksSchema)

module.exports = Book;