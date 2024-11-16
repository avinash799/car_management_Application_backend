import express from 'express';
import multer from 'multer';
import { protect } from '../middleware/authMiddleware.js';  // Ensure the file extensions are correct
import { createCar, getCars, getCarById, updateCar, deleteCar } from '../controllers/carController.js';  // Ensure the file extensions are correct

const router = express.Router();

// Set up Multer storage with custom file naming and destination
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');  // Specify the folder where images will be stored
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.mimetype.split('/')[1]);  // Create unique filename
    }
});

// Initialize Multer with custom storage options
const upload = multer({ storage });

// Create a car (upload multiple images up to 10)
router.post('/', protect, upload.array('images', 10), createCar);

// Get all cars of a user
router.get('/', protect, getCars);

// Get a particular car by ID
router.get('/:id', protect, getCarById);

// Update a car (upload multiple images up to 10)
router.put('/:id', protect, upload.array('images', 10), updateCar);

// Delete a car
router.delete('/:id', protect, deleteCar);

export default router;  // Ensure the `default` export is used for ES Modules
