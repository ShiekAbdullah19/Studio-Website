import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js'; // Database connection-ஐ import செய்கிறோம்

// Load environment variables
dotenv.config();

// Connect to MongoDB Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Basic Test Route
app.get('/', (req, res) => {
    res.send('Studio Website Management Portal API running successfully! 🚀');
});

// Port configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});