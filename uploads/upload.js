import fs from 'fs';
import path from 'path';

// Path to the uploads folder
const uploadDir = path.join(__dirname, 'uploads');

// Check if the uploads directory exists, if not create it
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    console.log('Uploads folder created.');
}
