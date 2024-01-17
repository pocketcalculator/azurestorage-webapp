import express from 'express';
import { getBlobs, uploadBlob, deleteBlob } from '../controllers/blob.js';

const router = express.Router();

router.get('/:name', getBlobs);
router.post('/', uploadBlob);
router.delete('/', deleteBlob);

export default router;