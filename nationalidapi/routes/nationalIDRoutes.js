// routes/nationalIDRoutes.js
import express from 'express';
import { createNationalID, searchNationalIDs, uploadNationalIDsExcel } from '../controllers/nationalIDController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', createNationalID);
router.get('/search', searchNationalIDs);
router.post('/upload-excel', upload.single('file'), uploadNationalIDsExcel);

export default router;