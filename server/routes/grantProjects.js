import express from 'express';
import { getGrantProjects } from '../controllers/grantProjectService.js';
import { createGrantProject } from '../controllers/grantProjectService.js';

const router = express.Router();

router.get('/', getGrantProjects);
router.post('/', createGrantProject);

export default router;