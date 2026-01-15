/**
 * Define bookSchema and bookModel
 */
const mongoose = require('./mongoose');

//  Define the Book schema
const bookSchema = new mongoose.Schema({
    
    title:String,
    author:String,
    year:Number,
    image:String,
    category: String,
    description:String

});

const readingListSchema = new mongoose.Schema({
    
    name:String,
    books:[bookSchema]
    
});

// Create the Book model
const Book = mongoose.model('Book', bookSchema);

// Create readingList model
const ReadingList = mongoose.model('ReadingList', readingListSchema);

module.exports = { ReadingList, Book };
