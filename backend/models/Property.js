import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Property = sequelize.define('Property', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'PropertyType',
      key: 'id',
    },
  },
  price: {
    type: DataTypes.DECIMAL(15, 2),
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('Available', 'Sold', 'Pending'),
    allowNull: false,
    defaultValue: 'Available',
  },
  bhk: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: null,
  },
}, {
  tableName: 'Property',
  timestamps: false,
});

export default Property;