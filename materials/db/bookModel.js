/**
 * Define bookSchema and bookModel
 */
import mongoose from './mongoose.js';


//  Define the Book schema
const bookSchema = new mongoose.Schema({
    category:String,
    title:String,
    author:String,
    year:Number,
    image:String,
    description:String,

});

const readingListSchema = new mongoose.Schema({
    
    // Implement readingListSchema
    name:String,
    books:[{type: mongoose.Schema.Types.ObjectId, ref: 'Book'}],
    
});

// Create the Book model
 const Book = mongoose.model('Book', bookSchema);

// Create readingList model
 const ReadingList = mongoose.model('ReadingList', readingListSchema);

export { Book, ReadingList };
