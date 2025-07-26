import express from 'express';
import { recommendProducts } from '../controllers/aiController.js';
const router = express.Router();

router.post('/recommend', recommendProducts);

export default router;
