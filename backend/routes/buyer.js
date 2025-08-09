import express from 'express';
import { createBuyer, getAllBuyers } from '../controllers/Buyer.js';

const router = express.Router();

router.post('/', createBuyer);
router.get('/', getAllBuyers);
router.get('/test', (req, res) => {
    res.send('Buyer route working!');
  });
  

export default router;
