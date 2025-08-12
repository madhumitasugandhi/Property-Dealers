import express from 'express';
import { createBroker, getBrokers, updateBroker } from '../controllers/Broker.js';

const router = express.Router();

router.post('/', createBroker);
router.get('/', getBrokers);
router.put('/:id', updateBroker); // for updating broker status

export default router;