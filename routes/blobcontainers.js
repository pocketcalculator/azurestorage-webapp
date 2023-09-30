import express from 'express';

import { createBlobContainer, getBlobContainers } from '../controllers/blobcontainers.js';

const router = express.Router();

router.get('/', getBlobContainers);

router.post('/', createBlobContainer);

//router.get('/:id', getUser);

//router.delete('/:id', deleteUser);

//router.patch('/:id', updateUser);

export default router;