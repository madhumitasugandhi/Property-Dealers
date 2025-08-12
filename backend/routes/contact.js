const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');

// POST: Submit contact form
router.post('/', contactController.submitContactForm);

// GET: Retrieve all contact messages for admin
router.get('/', contactController.getContactMessages);

module.exports = router;