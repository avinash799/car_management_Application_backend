
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/index.js';
import authRoutes from './routes/auth.js';
import carRoutes from './routes/car.js';

dotenv.config();
connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

// app.use(cors());
const corsOptions = {
    origin: 'http://localhost:3000' || process.env.FRONTEND_URI,
    // origin: 'https://car-management-app-frontend-avinashs-projects-c613356b.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow specific methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allow specific headers
};
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/cars', carRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
