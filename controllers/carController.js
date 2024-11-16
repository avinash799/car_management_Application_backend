// controllers/carController.js
import Car from '../models/Car.js'; // Use .js extension for local imports

export const createCar = async (req, res) => {
    const { title, description, tags } = req.body;

    // Optional: Handle file upload, if files are provided
    let images = [];
    if (req.files && req.files.length > 0) {
        images = req.files.map(file => file.path);  // If files are provided, store the file paths
    }

    try {
        // Create a new car entry
        const car = new Car({
            user: req.user.id,
            title,
            description,
            tags,
            images  // This will be empty if no files were uploaded
        });

        await car.save();  // Save the car to the database

        // Return a success message
        res.status(201).json({ message: "Created successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


export const getCars = async (req, res) => {
    try {
        const cars = await Car.find({ user: req.user.id });
        res.json(cars);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getCarById = async (req, res) => {
    try {
        const car = await Car.findById(req.params.id);
        if (!car) return res.status(404).json({ message: 'Car not found' });
        res.json(car);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateCar = async (req, res) => {
    const { title, description, tags } = req.body;
    const images = req.files ? req.files.map(file => file.path) : undefined;

    try {
        const car = await Car.findByIdAndUpdate(req.params.id, {
            title,
            description,
            tags,
            images
        }, { new: true });

        if (!car) return res.status(404).json({ message: 'Car not found' });
        res.json(car);
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteCar = async (req, res) => {
    try {
        const car = await Car.findByIdAndDelete(req.params.id);
        if (!car) return res.status(404).json({ message: 'Car not found' });
        res.json({ message: 'Car deleted' });
    } catch (err) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const gettCars = async (req, res) => {
    const { query } = req.query;

    try {
        let cars;
        if (query) {
            // Global search on title, description, and tags
            cars = await Car.find({
                $or: [
                    { title: { $regex: query, $options: 'i' } },
                    { description: { $regex: query, $options: 'i' } },
                    { tags: { $in: [query] } },
                ],
            });
        } else {
            // Fetch all cars
            cars = await Car.find();
        }

        res.json(cars);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error occurred while fetching cars.' });
    }
};