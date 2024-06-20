import express from 'express';
import cors from 'cors';
import multer from 'multer';
import util from 'util';
import { listFiles, uploadFile, deleteFile } from '../controllers/blobs.js';


const router = express.Router();

// Specify allowed origins
const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // Some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Enable CORS with options for all routes
router.use(cors(corsOptions));

// Example of enabling pre-flight requests for all routes
router.options('*', cors(corsOptions));

// Multer configuration
const storage = multer.diskStorage({
    destination: '/tmp/uploads',
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
const upload = multer({ storage: storage })

router.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.path}`);
    next();
});

// Get a list of files in the container defined by 'name' parameter
router.get('/:name', listFiles);

// Upload an array of files in formData to the container
router.post('/', upload.array('file'), async (req, res, next) => {
    // Check if files are present
    if (!req.files || req.files.length === 0) {
        return res.status(404).send('No files were uploaded.');
    }

    // Prepare to upload files
    const uploadPromises = req.files.map((file, index) => {
        const targetBlobName = req.body.targetBlobName[index];
        const containerName = req.body.containerName[index];
        // Check if both targetBlobName and containerName are provided
        if (!targetBlobName || !containerName) {
            const missing = !targetBlobName ? 'targetBlobName' : 'containerName';
            throw new Error(`Missing ${missing} for file at index: ${index}`);
        }

        // Assuming uploadFile is an async function that uploads the file
        return uploadFile(file, targetBlobName, containerName);
    });

    // Handle file uploads
    try {
        await Promise.all(uploadPromises);
        res.status(200).json({ message: 'All files uploaded successfully.' });
    } catch (error) {
        console.error('Upload error:', error);
        // Determine the appropriate status code based on the error
        const statusCode = error.message.includes('Missing') ? 404 : 500;
        res.status(statusCode).send(error.message);
    }
});
router.delete('/', deleteFile);

export default router;