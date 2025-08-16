import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";

const Property = sequelize.define(
  "Properties",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    location: { type: DataTypes.STRING, allowNull: false },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    width: { type: DataTypes.FLOAT },
    length: { type: DataTypes.FLOAT },
    area: { type: DataTypes.FLOAT },
    bhk: { type: DataTypes.STRING },
    floor: { type: DataTypes.STRING },
    propertyType: {
      type: DataTypes.ENUM("Flat", "Farm", "Shop", "Land"),
      allowNull: true,
    },
    images: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: [],
    },
    created_at: { type: DataTypes.DATE, allowNull: false },
    broker_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "Broker",
        key: "id",
      },
    },
    taluka: { type: DataTypes.TEXT },
    description: { type: DataTypes.TEXT },
  },
  {
    timestamps: false,
  }
);

export default Property;
