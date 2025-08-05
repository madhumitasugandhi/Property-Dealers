import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Broker = sequelize.define('Broker', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, // Ensures valid email format
    },
  },
  phoneno: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [10, 15], // Phone number length between 10 and 15 digits
      isNumeric: true, // Ensures only digits
    },
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive'),
    allowNull: false,
    defaultValue: 'active',
  },
}, {
  tableName: 'Broker', // Explicitly set table name
  timestamps: true, // Adds createdAt and updatedAt fields
});

export default Broker;