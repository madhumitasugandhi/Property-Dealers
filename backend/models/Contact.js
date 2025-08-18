import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const Contact = sequelize.define('Contact', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  phone: {
    type: DataTypes.STRING(15),
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  message: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
  status: {
    type: DataTypes.ENUM('pending', 'contacted', 'closed'),
    defaultValue: 'pending',
    allowNull: false,
  },
  followupdate: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
}, {
  tableName: 'contacts',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

export default Contact;