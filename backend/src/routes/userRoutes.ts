import express from 'express';
import { createUser } from '../controllers/userController';

const router = express.Router();

// Route ליצירת משתמש חדש
router.post('/users', createUser);

export default router;
