const db = require('../config/db');

const addProperty = (req, res) => {
  const { title, location, price, category, description } = req.body;

  if (!title || !location || !price || !category) {
    return res.status(400).json({ message: 'All required fields must be filled' });
  }

  const sql = `
    INSERT INTO properties (title, location, price, category, description)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(sql, [title, location, price, category, description], (err, result) => {
    if (err) {
      console.error('❌ Error adding property:', err.message);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(201).json({ message: 'Property added successfully', propertyId: result.insertId });
  });
};

// Dummy handlers
const getAllProperties = (req, res) => {
  res.json({ message: 'Get all properties' });
};

const getSingleProperty = (req, res) => {
  res.json({ message: `Get single property with ID ${req.params.id}` });
};

const updateProperty = (req, res) => {
  res.json({ message: `Update property with ID ${req.params.id}` });
};

const deleteProperty = (req, res) => {
  res.json({ message: `Delete property with ID ${req.params.id}` });
};

module.exports = {
  addProperty,
  getAllProperties,
  getSingleProperty,
  updateProperty,
  deleteProperty,
};
