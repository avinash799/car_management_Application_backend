import mongoose from "mongoose";

// export const connectDB = async () => {
//     try {
//         await mongoose.connect(process.env.MONGO_URI);
//         console.log('MongoDB connected');
//     } catch (err) {
//         console.error('Error connecting to MongoDB', err);
//         process.exit(1);
//     }
// };




// export default connectDB;
// import mongoose from "mongoose";
// import dotenv from 'dotenv';

// dotenv.config();  // Ensure environment variables are loaded

// const connectDB = async () => {
//     try {
//         const uri = process.env.MONGO_URI;
//         if (!uri) {
//             console.error('MongoDB URI is undefined');
//             process.exit(1);
//         }

//         await mongoose.connect(uri);
//         console.log('MongoDB connected');
//     } catch (err) {
//         console.error('Error connecting to MongoDB', err);
//         process.exit(1);
//     }
// };

// export default connectDB;

import dotenv from 'dotenv';

// Load environment variables from .env
dotenv.config();

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;  // Get MONGO_URI from environment variables

        if (!uri) {
            console.error('MongoDB URI is undefined');
            process.exit(1);  // Exit the process if MONGO_URI is undefined
        }

        console.log('MongoDB URI:', uri);  // Log the URI for debugging

        // Connect to MongoDB without deprecated options
        await mongoose.connect(uri);

        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error connecting to MongoDB', err);
        process.exit(1);
    }
};

export default connectDB;
