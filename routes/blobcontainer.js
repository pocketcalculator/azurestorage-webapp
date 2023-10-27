import express from 'express';
import { createBlobContainer, deleteBlobContainer, getBlobContainers } from '../controllers/blobcontainer.js';

const router = express.Router();

router.get('/', getBlobContainers);
router.post('/', createBlobContainer);
router.delete('/', deleteBlobContainer);

export default router;