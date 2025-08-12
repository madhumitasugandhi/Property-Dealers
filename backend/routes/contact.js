import express from 'express';
import { submitContactForm, getContactMessages } from '../controllers/Contact.js';

const router = express.Router();
// POST: Submit contact form
router.post('/', submitContactForm);

// GET: Retrieve all contact messages for admin
router.get('/', getContactMessages);

export default router;