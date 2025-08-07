import express from 'express';
import { createBroker, getBrokers } from '../controllers/Broker.js';

const router = express.Router();

router.post('/', createBroker);
router.get('/', getBrokers);

export default router;