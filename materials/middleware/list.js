const express = require('express');
const router  = express.Router();
const {Book} = require('../db/bookModel.js');

router.get('/', async (req,res)=>{
    try{
        const search = (req.query.search || "").trim();
        const category = (req.query.category || "").trim();


        const builtQuery = {};

        if(search){
            builtQuery.$or= [
                {title: {$regex: search, $options: "i"}},
                {title: {$regex: search, $options: "i"}}
            ];
        }
        if(category){
            builtQuery.category = category;
        }
        const book = (await Book.find(builtQuery)).sort({year:-1});
        
        res.render("list", {book, search, category});


    }catch(err){
        console.error(err);
    }
})

module.exports = router;
