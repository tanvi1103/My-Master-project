// routes/nationalIDRoutes.js
import express from 'express';
import { createNationalID, searchNationalIDs } from '../controllers/nationalIDController.js';

const router = express.Router();

router.post('/', createNationalID);
router.get('/search', searchNationalIDs);

export default router;