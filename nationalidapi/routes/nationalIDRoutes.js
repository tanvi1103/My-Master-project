// routes/nationalIDRoutes.js
import express from 'express';
import { createNationalID } from '../controllers/nationalIDController.js';

const router = express.Router();

router.post('/', createNationalID);

export default router;