import express from 'express';
import { createCar, getAllCars, deleteCar, updateCar } from '../controllers/carController';
import { adminOnly } from '../authMiddleware';
import multer from 'multer';

const router = express.Router();
const upload = multer();

// כל ה־routes כאן מוגנים רק לאדמין
router.post('/cars', adminOnly, upload.array('images'), createCar);
router.get('/cars', getAllCars);
router.delete('/cars/:car_id', adminOnly, deleteCar);
router.put('/cars/:car_id', adminOnly, updateCar);

export default router;
