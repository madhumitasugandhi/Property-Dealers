import { DataTypes } from 'sequelize';
import sequelize from '../config/db.js';

const SellerProperty = sequelize.define('SellerProperty', {
    name: { type: DataTypes.STRING, allowNull: false },
    phone: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    width: { type: DataTypes.FLOAT },
    length: { type: DataTypes.FLOAT },
    area: { type: DataTypes.FLOAT },
    bhk: { type: DataTypes.STRING }, // only for flat
    floor: { type: DataTypes.STRING }, // only for shop
    pricePerSqft: { type: DataTypes.FLOAT, allowNull: false },
    propertyType: { 
        type: DataTypes.ENUM('Flat', 'Farm', 'Shop', 'Land'), 
        allowNull: false 
    },
    images: { type: DataTypes.JSON }, // array of URLs
    totalPrice: { type: DataTypes.FLOAT }
}, {
    tableName: 'seller',
    timestamps: false,
    createdAt: 'created_at',
    updatedAt: false
});

export default SellerProperty;
