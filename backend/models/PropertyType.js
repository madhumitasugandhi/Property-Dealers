import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const PropertyType = sequelize.define('PropertyType', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  type_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true,
  },
}, {
  tableName: 'PropertyType',
  timestamps: false, // No need for createdAt/updatedAt since it's a static reference table
});

export default PropertyType;