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
const upload = multer({ dest: 'uploads/' })

router.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.path}`);
    next();
});

// Get a list of files in the container defined by 'name' parameter
router.get('/:name', listFiles);

// Upload an array of files in formData to the container
router.post('/', upload.array('file'), (req, res, next) => {
    // Access the file object
    if (req.files) {
        console.log(`${req.files.length} files uploaded.`);
    }
    console.log(util.inspect(req.files, { depth: null }));
});
router.delete('/', deleteFile);

export default router;