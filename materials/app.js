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
const express = require('express');
require('dotenv').config();
const path = require('path');
const { Book, ReadingList } = require('./db/bookModel');
const { setTraceSigInt } = require('util');
const { builtinModules } = require('module');
const { title } = require('process');



// Setup server
const app = express();


app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'views')));
app.use(express.urlencoded({extended:true}))
/** Routes */
// Homepage endpoint that when accessed will produce a random reading list for a week
app.get('/', async (req, res) => {
    const lists = await ReadingList.find({})
    const random = lists[Math.floor(Math.random() * lists.length)];
    console.log({random})
    res.render('list', {random, lists, pageTitle: ""});
})
app.post('/', async (req, res) => {
    const lists = await ReadingList.find({})
    const random = lists[Math.floor(Math.random() * lists.length)];
    console.log({random})
    res.render('list', {random, lists, pageTitle: "" });
})
//sorting function


//search engine
app.get('/search', async (req,res)=>{
    try{
        let builtQuery ={};
        const {search, category} = req.query;

        if(category){
            builtQuery.category = category;
        }
        if(search){
            builtQuery.$or = [
                {author: {$regex:search, $options: 'i'}},
                {title: {$regex:search, $options: 'i'}}
            ]
        }
        const books = await Book.find(builtQuery);
        console.log(books);
        res.render('search', {books,search, category, pageTitle: ""})
    }catch(err){
        console.error(err);
    }
    
})
app.post('/search', async (req,res)=>{
    try{
        let builtQuery ={};
        const {search, category} = req.query;

        if(category){
            builtQuery.category = category;
        }
        if(search){
            builtQuery.$or = [
                {author: {$regex:search, $options: 'i'}},
                {title: {$regex:search, $options: 'i'}}
            ]
        }
        const books = await Book.find(builtQuery);
        console.log(books);
        res.render('search', {books,search, category, pageTitle: ""})
    }catch(err){
        console.error(err);
    }
    
})
//get breadcrumbs
// Book endpoint that when accessed will show detail information about a book and related books found in the database
app.get('/book/:title', async (req, res) => {

        const book = await Book.findOne({title:req.params.title});
    if(!book){
        return res.status(500).send("No book found !");
    }
    const related = await Book.find({
        category: book.category,
        __id:{$ne: book._id},
    }).limit(5);
    res.render('book', {book, related, pageTitle: book.title, backUrl:req.get('referer' || '/')});
 
    
});

// Port number
const port = 4000;

// Start the server
app.listen(port, () => {
    console.log(`Server started and is running on: http://localhost:${port}`);
});