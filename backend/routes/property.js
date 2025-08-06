import express from 'express';
import { createProperty, getProperties, updateProperty, deleteProperty } from '../controllers/Property.js';

const router = express.Router();

router.post('/', createProperty);
router.get('/', getProperties);
router.put('/:id', updateProperty);
router.delete('/:id', deleteProperty);

export default router;