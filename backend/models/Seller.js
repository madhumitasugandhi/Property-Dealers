import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Seller = sequelize.define('seller', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    
  },
  phone: {
    type: DataTypes.BIGINT,
    allowNull: false,
   
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: true,
   
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: false,
  
  },
  taluka: {
    type: DataTypes.STRING(255),
    allowNull: true,
   
  },
  width: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  length: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  area: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  bhk: {
    type: DataTypes.STRING(20),
    allowNull: true,
   
  },
  floor: {
    type: DataTypes.STRING(50),
    allowNull: true,
    
  },
  totalPrice: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('Accepted', 'Not Contacted', 'Unreachable', 'Follow Up', 'Rejected'),
    allowNull: false,
    defaultValue: 'Not Contacted',
  },
  remarks: {
    type: DataTypes.STRING(255),
    allowNull: true,
  
  },
  follow_up_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  visit_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  propertyType: {
    type: DataTypes.ENUM('Flat', 'Farm', 'Shop', 'Land'),
    allowNull: false,

  },
  images: {
    type: DataTypes.JSON,
    allowNull: true,
    defaultValue: [],
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'seller',
  timestamps: false,
});

export default Seller;