import express from 'express';
import { getBlobs, uploadBlob, deleteBlob } from '../controllers/blobs.js';

const router = express.Router();

router.get('/:name', getBlobs);
router.post('/', uploadBlob);
router.delete('/', deleteBlob);

export default router;