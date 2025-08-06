import { PropertyType } from '../models/index.js';

export const getPropertyTypes = async (req, res) => {
  try {
    const propertyTypes = await PropertyType.findAll();
    res.json(propertyTypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createPropertyType = async (req, res) => {
  try {
    const { type_name } = req.body;
    const propertyType = await PropertyType.create({ type_name });
    res.status(201).json(propertyType);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};