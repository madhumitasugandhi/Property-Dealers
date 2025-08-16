import express from 'express';
import { 
  createSellerProperty, 
  getAllSellerProperties, 
  updateSellerProperty, 
  deleteSellerProperty,
  getAcceptedSellerProperties 
} from '../controllers/sellerController.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/', upload.array('media', 10), createSellerProperty);
router.get('/', getAllSellerProperties);
router.get('/accepted', getAcceptedSellerProperties); // New endpoint for accepted properties
router.put('/:id', updateSellerProperty);
router.delete('/:id', deleteSellerProperty);

export default router;