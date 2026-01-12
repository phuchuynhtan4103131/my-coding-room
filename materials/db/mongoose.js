import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

// Provide your MongoDB Atlas connection string
// Make sure to connect to the DB named 2025b_final_sid
const uri = process.env.DB_URI;

export async function connectDb() {
    if (!uri) {
        throw new Error('Missing DB_URI in .env');
    }
    if (mongoose.connection.readyState !== 1) {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB Atlas');
    }
}

export default mongoose;
