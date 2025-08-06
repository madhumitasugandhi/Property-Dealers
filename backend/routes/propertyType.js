import express from 'express';
import { getPropertyTypes, createPropertyType } from '../controllers/PropertyType.js';

const router = express.Router();

router.get('/', getPropertyTypes);
router.post('/', createPropertyType);

export default router;