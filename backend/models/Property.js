import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Property = sequelize.define('Property', {
  title: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
  width: { type: DataTypes.FLOAT },
  length: { type: DataTypes.FLOAT },
  area: { type: DataTypes.FLOAT },
  bhk: { type: DataTypes.STRING },
  floor: { type: DataTypes.STRING },
  type: { type: DataTypes.ENUM('flat', 'farm', 'shop', 'land'), allowNull: false },
  broker_id: {
    type: DataTypes.INTEGER,
    allowNull: true,  // <-- made optional
    references: {
      model: 'Broker',
      key: 'id'
    }
  }
,  
  image_path: { type: DataTypes.STRING }
}, {
  timestamps: false
});

export default Property;
