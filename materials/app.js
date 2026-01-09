/**
* RMIT University Vietnam
* Course: COSC3060 Web Programming Studio
* Semester: 2025B
* Assessment: Fullstack in-class Lab Test
* Author: Your names (e.g. Nguyen Van Minh)
* ID: Your student ids (e.g. s1234567)
* Acknowledgement: Acknowledge the resources that you use here.
*/

// Declare packages used for this server file
import express from 'express'
import 'dotenv/config';
import path from 'path'
import { fileURLToPath } from 'url';
import {dirname} from 'path'

//import schema
import {Book, ReadingList} from './db/bookModel.js'
import './db/mongoose.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Setup server
const app = express();
//set EJS view engine
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
/** Routes */
// Homepage endpoint that shows random books
app.get('/',  async (req, res) => {
    try{
        const lists = await ReadingList.find({});
        const list = lists[0] || null;
        if(list){
            await ReadingList.populate(list, {path:'books'})
        }
        res.render('list', {list})
    }catch(err){
        console.error(err);
        res.status(500).send('Error loading list');
    }
})

app.get('/book/:title', async (req,res)=>{
    try{
        const book = await Book.findOne({title: req.params.title});
        if(!book) return res.status(404).send('Not found')
        const related = await Book.find({
            category:book.category,
            __id: {$ne: book._id},     
    }).limit(4)
    }catch(err){
        console.error(err);
        res.status(500).send('Error loading book')
    }
})

// Book endpoint that when accessed will show detail information about a book and related books found in the database
app.get('/book/:title', function (req, res) {
    res.render('book');
});

// Port number
const port = 4000;

// Start the server
app.listen(port, () => {
    console.log(`Server started and is running on: http://localhost:${port}`);
});