import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Property = sequelize.define('Property', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  property_type_id: { type: DataTypes.INTEGER, references: { model: 'property_types', key: 'id' } },
  seller_id: { type: DataTypes.INTEGER, references: { model: 'sellers', key: 'id' } },
  broker_id: { type: DataTypes.INTEGER, references: { model: 'brokers', key: 'id' } }, // Add this
});

export default Property;