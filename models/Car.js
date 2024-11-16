import mongoose from "mongoose";

const CarSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    tags: [String],
    images: [String], // Array of image URLs
});

const Car = mongoose.model("Car", CarSchema);
export default Car;