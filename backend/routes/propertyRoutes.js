const express = require('express');
const router = express.Router();
const {
  addProperty,
  getAllProperties,
  getSingleProperty,
  updateProperty,
  deleteProperty
} = require('../controllers/propertyController');

// All CRUD Routes
router.post('/', addProperty);
router.get('/', getAllProperties);
router.get('/:id', getSingleProperty);
router.put('/:id', updateProperty);
router.delete('/:id', deleteProperty);

module.exports = router;

