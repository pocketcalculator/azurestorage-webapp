import express from 'express';
import cors from 'cors';
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

router.use((req, res, next) => {
    console.log(`Incoming request: ${req.method} ${req.path}`);
    next();
});

router.get('/:name', listFiles);
router.post('/', uploadFile);
router.delete('/', deleteFile);

export default router;