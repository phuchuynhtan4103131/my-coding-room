require('dotenv').config();
const mongoose = require('mongoose')



// Provide your MongoDB Atlas connection string
// Make sure to connect to the DB named 2025b_final_sid

const uri = process.env.DB_URI;
mongoose.connect(uri)

mongoose.connect(uri)
        .then(() => {console.log("Connected to MongoDB Atlas")})
        .catch(error => {console.error(error)});

module.exports =  mongoose;