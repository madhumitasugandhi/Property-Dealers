import express from 'express';
import { createSeller, getSellers, updateSeller, deleteSeller } from '../controllers/Seller.js';

const router = express.Router();

router.post('/', createSeller);
router.get('/', getSellers);
router.put('/:id', updateSeller);
router.delete('/:id', deleteSeller);

export default router;