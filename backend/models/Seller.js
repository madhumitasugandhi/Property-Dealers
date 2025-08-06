import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Seller = sequelize.define('Seller', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  property_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Property',
      key: 'id',
    },
  },
  price: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
  },
  type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'PropertyType',
      key: 'id',
    },
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Active', 'Inactive'),
    allowNull: false,
    defaultValue: 'Active',
  },
}, {
  tableName: 'Seller',
  timestamps: true,
});

export default Seller;