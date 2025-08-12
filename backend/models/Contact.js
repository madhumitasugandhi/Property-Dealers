import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Contact = sequelize.define('contacts', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  flats: {
    type: DataTypes.JSON, // Use JSON for MySQL 5.7+
    allowNull: true,
  },
  preferredLocations: {
    type: DataTypes.JSON,
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
  timestamps: false,
});

export default Contact;