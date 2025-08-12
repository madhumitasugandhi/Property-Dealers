const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Contact = sequelize.define('Contact', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  flats: {
    type: DataTypes.JSON, // Store as JSON string
    allowNull: true,
  },
  preferredLocations: {
    type: DataTypes.JSON, // Store as JSON string
    allowNull: true,
  },
  requirements: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'contacts',
  timestamps: true,
});

module.exports = Contact;