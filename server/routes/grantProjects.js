import express from 'express';
import { getGrantProjects } from '../controllers/grantProjectService.js';
import { createGrantProject, updateGrantProject, deleteGrantProject } from '../controllers/grantProjectService.js';

const router = express.Router();

router.get('/', getGrantProjects);
router.post('/', createGrantProject);
router.put('/', updateGrantProject);
router.delete('/:_id', deleteGrantProject);

export default router;