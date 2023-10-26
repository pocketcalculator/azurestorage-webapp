import express from 'express';

import { getBlobs, uploadBlob } from '../controllers/blob.js';

const router = express.Router();

router.get('/', getBlobs);

router.post('/', uploadBlob);

//router.delete('/', deleteBlob);

export default router;