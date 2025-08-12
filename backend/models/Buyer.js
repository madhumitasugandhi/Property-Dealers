// models/Buyer.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Buyer = sequelize.define('Buyer', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  property_type: {
    type: DataTypes.ENUM('flat', 'farm', 'shop', 'land'),
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  bhk: {
    type: DataTypes.STRING(10), 
    allowNull: true,
  },
  area: {
    type: DataTypes.STRING(50), 
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending',
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false,
});

export default Buyer;