import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Buyer = sequelize.define('buyers', {
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
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  taluka: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  propertyType: {
    type: DataTypes.ENUM('Flat', 'Farm', 'Shop', 'Land'),
    allowNull: false,
  },
  location: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('not contacted', 'followup', 'interested', 'notInterested','unreachable'),
    defaultValue: 'not contacted',
  },
  remarks: {
    type: DataTypes.TEXT, 
    allowNull: true 
   },
   follow_up_date: { 
     type: DataTypes.DATE,
      allowNull: true
    },
   visit_date: { 
     type: DataTypes.DATE,
      allowNull: true
},
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  
}, {
  timestamps: false,
});

export default Buyer;