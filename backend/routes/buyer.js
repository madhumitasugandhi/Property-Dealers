import express from 'express';
import { createBuyer, getBuyers } from '../controllers/Buyer.js';

const router = express.Router();

router.post('/', createBuyer);
router.get('/', getBuyers);

export default router;